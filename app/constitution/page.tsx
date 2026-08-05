import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Constitution of the Federated Co-ops of America',
  description:
    '1776 to 2026. A framework of federated co-ops, direct democracy, and inalienable human dignity. The imperial run ends here.',
  alternates: { canonical: '/constitution' },
  openGraph: {
    url: '/constitution',
    title: 'The Constitution of the Federated Co-ops of America',
    description: 'No state. No bosses. No empire. Federated co-ops, direct democracy, inalienable dignity.',
  },
}

type Article = { num: string; title: string; body: string[]; badge: string }

const ARTICLES: Article[] = [
  {
    num: 'I', title: 'Preamble & Foundational Principles',
    body: [
      'We, the working people of the land now called America, hereby dissolve the structures of concentrated power that have governed through coercion, exploited through capital, and waged war in our names while stealing the fruits of our labor.',
      'Eight inviolable principles: No hierarchy without accountability. No consolidation of power. Labor is the source of value. The Earth is not property. Dignity is not negotiable. Democracy must be direct. The minority is protected. This document may be changed — no generation may bind the next.',
    ],
    badge: 'The only treason is making this document unchangeable.',
  },
  {
    num: 'II', title: 'The Co-ops',
    body: [
      'A co-op is a voluntary association of workers who collectively manage their work, their tools, their production, and their governance. There are no owners. The co-op IS the ownership.',
      'Twelve essential co-ops: Agricultural, Industrial, Healthcare, Education, Construction, Transport, Communications, Technology, Defense, Justice, Environmental Stewardship, and Arts & Culture. Any ten adults in common work may form a co-op. Leaders are coordinators, not commanders — elected, term-limited, recallable. Financial accounts are public.',
    ],
    badge: 'The co-op IS the ownership. There are no bosses.',
  },
  {
    num: 'III', title: 'Federated Councils',
    body: [
      'Three scales: Local Assemblies, Regional Federated Councils, and a Continental Coordination Assembly. Councils do not govern. They coordinate. The distinction is absolute.',
      'All consist of delegates, not representatives. A delegate votes their mandate, returns to report, and cannot deviate without returning to their sending body. One-year terms, immediate recall by 30% petition. No council may impose taxation, conscript labor, or imprison anyone.',
    ],
    badge: 'Councils coordinate. They do not govern.',
  },
  {
    num: 'IV', title: 'Direct Democracy',
    body: [
      'Every person 16 or older who resides within the Federation has the right to vote — not contingent on citizenship, property, criminal record, incarceration, or debt. It may not be revoked.',
      'Folkmoot is the designated voting platform: cryptographically secure, built on the Swiss direct-democracy model, publicly verifiable, and mathematically tamper-proof. Paper backups mandatory. No vote conducted exclusively electronically. Ballot initiative by petition, with mandatory deliberation periods.',
    ],
    badge: 'Democracy that actually functions. Not theater.',
  },
  {
    num: 'V', title: 'Rights of the People',
    body: [
      'These rights are absolute. No emergency, no majority vote, no council decision may abrogate, suspend, or qualify them.',
      'Dignity. Expression. Assembly without permit. Privacy — mass surveillance prohibited. Shelter, food, healthcare, and education are rights, not aspirational goals. Absolute bodily autonomy. Children are full human beings. The rights of the natural world. And the right to revolution — the ultimate expression of this Constitution.',
    ],
    badge: 'These are not aspirational goals. They are law.',
  },
  {
    num: 'VI', title: 'The Defense Co-op',
    body: [
      'Federated militia, not standing army. Defense only — no power projection, no foreign bases, no offensive weapons. Never deployed against civilians, for any reason.',
      'Officers elected by their units. Accountability Officers elected by civilians, embedded in every unit with authority to halt operations. No unified command, no military justice system, no military-controlled budget. Weapons distributed across co-ops. Any element exceeding its mandate is automatically dissolved by a two-thirds vote of Regional Councils.',
    ],
    badge: 'A military that structurally cannot stage a coup.',
  },
  {
    num: 'VII', title: 'Security & Counterintelligence',
    body: [
      'The People’s Counterintelligence Bureau: independent, transparent, accountable. All findings published. No detention power. No mass surveillance. No secret operations.',
      'Structural defenses against external interference: food sovereignty, energy independence, a domestic medical supply chain, and payment infrastructure outside the dollar and SWIFT systems. The PCB may not target political dissent or labor organizing.',
    ],
    badge: 'The moment it gains secret detention power, it becomes the enemy.',
  },
  {
    num: 'VIII', title: 'Economic Framework',
    body: [
      'No individual may own productive infrastructure in a manner that extracts value from the labor of others. This is not nationalization — the state owns nothing. The workers who operate it do, through their co-ops.',
      'Personal property is preserved: your home, your possessions, your tools, your art. What ends is private ownership of factories, energy, transport, and communications. Labor is not a commodity. Productive assets return to the commons on death — no dynasty may form.',
    ],
    badge: 'The workers own everything they build.',
  },
  {
    num: 'IX', title: 'Justice',
    body: [
      'The Justice Co-op is explicitly not a police force. Its purpose is restoration, not punishment.',
      'Panelists are selected by sortition — random selection, not election — to prevent political capture. Rights of the accused: specific accusation, hearing within 72 hours, advocate of choice, right to appeal. No pretrial detention beyond 30 days. No solitary confinement. No torture. Ever. Address root causes: housing, healthcare, community disconnection.',
    ],
    badge: 'The carceral state dies here.',
  },
  {
    num: 'X', title: 'Land & Environment',
    body: [
      'No individual or institution owns land in perpetuity. Land is held in stewardship — by those who use it, for as long as they use it responsibly.',
      'Rivers, forests, mountain ranges, and ocean territories are recognized as rights-bearing entities. Any person may bring a case on behalf of a harmed ecosystem. No production decision may proceed when it causes irreversible ecological harm. The obligation to the Earth is not subject to economic override.',
    ],
    badge: 'The Earth holds rights. This is not metaphor. It is law.',
  },
  {
    num: 'XI', title: 'Amendment & Transition',
    body: [
      'This Constitution is a living document. Any part except the foundational principles may be amended by the people directly. Every 25 years, the Federation conducts a full constitutional review.',
      'Transition priorities, in order: food and shelter first, then healthcare, then communications, then defense transformation, then economic transition — worker takeover, not state seizure — then justice reform. No new tyrants during the transition.',
    ],
    badge: 'The transition is messy. It is slower. It is worth it.',
  },
  {
    num: 'XII', title: 'The Old Order Ends',
    body: [
      'This Constitution supersedes the Constitution of the United States and all laws enacted under it where they conflict. The executive, legislative, and judicial branches are dissolved; their valid functions absorbed.',
      'Rights granted under the old Constitution that exceed those listed here are preserved. No right is diminished — only expanded. This Constitution is ratified not by any government but by the people themselves, acting directly.',
    ],
    badge: '1776 to 2026. The imperial run ends here.',
  },
  {
    num: 'XIII', title: 'Money Is Control',
    body: [
      'The transition to monetary economies was imposed — enclose the commons so people cannot feed themselves, destroy traditional exchange, then tax the population in a currency only employers possess. Now the population must work for whoever holds the currency, on whatever terms.',
      'The U.S. tax code is 75,000 pages long — not because taxation is complex, but because every page is a carve-out written by the wealthy for the wealthy. The Federation abolishes it entirely. No IRS. No tax code. No April 15th.',
    ],
    badge: '75,000 pages of tax code. Zero of them written for you.',
  },
  {
    num: 'XIV', title: 'Three-Layer Funding',
    body: [
      'No taxation in the old sense — no state extracting a percentage of labor under threat. There is contribution: each co-op contributes a negotiated share of its surplus to the commons.',
      'Layer 1 — co-ops care for their own members first (housing, healthcare, food, education). Layer 2 — surplus flows to a regional commons pool covering everyone else, with a gap guarantee so no person falls through the cracks. Layer 3 — a continental fund for defense, infrastructure, and environmental remediation.',
    ],
    badge: 'Three layers. No IRS. No loopholes. No extraction.',
  },
  {
    num: 'XV', title: 'Mutual Credit',
    body: [
      'Co-ops and individuals exchange through a federated mutual-credit ledger — not currency, not barter. No interest: credit does not grow by sitting idle. No accumulation: balances above personal thresholds expire back into the commons. No billionaires possible by design.',
      'The entire ledger is public. No offshore accounts, no shell structures. Raising children, caring for elders, making art — all count as contribution. The WIR Bank in Switzerland has proven mutual credit at scale since 1934.',
    ],
    badge: 'No interest. No hoarding. No billionaires. By design.',
  },
  {
    num: 'XVI', title: 'External Exchange',
    body: [
      'The world still uses money. The Federation issues the Labor Note — backed by real productive output, not government fiat. No speculation, no derivatives, no fractional reserve. Exchange rates set by purchasing-power parity, not financial markets.',
      'Where trading with other federations or cooperatives, direct mutual credit. Where trading with currency-only economies, strategic goods-for-goods exchange. The Labor Note is transitional — designed to make itself obsolete.',
    ],
    badge: 'Currency backed by production. Designed to become unnecessary.',
  },
  {
    num: 'XVII', title: 'Automation & Post-Money',
    body: [
      'Under capitalism, when a machine replaces a worker, the owner captures the surplus. Under the Federation, this logic is inverted: when automation replaces labor, the surplus belongs to the commons.',
      'If a machine does 30% of the work, members work 30% less for the same share. The goal: essential production largely automated, the working day short, and everyone’s material needs met — freeing people for art, relationship, inquiry, care. Money becomes obsolete not by decree, but by building the conditions.',
    ],
    badge: 'Automation frees people. Not fires them.',
  },
]

export default function Constitution() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / constitution / living document</div>
          <h1 className="glow">THE CONSTITUTION</h1>
          <p className="mono-eyebrow" style={{ marginTop: '18px', opacity: 0.8 }}>
            1776 → 2026 · Federated Co-ops of America
          </p>
          <p className="page-lead">
            250 years of empire built on slavery, genocide, and the commodification of human
            life. The experiment didn’t fail — it succeeded at exactly what it was designed to
            do. That era ends here. This is not a government. It is a framework for
            self-governance — distributed, federated, and irrevocably grounded in the will of
            the people who live it every day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          {ARTICLES.map((a) => (
            <div className="pillar" style={{ marginTop: '44px' }} key={a.num}>
              <div className="mono-eyebrow">Article {a.num}</div>
              <h2 style={{ marginTop: '8px' }}>{a.title}</h2>
              {a.body.map((p, i) => (
                <p style={{ marginTop: '14px' }} key={i}>{p}</p>
              ))}
              <p className="included" style={{ marginTop: '14px' }}>{a.badge}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose final-cta">
          <h2>It belongs to you</h2>
          <p style={{ margin: '0 auto', maxWidth: '62ch' }}>
            A living document. Version 1.0, open for public deliberation and amendment. No
            institution owns it. No government ratifies it. The people do.
          </p>
          <div className="cta" style={{ marginTop: '30px' }}>
            <Link className="btn btn-solid" href="/theory">Read: Left Theory →</Link>
            <Link className="btn" href="/join">Join WOPR →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
