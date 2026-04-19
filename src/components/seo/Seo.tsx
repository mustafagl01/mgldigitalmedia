import { Helmet } from 'react-helmet-async';

export type SeoProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  locale?: 'tr_TR' | 'en_GB';
  keywords?: string[];
  jsonLd?: object | object[];
  noindex?: boolean;
};

const SITE_URL = 'https://mgl-ai.uk';
const DEFAULT_OG = '/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png';

export function Seo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  locale = 'tr_TR',
  keywords,
  jsonLd,
  noindex,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang={locale === 'tr_TR' ? 'tr' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MGL Digital Media" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={locale === 'tr_TR' ? 'en_GB' : 'tr_TR'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      <meta name="theme-color" content="#030712" />
      <meta name="author" content="MGL Digital Media LTD" />
      <meta name="geo.region" content="GB-ENG" />
      <meta name="geo.placename" content="London" />
      <meta name="geo.position" content="51.6520;-0.0823" />
      <meta name="ICBM" content="51.6520, -0.0823" />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'MGL Digital Media',
  legalName: 'MGL DIGITAL MEDIA LTD',
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG}`,
  image: `${SITE_URL}${DEFAULT_OG}`,
  description:
    'AI automation agency building WhatsApp assistants, voice bots, n8n workflows, websites, and performance marketing for SMEs in Turkey and the UK.',
  foundingDate: '2024',
  founders: [{ '@type': 'Person', name: 'Mustafa Gül' }],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '112 Bertram Road',
    addressLocality: 'Enfield',
    addressRegion: 'England',
    postalCode: 'EN1 1LS',
    addressCountry: 'GB',
  },
  areaServed: [
    { '@type': 'Country', name: 'Turkey' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  identifier: 'Company Number 16007414',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90 531 829 97 01',
    contactType: 'sales',
    availableLanguage: ['tr', 'en'],
    areaServed: ['TR', 'GB'],
  },
  sameAs: ['https://www.instagram.com/mgl_digital_media/'],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'MGL Digital Media',
  description:
    'WhatsApp botları, sesli asistanlar, n8n otomasyon akışları, web tasarımı ve performans pazarlama hizmeti veren dijital ajans.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: ['tr-TR', 'en-GB'],
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'MGL Digital Media',
  image: `${SITE_URL}${DEFAULT_OG}`,
  url: SITE_URL,
  telephone: '+90 531 829 97 01',
  priceRange: '££ – £££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '112 Bertram Road',
    addressLocality: 'Enfield',
    addressRegion: 'England',
    postalCode: 'EN1 1LS',
    addressCountry: 'GB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.652, longitude: -0.0823 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Turkey' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  knowsAbout: [
    'WhatsApp Business API',
    'AI Voice Assistants',
    'n8n Automation',
    'Web Design',
    'SEO',
    'Meta Ads',
    'Google Ads',
    'CRM Setup',
    'AI Content',
  ],
};

export const BASE_SCHEMAS = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA];

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  path: string;
  category?: string;
  offers?: Array<{ name: string; price: number; priceCurrency: string; priceFrom?: boolean }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}${params.path}`,
    areaServed: [
      { '@type': 'Country', name: 'Turkey' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    serviceType: params.category,
    ...(params.offers && {
      offers: params.offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: o.priceCurrency,
        ...(o.priceFrom && { priceSpecification: { '@type': 'PriceSpecification', minPrice: o.price, priceCurrency: o.priceCurrency } }),
      })),
    }),
  };
}
