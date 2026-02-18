import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Check, Coffee, Globe2, Home, Info, MessageCircle, Pizza, Stethoscope } from 'lucide-react';
import type { PackageTierKey } from '../config/pricing';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../utils/formatPrice';

type PackagePlan = {
  key: PackageTierKey;
  subtitle: {
    tr: string;
    en: string;
  };
  features: {
    tr: string[];
    en: string[];
  };
  recommended?: boolean;
};

type TabMode = 'ready' | 'custom' | 'enterprise';

type ChannelKey = 'whatsapp' | 'instagram' | 'web';
type AddonKey = 'automation' | 'marketAnalysis' | 'websitePanel';

type SectorInsight = {
  name: {
    tr: string;
    en: string;
  };
  stat: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  icon: ReactNode;
};

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';
const BASE_PRICE_TRY = 2999;
const PRICE_PER_MINUTE_TRY = 4;
const MONTHLY_EMPLOYER_COST_TRY = 30000;
const TRY_TO_GBP_RATE = 0.025;

const UK_ESTIMATED_SAVINGS_BY_PLAN: Record<PackageTierKey, string> = {
  starter: '£3,500–£5,000',
  pro: '£15,000–£20,000',
  advanced: '£30,000–£40,000',
  business: '£75,000+',
};

const readyPlanTemplates: PackagePlan[] = [
  {
    key: 'starter',
    subtitle: {
      tr: 'Dijitalleşmeye ilk adım.',
      en: 'Your first step into digital operations.',
    },
    features: {
      tr: ['Sesli Asistan (Telefon) - 300 dk', 'WhatsApp Müşteri Karşılama', 'Pazar & Rakip Analizi'],
      en: ['Voice Assistant (Phone) - 300 min', 'WhatsApp Customer Greeting', 'Market & Competitor Analysis'],
    },
  },
  {
    key: 'pro',
    subtitle: {
      tr: '⭐ En Çok Tercih Edilen',
      en: '⭐ Most Popular',
    },
    features: {
      tr: [
        'Sesli Asistan (Telefon) - 800 dk',
        'WhatsApp + Instagram Bot Danışma Hattı',
        'Otomatik İşlemler',
      ],
      en: [
        'Voice Assistant (Phone) - 800 min',
        'WhatsApp + Instagram Bot Support Line',
        'Automated Workflows',
      ],
    },
    recommended: true,
  },
  {
    key: 'advanced',
    subtitle: {
      tr: 'Tam otomasyon ve analiz.',
      en: 'Full automation and analytics.',
    },
    features: {
      tr: ['Sesli Asistan (Telefon) - 1200 dk', 'Pazar & Rakip Analizi', 'Web Sitesi & Panel'],
      en: ['Voice Assistant (Phone) - 1200 min', 'Market & Competitor Analysis', 'Website & Panel'],
    },
  },
  {
    key: 'business',
    subtitle: {
      tr: 'Sınırsız güç ve öncelik.',
      en: 'Maximum power and priority support.',
    },
    features: {
      tr: ['Sesli Asistan (Telefon) - 2000 dk', 'Otomatik İşlemler', 'Tam Kanal Yönetimi + Müşteri Takip Sistemi (CRM)'],
      en: ['Voice Assistant (Phone) - 2000 min', 'Automated Workflows', 'Full Channel Management + Customer Tracking System (CRM)'],
    },
  },
];

const channelPrices: Record<ChannelKey, { label: string; price: number }> = {
  whatsapp: { label: 'WhatsApp Bot', price: 1999 },
  instagram: { label: 'Instagram Bot', price: 1499 },
  web: { label: 'Web Chat Bot', price: 999 },
};

const addonPrices: Record<
  AddonKey,
  {
    label: string;
    price: number;
    tooltip: string;
    smartTooltip?: string;
  }
> = {
  automation: {
    label: 'Otomatik İşlemler',
    price: 1499,
    tooltip: 'Tekrar eden işleri (fatura, mail, veri girişi) robota devreder.',
    smartTooltip: 'N8N altyapısı ile departmanlar arası işleri otopilota alır.',
  },
  marketAnalysis: {
    label: 'Pazar & Rakip Analizi',
    price: 1999,
    tooltip: 'Rakiplerin fiyatlarını izler, müşteri listesi toplar.',
  },
  websitePanel: {
    label: 'Web Sitesi & Panel',
    price: 4999,
    tooltip: 'Müşteri etkileşimini tek merkezden yönetebileceğiniz satış odaklı bir vitrin sunar.',
  },
};



function convertTryPrice(value: number, region: 'TR' | 'GB') {
  if (region === 'TR') {
    return value;
  }

  return Number((value * TRY_TO_GBP_RATE).toFixed(2));
}

const sectorInsights: SectorInsight[] = [
  {
    name: {
      tr: 'Restoran & Kafe',
      en: 'Restaurant & Cafe',
    },
    stat: {
      tr: '%40 Personel Tasarrufu',
      en: '40% Staff Savings',
    },
    description: {
      tr: 'Sipariş ve rezervasyon otomasyonu ile garsonlar sadece servise odaklanır.',
      en: 'With order and reservation automation, waiters focus only on service.',
    },
    icon: (
      <span className="inline-flex items-center gap-1.5 text-amber-200">
        <Pizza size={20} />
        <Coffee size={20} />
      </span>
    ),
  },
  {
    name: {
      tr: 'Klinik & Sağlık',
      en: 'Clinic & Healthcare',
    },
    stat: {
      tr: '%100 Randevu Doluluğu',
      en: '100% Appointment Fill Rate',
    },
    description: {
      tr: 'Gelmeyen hastaları (No-show) önleyen hatırlatma sistemi ile ciro kaybı biter.',
      en: 'Prevent no-shows with a reminder system that ends revenue loss.',
    },
    icon: <Stethoscope size={22} className="text-emerald-200" />,
  },
  {
    name: {
      tr: 'İhracat & Satış',
      en: 'Export & Sales',
    },
    stat: {
      tr: '7/24 Anlık Yanıt',
      en: '24/7 Instant Response',
    },
    description: {
      tr: 'Gece gelen yurtdışı taleplerini kaçırmadan, anında İngilizce/Arapça yanıtlayın.',
      en: 'Respond instantly in English/Arabic to overnight international inquiries without missing them.',
    },
    icon: <Globe2 size={22} className="text-cyan-200" />,
  },
];
function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Packages() {
  const { pricing, region } = useLocation();
  const { t } = useLanguage();
  const isUkPricing = region === 'GB';
  const [activeTab, setActiveTab] = useState<TabMode>('ready');
  const [voiceMinutes, setVoiceMinutes] = useState(500);
  const [channels, setChannels] = useState<Record<ChannelKey, boolean>>({
    whatsapp: true,
    instagram: false,
    web: false,
  });
  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    automation: true,
    marketAnalysis: false,
    websitePanel: false,
  });
  const [isTotalAnimating, setIsTotalAnimating] = useState(false);

  const regionalBasePrice = convertTryPrice(BASE_PRICE_TRY, region);
  const regionalPricePerMinute = convertTryPrice(PRICE_PER_MINUTE_TRY, region);
  const regionalMonthlyEmployerCost = convertTryPrice(MONTHLY_EMPLOYER_COST_TRY, region);

  const regionalChannelPrices = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(channelPrices).map(([key, value]) => [key, { ...value, price: convertTryPrice(value.price, region) }])
      ) as Record<ChannelKey, { label: string; price: number }>,
    [region],
  );

  const regionalAddonPrices = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(addonPrices).map(([key, value]) => [key, { ...value, price: convertTryPrice(value.price, region) }])
      ) as Record<AddonKey, { label: string; price: number; tooltip: string; smartTooltip?: string }>,
    [region],
  );

  const voiceCost = voiceMinutes * regionalPricePerMinute;

  const readyPlans = useMemo(
    () =>
      readyPlanTemplates.map((template) => ({
        ...template,
        name: pricing.packages[template.key].name,
        price: pricing.packages[template.key].price,
        subtitle: isUkPricing ? template.subtitle.en : template.subtitle.tr,
        features: isUkPricing ? template.features.en : template.features.tr,
      })),
    [isUkPricing, pricing]
  );


  const total = useMemo(() => {
    const channelsTotal = Object.entries(channels).reduce((acc, [key, selected]) => {
      if (!selected) return acc;
      return acc + regionalChannelPrices[key as ChannelKey].price;
    }, 0);

    const addonsTotal = Object.entries(addons).reduce((acc, [key, selected]) => {
      if (!selected) return acc;
      return acc + regionalAddonPrices[key as AddonKey].price;
    }, 0);

    return regionalBasePrice + channelsTotal + addonsTotal + voiceCost;
  }, [channels, addons, regionalBasePrice, voiceCost, regionalAddonPrices, regionalChannelPrices]);

  useEffect(() => {
    setIsTotalAnimating(true);
    const timeout = window.setTimeout(() => setIsTotalAnimating(false), 250);
    return () => window.clearTimeout(timeout);
  }, [total]);


  const summaryParts = [
    ...Object.entries(channels)
      .filter(([, selected]) => selected)
      .map(([key]) => regionalChannelPrices[key as ChannelKey].label),
    `${voiceMinutes}dk Sesli Asistan (Telefon)`,
    ...Object.entries(addons)
      .filter(([, selected]) => selected)
      .map(([key]) => regionalAddonPrices[key as AddonKey].label),
  ];

  const customMessage = `Kendi Paketim: ${summaryParts.join(' + ')}. Toplam teklif: ${formatPrice(total, region)}`;

  return (
    <div className="min-h-screen bg-[#05060a] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Back to Home Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span>{isUkPricing ? 'Home' : 'Ana Sayfa'}</span>
        </button>
        <section className="rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8">
          <p className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200">
            Paket Merkezi
          </p>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">İşinizi Büyüten Paketler</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Hazır paketle bugün başlayın, kendi paketinizi canlı fiyatla oluşturun veya kurumsal ihtiyaçlarınız için özel proje
            planlayın.
          </p>

          <div className="mt-6 inline-flex flex-wrap rounded-2xl border border-white/15 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('ready')}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                activeTab === 'ready'
                  ? 'bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.45)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📦 Hazır Paketler
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                activeTab === 'custom'
                  ? 'bg-fuchsia-400 text-slate-900 shadow-[0_0_20px_rgba(232,121,249,0.45)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛠️ Kendi Paketini Yap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('enterprise')}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                activeTab === 'enterprise'
                  ? 'bg-amber-300 text-slate-900 shadow-[0_0_20px_rgba(252,211,77,0.45)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏢 Kurumsal & Özel Çözümler
            </button>
          </div>
        </section>

        {activeTab === 'ready' && (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {readyPlans.map((plan) => (
                <article
                  key={plan.key}
                  className={`relative rounded-3xl border bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/60 ${
                    plan.recommended
                      ? 'border-fuchsia-300/60 shadow-[0_0_30px_rgba(217,70,239,0.35)]'
                      : 'border-white/15'
                  }`}
                >
                  <span className="absolute -top-3 left-4 z-10 inline-flex max-w-[70%] items-center gap-1 rounded-full border border-emerald-300/70 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-100 sm:max-w-none sm:text-xs">
                    {isUkPricing ? '✅ Setup Included (£0)' : '✅ Kurulum Dahil (0 TL)'}
                  </span>
                  <h2 className="mt-4 text-xl font-bold">{plan.name}</h2>
                  <p
                    className={`mt-1 text-sm ${
                      plan.recommended ? 'font-semibold text-fuchsia-200' : 'text-slate-300'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                  <p className="mt-2 text-3xl font-black text-cyan-300">{formatPrice(plan.price, region)}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-cyan-100/80">
                    {isUkPricing ? 'MONTHLY PAYMENT' : 'AYLIK ÖDEME'}
                  </p>
                  <p className="mt-3 rounded-xl border border-emerald-300/45 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                    {isUkPricing
                      ? `Efficiency Impact: This plan saves your business an estimated ${UK_ESTIMATED_SAVINGS_BY_PLAN[plan.key]} in annual labor costs.`
                      : `Tasarruf Notu: Bu paket, işletmenize yılda ortalama ${formatPrice((regionalMonthlyEmployerCost - plan.price) * 12, region)} personel tasarrufu sağlar.`}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={createWhatsAppLink(
                      isUkPricing
                        ? `Hello, I would like more information about the ${plan.name} package.`
                        : `Merhaba, ${plan.name} paketi hakkında bilgi almak istiyorum.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-300"
                  >
                    <MessageCircle size={16} /> {isUkPricing ? 'Contact via WhatsApp' : 'WhatsApp ile Bilgi Al'}
                  </a>
                </article>
              ))}
            </section>

            <section className="rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8">
              <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                Data Insight
              </p>
              <h2 className="mt-4 text-2xl font-black md:text-3xl">
                {isUkPricing ? t('dataInsight.title') : 'Sektörler Yapay Zeka ile Ne Kazanıyor?'}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">
                {isUkPricing ? t('dataInsight.desc') : 'Farklı sektörlerde devreye alınan otomasyonlar; hız, doluluk ve verimlilikte ölçülebilir sonuçlar sağlıyor.'}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {sectorInsights.map((insight) => (
                  <article
                    key={insight.name.tr}
                    className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/55"
                  >
                    <div className="inline-flex rounded-xl border border-white/20 bg-white/10 p-2">{insight.icon}</div>
                    <h3 className="mt-4 text-lg font-bold text-white">
                      {isUkPricing ? insight.name.en : insight.name.tr}
                    </h3>
                    <p className="mt-2 text-2xl font-black text-cyan-200">
                      {isUkPricing ? insight.stat.en : insight.stat.tr}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {isUkPricing ? insight.description.en : insight.description.tr}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'custom' && (
          <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Temel Kurulum</p>
                <p className="mt-1 text-2xl font-black text-cyan-100">{formatPrice(regionalBasePrice, region)}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">İletişim Kanalları</h3>
                <p className="mt-1 text-xs text-slate-400">Tüm kanal fiyatları aylık olarak ücretlendirilir.</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(Object.keys(channelPrices) as ChannelKey[]).map((channel) => (
                    <label key={channel} className="flex items-center justify-between rounded-xl border border-white/15 bg-black/30 p-3">
                      <span>
                        {regionalChannelPrices[channel].label}
                        <span className="ml-2 text-xs text-cyan-300">+{formatPrice(regionalChannelPrices[channel].price, region)}</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={channels[channel]}
                        onChange={() => setChannels((prev) => ({ ...prev, [channel]: !prev[channel] }))}
                        className="h-5 w-5 accent-cyan-400"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Sesli Asistan (Telefon) Dakikası</h3>
                <div className="mt-3 rounded-2xl border border-white/15 bg-black/30 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{voiceMinutes} dk</span>
                    <span className="font-bold text-fuchsia-300">{formatPrice(voiceCost, region)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={50}
                    value={voiceMinutes}
                    onChange={(event) => setVoiceMinutes(Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-fuchsia-400"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Dakika başı ücret: {formatPrice(PRICE_PER_MINUTE_TRY, region)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Aylık Eklentiler</h3>
                <p className="mt-1 text-xs text-slate-400">Bilgi ikonuna gelince detay balonu açılır.</p>
                <div className="mt-3 grid gap-3">
                  {(Object.keys(addonPrices) as AddonKey[]).map((addon) => (
                    <label key={addon} className="group relative flex items-center justify-between rounded-xl border border-white/15 bg-black/30 p-3">
                      <span className="flex items-center gap-2">
                        <span>
                          {regionalAddonPrices[addon].label}
                          <span className="ml-2 text-xs text-fuchsia-300">+{formatPrice(regionalAddonPrices[addon].price, region)}</span>
                        </span>
                        <span className="group/info relative inline-flex items-center">
                          <Info
                            size={15}
                            className="cursor-help text-fuchsia-200"
                            tabIndex={0}
                            aria-label={`${regionalAddonPrices[addon].label} detayı`}
                          />
                          <span className="pointer-events-none invisible absolute left-1/2 top-6 z-30 w-72 -translate-x-1/2 rounded-xl border border-fuchsia-300/40 bg-[#120c1d] p-3 text-xs text-fuchsia-100 opacity-0 shadow-[0_0_20px_rgba(217,70,239,0.35)] transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within/info:visible group-focus-within/info:opacity-100">
                            {regionalAddonPrices[addon].tooltip}
                            {regionalAddonPrices[addon].smartTooltip && (
                              <span className="mt-2 block border-t border-fuchsia-300/20 pt-2 text-fuchsia-200">
                                {regionalAddonPrices[addon].smartTooltip}
                              </span>
                            )}
                          </span>
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        checked={addons[addon]}
                        onChange={() => setAddons((prev) => ({ ...prev, [addon]: !prev[addon] }))}
                        className="h-5 w-5 accent-fuchsia-400"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-emerald-300/30 bg-slate-950/80 p-5 backdrop-blur-xl lg:sticky lg:top-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Canlı Teklif</p>
              <p className="mt-2 text-sm text-slate-300">Seçimlerinize göre toplam fiyat anlık güncellenir.</p>

              <div className="mt-6 space-y-2 text-sm text-slate-200">
                <div className="flex justify-between">
                  <span>Temel Kurulum</span>
                  <span>{formatPrice(regionalBasePrice, region)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sesli Asistan (Telefon)</span>
                  <span>{formatPrice(voiceCost, region)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-white/15 pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Toplam</p>
                <p
                  className={`mt-2 text-3xl font-black text-emerald-300 transition ${
                    isTotalAnimating ? 'scale-105 drop-shadow-[0_0_16px_rgba(52,211,153,0.75)]' : 'scale-100'
                  }`}
                >
                  {formatPrice(total, region)}
                </p>
                <p className="mt-1 text-xs text-emerald-100/80">Aylık ödeme tutarıdır.</p>
              </div>

              <a
                href={createWhatsAppLink(customMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-300"
              >
                <MessageCircle size={16} /> Teklifi WhatsApp'ta Gönder ({WHATSAPP_LABEL})
              </a>
            </aside>
          </section>
        )}

        {activeTab === 'enterprise' && (
          <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/40 bg-white/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.28)] backdrop-blur-2xl md:p-10">
            <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />

            <div className="relative max-w-4xl">
              <p className="inline-flex rounded-full border border-amber-200/60 bg-amber-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                Premium Çözüm
              </p>
              <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">Standartların Dışında Mısınız?</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
                Fabrikalar, Zincir İşletmeler ve Özel Projeler için terzi usulü çözümler üretiyoruz. İhtiyaçlarınızı analist
                ekibimizle değerlendirelim.
              </p>

              <ul className="mt-8 grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                {[
                  'Özel Sunucu & Veri Güvenliği (On-Premise)',
                  'Sınırsız Entegrasyon (SAP, Nebim, Logo vb.)',
                  '7/24 Öncelikli Teknik Destek',
                  'Size Özel Yapay Zeka Eğitimi',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 rounded-xl border border-white/20 bg-black/25 p-3">
                    <Check size={16} className="mt-0.5 text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={createWhatsAppLink('Merhaba, kurumsal/özel bir proje için görüşmek istiyorum.')}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-fuchsia-300 px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:scale-[1.02]"
              >
                <MessageCircle size={16} /> Proje Danışmanıyla Görüş (WhatsApp)
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
