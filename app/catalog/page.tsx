import type { Metadata } from 'next'
import Catalog from '@/components/Catalog'
import { getPricedCatalog } from '@/lib/prices'

// The old full bundle catalog, parked here when /join became the single-offer
// page (2026-09-07). Kept for buyers who arrive already knowing they need a
// specialty or business suite, and so the work is not lost. Not linked from the
// main nav on purpose.
export const metadata: Metadata = {
  title: 'All Bundles and Specialty Suites',
  description:
    'The full WOPR catalog — every sovereign suite and specialty bundle, with storage tiers and pricing.',
  alternates: { canonical: '/catalog' },
  robots: { index: false, follow: true },
}

export default async function CatalogPage() {
  const catalog = await getPricedCatalog()
  return (
    <section className="section join-page">
      <div className="wrap">
        <div className="sec-head">
          <div className="mono-eyebrow">Full catalog</div>
          <h1 className="glow">All bundles</h1>
          <p>Every suite and specialty bundle. If you just want the essentials, the simple <a href="/join">$24.99 plan</a> is the place to start.</p>
        </div>
        <Catalog catalog={catalog} initialTier="1" />
      </div>
    </section>
  )
}
