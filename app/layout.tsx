import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import { allowIndexing, siteUrl } from '@/lib/site'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080b08',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WOPR Systems | Your Own Private Cloud for Files and Photos',
    template: '%s | WOPR Systems',
  },
  description:
    'Your files, photos and passwords on a computer that is yours. We set it up, keep it safe and look after it. Plans start at $24.99 a month.',
  applicationName: 'WOPR Systems',
  alternates: { canonical: '/' },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: { index: allowIndexing, follow: allowIndexing },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'WOPR Systems',
    title: 'WOPR Systems | Your Own Private Cloud for Files and Photos',
    description:
      'Your files, photos and passwords on a computer that is yours. We set it up and look after it. You never touch a terminal.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'WOPR Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WOPR Systems | Your Own Private Cloud for Files and Photos',
    description:
      'Your files, photos and passwords on a computer that is yours. We set it up and look after it. You never touch a terminal.',
    images: ['/opengraph-image'],
  },
  category: 'technology',
}

// Site-wide structured data. Organization identifies the business to search
// engines and knowledge panels; WebSite declares the canonical site name so
// results stop guessing it from the <title>.
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'WOPR Systems',
  legalName: 'WOPR Systems LLC',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/opengraph-image`,
  description:
    'WOPR Systems sets up and looks after a private cloud for your files, photos, passwords, calendar, documents and your own web page.',
  sameAs: ['https://cloud.wopr.systems'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@wopr.systems',
      url: `${siteUrl}/faq`,
      availableLanguage: ['en'],
    },
  ],
}

const siteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'WOPR Systems',
  url: `${siteUrl}/`,
  inLanguage: 'en-US',
  publisher: { '@id': `${siteUrl}/#organization` },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer>
          <div className="wrap footer-grid">
            <div>
              <Link className="brand footer-brand" href="/">WOPR<b>.SYSTEMS</b></Link>
              <p className="note">
                Your files, photos and passwords on a computer that is yours.
                We set it up and look after it. You never touch a terminal.
              </p>
            </div>
            <nav className="footer-links" aria-label="WOPR Systems">
              <Link href="/why">Why WOPR</Link>
              <Link href="/#platform">Platform</Link>
              <Link href="/join">Sizes &amp; prices</Link>
              <a href="https://nodez3r0.wopr.systems">Nodez3r0</a>
              <a href="https://auth.wopr.systems">Login</a>
            </nav>
            <nav className="footer-links" aria-label="More from WOPR Systems">
              <a href="https://wopr.systems">Consulting</a>
              <a href="https://cloud.wopr.systems">Private Cloud</a>
            </nav>
          </div>
          <div className="wrap legal-note">
            Paid plans use one all-in price with managed hosting included.
          </div>
        </footer>
      </body>
    </html>
  )
}
