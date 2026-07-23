import type { Metadata } from 'next'
import Catalog from '@/components/Catalog'
import { getPricedCatalog } from '@/lib/prices'

export const metadata: Metadata = {
  title: 'Plans and Pricing',
  description:
    'Compare WOPR managed private cloud plans, storage tiers, service bundles, and infrastructure costs.',
  alternates: { canonical: '/join' },
  openGraph: {
    url: '/join',
    title: 'WOPR Systems Plans and Pricing',
    description:
      'Compare managed private cloud bundles for individuals, creators, families, and organizations.',
  },
}

export default async function Join() {
  const catalog = await getPricedCatalog()
  return (
    <section className="section join-page">
      <div className="wrap">
        <div className="sec-head">
          <div className="mono-eyebrow">Plans &amp; pricing</div>
          <h1 className="glow">Choose your beacon</h1>
          <p>Compare managed service bundles, storage, and infrastructure for your private cloud.</p>
        </div>
        <Catalog catalog={catalog} />
      </div>
    </section>
  )
}
