import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Building2,
  Globe2,
  GraduationCap,
  Scale,
  Scissors,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
} from 'lucide-react';

type SectorId =
  | 'health'
  | 'restaurant'
  | 'estate'
  | 'export'
  | 'beauty'
  | 'ecommerce'
  | 'education'
  | 'law'
  | 'other';

type SliderConfig = {
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  suffix: string;
};

type SectorConfig = {
  id: SectorId;
  title: string;
  emoji: string;
  icon: LucideIcon;
  sliders: SliderConfig[];
  explanation: (values: Record<string, number>) => string;
  calculate: (values: Record<string, number>) => number;
  breakdown: (values: Record<string, number>) => string[];
  packageName: string;
  packagePrice: number;
};

const sectorConfigs: SectorConfig[] = [
  {
    id: 'health',
    title: 'Klinik & Sağlık',
    emoji: '🩺',
    icon: Stethoscope,
    sliders: [
      { key: 'dailyCalls', label: 'Günlük Kaçırılan Çağrı', min: 1, max: 50, suffix: ' adet' },
      { key: 'patientValue', label: 'Ortalama Hasta Değeri (TL)', min: 500, max: 50000, step: 500, suffix: ' TL' },
    ],
    calculate: (v) => v.dailyCalls * 30 * 0.2 * v.patientValue,
    breakdown: (v) => [
      `${v.dailyCalls} (Günlük Kaçırılan Çağrı)`,
      '30 (Gün)',
      '%20 (Dönüşüm)',
      `${formatMoney(v.patientValue)} TL (Ortalama Hasta Değeri)`,
    ],
    explanation: (v) =>
      `Günde ${v.dailyCalls} çağrı kaçırmak, ayda ${v.dailyCalls * 30} potansiyel hasta kaybı demektir. Ortalama %20 dönüşüm oranı ile hesaplanmıştır.`,
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'restaurant',
    title: 'Restoran & Cafe',
    emoji: '🍕',
    icon: UtensilsCrossed,
    sliders: [
      { key: 'dailyOrders', label: 'Günlük Paket Sipariş (Adet)', min: 10, max: 500, suffix: ' adet' },
      { key: 'basketValue', label: 'Ortalama Sepet Tutarı (TL)', min: 100, max: 2000, step: 10, suffix: ' TL' },
      { key: 'commission', label: 'Platform Komisyonu (%)', min: 10, max: 38, suffix: ' %' },
    ],
    calculate: (v) => v.dailyOrders * v.basketValue * 30 * (v.commission / 100),
    breakdown: (v) => [
      `${v.dailyOrders} (Günlük Sipariş)`,
      `${formatMoney(v.basketValue)} TL (Sepet)`,
      '30 (Gün)',
      `%${v.commission} (Komisyon)`,
    ],
    explanation: () => 'Online yemek platformlarına her ay ödediğiniz komisyon tutarıdır.',
    packageName: 'Restaurant Package',
    packagePrice: 16999,
  },
  {
    id: 'estate',
    title: 'Emlak & Gayrimenkul',
    emoji: '🏠',
    icon: Building2,
    sliders: [
      { key: 'monthlyLeads', label: 'Aylık Kaçırılan Potansiyel Müşteri', min: 1, max: 100, suffix: ' kişi' },
      {
        key: 'estateCommission',
        label: 'Ortalama Satış/Kira Komisyonu (TL)',
        min: 10000,
        max: 200000,
        step: 1000,
        suffix: ' TL',
      },
    ],
    calculate: (v) => v.monthlyLeads * 0.05 * v.estateCommission,
    breakdown: (v) => [
      `${v.monthlyLeads} (Aylık Kaçırılan Müşteri)`,
      '%5 (Satışa Dönüşüm)',
      `${formatMoney(v.estateCommission)} TL (Komisyon)`,
    ],
    explanation: () => 'Yoğunluktan dönemediğiniz müşterilerin %5\'inin satışa döneceği varsayılmıştır.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'export',
    title: 'İhracat & Üretim',
    emoji: '🌍',
    icon: Globe2,
    sliders: [
      { key: 'staffCount', label: 'Yabancı Dil Bilen Personel İhtiyacı', min: 1, max: 10, suffix: ' kişi' },
      { key: 'staffCost', label: 'Personel Başı Aylık Maliyet ($)', min: 1000, max: 5000, step: 100, suffix: ' $' },
    ],
    calculate: (v) => v.staffCount * v.staffCost * 34,
    breakdown: (v) => [
      `${v.staffCount} (Personel)`,
      `${formatMoney(v.staffCost)} $ (Kişi Başı Maliyet)`,
      '34 (Sabit Kur TL)',
    ],
    explanation: () => '7/24 çalışacak bir AI yerine, vardiyalı personel çalıştırmanın aylık maliyetidir.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'beauty',
    title: 'Güzellik & Bakım',
    emoji: '💇‍♀️',
    icon: Scissors,
    sliders: [
      { key: 'emptySlots', label: 'Günlük Boş Kalan Koltuk/Randevu', min: 1, max: 20, suffix: ' adet' },
      { key: 'serviceValue', label: 'Ortalama İşlem Ücreti (TL)', min: 200, max: 5000, step: 50, suffix: ' TL' },
    ],
    calculate: (v) => v.emptySlots * v.serviceValue * 26,
    breakdown: (v) => [
      `${v.emptySlots} (Günlük Boş Randevu)`,
      `${formatMoney(v.serviceValue)} TL (İşlem Ücreti)`,
      '26 (Çalışma Günü)',
    ],
    explanation: () => 'Randevu hatırlatma yapılmadığı için gelmeyen veya boş geçen saatlerin maliyetidir.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'ecommerce',
    title: 'E-Ticaret',
    emoji: '🛍️',
    icon: ShoppingBag,
    sliders: [
      { key: 'tickets', label: 'Günlük Canlı Destek Talebi', min: 10, max: 500, suffix: ' adet' },
      {
        key: 'costPerTicket',
        label: 'Talep Başına Personel Maliyeti (Tahmini TL)',
        min: 5,
        max: 50,
        suffix: ' TL',
      },
    ],
    calculate: (v) => v.tickets * v.costPerTicket * 30,
    breakdown: (v) => [
      `${v.tickets} (Günlük Talep)`,
      `${formatMoney(v.costPerTicket)} TL (Talep Başı Maliyet)`,
      '30 (Gün)',
    ],
    explanation: () => 'Müşteri sorularını manuel yanıtlamanın operasyonel maliyetidir.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'education',
    title: 'Eğitim & Kurs',
    emoji: '🎓',
    icon: GraduationCap,
    sliders: [
      { key: 'missedLeads', label: 'Aylık Kaçırılan Kayıt Görüşmesi', min: 5, max: 100, suffix: ' adet' },
      {
        key: 'studentValue',
        label: 'Öğrenci Başına Yıllık Kâr (TL)',
        min: 5000,
        max: 100000,
        step: 1000,
        suffix: ' TL',
      },
    ],
    calculate: (v) => v.missedLeads * 0.1 * (v.studentValue / 12),
    breakdown: (v) => [
      `${v.missedLeads} (Aylık Kaçan Görüşme)`,
      '%10 (Dönüşüm)',
      `${formatMoney(v.studentValue)} TL / 12 (Aylıklaştırılmış Yıllık Kâr)`,
    ],
    explanation: () => 'Bilgi alamadığı için kayıttan vazgeçen öğrencilerin aylık ciro etkisi.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'law',
    title: 'Hukuk & Danışmanlık',
    emoji: '⚖️',
    icon: Scale,
    sliders: [
      { key: 'weeklyHours', label: 'Haftalık Gereksiz Telefon Görüşmesi (Saat)', min: 1, max: 40, suffix: ' saat' },
      { key: 'hourlyRate', label: 'Saatlik Danışmanlık Ücretiniz (TL)', min: 1000, max: 10000, step: 100, suffix: ' TL' },
    ],
    calculate: (v) => v.weeklyHours * v.hourlyRate * 4,
    breakdown: (v) => [
      `${v.weeklyHours} saat (Haftalık Görüşme)`,
      `${formatMoney(v.hourlyRate)} TL (Saatlik Ücret)`,
      '4 (Hafta)',
    ],
    explanation: () => 'Bilgi vermek için telefonda harcadığınız vaktin nakit karşılığıdır.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'other',
    title: 'Diğer Sektörler',
    emoji: '✨',
    icon: Sparkles,
    sliders: [
      { key: 'inefficiency', label: 'Operasyonel Verimsizlik (%)', min: 10, max: 50, suffix: ' %' },
      { key: 'turnover', label: 'Aylık Toplam Ciro (TL)', min: 50000, max: 1000000, step: 5000, suffix: ' TL' },
    ],
    calculate: (v) => v.turnover * (v.inefficiency / 100),
    breakdown: (v) => [
      `${formatMoney(v.turnover)} TL (Aylık Ciro)`,
      `%${v.inefficiency} (Verimsizlik Oranı)`,
    ],
    explanation: () => 'Otomasyon eksikliği nedeniyle kaybedilen tahmini ciro payı.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
];

const defaultValues: Record<string, number> = {
  dailyCalls: 8,
  patientValue: 6000,
  dailyOrders: 120,
  basketValue: 350,
  commission: 18,
  monthlyLeads: 20,
  estateCommission: 50000,
  staffCount: 2,
  staffCost: 1800,
  emptySlots: 5,
  serviceValue: 1200,
  tickets: 80,
  costPerTicket: 15,
  missedLeads: 20,
  studentValue: 24000,
  weeklyHours: 10,
  hourlyRate: 3000,
  inefficiency: 20,
  turnover: 250000,
};

const money = new Intl.NumberFormat('tr-TR');

function formatMoney(value: number) {
  return money.format(Math.round(value));
}

export default function Pricing() {
  const [activeSectorId, setActiveSectorId] = useState<SectorId>('health');
  const [values, setValues] = useState<Record<string, number>>(defaultValues);
  const [aiMode, setAiMode] = useState(false);

  const activeSector = useMemo(
    () => sectorConfigs.find((sector) => sector.id === activeSectorId) ?? sectorConfigs[0],
    [activeSectorId],
  );

  const monthlyLoss = useMemo(() => activeSector.calculate(values), [activeSector, values]);
  const monthlyNetGain = Math.max(monthlyLoss - activeSector.packagePrice, 0);

  const handleStartClick = () => {
    window.history.pushState({}, '', '/packages');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className={`min-h-screen px-4 py-10 text-white transition-colors duration-300 ${aiMode ? 'bg-[#03110a]' : 'bg-[#0a0710]'}`}>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            ROI Simulation Engine
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">Şeffaf ROI Hesaplayıcı: Kaybın Nereden Geliyor?</h1>
          <p className="mt-3 max-w-4xl text-slate-300">
            Tüm alanlar açık birimlerle tanımlandı: <strong>Günlük</strong>, <strong>Aylık</strong>, <strong>Adet</strong>, <strong>TL</strong>.
            Aşağıda her sektör için kaybın nasıl hesaplandığını adım adım görebilirsiniz.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Sektörünü seçin</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {sectorConfigs.map((sector) => {
              const Icon = sector.icon;
              const active = activeSectorId === sector.id;

              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? 'border-cyan-300 bg-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.25)]'
                      : 'border-white/15 bg-black/20 hover:border-white/35'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                    <Icon size={16} />
                    <span>{sector.emoji}</span>
                  </div>
                  <div className="text-sm font-semibold leading-snug">{sector.title}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section
          className={`rounded-3xl border p-6 backdrop-blur-xl ${
            aiMode
              ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-700/15 to-slate-900/90'
              : 'border-rose-400/40 bg-gradient-to-br from-rose-700/15 to-slate-900/90'
          }`}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Manuel Sistem vs MGL AI</h3>
              <p className="text-slate-300">Önce manuel kaybınızı görün, sonra AI modunu açıp net kazancı inceleyin.</p>
            </div>
            <button
              type="button"
              onClick={() => setAiMode((prev) => !prev)}
              className={`relative h-14 w-32 rounded-full border-2 transition ${
                aiMode
                  ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.45)]'
                  : 'border-rose-400 bg-rose-500/20 shadow-[0_0_25px_rgba(244,63,94,0.35)]'
              }`}
              aria-label="AI modunu aç/kapat"
            >
              <span
                className={`absolute top-1.5 h-10 w-10 rounded-full transition-all ${
                  aiMode ? 'left-[4.8rem] bg-emerald-300' : 'left-1.5 bg-rose-300'
                }`}
              />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeSector.sliders.map((slider) => (
              <label key={slider.key} className="rounded-2xl border border-white/15 bg-black/30 p-4">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                  <span>{slider.label}</span>
                  <strong className="text-cyan-300">
                    {formatMoney(values[slider.key])}
                    {slider.suffix}
                  </strong>
                </div>
                <input
                  type="range"
                  value={values[slider.key]}
                  min={slider.min}
                  max={slider.max}
                  step={slider.step ?? 1}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      [slider.key]: Number(event.target.value),
                    }))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-400"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/85 p-6 md:p-8">
          <h3 className="mb-4 text-2xl font-bold">Calculation Breakdown (Hesap Dökümü)</h3>

          <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/70 p-5 font-mono text-sm text-slate-200">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Aylık Kayıp Formülü</p>
            <p className="text-base leading-relaxed">
              {activeSector.breakdown(values).join(' × ')}
              <span className="mx-2 text-slate-500">=</span>
              <span className={`${aiMode ? 'text-emerald-300' : 'text-rose-300'} text-2xl font-black`}>
                {aiMode ? `${formatMoney(monthlyNetGain)} TL` : `${formatMoney(monthlyLoss)} TL`}
              </span>
            </p>
          </div>

          <p className="mt-4 text-sm text-slate-300">{activeSector.explanation(values)}</p>
          <p className="mt-2 text-sm font-semibold text-cyan-300">MGL AI Sistemi ile bu kaybı kazanca dönüştürün.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Manuel Sistem Tahmini Aylık Kayıp</p>
              <p className="mt-2 text-3xl font-black text-rose-300">{formatMoney(monthlyLoss)} TL</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">MGL AI Paket Fiyatı</p>
              <p className="mt-2 text-lg font-bold text-emerald-100">{activeSector.packageName}</p>
              <p className="mt-1 text-3xl font-black text-emerald-300">{formatMoney(activeSector.packagePrice)} TL / ay</p>
              {aiMode && (
                <p className="mt-3 text-sm font-semibold text-emerald-100">
                  AI modu açık: Net tasarruf/kazanç ≈ {formatMoney(monthlyNetGain)} TL / ay
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartClick}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-900 transition hover:bg-emerald-300"
          >
            Hemen Başla (Beta Programı) <ArrowRight size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}
