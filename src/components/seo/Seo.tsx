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
      <meta property="og:site_name" content="MGL AI" />
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

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  name: 'Mustafa Gül',
  givenName: 'Mustafa',
  familyName: 'Gül',
  jobTitle: 'Founder & AI Automation Architect',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: [
    'AI Voice Agents',
    'WhatsApp Business API',
    'n8n Automation',
    'Conversion Rate Optimization',
    'Meta Ads',
    'Google Ads',
    'Technical SEO',
    'Generative Engine Optimization',
  ],
  sameAs: [
    'https://www.instagram.com/mgl_digital_media/',
  ],
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'MGL Digital Media',
  alternateName: ['MGL AI', 'MGL'],
  legalName: 'MGL DIGITAL MEDIA LTD',
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG}`,
  image: `${SITE_URL}${DEFAULT_OG}`,
  description:
    'London-headquartered AI & automation studio for businesses and brands. MGL Digital Media builds production-grade WhatsApp AI assistants, voice agents, n8n automation workflows, conversion-first websites, and performance advertising operations — serving clients remotely across Turkey and the United Kingdom. Transparent fixed pricing per tier, no price ranges.',
  foundingDate: '2024',
  founder: { '@id': `${SITE_URL}/#founder` },
  founders: [{ '@id': `${SITE_URL}/#founder` }],
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
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+90 531 829 97 01',
      contactType: 'sales',
      availableLanguage: ['tr', 'en'],
      areaServed: ['TR', 'GB'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44 7414 605612',
      contactType: 'customer support',
      availableLanguage: ['en'],
      areaServed: ['GB'],
      description: 'AI voice agent demo line',
    },
    {
      '@type': 'ContactPoint',
      email: 'info@mgldigitalmedia.com',
      contactType: 'customer support',
      availableLanguage: ['tr', 'en'],
    },
  ],
  knowsAbout: [
    'AI Voice Agents',
    'WhatsApp AI Assistants',
    'n8n Automation Workflows',
    'Conversion-First Web Design',
    'Meta Advertising',
    'Google Advertising',
    'Technical SEO',
    'CRM Integration',
    'AI Content Generation',
    'Call Deflection',
    'Appointment Automation',
    'Lead Qualification',
  ],
  slogan: 'Biz ajans değil, otopilot sistem kurarız.',
  sameAs: [
    'https://www.instagram.com/mgl_digital_media/',
    'https://find-and-update.company-information.service.gov.uk/company/16007414',
  ],
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

export const BASE_SCHEMAS = [ORGANIZATION_SCHEMA, PERSON_SCHEMA, WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA];

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

export function aboutPageSchema(params: {
  path: string;
  headline: string;
  summary: string;
  inLanguage?: 'tr-TR' | 'en-GB';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}${params.path}`,
    name: params.headline,
    description: params.summary,
    inLanguage: params.inLanguage ?? 'tr-TR',
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };
}

export function howToSchema(params: {
  name: string;
  description: string;
  path: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    ...(params.totalTime && { totalTime: params.totalTime }),
    step: params.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function webPageSchema(params: {
  path: string;
  title: string;
  description: string;
  inLanguage?: 'tr-TR' | 'en-GB';
  primaryTopic?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${params.path}#webpage`,
    url: `${SITE_URL}${params.path}`,
    name: params.title,
    description: params.description,
    inLanguage: params.inLanguage ?? 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(params.primaryTopic && { about: { '@type': 'Thing', name: params.primaryTopic } }),
  };
}

export function solutionSchema(params: {
  name: string;
  sector: string;
  problem: string;
  solution: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: `AI Automation for ${params.sector}`,
    description: `${params.problem} ${params.solution}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}${params.path}`,
    areaServed: [
      { '@type': 'Country', name: 'Turkey' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: params.sector,
    },
  };
}
