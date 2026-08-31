import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.attractionFullName} (${siteConfig.city}) – Visitor Guide & Location`,
    short_name: siteConfig.attractionShortName,
    description: `Discover ${siteConfig.attractionFullName}, the iconic landmark in ${siteConfig.city}, ${siteConfig.stateProvince}, ${siteConfig.country}. View location map, opening details and travel tips.`,
    start_url: '/el',
    lang: 'el',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    categories: ['travel', 'tourism'],
    icons: [
      {
        src: '/icon.jpg',
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/apple-icon.jpg',
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
