import { MetadataRoute } from 'next'
import { getBlogPosts, getAllBlogTags, getPortfolioCaseStudies } from '@/lib/mdx'
import { getProjects } from '@/lib/projects'

const BASE_URL = 'https://khalidsanawer.online'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: buildDate, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/vapt`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Add blog posts dynamic routes
  const posts = getBlogPosts()
  for (const post of posts) {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : buildDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Add blog tags dynamic routes
  const tags = getAllBlogTags()
  for (const tag of tags) {
    const tagPosts = posts.filter(p => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
    const latestPostDate = tagPosts.length > 0 && tagPosts[0].date ? new Date(tagPosts[0].date) : buildDate
    routes.push({
      url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  const addedPortfolioSlugs = new Set<string>()

  // Add portfolio case studies dynamic routes
  const caseStudies = getPortfolioCaseStudies()
  for (const cs of caseStudies) {
    addedPortfolioSlugs.add(cs.slug)
    routes.push({
      url: `${BASE_URL}/portfolio/${cs.slug}`,
      lastModified: cs.date ? new Date(cs.date) : buildDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Add portfolio dynamic projects from projects database (deduplicated)
  const projects = await getProjects()
  for (const project of projects) {
    if (!addedPortfolioSlugs.has(project.id)) {
      addedPortfolioSlugs.add(project.id)
      routes.push({
        url: `${BASE_URL}/portfolio/${project.id}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return routes
}

