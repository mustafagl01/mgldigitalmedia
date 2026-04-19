import { useMemo, useState } from 'react';
import { Check, ChevronDown, MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import type { PackageTierKey } from '../config/pricing';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';

type PackagePlan = {
  key: PackageTierKey;
  subtitle: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  recommended?: boolean;
};

type TabMode = 'ready' | 'enterprise';

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
      en: 'Stop losing leads after hours.',
    },
    features: {
      tr: [
        'WhatsApp AI asistan (7/24)',
        'Takvim & Google Sheets senkronizasyonu',
        'Standart yanıt şablonları (işletmeye özel ayar)',
        'E-posta destek',
      ],
      en: [
        'WhatsApp AI assistant (24/7)',
        'Calendar & Google Sheets sync',
        'Standard response templates (tuned to your business)',
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

const faqItems: FaqItem[] = [
  {
    q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
    a: {
      tr: 'Başlangıç ve Büyüme paketleri 3 iş günü içinde canlıya alınır. Oto-Sekreter ve Tam Otonomi için ortalama 2 hafta (telefon hattı entegrasyonu ve ses eğitimi dahil).',
      en: 'Starter and Growth go live within 3 business days. Auto-Receptionist and Full Autonomy average 2 weeks (phone line integration and voice training included).',
    },
  },
  {
    q: { tr: 'Sözleşme süresi var mı?', en: 'Is there a contract term?' },
    a: {
      tr: 'Hayır. Aylık abonelik — istediğiniz zaman durdurabilirsiniz. Yıllık ödemede indirim konuşulabilir.',
      en: 'No. Monthly subscription — cancel anytime. Annual billing discount is negotiable.',
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
  const rec = plan.recommended;

  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper-2)',
        border: `1px solid ${rec ? 'var(--ember)' : 'var(--border)'}`,
        borderRadius: 'var(--r-lg)',
        padding: 28,
        minHeight: 580,
        boxShadow: rec ? '0 2px 0 var(--ember-soft)' : 'none',
      }}
    >
      {rec && (
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: -12,
            left: 24,
            background: 'var(--ember)',
            color: 'var(--paper)',
          }}
        >
          {isEnglish ? 'Most chosen' : 'En çok seçilen'}
        </span>
      )}

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
        }}
      >
        / {plan.key}
      </span>

      <h2
        style={{
          marginTop: 12,
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 1rem + 0.6vw, 1.75rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          fontWeight: 600,
          color: 'var(--ink)',
        }}
      >
        {plan.name}
      </h2>
      <p style={{ marginTop: 6, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.45 }}>
        {plan.subtitle}
      </p>

      <div style={{ marginTop: 20 }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 1.4rem + 1.4vw, 2.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {formatPrice(plan.price, region)}
        </p>
        <p
          style={{
            marginTop: 6,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
          }}
        >
          {isEnglish ? 'per month' : 'aylık'}
        </p>
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--fg-2)',
          paddingTop: 14,
          borderTop: '1px solid var(--border)',
        }}
      >
        {hasSetupFee ? (
          <span>
            {isEnglish ? 'One-time setup: ' : 'Kurulum: '}
            <strong style={{ color: 'var(--ink)' }}>{formatPrice(plan.setupFee, region)}</strong>
          </span>
        ) : (
          <span style={{ color: 'var(--ember)' }}>
            {isEnglish ? '✓ Setup included' : '✓ Kurulum dahil'}
          </span>
        )}
      </div>

      <div style={{ marginTop: 14, display: 'grid', gap: 6 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>
          <strong style={{ color: 'var(--ink)' }}>
            {plan.chatConversations.toLocaleString(isEnglish ? 'en-GB' : 'tr-TR')}
          </strong>{' '}
          {isEnglish ? 'chats / month' : 'görüşme / ay'}
        </div>
        {hasVoice && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>
              {plan.voiceMinutes.toLocaleString(isEnglish ? 'en-GB' : 'tr-TR')}
            </strong>{' '}
            {isEnglish ? 'voice min / month' : 'dk ses / ay'}
          </div>
        )}
      </div>

      <ul
        style={{
          marginTop: 20,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: 1,
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 14,
              color: 'var(--fg-1)',
              lineHeight: 1.45,
            }}
          >
            <Check size={14} style={{ marginTop: 4, flexShrink: 0, color: 'var(--ember)' }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-3)',
          letterSpacing: '0.02em',
        }}
      >
        <strong style={{ color: 'var(--fg-2)' }}>{isEnglish ? 'Overage: ' : 'Aşım: '}</strong>
        {isEnglish
          ? `+${formatPrice(plan.overageChatPer100, region)} / 100 chats${
              hasVoice ? ` · +${formatPrice(plan.overageVoicePer100, region)} / 100 voice min` : ''
            }`
          : `+${formatPrice(plan.overageChatPer100, region)} / 100 görüşme${
              hasVoice ? ` · +${formatPrice(plan.overageVoicePer100, region)} / 100 dk ses` : ''
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
        className={rec ? 'btn btn-primary' : 'btn btn-secondary'}
        style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
      >
        <MessageCircle size={14} />
        {isEnglish ? '30-day free start' : '30 gün ücretsiz başla'}
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
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const [activeTab, setActiveTab] = useState<TabMode>('ready');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const readyPlans = useMemo(() => buildReadyPlans(pricing, isEnglish), [pricing, isEnglish]);

  const seoTitle = isEnglish
    ? 'Packages — Starter, Growth, Auto-Receptionist, Full Autonomy | MGL Digital Media'
    : 'Paketler — Başlangıç, Büyüme, Oto-Sekreter, Tam Otonomi | MGL Digital Media';
  const seoDescription = isEnglish
    ? 'Four pre-configured AI packages for SMEs: WhatsApp, voice, CRM, automation. TRY and GBP pricing. 30-day free trial. Monthly cancellation.'
    : 'KOBİ\'ler için dört hazır AI paketi: WhatsApp, ses, CRM, otomasyon. TRY ve GBP fiyatlandırma. 30 gün ücretsiz. Aylık çıkış hakkı.';
  const breadcrumb = breadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEnglish ? 'Packages' : 'Paketler', path: '/packages' },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/packages"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={
          isEnglish
            ? ['AI automation packages', 'SME AI bundle', 'WhatsApp bot package', 'voice assistant package']
            : ['AI otomasyon paketleri', 'KOBİ AI paketi', 'WhatsApp bot paketi', 'sesli asistan paketi']
        }
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(40px, 3vw + 16px, 72px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">
            {isEnglish ? 'PRICING · PACKAGES' : 'FİYATLANDIRMA · PAKETLER'}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEnglish
              ? 'Four tiers. One honest deal.'
              : 'Dört kademe. Tek şeffaf anlaşma.'}
          </h1>
          <p
            className="lede"
            style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}
          >
            {isEnglish
              ? 'Transparent overage pricing. No long-term contracts. The first 30 days are on us — you only pay if the system proves it works on your real traffic.'
              : 'Şeffaf aşım fiyatları. Uzun vadeli sözleşme yok. İlk 30 gün bizden — yalnızca sistem gerçek trafiğinizde çalıştığını kanıtladıysa ödersiniz.'}
          </p>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {[
              {
                icon: <ShieldCheck size={14} />,
                tr: '30 gün ücretsiz deneme',
                en: '30-day free trial',
              },
              { tr: 'Aylık çıkış hakkı', en: 'Monthly cancellation' },
              { tr: 'Veriler AB sunucularında', en: 'EU-region data hosting' },
            ].map((chip, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-2)',
                  padding: '6px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  background: 'var(--paper-2)',
                }}
              >
                {chip.icon}
                {isEnglish ? chip.en : chip.tr}
              </span>
            ))}
          </div>

          {/* Tab switcher */}
          <div
            style={{
              marginTop: 36,
              display: 'inline-flex',
              gap: 4,
              padding: 4,
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderRadius: 999,
            }}
          >
            {(['ready', 'enterprise'] as TabMode[]).map((tab) => {
              const labels: Record<TabMode, { tr: string; en: string }> = {
                ready: { tr: 'Paketler', en: 'Plans' },
                enterprise: { tr: 'Kurumsal', en: 'Enterprise' },
              };
              const { tr, en } = labels[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    background: isActive ? 'var(--ink)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--fg-2)',
                    fontSize: 13,
                    fontWeight: 500,
                    transition: 'background 160ms, color 160ms',
                    border: 'none',
                  }}
                >
                  {isEnglish ? en : tr}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeTab === 'ready' && (
        <>
          {/* Plans grid */}
          <section style={{ background: 'var(--paper)', padding: 'clamp(56px, 5vw + 16px, 96px) 0' }}>
            <div className="container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 20,
                }}
              >
                {readyPlans.map((plan) => (
                  <PlanCard key={plan.key} plan={plan} region={region} isEnglish={isEnglish} />
                ))}
              </div>
            </div>
          </section>

          {/* What every plan includes */}
          <section
            style={{
              background: 'var(--paper-2)',
              padding: 'clamp(64px, 5vw + 16px, 104px) 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="container">
              <div style={{ maxWidth: 720 }}>
                <span className="eyebrow">{isEnglish ? 'STANDARD IN EVERY PLAN' : 'HER PAKETTE STANDART'}</span>
                <h2
                  style={{
                    marginTop: 16,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  {isEnglish ? 'The basics that ship in every tier.' : 'Her kademede hazır gelenler.'}
                </h2>
              </div>

              <div
                style={{
                  marginTop: 36,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 16,
                }}
              >
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
                  <div
                    key={item.tr}
                    style={{
                      padding: 24,
                      background: 'var(--paper)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--r-md)',
                      borderLeft: '2px solid var(--ember)',
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
                      {isEnglish ? item.en : item.tr}
                    </p>
                    <p style={{ marginTop: 8, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>
                      {isEnglish ? item.desc.en : item.desc.tr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 5vw + 16px, 104px) 0' }}>
            <div className="container" style={{ maxWidth: 820 }}>
              <span className="eyebrow">{isEnglish ? 'FREQUENTLY ASKED' : 'SIK SORULAN'}</span>
              <h2
                style={{
                  marginTop: 16,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  fontWeight: 500,
                  color: 'var(--ink)',
                }}
              >
                {isEnglish ? 'Questions we hear most.' : 'En sık duyduğumuz sorular.'}
              </h2>

              <div style={{ marginTop: 32 }}>
                {faqItems.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={item.q.tr}
                      style={{
                        borderTop: idx === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '20px 0',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 16,
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.25rem)',
                            lineHeight: 1.35,
                            fontWeight: 500,
                            color: 'var(--ink)',
                          }}
                        >
                          {isEnglish ? item.q.en : item.q.tr}
                        </span>
                        <ChevronDown
                          size={18}
                          style={{
                            flexShrink: 0,
                            color: 'var(--ember)',
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 200ms var(--ease-out)',
                          }}
                        />
                      </button>
                      {isOpen && (
                        <p
                          style={{
                            paddingBottom: 20,
                            paddingRight: 34,
                            margin: 0,
                            fontSize: 15,
                            lineHeight: 1.6,
                            color: 'var(--fg-2)',
                          }}
                        >
                          {isEnglish ? item.a.en : item.a.tr}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'enterprise' && (
        <section
          className="on-coal"
          style={{
            background: 'var(--coal)',
            color: 'var(--bone)',
            padding: 'clamp(72px, 6vw + 24px, 128px) 0',
          }}
        >
          <div className="container" style={{ maxWidth: 960 }}>
            <span
              className="eyebrow"
              style={{ color: 'var(--ember)' }}
            >
              {isEnglish ? 'ENTERPRISE & CUSTOM' : 'KURUMSAL & ÖZEL'}
            </span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: 'var(--bone)',
              }}
            >
              {isEnglish
                ? 'Need something beyond the standard?'
                : 'Standartların dışında mısınız?'}
            </h2>
            <p
              style={{
                marginTop: 20,
                maxWidth: 720,
                color: 'var(--bone-2)',
                fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
                lineHeight: 1.6,
              }}
            >
              {isEnglish
                ? 'For hospital chains, multi-branch operations, factories and regulated industries we build bespoke solutions: on-premise deployment, custom integrations, dedicated infrastructure.'
                : 'Hastane zincirleri, çok şubeli işletmeler, fabrikalar ve düzenlemeye tabi sektörler için terzi işi çözümler üretiyoruz: on-premise kurulum, özel entegrasyonlar, ayrılmış altyapı.'}
            </p>

            <ul
              style={{
                marginTop: 40,
                padding: 0,
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 12,
              }}
            >
              {[
                isEnglish ? 'On-premise deployment & data sovereignty' : 'On-premise kurulum & veri egemenliği',
                isEnglish ? 'Unlimited integrations (SAP, Nebim, Logo, custom ERP)' : 'Sınırsız entegrasyon (SAP, Nebim, Logo, özel ERP)',
                isEnglish ? '24/7 priority support with named engineer' : '7/24 öncelikli destek, atanmış mühendis',
                isEnglish ? 'Custom AI training on your corpus' : 'Kendi veri setinizle özel AI eğitimi',
                isEnglish ? 'Single sign-on (SSO) & audit logs' : 'Tek oturum (SSO) & denetim logları',
                isEnglish ? 'Volume pricing & committed-use discounts' : 'Hacim indirimi & taahhütlü kullanım fiyatı',
              ].map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: 16,
                    background: 'var(--coal-2)',
                    border: '1px solid var(--coal-3)',
                    borderRadius: 'var(--r-md)',
                    fontSize: 14,
                    color: 'var(--bone)',
                    lineHeight: 1.45,
                  }}
                >
                  <Check size={14} style={{ marginTop: 3, flexShrink: 0, color: 'var(--ember)' }} />
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
              className="btn btn-primary btn-lg"
              style={{ marginTop: 36 }}
            >
              {isEnglish ? 'Talk to a project consultant' : 'Proje danışmanıyla görüş'}
              <ArrowUpRight size={16} />
            </a>

            <p
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--bone-3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {WHATSAPP_LABEL}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
