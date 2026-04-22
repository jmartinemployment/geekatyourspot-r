import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly allow AI crawlers that respect robots.txt
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'GoogleOther'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.geekatyourspot.com/sitemap.xml',
  }
}
