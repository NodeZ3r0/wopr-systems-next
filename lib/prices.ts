import catalog from '@/data/catalog.json'

// Live per-tier amounts (bundles + VPS) from the wopr.systems Flask app.
const API = process.env.PRICES_API || 'https://wopr.systems/api/prices'

// static fallback so the picker still renders if the API is unreachable
const STATIC_VPS: any[] = [
  { key: 'contabo-vps-s', plan_name: 'VPS S SSD', cpu: 4, ram_gb: 8, disk_gb: 200, amount_cents: 549, price_display: '$5.49' },
  { key: 'contabo-vps-m', plan_name: 'VPS M SSD', cpu: 6, ram_gb: 16, disk_gb: 400, amount_cents: 989, price_display: '$9.89' },
  { key: 'contabo-vps-l', plan_name: 'VPS L SSD', cpu: 8, ram_gb: 30, disk_gb: 800, amount_cents: 1649, price_display: '$16.49' },
  { key: 'contabo-vps-xl', plan_name: 'VPS XL SSD', cpu: 10, ram_gb: 60, disk_gb: 1600, amount_cents: 2969, price_display: '$29.69' },
]

function fmt(cents: number | null | undefined): string | null {
  if (cents == null || Number.isNaN(cents)) return null
  return '$' + (cents / 100).toFixed(2)
}

export async function getPricedCatalog() {
  let live: any = null
  try {
    const res = await fetch(API, { next: { revalidate: 600 } })
    if (res.ok) live = await res.json()
  } catch {
    live = null
  }

  const apply = (grp: 'sovereign' | 'micro') =>
    (catalog as any)[grp].map((b: any) => {
      const prices: Record<string, string> = { ...b.prices } // static snapshot = fallback
      const amt = live && live[grp] ? live[grp][b.key] : null
      if (amt) {
        for (const t of ['1', '2', '3']) {
          const f = fmt(amt[t])
          if (f) prices[t] = f
        }
      }
      return { ...b, prices }
    })

  let vps = STATIC_VPS
  if (live && live.vps) {
    const arr = Object.entries(live.vps)
      .map(([key, v]: any) => ({ key, ...v, price_display: v.price_display || fmt(v.amount_cents) }))
      .filter((v: any) => v.amount_cents != null)
      .sort((a: any, b: any) => a.disk_gb - b.disk_gb)
    if (arr.length) vps = arr
  }

  return {
    tiers: (catalog as any).tiers,
    roles: (catalog as any).roles,
    sovereign: apply('sovereign'),
    micro: apply('micro'),
    vps,
    live: !!live,
  }
}
