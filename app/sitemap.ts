import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { BUNDLES } from '@/lib/bundles'

// Every route under app/ that renders a public page MUST be listed here.
// Next does not derive this automatically — pages missing from this list are
// live but undiscoverable, which is how /about /allies /constitution /duty
// /faq /theory (~8,700 words) sat unindexed. Add a line when you add a page.
// Generated /learn articles. Regenerate this list when the content engine
// publishes new pages (ls /var/www/wopr-content/wopr.systems/learn/).
const LEARN_SLUGS = [
  'big-tech-alternatives-that-respect-privacy',
  'community-owned-internet-explained',
  'community-technology-cooperatives',
  'degoogle-your-life-step-by-step',
  'digital-sovereignty-for-communities',
  'how-do-mesh-networks-work',
  'how-to-leave-big-tech',
  'how-to-self-host-your-own-cloud',
  'leaving-big-tech-a-practical-guide',
  'own-your-data-online',
  'self-hosted-alternatives-to-google',
  'self-hosted-alternatives-to-google-photos',
  'what-is-a-community-mesh-network',
  'what-is-data-sovereignty',
  'what-is-decentralized-social-media',
  'what-is-digital-sovereignty',
  'what-is-federated-identity',
  'what-is-the-fediverse',
  'why-self-hosting-matters',
  'wireless-mesh-network-for-a-neighborhood',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/join`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/bundles`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/why`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/theory`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/constitution`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/duty`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/allies`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const bundlePages: MetadataRoute.Sitemap = BUNDLES.map((b) => ({
    url: `${siteUrl}/bundles/${b.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // The content engine writes /learn articles to /var/www/wopr-content/<host>/
  // and they are only reachable via their own sitemap otherwise - nothing on the
  // site links to them, so without this they stay orphaned.
  const learnPages: MetadataRoute.Sitemap = LEARN_SLUGS.map((slug) => ({
    url: `${siteUrl}/learn/${slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...bundlePages, ...learnPages]
}
