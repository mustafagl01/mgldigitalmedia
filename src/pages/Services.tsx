import { useMemo, useState } from 'react';
import {
  BarChart3,
  Bot,
  Check,
  Database,
  Globe2,
  LineChart,
  MessageCircle,
  PhoneCall,
  Rocket,
  Search,
  Sparkles,
  Target,
  Workflow,
  ArrowUpRight,
} from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Seo, BASE_SCHEMAS, breadcrumbSchema, serviceSchema } from '../components/seo/Seo';

type RiskModel = 'A' | 'B' | 'C' | 'project';
type CategoryKey = 'automation' | 'web' | 'marketing' | 'infrastructure';

type ServiceSku = {
  id: string;
  category: CategoryKey;
  icon: typeof Bot;
  name: { tr: string; en: string };
  tagline: { tr: string; en: string };
  setupTR: string;
  monthlyTR: string;
  setupGB: string;
  monthlyGB: string;
  risk: RiskModel;
  features: { tr: string[]; en: string[] };
  recommended?: boolean;
};

const WHATSAPP_NUMBER = '905318299701';

const CATEGORIES: Record<CategoryKey, { tr: string; en: string }> = {
  automation: { tr: 'Otomasyon & AI Asistan', en: 'Automation & AI Assistant' },
  web: { tr: 'Web & İçerik', en: 'Web & Content' },
  marketing: { tr: 'Performans Pazarlama', en: 'Performance Marketing' },
  infrastructure: { tr: 'Altyapı & Raporlama', en: 'Infrastructure & Reporting' },
};

const RISK_LABELS: Record<RiskModel, { tr: string; en: string }> = {
  A: { tr: '30 gün ücretsiz', en: '30-day free trial' },
  B: { tr: 'İlk ay %50 pilot', en: '50% pilot month' },
  C: { tr: 'İlk ay yönetim %50', en: '50% first-month management' },
  project: { tr: 'Proje bazlı teslim', en: 'Project-based delivery' },
};

const SERVICES: ServiceSku[] = [
  {
    id: 'whatsapp-bot',
    category: 'automation',
    icon: MessageCircle,
    name: { tr: 'WhatsApp AI Asistan', en: 'WhatsApp AI Assistant' },
    tagline: {
      tr: '7/24 lead yakalar, randevu alır, SSS cevaplar.',
      en: 'Captures leads, books appointments, answers FAQs 24/7.',
    },
    setupTR: '0 ₺', monthlyTR: '1.999 – 4.999 ₺', setupGB: 'Free', monthlyGB: '£59 – £149',
    risk: 'A',
    features: {
      tr: [
        'Meta Business API resmi kurulumu',
        'İşletme verisiyle özel eğitilmiş asistan',
        'Takvim + Google Sheets + CRM senkronu',
        'Aylık 500–1.500 konuşma, aşım şeffaf',
      ],
      en: [
        'Official Meta Business API setup',
        'Assistant trained on your business data',
        'Calendar + Google Sheets + CRM sync',
        '500–1,500 conversations/mo, transparent overages',
      ],
    },
    recommended: true,
  },
  {
    id: 'voice-bot',
    category: 'automation',
    icon: PhoneCall,
    name: { tr: 'Sesli Asistan', en: 'Voice Assistant' },
    tagline: {
      tr: 'Telefona doğal sesle cevap verir, randevu oluşturur.',
      en: 'Answers your phone with natural voice, books appointments.',
    },
    setupTR: '14.999 ₺', monthlyTR: '9.999 – 14.999 ₺', setupGB: '£450', monthlyGB: '£399 – £749',
    risk: 'B',
    features: {
      tr: [
        'Türkçe doğal ses (dudak senkronu gerekmez)',
        '500–2.000 dakika/ay çağrı karşılama',
        'Çağrı özeti + tam transkript CRM’e',
        'Acil durumda insana aktarma',
      ],
      en: [
        'Natural multi-language voice',
        '500–2,000 minutes/mo inbound',
        'Call summary + full transcript to CRM',
        'Human handoff on escalation',
      ],
    },
  },
  {
    id: 'n8n-automation',
    category: 'automation',
    icon: Workflow,
    name: { tr: 'n8n Otomasyon', en: 'n8n Automation' },
    tagline: {
      tr: 'Tekrar eden iş akışlarını tek otomatik sisteme bağlarız.',
      en: 'Connect repetitive workflows into one automated system.',
    },
    setupTR: '2.999 – 7.999 ₺', monthlyTR: '1.499 – 2.499 ₺', setupGB: '£90 – £240', monthlyGB: '£45 – £75',
    risk: 'A',
    features: {
      tr: [
        '3–13+ workflow (lead aktarımı, email, CRM, stok)',
        'Self-hosted veya n8n Cloud',
        'Hata bildirimi Telegram/email',
        'Aylık 2 minor değişiklik dahil',
      ],
      en: [
        '3–13+ workflows (lead routing, email, CRM, inventory)',
        'Self-hosted or n8n Cloud',
        'Error alerts to Telegram/email',
        '2 minor changes/mo included',
      ],
    },
  },
  {
    id: 'website',
    category: 'web',
    icon: Globe2,
    name: { tr: 'Web Sitesi', en: 'Website' },
    tagline: {
      tr: 'React tabanlı, mobil-öncelikli, SEO-hazır modern site.',
      en: 'React-based, mobile-first, SEO-ready modern website.',
    },
    setupTR: '14.999 – 39.999 ₺', monthlyTR: '499 ₺ (hosting)', setupGB: '£450 – £1.200', monthlyGB: '£15 (hosting)',
    risk: 'project',
    features: {
      tr: [
        '5–15+ sayfa, çok dil opsiyonu',
        'Core Web Vitals ≥ 90 hedef',
        'GA4 + Search Console + Open Graph',
        '2 major revizyon turu dahil',
      ],
      en: [
        '5–15+ pages, multi-language optional',
        'Core Web Vitals ≥ 90 target',
        'GA4 + Search Console + Open Graph',
        '2 major revision rounds included',
      ],
    },
  },
  {
    id: 'landing-page',
    category: 'web',
    icon: Rocket,
    name: { tr: 'Landing Page', en: 'Landing Page' },
    tagline: {
      tr: 'Tek odaklı, reklam trafiği için yüksek dönüşüm sayfası.',
      en: 'Single-focus, high-conversion page for ad traffic.',
    },
    setupTR: '4.999 – 9.999 ₺', monthlyTR: '—', setupGB: '£150 – £300', monthlyGB: '—',
    risk: 'project',
    features: {
      tr: [
        'Copy + görsel + video entegrasyonu',
        'Pixel + conversion tracking hazır',
        '< 2 saniye yükleme hedefi',
        'Premium tier: A/B varyant + heatmap',
      ],
      en: [
        'Copy + visuals + video integration',
        'Pixel + conversion tracking ready',
        '< 2s load target',
        'Premium tier: A/B variants + heatmap',
      ],
    },
  },
  {
    id: 'ai-content',
    category: 'web',
    icon: Sparkles,
    name: { tr: 'AI İçerik Üretimi', en: 'AI Content Production' },
    tagline: {
      tr: 'Sosyal medya görseli + kısa motion + caption takvimi.',
      en: 'Social visuals + short motion + caption calendar.',
    },
    setupTR: '0 ₺', monthlyTR: '1.999 – 3.499 ₺', setupGB: 'Free', monthlyGB: '£59 – £109',
    risk: 'B',
    features: {
      tr: [
        'Aylık 8–15 statik + 2–4 kısa motion (≤10 sn)',
        'Marka rengine + fontuna uyumlu',
        'Caption + yayın takvimi',
        'Video projesi opsiyonel (proje bazlı)',
      ],
      en: [
        '8–15 static + 2–4 short motion (≤10s) per month',
        'Brand-color & font consistent',
        'Caption + publishing calendar',
        'Optional video project (project-based)',
      ],
    },
  },
  {
    id: 'seo',
    category: 'marketing',
    icon: Search,
    name: { tr: 'SEO', en: 'SEO' },
    tagline: { tr: 'Teknik SEO + içerik + aylık raporlama.', en: 'Technical SEO + content + monthly reporting.' },
    setupTR: '4.999 ₺', monthlyTR: '2.999 – 5.999 ₺', setupGB: '£150', monthlyGB: '£89 – £179',
    risk: 'A',
    features: {
      tr: [
        'Audit + anahtar kelime haritası (30–50 kelime)',
        'Aylık 2–4 blog yazısı (SEO-optimize)',
        'Schema.org + Core Web Vitals düzeltmeleri',
        'Aylık sıralama + rakip raporu',
      ],
      en: [
        'Audit + keyword map (30–50 keywords)',
        '2–4 SEO-optimized blog posts/mo',
        'Schema.org + Core Web Vitals fixes',
        'Monthly ranking + competitor report',
      ],
    },
  },
  {
    id: 'meta-ads',
    category: 'marketing',
    icon: Target,
    name: { tr: 'Meta Reklam Yönetimi', en: 'Meta Ads Management' },
    tagline: {
      tr: 'Hibrit model: sabit yönetim + spend komisyonu. Bütçe sizin kartınızda.',
      en: 'Hybrid: fixed management + spend commission. Budget stays on your card.',
    },
    setupTR: '2.999 ₺', monthlyTR: '5.000 ₺ + spend × %10', setupGB: '£90', monthlyGB: '£150 + spend × 10%',
    risk: 'C',
    features: {
      tr: [
        'Pixel + Conversion API (CAPI) kurulumu',
        'Aylık 3–5 statik + 1–2 kısa video kreatif',
        'Prospecting + Retargeting mimarisi',
        'Haftalık rapor + aylık strateji toplantısı',
      ],
      en: [
        'Pixel + Conversion API (CAPI) setup',
        '3–5 statics + 1–2 short video creatives/mo',
        'Prospecting + Retargeting architecture',
        'Weekly report + monthly strategy meeting',
      ],
    },
  },
  {
    id: 'google-ads',
    category: 'marketing',
    icon: LineChart,
    name: { tr: 'Google Reklam Yönetimi', en: 'Google Ads Management' },
    tagline: {
      tr: 'Search + PMax + YouTube. Niyet bazlı trafik yakalama.',
      en: 'Search + PMax + YouTube. Intent-based traffic capture.',
    },
    setupTR: '2.999 ₺', monthlyTR: '5.000 ₺ + spend × %10', setupGB: '£90', monthlyGB: '£150 + spend × 10%',
    risk: 'C',
    features: {
      tr: [
        'GA4 + GTM + Enhanced Conversions',
        '100–200 anahtar kelime shortlist',
        'Negatif kelime + kalite skoru yönetimi',
        '3–5 ad copy varyantı rotasyonu',
      ],
      en: [
        'GA4 + GTM + Enhanced Conversions',
        '100–200 keyword shortlist',
        'Negative keyword + quality score mgmt',
        '3–5 ad copy variants rotation',
      ],
    },
  },
  {
    id: 'crm-setup',
    category: 'infrastructure',
    icon: Database,
    name: { tr: 'CRM Kurulumu', en: 'CRM Setup' },
    tagline: {
      tr: 'HubSpot, Notion veya özel CRM — ekip tek doğruluk kaynağında.',
      en: 'HubSpot, Notion or custom CRM — one source of truth.',
    },
    setupTR: '9.999 – 24.999 ₺', monthlyTR: '1.499 ₺ (destek)', setupGB: '£300 – £750', monthlyGB: '£45 (support)',
    risk: 'project',
    features: {
      tr: [
        'Discovery + şema tasarımı + pipeline',
        'Form / WhatsApp / site → CRM bağlantısı',
        '500 kayda kadar ilk migration',
        '2 saatlik ekip eğitimi (video kaydı dahil)',
      ],
      en: [
        'Discovery + schema + pipeline design',
        'Form / WhatsApp / site → CRM connection',
        'Initial migration up to 500 records',
        '2-hour team training (video included)',
      ],
    },
  },
  {
    id: 'analytics',
    category: 'infrastructure',
    icon: BarChart3,
    name: { tr: 'Analitik Rapor', en: 'Analytics Report' },
    tagline: {
      tr: 'Aktif servislerin performansını tek aylık rapora indirger.',
      en: 'Distills active service performance into one monthly report.',
    },
    setupTR: '0 ₺', monthlyTR: '499 – 999 ₺', setupGB: 'Free', monthlyGB: '£15 – £29',
    risk: 'A',
    features: {
      tr: [
        'GA4 + platform verileri (WhatsApp, Meta, Google)',
        'Önceki ay karşılaştırma + 3 ana insight',
        'Kapsamlı tier: aylık 30dk strateji toplantısı',
        'Mevcut müşterilere özel (upsell)',
      ],
      en: [
        'GA4 + platform data (WhatsApp, Meta, Google)',
        'Month-over-month + 3 key insights',
        'Comprehensive tier: 30-min monthly strategy call',
        'Available only to existing clients',
      ],
    },
  },
];

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ServiceCard({ service, isEnglish, isGB }: { service: ServiceSku; isEnglish: boolean; isGB: boolean }) {
  const Icon = service.icon;
  const name = isEnglish ? service.name.en : service.name.tr;
  const tagline = isEnglish ? service.tagline.en : service.tagline.tr;
  const features = isEnglish ? service.features.en : service.features.tr;
  const setup = isGB ? service.setupGB : service.setupTR;
  const monthly = isGB ? service.monthlyGB : service.monthlyTR;
  const riskLabel = RISK_LABELS[service.risk];
  const categoryLabel = CATEGORIES[service.category][isEnglish ? 'en' : 'tr'];

  const waMessage = isEnglish
    ? `Hi, I'd like details on the "${service.name.en}" service.`
    : `Merhaba, "${service.name.tr}" hizmeti hakkında bilgi almak istiyorum.`;

  return (
    <article
      id={service.id}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: service.recommended ? 'var(--paper-2)' : 'var(--paper)',
        border: `1px solid ${service.recommended ? 'var(--ember)' : 'var(--border)'}`,
        borderRadius: 'var(--r-lg)',
        padding: 28,
        gap: 16,
        transition: 'border-color 200ms var(--ease-out), transform 200ms var(--ease-out)',
      }}
    >
      {service.recommended && (
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: -11,
            left: 24,
            background: 'var(--ember)',
            color: 'var(--paper)',
            borderColor: 'transparent',
          }}
        >
          {isEnglish ? 'Most picked' : 'En çok seçilen'}
        </span>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 'var(--r-md)',
            background: 'var(--paper-3)',
            border: '1px solid var(--border)',
            color: 'var(--ember)',
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--fg-3)',
              fontWeight: 500,
            }}
          >
            {categoryLabel}
          </span>
          <h3
            style={{
              marginTop: 6,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--ink)',
            }}
          >
            {name}
          </h3>
          <p style={{ marginTop: 6, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>{tagline}</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: 14,
          background: 'var(--paper-3)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <div>
          <span className="stat-label" style={{ marginTop: 0, fontSize: 10 }}>
            {isEnglish ? 'Setup' : 'Kurulum'}
          </span>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--ink)' }}>
            {setup}
          </div>
        </div>
        <div>
          <span className="stat-label" style={{ marginTop: 0, fontSize: 10 }}>
            {isEnglish ? 'Monthly' : 'Aylık'}
          </span>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--ink)' }}>
            {monthly}
          </div>
        </div>
      </div>

      <span
        className="badge badge-accent"
        style={{ alignSelf: 'flex-start' }}
      >
        <Check size={11} /> {isEnglish ? riskLabel.en : riskLabel.tr}
      </span>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {features.map((f) => (
          <li
            key={f}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 14,
              color: 'var(--fg-2)',
              lineHeight: 1.5,
            }}
          >
            <Check size={14} style={{ marginTop: 3, color: 'var(--ember)', flexShrink: 0 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={createWhatsAppLink(waMessage)}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary btn-md"
        style={{ marginTop: 8, width: '100%' }}
      >
        <MessageCircle size={14} />
        {isEnglish ? 'Ask on WhatsApp' : 'WhatsApp’tan danış'}
        <ArrowUpRight size={14} />
      </a>
    </article>
  );
}

export default function Services() {
  const { language } = useLanguage();
  const { region } = useLocation();
  const isEnglish = language === 'en';
  const isGB = region === 'GB';
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>(() => {
    if (typeof window === 'undefined') return 'all';
    const hash = window.location.hash.replace('#', '');
    if (hash === 'automation' || hash === 'web' || hash === 'marketing' || hash === 'infrastructure') {
      return hash;
    }
    return 'all';
  });

  const grouped = useMemo(() => {
    const byCategory: Record<CategoryKey, ServiceSku[]> = {
      automation: [], web: [], marketing: [], infrastructure: [],
    };
    for (const s of SERVICES) byCategory[s.category].push(s);
    return byCategory;
  }, []);

  const visible = activeCategory === 'all' ? SERVICES : grouped[activeCategory];

  const seoTitle = isEnglish
    ? 'Digital Services — WhatsApp, Voice, n8n, Web, SEO & Ads | MGL Digital Media'
    : 'Dijital Hizmetler — WhatsApp, Sesli, n8n, Web, SEO & Reklam | MGL Digital Media';
  const seoDescription = isEnglish
    ? '11 à la carte digital services: WhatsApp bots, voice assistants, n8n automation, web design, SEO, Meta & Google Ads, CRM setup. Transparent TRY and GBP pricing, no lock-in.'
    : '11 bağımsız dijital hizmet: WhatsApp botları, sesli asistan, n8n otomasyon, web tasarım, SEO, Meta & Google Ads, CRM kurulumu. Şeffaf TRY ve GBP fiyat, taahhütsüz.';

  const servicesJsonLd = SERVICES.map((s) =>
    serviceSchema({
      name: isEnglish ? s.name.en : s.name.tr,
      description: isEnglish ? s.tagline.en : s.tagline.tr,
      path: `/services#${s.id}`,
      category: CATEGORIES[s.category][isEnglish ? 'en' : 'tr'],
    }),
  );

  const breadcrumb = breadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEnglish ? 'Services' : 'Hizmetler', path: '/services' },
  ]);

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/services"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={
          isEnglish
            ? ['WhatsApp bot', 'AI voice assistant', 'n8n automation', 'web design', 'SEO', 'Meta Ads', 'Google Ads', 'CRM setup', 'digital agency London', 'Turkey']
            : ['WhatsApp botu', 'sesli asistan', 'n8n otomasyon', 'web tasarım', 'SEO', 'Meta reklam', 'Google reklam', 'CRM kurulumu', 'dijital ajans İstanbul', 'Londra']
        }
        jsonLd={[...BASE_SCHEMAS, breadcrumb, ...servicesJsonLd]}
      />

      {/* HERO */}
      <section style={{ padding: 'clamp(64px, 5vw + 24px, 112px) 0 48px' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="eyebrow">
            {isEnglish ? 'SERVICE CATALOG · 11 SKUS' : 'HİZMET KATALOĞU · 11 KALEM'}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--t-h1)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-snug)',
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            {isEnglish ? (
              <>
                Pick what you need.{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                  Skip what you don’t.
                </span>
              </>
            ) : (
              <>
                İhtiyacınızı seçin.{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                  Gerekmeyeni atlayın.
                </span>
              </>
            )}
          </h1>
          <p className="lede" style={{ marginTop: 18, color: 'var(--fg-2)' }}>
            {isEnglish
              ? '11 independent services across four categories. Mix à la carte, or combine for 10–15% bundle discount. AI is our internal leverage — you get the outcome, not buzzwords.'
              : '11 bağımsız hizmet, dört kategori. Tek tek alın ya da %10–15 indirimle birleştirin. AI bizim iç kaldıracımız — siz sonucu alırsınız, sloganı değil.'}
          </p>

          <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>
            <span>
              {isEnglish ? 'Transparent pricing' : 'Şeffaf fiyat'}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{isEnglish ? 'No lock-in' : 'Taahhüt yok'}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{isEnglish ? 'Risk-matched trials' : 'Hizmete uygun deneme modeli'}</span>
          </div>

          <div
            style={{
              marginTop: 28,
              padding: '16px 20px',
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--ember)',
              borderRadius: 'var(--r-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink)' }}>
                {isEnglish ? 'Looking for a bundle?' : 'Paket mi arıyorsun?'}
              </strong>{' '}
              {isEnglish
                ? 'If you need several of these together, our pre-configured Packages are cheaper than buying each service separately.'
                : 'Birkaç hizmet birden gerekiyorsa, hazır Paketler tek tek almaktan daha uygun olur.'}
            </div>
            <a
              href="/packages"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/packages');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo(0, 0);
              }}
              className="btn btn-secondary btn-sm"
            >
              {isEnglish ? 'See packages →' : 'Paketleri gör →'}
            </a>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section
        style={{
          position: 'sticky',
          top: 60,
          zIndex: 20,
          background: 'rgba(245, 241, 234, 0.92)',
          backdropFilter: 'saturate(140%) blur(10px)',
          WebkitBackdropFilter: 'saturate(140%) blur(10px)',
          borderBlock: '1px solid var(--border)',
          padding: '16px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={activeCategory === 'all' ? 'btn btn-secondary btn-sm' : 'btn btn-ghost btn-sm'}
          >
            {isEnglish ? 'All' : 'Tümü'}
            <span style={{ marginLeft: 6, opacity: 0.6 }}>({SERVICES.length})</span>
          </button>
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={activeCategory === key ? 'btn btn-secondary btn-sm' : 'btn btn-ghost btn-sm'}
            >
              {isEnglish ? CATEGORIES[key].en : CATEGORIES[key].tr}
              <span style={{ marginLeft: 6, opacity: 0.6 }}>({grouped[key].length})</span>
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            {visible.map((service) => (
              <ServiceCard key={service.id} service={service} isEnglish={isEnglish} isGB={isGB} />
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE CTA */}
      <section style={{ padding: '80px 0', background: 'var(--paper-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="bundle-grid"
          >
            <div>
              <span className="eyebrow">{isEnglish ? 'BUNDLE SAVINGS' : 'PAKET AVANTAJI'}</span>
              <h2
                style={{
                  marginTop: 16,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--t-h2)',
                  fontWeight: 600,
                  letterSpacing: 'var(--ls-snug)',
                  lineHeight: 'var(--lh-tight)',
                  color: 'var(--ink)',
                }}
              >
                {isEnglish ? 'Combine services. Save 10–15%.' : 'Birleştirin. %10–15 indirim kazanın.'}
              </h2>
              <p style={{ marginTop: 16, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                {isEnglish
                  ? 'Three curated bundles for different stages. Starter (2 services, 10% off), Growth (3–4 services, 12% off), Full Operations (5+ services, 15% off).'
                  : 'İşletmenizin aşamasına göre 3 hazır paket: Başlangıç (2 hizmet, %10), Büyüme (3–4 hizmet, %12), Tam Operasyon (5+ hizmet, %15).'}
              </p>
              <ul style={{ marginTop: 24, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { tr: 'Başlangıç — WhatsApp Bot + Landing Page', en: 'Starter — WhatsApp Bot + Landing Page' },
                  { tr: 'Büyüme — Web + WhatsApp Bot + SEO + Analitik', en: 'Growth — Website + WhatsApp Bot + SEO + Analytics' },
                  { tr: 'Tam Operasyon — Web + Bot + n8n + CRM + Reklam + SEO', en: 'Full Ops — Website + Bot + n8n + CRM + Ads + SEO' },
                ].map((item) => (
                  <li key={item.tr} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: 'var(--fg)' }}>
                    <Check size={16} style={{ color: 'var(--ember)', marginTop: 3, flexShrink: 0 }} />
                    <span>{isEnglish ? item.en : item.tr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
                {isEnglish ? 'Not sure where to start?' : 'Nereden başlayacağınızdan emin değil misiniz?'}
              </h3>
              <p style={{ marginTop: 10, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                {isEnglish
                  ? '15-minute discovery call: we look at your bottleneck, suggest the highest-leverage service first, and only layer more once the first proves ROI.'
                  : '15 dakikalık keşif görüşmesi: mevcut darboğazınıza bakarız, en yüksek kaldıraçlı hizmeti öneririz; ROI kanıtlanmadan ikincisini eklemeyiz.'}
              </p>
              <a
                href={createWhatsAppLink(
                  isEnglish
                    ? 'Hi, I’d like a 15-minute discovery call to pick the right service.'
                    : 'Merhaba, doğru hizmeti seçmek için 15 dakikalık keşif görüşmesi istiyorum.',
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-md"
                style={{ marginTop: 20, width: '100%' }}
              >
                <MessageCircle size={16} />
                {isEnglish ? 'Book on WhatsApp' : 'WhatsApp’ta randevu'}
              </a>
              <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>
                {isEnglish ? 'London / Istanbul · Mon–Sat, 09:00–20:00' : 'Londra / İstanbul · Pzt–Cmt, 09:00–20:00'}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .bundle-grid { grid-template-columns: 1.2fr 1fr !important; gap: 64px !important; }
          }
        `}</style>
      </section>

      {/* RISK MODELS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head" style={{ maxWidth: 760 }}>
            <span className="eyebrow">{isEnglish ? 'RISK MODELS' : 'RİSK MODELLERİ'}</span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--t-h2)',
                fontWeight: 600,
                letterSpacing: 'var(--ls-snug)',
                lineHeight: 'var(--lh-tight)',
                color: 'var(--ink)',
              }}
            >
              {isEnglish ? 'Three calibrated ways to start.' : 'Üç farklı başlama modeli.'}
            </h2>
            <p className="lede" style={{ marginTop: 16, color: 'var(--fg-2)' }}>
              {isEnglish
                ? 'Not every service has the same cost structure — so “30-day free” can’t apply to all. We use three honest models.'
                : '"30 gün ücretsiz" her hizmet için uygun değil — değişken maliyetli hizmetlerde dürüst olmak gerek. 3 kalibre model kullanıyoruz.'}
            </p>
          </div>

          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {[
              {
                key: 'A' as const,
                skus: isEnglish ? 'WhatsApp Bot · n8n · SEO · Analytics' : 'WhatsApp Bot · n8n · SEO · Analitik',
                desc: {
                  tr: 'Düşük değişken maliyetli hizmetlerde ilk 30 gün tamamen ücretsiz. Beğenmezseniz tek mesajla iptal, ücret yok.',
                  en: 'Low-variable-cost services: fully free for 30 days. Cancel with one message, no charge.',
                },
              },
              {
                key: 'B' as const,
                skus: isEnglish ? 'Voice Assistant · AI Content' : 'Sesli Asistan · AI İçerik',
                desc: {
                  tr: 'Değişken maliyetli hizmetlerde ilk ay %50 pilot fiyatla. Memnun kalmazsanız sadece pilot dönem ücreti.',
                  en: 'Variable-cost services: 50% pilot rate in the first month. Cancel and only pay the pilot.',
                },
              },
              {
                key: 'C' as const,
                skus: isEnglish ? 'Meta Ads · Google Ads' : 'Meta Reklam · Google Reklam',
                desc: {
                  tr: 'Reklam yönetiminde ilk ay ücret %50. Reklam bütçesi her zaman sizin kartınızdan Meta/Google’a gider — bize uğramaz.',
                  en: 'Ad management: 50% first-month fee. Ad spend always flows from your card direct to Meta/Google — never through us.',
                },
              },
            ].map((model) => (
              <div key={model.key} className="card-muted">
                <span className="badge badge-accent">
                  Model {model.key} · {isEnglish ? RISK_LABELS[model.key].en : RISK_LABELS[model.key].tr}
                </span>
                <p
                  style={{
                    marginTop: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--fg-3)',
                  }}
                >
                  {model.skus}
                </p>
                <p style={{ marginTop: 10, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                  {isEnglish ? model.desc.en : model.desc.tr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
