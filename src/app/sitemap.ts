import { MetadataRoute } from 'next'
import { getBlogPosts, getAllBlogTags, getPortfolioCaseStudies } from '@/lib/mdx'

const BASE_URL = 'https://khalidsanawer.online'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/vapt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Add blog posts dynamic routes
  const posts = getBlogPosts()
  for (const post of posts) {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Add blog tags dynamic routes
  const tags = getAllBlogTags()
  for (const tag of tags) {
    routes.push({
      url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  // Add portfolio case studies dynamic routes
  const caseStudies = getPortfolioCaseStudies()
  for (const cs of caseStudies) {
    routes.push({
      url: `${BASE_URL}/portfolio/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return routes
}

