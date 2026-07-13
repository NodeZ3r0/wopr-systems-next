'use client'
import { useState } from 'react'
import catalog from '@/data/catalog.json'

const CO = 'https://wopr.systems/checkout'
function link(type: string, key: string, tier: string) {
  return `${CO}?tier=${tier}&bundle=${type}-${key}`
}

export default function Catalog() {
  const [tier, setTier] = useState('1')
  return (
    <>
      <div className="grid g4 roles">
        {catalog.roles.map((r) => (
          <div className="card role" key={r.key}>
            <span className="badge">{r.price}</span>
            <h3>{r.name}</h3>
            <p className="desc">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="sec-head" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Select your tier</h2>
        <p>Storage &amp; features scale with your tier.</p>
      </div>
      <div className="tierbar">
        {catalog.tiers.map((t) => (
          <button key={t.id} className={'tier' + (tier === t.id ? ' on' : '')} onClick={() => setTier(t.id)}>
            <span className="lbl">{t.label}</span>{t.storage}
          </button>
        ))}
      </div>

      <div className="sec-head" style={{ marginTop: 18, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Sovereign Suites</h2>
        <p>Complete bundles for individuals, creators, developers, and businesses.</p>
      </div>
      <div className="grid g3">
        {catalog.sovereign.map((b) => (
          <div className="card" key={b.key}>
            <h3>{b.name}</h3>
            <div className="price">{b.price}<small> /mo</small></div>
            <p className="desc">{b.desc}</p>
            <a className="btn btn-solid btn-sm choose" href={link('sovereign', b.key, tier)}>Choose \u2192</a>
          </div>
        ))}
      </div>

      <div className="sec-head" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Micro-Bundles</h2>
        <p>Niche-specific packages for creators, freelancers, and professionals.</p>
      </div>
      <div className="grid g3">
        {catalog.micro.map((b) => (
          <div className="card" key={b.key}>
            <h3>{b.name}</h3>
            <div className="price">{b.price}<small> /mo</small></div>
            <p className="desc">{b.desc}</p>
            <a className="btn btn-solid btn-sm choose" href={link('micro', b.key, tier)}>Choose \u2192</a>
          </div>
        ))}
      </div>

      <p className="foot" style={{ marginTop: 34, color: 'var(--muted)', fontSize: '.8rem', textAlign: 'center' }}>
        Checkout runs on the live wopr.systems Stripe flow \u00b7 VPS hosting billed by the provider, no WOPR markup.
      </p>
    </>
  )
}
