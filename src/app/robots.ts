import { MetadataRoute } from 'next';

import { SITE_URL as baseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/panier', '/checkout'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
