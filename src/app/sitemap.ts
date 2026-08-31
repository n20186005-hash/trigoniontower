import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config';

// Keep in sync with the routes under src/app/[locale]/
const pages = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page}`,
      lastModified: new Date(siteConfig.contentUpdated),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}${page}`])
        ),
      },
    }))
  );
}
