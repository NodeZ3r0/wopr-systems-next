import type { Metadata } from 'next'
import Link from 'next/link'
import SizePicker, { type Size } from '@/components/SizePicker'
import { getPricedCatalog } from '@/lib/prices'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Your Own Private Cloud — $24.99 a Month',
  description:
    'Your files, photos and passwords on a computer that is yours. Not Google’s. From $24.99 a month.',
  alternates: { canonical: '/join' },
  openGraph: {
    url: '/join',
    title: 'Your Own Private Cloud — $24.99 a Month',
    description:
      'Your files, photos and passwords on a computer that is yours. Not Google’s. From $24.99 a month.',
  },
}

// Named by the paid thing people already know. Two short parts, no paragraphs.
// NOTE: Photos (Immich) and Documents (Collabora) still need deploy scripts.
const REPLACES: [string, string][] = [
  ['Your files', 'instead of Dropbox'],
  ['Your photos', 'instead of Google Photos'],
  ['Your passwords', 'instead of 1Password'],
  ['Your calendar', 'instead of Google Calendar'],
  ['Your documents', 'instead of Google Docs'],
  ['Your own web page', 'instead of Wix'],
]

export default async function Join() {
  const catalog = await getPricedCatalog()
  const starter = catalog.sovereign.find((b: any) => b.key === 'starter')
  const p = starter?.prices || { '1': '$24.99', '2': '$39.99', '3': '$54.99' }

  const sizes: Size[] = [
    { id: 'small', name: 'Small', price: p['1'], room: '50 GB', photos: 'about 10,000 photos', speed: '', good_for: '' },
    { id: 'medium', name: 'Medium', price: p['2'], room: '200 GB', photos: 'about 40,000 photos', speed: '', good_for: '', badge: 'Most people pick this' },
    { id: 'large', name: 'Large', price: p['3'], room: '500 GB', photos: 'about 100,000 photos', speed: '', good_for: '' },
  ]

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WOPR Private Cloud',
    description: 'Your files, photos and passwords on a computer that is yours.',
    brand: { '@type': 'Brand', name: 'WOPR Systems' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '24.99',
      highPrice: '54.99',
      offerCount: 3,
      url: `${siteUrl}/join`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="page-hero">
        <div className="wrap narrow">
          <h1 className="glow">Your own private cloud.</h1>
          <p className="page-lead">
            Your files, photos and passwords live on a computer that is yours. Not Google&apos;s.
            Nobody reads them. Nobody sells them.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="sec-head" id="pick" style={{ marginBottom: 14 }}>
            <h2 className="glow" style={{ fontSize: '1.4rem' }}>How much room do you need?</h2>
          </div>
          <SizePicker sizes={sizes} />
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="sec-head" style={{ marginBottom: 14 }}>
            <h2 className="glow" style={{ fontSize: '1.4rem' }}>Every size comes with</h2>
          </div>
          <ul className="getlist">
            {REPLACES.map(([get, instead]) => (
              <li key={get}>
                <strong>{get}</strong> <span>{instead}</span>
              </li>
            ))}
          </ul>
          <p className="getmore">
            Over 70 more apps you can add later, any time. <Link href="/why">How it works</Link>
          </p>
        </div>
      </section>
    </>
  )
}
