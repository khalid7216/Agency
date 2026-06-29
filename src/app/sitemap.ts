import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://khalidsanawer.online', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://khalidsanawer.online/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://khalidsanawer.online/portfolio', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://khalidsanawer.online/team', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://khalidsanawer.online/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
