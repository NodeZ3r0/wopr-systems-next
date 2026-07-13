import Link from 'next/link'

const FEATURES = [
  { i: '⌘', h: 'One key, every app', p: 'A single sovereign identity across your whole beacon — drive, mail, chat, social, AI. No Big Tech logins.' },
  { i: '◉', h: 'Distributed mesh', p: 'Beacons federate over an encrypted mesh. No central point of failure, no landlord who can shut you off.' },
  { i: '♥', h: 'Your data, your rules', p: 'You hold the keys. No ads, no tracking, no selling you. Self-custody by default.' },
  { i: '▶', h: 'Joshua, your AI', p: 'Local AI models running on the network — chat, code with Reactor, generate images — not somebody else\'s cloud.' },
  { i: '\u2691', h: 'Democratic governance', p: 'Folkmoot gives every verified member a private voting key. The network answers to its people.' },
  { i: '✦', h: 'Open platform', p: 'Open-source, forkable, and yours to leave with. Sovereignty means the exit is always real.' },
]

export default function Home() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <div className="mono-eyebrow">Secure · Socially Democratic · Distributed</div>
        <h1 className="glow">WOPR.SYSTEMS</h1>
        <p className="taglead">A Secure Socially Democratic Distributed Mesh Network — an open platform for the people.</p>
        <div className="onekey glow">One Key To Rule Them All</div>
        <div className="rules">Your Data. Your Rules.</div>
        <div className="cta">
          <Link className="btn btn-solid" href="/join">Join a Beacon</Link>
          <a className="btn" href="https://dashboard.wopr.systems">WOPR Dashboard</a>
          <a className="btn" href="https://auth.wopr.systems">Login</a>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="sec-head"><h2 className="glow">What you get</h2>
          <p>Everything Big Tech gives you — minus the surveillance, the ads, and the landlord.</p></div>
        <div className="grid g3">
          {FEATURES.map((f) => (
            <div className="card feat" key={f.h}>
              <div className="ico glow">{f.i}</div>
              <h3>{f.h}</h3>
              <p className="desc">{f.p}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
        <div className="sec-head" style={{ marginBottom: 24 }}>
          <h2 className="glow">Pick your beacon</h2>
          <p>Free to join a community, or run your own sovereign suite from $24.99/mo.</p>
        </div>
        <div className="cta"><Link className="btn btn-solid" href="/join">See the bundles</Link>
          <a className="btn" href="https://wopr.foundation">♥ Support the Foundation</a></div>
      </div></section>
    </>
  )
}
