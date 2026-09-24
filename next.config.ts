import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
      { protocol: 'https' as const, hostname: 'maps.google.com' },
      { protocol: 'https' as const, hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https' as const, hostname: '*.google.com' },
    ],
  },
  async headers() {
    // Applied at the Next/Worker layer (dynamic routes, /api). For the
    // pre-rendered static pages served as Workers assets, enforce HSTS and the
    // security headers from the Cloudflare dashboard (SSL/TLS → Edge Certificates
    // and Transform/Rules) so they cover every response.
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
