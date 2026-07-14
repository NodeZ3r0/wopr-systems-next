import catalog from '@/data/catalog.json'

// Live per-tier amounts (bundles monthly+yearly, VPS monthly+yearly) from the wopr.systems Flask app.
const API = process.env.PRICES_API || 'https://wopr.systems/api/prices'

const STATIC_VPS: any[] = [
  { key: 'contabo-vps-s', plan_name: 'VPS S SSD', cpu: 4, ram_gb: 8, disk_gb: 200, amount_cents: 499, price_display: '$4.99', amount_cents_yearly: 5988, price_display_yearly: '$59.88' },
  { key: 'contabo-vps-m', plan_name: 'VPS M SSD', cpu: 6, ram_gb: 16, disk_gb: 400, amount_cents: 899, price_display: '$8.99', amount_cents_yearly: 10788, price_display_yearly: '$107.88' },
  { key: 'contabo-vps-l', plan_name: 'VPS L SSD', cpu: 8, ram_gb: 30, disk_gb: 800, amount_cents: 1499, price_display: '$14.99', amount_cents_yearly: 17988, price_display_yearly: '$179.88' },
  { key: 'contabo-vps-xl', plan_name: 'VPS XL SSD', cpu: 10, ram_gb: 60, disk_gb: 1600, amount_cents: 2699, price_display: '$26.99', amount_cents_yearly: 32388, price_display_yearly: '$323.88' },
]

function fmt(cents: number | null | undefined): string | null {
  if (cents == null || Number.isNaN(cents)) return null
  return '$' + (cents / 100).toFixed(2)
}
function parseCents(d: any): number {
  const n = parseFloat(String(d).replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? 0 : Math.round(n * 100)
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
      const prices: Record<string, string> = { ...b.prices }
      const amt = live && live[grp] ? live[grp][b.key] : null
      if (amt) {
        for (const t of ['1', '2', '3']) {
          const f = fmt(amt[t])
          if (f) prices[t] = f
        }
      }
      // yearly = live amount, else 10x the monthly (2 months free convention)
      const amtY = live && live[grp + '_yearly'] ? live[grp + '_yearly'][b.key] : null
      const prices_yearly: Record<string, string> = {}
      for (const t of ['1', '2', '3']) {
        prices_yearly[t] = (amtY && amtY[t] != null) ? (fmt(amtY[t]) as string) : (fmt(parseCents(prices[t]) * 10) as string)
      }
      return { ...b, prices, prices_yearly }
    })

  let vps = STATIC_VPS
  if (live && live.vps) {
    const arr = Object.entries(live.vps)
      .map(([key, v]: any) => ({
        key, ...v,
        price_display: v.price_display || fmt(v.amount_cents),
        price_display_yearly: v.price_display_yearly || fmt(v.amount_cents_yearly),
      }))
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
