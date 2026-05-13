import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Calendar, Check, ChevronDown, MessageCircle, ShieldCheck, ArrowUpRight, X, Stethoscope, UtensilsCrossed, Home as HomeIcon, ShoppingBag, Scissors, Wrench } from 'lucide-react';
import {
  type PackageCategoryKey,
  type PackageTier,
  type PackageTierKey,
  isPackageCategoryKey,
  tierKeysForCategory,
} from '../config/pricing';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';

type PlanCtaType = 'whatsapp' | 'booking';

type PlanContent = {
  subtitle: { tr: string; en: string };
  included: { tr: string[]; en: string[] };
  excluded: { tr: string[]; en: string[] };
  quotas: { tr: string[]; en: string[] };
  overages: { tr: string[]; en: string[] };
  recommended?: boolean;
  /** Render the card with a dark, premium treatment (for the enterprise tier). */
  premium?: boolean;
  /** Override the CTA destination; defaults to WhatsApp pilot flow. */
  ctaType?: PlanCtaType;
  /** Optional custom CTA label override. */
  ctaLabel?: { tr: string; en: string };
  /** Optional override for the setup-fee prefix label (e.g. "Custom Architecture from"). */
  setupPrefix?: { tr: string; en: string };
  /** Optional note rendered between the feature list and the CTA (e.g. dev-hour rate). */
  footnote?: { tr: string; en: string };
  /** Tiny usage caveat shown in the fine-print row (e.g. "Voice usage billed separately."). */
  usageNote?: { tr: string; en: string };
};

const STRATEGY_CALL_URL = 'https://calendar.app.google/jgu53NFAy7BnYVui8';

type FaqItem = {
  q: { tr: string; en: string };
  a: { tr: string; en: string };
};

type CategoryMeta = {
  key: PackageCategoryKey;
  label: { tr: string; en: string };
  hero: {
    eyebrow: { tr: string; en: string };
    title: { tr: string; en: string };
    lede: { tr: string; en: string };
  };
};

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';

const CATEGORY_META: Record<PackageCategoryKey, CategoryMeta> = {
  ads: {
    key: 'ads',
    label: { tr: 'AI Reklam', en: 'AI Advertising' },
    hero: {
      eyebrow: { tr: 'AI REKLAM PAKETLERİ', en: 'AI ADVERTISING PACKAGES' },
      title: {
        tr: 'Meta, Google ve SEO — tek ekipten.',
        en: 'Meta, Google and SEO — one team.',
      },
      lede: {
        tr: 'Şeffaf fee, reklam bütçesi sizde kalır. AI kreatif, günlük optimizasyon, tek bir ROI panosu. Aralık yok, sabit fiyat.',
        en: 'Transparent fee, your ad budget stays with you. AI creatives, daily optimisation, one ROI dashboard. No ranges — flat prices.',
      },
    },
  },
  agents: {
    key: 'agents',
    label: { tr: 'AI Agent', en: 'AI Agents' },
    hero: {
      eyebrow: { tr: 'AI AGENT PAKETLERİ', en: 'AI AGENT PACKAGES' },
      title: {
        tr: 'Dört kademe. Tek şeffaf anlaşma.',
        en: 'Four tiers. One honest deal.',
      },
      lede: {
        tr: 'WhatsApp, Instagram DM ve sesli asistanla 7/24 operasyon. Aylık çıkış hakkı, şeffaf aşım, KVKK/GDPR uyumlu.',
        en: 'WhatsApp, IG DM and voice — 24/7 operations. Monthly cancellation, transparent overage, KVKK/GDPR compliant.',
      },
    },
  },
  web: {
    key: 'web',
    label: { tr: 'Web Siteleri', en: 'Websites' },
    hero: {
      eyebrow: { tr: 'WEB SİTESİ PAKETLERİ', en: 'WEBSITE PACKAGES' },
      title: {
        tr: 'Müşteri kazandıran küçük işletme siteleri.',
        en: 'Websites that win you customers.',
      },
      lede: {
        tr: 'Tek seferlik kurulum, sabit yıllık hosting. Kafenizden takeaway\'inize, randevu alan kliniğinizden online sipariş alan dükkanınıza uygun, sade ve profesyonel paketler.',
        en: 'One clear setup fee, one flat yearly hosting cost. Honest packages built for UK cafés, clinics, takeaways, and small businesses — not freelance shortcuts.',
      },
    },
  },
};

const PLAN_CONTENT: Record<PackageTierKey, PlanContent> = {
  // ---------------- AGENTS ----------------
  starter: {
    subtitle: {
      tr: 'En sık tekrarlanan işleri otomatikleştirmek için temel AI entegrasyonu.',
      en: 'Essential AI integration to automate your most repetitive tasks.',
    },
    included: {
      tr: [
        '1 Özel AI Agent (Sesli VEYA WhatsApp)',
        'Temel n8n Workflow Otomasyonu',
        'Takvim & Temel Tablo Senkronizasyonu',
        'Standart Destek (48 saat SLA)',
        'Aylık Performans Raporu',
        'Aylık 1 saate kadar workflow güncellemesi',
      ],
      en: [
        '1 Dedicated AI Agent (Voice OR WhatsApp)',
        'Core n8n Workflow Automation',
        'Calendar & Basic Spreadsheet Sync',
        'Standard Support (48h SLA)',
        'Monthly Performance Report',
        'Up to 1 hour/month of workflow updates',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    usageNote: {
      tr: 'Sesli kullanım ayrıca faturalandırılır.',
      en: 'Voice usage billed separately.',
    },
  },
  pro: {
    subtitle: {
      tr: 'Büyüyen işletmeler için çok kanallı AI altyapısı.',
      en: 'Multi-channel AI infrastructure for growing businesses.',
    },
    included: {
      tr: [
        'Senkronize Sesli + WhatsApp AI Agent\'ları',
        'Derin CRM Entegrasyonu (HubSpot, GoHighLevel vb.)',
        'Çok adımlı gelişmiş n8n Workflow\'ları',
        'Öncelikli WhatsApp Desteği (24 saat SLA)',
        '1 Aylık Strateji Görüşmesi',
        'Aylık 3 saate kadar workflow güncellemesi',
      ],
      en: [
        'Synchronised Voice + WhatsApp AI Agents',
        'Deep CRM Integration (HubSpot, GoHighLevel, etc.)',
        'Advanced Multi-step n8n Workflows',
        'Priority WhatsApp Support (24h SLA)',
        '1 Monthly Strategy Call',
        'Up to 3 hours/month of workflow updates',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    recommended: true,
    usageNote: {
      tr: 'Sesli kullanım ayrıca faturalandırılır.',
      en: 'Voice usage billed separately.',
    },
  },
  advanced: {
    subtitle: {
      tr: 'Büyük kurumlar için uçtan uca operasyonel otonomi.',
      en: 'End-to-end operational autonomy tailored for large enterprises.',
    },
    included: {
      tr: [
        'Sınırsız n8n Workflow Senaryosu',
        'Çoklu Departman AI Agent\'ları (Tahsilat, İK, vb.)',
        'Dedicated Sunucu / On-Premise Seçenekleri',
        'Atanmış Hesap Yöneticisi',
        'Aylık 10 saate kadar Özel Geliştirme',
      ],
      en: [
        'Unlimited n8n Workflow Scenarios',
        'Multi-department AI Agents (Collections, HR, etc.)',
        'Dedicated Server / On-Premise Options',
        'Dedicated Account Manager',
        'Up to 10 hours/month of Custom Development',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    premium: true,
    ctaType: 'booking',
    ctaLabel: { tr: 'Strateji Görüşmesi Planla', en: 'Book a Strategy Call' },
    setupPrefix: { tr: 'Özel Mimari Kurulum, başlangıç ', en: 'Custom Architecture from ' },
    footnote: {
      tr: 'Ek geliştirme saati £80/saat üzerinden faturalandırılır.',
      en: 'Additional dev hours billed at £80/hr.',
    },
    usageNote: {
      tr: 'Sesli kullanım ayrıca faturalandırılır.',
      en: 'Voice usage billed separately.',
    },
  },

  // ---------------- ADS ----------------
  'ads-starter': {
    subtitle: {
      tr: 'Tek platformda temiz, ölçülebilir bir başlangıç.',
      en: 'A clean, measurable start on a single platform.',
    },
    included: {
      tr: [
        'Kampanya kurulumu',
        'Temel optimizasyon',
        'Aylık raporlama',
        '1 platform',
      ],
      en: [
        'Campaign setup',
        'Basic optimisation',
        'Monthly reporting',
        '1 platform',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'ads-growth': {
    subtitle: {
      tr: 'Çoklu kampanya yönetimi ve sürekli iyileştirme.',
      en: 'Multi-campaign management with ongoing improvement.',
    },
    included: {
      tr: [
        'Çoklu kampanya yönetimi',
        'Haftalık optimizasyon',
        'Kreatif yönlendirme',
        'Aylık performans değerlendirmesi',
        '1–2 platform',
      ],
      en: [
        'Multi-campaign management',
        'Weekly optimisation',
        'Creative guidance',
        'Monthly performance review',
        '1–2 platforms',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    recommended: true,
  },
  'ads-scale': {
    subtitle: {
      tr: 'Ölçeklenmek için tam strateji ve operasyon ortaklığı.',
      en: 'Full strategy and operational partnership for scaling.',
    },
    included: {
      tr: [
        'Tam strateji ve yönetim',
        'Reklam kreatif desteği',
        'Sürekli optimizasyon',
        'Raporlama ve analiz',
        'Çoklu platform desteği',
      ],
      en: [
        'Full strategy and management',
        'Ad creative support',
        'Ongoing optimisation',
        'Reporting and analysis',
        'Multi-platform support',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    premium: true,
  },

  // ---------------- WEB ----------------
  'web-landing': {
    subtitle: {
      tr: 'Kafeler, yerel dükkanlar ve küçük işletmeler için.',
      en: 'Best for cafés, local shops, and small businesses.',
    },
    included: {
      tr: [
        'Tek sayfa kaydırmalı web sitesi',
        'Mobil uyumlu tasarım',
        'İletişim bilgileri, harita, çalışma saatleri',
        'Temel menü / hizmet bölümü',
        '1 revizyon turu',
      ],
      en: [
        'One-page scrolling website',
        'Mobile responsive design',
        'Contact details, map, opening hours',
        'Basic menu / services section',
        'One revision round',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'web-site': {
    subtitle: {
      tr: 'Online randevu veya rezervasyon talebi alan işletmeler için.',
      en: 'For businesses that need online booking or appointment requests.',
    },
    included: {
      tr: [
        'Tek sayfa veya küçük çok bölümlü site',
        'Rezervasyon / talep formu',
        'Takvim bağlantısı',
        'Onay mesajı',
        'Mobil uyumlu tasarım',
        '2 revizyon turu',
      ],
      en: [
        'One-page or small multi-section website',
        'Booking / request form',
        'Calendar connection',
        'Confirmation message',
        'Mobile responsive design',
        'Two revision rounds',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    recommended: true,
  },
  'web-platform': {
    subtitle: {
      tr: 'Restoranlar, marketler ve paket servis tarzı işletmeler için.',
      en: 'For restaurants, markets, and takeaway-style businesses.',
    },
    included: {
      tr: [
        'Sipariş sayfası',
        'Teslimat tarihi / saati seçimi',
        'Sipariş onay akışı',
        'Yönetici bildirimi',
        'Mobil uyumlu tasarım',
        '3 revizyon turu',
      ],
      en: [
        'Ordering page',
        'Delivery date / time selection',
        'Order confirmation flow',
        'Admin notification',
        'Mobile responsive design',
        'Three revision rounds',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'web-custom': {
    subtitle: {
      tr: 'Arka planda otomasyonla çalışan bir site isteyen işletmeler için.',
      en: 'For businesses that want a website with automation behind the scenes.',
    },
    included: {
      tr: [
        'Özel site yapısı',
        'Sipariş / rezervasyon / lead akışı',
        'Bildirim otomasyonu',
        'CRM veya tablo senkronizasyonu',
        'Öncelikli kurulum ve destek',
      ],
      en: [
        'Custom website structure',
        'Order / booking / lead flow',
        'Notification automation',
        'CRM or spreadsheet sync',
        'Priority setup and support',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    premium: true,
  },
};

const COMMON_FAQ: FaqItem[] = [
  {
    q: { tr: 'Sözleşme süresi var mı?', en: 'Is there a contract term?' },
    a: {
      tr: 'Hayır. Aylık abonelik — istediğiniz zaman durdurabilirsiniz. Yıllık ödemede indirim konuşulabilir.',
      en: 'No. Monthly subscription — cancel anytime. Annual billing discount is negotiable.',
    },
  },
  {
    q: { tr: 'Aşım tarifesi nedir?', en: 'What is the overage tariff?' },
    a: {
      tr: 'Pakete dahil mesaj veya sesli dakika limitiniz aşıldığında trafik kesilmez. Otomatik uyarı gönderilir ve ekstra kullanım faturanıza eklenir. WhatsApp / Instagram mesaj aşımı 1 TL / mesaj, sesli AI dakika aşımı 9 TL / dakika olarak işler. Tüm paketler için aynı tarife geçerlidir ve aşım kullanımı dashboard\'unuzda gerçek zamanlı görülebilir.',
      en: 'When you exceed your package message or voice minute allowance, traffic is never cut off. An automatic alert is sent and the extra usage is added to your invoice. WhatsApp / Instagram message overage is 2p / message and voice AI minute overage is 20p / minute. The same tariff applies to every package, and overage usage is visible in real time in your dashboard.',
    },
  },
  {
    q: { tr: 'Verilerim güvende mi?', en: 'Is my data secure?' },
    a: {
      tr: 'Tüm mesaj, çağrı ve sipariş verileri AB lokasyonlu sunucularda tutulur. Üçüncü parti pazarlama paylaşımı yoktur. Kurumsal paketlerde on-premise seçeneği sunulur (KVKK / GDPR uyumlu).',
      en: 'All message, call and order data is stored on EU-region servers. No third-party marketing sharing. Enterprise tiers offer on-premise (KVKK / GDPR compliant).',
    },
  },
];

const CATEGORY_FAQ: Record<PackageCategoryKey, FaqItem[]> = {
  ads: [
    {
      q: { tr: 'Reklam bütçesi fiyata dahil mi?', en: 'Is ad spend included in the price?' },
      a: {
        tr: 'Hayır. Reklam bütçesi direkt Meta / Google\'a ödenir — biz tahsil etmez, biz kesmez. Yönetim payı (%10) yalnızca bu bütçe üzerinden hesaplanır ve aylık fee\'den ayrı bir kalemdir.',
        en: 'No. Ad spend is paid directly to Meta / Google — we do not collect or deduct it. The 10% management fee is calculated only on that budget and is billed separately from the monthly retainer.',
      },
    },
    {
      q: { tr: 'Minimum reklam bütçesi önerir misiniz?', en: 'Is there a minimum ad budget?' },
      a: {
        tr: 'Starter için 500 ₺ / gün (≈ 15.000 ₺ / ay). Growth için 1.000 ₺ / gün, Scale için 2.500 ₺ / gün. Altı da çalışır ama veri toplama süresi uzar.',
        en: 'For Starter we recommend £15 / day (≈ £450 / month). Growth £30 / day, Scale £75 / day. Lower is possible but data collection takes longer.',
      },
    },
    {
      q: { tr: 'Raporlar nasıl paylaşılır?', en: 'How are reports shared?' },
      a: {
        tr: 'Tüm tier\'larda GA4 + platform dashboard\'larına erişiminiz var. Growth\'tan itibaren tek ekranda birleşik ROI dashboard. Scale\'de günlük otomatik PDF özeti e-posta ile gelir.',
        en: 'Every tier gives you access to GA4 + platform dashboards. Growth adds a unified ROI dashboard. Scale emails a daily PDF summary.',
      },
    },
  ],
  agents: [
    {
      q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
      a: {
        tr: 'WhatsApp Asistan 3 iş günü, Çok Kanal Asistan 5 iş günü. AI Resepsiyon ve Tam Otonomi ortalama 2–3 hafta (telefon hattı entegrasyonu ve ses eğitimi dahil).',
        en: 'WhatsApp Assistant in 3 business days, Multi-Channel Assistant in 5. AI Reception and Full Autonomy average 2–3 weeks (phone line integration and voice training included).',
      },
    },
    {
      q: { tr: 'Mevcut CRM\'ime entegre olur mu?', en: 'Does it integrate with my existing CRM?' },
      a: {
        tr: 'HubSpot, Pipedrive, Zoho ve Salesforce Çok Kanal Asistan paketinden itibaren standarttır. Özel klinik yönetim yazılımları (CDR, Dentrix, Akıllı Klinik vb.) AI Resepsiyon ve üstü paketlerde entegre edilir.',
        en: 'HubSpot, Pipedrive, Zoho and Salesforce are standard from Multi-Channel Assistant up. Custom clinic management software is integrated on AI Reception and above.',
      },
    },
    {
      q: { tr: 'Kota aşımında ne olur, sistem kilitlenir mi?', en: 'What happens when I exceed quota?' },
      a: {
        tr: 'Asla kilitlenmez. Aşım olduğunda otomatik uyarı gider, trafik kesintisiz devam eder ve ekstra kullanım ilan edilen aşım tarifesiyle faturaya eklenir.',
        en: 'It never locks. You get an alert, traffic continues uninterrupted, and extra usage is billed at the published overage rate.',
      },
    },
  ],
  web: [
    {
      q: { tr: 'Mevcut siteyi yeniliyor musunuz yoksa sıfırdan mı?', en: 'Do you redesign existing sites or build from scratch?' },
      a: {
        tr: 'İkisi de. Mevcut bir siteniz varsa içerik ve URL yapısını taşıyıp SEO kaybını minimize ediyoruz. Sıfırdan istenirse tamamen yeni mimari kuruyoruz. Her iki durumda fiyat aynıdır.',
        en: 'Both. If you have an existing site we migrate content and URL structure to minimise SEO loss. If you want a fresh start we architect from zero. Pricing is the same either way.',
      },
    },
    {
      q: { tr: 'Hosting ve bakım aylık ücrete dahil mi?', en: 'Are hosting and maintenance included in the monthly fee?' },
      a: {
        tr: 'Evet — aylık fee\'ye Vercel / Netlify hosting, SSL, uptime monitor ve güvenlik güncellemeleri dahil. Ek bir sunucu kirası ödemezsiniz.',
        en: 'Yes — the monthly fee includes Vercel / Netlify hosting, SSL, uptime monitor, and security updates. No separate server rental.',
      },
    },
    {
      q: { tr: 'Hangi teknolojiyi kullanıyorsunuz — WordPress mı, Next.js mi?', en: 'Which stack — WordPress or Next.js?' },
      a: {
        tr: 'Varsayılanımız React + Vite veya Next.js. Sebep: hız (Core Web Vitals), güvenlik ve AI entegrasyonu için daha temiz altyapı. WordPress\'te ısrar ederseniz uyumluyuz ama hız vaat etmiyoruz.',
        en: 'Default is React + Vite or Next.js. Reason: speed (Core Web Vitals), security, and a cleaner base for AI integrations. If you insist on WordPress we can work with it but we do not guarantee Core Web Vitals.',
      },
    },
  ],
};

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getCategoryFromHash(): PackageCategoryKey {
  if (typeof window === 'undefined') return 'agents';
  const hash = window.location.hash.replace('#', '');
  return isPackageCategoryKey(hash) ? hash : 'agents';
}

type PlanCardProps = {
  tier: PackageTier;
  content: PlanContent;
  region: 'TR' | 'GB';
  isEnglish: boolean;
};

function PlanCard({ tier, content, region, isEnglish }: PlanCardProps) {
  const rec = content.recommended;
  const premium = content.premium;
  const hasSetup = tier.setupFee > 0;
  const isAds = tier.category === 'ads';

  // Premium variant uses a darker, enterprise treatment
  const cardBg = premium ? 'var(--coal)' : 'var(--paper-2)';
  const cardBorder = premium
    ? '1px solid var(--coal-3)'
    : `1px solid ${rec ? 'var(--ember)' : 'var(--border)'}`;
  const titleColor = premium ? 'var(--bone)' : 'var(--ink)';
  const subtitleColor = premium ? 'var(--bone-2)' : 'var(--fg-2)';
  const priceColor = premium ? 'var(--bone)' : 'var(--ink)';
  const labelMutedColor = premium ? 'var(--bone-3)' : 'var(--fg-3)';
  const featureColor = premium ? 'var(--bone)' : 'var(--fg-1)';
  const dividerColor = premium ? 'var(--coal-3)' : 'var(--border)';

  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: cardBg,
        border: cardBorder,
        borderRadius: 'var(--r-lg)',
        padding: 28,
        minHeight: 640,
        boxShadow: premium
          ? '0 20px 50px -28px rgba(0,0,0,0.55)'
          : rec
          ? '0 2px 0 var(--ember-soft)'
          : 'none',
        color: premium ? 'var(--bone)' : 'inherit',
      }}
    >
      {rec && (
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: -12,
            left: 24,
            background: 'var(--ember)',
            color: 'var(--paper)',
          }}
        >
          {isEnglish ? 'Most Popular' : 'En Popüler'}
        </span>
      )}

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: labelMutedColor,
        }}
      >
        / {tier.key}
      </span>

      <h2
        style={{
          marginTop: 12,
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 1rem + 0.6vw, 1.75rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          fontWeight: 600,
          color: titleColor,
        }}
      >
        {tier.name}
      </h2>
      <p style={{ marginTop: 6, fontSize: 14, color: subtitleColor, lineHeight: 1.45 }}>
        {isEnglish ? content.subtitle.en : content.subtitle.tr}
      </p>

      {/* Price */}
      <div style={{ marginTop: 20 }}>
        {tier.customPrice ? (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              color: priceColor,
              margin: 0,
            }}
          >
            {isEnglish ? 'Quote only' : 'Talep üzerine'}
          </p>
        ) : tier.oneOffSetup ? (
          <>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.4rem + 1.4vw, 2.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                color: priceColor,
                margin: 0,
              }}
            >
              {tier.priceFrom && (
                <span
                  style={{
                    fontSize: '0.55em',
                    color: labelMutedColor,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  {isEnglish ? 'From' : 'Başlangıç'}
                </span>
              )}
              {formatPrice(tier.setupFee, region)}
            </p>
            <p
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: labelMutedColor,
              }}
            >
              {isEnglish ? 'one-off setup' : 'tek seferlik kurulum'}
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.4rem + 1.4vw, 2.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                color: priceColor,
                margin: 0,
              }}
            >
              {tier.priceFrom && (
                <span
                  style={{
                    fontSize: '0.55em',
                    color: labelMutedColor,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  {isEnglish ? 'From' : 'Başlangıç'}
                </span>
              )}
              {formatPrice(tier.price, region)}
            </p>
            <p
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: labelMutedColor,
              }}
            >
              {isEnglish ? 'per month' : 'aylık'}
            </p>
          </>
        )}
        {isAds && tier.adManagementPercent > 0 && (
          <p style={{ marginTop: 8, fontSize: 12, color: subtitleColor, lineHeight: 1.5 }}>
            {isEnglish
              ? `+ your ad budget × ${tier.adManagementPercent}% management fee (budget is paid directly to Meta / Google)`
              : `+ reklam bütçeniz × %${tier.adManagementPercent} yönetim payı (bütçe direkt Meta / Google'a ödenir)`}
          </p>
        )}
      </div>

      {/* Recurring / setup line below the headline */}
      {!tier.customPrice && (
        <div
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: subtitleColor,
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          {tier.oneOffSetup ? (
            <span>
              {isEnglish ? 'Yearly hosting: ' : 'Yıllık hosting: '}
              <strong style={{ color: titleColor }}>
                {formatPrice(tier.price, region)}
                {tier.priceUnit === 'year'
                  ? isEnglish
                    ? ' / year'
                    : ' / yıl'
                  : isEnglish
                  ? ' / month'
                  : ' / ay'}
              </strong>
            </span>
          ) : hasSetup ? (
            <span>
              {content.setupPrefix
                ? isEnglish
                  ? content.setupPrefix.en
                  : content.setupPrefix.tr
                : isEnglish
                ? 'One-time setup from '
                : 'Tek seferlik kurulum: '}
              <strong style={{ color: titleColor }}>{formatPrice(tier.setupFee, region)}</strong>
            </span>
          ) : (
            <span style={{ color: 'var(--ember)' }}>
              {isEnglish ? '✓ Setup included' : '✓ Kurulum dahil'}
            </span>
          )}
          {tier.deliveryDays > 0 && (
            <span style={{ marginLeft: 12, color: labelMutedColor }}>
              ·{' '}
              {isEnglish
                ? `Delivery ${tier.deliveryDays} business days`
                : `Teslim ${tier.deliveryDays} iş günü`}
            </span>
          )}
        </div>
      )}

      {/* Dahil — sadece içerik varsa */}
      {content.included.tr.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ember)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'INCLUDED' : 'DAHİL'}
          </p>
          <ul
            style={{
              marginTop: 10,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {(isEnglish ? content.included.en : content.included.tr).map((feature) => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 14,
                  color: featureColor,
                  lineHeight: 1.45,
                }}
              >
                <Check size={14} style={{ marginTop: 4, flexShrink: 0, color: 'var(--ember)' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dahil değil — sadece içerik varsa */}
      {content.excluded.tr.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: labelMutedColor,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'NOT INCLUDED' : 'DAHİL DEĞİL'}
          </p>
          <ul
            style={{
              marginTop: 10,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {(isEnglish ? content.excluded.en : content.excluded.tr).map((feature) => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 13,
                  color: labelMutedColor,
                  lineHeight: 1.45,
                }}
              >
                <X size={13} style={{ marginTop: 4, flexShrink: 0, color: labelMutedColor }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kota — sadece içerik varsa */}
      {content.quotas.tr.length > 0 && (
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: premium ? 'var(--bone-2)' : 'var(--fg-2)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'QUOTAS' : 'KOTA'}
          </p>
          <ul
            style={{
              marginTop: 8,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: featureColor,
            }}
          >
            {(isEnglish ? content.quotas.en : content.quotas.tr).map((q) => (
              <li key={q}>· {q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Overage */}
      {content.overages.tr.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: labelMutedColor,
              margin: 0,
            }}
          >
            {isEnglish ? 'OVERAGE' : 'AŞIM'}
          </p>
          <ul
            style={{
              marginTop: 6,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: subtitleColor,
            }}
          >
            {(isEnglish ? content.overages.en : content.overages.tr).map((o) => (
              <li key={o}>· {o}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tiny usage caveat (e.g. voice usage billed separately) */}
      {content.usageNote && (
        <p
          style={{
            margin: '14px 0 0',
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: labelMutedColor,
            lineHeight: 1.5,
          }}
        >
          {isEnglish ? content.usageNote.en : content.usageNote.tr}
        </p>
      )}

      {/* Footnote (e.g. dev-hour rate) — sits above CTA */}
      {content.footnote && (
        <p
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: labelMutedColor,
            lineHeight: 1.5,
            margin: '14px 0 0',
          }}
        >
          {isEnglish ? content.footnote.en : content.footnote.tr}
        </p>
      )}

      {/* CTA — booking link for enterprise, WhatsApp for everyone else */}
      <div style={{ marginTop: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {content.ctaType === 'booking' ? (
          <a
            href={STRATEGY_CALL_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'var(--ember)',
              color: 'var(--paper)',
              borderColor: 'var(--ember)',
            }}
          >
            <Calendar size={14} />
            {isEnglish
              ? content.ctaLabel?.en ?? 'Book a Strategy Call'
              : content.ctaLabel?.tr ?? 'Strateji Görüşmesi Planla'}
          </a>
        ) : (
          <a
            href={createWhatsAppLink(
              isEnglish
                ? `Hello, coming from the MGL site. I'd like to get started with the ${tier.name} package.`
                : `Merhaba, MGL sitesinden geliyorum. ${tier.name} paketiyle başlamak istiyorum.`,
            )}
            target="_blank"
            rel="noreferrer"
            className={rec ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <MessageCircle size={14} />
            {isEnglish
              ? content.ctaLabel?.en ?? 'Get Started'
              : content.ctaLabel?.tr ?? 'Hemen Başla'}
          </a>
        )}
      </div>
    </article>
  );
}

type SectorExampleProps = {
  icon: ReactNode;
  title: string;
  examples: string[];
  packageMatch: string;
  packageLabel: string;
};

function SectorExample({ icon, title, examples, packageMatch, packageLabel }: SectorExampleProps) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 24,
        height: '100%',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          color: 'var(--ember)',
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.125rem',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'var(--ink)',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          marginTop: 12,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
        }}
      >
        {examples.map((example) => (
          <li
            key={example}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 13.5,
              color: 'var(--fg-1)',
              lineHeight: 1.45,
            }}
          >
            <Check size={13} style={{ marginTop: 4, flexShrink: 0, color: 'var(--ember)' }} />
            <span>{example}</span>
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
        }}
      >
        <span>{packageLabel}: </span>
        <strong style={{ color: 'var(--ink)' }}>{packageMatch}</strong>
      </div>
    </article>
  );
}

export default function Packages() {
  const { pricing, region } = useLocation();
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const [activeCategory, setActiveCategory] = useState<PackageCategoryKey>(() =>
    getCategoryFromHash(),
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Hash sync (back/forward & direct links)
  useEffect(() => {
    const handleHashChange = () => setActiveCategory(getCategoryFromHash());
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const switchCategory = (cat: PackageCategoryKey) => {
    setActiveCategory(cat);
    setOpenFaq(0);
    window.history.replaceState({}, '', `/packages#${cat}`);
  };

  const categoryTiers = useMemo(() => {
    const keys = tierKeysForCategory(activeCategory);
    return keys.map((k) => ({
      tier: pricing.packages[k],
      content: PLAN_CONTENT[k],
    }));
  }, [activeCategory, pricing]);

  const meta = CATEGORY_META[activeCategory];
  const faqItems = useMemo(
    () => [...COMMON_FAQ, ...CATEGORY_FAQ[activeCategory]],
    [activeCategory],
  );

  const seoTitle = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? 'AI Advertising Packages — Meta + Google + SEO | MGL Digital Media'
        : 'AI Reklam Paketleri — Meta + Google + SEO | MGL Digital Media';
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? 'Website Packages — Landing, Corporate, Conversion Platform | MGL Digital Media'
        : 'Web Sitesi Paketleri — Landing, Kurumsal, Platform | MGL Digital Media';
    }
    return isEnglish
      ? 'AI Agent Packages — WhatsApp Assistant, Multi-Channel Assistant, AI Reception, Full Autonomy | MGL Digital Media'
      : 'AI Agent Paketleri — WhatsApp Asistan, Çok Kanal Asistan, AI Resepsiyon, Tam Otonomi | MGL Digital Media';
  }, [activeCategory, isEnglish]);

  const seoDescription = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? 'Three flat-price ad packages: Single Channel, Dual Channel + SEO, Full Funnel. Transparent 10% management fee, ad budget paid directly to Meta / Google. No ranges.'
        : 'Üç sabit fiyatlı reklam paketi: Tek Kanal, Çift Kanal + SEO, Full Funnel. %10 şeffaf yönetim payı, reklam bütçesi direkt Meta / Google\'a ödenir. Aralık yok.';
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? 'Three flat-price website packages: Single Landing (7 days), Corporate Site (21 days), Conversion Platform (45 days). Vercel / Netlify hosting and AI content engine included.'
        : 'Üç sabit fiyatlı web paketi: Tek Sayfa (7 gün), Kurumsal Site (21 gün), Dönüşüm Platformu (45 gün). Vercel / Netlify hosting ve AI içerik motoru dahil.';
    }
    return isEnglish
      ? 'Four flat-price AI agent tiers: WhatsApp, Instagram DM, voice, CRM, automation. TRY and GBP pricing. Monthly cancellation, transparent overage, KVKK/GDPR compliant.'
      : 'Dört sabit fiyatlı AI agent kademesi: WhatsApp, IG DM, voice, CRM, otomasyon. TRY ve GBP fiyatlandırma. Aylık çıkış, şeffaf aşım, KVKK/GDPR uyumlu.';
  }, [activeCategory, isEnglish]);

  const seoKeywords = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? ['AI ads packages', 'Meta ads agency', 'Google ads agency', 'SEO package', 'London ad agency']
        : ['AI reklam paketleri', 'Meta reklam ajansı', 'Google ads ajansı', 'SEO paketi', 'Londra reklam ajansı'];
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? ['website packages', 'conversion web design', 'landing page agency', 'Next.js web agency', 'e-commerce web']
        : ['web sitesi paketleri', 'dönüşüm odaklı web', 'landing page ajansı', 'kurumsal site paketi', 'e-ticaret web'];
    }
    return isEnglish
      ? ['AI agent packages', 'WhatsApp AI bot', 'voice assistant', 'AI automation bundle', 'SME AI package']
      : ['AI agent paketleri', 'WhatsApp AI bot', 'sesli asistan', 'AI otomasyon bundle', 'KOBİ AI paketi'];
  }, [activeCategory, isEnglish]);

  const breadcrumb = breadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEnglish ? 'Packages' : 'Paketler', path: '/packages' },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/packages"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={seoKeywords}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(32px, 3vw + 12px, 64px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">
            {isEnglish ? meta.hero.eyebrow.en : meta.hero.eyebrow.tr}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEnglish ? meta.hero.title.en : meta.hero.title.tr}
          </h1>
          <p
            className="lede"
            style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}
          >
            {isEnglish ? meta.hero.lede.en : meta.hero.lede.tr}
          </p>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {[
              { icon: <ShieldCheck size={14} />, tr: 'Sabit fiyat · aralık yok', en: 'Flat price · no ranges' },
              { tr: 'Aylık çıkış hakkı', en: 'Monthly cancellation' },
              { tr: 'Şeffaf kota + aşım', en: 'Transparent quota + overage' },
              { tr: 'Veriler AB sunucularında', en: 'EU-region data hosting' },
            ].map((chip, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-2)',
                  padding: '6px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  background: 'var(--paper-2)',
                }}
              >
                {chip.icon}
                {isEnglish ? chip.en : chip.tr}
              </span>
            ))}
          </div>

          {/* Category tabs */}
          <div
            role="tablist"
            aria-label={isEnglish ? 'Package categories' : 'Paket kategorileri'}
            className="category-tabs"
            style={{
              marginTop: 36,
              gap: 4,
              padding: 4,
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderRadius: 999,
            }}
          >
            {(['ads', 'agents', 'web'] as PackageCategoryKey[]).map((cat) => {
              const isActive = activeCategory === cat;
              const { tr, en } = CATEGORY_META[cat].label;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => switchCategory(cat)}
                  className="category-tab"
                  style={{
                    borderRadius: 999,
                    background: isActive ? 'var(--ink)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--fg-2)',
                    fontWeight: 500,
                    transition: 'background 160ms, color 160ms',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: 1.25,
                  }}
                >
                  {isEnglish ? en : tr}
                </button>
              );
            })}
          </div>

          <style>{`
            .category-tabs {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              width: 100%;
              max-width: 440px;
            }
            .category-tab {
              padding: 10px 8px;
              font-size: 12px;
              white-space: normal;
            }
            @media (min-width: 640px) {
              .category-tabs {
                display: inline-flex;
                width: auto;
                max-width: none;
              }
              .category-tab {
                padding: 8px 20px;
                font-size: 13px;
                white-space: nowrap;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Plans grid */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(48px, 4vw + 16px, 88px) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {categoryTiers.map(({ tier, content }) => (
              <PlanCard
                key={tier.key}
                tier={tier}
                content={content}
                region={region}
                isEnglish={isEnglish}
              />
            ))}
          </div>

          {/* Disclaimer — API usage costs + dev-hour transparency */}
          {activeCategory === 'agents' && (
            <p
              style={{
                marginTop: 28,
                maxWidth: 920,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              {isEnglish
                ? '* All plans exclude 3rd-party API usage costs (e.g., Voice minutes, WhatsApp templates). API costs are billed strictly based on your actual usage. Technical support for bugs is free and unlimited; custom feature development uses your monthly hour quota.'
                : '* Tüm planlar 3. parti API kullanım maliyetlerini (ör. sesli dakikalar, WhatsApp şablonları) kapsamaz. API maliyetleri yalnızca gerçek kullanımınız üzerinden faturalandırılır. Hata düzeltme için teknik destek ücretsiz ve sınırsızdır; özel özellik geliştirmesi aylık saat kotanızı kullanır.'}
            </p>
          )}

          {/* Agents: RandevuAI self-serve cross-link — TR only */}
          {activeCategory === 'agents' && region === 'TR' && (
            <div
              style={{
                marginTop: 36,
                padding: '20px 24px',
                background: 'var(--paper-2)',
                border: '1px solid var(--border)',
                borderLeft: '2px solid #25D366',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--ink)' }}>
                  {isEnglish ? 'Smaller budget? Try self-serve: ' : 'Daha uygun bütçe? Kendin kur: '}
                </strong>
                {isEnglish
                  ? 'RandevuAI (₺1.290/mo) — sector template, 5-min setup, WhatsApp Evolution API, 5,000 conversations/mo included. No custom CRM/Calendar integration. Data stays in RandevuAI dashboard.'
                  : 'RandevuAI (₺1.290/ay) — sektör şablonu, 5 dk kurulum, WhatsApp Evolution API, 5.000 sohbet/ay dahil. CRM/Calendar entegrasyonu yok, veriler RandevuAI\'de durur. Farklı ihtiyaç = farklı ürün.'}
              </div>
              <a
                href={isEnglish ? 'https://www.randevu-ai.com' : 'https://www.randevu-ai.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  background: '#25D366',
                  color: '#111B21',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {isEnglish ? 'RandevuAI →' : 'RandevuAI →'}
              </a>
            </div>
          )}

          {/* Ads disclaimer */}
          {activeCategory === 'ads' && (
            <ul
              style={{
                marginTop: 28,
                maxWidth: 920,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              <li>{isEnglish ? '* Ad spend is not included — paid directly to the ad platforms.' : '* Reklam bütçesi dahil değildir — direkt reklam platformlarına ödenir.'}</li>
              <li>
                {isEnglish
                  ? '* Third-party costs (creative tools, tracking, etc.) are billed separately where applicable.'
                  : '* 3. parti maliyetler (kreatif araçlar, izleme vb.) ilgili olduğunda ayrıca faturalandırılır.'}
              </li>
            </ul>
          )}

          {/* Web disclaimer — what hosting covers + scope expectations */}
          {activeCategory === 'web' && (
            <ul
              style={{
                marginTop: 28,
                maxWidth: 920,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              <li>
                {isEnglish
                  ? '* Yearly hosting covers hosting, SSL, basic uptime monitoring, and core maintenance.'
                  : '* Yıllık hosting; hosting, SSL, temel uptime izleme ve ana bakım masraflarını kapsar.'}
              </li>
              <li>
                {isEnglish
                  ? '* Major content changes, extra pages, or new features are quoted separately.'
                  : '* Büyük içerik değişiklikleri, ek sayfalar veya yeni özellikler ayrıca fiyatlandırılır.'}
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* Sektörlere göre kullanım örnekleri */}
      {activeCategory === 'agents' && (
        <section
          style={{
            background: 'var(--paper)',
            padding: 'clamp(56px, 4vw + 24px, 96px) 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container" style={{ maxWidth: 1080 }}>
            <span className="eyebrow">
              {isEnglish ? 'INDUSTRY EXAMPLES' : 'SEKTÖR ÖRNEKLERİ'}
            </span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              {isEnglish ? 'AI assistants by industry' : 'Sektörünüze göre AI asistanlar'}
            </h2>
            <p
              style={{
                marginTop: 12,
                color: 'var(--fg-2)',
                maxWidth: 720,
                fontSize: 'clamp(0.95rem, 0.88rem + 0.25vw, 1.0625rem)',
                lineHeight: 1.6,
              }}
            >
              {isEnglish
                ? 'Packages are sector-agnostic. Same package infrastructure, flows tailored per industry.'
                : 'Paketler sektör bağımsız. Aynı paket altyapısı, sektöre göre özelleştirilmiş akışlar.'}
            </p>

            <div
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              <SectorExample
                icon={<Stethoscope size={20} />}
                title={isEnglish ? 'Clinic & Aesthetic' : 'Klinik & Estetik'}
                examples={
                  isEnglish
                    ? [
                        'After-hours WhatsApp booking',
                        'No-show reducing reminders',
                        'Voice AI for night-time calls',
                      ]
                    : [
                        'Mesai dışı WhatsApp randevu',
                        'No-show azaltan hatırlatma',
                        'Gece çağrılarına Sesli AI',
                      ]
                }
                packageMatch={isEnglish ? 'Multi-Channel Assistant or AI Reception' : 'Çok Kanal Asistan veya AI Resepsiyon'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<UtensilsCrossed size={20} />}
                title={isEnglish ? 'Restaurant & Cafe' : 'Restoran & Kafe'}
                examples={
                  isEnglish
                    ? [
                        'WhatsApp reservations',
                        'Voice AI takes orders',
                        'Peak-hour phone load handled',
                      ]
                    : [
                        'WhatsApp rezervasyon',
                        'Sesli AI sipariş alır',
                        'Yoğun saat telefon yükü',
                      ]
                }
                packageMatch={
                  isEnglish
                    ? 'WhatsApp Assistant or AI Reception'
                    : 'WhatsApp Asistan veya AI Resepsiyon'
                }
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<HomeIcon size={20} />}
                title={isEnglish ? 'Real Estate' : 'Emlak & Gayrimenkul'}
                examples={
                  isEnglish
                    ? [
                        'Missed-call callbacks',
                        'Buyer criteria captured in CRM',
                        'Listing-match notifications',
                      ]
                    : [
                        'Cevapsız çağrı dönüşü',
                        'Müşteri kriteri CRM',
                        'İlan eşleşme bildirimleri',
                      ]
                }
                packageMatch={isEnglish ? 'Multi-Channel Assistant' : 'Çok Kanal Asistan'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<ShoppingBag size={20} />}
                title={isEnglish ? 'E-commerce' : 'E-ticaret'}
                examples={
                  isEnglish
                    ? [
                        '7-language multilingual support',
                        'Order / return / shipping replies',
                        'Time-zone gap solved',
                      ]
                    : [
                        '7 dil çok dilli destek',
                        'Sipariş/iade/kargo cevabı',
                        'Saat farkı çözümü',
                      ]
                }
                packageMatch={isEnglish ? 'Multi-Channel Assistant or AI Reception' : 'Çok Kanal Asistan veya AI Resepsiyon'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<Scissors size={20} />}
                title={isEnglish ? 'Beauty & Salon' : 'Güzellik & Salon'}
                examples={
                  isEnglish
                    ? [
                        'Instant booking welcome',
                        'Reminders that cut no-shows',
                        '5-second voice AI greeting',
                      ]
                    : [
                        'Anlık randevu karşılama',
                        'Hatırlatma + no-show düşürme',
                        'Sesli AI 5 sn karşılama',
                      ]
                }
                packageMatch={isEnglish ? 'Multi-Channel Assistant' : 'Çok Kanal Asistan'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<Wrench size={20} />}
                title={isEnglish ? 'Service Firm / Education' : 'Servis Firması / Eğitim'}
                examples={
                  isEnglish
                    ? [
                        'Fault / enrolment intake forms',
                        'Quote follow-up',
                        'Consultation scheduling',
                      ]
                    : [
                        'Arıza/kayıt formu',
                        'Teklif takibi',
                        'Görüşme planlama',
                      ]
                }
                packageMatch={isEnglish ? 'WhatsApp Assistant or Multi-Channel Assistant' : 'WhatsApp Asistan veya Çok Kanal Asistan'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
            </div>

            <p
              style={{
                marginTop: 24,
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              {isEnglish
                ? 'Industry packs are not sold separately — the examples run on the same package infrastructure.'
                : 'Sektör paketleri ayrı satılmaz — örnekler aynı paket altyapısıyla çalışır.'}
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: 'clamp(64px, 5vw + 16px, 104px) 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{isEnglish ? 'FREQUENTLY ASKED' : 'SIK SORULAN'}</span>
          <h2
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEnglish ? 'Questions we hear most.' : 'En sık duyduğumuz sorular.'}
          </h2>

          <div style={{ marginTop: 32 }}>
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q.tr}
                  style={{
                    borderTop: idx === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 0',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.25rem)',
                        lineHeight: 1.35,
                        fontWeight: 500,
                        color: 'var(--ink)',
                      }}
                    >
                      {isEnglish ? item.q.en : item.q.tr}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        flexShrink: 0,
                        color: 'var(--ember)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms var(--ease-out)',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <p
                      style={{
                        paddingBottom: 20,
                        paddingRight: 34,
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: 'var(--fg-2)',
                      }}
                    >
                      {isEnglish ? item.a.en : item.a.tr}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise callout (only on agents tab) */}
      {activeCategory === 'agents' && (
        <section
          className="on-coal"
          style={{
            background: 'var(--coal)',
            color: 'var(--bone)',
            padding: 'clamp(72px, 6vw + 24px, 128px) 0',
          }}
        >
          <div className="container" style={{ maxWidth: 960 }}>
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>
              {isEnglish ? 'ENTERPRISE & CUSTOM' : 'KURUMSAL & ÖZEL'}
            </span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: 'var(--bone)',
              }}
            >
              {isEnglish
                ? 'Hospital chain, multi-branch or regulated?'
                : 'Hastane zinciri, çok şubeli veya düzenlemeye tabi?'}
            </h2>
            <p
              style={{
                marginTop: 20,
                maxWidth: 720,
                color: 'var(--bone-2)',
                fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
                lineHeight: 1.6,
              }}
            >
              {isEnglish
                ? 'Beyond Full Autonomy we build bespoke: on-premise deployment, custom integrations (SAP, Nebim, Logo, ERP), dedicated infrastructure, named engineer on 24/7 priority support.'
                : 'Tam Otonomi\'nin ötesinde terzi işi kuruyoruz: on-premise deployment, özel entegrasyonlar (SAP, Nebim, Logo, ERP), ayrılmış altyapı, atanmış mühendisle 7/24 öncelikli destek.'}
            </p>

            <a
              href={createWhatsAppLink(
                isEnglish
                  ? 'Hello, I would like to discuss an enterprise / custom AI agent project.'
                  : 'Merhaba, kurumsal / özel bir AI agent projesi için görüşmek istiyorum.',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-lg"
              style={{ marginTop: 36 }}
            >
              {isEnglish ? 'Talk to a project consultant' : 'Proje danışmanıyla görüş'}
              <ArrowUpRight size={16} />
            </a>

            <p
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--bone-3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {WHATSAPP_LABEL}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
