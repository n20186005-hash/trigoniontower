import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { siteConfig, heroImageAbsolute } from '@/config';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${siteConfig.url}/${l}`;
  });
  languages['x-default'] = `${siteConfig.url}/${routing.defaultLocale}`;

  const selfUrl = `${siteConfig.url}/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: siteConfig.attractionShortName,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [
        {
          url: heroImageAbsolute,
          alt: `${siteConfig.attractionFullName} in ${siteConfig.city}`,
        },
      ],
    },
    manifest: '/manifest.webmanifest',
    themeColor: '#3a7a8d',
  };
}

function buildJsonLd(messages: any, locale: string, selfUrl: string) {
  const faqItems = (messages?.faq?.items || []) as Array<{ q: string; a: string }>;

  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${siteConfig.url}/#attraction`,
    name: siteConfig.attractionFullName,
    alternateName: [
      siteConfig.attractionShortName,
      siteConfig.attractionGreekName,
      `${siteConfig.city} ${siteConfig.attractionFullName}`,
    ],
    description: messages.meta.description,
    url: siteConfig.url,
    image: [heroImageAbsolute],
    isAccessibleForFree: true,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        name: 'Tower interior',
        dayOfWeek: [
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: siteConfig.towerOpens,
        closes: siteConfig.towerCloses,
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.stateProvince,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.mapsUrl,
    sameAs: [siteConfig.mapsUrl, siteConfig.govtTourismUrl],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // Publisher identity — signals a non-commercial editorial project (E-E-A-T)
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'NGO'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.organizationName,
    alternateName: siteConfig.siteName,
    url: siteConfig.url,
    description: messages.footer.organizationDescription,
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.siteName,
    inLanguage: routing.locales,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${selfUrl}#webpage`,
    url: selfUrl,
    name: messages.meta.title,
    description: messages.meta.description,
    inLanguage: locale,
    dateModified: siteConfig.contentUpdated,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#attraction`,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };

  return [touristAttraction, faqPage, organization, webSite, webPage];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = buildJsonLd(messages, locale, `${siteConfig.url}/${locale}`);

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'el' ? 'el-GR' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        {/* PWA meta tags (theme-color & manifest are rendered by generateMetadata) */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.attractionShortName} />
        {/* JSON-LD structured data */}
        {jsonLd.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
