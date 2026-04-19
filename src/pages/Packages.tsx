import { type ReactNode, useMemo, useState } from 'react';
import { Check, ChevronDown, Coffee, Globe2, Home, MessageCircle, Pizza, ShieldCheck, Stethoscope } from 'lucide-react';
import type { PackageTierKey } from '../config/pricing';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';
import { PageNav } from '../components/ui/PageNav';

type PackagePlan = {
  key: PackageTierKey;
  subtitle: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  recommended?: boolean;
};

type TabMode = 'ready' | 'enterprise';

type SectorInsight = {
  name: { tr: string; en: string };
  stat: { tr: string; en: string };
  description: { tr: string; en: string };
  icon: ReactNode;
};

type FaqItem = {
  q: { tr: string; en: string };
  a: { tr: string; en: string };
};

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';

const readyPlanTemplates: PackagePlan[] = [
  {
    key: 'starter',
    subtitle: {
      tr: 'Mesai dışı kayıp biter.',
      en: 'Stop losing patients after hours.',
    },
    features: {
      tr: [
        'WhatsApp AI asistan (7/24)',
        'Takvim & Google Sheets senkronizasyonu',
        'Standart yanıt şablonları (klinik özelleştirmesi)',
        'E-posta destek',
      ],
      en: [
        'WhatsApp AI assistant (24/7)',
        'Calendar & Google Sheets sync',
        'Standard response templates (clinic-specific tuning)',
        'Email support',
      ],
    },
  },
  {
    key: 'pro',
    subtitle: {
      tr: 'Tüm yazılı kanallar tek akılla.',
      en: 'One brain for every text channel.',
    },
    features: {
      tr: [
        'WhatsApp + Instagram DM AI asistan',
        'n8n otomasyon akışları (randevu, hatırlatma, CRM senkron)',
        'CRM entegrasyonu (HubSpot, Pipedrive veya özel)',
        'Rakip & lead izleme dahil',
        'Öncelikli destek (24 saat SLA)',
      ],
      en: [
        'WhatsApp + Instagram DM AI assistant',
        'n8n automation flows (booking, reminders, CRM sync)',
        'CRM integration (HubSpot, Pipedrive or custom)',
        'Competitor & lead tracking included',
        'Priority support (24h SLA)',
      ],
    },
    recommended: true,
  },
  {
    key: 'advanced',
    subtitle: {
      tr: 'Telefonunuzu AI, bir insan gibi karşılar.',
      en: 'AI answers your phone like a human.',
    },
    features: {
      tr: [
        'Büyüme paketi tamamı dahil',
        'AI sesli asistan — gelen çağrı (500 dk/ay)',
        'Çağrı özeti ve tam transkript CRM\'e',
        'Otomatik randevu oluşturma ve güncelleme',
        'Özel ses klonlama (opsiyonel)',
        'Dedicated onboarding (2 hafta)',
      ],
      en: [
        'Everything in Growth',
        'AI voice assistant — inbound calls (500 min/mo)',
        'Call summary + full transcript pushed to CRM',
        'Automatic appointment creation & rescheduling',
        'Custom voice cloning (optional)',
        'Dedicated onboarding (2 weeks)',
      ],
    },
  },
  {
    key: 'business',
    subtitle: {
      tr: 'İşletmenizin görünmez 7/24 yöneticisi.',
      en: 'Your invisible 24/7 operations manager.',
    },
    features: {
      tr: [
        'Oto-Sekreter paketi tamamı dahil',
        'Web chat + özel entegrasyonlar (Stripe, iyzico, klinik yazılımı)',
        'Derin CRM ve ödeme otomasyonları',
        'Dedicated success manager',
        'SLA garantisi + öncelikli altyapı',
      ],
      en: [
        'Everything in Auto-Receptionist',
        'Web chat + bespoke integrations (Stripe, clinic management software)',
        'Deep CRM & payment automations',
        'Dedicated success manager',
        'SLA guarantee + priority infrastructure',
      ],
    },
  },
];

const sectorInsights: SectorInsight[] = [
  {
    name: { tr: 'Restoran & Kafe', en: 'Restaurant & Café' },
    stat: { tr: '%40 personel tasarrufu', en: '40% staff savings' },
    description: {
      tr: 'Sipariş ve rezervasyon otomasyonu ile garsonlar sadece servise odaklanır.',
      en: 'With order and reservation automation, staff focus only on service.',
    },
    icon: (
      <span className="inline-flex items-center gap-1.5 text-amber-200">
        <Pizza size={20} />
        <Coffee size={20} />
      </span>
    ),
  },
  {
    name: { tr: 'Klinik & Sağlık', en: 'Clinic & Healthcare' },
    stat: { tr: '%100 randevu doluluğu', en: '100% appointment fill rate' },
    description: {
      tr: 'No-show\'u önleyen hatırlatma sistemi ile ciro kaybı biter.',
      en: 'The reminder system prevents no-shows and stops revenue leakage.',
    },
    icon: <Stethoscope size={22} className="text-emerald-200" />,
  },
  {
    name: { tr: 'İhracat & Satış', en: 'Export & Sales' },
    stat: { tr: '7/24 anlık yanıt', en: '24/7 instant response' },
    description: {
      tr: 'Gece gelen yurtdışı taleplerini kaçırmadan anında İngilizce/Arapça yanıtlayın.',
      en: 'Respond instantly in English/Arabic to overnight international inquiries.',
    },
    icon: <Globe2 size={22} className="text-cyan-200" />,
  },
];

const faqItems: FaqItem[] = [
  {
    q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
    a: {
      tr: 'Başlangıç ve Büyüme paketleri 3–5 iş günü içinde canlıya alınır. Oto-Sekreter ve Tam Otonomi için ortalama 2 hafta (telefon hattı entegrasyonu ve ses eğitimi dahil).',
      en: 'Starter and Growth go live within 3–5 business days. Auto-Receptionist and Full Autonomy average 2 weeks (phone line integration and voice training included).',
    },
  },
  {
    q: { tr: 'Sözleşme süresi var mı?', en: 'Is there a contract term?' },
    a: {
      tr: 'Hayır. Aylık abonelik — istediğiniz zaman durdurabilirsiniz. Yıllık ödemede %15 indirim sunuyoruz.',
      en: 'No. Monthly subscription — cancel anytime. Pay annually and get a 15% discount.',
    },
  },
  {
    q: { tr: 'İlk ay gerçekten ücretsiz mi?', en: 'Is the first month really free?' },
    a: {
      tr: 'Evet. Kurulumu tamamlıyoruz, sisteminiz 30 gün boyunca gerçek trafikle çalışıyor. Sistemden memnun kalmazsanız hiçbir yükümlülük olmadan ayrılırsınız — aylık ücret yalnızca 31. günde başlar.',
      en: 'Yes. We build it, your system runs on real traffic for 30 days. If you are not satisfied, you walk away with zero obligation — monthly billing only starts on day 31.',
    },
  },
  {
    q: { tr: 'Verilerim güvende mi?', en: 'Is my data secure?' },
    a: {
      tr: 'Tüm mesaj ve çağrı verileri kendi sunucumuzda (AB lokasyonu) tutulur. Üçüncü parti pazarlama paylaşımı yoktur. Kurumsal paketlerde on-premise seçeneği sunulur (KVKK/GDPR uyumlu).',
      en: 'All message and call data is stored on our own servers (EU region). No third-party marketing sharing. Enterprise plans offer an on-premise option (KVKK/GDPR compliant).',
    },
  },
  {
    q: { tr: 'Kota aşımında ne olur, sistem kilitlenir mi?', en: 'What happens when I exceed quota?' },
    a: {
      tr: 'Asla kilitlenmez. Aşım olduğunda size otomatik uyarı gider, trafik kesintisiz devam eder ve ekstra kullanım ilan edilen aşım tarifesiyle faturaya eklenir.',
      en: 'It never locks. You get an automatic alert, traffic continues uninterrupted, and extra usage is billed at the published overage rate.',
    },
  },
  {
    q: { tr: 'Mevcut CRM\'ime entegre olur mu?', en: 'Does it integrate with my existing CRM?' },
    a: {
      tr: 'HubSpot, Pipedrive, Zoho ve Salesforce Büyüme paketinden itibaren standarttır. Özel klinik yönetim yazılımları (CDR, Dentrix, Diş Yazılımı, Akıllı Klinik vb.) Oto-Sekreter ve üstü paketlerde entegre edilir.',
      en: 'HubSpot, Pipedrive, Zoho and Salesforce are standard from Growth up. Custom clinic management software is integrated on Auto-Receptionist and above.',
    },
  },
];

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function PlanCard({
  plan,
  region,
  isEnglish,
}: {
  plan: ReturnType<typeof buildReadyPlans>[number];
  region: 'TR' | 'GB';
  isEnglish: boolean;
}) {
  const hasSetupFee = plan.setupFee > 0;
  const hasVoice = plan.voiceMinutes > 0;

  return (
    <article
      className={`relative flex flex-col rounded-3xl border bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/60 ${
        plan.recommended ? 'border-fuchsia-300/60 shadow-[0_0_30px_rgba(217,70,239,0.35)]' : 'border-white/15'
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1 rounded-full border border-fuchsia-300/70 bg-fuchsia-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-fuchsia-100">
          {isEnglish ? '⭐ Most Popular' : '⭐ En Çok Tercih Edilen'}
        </span>
      )}

      <h2 className="mt-2 text-xl font-bold">{plan.name}</h2>
      <p className={`mt-1 text-sm ${plan.recommended ? 'font-semibold text-fuchsia-200' : 'text-slate-300'}`}>
        {plan.subtitle}
      </p>

      <div className="mt-4">
        <p className="text-3xl font-black text-cyan-300">{formatPrice(plan.price, region)}</p>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-100/80">
          {isEnglish ? 'per month' : 'aylık'}
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-300">
        {hasSetupFee ? (
          <span>
            <span className="text-slate-400">{isEnglish ? 'One-time setup: ' : 'Tek seferlik kurulum: '}</span>
            <span className="font-bold text-amber-200">{formatPrice(plan.setupFee, region)}</span>
          </span>
        ) : (
          <span className="font-semibold text-emerald-200">
            {isEnglish ? '✓ Setup included (free)' : '✓ Kurulum dahil (ücretsiz)'}
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-2">
        <div className="rounded-lg border border-emerald-300/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
          <span className="font-bold">
            {plan.chatConversations.toLocaleString(isEnglish ? 'en-GB' : 'tr-TR')}{' '}
            {isEnglish ? 'chat conversations' : 'görüşme'}
          </span>{' '}
          <span className="text-emerald-200/80">{isEnglish ? '/ month' : '/ ay'}</span>
        </div>
        {hasVoice && (
          <div className="rounded-lg border border-fuchsia-300/25 bg-fuchsia-500/10 px-3 py-2 text-xs text-fuchsia-100">
            <span className="font-bold">
              {plan.voiceMinutes.toLocaleString(isEnglish ? 'en-GB' : 'tr-TR')}{' '}
              {isEnglish ? 'voice minutes' : 'dk sesli asistan'}
            </span>{' '}
            <span className="text-fuchsia-200/80">{isEnglish ? '/ month' : '/ ay'}</span>
          </div>
        )}
      </div>

      <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-200">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-lg bg-black/30 px-3 py-2 text-[11px] leading-relaxed text-slate-400">
        <span className="font-semibold text-slate-300">{isEnglish ? 'Overage: ' : 'Aşım: '}</span>
        {isEnglish
          ? `+${formatPrice(plan.overageChatPer100, region)} per 100 conversations${
              hasVoice ? ` · +${formatPrice(plan.overageVoicePer100, region)} per 100 voice minutes` : ''
            }`
          : `100 görüşme +${formatPrice(plan.overageChatPer100, region)}${
              hasVoice ? ` · 100 dk ses +${formatPrice(plan.overageVoicePer100, region)}` : ''
            }`}
      </div>

      <a
        href={createWhatsAppLink(
          isEnglish
            ? `Hello, I would like to learn more about the ${plan.name} plan.`
            : `Merhaba, ${plan.name} paketi hakkında bilgi almak istiyorum.`,
        )}
        target="_blank"
        rel="noreferrer"
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
          plan.recommended
            ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 text-slate-900 hover:brightness-110'
            : 'bg-emerald-400 text-slate-900 hover:bg-emerald-300'
        }`}
      >
        <MessageCircle size={16} /> {isEnglish ? 'Start Free 30 Days' : '30 Gün Ücretsiz Başla'}
      </a>
    </article>
  );
}

function buildReadyPlans(
  pricing: ReturnType<typeof useLocation>['pricing'],
  isEnglish: boolean,
) {
  return readyPlanTemplates.map((template) => {
    const tier = pricing.packages[template.key];
    return {
      ...template,
      name: tier.name,
      price: tier.price,
      voiceMinutes: tier.voiceMinutes,
      chatConversations: tier.chatConversations,
      setupFee: tier.setupFee,
      overageChatPer100: tier.overageChatPer100,
      overageVoicePer100: tier.overageVoicePer100,
      subtitle: isEnglish ? template.subtitle.en : template.subtitle.tr,
      features: isEnglish ? template.features.en : template.features.tr,
    };
  });
}

export default function Packages() {
  const { pricing, region } = useLocation();
  const { language, t } = useLanguage();
  const isEnglish = language === 'en';

  const [activeTab, setActiveTab] = useState<TabMode>('ready');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const readyPlans = useMemo(() => buildReadyPlans(pricing, isEnglish), [pricing, isEnglish]);

  const seoTitle = isEnglish
    ? 'Ready Packages — Starter, Growth, Scale | MGL Digital Media'
    : 'Hazır Paketler — Başlangıç, Büyüme, Ölçeklendirme | MGL Digital Media';
  const seoDescription = isEnglish
    ? 'Pre-configured digital packages for SMEs: WhatsApp + voice bot + n8n + website + ads. Starter, Growth, Scale tiers in TRY and GBP. No lock-in.'
    : 'KOBİ\'ler için hazır dijital paketler: WhatsApp + sesli bot + n8n + web + reklam. Başlangıç, Büyüme, Ölçeklendirme seviyeleri. Taahhüt yok.';
  const breadcrumb = breadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEnglish ? 'Packages' : 'Paketler', path: '/packages' },
  ]);

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/packages"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={
          isEnglish
            ? ['digital agency packages', 'SME automation bundle', 'WhatsApp bot package', 'voice assistant package', 'website and ads bundle']
            : ['dijital ajans paketleri', 'KOBİ otomasyon paketi', 'WhatsApp bot paketi', 'sesli asistan paketi', 'web ve reklam paketi']
        }
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />
      <PageNav current="packages" />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">

        {/* Hero */}
        <section className="rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-10">
          <p className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200">
            {isEnglish ? 'Pricing' : 'Fiyatlandırma'}
          </p>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">
            {isEnglish
              ? 'Automation that pays for itself in the first month.'
              : 'İlk ayında kendini amorti eden otomasyon.'}
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300 md:text-lg">
            {isEnglish
              ? 'Four tiers. Transparent overage pricing. Zero long-term contracts. The first 30 days are on us — you only pay if the system proves it works on your real traffic.'
              : 'Dört kademe. Şeffaf aşım fiyatları. Uzun vadeli sözleşme yok. İlk 30 gün bizden — yalnızca sistem gerçek trafiğinizde çalıştığını kanıtladıysa ödersiniz.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-100">
              <ShieldCheck size={14} /> {isEnglish ? '30-day free trial' : '30 gün ücretsiz deneme'}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1.5 font-semibold text-cyan-100">
              {isEnglish ? 'No contract lock-in' : 'Taahhüt yok'}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1.5 font-semibold text-amber-100">
              {isEnglish ? 'Data stored in EU' : 'Veriler AB sunucularında'}
            </span>
          </div>

          <div className="mt-8 inline-flex flex-wrap rounded-2xl border border-white/15 bg-black/30 p-1">
            {(['ready', 'enterprise'] as TabMode[]).map((tab) => {
              const labels: Record<TabMode, { tr: string; en: string; color: string }> = {
                ready:      { tr: 'Paketler',        en: 'Plans',              color: 'bg-cyan-400' },
                enterprise: { tr: 'Kurumsal & Özel', en: 'Enterprise & Custom', color: 'bg-amber-300' },
              };
              const { tr, en, color } = labels[tab];
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                    activeTab === tab ? `${color} text-slate-900` : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isEnglish ? en : tr}
                </button>
              );
            })}
          </div>
        </section>

        {/* Ready plans */}
        {activeTab === 'ready' && (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {readyPlans.map((plan) => (
                <PlanCard key={plan.key} plan={plan} region={region} isEnglish={isEnglish} />
              ))}
            </section>

            {/* Comparison quick facts */}
            <section className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl md:p-8">
              <h2 className="text-2xl font-black md:text-3xl">
                {isEnglish ? 'What every plan includes' : 'Her pakette standart olanlar'}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    tr: 'Gerçek zamanlı mesaj motoru',
                    en: 'Real-time messaging engine',
                    desc: {
                      tr: 'Ortalama 3 saniyede ilk cevap.',
                      en: 'First reply in ~3 seconds on average.',
                    },
                  },
                  {
                    tr: 'İnsan devralma desteği',
                    en: 'Human hand-off support',
                    desc: {
                      tr: 'Kritik durumlarda bot ekibinize aktarır.',
                      en: 'The bot escalates to your team when it matters.',
                    },
                  },
                  {
                    tr: 'KVKK / GDPR uyumlu',
                    en: 'KVKK / GDPR compliant',
                    desc: {
                      tr: 'AB lokasyonlu sunucu, şifreli veri.',
                      en: 'EU-region hosting, encrypted storage.',
                    },
                  },
                  {
                    tr: 'Aylık performans raporu',
                    en: 'Monthly performance report',
                    desc: {
                      tr: 'Görüşme, dönüşüm, randevu oranları.',
                      en: 'Conversations, conversion, appointment rates.',
                    },
                  },
                ].map((item) => (
                  <div key={item.tr} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-bold text-cyan-200">{isEnglish ? item.en : item.tr}</p>
                    <p className="mt-2 text-xs text-slate-300">{isEnglish ? item.desc.en : item.desc.tr}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sector insights */}
            <section className="rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8">
              <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                Data Insight
              </p>
              <h2 className="mt-4 text-2xl font-black md:text-3xl">
                {isEnglish ? t('dataInsight.title') : 'Sektörler Yapay Zeka ile Ne Kazanıyor?'}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">
                {isEnglish
                  ? t('dataInsight.desc')
                  : 'Farklı sektörlerde devreye alınan otomasyonlar; hız, doluluk ve verimlilikte ölçülebilir sonuçlar sağlıyor.'}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {sectorInsights.map((insight) => (
                  <article
                    key={insight.name.tr}
                    className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/55"
                  >
                    <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-2">{insight.icon}</div>
                    <h3 className="mt-4 text-lg font-bold text-white">
                      {isEnglish ? insight.name.en : insight.name.tr}
                    </h3>
                    <p className="mt-2 text-2xl font-black text-cyan-200">
                      {isEnglish ? insight.stat.en : insight.stat.tr}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {isEnglish ? insight.description.en : insight.description.tr}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl md:p-8">
              <h2 className="text-2xl font-black md:text-3xl">
                {isEnglish ? 'Frequently asked questions' : 'Sık sorulan sorular'}
              </h2>
              <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30">
                {faqItems.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <button
                      key={item.q.tr}
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-white md:text-base">
                          {isEnglish ? item.q.en : item.q.tr}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-cyan-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                      {isOpen && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          {isEnglish ? item.a.en : item.a.tr}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* Enterprise */}
        {activeTab === 'enterprise' && (
          <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/40 bg-white/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.28)] backdrop-blur-2xl md:p-10">
            <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="relative max-w-4xl">
              <p className="inline-flex rounded-full border border-amber-200/60 bg-amber-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                {isEnglish ? 'Enterprise Solution' : 'Kurumsal Çözüm'}
              </p>
              <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
                {isEnglish ? 'Need something beyond the standard?' : 'Standartların dışında mısınız?'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
                {isEnglish
                  ? 'For hospital chains, multi-branch operations, factories and regulated industries we build bespoke solutions: on-premise deployment, custom integrations, dedicated infrastructure.'
                  : 'Hastane zincirleri, çok şubeli işletmeler, fabrikalar ve düzenlemeye tabi sektörler için terzi işi çözümler üretiyoruz: on-premise kurulum, özel entegrasyonlar, ayrılmış altyapı.'}
              </p>
              <ul className="mt-8 grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                {[
                  isEnglish ? 'On-premise deployment & data sovereignty' : 'On-premise kurulum & veri egemenliği',
                  isEnglish ? 'Unlimited integrations (SAP, Nebim, Logo, custom ERP)' : 'Sınırsız entegrasyon (SAP, Nebim, Logo, özel ERP)',
                  isEnglish ? '24/7 priority support with named engineer' : '7/24 öncelikli destek, atanmış mühendis',
                  isEnglish ? 'Custom AI training on your corpus' : 'Kendi veri setinizle özel AI eğitimi',
                  isEnglish ? 'Single sign-on (SSO) & audit logs' : 'Tek oturum (SSO) & denetim logları',
                  isEnglish ? 'Volume pricing & committed-use discounts' : 'Hacim indirimi & taahhütlü kullanım fiyatı',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 rounded-xl border border-white/20 bg-black/25 p-3">
                    <Check size={16} className="mt-0.5 text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={createWhatsAppLink(
                  isEnglish
                    ? 'Hello, I would like to discuss an enterprise/custom project.'
                    : 'Merhaba, kurumsal/özel bir proje için görüşmek istiyorum.',
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-fuchsia-300 px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:scale-[1.02]"
              >
                <MessageCircle size={16} />{' '}
                {isEnglish ? 'Talk to a Project Consultant' : 'Proje Danışmanıyla Görüş'} ({WHATSAPP_LABEL})
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
