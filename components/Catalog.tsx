'use client'
import { useState } from 'react'

const CO = 'https://wopr.systems/checkout'
const TIER_FLOOR: any = { '1': 50, '2': 200, '3': 500 }

function link(type: string, key: string, tier: string, vps: string) {
  return `${CO}?tier=${tier}&bundle=${type}-${key}` + (vps ? `&vps_plan=${vps}` : '')
}
function toCents(d: string) {
  const n = parseFloat(String(d).replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? 0 : Math.round(n * 100)
}
function money(c: number) {
  return '$' + (c / 100).toFixed(2)
}

export default function Catalog({ catalog }: { catalog: any }) {
  const [tier, setTier] = useState('1')
  const [vpsKey, setVpsKey] = useState('')
  const tierInfo = catalog.tiers.find((t: any) => t.id === tier)
  const vpsList: any[] = catalog.vps || []
  const floor = TIER_FLOOR[tier] || 0
  const qualifies = (v: any) => v.disk_gb >= floor
  const firstOk = vpsList.find(qualifies) || null // fail closed: never emit a sub-floor VPS
  const selected = vpsList.find((v: any) => v.key === vpsKey)
  const effVps = selected && qualifies(selected) ? selected : firstOk
  const effKey = effVps ? effVps.key : ''
  const vpsCents = effVps ? effVps.amount_cents : 0

  const bcard = (b: any, type: string) => {
    const total = toCents(b.prices[tier]) + vpsCents
    return (
      <div className="card" key={b.key}>
        <h3>{b.name}</h3>
        <div className="price">{b.prices[tier]}<small> /mo</small></div>
        <div className="tiernote">Tier {tier} · {tierInfo?.storage}</div>
        {effVps ? (
          <div className="vline">+ {effVps.price_display} <span>VPS · {effVps.plan_name}, at cost</span></div>
        ) : null}
        {effVps ? (
          <div className="total">{money(total)}<small> /mo all-in</small></div>
        ) : null}
        <p className="desc">{b.desc}</p>
        <a className="btn btn-solid btn-sm choose" href={link(type, b.key, tier, effKey)}>Choose →</a>
      </div>
    )
  }

  return (
    <>
      <div className="grid g4 roles">
        {catalog.roles.map((r: any) => (
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
        {catalog.tiers.map((t: any) => (
          <button key={t.id} className={'tier' + (tier === t.id ? ' on' : '')} onClick={() => setTier(t.id)}>
            <span className="lbl">{t.label}</span>{t.storage}
          </button>
        ))}
      </div>

      {vpsList.length > 0 ? (
        <>
          <div className="sec-head" style={{ marginTop: 34, marginBottom: 14 }}>
            <h2 className="glow" style={{ fontSize: '1.5rem' }}>Select your VPS host</h2>
            <p>Your beacon runs on a Contabo VPS — billed at cost, zero WOPR markup. Pick one that fits your tier; scale up anytime.</p>
          </div>
          <div className="grid g4 vpsbar">
            {vpsList.map((v: any) => {
              const ok = qualifies(v)
              const on = ok && v.key === effKey
              return (
                <button
                  key={v.key}
                  disabled={!ok}
                  className={'vpscard' + (on ? ' on' : '') + (ok ? '' : ' off')}
                  onClick={() => ok && setVpsKey(v.key)}
                >
                  <div className="vpsname">{v.plan_name}</div>
                  <div className="vpsspecs">{v.cpu} vCPU · {v.ram_gb} GB RAM · {v.disk_gb} GB SSD</div>
                  <div className="vpsprice">{v.price_display}<small> /mo</small></div>
                  {!ok ? <div className="vpsfloor">needs ≥ {floor} GB for this tier</div> : null}
                </button>
              )
            })}
          </div>
        </>
      ) : null}

      <div className="sec-head" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Sovereign Suites</h2>
        <p>Complete bundles for individuals, creators, developers, and businesses.</p>
      </div>
      <div className="grid g3">{catalog.sovereign.map((b: any) => bcard(b, 'sovereign'))}</div>

      <div className="sec-head" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Micro-Bundles</h2>
        <p>Niche-specific packages for creators, freelancers, and professionals.</p>
      </div>
      <div className="grid g3">{catalog.micro.map((b: any) => bcard(b, 'micro'))}</div>

      <p className="foot" style={{ marginTop: 34, color: 'var(--muted)', fontSize: '.8rem', textAlign: 'center' }}>
        Bundle + VPS bill on one Stripe subscription · the VPS line is Contabo at cost, no WOPR markup.
      </p>
    </>
  )
}
