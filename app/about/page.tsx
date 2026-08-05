import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'WOPR Systems is a secure, socially democratic, distributed mesh network that serves as an open platform for the people.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: 'About WOPR Systems', description: 'An open platform for the people.' },
}

const NETWORK: [string, string, string][] = [
  ['Social', 'GoToSocial', 'social.wopr.systems'],
  ['Forum', 'Discourse', 'discourse.wopr.systems'],
  ['Photos', 'Pixelfed', 'photos.wopr.systems'],
  ['Video', 'Group7', 'group7.wopr.systems'],
  ['Dashboard', 'User dashboard', 'dashboard.wopr.systems'],
]

const TECH = [
  'Distributed mesh networking',
  'End-to-end encryption',
  'Democratic governance',
  'Community ownership',
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / about</div>
          <h1 className="glow">ABOUT WOPR</h1>
          <p className="page-lead">
            Worldwide Organization for People’s Rights — a secure, socially democratic,
            distributed mesh network that serves as an open platform for the people.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Our mission</h2>
          <p>
            To build democratic technology infrastructure that empowers communities, protects
            digital rights, and provides open access to technology for all.
          </p>

          <h2>Our network</h2>
          <div className="grid g2 principles">
            {NETWORK.map(([label, tech, host]) => (
              <article className="card" key={label}>
                <h3>{label}</h3>
                <p className="desc">{tech}</p>
                <p className="included">{host}</p>
              </article>
            ))}
          </div>

          <h2>Technology</h2>
          <p>We use open-source, privacy-preserving technologies with a focus on:</p>
          <div className="grid g2 principles">
            {TECH.map((t) => (
              <article className="card" key={t}>
                <h3 style={{ fontSize: '1rem' }}>{t}</h3>
              </article>
            ))}
          </div>

          <div className="cta" style={{ marginTop: '40px' }}>
            <Link className="btn btn-solid" href="/join">Create your beacon →</Link>
            <Link className="btn" href="/why">Why WOPR →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
