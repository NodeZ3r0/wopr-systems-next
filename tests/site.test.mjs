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
const joinName = read('../app/join/name/page.tsx')
const sizePicker = read('../components/SizePicker.tsx')
const faq = read('../app/faq/page.tsx')
const sitemap = read('../app/sitemap.ts')
const nextConfig = read('../next.config.mjs')
const catalogRoute = read('../app/catalog/page.tsx')
const pricing = JSON.parse(read('../data/pricing.json'))

test('every public route has one semantic h1 in source', () => {
  for (const [name, source] of [['home', home], ['why', why], ['join', join], ['faq', faq]]) {
    assert.equal((source.match(/<h1\b/g) || []).length, 1, `${name} must contain one h1`)
  }
})

test('local navigation is the business site, not the political documents', () => {
  const local = header.slice(header.indexOf('const localLinks'), header.indexOf('const globalGroups'))
  assert.match(local, /Why WOPR/)
  assert.match(local, /href: '\/join'/)
  assert.doesNotMatch(local, /Constitution|Declaration|Theory|Project 2032/)
  // The movement and network sites hang off the separate "Network" drawer.
  assert.match(header, /const globalGroups/)
  assert.match(header, /folkmoot\.app/)
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

// One product, three sizes. /join is a size picker now — it is not the old
// bundle catalog with a tier query param, and the size the customer clicks is
// the size that is carried into the next step.
test('size selection is one choice and is carried into the next step', () => {
  assert.match(join, /<SizePicker sizes=\{sizes\} \/>/)
  assert.deepEqual(Object.values(pricing.sizes).map((size) => size.name), ['Small', 'Medium', 'Large'])
  assert.deepEqual(Object.values(pricing.sizes).map((size) => size.tier), ['t1', 't2', 't3'])
  assert.match(sizePicker, /role="radiogroup"/)
  assert.match(sizePicker, /type="radio"/)
  assert.match(sizePicker, /href=\{`\/join\/name\?size=\$\{picked\}`\}/)
  assert.match(joinName, /params\.get\('size'\)/)
  assert.match(joinName, /pricing\.backend_product_key/)
  assert.match(joinName, /tier: size\.tier/)
})

test('retired bundle URLs lead to the current size picker', () => {
  assert.match(catalogRoute, /permanentRedirect\('\/join'\)/)
  assert.match(nextConfig, /source: '\/bundles\/:slug'[\s\S]*destination: '\/join'/)
})

test('pricing is all-in and cannot add a separate hosting charge', () => {
  assert.match(layout, /one all-in price with managed hosting included/)
  assert.match(home, /no second hosting bill/)
  assert.doesNotMatch(join, /vps_plan|VPS host|bundleCents \+ vpsCents/)
  assert.doesNotMatch(read('../lib/prices.ts'), /STATIC_VPS|live\.vps/)
})

test('structured data is present for the organization, the product and the questions', () => {
  assert.match(layout, /'@type': 'Organization'/)
  assert.match(layout, /'@type': 'WebSite'/)
  assert.match(join, /'@type': 'Product'/)
  // Per-size offers, monthly and yearly.
  for (const size of ['Small', 'Medium', 'Large']) {
    assert.match(join, new RegExp(`offer\\('${size}', '[123]', 'monthly'\\)`))
    assert.match(join, new RegExp(`offer\\('${size}', '[123]', 'yearly'\\)`))
  }
  assert.match(join, /pricing\.yearly/)
  assert.match(faq, /'@type': 'FAQPage'/)
  assert.match(faq, /acceptedAnswer/)
})

test('the sitemap lists the learn hub as well as the learn articles', () => {
  assert.match(sitemap, /\$\{siteUrl\}\/learn\/`/)
  assert.match(sitemap, /\$\{siteUrl\}\/learn\/\$\{slug\}\/`/)
  assert.match(sitemap, /\$\{siteUrl\}\/faq`/)
})

// ---------------------------------------------------------------------------
// PLAIN LANGUAGE GUARD
// ---------------------------------------------------------------------------
// The owner's rule: copy a customer reads must not contain these words. Code
// identifiers, CSS class names, file names, API fields and internal comments are
// NOT customer-facing, so this guard looks only at (a) the contents of string
// literals that read like a sentence and (b) JSX text nodes. "sovereign" is
// allowed on /why and the movement pages, nowhere else.
const BANNED = ['beacon', 'sovereign', 'self-hosted', 'infrastructure', 'suite', 'bundle', 'wiki']

// Pages a customer reads on the way to buying. Every banned word is out.
const PRODUCT_PAGES = [
  '../app/layout.tsx',
  '../app/page.tsx',
  '../app/opengraph-image.tsx',
  '../app/faq/page.tsx',
  '../app/about/page.tsx',
  '../app/allies/page.tsx',
  '../app/join/page.tsx',
  '../app/join/name/page.tsx',
  '../app/join/success/page.tsx',
  '../components/SiteHeader.tsx',
  '../components/SizePicker.tsx',
]

// Marketing and movement pages. Same rule, except "sovereign" is allowed here.
const MOVEMENT_PAGES = [
  '../app/why/page.tsx',
  '../app/theory/page.tsx',
  '../app/constitution/page.tsx',
  '../app/duty/page.tsx',
]

// /catalog and /bundles/* are compatibility redirects to /join. The old catalog
// component and data remain as inactive history and are not customer-visible.

/** Split a .tsx source into the string literals and the JSX text a reader sees. */
function customerText(source) {
  const stripped = []          // source with comments and string bodies blanked
  const literals = []
  let i = 0
  while (i < source.length) {
    const c = source[i]
    const two = source.slice(i, i + 2)
    if (two === '//') {
      while (i < source.length && source[i] !== '\n') { stripped.push(' '); i += 1 }
      continue
    }
    if (two === '/*') {
      const end = source.indexOf('*/', i + 2)
      const stop = end === -1 ? source.length : end + 2
      while (i < stop) { stripped.push(source[i] === '\n' ? '\n' : ' '); i += 1 }
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      const quote = c
      let body = ''
      i += 1
      stripped.push(' ')
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') { body += source[i + 1] ?? ''; stripped.push('  '); i += 2; continue }
        body += source[i]
        stripped.push(source[i] === '\n' ? '\n' : ' ')
        i += 1
      }
      i += 1
      stripped.push(' ')
      literals.push(body)
      continue
    }
    stripped.push(c)
    i += 1
  }

  // A bare identifier or key ("sovereign", "starter", "/lib/bundles") is code.
  // Copy is prose: it has a space in it.
  const copy = literals.filter((s) => /\s/.test(s.trim()) && /[a-z]{2}/i.test(s))

  // JSX text nodes: between > and <, with no braces (those are expressions) and
  // nothing that looks like code.
  for (const m of stripped.join('').matchAll(/>([^<>{}]+)</g)) {
    const t = m[1].trim()
    if (!/[a-z]{2}/i.test(t)) continue
    if (/[=;()[\]]/.test(t)) continue
    copy.push(t)
  }
  return copy
}

function findBanned(path, allowSovereign) {
  const hits = []
  for (const line of customerText(read(path))) {
    for (const word of BANNED) {
      if (word === 'sovereign' && allowSovereign) continue
      if (new RegExp(`\\b${word}`, 'i').test(line)) {
        hits.push(`${path}: "${word}" in ${JSON.stringify(line.slice(0, 120))}`)
      }
    }
  }
  return hits
}

test('no banned words in the copy a customer reads', () => {
  const hits = PRODUCT_PAGES.flatMap((p) => findBanned(p, false))
  assert.deepEqual(hits, [], `plain-language rule broken:\n${hits.join('\n')}`)
})

test('movement pages may say sovereign but nothing else on the banned list', () => {
  const hits = MOVEMENT_PAGES.flatMap((p) => findBanned(p, true))
  assert.deepEqual(hits, [], `plain-language rule broken:\n${hits.join('\n')}`)
})

test('the banned-word guard actually catches a banned word', () => {
  // Self-test: without it a bug in customerText() would make the guard pass on
  // everything and silently stop protecting the copy.
  const sample = `export default function P() { return <p>Configure a beacon</p> }`
  const copy = customerText(sample)
  assert.ok(copy.some((t) => /beacon/i.test(t)), 'guard failed to see JSX text')
  const withString = `const a = 'launch a managed sovereign suite'`
  assert.ok(customerText(withString).some((t) => /sovereign/i.test(t)), 'guard failed to see a string')
  const comment = `// this comment mentions a beacon bundle and is not customer-facing`
  assert.deepEqual(customerText(comment), [], 'guard must ignore comments')
  const identifier = `import { BUNDLES } from '@/lib/bundles'`
  assert.deepEqual(customerText(identifier), [], 'guard must ignore code identifiers')
})
