import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const layout = read('../app/layout.tsx')
const header = read('../components/SiteHeader.tsx')
const styles = read('../app/globals.css')
const home = read('../app/page.tsx')
const why = read('../app/why/page.tsx')
const join = read('../app/join/page.tsx')
const nextConfig = read('../next.config.mjs')

test('every public route has one semantic h1 in source', () => {
  for (const [name, source] of [['home', home], ['why', why], ['join', join]]) {
    assert.equal((source.match(/<h1\b/g) || []).length, 1, `${name} must contain one h1`)
  }
})

test('local navigation contains business and Foundation links, not political documents', () => {
  const local = header.slice(header.indexOf('const localLinks'), header.indexOf('const globalGroups'))
  assert.match(local, /Why WOPR/)
  assert.doesNotMatch(local, /Constitution|Declaration|Theory|Project 2032/)
  assert.match(header, /WOPR Foundation/)
})

test('staging indexing is environment controlled and social metadata exists', () => {
  assert.match(layout, /allowIndexing/)
  assert.match(layout, /alternates: \{ canonical:/)
  assert.match(layout, /summary_large_image/)
  assert.match(layout, /opengraph-image/)
})

test('mobile navigation remains available and pages prevent horizontal overflow', () => {
  assert.match(header, /aria-expanded=\{menu === 'local'\}/)
  assert.match(header, /aria-controls="local-menu"/)
  assert.match(styles, /html\{overflow-x:hidden;overflow-x:clip/)
  assert.match(styles, /\.drawer-menu\{position:fixed/)
  assert.doesNotMatch(styles, /\.menu-button\{[^}]*display:none/)
})

test('security policy denies framing and removes unsafe-eval', () => {
  assert.match(nextConfig, /frame-ancestors 'none'/)
  assert.match(nextConfig, /X-Frame-Options'.*DENY/)
  assert.doesNotMatch(nextConfig, /unsafe-eval/)
  assert.doesNotMatch(nextConfig, /default-src 'self' https:/)
})
