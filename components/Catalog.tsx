'use client'
import { useState } from 'react'

const CO = 'https://wopr.systems/checkout'
const TIER_FLOOR: any = { '1': 50, '2': 200, '3': 500 }

function link(type: string, key: string, tier: string, vps: string, period: string) {
  let u = `${CO}?tier=t${tier}&bundle=${type}-${key}`
  if (vps) u += `&provider=contabo&vps_plan=${vps}`
  if (period === 'yearly') u += `&period=yearly`
  return u
}
function toCents(d: any) {
  const n = parseFloat(String(d).replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? 0 : Math.round(n * 100)
}
function money(c: number) {
  return '$' + (c / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Catalog({
  catalog,
  initialTier,
}: {
  catalog: any
  initialTier: string
}) {
  const [tier, setTier] = useState(initialTier)
  const [vpsKey, setVpsKey] = useState('')
  const [period, setPeriod] = useState('monthly')
  const yearly = period === 'yearly'
  const per = yearly ? '/yr' : '/mo'
  const tierInfo = catalog.tiers.find((t: any) => t.id === tier)
  const vpsList: any[] = catalog.vps || []
  const floor = TIER_FLOOR[tier] || 0
  const qualifies = (v: any) => v.disk_gb >= floor
  const firstOk = vpsList.find(qualifies) || null
  const selected = vpsList.find((v: any) => v.key === vpsKey)
  const effVps = selected && qualifies(selected) ? selected : firstOk
  const effKey = effVps ? effVps.key : ''
  const vpsCents = effVps ? (yearly ? effVps.amount_cents_yearly || 0 : effVps.amount_cents) : 0

  const bcard = (b: any, type: string) => {
    const bundleDisplay = yearly ? (b.prices_yearly ? b.prices_yearly[tier] : b.prices[tier]) : b.prices[tier]
    const bundleCents = toCents(bundleDisplay)
    const savings = yearly ? toCents(b.prices[tier]) * 2 : 0
    const total = bundleCents + vpsCents
    return (
      <div className="card" key={b.key}>
        <h3>{b.name}</h3>
        <div className="price">{bundleDisplay}<small> {per}</small></div>
        <div className="tiernote">Tier {tier} · {tierInfo?.storage}</div>
        {yearly && savings > 0 ? <div className="save">★ 2 months free — save {money(savings)}/yr</div> : null}
        {effVps ? (
          <div className="vline">+ {yearly ? effVps.price_display_yearly : effVps.price_display} <span>VPS · {effVps.plan_name}, at cost</span></div>
        ) : null}
        {effVps ? (
          <div className="total">{money(total)}<small> {per} all-in</small></div>
        ) : null}
        <p className="desc">{b.desc}</p>
        <a className="btn btn-solid btn-sm choose" href={link(type, b.key, tier, effKey, period)}>Choose →</a>
      </div>
    )
  }

  const roleLink = (key: string) => {
    if (key === 'free') return 'https://auth.wopr.systems'
    if (key === 'sovereign') return '#sovereign-suites'
    if (key === 'micro') return '#micro-bundles'
    return 'mailto:support@wopr.systems?subject=AI%20GPU%20Beacon'
  }

  const chooseTier = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault()
    setTier(id)
    setVpsKey('')
    window.history.replaceState(null, '', `/join?tier=t${id}`)
  }

  return (
    <>
      <div className="periodbar">
        <button type="button" aria-pressed={!yearly} className={'perbtn' + (!yearly ? ' on' : '')} onClick={() => setPeriod('monthly')}>Monthly</button>
        <button type="button" aria-pressed={yearly} className={'perbtn yr' + (yearly ? ' on' : '')} onClick={() => setPeriod('yearly')}>
          Yearly<span className="freetag">2 MONTHS FREE</span>
        </button>
      </div>

      <div className="grid g4 roles">
        {catalog.roles.map((r: any) => (
          <div className="card role" key={r.key}>
            <span className="badge">{r.price}</span>
            <h3>{r.name}</h3>
            <p className="desc">{r.desc}</p>
            <a className="btn btn-sm choose" href={roleLink(r.key)}>
              {r.key === 'beacon' ? 'Contact sales' : 'Get started'}
            </a>
          </div>
        ))}
      </div>

      <div className="sec-head" id="sovereign-suites" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Select your tier</h2>
        <p>Storage &amp; features scale with your tier.</p>
      </div>
      <form className="tierbar" action="/join" method="get" aria-label="Storage tier">
        {catalog.tiers.map((t: any) => (
          <button
            type="submit"
            name="tier"
            value={`t${t.id}`}
            aria-pressed={tier === t.id}
            key={t.id}
            className={'tier' + (tier === t.id ? ' on' : '')}
            onClick={(event) => chooseTier(event, t.id)}
          >
            <span className="lbl">{t.label}</span>{t.storage}
          </button>
        ))}
      </form>

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
                  type="button"
                  key={v.key}
                  disabled={!ok}
                  aria-pressed={on}
                  className={'vpscard' + (on ? ' on' : '') + (ok ? '' : ' off')}
                  onClick={() => ok && setVpsKey(v.key)}
                >
                  <div className="vpsname">{v.plan_name}</div>
                  <div className="vpsspecs">{v.cpu} vCPU · {v.ram_gb} GB RAM · {v.disk_gb} GB SSD</div>
                  <div className="vpsprice">{yearly ? v.price_display_yearly : v.price_display}<small> {per}</small></div>
                  {!ok ? <div className="vpsfloor">needs ≥ {floor} GB for this tier</div> : null}
                </button>
              )
            })}
          </div>
        </>
      ) : null}

      <div className="sec-head" id="micro-bundles" style={{ marginTop: 40, marginBottom: 18 }}>
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
        Bundle + VPS bill on one Stripe subscription · the VPS line is Contabo at cost, no WOPR markup{yearly ? ' · yearly = 2 months free on the bundle; hosting is full-year at cost' : ''}.
      </p>
    </>
  )
}
