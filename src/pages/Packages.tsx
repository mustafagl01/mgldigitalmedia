import { useEffect, useMemo, useState } from 'react';
import { Check, Info, MessageCircle, Sparkles } from 'lucide-react';

type PackagePlan = {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
};

type TabMode = 'ready' | 'custom' | 'enterprise';

type ChannelKey = 'whatsapp' | 'instagram' | 'web';
type AddonKey = 'automation' | 'marketAnalysis' | 'websitePanel';

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';
const BASE_PRICE = 2999;
const PRICE_PER_MINUTE = 4;

const readyPlans: PackagePlan[] = [
  {
    name: 'İhracat',
    price: 6999,
    features: ['Sesli Yapay Zeka (Asistan) - 300 dk', 'WhatsApp Müşteri Karşılama', 'Pazar & Rakip Analizi'],
  },
  {
    name: 'Sağlık',
    price: 13999,
    features: [
      'Sesli Yapay Zeka (Asistan) - 800 dk',
      'WhatsApp + Instagram Bot Danışma Hattı',
      'İş Süreçleri Otomasyonu',
    ],
    recommended: true,
  },
  {
    name: 'Kurumsal',
    price: 16999,
    features: ['Sesli Yapay Zeka (Asistan) - 1200 dk', 'Pazar & Rakip Analizi', 'Web Sitesi & Panel'],
  },
  {
    name: 'Restoran',
    price: 24999,
    features: ['Sesli Yapay Zeka (Asistan) - 2000 dk', 'İş Süreçleri Otomasyonu', 'Tam Kanal Yönetimi + CRM'],
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
    label: 'İş Süreçleri Otomasyonu',
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

const money = new Intl.NumberFormat('tr-TR');

function formatMoney(value: number) {
  return `${money.format(Math.round(value))} TL`;
}

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Packages() {
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

  const voiceCost = voiceMinutes * PRICE_PER_MINUTE;

  const total = useMemo(() => {
    const channelsTotal = Object.entries(channels).reduce((acc, [key, selected]) => {
      if (!selected) return acc;
      return acc + channelPrices[key as ChannelKey].price;
    }, 0);

    const addonsTotal = Object.entries(addons).reduce((acc, [key, selected]) => {
      if (!selected) return acc;
      return acc + addonPrices[key as AddonKey].price;
    }, 0);

    return BASE_PRICE + channelsTotal + addonsTotal + voiceCost;
  }, [channels, addons, voiceCost]);

  useEffect(() => {
    setIsTotalAnimating(true);
    const timeout = window.setTimeout(() => setIsTotalAnimating(false), 250);
    return () => window.clearTimeout(timeout);
  }, [total]);

  const summaryParts = [
    ...Object.entries(channels)
      .filter(([, selected]) => selected)
      .map(([key]) => channelPrices[key as ChannelKey].label),
    `${voiceMinutes}dk Sesli Yapay Zeka (Asistan)`,
    ...Object.entries(addons)
      .filter(([, selected]) => selected)
      .map(([key]) => addonPrices[key as AddonKey].label),
  ];

  const customMessage = `Kendi Paketim: ${summaryParts.join(' + ')}. Toplam teklif: ${formatMoney(total)}`;

  return (
    <div className="min-h-screen bg-[#05060a] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
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
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {readyPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-3xl border bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/60 ${
                  plan.recommended
                    ? 'border-fuchsia-300/60 shadow-[0_0_30px_rgba(217,70,239,0.35)]'
                    : 'border-white/15'
                }`}
              >
                <span className="absolute -top-3 left-4 z-10 inline-flex max-w-[70%] items-center gap-1 rounded-full border border-emerald-300/70 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-100 sm:max-w-none sm:text-xs">
                  ✅ Kurulum Dahil (0 TL)
                </span>
                {plan.recommended && (
                  <span className="absolute top-8 right-4 z-10 inline-flex max-w-[65%] items-center gap-1 rounded-full border border-fuchsia-300/70 bg-fuchsia-500/20 px-3 py-1 text-[11px] font-bold text-fuchsia-100 sm:top-3 sm:max-w-none sm:text-xs">
                    <Sparkles size={12} /> En Çok Tercih Edilen
                  </span>
                )}
                <h2 className="mt-14 text-xl font-bold sm:mt-4">{plan.name}</h2>
                <p className="mt-2 text-3xl font-black text-cyan-300">{formatMoney(plan.price)}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-cyan-100/80">Aylık ödeme</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-emerald-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={createWhatsAppLink(`Merhaba, ${plan.name} paketi hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-300"
                >
                  <MessageCircle size={16} /> WhatsApp ile Bilgi Al
                </a>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'custom' && (
          <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Temel Kurulum</p>
                <p className="mt-1 text-2xl font-black text-cyan-100">{formatMoney(BASE_PRICE)}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">İletişim Kanalları</h3>
                <p className="mt-1 text-xs text-slate-400">Tüm kanal fiyatları aylık olarak ücretlendirilir.</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(Object.keys(channelPrices) as ChannelKey[]).map((channel) => (
                    <label key={channel} className="flex items-center justify-between rounded-xl border border-white/15 bg-black/30 p-3">
                      <span>
                        {channelPrices[channel].label}
                        <span className="ml-2 text-xs text-cyan-300">+{formatMoney(channelPrices[channel].price)}</span>
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
                <h3 className="text-lg font-semibold">Sesli Yapay Zeka (Asistan) Dakikası</h3>
                <div className="mt-3 rounded-2xl border border-white/15 bg-black/30 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{voiceMinutes} dk</span>
                    <span className="font-bold text-fuchsia-300">{formatMoney(voiceCost)}</span>
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
                  <p className="mt-2 text-xs text-slate-400">Dakika başı ücret: 4 TL</p>
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
                          {addonPrices[addon].label}
                          <span className="ml-2 text-xs text-fuchsia-300">+{formatMoney(addonPrices[addon].price)}</span>
                        </span>
                        <span className="group/info relative inline-flex items-center">
                          <Info
                            size={15}
                            className="cursor-help text-fuchsia-200"
                            tabIndex={0}
                            aria-label={`${addonPrices[addon].label} detayı`}
                          />
                          <span className="pointer-events-none invisible absolute left-1/2 top-6 z-30 w-72 -translate-x-1/2 rounded-xl border border-fuchsia-300/40 bg-[#120c1d] p-3 text-xs text-fuchsia-100 opacity-0 shadow-[0_0_20px_rgba(217,70,239,0.35)] transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within/info:visible group-focus-within/info:opacity-100">
                            {addonPrices[addon].tooltip}
                            {addonPrices[addon].smartTooltip && (
                              <span className="mt-2 block border-t border-fuchsia-300/20 pt-2 text-fuchsia-200">
                                {addonPrices[addon].smartTooltip}
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
                  <span>{formatMoney(BASE_PRICE)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sesli Yapay Zeka (Asistan)</span>
                  <span>{formatMoney(voiceCost)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-white/15 pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Toplam</p>
                <p
                  className={`mt-2 text-3xl font-black text-emerald-300 transition ${
                    isTotalAnimating ? 'scale-105 drop-shadow-[0_0_16px_rgba(52,211,153,0.75)]' : 'scale-100'
                  }`}
                >
                  {formatMoney(total)}
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
