/**
 * Centralized site configuration for Trigonion Tower (Πύργος Τριγωνίου).
 *
 * Single source of truth for SEO entity binding, structured data (JSON-LD),
 * PWA manifest and all location/attraction facts.
 */

export const siteConfig = {
  // Domain & URLs
  domain: 'trigoniontower.com',
  url: 'https://trigoniontower.com',

  // Publisher / editorial identity (E-E-A-T)
  siteName: 'Trigonion Tower Thessaloniki — Visitor Guide',
  organizationName: 'Trigonion Tower Independent Tourism Research Project',
  // ISO date of the last substantive content update — rendered on the page and
  // emitted as dateModified in the structured data. Bump on every edit.
  contentUpdated: '2026-09-24',

  // Attraction entity (single-attraction SEO binding)
  attractionFullName: 'Trigonion Tower',
  attractionShortName: 'Trigonion Tower',
  attractionGreekName: 'Πύργος Τριγωνίου (Αλύσεως)',
  attractionNickname: 'the balcony of Thessaloniki',
  attractionType: 'Landmark / Historical Monument',

  // Location hierarchy (geo breadcrumb)
  city: 'Thessaloniki',
  cityLocal: 'Θεσσαλονίκη',
  stateProvince: 'Central Macedonia',
  country: 'Greece',
  countryCode: 'GR',
  postalCode: '546 34',
  streetAddress: 'Agios Pavlos',
  plusCode: 'JXR5+7X',
  latitude: 40.6406867,
  longitude: 22.9599962,

  // Maps
  mapsUrl: 'https://maps.app.goo.gl/2VPEts66p8h1J8YS7',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.510010668173!2d22.9599962!3d40.640686699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a83851fa9131e9%3A0x232ee6f203899836!2sTrigonion%20Tower!5e0!3m2!1szh-CN!2s!4v1788157336964!5m2!1szh-CN!2s',

  // Nearby semantic cluster
  nearbyLandmark1: 'Vlatadon Monastery',
  nearbyLandmark1Local: 'Μονή Βλατάδων',
  nearbyLandmark2: 'Heptapyrgion Fortress',
  nearbyLandmark2Local: 'Επταπύργιο',

  // Official tourism portal (authority outbound link)
  govtTourismUrl: 'https://www.visitgreece.gr/',
  officialPortalLabel: 'Greece / Central Macedonia Official Tourism Portal',

  // Contact, rating
  phone: '+302313310400',
  rating: '4.7',
  reviewCount: '7,862',

  /**
   * Opening hours.
   * Source: Thessaloniki Tourism Organisation (official city tourism body).
   * The viewing terrace is open around the clock; the tower interior keeps
   * limited hours and closes on Mondays. Always re-verify with the Ephorate of
   * Antiquities of Thessaloniki City before travelling.
   */
  towerOpens: '09:00',
  towerCloses: '15:00',

  // Assets
  heroImage: '/gallery/trigonion-tower-01.jpg',
  heroImageEncoded: '/gallery/trigonion-tower-01.jpg',
};

export const heroImageAbsolute = `${siteConfig.url}${siteConfig.heroImageEncoded}`;
