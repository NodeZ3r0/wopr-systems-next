// The simple chooser. One product, three sizes. The ONLY decision on the page.
// The buy flow now lives entirely on wopr.systems (Next.js): the size choice
// travels to /join/name as a query param, so nothing is dropped at a
// cross-domain boundary the way the old orc.wopr.systems/onboard link did.

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

function link(size: Size['id']) {
  return `/join/name?size=${size}`
}

export default function SizePicker({ sizes }: { sizes: Size[] }) {
  return (
    <div className="grid g3 sizes" role="group" aria-label="Pick your size">
      {sizes.map((s) => (
        <div className={'card size' + (s.badge ? ' featured' : '')} key={s.id}>
          {s.badge ? <span className="badge">{s.badge}</span> : null}
          <h3>{s.name}</h3>
          <div className="price">
            {s.price}
            <small> a month</small>
          </div>
          <div className="room">
            {s.room}
            <span className="photos">{s.photos}</span>
          </div>
          <p className="speed">{s.speed}</p>
          <p className="desc">{s.good_for}</p>
          <a className="btn btn-solid btn-sm choose" href={link(s.id)}>
            Pick {s.name} &rarr;
          </a>
        </div>
      ))}
    </div>
  )
}
