import type { Metadata } from 'next'
import Catalog from '@/components/Catalog'
import { getPricedCatalog } from '@/lib/prices'

export const metadata: Metadata = {
  title: 'Join a Beacon',
  description: 'Choose your beacon role and bundle — Sovereign Suites and Micro-Bundles from $24.99/mo, or join a community free.',
}

export default async function Join() {
  const catalog = await getPricedCatalog()
  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="mono-eyebrow">★ Join the WOPR Network ★</div>
          <h2 className="glow" style={{ marginTop: 10 }}>Choose Your Beacon Role</h2>
          <p>Select how you'd like to participate in the WOPR network.</p>
        </div>
        <Catalog catalog={catalog} />
      </div>
    </section>
  )
}
