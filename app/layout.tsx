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
    default: 'WOPR Systems | Private Cloud and Managed Sovereign Infrastructure',
    template: '%s | WOPR Systems',
  },
  description:
    'Private cloud, managed sovereign infrastructure, encrypted communications, and local AI for individuals, creators, teams, and communities.',
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
    title: 'WOPR Systems | Private Cloud and Managed Sovereign Infrastructure',
    description:
      'Own your data and infrastructure without having to operate every service yourself.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'WOPR Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WOPR Systems | Private Cloud and Managed Sovereign Infrastructure',
    description:
      'Own your data and infrastructure without having to operate every service yourself.',
    images: ['/opengraph-image'],
  },
  category: 'technology',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer>
          <div className="wrap footer-grid">
            <div>
              <Link className="brand footer-brand" href="/">WOPR<b>.SYSTEMS</b></Link>
              <p className="note">
                Managed private infrastructure for people and organizations that want
                control without becoming full-time system administrators.
              </p>
            </div>
            <nav className="footer-links" aria-label="WOPR Systems">
              <Link href="/why">Why WOPR</Link>
              <Link href="/#platform">Platform</Link>
              <Link href="/join">Pricing</Link>
              <Link href="/#impact">Revenue &amp; impact</Link>
              <a href="https://nodez3r0.wopr.systems">Network portal</a>
              <a href="https://auth.wopr.systems">Login</a>
            </nav>
            <nav className="footer-links" aria-label="Related organizations">
              <a href="https://wopr.foundation">WOPR Foundation</a>
              <a href="https://folkmoot.app">Folkmoot</a>
              <a href="https://project2032.us">Project 2032</a>
            </nav>
          </div>
          <div className="wrap legal-note">
            WOPR Systems LLC and the WOPR Foundation are separate legal organizations.
            Paid plans use one all-in price with managed hosting included.
          </div>
        </footer>
      </body>
    </html>
  )
}
