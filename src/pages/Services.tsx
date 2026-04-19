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
} from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';

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
const WHATSAPP_LABEL = '+90 531 829 97 01';

const CATEGORIES: Record<CategoryKey, { tr: string; en: string; accent: string }> = {
  automation: {
    tr: 'Otomasyon & AI Asistan',
    en: 'Automation & AI Assistant',
    accent: 'from-purple-500 to-fuchsia-500',
  },
  web: {
    tr: 'Web & İçerik',
    en: 'Web & Content',
    accent: 'from-cyan-500 to-blue-500',
  },
  marketing: {
    tr: 'Performans Pazarlama',
    en: 'Performance Marketing',
    accent: 'from-amber-500 to-orange-500',
  },
  infrastructure: {
    tr: 'Altyapı & Raporlama',
    en: 'Infrastructure & Reporting',
    accent: 'from-emerald-500 to-teal-500',
  },
};

const RISK_LABELS: Record<RiskModel, { tr: string; en: string; color: string }> = {
  A: {
    tr: '30 gün ücretsiz',
    en: '30-day free trial',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  },
  B: {
    tr: 'İlk ay %50 pilot',
    en: '50% pilot month',
    color: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  },
  C: {
    tr: 'İlk ay yönetim %50',
    en: '50% first-month management',
    color: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
  },
  project: {
    tr: 'Proje bazlı teslim',
    en: 'Project-based delivery',
    color: 'bg-slate-500/15 text-slate-300 border-slate-400/30',
  },
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
    setupTR: '0 ₺',
    monthlyTR: '1.999 – 4.999 ₺',
    setupGB: 'Free',
    monthlyGB: '£59 – £149',
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
    setupTR: '14.999 ₺',
    monthlyTR: '9.999 – 14.999 ₺',
    setupGB: '£450',
    monthlyGB: '£399 – £749',
    risk: 'B',
    features: {
      tr: [
        'Türkçe doğal ses (dudak senkronu gerekmez)',
        '500–2.000 dakika/ay çağrı karşılama',
        'Çağrı özeti + tam transkript CRM\'e',
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
    setupTR: '2.999 – 7.999 ₺',
    monthlyTR: '1.499 – 2.499 ₺',
    setupGB: '£90 – £240',
    monthlyGB: '£45 – £75',
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
    setupTR: '14.999 – 39.999 ₺',
    monthlyTR: '499 ₺ (hosting)',
    setupGB: '£450 – £1.200',
    monthlyGB: '£15 (hosting)',
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
    setupTR: '4.999 – 9.999 ₺',
    monthlyTR: '—',
    setupGB: '£150 – £300',
    monthlyGB: '—',
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
    setupTR: '0 ₺',
    monthlyTR: '1.999 – 3.499 ₺',
    setupGB: 'Free',
    monthlyGB: '£59 – £109',
    risk: 'B',
    features: {
      tr: [
        'Aylık 8–15 statik + 2–4 kısa motion (≤10 sn)',
        'Marka rengine + fontuna uyumlu',
        'Caption + yayın takvimi',
        'Video projesi opsiyonel (proje bazlı 5.000 – 15.000 ₺)',
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
    tagline: {
      tr: 'Teknik SEO + içerik + aylık raporlama.',
      en: 'Technical SEO + content + monthly reporting.',
    },
    setupTR: '4.999 ₺',
    monthlyTR: '2.999 – 5.999 ₺',
    setupGB: '£150',
    monthlyGB: '£89 – £179',
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
      en: 'Hybrid model: fixed management + spend commission. Budget stays on your card.',
    },
    setupTR: '2.999 ₺',
    monthlyTR: '5.000 ₺ + spend × %10',
    setupGB: '£90',
    monthlyGB: '£150 + spend × 10%',
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
    setupTR: '2.999 ₺',
    monthlyTR: '5.000 ₺ + spend × %10',
    setupGB: '£90',
    monthlyGB: '£150 + spend × 10%',
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
    setupTR: '9.999 – 24.999 ₺',
    monthlyTR: '1.499 ₺ (destek)',
    setupGB: '£300 – £750',
    monthlyGB: '£45 (support)',
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
      en: 'Distills all active service performance into one monthly report.',
    },
    setupTR: '0 ₺',
    monthlyTR: '499 – 999 ₺',
    setupGB: 'Free',
    monthlyGB: '£15 – £29',
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
  const categoryAccent = CATEGORIES[service.category].accent;
  const riskLabel = RISK_LABELS[service.risk];

  const waMessage = isEnglish
    ? `Hi, I'd like details on the "${service.name.en}" service.`
    : `Merhaba, "${service.name.tr}" hizmeti hakkında bilgi almak istiyorum.`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:border-white/25 hover:bg-slate-900/80 ${
        service.recommended ? 'ring-1 ring-emerald-400/40' : ''
      }`}
    >
      {service.recommended && (
        <span className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950">
          {isEnglish ? 'Most popular' : 'En çok tercih edilen'}
        </span>
      )}

      <div className="flex items-start gap-3">
        <div className={`rounded-xl bg-gradient-to-br ${categoryAccent} p-2.5 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-300 leading-relaxed">{tagline}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-slate-400">
            {isEnglish ? 'Setup' : 'Kurulum'}
          </p>
          <p className="mt-0.5 text-sm font-bold text-white">{setup}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-slate-400">
            {isEnglish ? 'Monthly' : 'Aylık'}
          </p>
          <p className="mt-0.5 text-sm font-bold text-white">{monthly}</p>
        </div>
      </div>

      <span
        className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskLabel.color}`}
      >
        <Check className="h-3 w-3" />
        {isEnglish ? riskLabel.en : riskLabel.tr}
      </span>

      <ul className="mt-5 flex-1 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-200">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={createWhatsAppLink(waMessage)}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" />
        {isEnglish ? 'Ask on WhatsApp' : 'WhatsApp\'tan Danış'}
      </a>
    </div>
  );
}

export default function Services() {
  const { language } = useLanguage();
  const { region } = useLocation();
  const isEnglish = language === 'en';
  const isGB = region === 'GB';
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');

  const grouped = useMemo(() => {
    const byCategory: Record<CategoryKey, ServiceSku[]> = {
      automation: [],
      web: [],
      marketing: [],
      infrastructure: [],
    };
    for (const s of SERVICES) byCategory[s.category].push(s);
    return byCategory;
  }, []);

  const visible =
    activeCategory === 'all' ? SERVICES : grouped[activeCategory];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-['Inter',_sans-serif]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[45%] w-[45%] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[45%] w-[45%] rounded-full bg-cyan-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3 w-3" />
            {isEnglish ? 'Full-service digital agency' : 'Tam hizmet dijital ajans'}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
            {isEnglish ? 'Pick the services you need.' : 'İhtiyacınız olan hizmeti seçin.'}
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {isEnglish ? 'Skip what you don\'t.' : 'Gerekmeyeni atlayın.'}
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
            {isEnglish
              ? '11 independent services. Mix them à la carte, or combine for 10–15% bundle discount. AI is our internal leverage — you get the outcome, not buzzwords.'
              : '11 bağımsız hizmet. Tek tek alın, ya da paket olarak %10–15 indirimle birleştirin. AI bizim iç kaldıracımız — siz sonucu alırsınız, pazarlama sloganını değil.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
              <Check className="h-3 w-3 text-emerald-400" />
              {isEnglish ? 'Transparent pricing' : 'Şeffaf fiyat'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
              <Check className="h-3 w-3 text-emerald-400" />
              {isEnglish ? 'No lock-in contract' : 'Taahhüt yok'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
              <Check className="h-3 w-3 text-emerald-400" />
              {isEnglish ? 'Risk-matched trials' : 'Hizmete uygun deneme modeli'}
            </span>
          </div>
        </header>

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeCategory === 'all'
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-white/10 bg-slate-900/60 text-slate-300 hover:bg-slate-900'
            }`}
          >
            {isEnglish ? 'All services' : 'Tüm hizmetler'}{' '}
            <span className="text-slate-500">({SERVICES.length})</span>
          </button>
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === key
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/10 bg-slate-900/60 text-slate-300 hover:bg-slate-900'
              }`}
            >
              {isEnglish ? CATEGORIES[key].en : CATEGORIES[key].tr}{' '}
              <span className="text-slate-500">({grouped[key].length})</span>
            </button>
          ))}
        </nav>

        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard key={service.id} service={service} isEnglish={isEnglish} isGB={isGB} />
          ))}
        </section>

        <section className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3 w-3" />
                {isEnglish ? 'Bundle savings' : 'Paket avantajı'}
              </span>
              <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
                {isEnglish ? 'Combine services. Save 10–15%.' : 'Birleştirin. %10–15 indirim kazanın.'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {isEnglish
                  ? 'Three curated bundles for different business stages: Starter (2 services, 10% off), Growth (3–4 services, 12% off), and Full Operations (5+ services, 15% off).'
                  : 'İşletmenizin aşamasına göre 3 hazır paket: Başlangıç (2 hizmet, %10), Büyüme (3–4 hizmet, %12), Tam Operasyon (5+ hizmet, %15).'}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-slate-200">
                {[
                  {
                    tr: 'Başlangıç — WhatsApp Bot + Landing Page',
                    en: 'Starter — WhatsApp Bot + Landing Page',
                  },
                  {
                    tr: 'Büyüme — Web + WhatsApp Bot + SEO + Analitik',
                    en: 'Growth — Website + WhatsApp Bot + SEO + Analytics',
                  },
                  {
                    tr: 'Tam Operasyon — Web + Bot + n8n + CRM + Reklam + SEO',
                    en: 'Full Ops — Website + Bot + n8n + CRM + Ads + SEO',
                  },
                ].map((item) => (
                  <li key={item.tr} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{isEnglish ? item.en : item.tr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
              <h3 className="text-lg font-bold text-white">
                {isEnglish ? 'Not sure where to start?' : 'Nereden başlayacağınızdan emin değil misiniz?'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {isEnglish
                  ? '15-minute discovery call: we look at your current bottleneck, suggest the highest-leverage service first, and only layer more when the first one proves ROI.'
                  : '15 dakikalık keşif görüşmesi: mevcut darboğazınıza bakarız, en yüksek kaldıraçlı hizmeti ilk olarak öneririz; ROI kanıtlanmadan ikincisini eklemeyiz.'}
              </p>

              <a
                href={createWhatsAppLink(
                  isEnglish
                    ? 'Hi, I\'d like a 15-minute discovery call to pick the right service.'
                    : 'Merhaba, doğru hizmeti seçmek için 15 dakikalık keşif görüşmesi istiyorum.',
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                {isEnglish ? 'Book discovery on WhatsApp' : 'WhatsApp\'ta Keşif Görüşmesi'} ({WHATSAPP_LABEL})
              </a>

              <p className="mt-3 text-[11px] text-slate-500">
                {isEnglish
                  ? 'Londra / Istanbul — Monday to Saturday, 09:00–20:00 GMT+3'
                  : 'Londra / İstanbul — Pazartesi–Cumartesi, 09:00–20:00'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            {isEnglish ? 'How our risk-matched trials work' : 'Deneme modelleri nasıl çalışır'}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            {isEnglish
              ? 'Not every service has the same cost structure — so "30-day free" can\'t apply to all. We use three calibrated models that protect both sides.'
              : '"30 gün ücretsiz" her hizmet için uygun değil — değişken maliyetli hizmetlerde dürüst olmamak iki tarafı da yakar. 3 farklı model kullanıyoruz.'}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                key: 'A' as const,
                skus: isEnglish
                  ? 'WhatsApp Bot · n8n · SEO · Analytics'
                  : 'WhatsApp Bot · n8n · SEO · Analitik',
                desc: {
                  tr: 'Düşük değişken maliyetli hizmetlerde ilk 30 gün tamamen ücretsiz. Beğenmezseniz tek mesajla iptal, ücret yok.',
                  en: 'For low-variable-cost services: fully free for 30 days. Cancel with one message, no charge.',
                },
              },
              {
                key: 'B' as const,
                skus: isEnglish ? 'Voice Assistant · AI Content' : 'Sesli Asistan · AI İçerik',
                desc: {
                  tr: 'Değişken maliyetli hizmetlerde ilk ay %50 pilot fiyatla. Memnun kalmazsanız sadece pilot dönem ücreti.',
                  en: 'For variable-cost services: 50% pilot rate in the first month. Cancel and only pay the pilot.',
                },
              },
              {
                key: 'C' as const,
                skus: isEnglish ? 'Meta Ads · Google Ads' : 'Meta Reklam · Google Reklam',
                desc: {
                  tr: 'Reklam yönetiminde ilk ay ücret %50. Reklam bütçesi her zaman sizin kartınızdan Meta/Google\'a gider — bize uğramaz.',
                  en: 'Ad management: 50% first-month fee. Ad spend always flows from your card direct to Meta/Google — never through us.',
                },
              },
            ].map((model) => {
              const riskLabel = RISK_LABELS[model.key];
              return (
                <div key={model.key} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskLabel.color}`}
                  >
                    {isEnglish ? `Model ${model.key}` : `Model ${model.key}`} · {isEnglish ? riskLabel.en : riskLabel.tr}
                  </span>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">{model.skus}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {isEnglish ? model.desc.en : model.desc.tr}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
