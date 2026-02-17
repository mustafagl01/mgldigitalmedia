import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Globe2, Pizza, Stethoscope, TrendingUp } from 'lucide-react';

type SectorId = 'health' | 'restaurant' | 'estate' | 'export';

type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
};

const sectors: { id: SectorId; label: string; emoji: string; icon: ComponentType<{ size?: number }> }[] = [
  { id: 'health', label: 'Health', emoji: '🏥', icon: Stethoscope },
  { id: 'restaurant', label: 'Restaurant', emoji: '🍕', icon: Pizza },
  { id: 'estate', label: 'Estate', emoji: '🏢', icon: Building2 },
  { id: 'export', label: 'Export', emoji: '🌍', icon: Globe2 },
];

const packageMap: Record<SectorId, { name: string; price: number }> = {
  restaurant: { name: 'Restaurant Package', price: 16999 },
  health: { name: 'Professional Package', price: 13999 },
  estate: { name: 'Professional Package', price: 13999 },
  export: { name: 'Professional Package', price: 13999 },
};

const formatter = new Intl.NumberFormat('tr-TR');

export default function Pricing() {
  const [activeSector, setActiveSector] = useState<SectorId>('restaurant');
  const [switchOn, setSwitchOn] = useState(false);
  const [dailyOrders, setDailyOrders] = useState(55);
  const [avgTicket, setAvgTicket] = useState(420);
  const [commissionRate, setCommissionRate] = useState(18);
  const [missedCalls, setMissedCalls] = useState(14);
  const [avgValue, setAvgValue] = useState(9000);

  const isRestaurant = activeSector === 'restaurant';
  const selectedPackage = packageMap[activeSector];

  const monthlyLoss = useMemo(() => {
    if (isRestaurant) {
      return (dailyOrders * avgTicket * 30 * commissionRate) / 100;
    }

    return missedCalls * avgValue * 0.1 * 30;
  }, [avgTicket, avgValue, commissionRate, dailyOrders, isRestaurant, missedCalls]);

  const netGain = Math.max(monthlyLoss - selectedPackage.price, 0);

  return (
    <div className={`min-h-screen px-4 py-10 text-white transition-colors duration-500 ${switchOn ? 'bg-[#020c07]' : 'bg-[#09040a]'}`}>
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            Stop Paying Fees, Start Owning Data
          </p>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">ROI Calculator & Profit Simulator</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Eski sistemde kaçırdığın gelirleri canlı olarak gör. MGL AI&apos;a geçtiğinde komisyonu kes,
            veriyi sahiplen ve net kazancını büyüt.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold">Sektörünü seç</h2>
          <div className="grid gap-3 md:grid-cols-4">
            {sectors.map((sector) => {
              const Icon = sector.icon;

              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSector(sector.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    activeSector === sector.id
                      ? 'border-cyan-300 bg-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.25)]'
                      : 'border-white/15 bg-black/20 hover:border-white/40'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                    <Icon size={16} /> <span>{sector.emoji}</span>
                  </div>
                  <div className="font-semibold">{sector.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section
          className={`rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${
            switchOn
              ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-700/20 to-slate-900/90'
              : 'border-rose-400/40 bg-gradient-to-br from-rose-700/20 to-slate-900/90'
          }`}
        >
          <h2 className="mb-6 text-2xl font-bold">Pain Simulator</h2>

          {isRestaurant ? (
            <div className="grid gap-4 md:grid-cols-3">
              <SliderField label="Günlük Sipariş" value={dailyOrders} min={10} max={200} onChange={setDailyOrders} suffix=" adet" />
              <SliderField label="Ortalama Sepet" value={avgTicket} min={100} max={1200} onChange={setAvgTicket} suffix=" TL" />
              <SliderField label="Komisyon Oranı" value={commissionRate} min={5} max={40} onChange={setCommissionRate} suffix=" %" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <SliderField label="Kaçan Çağrı" value={missedCalls} min={1} max={80} onChange={setMissedCalls} suffix=" adet" />
              <SliderField label="Ortalama İşlem Değeri" value={avgValue} min={1000} max={50000} step={500} onChange={setAvgValue} suffix=" TL" />
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-6 text-center">
            <p className={`text-sm uppercase tracking-[0.2em] ${switchOn ? 'text-emerald-300' : 'text-rose-300'}`}>
              {switchOn ? 'Aylık Net Tasarruf / Kâr' : isRestaurant ? 'Aylık Komisyon Kaybı' : 'Aylık Fırsat Maliyeti'}
            </p>
            <div className={`mt-2 text-4xl font-black ${switchOn ? 'text-emerald-300' : 'text-rose-300'}`}>
              ₺
              <AnimatedNumber value={switchOn ? netGain : monthlyLoss} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Switch to MGL AI</h3>
              <p className="text-slate-300">Tek tıkla kırmızı kaybı yeşil kazanca çevir.</p>
            </div>
            <button
              onClick={() => setSwitchOn((prev) => !prev)}
              className={`relative h-16 w-36 rounded-full border-2 transition-all ${
                switchOn
                  ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                  : 'border-rose-400 bg-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.4)]'
              }`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className={`absolute top-1.5 h-12 w-12 rounded-full ${switchOn ? 'left-[5.25rem] bg-emerald-300' : 'left-1.5 bg-rose-300'}`}
              />
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-500/40 bg-slate-900/80 p-6 grayscale">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Old Way</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-100">Personel Maliyeti</h3>
            <p className="mt-2 text-slate-400">Manuel takip, vardiya stresi, veri kaybı.</p>
            <div className="mt-6 text-4xl font-black text-slate-300">₺25.000/ay</div>
          </div>

          <div className="rounded-3xl border border-emerald-400/70 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-slate-900 p-6 shadow-[0_0_45px_rgba(16,185,129,0.35)]">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">MGL AI</p>
            <h3 className="mt-3 text-2xl font-bold">Yapay Zeka Asistanı</h3>
            <p className="mt-1 text-emerald-100">{selectedPackage.name}</p>
            <div className="mt-6 text-4xl font-black text-emerald-200">₺{formatter.format(selectedPackage.price)}/ay</div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-900 transition hover:bg-emerald-300">
              Hemen Başla (Beta Programı) <ArrowRight size={18} />
            </button>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-100">
              <TrendingUp size={16} /> Potansiyel fark: ₺{formatter.format(Math.max(25000 - selectedPackage.price, 0))}/ay
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const start = displayValue;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(start + (end - start) * eased);
      setDisplayValue(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{formatter.format(displayValue)}</>;
}

function SliderField({ label, value, onChange, min, max, step = 1, suffix = '' }: SliderFieldProps) {
  return (
    <label className="rounded-2xl border border-white/15 bg-black/30 p-4">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
        <span>{label}</span>
        <span className="font-semibold text-cyan-300">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-400"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
