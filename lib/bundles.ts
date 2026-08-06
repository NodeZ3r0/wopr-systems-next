import catalog from '@/data/catalog.json'

// Application metadata. `replaces` is the mainstream product a searcher is most
// likely typing about ("self-hosted alternative to X") — these are the commercial
// queries the bundle pages exist to answer. Descriptions state what each app does
// and nothing more; do not add capability claims that the deployed app lacks.
export type AppInfo = { name: string; what: string; replaces?: string }

export const APPS: Record<string, AppInfo> = {
  nextcloud:      { name: 'Nextcloud',      what: 'File sync and sharing, calendar and contacts, across desktop and mobile.', replaces: 'Google Drive' },
  vaultwarden:    { name: 'Vaultwarden',    what: 'Password manager that works with the Bitwarden apps and browser extensions.', replaces: '1Password / LastPass' },
  freshrss:       { name: 'FreshRSS',       what: 'RSS reader that follows sites and podcasts without an algorithm in between.', replaces: 'Feedly' },
  linkwarden:     { name: 'Linkwarden',     what: 'Bookmark manager that archives a copy of each page so links do not rot.', replaces: 'Pocket / Raindrop' },
  vikunja:        { name: 'Vikunja',        what: 'Task and project management with lists, boards and due dates.', replaces: 'Todoist / Asana' },
  ghost:          { name: 'Ghost',          what: 'Publishing platform for a blog or site, with built-in email newsletters and paid memberships.', replaces: 'Substack / Medium' },
  saleor:         { name: 'Saleor',         what: 'Storefront and checkout for selling products directly to customers.', replaces: 'Shopify / Etsy' },
  immich:         { name: 'Immich',         what: 'Photo and video library with automatic phone backup, albums and search.', replaces: 'Google Photos' },
  listmonk:       { name: 'Listmonk',       what: 'Mailing list and newsletter sender you own, including the subscriber list.', replaces: 'Mailchimp' },
  forgejo:        { name: 'Forgejo',        what: 'Git hosting with issues, pull requests and releases.', replaces: 'GitHub' },
  woodpecker:     { name: 'Woodpecker CI',  what: 'Continuous integration that builds and tests on every push.', replaces: 'GitHub Actions' },
  code_server:    { name: 'code-server',    what: 'VS Code running in the browser, on your own machine.', replaces: 'GitHub Codespaces' },
  reactor:        { name: 'Reactor AI',     what: 'WOPR coding assistant and pipeline running against local models.' },
  ollama:         { name: 'Ollama',         what: 'Runs open language models locally, so prompts never leave your infrastructure.' },
  uptime_kuma:    { name: 'Uptime Kuma',    what: 'Uptime monitoring with alerts when a service stops answering.', replaces: 'Pingdom' },
  matrix:         { name: 'Matrix',         what: 'Chat server for encrypted team and community messaging.', replaces: 'Slack / Discord' },
  element:        { name: 'Element',        what: 'Chat client for Matrix, on web, desktop and mobile.' },
  jitsi:          { name: 'Jitsi Meet',     what: 'Video meetings in the browser with no account required for guests.', replaces: 'Zoom' },
  collabora:      { name: 'Collabora Online', what: 'Office suite for documents, spreadsheets and slides, edited in the browser.', replaces: 'Google Docs' },
  outline:        { name: 'Outline',        what: 'Team wiki and knowledge base with search and nested documents.', replaces: 'Notion / Confluence' },
  defcon_one:     { name: 'DEFCON ONE',     what: 'WOPR safety control plane that requires human confirmation before damaging AI changes land.' },
  grafana:        { name: 'Grafana',        what: 'Dashboards and graphs for metrics from your services.' },
  invoice_ninja:  { name: 'Invoice Ninja',  what: 'Invoices, quotes and payment tracking for clients.', replaces: 'FreshBooks' },
  cal_com:        { name: 'Cal.com',        what: 'Booking page that shares your availability and schedules meetings.', replaces: 'Calendly' },
  docuseal:       { name: 'DocuSeal',       what: 'Send documents for legally binding electronic signature.', replaces: 'DocuSign' },
  paperless:      { name: 'Paperless-ngx',  what: 'Scans and OCRs documents into a searchable archive.', replaces: 'Evernote / a filing cabinet' },
  jellyfin:       { name: 'Jellyfin',       what: 'Media server that streams your own films and shows to any device.', replaces: 'Plex' },
  navidrome:      { name: 'Navidrome',      what: 'Music streaming from your own library to phone and desktop.', replaces: 'Spotify' },
  audiobookshelf: { name: 'Audiobookshelf', what: 'Hosts podcasts and audiobooks and publishes your own podcast feed.' },
  peertube:       { name: 'PeerTube',       what: 'Video hosting and channels on a platform you control.', replaces: 'YouTube' },
  authentik:      { name: 'Authentik',      what: 'Single sign-on, so one login works across every app in your beacon.' },
  dashboard:      { name: 'WOPR Dashboard', what: 'The control panel where you manage every service without touching a terminal.' },
}

// Which applications each bundle installs. Source of truth:
// control_plane/authentik_apps.py. Bundles absent here ship no published app
// manifest — their pages omit the "what's included" list rather than invent one.
export const BUNDLE_APPS: Record<string, string[]> = {
  starter: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','authentik','dashboard'],
  creator: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','ghost','saleor','immich','listmonk','authentik','dashboard'],
  developer: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','forgejo','woodpecker','code_server','reactor','ollama','uptime_kuma','authentik','dashboard'],
  professional: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','ghost','saleor','immich','listmonk','forgejo','woodpecker','code_server','reactor','ollama','matrix','element','jitsi','collabora','outline','defcon_one','uptime_kuma','grafana','authentik','dashboard'],
  family: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','immich','jellyfin','navidrome','authentik','dashboard'],
  smallbusiness: ['nextcloud','vaultwarden','freshrss','linkwarden','vikunja','ghost','saleor','immich','listmonk','forgejo','woodpecker','reactor','ollama','matrix','element','jitsi','collabora','outline','invoice_ninja','cal_com','docuseal','paperless','defcon_one','uptime_kuma','grafana','authentik','dashboard'],
  meeting_room: ['jitsi','cal_com','outline','authentik','dashboard'],
  privacy_pack: ['nextcloud','vaultwarden','authentik','dashboard'],
  writer_studio: ['ghost','listmonk','linkwarden','freshrss','authentik','dashboard'],
  artist_storefront: ['saleor','immich','ghost','authentik','dashboard'],
  podcaster: ['audiobookshelf','ghost','listmonk','authentik','dashboard'],
  freelancer: ['invoice_ninja','cal_com','nextcloud','vaultwarden','authentik','dashboard'],
  musician: ['navidrome','ghost','saleor','authentik','dashboard'],
  family_hub: ['nextcloud','vaultwarden','immich','authentik','dashboard'],
  photographer: ['immich','saleor','ghost','authentik','dashboard'],
  bookkeeper: ['paperless','nextcloud','vaultwarden','authentik','dashboard'],
  video_creator: ['peertube','ghost','saleor','authentik','dashboard'],
  contractor: ['docuseal','vikunja','invoice_ninja','cal_com','authentik','dashboard'],
  realtor: ['immich','cal_com','docuseal','nextcloud','authentik','dashboard'],
  educator: ['jitsi','collabora','outline','nextcloud','authentik','dashboard'],
  therapist: ['jitsi','cal_com','nextcloud','vaultwarden','authentik','dashboard'],
  legal: ['paperless','docuseal','vaultwarden','nextcloud','authentik','dashboard'],
}

// Search-facing framing per bundle: who is typing, and the phrase they type.
// Used for the page title, lead paragraph and "who it's for" — this is what makes
// each page eligible for a query instead of duplicating the pricing grid.
export const BUNDLE_INTENT: Record<string, { audience: string; headline: string; lead: string }> = {
  starter:            { audience: 'anyone leaving Big Tech',            headline: 'Self-Hosted Google Drive Alternative',        lead: 'Your files, calendar, notes, tasks and passwords on infrastructure you own — without administering a Linux box.' },
  creator:            { audience: 'creators who sell their own work',    headline: 'Self-Hosted Blog, Store and Newsletter',      lead: 'Publish, sell and email your audience from a stack you control, with no platform taking a cut or changing the rules.' },
  developer:          { audience: 'developers who want their own stack', headline: 'Self-Hosted Git, CI and AI Coding',           lead: 'Git hosting, continuous integration, a browser IDE and a local-model coding assistant, all under your own domain.' },
  professional:       { audience: 'professionals running everything',    headline: 'Self-Hosted Creator and Developer Suite',     lead: 'The Creator and Developer stacks combined, plus team chat, office suite, wiki and the DEFCON ONE safety gateway.' },
  family:             { audience: 'families sharing one setup',          headline: 'Self-Hosted Family Cloud for Six People',     lead: 'Shared drive, photo library, media and passwords for up to six accounts, with no advertising profile built on your household.' },
  smallbusiness:      { audience: 'small teams without an IT department',headline: 'Self-Hosted Business Suite',                  lead: 'Invoicing, scheduling, contracts, documents, chat and office tools for a team, run for you.' },
  enterprise:         { audience: 'organizations with custom needs',     headline: 'Self-Hosted Enterprise Infrastructure',       lead: 'Unlimited accounts, custom integrations, the full AI suite and dedicated support.' },
  personal_productivity:{ audience: 'people organizing their own work',  headline: 'Self-Hosted Task and Note Manager',           lead: 'Tasks, notes and personal organization on your own infrastructure.' },
  meeting_room:       { audience: 'anyone done paying for Zoom',         headline: 'Self-Hosted Zoom Alternative',                lead: 'Video meetings, a booking page and shared notes, on your own domain, with no per-seat licence.' },
  privacy_pack:       { audience: 'people who want the data back',       headline: 'Private Encrypted Storage and Passwords',     lead: 'Encrypted file storage and a password manager, hosted for you, with no vendor reading the contents.' },
  writer_studio:      { audience: 'writers leaving Substack',            headline: 'Self-Hosted Substack Alternative',            lead: 'A blog, a newsletter and your subscriber list — owned outright, so nobody can deplatform your mailing list.' },
  artist_storefront:  { audience: 'artists selling direct',              headline: 'Self-Hosted Etsy Alternative for Artists',    lead: 'An online store, a portfolio and image galleries, so sales go to you instead of a marketplace fee.' },
  podcaster:          { audience: 'podcasters who want their feed',      headline: 'Self-Hosted Podcast Hosting',                 lead: 'Host the audio, publish the show-notes site and own the RSS feed and mailing list outright.' },
  freelancer:         { audience: 'freelancers running a business',      headline: 'Self-Hosted Invoicing and Scheduling',        lead: 'Invoices, a booking page, file storage and passwords — the back office of a one-person business.' },
  musician:           { audience: 'musicians who own their catalogue',   headline: 'Self-Hosted Music Streaming and Merch',       lead: 'Stream your own catalogue, run an artist site and sell merch without a distributor in the middle.' },
  family_hub:         { audience: 'households sharing files and photos', headline: 'Shared Family Drive and Photo Library',       lead: 'A shared drive, photo library and password vault for six family members.' },
  photographer:       { audience: 'photographers delivering to clients', headline: 'Self-Hosted Client Galleries and Print Sales',lead: 'A photo library, client galleries, a portfolio and a store for print sales, all on your own domain.' },
  bookkeeper:         { audience: 'bookkeepers handling documents',      headline: 'Self-Hosted Document Archive and Client Portal', lead: 'Scan, OCR and search every document, and share securely with clients.' },
  video_creator:      { audience: 'video makers leaving YouTube',        headline: 'Self-Hosted YouTube Alternative',             lead: 'Host video on your own platform, run the community blog and sell memberships without demonetization.' },
  contractor:         { audience: 'contractors managing jobs',           headline: 'Self-Hosted Contracts and Job Management',    lead: 'Digital contracts, e-signatures, project tracking, invoicing and scheduling for trade work.' },
  realtor:            { audience: 'agents managing listings',            headline: 'Self-Hosted Listing Photos and Contracts',    lead: 'Listing photo libraries, client scheduling, e-signed contracts and document storage.' },
  educator:           { audience: 'teachers running a classroom',        headline: 'Self-Hosted Virtual Classroom',               lead: 'Video classes, collaborative documents, a class wiki and file sharing for students.' },
  therapist:          { audience: 'therapists and coaches seeing clients',headline: 'Self-Hosted Secure Video Sessions',          lead: 'Private video sessions, booking, encrypted notes and a client portal on infrastructure you control.' },
  legal:              { audience: 'small legal practices',               headline: 'Self-Hosted Document Management and E-Signatures', lead: 'A searchable document archive, e-signatures, a password vault and a secure client portal.' },
}

export type Bundle = {
  key: string
  slug: string
  name: string
  desc: string
  prices: Record<string, string>
  type: 'sovereign' | 'micro'
  apps: string[]
  intent?: { audience: string; headline: string; lead: string }
}

export const TIERS = catalog.tiers as { id: string; label: string; storage: string }[]

function build(type: 'sovereign' | 'micro'): Bundle[] {
  return (catalog[type] as any[]).map((b) => ({
    key: b.key,
    slug: b.key.replace(/_/g, '-'),
    name: b.name,
    desc: b.desc,
    prices: b.prices,
    type,
    apps: BUNDLE_APPS[b.key] ?? [],
    intent: BUNDLE_INTENT[b.key],
  }))
}

export const BUNDLES: Bundle[] = [...build('sovereign'), ...build('micro')]

export function getBundle(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug)
}

export function relatedBundles(b: Bundle, n = 3): Bundle[] {
  const overlap = (o: Bundle) => o.apps.filter((a) => b.apps.includes(a)).length
  return BUNDLES.filter((o) => o.slug !== b.slug)
    .sort((x, y) => overlap(y) - overlap(x))
    .slice(0, n)
}
