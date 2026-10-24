import type { Metadata } from 'next'
import Link from 'next/link'
import { getPlanPricing } from '@/lib/prices'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Questions and Answers',
  description:
    'How to sign up, what you get, what it costs each month or each year, and who looks after your private cloud.',
  alternates: { canonical: '/faq' },
  openGraph: {
    url: '/faq',
    title: 'WOPR Systems — Questions and Answers',
    description: 'How to sign up, what you get, what it costs, and who looks after it.',
  },
}

// Answers are written as PLAIN TEXT first so the same words go to the reader and
// to the FAQPage structured data. `node` is only for links and bold inside the
// rendered answer; it must say the same thing as `text`.
type Faq = { q: string; text: string; node?: React.ReactNode }

export default async function Faq() {
  const pricing = await getPlanPricing()
  const m = pricing.monthly
  const y = pricing.yearly

  const faqs: Faq[] = [
    {
      q: 'What is WOPR?',
      text:
        'WOPR stands for We Own Power & Rights. We give you your own private cloud: one computer that holds your files, your photos, your passwords, your calendar, your documents and your own web page. It is yours. Nobody reads it and nobody sells it.',
    },
    {
      q: 'How do I sign up?',
      text:
        'Go to the Join page and pick a size: Small, Medium or Large. Then pick your address, like yourname.wopr.systems, type in your name and email, and pay by card. We build your cloud and email you your login.',
      node: (
        <>
          Go to the <Link href="/join">Join page</Link> and pick a size: Small, Medium or Large.
          Then pick your address, like <strong>yourname.wopr.systems</strong>, type in your name
          and email, and pay by card. We build your cloud and email you your login.
        </>
      ),
    },
    {
      q: 'What does it cost?',
      text:
        `There is one product in three sizes. Small is ${m['1']} a month, Medium is ${m['2']} a month and Large is ${m['3']} a month. One price covers the computer, the apps and us looking after it. There is no second hosting bill.`,
    },
    {
      q: 'Can I pay for a whole year?',
      text:
        `Yes. You choose monthly or yearly when you sign up. A year costs the same as ten months, so two months are free: ${y['1']} a year for Small, ${y['2']} for Medium and ${y['3']} for Large.`,
    },
    {
      q: 'What is the difference between Small, Medium and Large?',
      text:
        'Room. Small gives you 50 GB, which is about 10,000 photos. Medium gives you 200 GB, about 40,000 photos. Large gives you 500 GB, about 100,000 photos. Every size comes with all the same apps.',
    },
    {
      q: 'What do I get with every size?',
      text:
        'Your files instead of Dropbox, your photos instead of Google Photos, your passwords instead of 1Password, your calendar instead of Google Calendar, your documents instead of Google Docs, and your own web page instead of Wix. One login opens all of them. There are more than 70 other apps you can add later.',
    },
    {
      q: 'Can I change size later?',
      text:
        'Yes. You can move up to a bigger size at any time, and you keep your address and everything on it.',
    },
    {
      q: 'Do I need to be good with computers?',
      text:
        'No. We set everything up and look after it. You never have to type a command. If something breaks, we fix it.',
    },
    {
      q: 'Can I leave and take my things with me?',
      text:
        'Yes. Every app we run is open software and all of your data can be downloaded. If you cancel, you take your files, photos and documents with you.',
    },
    {
      q: 'Who runs this?',
      text:
        'WOPR Systems LLC runs wopr.systems and every private cloud on it. We are a hosting company: we set your cloud up and look after it for you.',
    },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/faq#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.text },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / questions</div>
          <h1 className="glow">Questions and answers</h1>
          <p className="page-lead">
            Straight answers about what you get, what it costs, how to sign up, and who looks
            after it.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          {faqs.map((f, i) => (
            <div className="pillar" style={{ marginTop: i === 0 ? 0 : '30px' }} key={f.q}>
              <h2 style={{ marginTop: 0 }}>{f.q}</h2>
              <p style={{ marginTop: '12px' }}>{f.node ?? f.text}</p>
            </div>
          ))}
          <div className="cta" style={{ marginTop: '40px' }}>
            <Link className="btn btn-solid" href="/join">See sizes and prices →</Link>
            <Link className="btn" href="/why">Why WOPR →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
