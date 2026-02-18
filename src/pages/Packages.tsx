import { useEffect, useMemo, useState } from 'react';
import { Check, MessageCircle, Sparkles } from 'lucide-react';

type PackagePlan = {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
};

type TabMode = 'ready' | 'custom';

type ChannelKey = 'whatsapp' | 'instagram' | 'web';
type AddonKey = 'trendyol' | 'calendar' | 'crm' | 'woocommerce';

const WHATSAPP_NUMBER = '905318299701';
const BASE_PRICE = 2999;
const PRICE_PER_MINUTE = 4;

const readyPlans: PackagePlan[] = [
  {
    name: 'Essentials',
    price: 6999,
    features: ['Voice AI (300 dk)', 'WhatsApp Bot'],
  },
  {
    name: 'Professional',
    price: 13999,
    features: ['Voice AI (800 dk)', 'WhatsApp + Instagram', 'CRM Entegrasyonu'],
    recommended: true,
  },
  {
    name: 'Restaurant',
    price: 16999,
    features: ['Voice AI (1200 dk)', 'Trendyol Entegrasyonu', 'QR Menü'],
  },
  {
    name: 'Business',
    price: 24999,
    features: ['Voice AI (2000 dk)', 'Full Suite (Tüm Kanallar + CRM + Otomasyonlar)'],
  },
];

const channelPrices: Record<ChannelKey, { label: string; price: number }> = {
  whatsapp: { label: 'WhatsApp', price: 1999 },
  instagram: { label: 'Instagram', price: 1499 },
  web: { label: 'Web Chat', price: 999 },
};

const addonPrices: Record<AddonKey, { label: string; price: number }> = {
  trendyol: { label: 'Trendyol Entegrasyonu', price: 1499 },
  calendar: { label: 'Google Calendar', price: 799 },
  crm: { label: 'CRM', price: 999 },
  woocommerce: { label: 'WooCommerce', price: 1999 },
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
    trendyol: false,
    calendar: false,
    crm: true,
    woocommerce: false,
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
    `${voiceMinutes}dk Voice AI`,
    ...Object.entries(addons)
      .filter(([, selected]) => selected)
      .map(([key]) => addonPrices[key as AddonKey].label),
  ];

  const customMessage = `Özel Paket: ${summaryParts.join(' + ')}. Fiyat: ${formatMoney(total)}`;

  return (
    <div className="min-h-screen bg-[#05060a] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:p-8">
          <p className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200">
            Paket Merkezi
          </p>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">Hazır Paketler & Kendi Paketini Yap</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            İhtiyacınıza göre hazır planlardan birini seçin veya canlı fiyatlanan özel paketinizi oluşturun.
          </p>

          <div className="mt-6 inline-flex rounded-2xl border border-white/15 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('ready')}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                activeTab === 'ready'
                  ? 'bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.45)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Hazır Paketler
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
              Kendi Paketini Yap
            </button>
          </div>
        </section>

        {activeTab === 'ready' ? (
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
                {plan.recommended && (
                  <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full border border-fuchsia-300/70 bg-fuchsia-500/20 px-3 py-1 text-xs font-bold text-fuchsia-100">
                    <Sparkles size={12} /> Recommended
                  </span>
                )}
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="mt-2 text-3xl font-black text-cyan-300">{formatMoney(plan.price)}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-emerald-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={createWhatsAppLink(`Merhaba, ${plan.name} hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-300"
                >
                  <MessageCircle size={16} /> WhatsApp ile Bilgi Al
                </a>
              </article>
            ))}
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Sabit Kurulum</p>
                <p className="mt-1 text-2xl font-black text-cyan-100">{formatMoney(BASE_PRICE)}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Kanallar</h3>
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
                <h3 className="text-lg font-semibold">Voice AI Dakikası</h3>
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
                  <p className="mt-2 text-xs text-slate-400">Fiyat: dakika × 4 TL</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Ek Özellikler</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(Object.keys(addonPrices) as AddonKey[]).map((addon) => (
                    <label key={addon} className="flex items-center justify-between rounded-xl border border-white/15 bg-black/30 p-3">
                      <span>
                        {addonPrices[addon].label}
                        <span className="ml-2 text-xs text-fuchsia-300">+{formatMoney(addonPrices[addon].price)}</span>
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
                <div className="flex justify-between"><span>Kurulum</span><span>{formatMoney(BASE_PRICE)}</span></div>
                <div className="flex justify-between"><span>Voice AI</span><span>{formatMoney(voiceCost)}</span></div>
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
              </div>

              <a
                href={createWhatsAppLink(customMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-300"
              >
                <MessageCircle size={16} /> Teklifi WhatsApp'ta Gönder
              </a>
            </aside>
          </section>
        )}
      </div>
    </div>
  );
}
