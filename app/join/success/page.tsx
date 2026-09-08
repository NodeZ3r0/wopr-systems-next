'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Stripe returns here after payment (success_url set in the control plane's
// create-checkout). We confirm the session, then send the customer to the live
// provisioning watch page (which lives on orc and is public).
const API = 'https://orc.wopr.systems'

type Order = { bundle_name?: string; beacon_name?: string; email?: string; amount?: string }

function SuccessBody() {
  const params = useSearchParams()
  const sessionId = params.get('session_id') || ''
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')
  const [order, setOrder] = useState<Order>({})
  const [setupUrl, setSetupUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) { setState('error'); return }
    let cancelled = false
    ;(async () => {
      try {
        const r = await fetch(`${API}/api/v1/onboard/success?session_id=${encodeURIComponent(sessionId)}`)
        const d = await r.json()
        if (cancelled) return
        if (!r.ok) throw new Error('not ready')
        setOrder(d.order || {})
        setSetupUrl(d.setup_url ? `${API}${d.setup_url}` : null)
        setState('ok')
      } catch {
        if (!cancelled) setState('error')
      }
    })()
    return () => { cancelled = true }
  }, [sessionId])

  return (
    <section className="section">
      <div className="wrap narrow" style={{ textAlign: 'center' }}>
        {state === 'loading' && <p>Confirming your payment…</p>}

        {state === 'ok' && (
          <>
            <h1 className="glow" style={{ fontSize: '1.8rem' }}>You&apos;re in! 🎉</h1>
            <p className="page-lead">
              We&apos;re building your cloud now. It usually takes a few minutes. We&apos;ll email you
              at <strong>{order.email}</strong> the moment it&apos;s ready.
            </p>
            {order.beacon_name && (
              <p style={{ fontSize: '1.1rem' }}>
                Your address: <strong>{order.beacon_name}.wopr.systems</strong>
              </p>
            )}
            {setupUrl && (
              <div className="cta" style={{ marginTop: 22, justifyContent: 'center' }}>
                <a className="btn btn-solid" href={setupUrl}>Watch it get built &rarr;</a>
              </div>
            )}
          </>
        )}

        {state === 'error' && (
          <>
            <h1 className="glow" style={{ fontSize: '1.6rem' }}>Payment received</h1>
            <p className="page-lead">
              Thank you! If you just paid, your cloud is being set up and we&apos;ll email you when it&apos;s
              ready. If you have any trouble, email <a href="mailto:support@wopr.systems">support@wopr.systems</a>.
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default function JoinSuccess() {
  return (
    <Suspense fallback={<section className="section"><div className="wrap narrow"><p>Loading…</p></div></section>}>
      <SuccessBody />
    </Suspense>
  )
}
