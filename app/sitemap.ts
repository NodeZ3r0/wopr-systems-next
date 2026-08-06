import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

// Every route under app/ that renders a public page MUST be listed here.
// Next does not derive this automatically — pages missing from this list are
// live but undiscoverable, which is how /about /allies /constitution /duty
// /faq /theory (~8,700 words) sat unindexed. Add a line when you add a page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/join`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/why`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/theory`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/constitution`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/duty`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/allies`, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
