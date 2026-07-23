import { ImageResponse } from 'next/og'

export const alt = 'WOPR Systems — private cloud and managed sovereign infrastructure'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 84px',
          color: '#e9ffe9',
          background: '#080b08',
          fontFamily: 'monospace',
          border: '12px solid #163916',
        }}
      >
        <div style={{ color: '#00ff41', fontSize: 26, letterSpacing: 8 }}>
          PRIVATE CLOUD · MANAGED INFRASTRUCTURE
        </div>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, marginTop: 34 }}>
          WOPR<span style={{ color: '#00ff41' }}>.SYSTEMS</span>
        </div>
        <div style={{ color: '#9dbf9d', fontSize: 34, marginTop: 26 }}>
          Your cloud. Your data. Your rules.
        </div>
      </div>
    ),
    size,
  )
}
