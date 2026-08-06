import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { BUNDLES } from '@/lib/bundles'

// Every route under app/ that renders a public page MUST be listed here.
// Next does not derive this automatically — pages missing from this list are
// live but undiscoverable, which is how /about /allies /constitution /duty
// /faq /theory (~8,700 words) sat unindexed. Add a line when you add a page.
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

  return [...staticPages, ...bundlePages]
}
