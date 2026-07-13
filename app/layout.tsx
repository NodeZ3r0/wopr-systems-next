import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://wopr.systems'),
  title: { default: 'WOPR.SYSTEMS — Secure Socially Democratic Distributed Mesh Network', template: '%s · WOPR.SYSTEMS' },
  description: 'A secure, socially democratic, distributed mesh network — an open platform for the people. Own your data. Own your rules.',
  openGraph: { type: 'website', siteName: 'WOPR.SYSTEMS', title: 'WOPR.SYSTEMS', description: 'Secure Socially Democratic Distributed Mesh Network — an open platform for the people.' },
  robots: { index: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <header className="bar"><div className="wrap bar-in">
          <Link className="brand" href="/">WOPR<b>.SYSTEMS</b></Link>
          <span className="status"><span className="dot" />Network Online</span>
          <nav className="top">
        <a href="https://wopr.systems/why">WHY WOPR</a>
        <a href="https://wopr.systems/theory">THEORY</a>
        <a href="https://wopr.systems/constitution">CONSTITUTION</a>
        <a href="https://wopr.systems/duty">DECLARATION</a>
        <a href="https://wopr.systems/allies">ALLIES</a>
        <a href="https://folkmoot.app">FOLKMOOT</a>
        <a href="https://powerforthepeople.party">PFTP</a>
        <a href="/join">JOIN</a>
            <a href="https://auth.wopr.systems">LOGIN</a>
          </nav>
        </div></header>
        {children}
        <footer><div className="wrap foot">
          <div className="links">
            <a href="https://wopr.systems/why">Why WOPR</a>
            <a href="https://wopr.systems/constitution">Constitution</a>
            <a href="https://folkmoot.app">Folkmoot</a>
            <a href="https://powerforthepeople.party">PFTP</a>
            <a href="https://wopr.foundation">The Foundation</a>
            <a href="https://dashboard.wopr.systems">Dashboard</a>
          </div>
          <p className="note">WOPR Systems · Secure Socially Democratic Distributed Mesh Network. Your data. Your rules. VPS hosting is billed by the provider with no WOPR markup.</p>
        </div></footer>
      </body>
    </html>
  )
}
