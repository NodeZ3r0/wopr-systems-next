import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about WOPR Systems — what it is, how to join, and who runs it.',
  alternates: { canonical: '/faq' },
  openGraph: { url: '/faq', title: 'WOPR Systems FAQ', description: 'What WOPR is, how to join, and who runs it.' },
}

const FAQS: [string, React.ReactNode][] = [
  [
    'What is WOPR?',
    <>
      WOPR stands for <strong>We Own Power &amp; Rights</strong> — a call to every American
      deserving of sovereignty, freedom, and basic human rights. In practice, it’s a secure,
      socially democratic, distributed mesh network: sovereign infrastructure you own and control.
    </>,
  ],
  [
    'How do I join?',
    <>Visit the <Link href="/join">Join page</Link> and choose your beacon role.</>,
  ],
  [
    'Who runs this?',
    <>
      WOPR Systems LLC operates wopr.systems and every beacon it deploys. WOPR Systems is a
      managed hosting company. We set up your private cloud and look after it for you.
    </>,
  ],
]

export default function Faq() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / faq</div>
          <h1 className="glow">FAQ</h1>
          <p className="page-lead">Straight answers about what WOPR is, how to join, and who stands behind it.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          {FAQS.map(([q, a], i) => (
            <div className="pillar" style={{ marginTop: i === 0 ? 0 : '30px' }} key={q}>
              <h2 style={{ marginTop: 0 }}>{q}</h2>
              <p style={{ marginTop: '12px' }}>{a}</p>
            </div>
          ))}
          <div className="cta" style={{ marginTop: '40px' }}>
            <Link className="btn btn-solid" href="/join">Join →</Link>
            <Link className="btn" href="/why">Why WOPR →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
