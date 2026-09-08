import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why WOPR',
  description:
    'Why WOPR: your files, photos and passwords on a computer that is yours, set up and looked after for you.',
  alternates: { canonical: '/why' },
  openGraph: {
    url: '/why',
    title: 'Why WOPR Systems',
    description:
      'Technology should serve the people who use it—not surveil them, trap their data, or remove their ability to leave.',
  },
}

const PRINCIPLES = [
  ['Privacy', 'No advertising profile, no data brokerage, and no business model built around watching what you do.'],
  ['Control', 'Your environment, identity, and data remain portable. WOPR operates the system without claiming your digital life.'],
  ['Reliability', 'Managed updates, monitoring, backups, recovery planning, and support turn self-hosting into dependable infrastructure.'],
]

export default function WhyWopr() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">About WOPR Systems</div>
          <h1 className="glow">WHY WOPR</h1>
          <p className="page-lead">
            Technology should serve the people who use it—not surveil them, trap their
            data, or remove their ability to leave.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>The problem is the business model</h2>
          <p>
            Most online services are funded by extracting value from personal data,
            attention, lock-in, or opaque platform fees. Convenience is real, but the
            customer rarely controls the infrastructure or has a practical exit.
          </p>
          <p>
            Running everything yourself solves the ownership problem and creates a new
            operations problem: patching, monitoring, backups, identity, security, and
            recovery all require ongoing work.
          </p>

          <h2>The WOPR approach</h2>
          <p>
            WOPR Systems LLC is a managed infrastructure company. We deploy and operate
            private, open-source service stacks called beacons. A beacon can serve an
            individual, family, creator, business, or community while connecting securely
            to the wider WOPR network.
          </p>
          <p>
            Customers get a single identity, a defined service bundle, operational support,
            and infrastructure they can move or export. WOPR gets paid to keep the system
            useful, secure, and available—not to monetize customer behavior.
          </p>

          <div className="grid g2 principles">
            {PRINCIPLES.map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p className="desc">{text}</p>
              </article>
            ))}
          </div>

          <p>
            Every plan has one all-in price that includes managed hosting. There is no
            separate server charge.
          </p>

          <div className="cta prose-cta">
            <Link className="btn btn-solid" href="/join">View plans</Link>
          </div>
        </div>
      </section>
    </>
  )
}
