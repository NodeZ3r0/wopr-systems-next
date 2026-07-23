const baseUrl = (process.env.SITE_AUDIT_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const routes = ['/', '/why', '/join']
const failures = []
const titles = new Set()

const one = (html, pattern) => html.match(pattern)?.[1]?.trim() || ''
const count = (html, pattern) => (html.match(pattern) || []).length

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: 'manual' })
  const html = await response.text()
  if (response.status !== 200) failures.push(`${route}: expected 200, got ${response.status}`)

  const title = one(html, /<title>([^<]+)<\/title>/i)
  const description = one(html, /<meta\s+name="description"\s+content="([^"]+)"/i)
  const canonical = one(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i)
  const h1Count = count(html, /<h1\b/gi)
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0])

  if (!title || titles.has(title)) failures.push(`${route}: missing or duplicate title`)
  titles.add(title)
  if (description.length < 70 || description.length > 170) failures.push(`${route}: description length ${description.length}`)
  if (!canonical) failures.push(`${route}: missing canonical`)
  if (h1Count !== 1) failures.push(`${route}: expected one h1, got ${h1Count}`)
  for (const image of images) {
    if (!/\salt=("[^"]*"|'[^']*')/i.test(image)) failures.push(`${route}: image missing alt`)
  }
}

for (const route of ['/robots.txt', '/sitemap.xml', '/opengraph-image', '/.well-known/security.txt']) {
  const response = await fetch(`${baseUrl}${route}`)
  if (!response.ok) failures.push(`${route}: expected success, got ${response.status}`)
}

const homeResponse = await fetch(`${baseUrl}/`)
const headers = homeResponse.headers
for (const name of [
  'content-security-policy',
  'referrer-policy',
  'x-content-type-options',
  'x-frame-options',
  'permissions-policy',
  'cross-origin-opener-policy',
  'cross-origin-resource-policy',
]) {
  if (!headers.get(name)) failures.push(`/: missing ${name}`)
}
if (headers.get('x-powered-by')) failures.push('/: leaks x-powered-by')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`Site audit passed: ${routes.length} routes, metadata, image alts, crawl files, and security headers`)
