'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const localLinks = [
  { href: '/', label: 'Home' },
  { href: '/why', label: 'Why WOPR' },
  { href: '/#platform', label: 'Platform' },
  { href: '/#model', label: 'How it works' },
  { href: '/join', label: 'Plans & pricing' },
]

const globalGroups = [
  {
    label: 'Network',
    links: [
      ['Folkmoot', 'https://folkmoot.app'],
      ['Nodez3r0', 'https://nodez3r0.wopr.systems'],
      ['WOPR Login', 'https://auth.wopr.systems'],
    ],
  },
  {
    label: 'Public initiatives',
    links: [
      ['Project 2032', 'https://project2032.us'],
      ['Power for the People', 'https://powerforthepeople.party'],
      ['ASScast', 'https://asscast.org'],
      ['WOPR TV', 'https://wopr-tv.wopr.systems'],
    ],
  },
  {
    label: 'Community',
    links: [
      ['Social', 'https://social.wopr.systems'],
      ['Forum', 'https://forum.wopr.systems'],
      ['Video', 'https://video.wopr.systems'],
    ],
  },
]

type Menu = 'global' | 'local' | null

export default function SiteHeader() {
  const [menu, setMenu] = useState<Menu>(null)
  const localButtonRef = useRef<HTMLButtonElement>(null)

  const close = () => setMenu(null)
  const toggle = (next: Exclude<Menu, null>) => setMenu((current) => current === next ? null : next)

  useEffect(() => {
    if (!menu) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        if (menu === 'local') localButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menu])

  return (
    <header className="bar">
      <div className="wrap bar-in">
        <button
          className={`global-button${menu === 'global' ? ' open' : ''}`}
          type="button"
          aria-expanded={menu === 'global'}
          aria-controls="global-menu"
          onClick={() => toggle('global')}
        >
          <span className="global-button-icon" aria-hidden="true">◫</span>
          <span>Network</span>
        </button>
        <Link className="brand" href="/" onClick={close}>
          WOPR<b>.SYSTEMS</b>
        </Link>
        <span className="status"><span className="dot" aria-hidden="true" />Network online</span>
        <button
          ref={localButtonRef}
          className={`menu-button${menu === 'local' ? ' open' : ''}`}
          type="button"
          aria-expanded={menu === 'local'}
          aria-controls="local-menu"
          aria-label={menu === 'local' ? 'Close WOPR Systems menu' : 'Open WOPR Systems menu'}
          onClick={() => toggle('local')}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      {menu ? (
        <>
          <button className="menu-scrim" type="button" aria-label="Close menu" onClick={close} />
          {menu === 'global' ? (
            <nav id="global-menu" className="drawer-menu global-menu" aria-label="WOPR network">
              <div className="local-menu-label">// Global network</div>
              {globalGroups.map((group) => (
                <div className="global-group" key={group.label}>
                  <div className="global-group-label">{group.label}</div>
                  {group.links.map(([label, href]) => (
                    <a key={href} href={href} onClick={close}>{label}</a>
                  ))}
                </div>
              ))}
            </nav>
          ) : (
            <nav id="local-menu" className="drawer-menu local-menu" aria-label="WOPR Systems">
              <div className="local-menu-label">// WOPR Systems</div>
              {localLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>
              ))}
              <div className="local-menu-divider" />
              <a href="https://nodez3r0.wopr.systems" onClick={close}>Nodez3r0</a>
              <a href="https://auth.wopr.systems" onClick={close}>Login</a>
            </nav>
          )}
        </>
      ) : null}
    </header>
  )
}
