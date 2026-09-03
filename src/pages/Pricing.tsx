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

type Sector = {
  id: string;
  tr: string;
  en: string;
  icon: LucideIcon;
  opportunityTR: string;
  opportunityEN: string;
  valueTR: string;
  valueEN: string;
};

const sectors: Sector[] = [
  { id: 'health', tr: 'Klinik & Sağlık', en: 'Clinic & Healthcare', icon: Stethoscope, opportunityTR: 'Aylık kaçırılan hasta talebi', opportunityEN: 'Missed patient enquiries per month', valueTR: 'Kazanılan hasta başına ortalama katkı', valueEN: 'Average contribution per converted patient' },
  { id: 'restaurant', tr: 'Restoran & Kafe', en: 'Restaurant & Cafe', icon: UtensilsCrossed, opportunityTR: 'Aylık kaçırılan sipariş veya rezervasyon', opportunityEN: 'Missed orders or bookings per month', valueTR: 'Sipariş veya rezervasyon başına katkı', valueEN: 'Contribution per order or booking' },
  { id: 'estate', tr: 'Emlak & Gayrimenkul', en: 'Real Estate', icon: Building2, opportunityTR: 'Aylık kaçırılan nitelikli müşteri adayı', opportunityEN: 'Missed qualified leads per month', valueTR: 'Tamamlanan işlem başına ortalama katkı', valueEN: 'Average contribution per completed deal' },
  { id: 'export', tr: 'İhracat & Üretim', en: 'Export & Manufacturing', icon: Globe2, opportunityTR: 'Aylık geç veya yanıtsız kalan teklif talebi', opportunityEN: 'Quote requests missed or answered late', valueTR: 'Kazanılan müşteri başına ortalama katkı', valueEN: 'Average contribution per won customer' },
  { id: 'beauty', tr: 'Güzellik & Bakım', en: 'Beauty & Care', icon: Scissors, opportunityTR: 'Aylık boş kalan veya kaçırılan randevu', opportunityEN: 'Empty or missed appointments per month', valueTR: 'Tamamlanan randevu başına katkı', valueEN: 'Contribution per completed appointment' },
  { id: 'ecommerce', tr: 'E-Ticaret', en: 'E-commerce', icon: ShoppingBag, opportunityTR: 'Aylık yanıtsız kalan satın alma talebi', opportunityEN: 'Purchase enquiries missed per month', valueTR: 'Kazanılan sipariş başına katkı', valueEN: 'Contribution per recovered order' },
  { id: 'education', tr: 'Eğitim & Kurs', en: 'Education & Courses', icon: GraduationCap, opportunityTR: 'Aylık kaçırılan kayıt görüşmesi', opportunityEN: 'Missed enrolment conversations per month', valueTR: 'Kazanılan kayıt başına katkı', valueEN: 'Contribution per recovered enrolment' },
  { id: 'law', tr: 'Hukuk & Danışmanlık', en: 'Law & Consulting', icon: Scale, opportunityTR: 'Aylık kaçırılan uygun danışan talebi', opportunityEN: 'Missed suitable enquiries per month', valueTR: 'Yeni danışan başına ortalama katkı', valueEN: 'Average contribution per new client' },
  { id: 'other', tr: 'Diğer Sektörler', en: 'Other Sectors', icon: Sparkles, opportunityTR: 'Aylık kaçırılan uygun müşteri talebi', opportunityEN: 'Missed suitable enquiries per month', valueTR: 'Kazanılan müşteri başına ortalama katkı', valueEN: 'Average contribution per recovered customer' },
];

export default function Pricing() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isTR = language === 'tr';
  const [sectorId, setSectorId] = useState('health');
  const [missed, setMissed] = useState(20);
  const [valueTR, setValueTR] = useState(2500);
  const [valueGB, setValueGB] = useState(150);
  const [recoveryRate, setRecoveryRate] = useState(20);

  const sector = sectors.find((item) => item.id === sectorId) ?? sectors[0];
  const averageValue = region === 'TR' ? valueTR : valueGB;
  const monthlyOpportunity = useMemo(
    () => missed * averageValue * (recoveryRate / 100),
    [missed, averageValue, recoveryRate],
  );
  const platformFee = Math.max(pricing.packages.voice.price, pricing.packages.whatsapp.price);
  const afterPlatformFee = Math.max(monthlyOpportunity - platformFee, 0);
  const valueMax = region === 'TR' ? 100000 : 5000;
  const valueStep = region === 'TR' ? 250 : 25;
  const formatMoney = (amount: number) =>
    new Intl.NumberFormat(pricing.currency.locale, {
      style: 'currency',
      currency: pricing.currency.code,
      maximumFractionDigits: amount < 10 ? 2 : 0,
    }).format(amount);

  const breadcrumb = breadcrumbSchema([
    { name: isTR ? 'Ana Sayfa' : 'Home', path: '/' },
    { name: isTR ? 'Fırsat Hesaplayıcı' : 'Opportunity Calculator', path: '/pricing' },
  ]);

  return (
    <>
      <Seo
        title={isTR ? 'Fırsat Hesaplayıcı | MGL Digital Media' : 'Opportunity Calculator | MGL Digital Media'}
        description={isTR ? 'Kendi işletme verilerinizle kaçırılan taleplerin potansiyel aylık değerini hesaplayın.' : 'Use your own business figures to estimate the potential monthly value of missed enquiries.'}
        path="/pricing"
        locale={isTR ? 'tr_TR' : 'en_GB'}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      <section className="section pricing-hero">
        <div className="container" style={{ maxWidth: 920 }}>
          <span className="eyebrow">{isTR ? 'KENDİ VERİNİZLE HESAPLAYIN' : 'CALCULATE WITH YOUR OWN DATA'}</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            {isTR ? 'Yanıtsız kalan taleplerin değeri ne olabilir?' : 'What could missed enquiries be worth?'}
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 720 }}>
            {isTR
              ? 'Bu bir satış vaadi değil, şeffaf bir senaryo aracıdır. Kendi talep sayınızı, müşteri değerinizi ve gerçekçi geri kazanım tahmininizi girin.'
              : 'This is a transparent scenario tool, not a performance promise. Enter your own enquiry volume, customer value and a realistic recovery estimate.'}
          </p>
        </div>
      </section>

      <section className="section-tight" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--border)' }}>
        <div className="container">
          <span className="eyebrow">{isTR ? '01 · SEKTÖR' : '01 · SECTOR'}</span>
          <div className="sector-picker" style={{ marginTop: 20 }}>
            {sectors.map((item) => {
              const Icon = item.icon;
              const active = item.id === sectorId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={active ? 'sector-option is-active' : 'sector-option'}
                  onClick={() => setSectorId(item.id)}
                  aria-pressed={active}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{isTR ? item.tr : item.en}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container calculator-layout">
          <div className="calculator-controls">
            <span className="eyebrow">{isTR ? '02 · VARSAYIMLARINIZ' : '02 · YOUR ASSUMPTIONS'}</span>
            <h2 style={{ marginTop: 12 }}>{isTR ? sector.tr : sector.en}</h2>
            <p style={{ marginTop: 12, color: 'var(--fg-2)', maxWidth: 620 }}>
              {isTR ? 'Kaydırıcıları son 30 günlük gerçek verinize göre ayarlayın.' : 'Set the sliders using your actual figures from the last 30 days.'}
            </p>

            <CalculatorRange
              label={isTR ? sector.opportunityTR : sector.opportunityEN}
              value={missed}
              min={1}
              max={200}
              step={1}
              display={`${missed}`}
              onChange={setMissed}
            />
            <CalculatorRange
              label={isTR ? sector.valueTR : sector.valueEN}
              value={averageValue}
              min={region === 'TR' ? 250 : 25}
              max={valueMax}
              step={valueStep}
              display={formatMoney(averageValue)}
              onChange={region === 'TR' ? setValueTR : setValueGB}
            />
            <CalculatorRange
              label={isTR ? 'Bu taleplerin geri kazanılabileceğini düşündüğünüz oran' : 'Share of these enquiries you believe could be recovered'}
              value={recoveryRate}
              min={5}
              max={60}
              step={5}
              display={`%${recoveryRate}`}
              onChange={setRecoveryRate}
            />
          </div>

          <aside className="calculator-result" aria-live="polite">
            <span className="eyebrow">{isTR ? '03 · ÖRNEK SENARYO' : '03 · EXAMPLE SCENARIO'}</span>
            <p className="calculator-result__value">{formatMoney(monthlyOpportunity)}</p>
            <h2>{isTR ? 'Aylık potansiyel fırsat' : 'Potential monthly opportunity'}</h2>
            <p>
              {isTR
                ? `${missed} talep × ${formatMoney(averageValue)} ortalama katkı × %${recoveryRate} geri kazanım varsayımı.`
                : `${missed} enquiries × ${formatMoney(averageValue)} average contribution × ${recoveryRate}% assumed recovery.`}
            </p>

            <div className="calculator-result__fee">
              <span>{isTR ? 'Aylık platform bedeli' : 'Monthly platform fee'}</span>
              <strong>{formatMoney(platformFee)}</strong>
            </div>
            <div className="calculator-result__fee">
              <span>{isTR ? 'Platform bedeli sonrası fırsat' : 'Opportunity after platform fee'}</span>
              <strong>{formatMoney(afterPlatformFee)}</strong>
            </div>
            <p className="calculator-result__note">
              {isTR
                ? 'Kullanım bedelleri ve harici sağlayıcı ücretleri bu tahmine dahil değildir. Sonuç garanti değil, girdiğiniz varsayımların matematiksel karşılığıdır.'
                : 'Usage and third-party provider charges are not included. This is not a guarantee; it is the mathematical result of your assumptions.'}
            </p>
            <a href="/packages#agents" className="btn btn-primary btn-lg">
              {isTR ? 'Şeffaf fiyatları görün' : 'See transparent pricing'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}

function CalculatorRange({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="calculator-range">
      <span className="calculator-range__head">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
