'use client'

import { useState } from 'react'

// The simple chooser. One product, three sizes, ONE decision.
// Radio buttons rather than three separate buttons: the continue button's
// label is derived from the current selection, so the price on the button can
// never disagree with the size it sends you to.
export type Size = {
  id: 'small' | 'medium' | 'large'
  name: string
  price: string
  room: string
  photos: string
  speed: string
  good_for: string
  badge?: string
}

export default function SizePicker({ sizes }: { sizes: Size[] }) {
  const [picked, setPicked] = useState<Size['id']>(sizes[0]?.id ?? 'small')
  const current = sizes.find((s) => s.id === picked) ?? sizes[0]

  return (
    <div className="picker">
      <div className="sizes-radio" role="radiogroup" aria-label="Pick your size">
        {sizes.map((s) => {
          const on = s.id === picked
          return (
            <label
              key={s.id}
              className={'sizeopt' + (on ? ' on' : '')}
              onClick={() => setPicked(s.id)}
            >
              <input
                type="radio"
                name="size"
                value={s.id}
                checked={on}
                onChange={() => setPicked(s.id)}
              />
              <span className="dot" aria-hidden="true" />
              <span className="body">
                <span className="line1">
                  <strong>{s.name}</strong>
                  <span className="amt">{s.price}<small>/mo</small></span>
                </span>
                <span className="line2">
                  {s.room} — {s.photos}
                </span>
              </span>
              {s.badge ? <span className="badge">{s.badge}</span> : null}
            </label>
          )
        })}
      </div>

      <a className="btn btn-solid pickgo" href={`/join/name?size=${picked}`}>
        Continue with {current.name} — {current.price} a month &rarr;
      </a>
      <p className="pickfoot">You can move up to a bigger size later.</p>
    </div>
  )
}
