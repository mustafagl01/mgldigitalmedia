import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
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
    icon: Stethoscope,
    sliders: [
      { key: 'dailyCalls', labelTR: 'Günlük Kaçırılan Çağrı', labelEN: 'Daily Missed Calls', min: 1, max: 50, suffixTR: ' adet', suffixEN: ' calls' },
      { key: 'patientValue', labelTR: 'Ortalama Hasta Değeri', labelEN: 'Avg. Patient Value', min: 500, max: 50000, step: 500, suffixTR: ' TL', suffixEN: ' £' },
    ],
    calculate: (v) => v.dailyCalls * 30 * 0.2 * v.patientValue,
    breakdownTR: (v) => [`${v.dailyCalls} (Kaçan çağrı/gün)`, '30 (Gün)', '%20 (Dönüşüm)', `${formatMoney(v.patientValue)} TL (Hasta değeri)`],
    breakdownEN: (v) => [`${v.dailyCalls} (Missed calls/day)`, '30 (Days)', '20% (Conversion)', `£${formatMoney(v.patientValue)} (Patient value)`],
    explanationTR: (v) => `Günde ${v.dailyCalls} çağrı kaçırmak, ayda ${v.dailyCalls * 30} potansiyel hasta kaybı demektir. Ortalama %20 dönüşüm oranı ile hesaplanmıştır.`,
    explanationEN: (v) => `Missing ${v.dailyCalls} calls daily means ${v.dailyCalls * 30} potential patients lost per month. Calculated with an average 20% conversion rate.`,
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'restaurant',
    titleTR: 'Restoran & Cafe',
    titleEN: 'Restaurant & Cafe',
    icon: UtensilsCrossed,
    sliders: [
      { key: 'dailyOrders', labelTR: 'Günlük Paket Sipariş', labelEN: 'Daily Delivery Orders', min: 1, max: 500, suffixTR: ' adet', suffixEN: ' orders' },
      { key: 'basketValue', labelTR: 'Ortalama Sepet Tutarı', labelEN: 'Avg. Basket Value', min: 1, max: 2000, step: 1, suffixTR: ' TL', suffixEN: '£' },
      { key: 'commission', labelTR: 'Platform Komisyonu', labelEN: 'Platform Commission', min: 1, max: 30, suffixTR: ' %', suffixEN: '%' },
    ],
    calculate: (v) => v.dailyOrders * v.basketValue * 30 * (v.commission / 100),
    breakdownTR: (v) => [`${v.dailyOrders} (Sipariş/gün)`, `${formatMoney(v.basketValue)} TL (Sepet)`, '30 (Gün)', `%${v.commission} (Komisyon)`],
    breakdownEN: (v) => [`${v.dailyOrders} (Orders/day)`, `£${formatMoney(v.basketValue)} (Basket)`, '30 (Days)', `${v.commission}% (Commission)`],
    explanationTR: () => 'Online yemek platformlarına her ay ödediğiniz komisyon tutarıdır.',
    explanationEN: () => 'The commission amount you pay to food delivery platforms every month.',
    packageName: 'Restoran Paketi',
    packagePrice: 16999,
  },
  {
    id: 'estate',
    titleTR: 'Emlak & Gayrimenkul',
    titleEN: 'Real Estate',
    icon: Building2,
    sliders: [
      { key: 'monthlyLeads', labelTR: 'Aylık Kaçan Potansiyel Müşteri', labelEN: 'Monthly Missed Leads', min: 1, max: 100, suffixTR: ' kişi', suffixEN: ' leads' },
      { key: 'estateCommission', labelTR: 'Ortalama Satış/Kira Komisyonu', labelEN: 'Avg. Sale/Rent Commission', min: 10000, max: 200000, step: 1000, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.monthlyLeads * 0.05 * v.estateCommission,
    breakdownTR: (v) => [`${v.monthlyLeads} (Kaçan müşteri/ay)`, '%5 (Satışa dönüşüm)', `${formatMoney(v.estateCommission)} TL (Komisyon)`],
    breakdownEN: (v) => [`${v.monthlyLeads} (Missed leads/mo)`, '5% (Conversion)', `${formatMoney(v.estateCommission)} (Commission)`],
    explanationTR: () => 'Yoğunluktan dönemediğiniz müşterilerin %5\'inin satışa döneceği varsayılmıştır.',
    explanationEN: () => 'It is assumed that 5% of customers you couldn\'t respond to due to busyness will convert to sales.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'export',
    titleTR: 'İhracat & Üretim',
    titleEN: 'Export & Manufacturing',
    icon: Globe2,
    sliders: [
      { key: 'staffCount', labelTR: 'Yabancı Dil Bilen Personel İhtiyacı', labelEN: 'Foreign Language Staff Needed', min: 1, max: 10, suffixTR: ' kişi', suffixEN: ' staff' },
      { key: 'staffCost', labelTR: 'Personel Başı Aylık Maliyet', labelEN: 'Monthly Cost Per Staff', min: 1000, max: 5000, step: 100, suffixTR: ' $', suffixEN: '' },
    ],
    calculate: (v) => v.staffCount * v.staffCost * 34,
    breakdownTR: (v) => [`${v.staffCount} (Personel)`, `${formatMoney(v.staffCost)} $ (Kişi başı)`, '34 (Sabit TRY kuru)'],
    breakdownEN: (v) => [`${v.staffCount} (Staff)`, `$${formatMoney(v.staffCost)} (Cost per person)`, '34 (Fixed TRY rate)'],
    explanationTR: () => '7/24 çalışacak bir AI asistan yerine, vardiyalı personel çalıştırmanın aylık maliyetidir.',
    explanationEN: () => 'The monthly cost of employing shift staff instead of an AI Assistant that works 24/7.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'beauty',
    titleTR: 'Güzellik & Bakım',
    titleEN: 'Beauty & Care',
    icon: Scissors,
    sliders: [
      { key: 'emptySlots', labelTR: 'Günlük Boş Koltuk/Randevu', labelEN: 'Daily Empty Slots', min: 1, max: 20, suffixTR: ' adet', suffixEN: ' slots' },
      { key: 'serviceValue', labelTR: 'Ortalama İşlem Ücreti', labelEN: 'Avg. Service Fee', min: 200, max: 5000, step: 50, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.emptySlots * v.serviceValue * 26,
    breakdownTR: (v) => [`${v.emptySlots} (Boş randevu/gün)`, `${formatMoney(v.serviceValue)} TL (İşlem)`, '26 (Çalışma günü)'],
    breakdownEN: (v) => [`${v.emptySlots} (Empty slots/day)`, `${formatMoney(v.serviceValue)} (Service)`, '26 (Working days)'],
    explanationTR: () => 'Randevu hatırlatma yapılmadığı için gelmeyen veya boş geçen saatlerin maliyetidir.',
    explanationEN: () => 'The cost of no-shows or empty hours due to lack of appointment reminders.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'ecommerce',
    titleTR: 'E-Ticaret',
    titleEN: 'E-Commerce',
    icon: ShoppingBag,
    sliders: [
      { key: 'tickets', labelTR: 'Günlük Canlı Destek Talebi', labelEN: 'Daily Support Requests', min: 10, max: 500, suffixTR: ' adet', suffixEN: ' tickets' },
      { key: 'costPerTicket', labelTR: 'Talep Başına Personel Maliyeti', labelEN: 'Staff Cost Per Request', min: 5, max: 50, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.tickets * v.costPerTicket * 30,
    breakdownTR: (v) => [`${v.tickets} (Talep/gün)`, `${formatMoney(v.costPerTicket)} TL (Talep başı)`, '30 (Gün)'],
    breakdownEN: (v) => [`${v.tickets} (Requests/day)`, `${formatMoney(v.costPerTicket)} (Per request)`, '30 (Days)'],
    explanationTR: () => 'Müşteri sorularını manuel yanıtlamanın operasyonel maliyetidir.',
    explanationEN: () => 'The operational cost of manually responding to customer inquiries.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'education',
    titleTR: 'Eğitim & Kurs',
    titleEN: 'Education & Courses',
    icon: GraduationCap,
    sliders: [
      { key: 'missedLeads', labelTR: 'Aylık Kaçırılan Kayıt Görüşmesi', labelEN: 'Monthly Missed Calls', min: 5, max: 100, suffixTR: ' adet', suffixEN: ' calls' },
      { key: 'studentValue', labelTR: 'Öğrenci Başına Yıllık Kâr', labelEN: 'Annual Profit Per Student', min: 5000, max: 100000, step: 1000, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.missedLeads * 0.1 * (v.studentValue / 12),
    breakdownTR: (v) => [`${v.missedLeads} (Kaçan görüşme/ay)`, '%10 (Dönüşüm)', `${formatMoney(v.studentValue)} TL / 12`],
    breakdownEN: (v) => [`${v.missedLeads} (Missed calls/mo)`, '10% (Conversion)', `${formatMoney(v.studentValue)} / 12`],
    explanationTR: () => 'Bilgi alamadığı için kayıttan vazgeçen öğrencilerin aylık ciro etkisi.',
    explanationEN: () => 'The monthly revenue impact of students who give up on registration because they couldn\'t get information.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'law',
    titleTR: 'Hukuk & Danışmanlık',
    titleEN: 'Law & Consulting',
    icon: Scale,
    sliders: [
      { key: 'weeklyHours', labelTR: 'Haftalık Gereksiz Telefon Görüşmesi', labelEN: 'Weekly Unnecessary Phone Calls', min: 1, max: 40, suffixTR: ' saat', suffixEN: ' hours' },
      { key: 'hourlyRate', labelTR: 'Saatlik Danışmanlık Ücretiniz', labelEN: 'Your Hourly Rate', min: 1000, max: 10000, step: 100, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.weeklyHours * v.hourlyRate * 4,
    breakdownTR: (v) => [`${v.weeklyHours} saat (Haftalık)`, `${formatMoney(v.hourlyRate)} TL (Saatlik)`, '4 (Hafta)'],
    breakdownEN: (v) => [`${v.weeklyHours} hours (Weekly)`, `${formatMoney(v.hourlyRate)} (Hourly)`, '4 (Weeks)'],
    explanationTR: () => 'Bilgi vermek için telefonda harcadığınız vaktin nakit karşılığıdır.',
    explanationEN: () => 'The cash equivalent of the time you spend on the phone providing information.',
    packageName: 'Profesyonel Paket',
    packagePrice: 13999,
  },
  {
    id: 'other',
    titleTR: 'Diğer Sektörler',
    titleEN: 'Other Sectors',
    icon: Sparkles,
    sliders: [
      { key: 'inefficiency', labelTR: 'Operasyonel Verimsizlik', labelEN: 'Operational Inefficiency', min: 10, max: 50, suffixTR: ' %', suffixEN: '%' },
      { key: 'turnover', labelTR: 'Aylık Toplam Ciro', labelEN: 'Monthly Total Revenue', min: 50000, max: 1000000, step: 5000, suffixTR: ' TL', suffixEN: '' },
    ],
    calculate: (v) => v.turnover * (v.inefficiency / 100),
    breakdownTR: (v) => [`${formatMoney(v.turnover)} TL (Aylık ciro)`, `%${v.inefficiency} (Verimsizlik)`],
    breakdownEN: (v) => [`${formatMoney(v.turnover)} (Monthly revenue)`, `${v.inefficiency}% (Inefficiency)`],
    explanationTR: () => 'Otomatik işlemler eksikliği nedeniyle kaybedilen tahmini ciro payı.',
    explanationEN: () => 'Estimated revenue share lost due to lack of automated processes.',
    packageName: 'Profesyonel Paket',
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
  const starterThreshold = region === 'TR' ? 10000 : 250;
  const proThreshold = region === 'TR' ? 25000 : 625;

  if (monthlyLoss < starterThreshold) {
    return {
      name: region === 'TR' ? 'Başlangıç Paketi' : 'Starter Package',
      message: region === 'TR' ? 'Küçük kayıpları önlemek için ideal başlangıç.' : 'Ideal starting point to prevent small losses.',
    };
  }
  if (monthlyLoss <= proThreshold) {
    return {
      name: region === 'TR' ? 'Profesyonel Paket' : 'Pro Package',
      message: region === 'TR' ? 'Bu kaybı önlemek için en popüler çözümümüz.' : 'Our most popular solution to prevent this loss.',
    };
  }
  return {
    name: region === 'TR' ? 'Premium Paket' : 'Business Package',
    message: region === 'TR' ? 'Büyük operasyonel kayıplar için tam otomasyon.' : 'Full automation for large operational losses.',
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
  const recommendedPackage = useMemo(() => getRecommendedPackage(monthlyLoss, region), [monthlyLoss, region]);

  const isEnglish = language === 'en';

  const getSliderLabel = (slider: SliderConfig) => (isTR ? slider.labelTR : slider.labelEN);
  const getSliderSuffix = (slider: SliderConfig) => (isTR ? slider.suffixTR : slider.suffixEN);
  const getSectorTitle = (sector: SectorConfig) => (isTR ? sector.titleTR : sector.titleEN);
  const getExplanation = (sector: SectorConfig) => (isTR ? sector.explanationTR(values) : sector.explanationEN(values));
  const getBreakdown = (sector: SectorConfig) => (isTR ? sector.breakdownTR(values) : sector.breakdownEN(values));

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
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/pricing"
        locale={isTR ? 'tr_TR' : 'en_GB'}
        keywords={isTR ? ['ROI hesaplayıcı', 'kayıp hesabı', 'KOBİ otomasyon ROI'] : ['ROI calculator', 'SME automation ROI', 'loss calculator']}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(32px, 2vw + 16px, 56px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">
            {isEnglish ? 'ROI SIMULATION ENGINE' : 'ROI SİMÜLASYON MOTORU'}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 1.2rem + 2.8vw, 3.75rem)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isTR ? 'Kaybınız nereden geliyor?' : 'Where is your loss coming from?'}
          </h1>
          <p className="lede" style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}>
            {isTR
              ? 'Sektörünüzü seçin, kaydırıcıları kendi işinize göre ayarlayın. Aylık kayıp formülü canlı hesaplanır — sonra AI asistanı açıp net kazancı görün.'
              : 'Pick your sector, set the sliders to your business. Monthly loss is calculated live — then switch on AI mode to see the net gain.'}
          </p>
          <p
            style={{
              marginTop: 20,
              display: 'inline-flex',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ember)',
              padding: '6px 12px',
              border: '1px solid var(--ember)',
              background: 'var(--ember-soft)',
              borderRadius: 999,
              letterSpacing: '0.04em',
            }}
          >
            {isTR ? 'Bir çalışan maliyetine, üç AI asistan.' : 'Three AI assistants for the cost of one employee.'}
          </p>
        </div>
      </section>

      {/* Sector selector */}
      <section style={{ background: 'var(--paper-2)', padding: 'clamp(40px, 3vw + 16px, 64px) 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">{isEnglish ? 'STEP 01 · SECTOR' : 'ADIM 01 · SEKTÖR'}</span>
          <div
            style={{
              marginTop: 20,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
            }}
          >
            {sectorConfigs.map((sector) => {
              const Icon = sector.icon;
              const active = activeSectorId === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveSectorId(sector.id)}
                  style={{
                    padding: 16,
                    textAlign: 'left',
                    background: active ? 'var(--ink)' : 'var(--paper)',
                    color: active ? 'var(--paper)' : 'var(--ink)',
                    border: `1px solid ${active ? 'var(--ink)' : 'var(--border)'}`,
                    borderRadius: 'var(--r-md)',
                    transition: 'background 160ms, color 160ms, border-color 160ms',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: active ? 'var(--ember)' : 'var(--ember)' }}>
                    <Icon size={16} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>
                    {getSectorTitle(sector)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(56px, 5vw + 16px, 96px) 0' }}>
        <div className="container">
          <div
            style={{
              padding: 'clamp(24px, 2vw + 16px, 40px)',
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${aiMode ? 'var(--ember)' : 'var(--fg-3)'}`,
              borderRadius: 'var(--r-lg)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div>
                <span className="eyebrow">{isEnglish ? 'STEP 02 · SIMULATE' : 'ADIM 02 · SİMÜLASYON'}</span>
                <h2
                  style={{
                    marginTop: 8,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 1.1rem + 1vw, 2rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    margin: 0,
                  }}
                >
                  {isTR ? 'Manuel sistem vs MGL AI asistanı' : 'Manual system vs MGL AI assistant'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAiMode((prev) => !prev)}
                style={{
                  position: 'relative',
                  height: 44,
                  width: 96,
                  borderRadius: 999,
                  background: aiMode ? 'var(--ember)' : 'var(--coal-2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 200ms var(--ease-out)',
                }}
                aria-label={isTR ? 'AI modunu aç/kapat' : 'Toggle AI mode'}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: aiMode ? 56 : 4,
                    height: 36,
                    width: 36,
                    borderRadius: '50%',
                    background: 'var(--paper)',
                    transition: 'left 200ms var(--ease-out)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: aiMode ? 'auto' : 12,
                    left: aiMode ? 12 : 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: aiMode ? 'var(--paper)' : 'var(--bone-3)',
                  }}
                >
                  {aiMode ? 'AI' : 'OFF'}
                </span>
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div style={{ padding: 16, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', margin: 0 }}>
                  {isTR ? 'Geleneksel maliyet' : 'Traditional cost'}
                </p>
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>
                  {isTR
                    ? `1 çalışan: ${formatRegionalMoney(employeeCost)}/ay (maaş + SGK + yol + yemek).`
                    : `1 employee: ${formatRegionalMoney(employeeCost)}/mo (salary + benefits).`}
                </p>
              </div>
              <div
                style={{
                  padding: 16,
                  background: 'var(--paper)',
                  border: '1px solid var(--ember)',
                  borderRadius: 'var(--r-md)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ember)', margin: 0 }}>
                  MGL AI
                </p>
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
                  {isTR
                    ? `${formatRegionalMoney(aiAssistantCost)}/ay · 7/24 aktif · izin yok · ölçeklenir.`
                    : `${formatRegionalMoney(aiAssistantCost)}/mo · 24/7 active · no leave · scales.`}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {activeSector.sliders.map((slider) => (
                <label
                  key={slider.key}
                  style={{
                    padding: 16,
                    background: 'var(--paper)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.3 }}>
                      {getSliderLabel(slider)}
                    </span>
                    <strong
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        color: 'var(--ember)',
                        whiteSpace: 'nowrap',
                      }}
                    >
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
                      setValues((prev) => ({ ...prev, [slider.key]: Number(event.target.value) }))
                    }
                    style={{
                      width: '100%',
                      height: 4,
                      appearance: 'none',
                      background: 'var(--border)',
                      borderRadius: 999,
                      cursor: 'pointer',
                      accentColor: 'var(--ember)',
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Result */}
      <section style={{ background: 'var(--paper-2)', padding: 'clamp(56px, 5vw + 16px, 96px) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">{isEnglish ? 'STEP 03 · RESULT' : 'ADIM 03 · SONUÇ'}</span>
          <h3
            style={{
              marginTop: 12,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 1.1rem + 1vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: '12px 0 0',
            }}
          >
            {isTR ? 'Hesap dökümü' : 'Calculation breakdown'}
          </h3>

          <div
            style={{
              marginTop: 24,
              padding: 24,
              background: 'var(--paper)',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--r-md)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', margin: 0 }}>
              {isTR ? 'Aylık kayıp formülü' : 'Monthly loss formula'}
            </p>
            <p
              style={{
                marginTop: 12,
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--fg-2)',
                wordBreak: 'break-word',
              }}
            >
              {getBreakdown(activeSector).join(' × ')}
              <span style={{ margin: '0 8px', color: 'var(--fg-3)' }}>=</span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 1rem + 1.5vw, 2rem)',
                  fontWeight: 500,
                  color: aiMode ? 'var(--ember)' : 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {aiMode ? formatRegionalMoney(monthlyNetGain) : formatRegionalMoney(monthlyLoss)}
              </span>
            </p>
          </div>

          <p style={{ marginTop: 16, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>
            {getExplanation(activeSector)}
          </p>

          <div
            style={{
              marginTop: 32,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 24,
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', margin: 0 }}>
                {isTR ? 'Manuel sistem: aylık tahmini kayıp' : 'Manual system: monthly loss'}
              </p>
              <p
                style={{
                  marginTop: 12,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {formatRegionalMoney(monthlyLoss)}
              </p>
            </div>

            <div
              style={{
                padding: 24,
                background: 'var(--paper)',
                border: '1px solid var(--ember)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ember)', margin: 0 }}>
                {isTR ? 'MGL AI · Profesyonel Paket' : 'MGL AI · Pro Package'}
              </p>
              <p
                style={{
                  marginTop: 12,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {formatRegionalMoney(aiAssistantCost)}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', fontWeight: 400, marginLeft: 6 }}>
                  / {isTR ? 'ay' : 'mo'}
                </span>
              </p>
              {aiMode && (
                <p style={{ marginTop: 10, fontSize: 13, color: 'var(--ember)' }}>
                  {isTR
                    ? `Net tasarruf ≈ ${formatRegionalMoney(monthlyNetGain)} / ay`
                    : `Net savings ≈ ${formatRegionalMoney(monthlyNetGain)} / mo`}
                </p>
              )}
            </div>
          </div>

          <a
            href="/packages#agents"
            style={{
              marginTop: 24,
              display: 'block',
              padding: 24,
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--ember)',
              borderRadius: 'var(--r-md)',
              textDecoration: 'none',
              transition: 'background 160ms',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                lineHeight: 1.3,
                fontWeight: 500,
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              {isTR ? 'Önerilen çözüm' : 'Recommended'}: {recommendedPackage.name}
            </p>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>
              {recommendedPackage.message}
            </p>
          </a>

          <a href="/packages#agents" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
            {isTR ? 'Agent paketlerine git' : 'See agent packages'}
            <ArrowUpRight size={16} />
          </a>

          {/* Category bridges */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid var(--border)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {isTR ? 'FARKLI BİR İHTİYACINIZ MI VAR?' : 'DIFFERENT NEED?'}
            </p>
            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 12,
              }}
            >
              <a
                href="/packages#ads"
                style={{
                  padding: 20,
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  borderLeft: '2px solid var(--ember)',
                  borderRadius: 'var(--r-md)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  display: 'block',
                }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                  {isTR ? 'Reklam yapmak istiyorum →' : 'I want to run ads →'}
                </p>
                <p style={{ marginTop: 6, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.45 }}>
                  {isTR ? 'Meta + Google + SEO paketleri.' : 'Meta + Google + SEO packages.'}
                </p>
              </a>
              <a
                href="/packages#web"
                style={{
                  padding: 20,
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  borderLeft: '2px solid var(--ember)',
                  borderRadius: 'var(--r-md)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  display: 'block',
                }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
                  {isTR ? 'Yeni site istiyorum →' : 'I need a new website →'}
                </p>
                <p style={{ marginTop: 6, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.45 }}>
                  {isTR ? 'Landing, kurumsal, dönüşüm platformu.' : 'Landing, corporate, conversion platform.'}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
