const configuredUrl = process.env.SITE_URL || 'https://wopr.systems'

export const siteUrl = configuredUrl.replace(/\/+$/, '')
export const allowIndexing = process.env.ALLOW_INDEXING === 'true'
