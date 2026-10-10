import { MetadataRoute } from 'next'
import properties from '@/data/properties.json'
import { BLOG_POSTS } from '@/data/blogs'

/**
 * Full indexable sitemap for bot crawling.
 * Only nav / money pages (excludes explore-udupi).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.reunionglobal.in'
  const now = new Date()

  // Ocean Café lives at /dining only — never list /properties/ocean-cafe
  const propertyUrls = properties
    .filter((property) => property.id !== 'ocean-cafe')
    .map((property) => ({
      url: `${baseUrl}/properties/${property.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    // Home
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // All stays
    {
      url: `${baseUrl}/properties`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // Beach villas & city villas
    {
      url: `${baseUrl}/properties/category/beach-villas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/category/city-stays`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Dining
    {
      url: `${baseUrl}/dining`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Experiences at Reunion
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Candlelight dinner — head term: candle light dinner in udupi
    {
      url: `${baseUrl}/experiences/candlelight-dinner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Wellness & spa at Reunion
    {
      url: `${baseUrl}/wellness`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Events
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Blogs hub + posts
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
    // About & contact
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Individual properties
    ...propertyUrls,
  ]
}
