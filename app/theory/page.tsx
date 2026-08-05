import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Left Theory: What Are We Actually Building?',
  description:
    'Anarchosyndicalism vs. Communism vs. Democratic Socialism — power structures, failure modes, and why it matters who holds the reins.',
  alternates: { canonical: '/theory' },
  openGraph: {
    url: '/theory',
    title: 'Left Theory: What Are We Actually Building?',
    description: 'Power structures, failure modes, and why it matters who ends up holding the reins.',
  },
}

type Model = { num: string; title: string; body: string[]; badge: string }

const MODELS: Model[] = [
  {
    num: '01', title: 'Anarchosyndicalism',
    body: [
      'Workers control the means of production directly through their industrial unions — syndicates. The nation-state is replaced by a confederation of freely associated syndicates coordinating through direct democratic process.',
      'The key distinction from communism is structural: there is no transitional state, no vanguard party, no central authority to capture. Power is distributed by architecture, not by policy. You cannot seize anarchosyndicalist infrastructure in a coup because there is no palace, no central committee, no single node that controls anything. Proven under fascist siege in Catalonia, 1936–1939.',
    ],
    badge: 'The only model whose architecture prevents tyranny.',
  },
  {
    num: '02', title: 'Marxist-Leninist Communism',
    body: [
      'A disciplined vanguard party seizes state power on behalf of the working class and exercises a “dictatorship of the proletariat” — a transitional state that is supposed to wither away. It never has.',
      'Lenin died before consequences became clear. Stalin purged the party. Mao’s Great Leap Forward killed tens of millions. Pol Pot killed a quarter of Cambodia. This is not individual failure — it is structural. The vanguard party always becomes the new ruling class, and the transitional state has never withered away.',
    ],
    badge: 'Correct diagnosis. Structural cure that produces the disease.',
  },
  {
    num: '03', title: 'Democratic Socialism',
    body: [
      'Achieve socialist goals — collective ownership, universal programs, redistribution — through democratic electoral processes and existing institutions. The Nordic model shows it is partly possible.',
      'The weakness is structural: it operates within institutions designed to protect capital, not labor. Capital flight, institutional resistance, and electoral capture by concentrated wealth roll modest reforms back. The successful Nordic implementations rely on powerful coordinated unions — which begins to look like syndicalism.',
    ],
    badge: 'Legitimate interim strategy. A step, not a destination.',
  },
  {
    num: '04', title: 'The Power Problem',
    body: [
      'Every political system must answer one question: who holds power, and what prevents them from using it against everyone else? Policy promises are not answers. Structural architecture is.',
      'Anarchosyndicalism distributes power by design — no single node can dominate. ML Communism concentrates it in the vanguard party. Democratic Socialism distributes it through elections that capital can capture. The test: does the model prevent bad actors from accumulating power, or does it depend on good actors choosing not to?',
    ],
    badge: 'The power problem is solved by architecture, not by virtue.',
  },
  {
    num: '05', title: 'The Vanguard Trap',
    body: [
      'The working class needs a vanguard party, the theory says; the party seizes power on behalf of the workers, then the state dissolves. In practice, a party that seizes power to represent workers is a party that holds power over workers.',
      'Lenin suppressed the Kronstadt sailors — revolutionary workers — by 1921. The pipeline from Lenin to Stalin to the gulag is structural, not accidental. Power given is power kept.',
    ],
    badge: 'The vanguard trap is not a risk. It is the operational logic.',
  },
  {
    num: '06', title: 'The Syndicalist Solution',
    body: [
      'When Franco’s coup began in July 1936, the CNT-FAI in Barcelona defeated the military uprising within 24 hours through an armed general strike. Workers collectivized 70% of the local economy. Factories increased production. Hospitals were run democratically.',
      'The experiment was not defeated by its own contradictions. It was militarily crushed by fascists with Nazi and Italian support, and simultaneously sabotaged by the Soviet-backed PCE. The question is not whether anarchosyndicalism works — it has been tested under the most hostile conditions possible. The question is how to defend it.',
    ],
    badge: 'Destroyed from outside. A fundamentally different failure mode.',
  },
  {
    num: '07', title: 'Anarchy vs Anarchosyndicalism',
    body: [
      'Anarchy in its pure form is simply the absence of hierarchical authority. It defines what it is against but is largely silent on what replaces it — and in its most naive expression devolves into something closer to libertarianism than leftism.',
      'Anarchosyndicalism answers the “then what?” question. Workers organize into syndicates by trade and industry. Syndicates federate horizontally — no top-down authority. Decisions are made through direct democracy. No central state, but not chaos: federated worker councils. Power never consolidates because it is structurally distributed.',
    ],
    badge: 'Anarchosyndicalism is anarchism with architecture.',
  },
  {
    num: '08', title: 'The Major Syndicates',
    body: [
      'In a mature anarchosyndicalist society, syndicates form around essential functions: Industrial, Agricultural, Transport & Logistics, Healthcare, Communications & Technology, Education, Construction, and Defense.',
      'Each syndicate is internally democratic and federates horizontally with the others. No syndicate holds authority over another. Coordination happens through elected, recallable delegates — not permanent leaders. Each collectively owns its means of production. No CEO. No shareholders. Workers decide.',
    ],
    badge: 'Eight syndicates. No hierarchy between them. Federated by design.',
  },
  {
    num: '09', title: 'The Defense Syndicate',
    body: [
      'The military is the Achilles heel of every leftist project: military effectiveness requires hierarchy and rapid command, which conflicts with horizontal direct democracy. You cannot hold a vote in a firefight.',
      'The answer is a Defense Syndicate, not a military — territorial defense only, no power projection. A federated militia with rotating service and elected, recallable officers. Political accountability officers embedded in every unit (as Rojava does now). Heavy weapons distributed across syndicates so the defense syndicate cannot act unilaterally. The Swiss militia model — decentralized, reserve-based, locally maintained — is closer to the ideal than any standing army.',
    ],
    badge: 'A defense syndicate that cannot stage a coup by design.',
  },
  {
    num: '10', title: 'The CIA Problem',
    body: [
      'External destabilization has killed more leftist projects than internal contradictions. Chile 1973. Guatemala 1954. Iran 1953. Nicaragua. Bolivia 2019. The pattern: economic warfare to cause scarcity, funded internal opposition, media destabilization, a willing military faction, a coup.',
      'The defenses: economic sovereignty first (food, energy, medicine). Exit dollar-denominated systems before sanctions hit. Federated information infrastructure with no single capturable node. Transparent, syndicate-accountable counterintelligence — not secret police. The fundamental answer: distribute power so thoroughly that a coup has no target. Who do you arrest? What building do you seize? Everywhere and nowhere simultaneously.',
    ],
    badge: 'Distribute power so thoroughly there is no single throat to choke.',
  },
]

const COMPARISON: [string, string, string, string][] = [
  ['Power structure', 'Distributed by architecture', 'Concentrated in vanguard party', 'Distributed via elections; capturable'],
  ['Failure mode', 'Coordination difficulty', 'Vanguard becomes ruling class', 'Electoral / institutional capture'],
  ['Historical test', 'Catalonia 1936 — worked', 'USSR, China, Cambodia', 'Nordic model (partial)'],
  ['Defense vs tyranny', 'Structural', 'Policy only — depends on virtue', 'Constitutional — subject to rollback'],
  ['Worker agency', 'Maximum — direct democracy', 'Nominal — party speaks for workers', 'Indirect — through elections'],
]

export default function Theory() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <div className="mono-eyebrow">wopr.systems / political theory / field manual</div>
          <h1 className="glow">LEFT THEORY</h1>
          <p className="page-lead">
            “Leftist” is a slur used to dismiss anyone who questions the ownership class. But
            the left is not a monolith. Anarchosyndicalism, Marxist-Leninist Communism, and
            Democratic Socialism are fundamentally different architectures of power — with
            radically different track records. Before we organize, we need to know what we’re
            actually building, and why it matters who ends up holding the reins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          {MODELS.map((m) => (
            <div className="pillar" style={{ marginTop: '44px' }} key={m.num}>
              <div className="mono-eyebrow">{m.num} / 10</div>
              <h2 style={{ marginTop: '8px' }}>{m.title}</h2>
              {m.body.map((p, i) => (
                <p style={{ marginTop: '14px' }} key={i}>{p}</p>
              ))}
              <p className="included" style={{ marginTop: '14px' }}>{m.badge}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>The comparison</h2>
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '640px' }}>
              <thead>
                <tr>
                  {['Dimension', 'Anarchosyndicalism', 'ML Communism', 'Dem. Socialism'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--line-2)', color: 'var(--green)', letterSpacing: '.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row[0]}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--line)', color: 'var(--white)' }}>{row[0]}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{row[1]}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{row[2]}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose">
          <h2>The WOPR position</h2>
          <p>
            Anarchosyndicalism is the goal. Democratic socialism is the interim strategy. ML
            communism is a road we have taken many times — we know where it leads.
          </p>
          <p>
            You cannot build a free society by first consolidating all power into a vanguard
            party and hoping it relinquishes that power later. That has never happened. It will
            not happen. Building independent infrastructure outside the systems designed to
            exploit you is how the theory becomes practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow prose final-cta">
          <h2>Now what?</h2>
          <p style={{ margin: '0 auto', maxWidth: '62ch' }}>
            Understanding the architecture of power — who holds it, and what prevents its abuse —
            is the first step. Building outside the systems designed to exploit you is the second.
          </p>
          <div className="cta" style={{ marginTop: '30px' }}>
            <Link className="btn btn-solid" href="/duty">Read: Your Declaration →</Link>
            <Link className="btn" href="/join">Join WOPR →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
