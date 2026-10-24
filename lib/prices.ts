import pricing from '@/data/pricing.json'

export type PlanSizeId = keyof typeof pricing.sizes

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

// One customer-facing product with three sizes. The daily Stripe parity job
// updates data/pricing.json, so every active WOPR page reads the same amounts.
export async function getPlanPricing() {
  const byTier = Object.values(pricing.sizes).reduce(
    (out, size) => {
      const key = size.tier === 't1' ? '1' : size.tier === 't2' ? '2' : '3'
      out.monthly[key] = formatPrice(size.monthly)
      out.yearly[key] = formatPrice(size.yearly)
      return out
    },
    {
      monthly: {} as Record<string, string>,
      yearly: {} as Record<string, string>,
    },
  )

  return {
    product: pricing.product,
    backendProductKey: pricing.backend_product_key,
    sizes: pricing.sizes,
    ...byTier,
  }
}
