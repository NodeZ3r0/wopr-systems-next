'use client'
import { useState } from 'react'

const CHECKOUT = 'https://wopr.systems/checkout'

// Each storefront tier maps to a Contabo VPS box. RAM gates which bundles can run
// on it; a bundle whose min box is bigger than a tier's box grays that tier out.
const TIER_BOX: Record<string, { box: string; ramGb: number; storage: string }> = {
  '1': { box: 'VPS M', ramGb: 16, storage: '50GB' },
  '2': { box: 'VPS L', ramGb: 30, storage: '200GB' },
  '3': { box: 'VPS XL', ramGb: 60, storage: '500GB+' },
}

function checkoutLink(type: string, key: string, tier: string, period: string) {
  let url = `${CHECKOUT}?tier=t${tier}&bundle=${type}-${key}`
  if (period === 'yearly') url += '&period=yearly'
  return url
}

function toCents(display: unknown) {
  const amount = Number.parseFloat(String(display).replace(/[^0-9.]/g, ''))
  return Number.isNaN(amount) ? 0 : Math.round(amount * 100)
}

function money(cents: number) {
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function BundleCard({
  bundle,
  type,
  tiers,
  period,
}: {
  bundle: any
  type: string
  tiers: any[]
  period: string
}) {
  // Smallest tier this bundle can actually run on (1 = VPS M base).
  const minTier = Number(bundle.min_tier) || 1
  const [tier, setTier] = useState(String(minTier))
  const yearly = period === 'yearly'
  const per = yearly ? '/yr' : '/mo'
  const box = TIER_BOX[tier]
  const minBox = TIER_BOX[String(minTier)]

  const display = yearly
    ? (bundle.prices_yearly ? bundle.prices_yearly[tier] : bundle.prices[tier])
    : bundle.prices[tier]
  const savings = yearly ? toCents(bundle.prices[tier]) * 2 : 0

  return (
    <div className="card">
      <h3>{bundle.name}</h3>
      <div className="price">{display}<small> {per}</small></div>

      <div className="tierpick" role="group" aria-label={`Server size for ${bundle.name}`}>
        {tiers.map((t: any) => {
          const locked = Number(t.id) < minTier
          const info = TIER_BOX[t.id]
          return (
            <button
              key={t.id}
              type="button"
              className={'tierchip' + (t.id === tier ? ' on' : '') + (locked ? ' locked' : '')}
              aria-pressed={t.id === tier}
              disabled={locked}
              aria-label={locked
                ? `${info.box} — too small for ${bundle.name}, needs ${minBox.box} or larger`
                : `${info.box}, ${info.storage} storage`}
              title={locked ? `Needs ${minBox.box}+ — ${bundle.name} won't fit on ${info.box}` : undefined}
              onClick={() => { if (!locked) setTier(t.id) }}
            >
              <span className="tc-box">{info.box}</span>
              <span className="tc-store">{info.storage}</span>
            </button>
          )
        })}
      </div>

      <div className="tiernote">{box.storage} storage · {box.box} ({box.ramGb} GB RAM)</div>
      <div className="included">Managed hosting included</div>
      {minTier > 1 ? (
        <div className="minnote">Requires {minBox.box}+ — larger suite</div>
      ) : null}
      {savings > 0 ? <div className="save">★ 2 months free — save {money(savings)}/yr</div> : null}
      <p className="desc">{bundle.desc}</p>
      <a
        className="btn btn-solid btn-sm choose"
        href={checkoutLink(type, bundle.key, tier, period)}
      >
        Choose →
      </a>
    </div>
  )
}

export default function Catalog({
  catalog,
  initialTier,
}: {
  catalog: any
  initialTier: string
}) {
  const [period, setPeriod] = useState('monthly')
  const yearly = period === 'yearly'

  const roleLink = (key: string) => {
    if (key === 'free') return 'https://auth.wopr.systems'
    if (key === 'sovereign') return '#sovereign-suites'
    if (key === 'micro') return '#specialty-bundles'
    return 'mailto:stephen.falken@wopr.systems?subject=AI%20GPU%20Beacon%20%E2%80%94%20Custom%20Contract%20Inquiry'
  }

  return (
    <>
      <div className="periodbar">
        <button
          type="button"
          aria-pressed={!yearly}
          className={'perbtn' + (!yearly ? ' on' : '')}
          onClick={() => setPeriod('monthly')}
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={yearly}
          className={'perbtn yr' + (yearly ? ' on' : '')}
          onClick={() => setPeriod('yearly')}
        >
          Yearly<span className="freetag">2 MONTHS FREE</span>
        </button>
      </div>

      <div className="grid g4 roles">
        {catalog.roles.map((role: any) => (
          <div className="card role" key={role.key}>
            <span className="badge">{role.price}</span>
            <h3>{role.name}</h3>
            <p className="desc">{role.desc}</p>
            <a className="btn btn-sm choose" href={roleLink(role.key)}>
              {role.key === 'beacon' ? 'Contact sales' : 'Get started'}
            </a>
          </div>
        ))}
      </div>

      <div className="pricing-note">
        <strong>Each plan starts on the smallest server that runs it.</strong>
        <span>Bigger suites need a bigger box, so tiers too small for a bundle are grayed out. One all-in price includes the server, managed hosting, and support.</span>
      </div>

      <div className="sec-head" id="sovereign-suites" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Sovereign Suites</h2>
        <p>Complete bundles for individuals, creators, developers, and businesses.</p>
      </div>
      <div className="grid g3">
        {catalog.sovereign.map((bundle: any) => (
          <BundleCard key={bundle.key} bundle={bundle} type="sovereign" tiers={catalog.tiers} period={period} />
        ))}
      </div>

      <div className="sec-head" id="specialty-bundles" style={{ marginTop: 40, marginBottom: 18 }}>
        <h2 className="glow" style={{ fontSize: '1.5rem' }}>Specialty Bundles</h2>
        <p>Focused packages for creators, freelancers, and professionals.</p>
      </div>
      <div className="grid g3">
        {catalog.micro.map((bundle: any) => (
          <BundleCard key={bundle.key} bundle={bundle} type="micro" tiers={catalog.tiers} period={period} />
        ))}
      </div>

      <p
        className="foot"
        style={{ marginTop: 34, color: 'var(--muted)', fontSize: '.8rem', textAlign: 'center' }}
      >
        Every paid plan is one all-in Stripe subscription with managed hosting included
        {yearly ? ' · yearly plans include two months free' : ''}.
      </p>
    </>
  )
}
