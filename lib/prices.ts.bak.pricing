import catalog from '@/data/catalog.json'

// Live all-in per-tier amounts from the wopr.systems Flask app.
const API = process.env.PRICES_API || 'https://wopr.systems/api/prices'

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

  return {
    tiers: (catalog as any).tiers,
    roles: (catalog as any).roles,
    sovereign: apply('sovereign'),
    micro: apply('micro'),
    live: !!live,
  }
}
