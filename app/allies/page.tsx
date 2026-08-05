import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Allied Organizations',
  description:
    'Technology should serve people, not surveil them. WOPR Systems is a socially democratic distributed mesh network.',
  alternates: { canonical: '/allies' },
  openGraph: {
    url: '/allies',
    title: 'Allied Organizations — WOPR Systems',
    description: 'A mesh of movements — cross-linked so no single node can be silenced.',
  },
}

export default function Allies() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / allies</div>
          <h1 className="glow">ALLIED ORGANIZATIONS</h1>
          <p className="page-lead">A mesh of movements — cross-linked so no single node can be silenced.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Who we stand with</h2>
          <p>
            Independent organizations we stand with. We link to allies who link back to us —
            sharing resources, reach, and resilience across the movement.
          </p>

          <div className="pillar" style={{ marginTop: '34px' }}>
            <p style={{ color: 'var(--text-2)' }}>
              Allied organizations will appear here as the network grows.
            </p>
          </div>

          <div className="cta" style={{ marginTop: '40px' }}>
            <Link className="btn btn-solid" href="/join">Create your beacon →</Link>
            <a className="btn" href="https://wopr.foundation/allies.php" target="_blank" rel="noopener noreferrer">
              Foundation allies →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
