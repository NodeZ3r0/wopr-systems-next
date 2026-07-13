import catalog from '@/data/catalog.json'

// Live per-tier amounts from the wopr.systems Flask app (Stripe-backed, cached).
const API = process.env.PRICES_API || 'https://wopr.systems/api/prices'

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
  return {
    tiers: (catalog as any).tiers,
    roles: (catalog as any).roles,
    sovereign: apply('sovereign'),
    micro: apply('micro'),
    live: !!live,
  }
}
