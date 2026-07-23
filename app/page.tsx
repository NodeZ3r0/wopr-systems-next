import Link from 'next/link'

const FEATURES = [
  {
    i: '⌘',
    h: 'One account, every service',
    p: 'A single identity for files, calendar, passwords, chat, publishing, commerce, and AI—without a Big Tech login.',
  },
  {
    i: '◉',
    h: 'Your own private cloud',
    p: 'Your services run on a dedicated beacon you control, connected to the wider network over an encrypted mesh.',
  },
  {
    i: '◆',
    h: 'Managed operations',
    p: 'WOPR handles deployment, updates, monitoring, backups, and incident response while you retain ownership and portability.',
  },
  {
    i: '▶',
    h: 'Private AI',
    p: 'Use local and network-hosted AI for chat, coding, research, and image generation without making your work an ad profile.',
  },
  {
    i: '▣',
    h: 'Security by design',
    p: 'Hardened access, encrypted connectivity, centralized identity, monitoring, and documented recovery practices are built in.',
  },
  {
    i: '↗',
    h: 'A real exit',
    p: 'Open-source services and exportable data keep you portable. You can leave without losing your digital life.',
  },
]

const STEPS = [
  ['Choose a bundle', 'Pick the services and storage that match your work, family, or organization.'],
  ['Choose infrastructure', 'Run on a supported VPS at provider cost or discuss hardware you already control.'],
  ['We operate the stack', 'WOPR deploys, secures, monitors, updates, and supports your private environment.'],
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="mono-eyebrow">Private cloud · Managed infrastructure · Open platform</div>
          <h1 className="glow">YOUR CLOUD.<br />YOUR RULES.</h1>
          <p className="taglead">
            WOPR Systems builds and operates private digital infrastructure for people,
            creators, teams, and communities—without ads, data brokerage, or platform lock-in.
          </p>
          <div className="onekey glow">One key. Every service. Your infrastructure.</div>
          <div className="cta">
            <Link className="btn btn-solid" href="/join">View plans</Link>
            <Link className="btn" href="/why">Why WOPR</Link>
            <a className="btn" href="https://nodez3r0.wopr.systems">Network portal</a>
          </div>
        </div>
      </section>

      <section className="section" id="platform">
        <div className="wrap">
          <div className="sec-head">
            <div className="mono-eyebrow">The platform</div>
            <h2 className="glow">A private stack without the full-time admin job</h2>
            <p>
              Get the practical benefits of self-hosting with deployment, security, and
              maintenance handled as a managed service.
            </p>
          </div>
          <div className="grid g3">
            {FEATURES.map((feature) => (
              <article className="card feat" key={feature.h}>
                <div className="ico glow" aria-hidden="true">{feature.i}</div>
                <h3>{feature.h}</h3>
                <p className="desc">{feature.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="model">
        <div className="wrap">
          <div className="sec-head">
            <div className="mono-eyebrow">How it works</div>
            <h2 className="glow">You own the environment. We keep it running.</h2>
          </div>
          <ol className="grid g3 steps">
            {STEPS.map(([title, text], index) => (
              <li className="card" key={title}>
                <span className="step-number" aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p className="desc">{text}</p>
              </li>
            ))}
          </ol>
          <div className="cta">
            <Link className="btn btn-solid" href="/join">Configure a beacon</Link>
          </div>
        </div>
      </section>

      <section className="section" id="impact">
        <div className="wrap">
          <div className="sec-head">
            <div className="mono-eyebrow">Revenue &amp; impact</div>
            <h2 className="glow">A business model that funds public benefit</h2>
            <p>
              VPS charges pass through at provider cost. WOPR’s platform fee is allocated
              by a published operating model.
            </p>
          </div>
          <div className="allocation" aria-label="Platform fee allocation">
            <div className="allocation-primary">
              <strong>60%</strong>
              <span>WOPR Foundation charitable programs</span>
            </div>
            <div><strong>20%</strong><span>Business operations</span></div>
            <div><strong>10%</strong><span>Network infrastructure</span></div>
            <div><strong>10%</strong><span>Open-source development</span></div>
          </div>
          <p className="disclosure">
            WOPR Systems LLC and the WOPR Foundation are separate organizations. Allocations
            to the Foundation support its independently governed charitable work; purchasing
            a WOPR service is not a tax-deductible donation.
          </p>
          <div className="cta">
            <a className="btn" href="https://wopr.foundation">Visit the WOPR Foundation</a>
            <Link className="btn" href="/why">About WOPR Systems</Link>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="wrap">
          <h2 className="glow">Ready to own your digital infrastructure?</h2>
          <p>Join a community free or launch a managed sovereign suite.</p>
          <div className="cta"><Link className="btn btn-solid" href="/join">See plans and pricing</Link></div>
        </div>
      </section>
    </>
  )
}
