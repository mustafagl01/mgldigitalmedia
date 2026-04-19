import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Globe2,
  GraduationCap,
  Home,
  Scale,
  Scissors,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';

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
  labelTR: string;
  labelEN: string;
  min: number;
  max: number;
  step?: number;
  suffixTR: string;
  suffixEN: string;
};

type SectorConfig = {
  id: SectorId;
  titleTR: string;
  titleEN: string;
  emoji: string;
  icon: LucideIcon;
  sliders: SliderConfig[];
  explanationTR: (values: Record<string, number>) => string;
  explanationEN: (values: Record<string, number>) => string;
  calculate: (values: Record<string, number>) => number;
  breakdownTR: (values: Record<string, number>) => string[];
  breakdownEN: (values: Record<string, number>) => string[];
  packageName: string;
  packagePrice: number;
};

const sectorConfigs: SectorConfig[] = [
  {
    id: 'health',
    titleTR: 'Klinik & Sağlık',
    titleEN: 'Clinic & Healthcare',
    emoji: '🩺',
    icon: Stethoscope,
    sliders: [
      {
        key: 'dailyCalls',
        labelTR: 'Günlük Kaçırılan Çağrı',
        labelEN: 'Daily Missed Calls',
        min: 1,
        max: 50,
        suffixTR: ' adet',
        suffixEN: ' calls'
      },
      {
        key: 'patientValue',
        labelTR: 'Ortalama Hasta Değeri',
        labelEN: 'Avg. Patient Value',
        min: 500,
        max: 50000,
        step: 500,
        suffixTR: ' TL',
        suffixEN: ' £'
      },
    ],
    calculate: (v) => v.dailyCalls * 30 * 0.2 * v.patientValue,
    breakdownTR: (v) => [
      `${v.dailyCalls} (Günlük Kaçırılan Çağrı)`,
      '30 (Gün)',
      '%20 (Dönüşüm)',
      `${formatMoney(v.patientValue)} TL (Ortalama Hasta Değeri)`,
    ],
    breakdownEN: (v) => [
      `${v.dailyCalls} (Daily Missed Calls)`,
      '30 (Days)',
      '20% (Conversion)',
      `£${formatMoney(v.patientValue)} (Avg. Patient Value)`,
    ],
    explanationTR: (v) =>
      `Günde ${v.dailyCalls} çağrı kaçırmak, ayda ${v.dailyCalls * 30} potansiyel hasta kaybı demektir. Ortalama %20 dönüşüm oranı ile hesaplanmıştır.`,
    explanationEN: (v) =>
      `Missing ${v.dailyCalls} calls daily means ${v.dailyCalls * 30} potential patients lost per month. Calculated with an average 20% conversion rate.`,
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'restaurant',
    titleTR: 'Restoran & Cafe',
    titleEN: 'Restaurant & Cafe',
    emoji: '🍕',
    icon: UtensilsCrossed,
    sliders: [
      {
        key: 'dailyOrders',
        labelTR: 'Günlük Paket Sipariş',
        labelEN: 'Daily Delivery Orders',
        min: 1,
        max: 500,
        suffixTR: ' adet',
        suffixEN: ' orders'
      },
      {
        key: 'basketValue',
        labelTR: 'Ortalama Sepet Tutarı',
        labelEN: 'Avg. Basket Value',
        min: 1,
        max: 2000,
        step: 1,
        suffixTR: ' TL',
        suffixEN: '£'
      },
      {
        key: 'commission',
        labelTR: 'Platform Komisyonu',
        labelEN: 'Platform Commission',
        min: 1,
        max: 30,
        suffixTR: ' %',
        suffixEN: '%'
      },
    ],
    calculate: (v) => v.dailyOrders * v.basketValue * 30 * (v.commission / 100),
    breakdownTR: (v) => [
      `${v.dailyOrders} (Günlük Sipariş)`,
      `${formatMoney(v.basketValue)} TL (Sepet)`,
      '30 (Gün)',
      `%${v.commission} (Komisyon)`,
    ],
    breakdownEN: (v) => [
      `${v.dailyOrders} (Daily Orders)`,
      `£${formatMoney(v.basketValue)} (Basket)`,
      '30 (Days)',
      `${v.commission}% (Commission)`,
    ],
    explanationTR: () => 'Online yemek platformlarına her ay ödediğiniz komisyon tutarıdır.',
    explanationEN: () => 'The commission amount you pay to food delivery platforms every month.',
    packageName: 'Restaurant Package',
    packagePrice: 16999,
  },
  {
    id: 'estate',
    titleTR: 'Emlak & Gayrimenkul',
    titleEN: 'Real Estate',
    emoji: '🏠',
    icon: Building2,
    sliders: [
      {
        key: 'monthlyLeads',
        labelTR: 'Aylık Kaçırılan Potansiyel Müşteri',
        labelEN: 'Monthly Missed Leads',
        min: 1,
        max: 100,
        suffixTR: ' kişi',
        suffixEN: ' leads'
      },
      {
        key: 'estateCommission',
        labelTR: 'Ortalama Satış/Kira Komisyonu',
        labelEN: 'Avg. Sale/Rent Commission',
        min: 10000,
        max: 200000,
        step: 1000,
        suffixTR: ' TL',
        suffixEN: '',
      },
    ],
    calculate: (v) => v.monthlyLeads * 0.05 * v.estateCommission,
    breakdownTR: (v) => [
      `${v.monthlyLeads} (Aylık Kaçırılan Müşteri)`,
      '%5 (Satışa Dönüşüm)',
      `${formatMoney(v.estateCommission)} TL (Komisyon)`,
    ],
    breakdownEN: (v) => [
      `${v.monthlyLeads} (Monthly Missed Leads)`,
      '5% (Conversion to Sale)',
      `${formatMoney(v.estateCommission)} (Commission)`,
    ],
    explanationTR: () => 'Yoğunluktan dönemediğiniz müşterilerin %5\'inin satışa döneceği varsayılmıştır.',
    explanationEN: () => 'It is assumed that 5% of customers you couldn\'t respond to due to busyness will convert to sales.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'export',
    titleTR: 'İhracat & Üretim',
    titleEN: 'Export & Manufacturing',
    emoji: '🌍',
    icon: Globe2,
    sliders: [
      {
        key: 'staffCount',
        labelTR: 'Yabancı Dil Bilen Personel İhtiyacı',
        labelEN: 'Foreign Language Staff Needed',
        min: 1,
        max: 10,
        suffixTR: ' kişi',
        suffixEN: ' staff'
      },
      {
        key: 'staffCost',
        labelTR: 'Personel Başı Aylık Maliyet',
        labelEN: 'Monthly Cost Per Staff',
        min: 1000,
        max: 5000,
        step: 100,
        suffixTR: ' $',
        suffixEN: ''
      },
    ],
    calculate: (v) => v.staffCount * v.staffCost * 34,
    breakdownTR: (v) => [
      `${v.staffCount} (Personel)`,
      `${formatMoney(v.staffCost)} $ (Kişi Başı Maliyet)`,
      '34 (Sabit Kur TL)',
    ],
    breakdownEN: (v) => [
      `${v.staffCount} (Staff)`,
      `$${formatMoney(v.staffCost)} (Cost Per Person)`,
      '34 (Fixed TRY Rate)',
    ],
    explanationTR: () => '7/24 çalışacak bir Yapay Zeka Asistanı yerine, vardiyalı personel çalıştırmanın aylık maliyetidir.',
    explanationEN: () => 'The monthly cost of employing shift staff instead of an AI Assistant that works 24/7.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'beauty',
    titleTR: 'Güzellik & Bakım',
    titleEN: 'Beauty & Care',
    emoji: '💇‍♀️',
    icon: Scissors,
    sliders: [
      {
        key: 'emptySlots',
        labelTR: 'Günlük Boş Kalan Koltuk/Randevu',
        labelEN: 'Daily Empty Slots/Appointments',
        min: 1,
        max: 20,
        suffixTR: ' adet',
        suffixEN: ' slots'
      },
      {
        key: 'serviceValue',
        labelTR: 'Ortalama İşlem Ücreti',
        labelEN: 'Avg. Service Fee',
        min: 200,
        max: 5000,
        step: 50,
        suffixTR: ' TL',
        suffixEN: ''
      },
    ],
    calculate: (v) => v.emptySlots * v.serviceValue * 26,
    breakdownTR: (v) => [
      `${v.emptySlots} (Günlük Boş Randevu)`,
      `${formatMoney(v.serviceValue)} TL (İşlem Ücreti)`,
      '26 (Çalışma Günü)',
    ],
    breakdownEN: (v) => [
      `${v.emptySlots} (Daily Empty Appointments)`,
      `${formatMoney(v.serviceValue)} (Service Fee)`,
      '26 (Working Days)',
    ],
    explanationTR: () => 'Randevu hatırlatma yapılmadığı için gelmeyen veya boş geçen saatlerin maliyetidir.',
    explanationEN: () => 'The cost of no-shows or empty hours due to lack of appointment reminders.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'ecommerce',
    titleTR: 'E-Ticaret',
    titleEN: 'E-Commerce',
    emoji: '🛍️',
    icon: ShoppingBag,
    sliders: [
      {
        key: 'tickets',
        labelTR: 'Günlük Canlı Destek Talebi',
        labelEN: 'Daily Support Requests',
        min: 10,
        max: 500,
        suffixTR: ' adet',
        suffixEN: ' tickets'
      },
      {
        key: 'costPerTicket',
        labelTR: 'Talep Başına Personel Maliyeti (Tahmini)',
        labelEN: 'Staff Cost Per Request (Est.)',
        min: 5,
        max: 50,
        suffixTR: ' TL',
        suffixEN: '',
      },
    ],
    calculate: (v) => v.tickets * v.costPerTicket * 30,
    breakdownTR: (v) => [
      `${v.tickets} (Günlük Talep)`,
      `${formatMoney(v.costPerTicket)} TL (Talep Başı Maliyet)`,
      '30 (Gün)',
    ],
    breakdownEN: (v) => [
      `${v.tickets} (Daily Requests)`,
      `${formatMoney(v.costPerTicket)} (Cost Per Request)`,
      '30 (Days)',
    ],
    explanationTR: () => 'Müşteri sorularını manuel yanıtlamanın operasyonel maliyetidir.',
    explanationEN: () => 'The operational cost of manually responding to customer inquiries.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'education',
    titleTR: 'Eğitim & Kurs',
    titleEN: 'Education & Courses',
    emoji: '🎓',
    icon: GraduationCap,
    sliders: [
      {
        key: 'missedLeads',
        labelTR: 'Aylık Kaçırılan Kayıt Görüşmesi',
        labelEN: 'Monthly Missed Registration Calls',
        min: 5,
        max: 100,
        suffixTR: ' adet',
        suffixEN: ' calls'
      },
      {
        key: 'studentValue',
        labelTR: 'Öğrenci Başına Yıllık Kâr',
        labelEN: 'Annual Profit Per Student',
        min: 5000,
        max: 100000,
        step: 1000,
        suffixTR: ' TL',
        suffixEN: '',
      },
    ],
    calculate: (v) => v.missedLeads * 0.1 * (v.studentValue / 12),
    breakdownTR: (v) => [
      `${v.missedLeads} (Aylık Kaçan Görüşme)`,
      '%10 (Dönüşüm)',
      `${formatMoney(v.studentValue)} TL / 12 (Aylıklaştırılmış Yıllık Kâr)`,
    ],
    breakdownEN: (v) => [
      `${v.missedLeads} (Monthly Missed Calls)`,
      '10% (Conversion)',
      `${formatMoney(v.studentValue)} / 12 (Monthly Annual Profit)`,
    ],
    explanationTR: () => 'Bilgi alamadığı için kayıttan vazgeçen öğrencilerin aylık ciro etkisi.',
    explanationEN: () => 'The monthly revenue impact of students who give up on registration because they couldn\'t get information.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'law',
    titleTR: 'Hukuk & Danışmanlık',
    titleEN: 'Law & Consulting',
    emoji: '⚖️',
    icon: Scale,
    sliders: [
      {
        key: 'weeklyHours',
        labelTR: 'Haftalık Gereksiz Telefon Görüşmesi',
        labelEN: 'Weekly Unnecessary Phone Calls',
        min: 1,
        max: 40,
        suffixTR: ' saat',
        suffixEN: ' hours'
      },
      {
        key: 'hourlyRate',
        labelTR: 'Saatlik Danışmanlık Ücretiniz',
        labelEN: 'Your Hourly Consulting Rate',
        min: 1000,
        max: 10000,
        step: 100,
        suffixTR: ' TL',
        suffixEN: ''
      },
    ],
    calculate: (v) => v.weeklyHours * v.hourlyRate * 4,
    breakdownTR: (v) => [
      `${v.weeklyHours} saat (Haftalık Görüşme)`,
      `${formatMoney(v.hourlyRate)} TL (Saatlik Ücret)`,
      '4 (Hafta)',
    ],
    breakdownEN: (v) => [
      `${v.weeklyHours} hours (Weekly Calls)`,
      `${formatMoney(v.hourlyRate)} (Hourly Rate)`,
      '4 (Weeks)',
    ],
    explanationTR: () => 'Bilgi vermek için telefonda harcadığınız vaktin nakit karşılığıdır.',
    explanationEN: () => 'The cash equivalent of the time you spend on the phone providing information.',
    packageName: 'Professional Package',
    packagePrice: 13999,
  },
  {
    id: 'other',
    titleTR: 'Diğer Sektörler',
    titleEN: 'Other Sectors',
    emoji: '✨',
    icon: Sparkles,
    sliders: [
      {
        key: 'inefficiency',
        labelTR: 'Operasyonel Verimsizlik',
        labelEN: 'Operational Inefficiency',
        min: 10,
        max: 50,
        suffixTR: ' %',
        suffixEN: '%'
      },
      {
        key: 'turnover',
        labelTR: 'Aylık Toplam Ciro',
        labelEN: 'Monthly Total Revenue',
        min: 50000,
        max: 1000000,
        step: 5000,
        suffixTR: ' TL',
        suffixEN: ''
      },
    ],
    calculate: (v) => v.turnover * (v.inefficiency / 100),
    breakdownTR: (v) => [
      `${formatMoney(v.turnover)} TL (Aylık Ciro)`,
      `%${v.inefficiency} (Verimsizlik Oranı)`,
    ],
    breakdownEN: (v) => [
      `${formatMoney(v.turnover)} (Monthly Revenue)`,
      `${v.inefficiency}% (Inefficiency Rate)`,
    ],
    explanationTR: () => 'Otomatik İşlemler eksikliği nedeniyle kaybedilen tahmini ciro payı.',
    explanationEN: () => 'Estimated revenue share lost due to lack of automated processes.',
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

function getRecommendedPackage(monthlyLoss: number, region: 'TR' | 'GB') {
  // Regional thresholds based on package prices
  const starterThreshold = region === 'TR' ? 10000 : 250;
  const proThreshold = region === 'TR' ? 25000 : 625;

  if (monthlyLoss < starterThreshold) {
    return {
      name: region === 'TR' ? 'Başlangıç (Starter) Paketi' : 'Starter Package',
      message: region === 'TR' ? 'Küçük kayıpları önlemek için ideal başlangıç.' : 'Ideal starting point to prevent small losses.',
    };
  }

  if (monthlyLoss <= proThreshold) {
    return {
      name: region === 'TR' ? 'Profesyonel (Pro) Paketi' : 'Pro Package',
      message: region === 'TR' ? 'Bu kaybı önlemek için en popüler çözümümüz.' : 'Our most popular solution to prevent this loss.',
    };
  }

  return {
    name: region === 'TR' ? 'Premium (Business) Paketi' : 'Business Package',
    message: region === 'TR' ? 'Büyük operasyonel kayıplar için tam otomasyon şart.' : 'Full automation required for large operational losses.',
  };
}

export default function Pricing() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isTR = region === 'TR';

  const employeeCost = isTR ? 40000 : 2200;
  const aiAssistantCost = pricing.packages.pro.price;
  const currencyCode = pricing.currency.code;
  const currencyLocale = pricing.currency.locale;

  // Loss formulas are calculated directly from visible slider values.
  const convertToRegionalCurrency = (value: number) => value;

  const formatRegionalMoney = (value: number) =>
    new Intl.NumberFormat(currencyLocale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  const [activeSectorId, setActiveSectorId] = useState<SectorId>('health');
  const [values, setValues] = useState<Record<string, number>>(() => ({
  ...defaultValues,
  basketValue: isTR ? 350 : 100,
}));
  const [aiMode, setAiMode] = useState(false);

  const activeSector = useMemo(
    () => sectorConfigs.find((sector) => sector.id === activeSectorId) ?? sectorConfigs[0],
    [activeSectorId],
  );

  const monthlyLoss = useMemo(() => activeSector.calculate(values), [activeSector, values]);
  const monthlyNetGain = Math.max(monthlyLoss - activeSector.packagePrice, 0);
  const regionalMonthlyLoss = convertToRegionalCurrency(monthlyLoss);
  const recommendedPackage = useMemo(() => getRecommendedPackage(regionalMonthlyLoss, region), [regionalMonthlyLoss, region]);

  // Helper function to get the right label based on region
  const getSliderLabel = (slider: SliderConfig) => isTR ? slider.labelTR : slider.labelEN;
  const getSliderSuffix = (slider: SliderConfig) => isTR ? slider.suffixTR : slider.suffixEN;
  const getSectorTitle = (sector: SectorConfig) => isTR ? sector.titleTR : sector.titleEN;
  const getExplanation = (sector: SectorConfig) => isTR ? sector.explanationTR(values) : sector.explanationEN(values);
  const getBreakdown = (sector: SectorConfig) => isTR ? sector.breakdownTR(values) : sector.breakdownEN(values);

  const seoTitle = isTR
    ? 'ROI Hesaplayıcı — Kaybın Nereden Geliyor? | MGL Digital Media'
    : 'ROI Calculator — Where Is Your Loss Coming From? | MGL Digital Media';
  const seoDescription = isTR
    ? 'Sektöre göre kayıp hesaplayıcı. 9 sektör, canlı simülasyon. 1 çalışan maliyetine 3 AI asistan.'
    : 'Sector-based loss calculator. 9 sectors, live simulation. 3 AI assistants for the cost of 1 employee.';
  const breadcrumb = breadcrumbSchema([
    { name: isTR ? 'Ana Sayfa' : 'Home', path: '/' },
    { name: isTR ? 'ROI Hesaplayıcı' : 'ROI Calculator', path: '/pricing' },
  ]);

  return (
    <div className={`min-h-screen px-4 py-10 text-white transition-colors duration-300 ${aiMode ? 'bg-[#03110a]' : 'bg-[#0a0710]'}`}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/pricing"
        locale={isTR ? 'tr_TR' : 'en_GB'}
        keywords={isTR ? ['ROI hesaplayıcı', 'kayıp hesabı', 'KOBİ otomasyon ROI'] : ['ROI calculator', 'SME automation ROI', 'loss calculator']}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Back to Home Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <Home size={18} />
          <span>{isTR ? 'Ana Sayfa' : 'Home'}</span>
        </button>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            ROI Simulation Engine
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            {isTR ? 'Şeffaf ROI Hesaplayıcı: Kaybın Nereden Geliyor?' : 'Transparent ROI Calculator: Where Is Your Loss Coming From?'}
          </h1>
          <p className="mt-3 inline-flex rounded-xl border border-amber-300/70 bg-amber-300 px-3 py-1.5 text-sm font-black text-slate-950 shadow-[0_0_24px_rgba(252,211,77,0.5)]">
            {isTR ? 'Bir çalışan maliyetine, 3 yapay zeka asistanı.' : 'For the cost of 1 employee, get 3 AI assistants.'}
          </p>
          <p className="mt-3 max-w-4xl text-slate-300">
            {isTR
              ? 'Tüm alanlar açık birimlerle tanımlandı: Günlük, Aylık, Adet. Aşağıda her sektör için kaybın nasıl hesaplandığını adım adım görebilirsiniz.'
              : 'All fields are defined with clear units: Daily, Monthly, Count. Below you can see step by step how the loss is calculated for each sector.'}
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
          <h2 className="mb-4 text-lg font-semibold">
            {isTR ? 'Sektörünü seçin' : 'Select your sector'}
          </h2>
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
                  <div className="text-sm font-semibold leading-snug">{getSectorTitle(sector)}</div>
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
              <h3 className="text-2xl font-bold">
                {isTR ? 'Manuel Sistem vs MGL Yapay Zeka Asistanı' : 'Manual System vs MGL AI Assistant'}
              </h3>
              <p className="text-slate-300">
                {isTR
                  ? 'Önce manuel kaybınızı görün, sonra Yapay Zeka Asistanı modunu açıp net kazancı inceleyin.'
                  : 'First see your manual loss, then turn on AI Assistant mode to examine net gain.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAiMode((prev) => !prev)}
              className={`relative h-14 w-32 rounded-full border-2 transition ${
                aiMode
                  ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.45)]'
                  : 'border-rose-400 bg-rose-500/20 shadow-[0_0_25px_rgba(244,63,94,0.35)]'
              }`}
              aria-label={isTR ? 'Yapay Zeka Asistanı modunu aç/kapat' : 'Toggle AI Assistant mode'}
            >
              <span
                className={`absolute top-1.5 h-10 w-10 rounded-full transition-all ${
                  aiMode ? 'left-[4.8rem] bg-emerald-300' : 'left-1.5 bg-rose-300'
                }`}
              />
            </button>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-300/60 bg-rose-500/20 p-4 shadow-[0_0_24px_rgba(244,63,94,0.3)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-100">
                {isTR ? 'Geleneksel Maliyet' : 'Traditional Cost'}
              </p>
              <p className="mt-2 text-sm font-semibold text-rose-100 md:text-base">
                {isTR ? `Ortalama Personel Maaşı: ${formatRegionalMoney(employeeCost)} / ay` : `Avg. Monthly Agent Cost: ${formatRegionalMoney(employeeCost)} / mo`}
              </p>
              <p className="mt-2 text-lg font-black text-rose-50 md:text-xl">
                {isTR
                  ? `1 Çalışan = ${formatRegionalMoney(employeeCost)}/ay (Maaş + SGK + Yol/Yemek).`
                  : `Traditional Hiring: ${formatRegionalMoney(employeeCost)}/mo vs MGL AI: ${formatRegionalMoney(aiAssistantCost)}/mo.`}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/60 bg-emerald-500/20 p-4 shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">MGL Solution</p>
              <p className="mt-2 text-lg font-black text-emerald-50 md:text-xl">
                {isTR
                  ? `MGL AI Asistan: ${formatRegionalMoney(aiAssistantCost)}/ay (7/24 Aktif, Sıfır İzin).`
                  : `MGL AI Assistant: ${formatRegionalMoney(aiAssistantCost)}/mo (24/7 active, no leave).`}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeSector.sliders.map((slider) => (
              <label key={slider.key} className="rounded-2xl border border-white/15 bg-black/30 p-4">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                  <span>{getSliderLabel(slider)}</span>
                  <strong className="text-cyan-300">
                    {slider.key === 'basketValue' && !isTR
                      ? `£${formatMoney(values[slider.key])}`
                      : formatMoney(values[slider.key])}
                    {getSliderSuffix(slider)}
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
          <h3 className="mb-4 text-2xl font-bold">
            {isTR ? 'Hesap Dökümü' : 'Calculation Breakdown'}
          </h3>

          <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/70 p-5 font-mono text-sm text-slate-200">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              {isTR ? 'Aylık Kayıp Formülü' : 'Monthly Loss Formula'}
            </p>
            <p className="text-base leading-relaxed">
              {getBreakdown(activeSector).join(' × ')}
              <span className="mx-2 text-slate-500">=</span>
              <span className={`${aiMode ? 'text-emerald-300' : 'text-rose-300'} text-2xl font-black`}>
                {aiMode
                  ? formatRegionalMoney(convertToRegionalCurrency(monthlyNetGain))
                  : formatRegionalMoney(convertToRegionalCurrency(monthlyLoss))}
              </span>
            </p>
          </div>

          <p className="mt-4 text-sm text-slate-300">{getExplanation(activeSector)}</p>
          <p className="mt-2 text-sm font-semibold text-cyan-300">
            {isTR ? 'MGL Yapay Zeka Asistanı ile bu kaybı kazanca dönüştürün.' : 'Turn this loss into profit with MGL AI Assistant.'}
          </p>
          <p className="mt-4 text-center text-xs text-slate-400">
            {isTR
              ? 'Küçük veya büyük, her ölçekteki işletme için gerçek zamanlı kayıp analizi.'
              : 'Real-time loss analysis for businesses of all sizes, small or large.'}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-600/60 bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {isTR ? 'Manuel Sistem Tahmini Aylık Kayıp' : 'Estimated Monthly Loss (Manual System)'}
              </p>
              <p className="mt-2 text-3xl font-black text-rose-300">{formatRegionalMoney(convertToRegionalCurrency(monthlyLoss))}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                {isTR ? 'MGL Yapay Zeka Asistanı Paket Fiyatı' : 'MGL AI Assistant Package Price'}
              </p>
              <p className="mt-2 text-lg font-bold text-emerald-100">
                {isTR ? activeSector.packageName : 'Pro Package'}
              </p>
              <p className="mt-1 text-3xl font-black text-emerald-300">
                {formatRegionalMoney(aiAssistantCost)} / {isTR ? 'ay' : 'mo'}
              </p>
              {aiMode && (
                <p className="mt-3 text-sm font-semibold text-emerald-100">
                  {isTR
                    ? `Yapay Zeka Asistanı modu açık: Net tasarruf/kazanç ≈ ${formatRegionalMoney(convertToRegionalCurrency(monthlyNetGain))} / ay`
                    : `AI Assistant mode on: net savings/gain ≈ ${formatRegionalMoney(Math.max(convertToRegionalCurrency(monthlyLoss) - aiAssistantCost, 0))} / mo`}
                </p>
              )}
            </div>
          </div>

          <a
            href="/packages"
            className="mt-5 block rounded-2xl border border-cyan-300/45 bg-cyan-500/10 p-5 transition hover:border-cyan-200 hover:bg-cyan-400/20"
          >
            <p className="text-lg font-bold text-cyan-200">
              💡 {isTR ? 'Önerilen Çözüm' : 'Recommended Solution'}: {recommendedPackage.name}
            </p>
            <p className="mt-1 text-sm text-slate-200">{recommendedPackage.message}</p>
          </a>

          <a
            href="/packages"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-900 transition hover:bg-emerald-300"
          >
            {isTR ? 'Hemen Başla (Beta Programı)' : 'Get Started (Beta Program)'} <ArrowRight size={18} />
          </a>
        </section>
      </div>
    </div>
  );
}
