import type { Metadata } from 'next'
import Catalog from '@/components/Catalog'

export const metadata: Metadata = {
  title: 'Join a Beacon',
  description: 'Choose your beacon role and bundle \u2014 Sovereign Suites and Micro-Bundles from $24.99/mo, or join a community free.',
}

export default function Join() {
  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="mono-eyebrow">\u2605 Join the WOPR Network \u2605</div>
          <h2 className="glow" style={{ marginTop: 10 }}>Choose Your Beacon Role</h2>
          <p>Select how you\'d like to participate in the WOPR network.</p>
        </div>
        <Catalog />
      </div>
    </section>
  )
}
