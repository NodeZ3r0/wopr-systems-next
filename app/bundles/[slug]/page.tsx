import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BUNDLES, APPS, TIERS, getBundle, relatedBundles } from '@/lib/bundles'
import { siteUrl } from '@/lib/site'

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const b = getBundle(slug)
  if (!b) return {}
  const price = b.prices['1']
  const title = b.intent ? `${b.name} — ${b.intent.headline} from ${price}/mo` : `${b.name} — from ${price}/mo`
  const description = b.intent
    ? `${b.intent.lead} Managed and monitored by WOPR Systems from ${price}/month.`.slice(0, 155)
    : `${b.desc} From ${price}/month, managed by WOPR Systems.`.slice(0, 155)
  return {
    title,
    description,
    alternates: { canonical: `/bundles/${b.slug}` },
    openGraph: { url: `/bundles/${b.slug}`, title, description },
  }
}

export default async function BundlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const b = getBundle(slug)
  if (!b) notFound()

  const apps = b.apps.map((k) => ({ key: k, ...(APPS[k] ?? { name: k, what: '' }) }))
  const replaced = apps.filter((a) => a.replaces).map((a) => a.replaces as string)
  const related = relatedBundles(b)
  const price = b.prices['1']

  const faqs: [string, string][] = [
    [`What is included in ${b.name}?`,
     apps.length
       ? `${b.name} installs ${apps.map((a) => a.name).join(', ')}. Every application runs on your own beacon under your own domain, with one single sign-on login across all of them.`
       : `${b.name} covers ${b.desc.toLowerCase()} Applications are configured with WOPR Systems during onboarding.`],
    [`Do I need to be a Linux administrator?`,
     `No. WOPR provisions and manages the server, and you operate the services from the WOPR Dashboard. Customers do not receive root access; the platform keeps the underlying system supportable and recoverable.`],
    [`How much does ${b.name} cost?`,
     `${b.name} starts at ${price} per month on ${TIERS[0].storage}. ${TIERS[1].label} is ${b.prices['2']} per month with ${TIERS[1].storage}, and ${TIERS[2].label} is ${b.prices['3']} per month with ${TIERS[2].storage}.`],
    [`Can I use my own domain?`,
     `Yes. Bundles run on a WOPR subdomain out of the box, and you can point your own domain at your services.`],
  ]

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `${b.name} — WOPR Systems`,
        description: b.intent?.lead ?? b.desc,
        category: b.type === 'sovereign' ? 'Sovereign Suite' : 'Micro Bundle',
        brand: { '@type': 'Brand', name: 'WOPR Systems' },
        url: `${siteUrl}/bundles/${b.slug}`,
        offers: TIERS.map((t) => ({
          '@type': 'Offer',
          name: `${b.name} — ${t.label} (${t.storage})`,
          price: (b.prices[t.id] ?? '').replace('$', ''),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/join`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Bundles', item: `${siteUrl}/bundles` },
          { '@type': 'ListItem', position: 3, name: b.name, item: `${siteUrl}/bundles/${b.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / bundles / {b.slug}</div>
          <h1 className="glow">{b.intent ? `${b.name}: ${b.intent.headline}` : b.name}</h1>
          <p className="page-lead">{b.intent?.lead ?? b.desc}</p>
          <p className="page-lead" style={{ marginTop: '10px' }}>
            From <strong>{price}/month</strong>, managed and monitored for you.
          </p>
          <div className="cta" style={{ marginTop: '24px' }}>
            <Link className="btn btn-solid" href="/join">Configure this beacon →</Link>
            <Link className="btn" href="/bundles">All bundles</Link>
          </div>
        </div>
      </section>

      {apps.length > 0 && (
        <section className="section">
          <div className="wrap narrow prose">
            <h2>What is included</h2>
            <p>
              {b.name} installs {apps.length} applications on your beacon. Every one is open source,
              runs under your own domain, and shares a single sign-on login.
            </p>
            {apps.map((a) => (
              <div className="pillar" style={{ marginTop: '18px' }} key={a.key}>
                <h3 style={{ marginTop: 0 }}>{a.name}</h3>
                <p style={{ marginTop: '8px' }}>
                  {a.what}
                  {a.replaces && (
                    <>
                      {' '}
                      <em>Self-hosted alternative to {a.replaces}.</em>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Pricing</h2>
          <p>
            One monthly price covers the applications, the server they run on, updates, monitoring and
            remediation. Storage tier is the only variable.
          </p>
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>Tier</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>Storage</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>Per month</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((t) => (
                  <tr key={t.id}>
                    <td style={{ padding: '10px 12px' }}>{t.label}</td>
                    <td style={{ padding: '10px 12px' }}>{t.storage}</td>
                    <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>{b.prices[t.id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Who this is for</h2>
          <p>
            {b.name} is built for {b.intent?.audience ?? 'people who want to own their infrastructure'}.
            {replaced.length > 0 && (
              <> It replaces {Array.from(new Set(replaced)).join(', ')} with software you control.</>
            )}
          </p>
          <p>
            You do not administer the server. WOPR provisions it, keeps it patched, monitors it and
            remediates failures. You work from the dashboard, and your data stays yours — exportable,
            portable, and never sold. That is what digital sovereignty means here: not a slogan, but
            who holds the keys.
          </p>
          <div className="cta" style={{ marginTop: '28px' }}>
            <Link className="btn btn-solid" href="/join">See plans and pricing →</Link>
            <Link className="btn" href="/why">Why WOPR →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Questions</h2>
          {faqs.map(([q, a]) => (
            <div className="pillar" style={{ marginTop: '18px' }} key={q}>
              <h3 style={{ marginTop: 0 }}>{q}</h3>
              <p style={{ marginTop: '8px' }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap narrow prose">
            <h2>Related bundles</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/bundles/${r.slug}`}>{r.name}</Link> — {r.desc} From {r.prices['1']}/mo.
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
