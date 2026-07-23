const body = [
  'Contact: mailto:support@wopr.systems',
  'Preferred-Languages: en',
  'Canonical: https://wopr.systems/.well-known/security.txt',
  'Expires: 2027-07-01T00:00:00Z',
  '',
].join('\n')

export function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
