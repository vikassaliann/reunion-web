import { MetadataRoute } from 'next'
import properties from '@/data/properties.json'
import { BLOG_POSTS } from '@/data/blogs'
import { lastModForBlog, lastModForPath, lastModForProperty } from '@/data/sitemapLastMod'

/**
 * Full indexable sitemap for bot crawling.
 * Only nav / money pages (excludes explore-udupi).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.reunionglobal.in'
  const fallback = new Date()

  // Ocean Café lives at /dining only — never list /properties/ocean-cafe
  const propertyUrls = properties
    .filter((property) => property.id !== 'ocean-cafe')
    .map((property) => ({
      url: `${baseUrl}/properties/${property.id}`,
      lastModified: lastModForProperty(property.id, fallback),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: lastModForBlog(post.slug, fallback),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const page = (
    path: string,
    entry: Omit<MetadataRoute.Sitemap[number], 'url' | 'lastModified'>,
  ): MetadataRoute.Sitemap[number] => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: lastModForPath(path, fallback),
    ...entry,
  })

  return [
    page('/', { changeFrequency: 'daily', priority: 1.0 }),
    page('/properties', { changeFrequency: 'daily', priority: 0.95 }),
    page('/properties/category/beach-villas', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/properties/category/city-stays', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/properties/category/hotel-stays', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/properties/category/shivamogga-stays', { changeFrequency: 'weekly', priority: 0.85 }),
    page('/dining', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/experiences', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/experiences/candlelight-dinner', { changeFrequency: 'weekly', priority: 0.95 }),
    page('/experiences/beach-birthday', { changeFrequency: 'weekly', priority: 0.9 }),
    page('/wellness', { changeFrequency: 'weekly', priority: 0.85 }),
    page('/events', { changeFrequency: 'weekly', priority: 0.85 }),
    page('/events/beach-venue', { changeFrequency: 'weekly', priority: 0.85 }),
    page('/civil-construction', { changeFrequency: 'monthly', priority: 0.75 }),
    page('/partner-with-us', { changeFrequency: 'monthly', priority: 0.7 }),
    page('/blogs', { changeFrequency: 'weekly', priority: 0.8 }),
    ...blogUrls,
    page('/about', { changeFrequency: 'monthly', priority: 0.65 }),
    page('/contact', { changeFrequency: 'monthly', priority: 0.7 }),
    ...propertyUrls,
  ]
}
