'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// The whole pre-purchase flow lives on wopr.systems now. This step collects the
// customer's ADDRESS (the fun ownership moment) plus email, then hands off to
// Stripe. It calls the control plane cross-origin; CORS already allows
// https://wopr.systems and these three endpoints bypass Authentik (public).
const API = 'https://orc.wopr.systems'

const SIZES: Record<string, { name: string; tier: string; price: string; room: string }> = {
  small: { name: 'Small', tier: 't1', price: '$24.99', room: '50 GB of room' },
  medium: { name: 'Medium', tier: 't2', price: '$39.99', room: '200 GB of room' },
  large: { name: 'Large', tier: 't3', price: '$54.99', room: '500 GB of room' },
}

type NameState = 'idle' | 'checking' | 'ok' | 'taken' | 'error'

function sanitize(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24)
}

function NameForm() {
  const params = useSearchParams()
  const sizeKey = (params.get('size') || 'medium').toLowerCase()
  const size = SIZES[sizeKey] || SIZES.medium

  const [beacon, setBeacon] = useState('')
  const [nameState, setNameState] = useState<NameState>('idle')
  const [nameMsg, setNameMsg] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const check = useCallback(async (value: string) => {
    if (!value || value.length < 3) {
      setNameState('idle')
      setNameMsg('')
      return
    }
    setNameState('checking')
    try {
      const r = await fetch(`${API}/api/v1/onboard/validate-beacon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value }),
      })
      const d = await r.json()
      if (d.available) {
        setNameState('ok')
        setNameMsg('')
      } else {
        setNameState('taken')
        setNameMsg(d.message || 'That name is taken. Try another.')
      }
    } catch {
      setNameState('error')
      setNameMsg('Could not check that name. Try again.')
    }
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => check(beacon), 450)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [beacon, check])

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canPay = nameState === 'ok' && emailOk && fullName.trim().length > 0 && !submitting

  async function pay() {
    if (!canPay) return
    setSubmitting(true)
    setError('')
    try {
      const r = await fetch(`${API}/api/v1/onboard/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundle: 'starter',
          tier: size.tier,
          period: 'monthly',
          email: email.trim(),
          name: fullName.trim(),
          beacon_name: beacon,
          region: 'auto',
        }),
      })
      const d = await r.json()
      if (!r.ok) {
        const msg = typeof d.detail === 'string' ? d.detail : (d.detail?.message || 'Something went wrong. Please try again.')
        throw new Error(msg)
      }
      window.location.href = d.checkout_url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="wrap narrow">
        <div className="sec-head" style={{ marginBottom: 18 }}>
          <h1 className="glow" style={{ fontSize: '1.6rem' }}>Pick your address</h1>
          <p>You picked <strong>{size.name}</strong> — {size.price} a month, {size.room}. Now name your place. This is where your stuff will live.</p>
        </div>

        <div className="card" style={{ maxWidth: 560 }}>
          <label htmlFor="beacon" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Your address</label>
          <div className="addr-row">
            <input
              id="beacon"
              inputMode="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="your-name"
              value={beacon}
              onChange={(e) => setBeacon(sanitize(e.target.value))}
              aria-describedby="beacon-note"
            />
            <span className="addr-suffix">.wopr.systems</span>
          </div>
          <div id="beacon-note" className="addr-note">
            {nameState === 'checking' && <span>Checking…</span>}
            {nameState === 'ok' && <span className="ok">✓ {beacon}.wopr.systems is yours</span>}
            {(nameState === 'taken' || nameState === 'error') && <span className="bad">{nameMsg}</span>}
            {nameState === 'idle' && <span>Lowercase letters, numbers and dashes. You can&apos;t change this later, so pick one you like.</span>}
          </div>

          <label htmlFor="fullname" style={{ display: 'block', fontWeight: 600, margin: '18px 0 6px' }}>Your name</label>
          <input id="fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="First Last" />

          <label htmlFor="email" style={{ display: 'block', fontWeight: 600, margin: '18px 0 6px' }}>Your email</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <div className="addr-note">We send your login here. That&apos;s it — no spam.</div>

          {error && <p className="bad" style={{ marginTop: 14 }}>{error}</p>}

          <button type="button" className="btn btn-solid" style={{ width: '100%', marginTop: 20 }} disabled={!canPay} onClick={pay}>
            {submitting ? 'Taking you to payment…' : `Continue to payment — ${size.price}/mo`}
          </button>
          <p className="addr-note" style={{ textAlign: 'center', marginTop: 10 }}>
            You pay on the next screen. Cancel any time.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function JoinName() {
  return (
    <Suspense fallback={<section className="section"><div className="wrap narrow"><p>Loading…</p></div></section>}>
      <NameForm />
    </Suspense>
  )
}
