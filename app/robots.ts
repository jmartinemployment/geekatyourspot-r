import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/about/', '/contact/', '/services/', '/temp/'],
      },
      // Explicitly allow AI crawlers that respect robots.txt
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'GoogleOther'],
        allow: '/',
        disallow: ['/api/', '/about/', '/contact/', '/services/', '/temp/'],
      },
    ],
    sitemap: 'https://www.geekatyourspot.com/sitemap.xml',
  }
}
