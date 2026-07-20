import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

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

  const rootDir = process.cwd()
  const blogDir = path.join(rootDir, 'content', 'blog')
  const portfolioDir = path.join(rootDir, 'content', 'portfolio')

  const tagsSet = new Set<string>()

  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    for (const file of blogFiles) {
      const slug = file.replace(/\.mdx?$/, '')
      routes.push({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })

      try {
        const fileContent = fs.readFileSync(path.join(blogDir, file), 'utf8')
        const tagsMatch = fileContent.match(/tags:\s*\[(.*?)\]/)
        if (tagsMatch && tagsMatch[1]) {
          const tags = tagsMatch[1].split(',').map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
          tags.forEach((tag) => {
            if (tag) tagsSet.add(encodeURIComponent(tag.toLowerCase()))
          })
        }
      } catch (err) {
        console.error(`Error reading tags for ${file}:`, err)
      }
    }
  }

  tagsSet.forEach((tag) => {
    routes.push({
      url: `${BASE_URL}/blog/tag/${tag}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  if (fs.existsSync(portfolioDir)) {
    const portfolioFiles = fs.readdirSync(portfolioDir).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    for (const file of portfolioFiles) {
      const slug = file.replace(/\.mdx?$/, '')
      routes.push({
        url: `${BASE_URL}/portfolio/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return routes
}

