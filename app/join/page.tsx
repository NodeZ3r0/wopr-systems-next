import type { Metadata } from 'next'
import Link from 'next/link'
import SizePicker, { type Size } from '@/components/SizePicker'
import { getPricedCatalog } from '@/lib/prices'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Your Own Private Cloud — $24.99 a Month',
  description:
    'Everything you pay Google and Dropbox for, on a computer that is yours. Your files, photos, passwords and calendar — nobody reads them, nobody sells them. From $24.99 a month.',
  alternates: { canonical: '/join' },
  openGraph: {
    url: '/join',
    title: 'Your Own Private Cloud — $24.99 a Month',
    description:
      'Your files, photos, passwords and calendar on a computer that is yours. Nobody reads them. Nobody sells them. From $24.99 a month.',
  },
}

// What the base kit REPLACES. Named by the paid thing people already know.
// NOTE: Photos (Immich) and Documents (Collabora) have no deploy script yet —
// see WOPR-MASTER-PLAN §Base kit. Do not ship this page live until those exist
// or the two rows are cut.
const REPLACES: { you_get: string; instead_of: string; plain: string }[] = [
  { you_get: 'Your Drive', instead_of: 'Google Drive, Dropbox', plain: 'All your files in one place. The same folders on your phone and your laptop.' },
  { you_get: 'Your Photos', instead_of: 'Google Photos, iCloud', plain: 'Your phone sends pictures over by itself. They land on your computer, not theirs.' },
  { you_get: 'Your Passwords', instead_of: '1Password, LastPass', plain: 'It remembers every password and types them for you. You remember one.' },
  { you_get: 'Your Calendar', instead_of: 'Google Calendar', plain: 'Your dates and contacts stay in sync on every device, without an ad company reading them.' },
  { you_get: 'Your Documents', instead_of: 'Google Docs, Word', plain: 'Write letters and build spreadsheets right in your web browser. Nothing to install.' },
  { you_get: 'Your Page', instead_of: 'Wix, Squarespace', plain: 'Your own website at your-name.wopr.systems. Build it by answering a few questions.' },
  { you_get: 'One Login', instead_of: '“Sign in with Google”', plain: 'One name and one password opens every app. You hold the key, not Google.' },
]

export default async function Join() {
  const catalog = await getPricedCatalog()
  const starter = catalog.sovereign.find((b: any) => b.key === 'starter')
  const p = starter?.prices || { '1': '$24.99', '2': '$39.99', '3': '$54.99' }

  const sizes: Size[] = [
    { id: 'small', name: 'Small', price: p['1'], room: '50 GB of room', photos: 'about 10,000 photos', speed: 'Runs smooth for everyday things.', good_for: 'Your photos, your papers, your passwords.' },
    { id: 'medium', name: 'Medium', price: p['2'], room: '200 GB of room', photos: 'about 40,000 photos', speed: 'More memory, so pages come up quicker.', good_for: 'Years of photos, and a few people sharing.', badge: 'Most people pick this one' },
    { id: 'large', name: 'Large', price: p['3'], room: '500 GB of room', photos: 'about 100,000 photos', speed: 'The fastest one. Handles big jobs without slowing down.', good_for: 'Lots of video, or a whole household.' },
  ]

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WOPR Private Cloud',
    description: 'Your own private cloud — files, photos, passwords and calendar on a computer that is yours.',
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
          <h1 className="glow">Everything you pay Google and Dropbox for — on a computer that&apos;s yours.</h1>
          <p className="page-lead">
            It&apos;s a real computer in a locked building. We set it up and take care of it. Your files,
            photos, passwords and calendar live on it instead of theirs. Nobody reads them. Nobody sells
            them. You make one choice on this page: how much room you need. That&apos;s it.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 18 }}>
            <h2 className="glow" style={{ fontSize: '1.5rem' }}>Pick your size</h2>
            <p>Every size comes with all the apps below. They only differ by how much room and speed you get. You can move up later.</p>
          </div>
          <SizePicker sizes={sizes} />
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="sec-head" style={{ marginBottom: 18 }}>
            <h2 className="glow" style={{ fontSize: '1.5rem' }}>What you get for $24.99</h2>
            <p>The same apps you already use — but they run on your computer, not a company&apos;s.</p>
          </div>
          <div className="replaces">
            {REPLACES.map((r) => (
              <div className="rep-row card" key={r.you_get}>
                <div className="rep-head">
                  <strong>{r.you_get}</strong>
                  <span className="rep-instead">instead of {r.instead_of}</span>
                </div>
                <p className="desc">{r.plain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2 style={{ fontSize: '1.3rem' }}>Want more?</h2>
          <p>
            Over 70 more apps are one click away from your control panel — a spot like Google Photos,
            a place to watch your own videos, a spot to keep notes, and more. Add what you want, when you
            want it. You can also turn on nightly backups you can download any time.
          </p>
          <div className="cta" style={{ marginTop: 20 }}>
            <Link className="btn btn-solid" href="/join/name?size=medium">Get started — $24.99 a month &rarr;</Link>
            <Link className="btn" href="/why">How it works &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  )
}
