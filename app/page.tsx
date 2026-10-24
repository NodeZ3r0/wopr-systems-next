import Link from 'next/link'

const FEATURES = [
  {
    i: '⌘',
    h: 'One login, every app',
    p: 'The same login opens your files, calendar, passwords, chat, web page, shop and AI. No Big Tech account needed.',
  },
  {
    i: '◉',
    h: 'Your own private cloud',
    p: 'Your apps run on one computer that is yours alone. It talks to the rest of the network over a locked, private link.',
  },
  {
    i: '◆',
    h: 'We look after it',
    p: 'We set it up, keep it updated, watch it, back it up and fix it when it breaks. You still own it, and you can take it with you.',
  },
  {
    i: '▶',
    h: 'Private AI',
    p: 'Use AI for chat, coding, research and pictures without your work being turned into an ad profile.',
  },
  {
    i: '▣',
    h: 'Safe from the start',
    p: 'Locked-down access, scrambled connections, one login, round-the-clock watching and a written plan for getting your things back.',
  },
  {
    i: '↗',
    h: 'A real exit',
    p: 'Every app is open software and all your data can be downloaded. If you ever want to leave, you take everything with you.',
  },
]

const STEPS = [
  ['Pick a size', 'Small, Medium or Large. The size is how much room you get for your files and photos.'],
  ['Pay one clear price', 'The computer and the care are included. There is no second hosting bill and no surprise charges.'],
  ['We keep it running', 'We set it up, lock it down, watch it, update it and answer your questions. You just use it.'],
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="mono-eyebrow">Your own private cloud · We look after it · Open software</div>
          <h1 className="glow">YOUR CLOUD.<br />YOUR RULES.</h1>
          <p className="taglead">
            WOPR Systems builds you your own private cloud and looks after it for you—no ads,
            nobody selling your data, and nothing stopping you from leaving.
          </p>
          <div className="onekey glow">One login. Every app. Your computer.</div>
          <div className="cta">
            <Link className="btn btn-solid" href="/join">See sizes and prices</Link>
            <Link className="btn" href="/why">Why WOPR</Link>
            <a className="btn" href="https://nodez3r0.wopr.systems">Nodez3r0</a>
          </div>
        </div>
      </section>

      <section className="section" id="platform">
        <div className="wrap">
          <div className="sec-head">
            <div className="mono-eyebrow">The platform</div>
            <h2 className="glow">Your own computer, without the full-time job of running it</h2>
            <p>
              You get everything good about running your own computer. We do the setting up,
              the locking down and the upkeep.
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
            <Link className="btn btn-solid" href="/join">Pick your size</Link>
          </div>
        </div>
      </section>


      <section className="section final-cta">
        <div className="wrap">
          <h2 className="glow">Ready to own your own cloud?</h2>
          <p>Pick Small, Medium or Large. Pay by the month or by the year.</p>
          <div className="cta"><Link className="btn btn-solid" href="/join">See sizes and prices</Link></div>
        </div>
      </section>
    </>
  )
}
