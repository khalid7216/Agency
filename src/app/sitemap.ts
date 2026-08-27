import { MetadataRoute } from 'next'
import { getBlogPosts, getAllBlogTags, getPortfolioCaseStudies } from '@/lib/mdx'

const BASE_URL = 'https://khalidsanawer.online'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastEditDate = new Date('2026-08-27')

  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: lastEditDate, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: lastEditDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/vapt`, lastModified: lastEditDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: lastEditDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: lastEditDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: lastEditDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: lastEditDate, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Add blog posts dynamic routes
  const posts = getBlogPosts()
  for (const post of posts) {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : lastEditDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Add blog tags dynamic routes
  const tags = getAllBlogTags()
  for (const tag of tags) {
    const tagPosts = posts.filter(p => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
    const latestPostDate = tagPosts.length > 0 && tagPosts[0].date ? new Date(tagPosts[0].date) : lastEditDate
    routes.push({
      url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  // Add portfolio case studies dynamic routes
  const caseStudies = getPortfolioCaseStudies()
  for (const cs of caseStudies) {
    routes.push({
      url: `${BASE_URL}/portfolio/${cs.slug}`,
      lastModified: cs.date ? new Date(cs.date) : lastEditDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return routes
}

