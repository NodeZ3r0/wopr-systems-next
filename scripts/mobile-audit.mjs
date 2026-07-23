import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const baseUrl = process.env.MOBILE_AUDIT_URL || 'http://127.0.0.1:3000'
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const debuggingPort = Number(process.env.MOBILE_AUDIT_PORT || 9342)
const widths = [320, 360, 375, 390, 412, 768]
const routes = ['/', '/why', '/join']
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function waitForJson(url, attempts = 60) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
    } catch {}
    await sleep(100)
  }
  throw new Error(`Timed out waiting for ${url}`)
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url)
    const pending = new Map()
    let nextId = 0
    socket.addEventListener('open', () => resolve({
      send(method, params = {}) {
        const id = ++nextId
        socket.send(JSON.stringify({ id, method, params }))
        return new Promise((resolveCommand, rejectCommand) => pending.set(id, { resolve: resolveCommand, reject: rejectCommand }))
      },
      close: () => socket.close(),
    }))
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(String(event.data))
      const command = pending.get(message.id)
      if (!command) return
      pending.delete(message.id)
      if (message.error) command.reject(new Error(message.error.message))
      else command.resolve(message.result)
    })
    socket.addEventListener('error', () => reject(new Error('Chrome connection failed')))
  })
}

const expression = `(() => {
  const viewport = document.documentElement.clientWidth;
  const offenders = [...document.querySelectorAll('body *')].map((element) => {
    const rect = element.getBoundingClientRect();
    return { tag: element.tagName.toLowerCase(), left: Math.round(rect.left), right: Math.round(rect.right) };
  }).filter(({ left, right }) => left < -1 || right > viewport + 1).slice(0, 10);
  const menuButton = document.querySelector('.menu-button');
  return {
    viewport,
    documentWidth: document.documentElement.scrollWidth,
    offenders,
    menuAvailable: !!menuButton && getComputedStyle(menuButton).display !== 'none',
    tapTargets: [...document.querySelectorAll('button, a')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
    }).length
  };
})()`

const profile = await mkdtemp(join(tmpdir(), 'wopr-systems-mobile-audit-'))
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`,
  `--remote-debugging-port=${debuggingPort}`, '--remote-allow-origins=*', 'about:blank',
], { stdio: 'ignore' })

let client
try {
  const targets = await waitForJson(`http://127.0.0.1:${debuggingPort}/json`)
  const page = targets.find((target) => target.type === 'page')
  client = await connect(page.webSocketDebuggerUrl)
  const failures = []
  for (const width of widths) {
    await client.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 2, mobile: true })
    for (const route of routes) {
      await client.send('Page.navigate', { url: new URL(route, baseUrl).href })
      await sleep(500)
      const result = await client.send('Runtime.evaluate', { expression, returnByValue: true })
      const audit = result.result.value
      if (audit.documentWidth > audit.viewport || audit.offenders.length || !audit.menuAvailable) {
        failures.push({ width, route, ...audit })
      }
    }
  }
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2))
    process.exitCode = 1
  } else {
    console.log(`Mobile audit passed: ${routes.length} routes × ${widths.length} widths`)
  }
} finally {
  client?.close()
  if (chrome.pid) spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' })
  await rm(profile, { recursive: true, force: true }).catch(() => {})
}
