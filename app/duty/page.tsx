import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'It’s Your Duty',
  description:
    'Thomas Jefferson wrote it plainly in the Declaration of Independence: it is the Duty of every American to throw off a tyrannical government. Not a right. A duty. Read it.',
  alternates: { canonical: '/duty' },
  openGraph: {
    url: '/duty',
    title: 'It’s Your Duty',
    description:
      'The Declaration of Independence declared that when a government becomes a tyrant, the people have not just a right but a duty to throw it off. Read it again.',
  },
}

const TRUTHS: [string, string, string][] = [
  ['01', 'You were born free', 'Your rights don’t come from the government. They existed before any government did.'],
  ['02', 'They work for you', 'Government only has power because we gave it to them. When they forget that, the contract is void.'],
  ['03', 'You can abolish it', 'Not radical. Not fringe. Literally in the founding document of this country.'],
  ['04', 'It is your duty', 'Not a suggestion. Not optional. Jefferson said DUTY. A moral obligation. You don’t get to opt out.'],
  ['05', 'The list of crimes', 'Jefferson wrote a legal indictment. Every grievance from 1776 maps directly to something happening right now.'],
  ['06', 'The verdict', 'Jefferson named what a tyrant is. He described exactly what disqualifies someone from ruling free people.'],
]

const PASSAGES: [string, string, string][] = [
  [
    'The opening',
    'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another… a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.',
    'We don’t do this lightly. Here is our case.',
  ],
  [
    'Unalienable rights',
    'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.',
    'You were born with these rights. No government gave them to you. No government can take them away.',
  ],
  [
    'The contract',
    'That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed — That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it.',
    'Government exists to serve you. When it doesn’t, you have the right — and the obligation — to change it.',
  ],
  [
    'The duty passage — read it twice',
    'But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government.',
    'He said DUTY. Not right. Not option. A moral obligation you don’t get to opt out of. This is 248 years old.',
  ],
  [
    'The verdict',
    'A Prince, whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people.',
    'This is the conclusion. The case has been made. What happens next is on you.',
  ],
]

const GRIEVANCES: [string, string][] = [
  ['Refused his Assent to Laws, the most wholesome and necessary for the public good', 'Universal healthcare, climate legislation, gun reform — blocked for decades despite overwhelming public support.'],
  ['Made Judges dependent on his Will alone', 'Courts packed with ideological loyalists. Judicial independence gutted as a political weapon.'],
  ['Erected a multitude of New Offices to harass our people, and eat out their substance', 'A regulatory apparatus protecting corporations from accountability while surveilling ordinary citizens.'],
  ['Kept among us, in times of peace, Standing Armies', 'Militarized police forces. Pentagon equipment in city streets. SWAT teams for nonviolent offenses.'],
  ['Imposing Taxes on us without our Consent', 'Tax policy written by lobbyists. Billionaires paying lower effective rates than their secretaries.'],
  ['Depriving us, in many cases, of the benefits of Trial by Jury', 'Mass incarceration via coercive plea deals. Civil asset forfeiture with no conviction required.'],
  ['Plundered our seas, ravaged our Coasts', 'Environmental deregulation poisoning water supplies. Industrial sacrifice zones in poor communities.'],
]

export default function Duty() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / duty</div>
          <h1 className="glow">IT’S YOUR DUTY</h1>
          <p className="page-lead">
            The Declaration of Independence didn’t just break from a king. It declared that
            when any government becomes a tyrant, the people have not just a right but a
            <strong> duty</strong> to throw it off. That word was chosen deliberately, in 1776.
            Read it again.
          </p>
          <div className="mono-eyebrow" style={{ marginTop: '20px', opacity: 0.7 }}>
            Philadelphia — July 4, 1776 — still in effect
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>Six truths Jefferson left for you</h2>
          <div className="grid g2 principles">
            {TRUTHS.map(([n, title, text]) => (
              <article className="card" key={n}>
                <div className="tiernote">{n} / 06</div>
                <h3>{title}</h3>
                <p className="desc">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>The Declaration, annotated for right now</h2>
          <p>
            This is the document that founded your country. You should know what it actually
            says — the original words, and what they mean today.
          </p>
          {PASSAGES.map(([label, original, plain]) => (
            <div className="pillar" style={{ marginTop: '34px' }} key={label}>
              <div className="mono-eyebrow">{label}</div>
              <p style={{ color: 'var(--white)', marginTop: '10px', fontStyle: 'italic' }}>
                “{original}”
              </p>
              <p style={{ marginTop: '12px' }}>{plain}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>The list of crimes</h2>
          <p>
            Jefferson wrote a legal indictment — specific charges, each with a direct modern
            equivalent. 1776 on the left. Right now on the right.
          </p>
          <div className="grid g2 principles">
            {GRIEVANCES.map(([charge, today]) => (
              <article className="card" key={charge}>
                <h3 style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>{charge}</h3>
                <p className="tiernote" style={{ marginTop: '6px' }}>the charge — 1776</p>
                <p className="desc" style={{ marginTop: '10px' }}>{today}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose final-cta">
          <h2>Now what?</h2>
          <p style={{ margin: '0 auto', maxWidth: '62ch' }}>
            Jefferson told you what to do. Building independent infrastructure, organizing your
            community, and refusing to participate in systems designed to exploit you — that’s
            how you do your duty.
          </p>
          <div className="cta" style={{ marginTop: '30px' }}>
            <Link className="btn btn-solid" href="/why">Why WOPR →</Link>
            <Link className="btn" href="/join">Join →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
