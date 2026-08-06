import type { Metadata } from 'next'
import Link from 'next/link'
import { BUNDLES, APPS } from '@/lib/bundles'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Self-Hosted App Bundles — Managed, From $24.99/mo',
  description:
    'Nextcloud, Immich, Ghost, PeerTube, Vaultwarden and more — installed, managed and monitored on infrastructure you own. 24 bundles from $24.99/month.',
  alternates: { canonical: '/bundles' },
  openGraph: {
    url: '/bundles',
    title: 'WOPR Systems Bundles — Managed Self-Hosting',
    description: 'Open-source apps on infrastructure you own, run for you. 24 bundles from $24.99/month.',
  },
}

export default function BundlesIndex() {
  const sovereign = BUNDLES.filter((b) => b.type === 'sovereign')
  const micro = BUNDLES.filter((b) => b.type === 'micro')

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Bundles', item: `${siteUrl}/bundles` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: BUNDLES.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          url: `${siteUrl}/bundles/${b.slug}`,
        })),
      },
    ],
  }

  const card = (b: (typeof BUNDLES)[number]) => (
    <div className="pillar" style={{ marginTop: '18px' }} key={b.slug}>
      <h3 style={{ marginTop: 0 }}>
        <Link href={`/bundles/${b.slug}`}>{b.name}</Link>
      </h3>
      <p style={{ marginTop: '8px' }}>
        {b.desc} From <strong>{b.prices['1']}/mo</strong>.
      </p>
      {b.apps.length > 0 && (
        <p style={{ marginTop: '8px', opacity: 0.8 }}>
          Includes {b.apps.slice(0, 6).map((k) => APPS[k]?.name ?? k).join(', ')}
          {b.apps.length > 6 ? ` and ${b.apps.length - 6} more` : ''}.
        </p>
      )}
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / bundles</div>
          <h1 className="glow">Managed Self-Hosting, By The Bundle</h1>
          <p className="page-lead">
            Every bundle installs open-source applications on a server of your own — Nextcloud instead of
            Google Drive, Immich instead of Google Photos, Ghost instead of Substack, PeerTube instead of
            YouTube. WOPR provisions, patches, monitors and repairs it. You use the dashboard, not a terminal.
          </p>
          <div className="cta" style={{ marginTop: '24px' }}>
            <Link className="btn btn-solid" href="/join">See plans and pricing →</Link>
            <Link className="btn" href="/why">Why WOPR →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Sovereign Suites</h2>
          <p>Full stacks for a person, a family, or a business. Each one is a complete replacement for a set of Big Tech accounts.</p>
          {sovereign.map(card)}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Micro Bundles</h2>
          <p>Focused sets for one line of work. Smaller, cheaper, and aimed at exactly what the job needs.</p>
          {micro.map(card)}
        </div>
      </section>
    </>
  )
}
