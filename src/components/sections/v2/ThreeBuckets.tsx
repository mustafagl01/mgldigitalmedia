import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onAdsClick: () => void;
  onAgentsClick: () => void;
  onWebClick: () => void;
  onServicesClick: () => void;
}

type BucketKind = 'ads' | 'agents' | 'web';

type Bucket = {
  num: string;
  kind: BucketKind;
  title: string;
  body: string;
  lines: string[];
  cta: string;
  highlight?: boolean;
};

export function ThreeBuckets({ onAdsClick, onAgentsClick, onWebClick, onServicesClick }: Props) {
  const { language } = useLanguage();

  const buckets: Bucket[] =
    language === 'tr'
      ? [
          {
            num: '01',
            kind: 'ads',
            title: 'AI Reklam',
            body: 'Meta ve Google reklamlarınızı AI karar katmanıyla yönetiyoruz. Günlük optimizasyon, düzenli kreatif rotasyonu, şeffaf rapor.',
            lines: [
              'Hibrit model: yönetim + performans payı',
              'Kreatif üretim dahil',
              'Haftalık canlı rapor',
            ],
            cta: 'Reklam paketleri',
          },
          {
            num: '02',
            kind: 'agents',
            title: 'AI Agent & Otomasyon',
            body: 'WhatsApp, sesli asistan ve e-posta için 7/24 çalışan AI asistanlar. Randevu alır, satışa hazırlar, ekibinizi rutinden kurtarır.',
            lines: [
              'WhatsApp + telefon + e-posta',
              'CRM ve takvim entegrasyonu',
              '30+ dilde doğal konuşma',
            ],
            cta: 'Agent paketleri',
            highlight: true,
          },
          {
            num: '03',
            kind: 'web',
            title: 'Dönüşüm Odaklı Web',
            body: 'Güzel görünen değil; satan, randevu aldıran, ölçülebilir siteler. Hızlı, SEO-hazır, reklamla tam uyumlu.',
            lines: [
              'Next.js / Astro performansı',
              'Dönüşüm testi dahil',
              'Bakım + barındırma',
            ],
            cta: 'Web paketleri',
          },
        ]
      : [
          {
            num: '01',
            kind: 'ads',
            title: 'AI Advertising',
            body: 'We run your Meta and Google ads with an AI decision layer. Daily optimisation, regular creative rotation, transparent reporting.',
            lines: ['Hybrid management + performance model', 'Creative production included', 'Weekly live reporting'],
            cta: 'See ad packages',
          },
          {
            num: '02',
            kind: 'agents',
            title: 'AI Agents & Automation',
            body: 'Always-on AI assistants for WhatsApp, voice and email. They book appointments, qualify leads, and free your team from repetitive work.',
            lines: ['WhatsApp + phone + email', 'CRM and calendar integration', '30+ languages, native-sounding'],
            cta: 'See agent packages',
            highlight: true,
          },
          {
            num: '03',
            kind: 'web',
            title: 'Conversion-first Web',
            body: 'Not pretty — profitable. Websites that sell, book meetings, and measure every step. Fast, SEO-ready, fully aligned with ads.',
            lines: ['Next.js / Astro performance', 'Conversion testing included', 'Hosting + maintenance'],
            cta: 'See web packages',
          },
        ];

  const handlerFor = (kind: BucketKind) => {
    if (kind === 'ads') return onAdsClick;
    if (kind === 'web') return onWebClick;
    return onAgentsClick;
  };

  return (
    <section
      id="services"
      style={{
        background: 'var(--paper)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
      }}
    >
      <div className="container">
        <div className="section-head" style={{ maxWidth: 780 }}>
          <span className="eyebrow">{language === 'tr' ? 'ÜÇ KALDIRACINIZ' : 'YOUR THREE LEVERS'}</span>
          <h2
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--t-h2)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-snug)',
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            {language === 'tr'
              ? 'Reklam, agent, web. Birbirinin eksiğini tamamlayan üç sistem.'
              : 'Advertising, agents, web. Three systems that cover each other’s gaps.'}
          </h2>
          <p
            className="lede"
            style={{ marginTop: 16, color: 'var(--fg-2)' }}
          >
            {language === 'tr'
              ? '11 ayrı servisi üç anlaşılır akışa indirdik. İhtiyacınız olan yerden başlayın; gerisini zamanla birleştirelim.'
              : 'We compressed 11 separate services into three clear tracks. Start wherever you need; we can connect the rest over time.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            marginTop: 48,
          }}
        >
          {buckets.map((b) => {
            const isHighlight = b.highlight;
            return (
              <article
                key={b.num}
                className={isHighlight ? 'on-coal' : ''}
                style={{
                  background: isHighlight ? 'var(--coal)' : 'var(--paper-2)',
                  color: isHighlight ? 'var(--bone)' : 'var(--ink)',
                  border: `1px solid ${isHighlight ? 'var(--coal-3)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-lg)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'transform 200ms var(--ease-out), border-color 200ms',
                  minHeight: 360,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isHighlight ? 'var(--ember)' : 'var(--fg-3)',
                      fontWeight: 500,
                    }}
                  >
                    / {b.num}
                  </span>
                  {isHighlight && (
                    <span className="badge" style={{ background: 'var(--ember)', color: 'var(--paper)' }}>
                      {language === 'tr' ? 'En çok seçilen' : 'Most chosen'}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 1rem + 0.8vw, 1.875rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: isHighlight ? 'var(--bone)' : 'var(--ink)',
                    margin: 0,
                  }}
                >
                  {b.title}
                </h3>

                <p
                  style={{
                    color: isHighlight ? 'var(--bone-2)' : 'var(--fg-2)',
                    lineHeight: 1.55,
                    margin: 0,
                    fontSize: '1rem',
                  }}
                >
                  {b.body}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '4px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {b.lines.map((line, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        letterSpacing: '0.02em',
                        color: isHighlight ? 'var(--bone-2)' : 'var(--fg-2)',
                        paddingLeft: 14,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 8,
                          width: 6,
                          height: 1,
                          background: 'var(--ember)',
                        }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handlerFor(b.kind)}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 14,
                    color: isHighlight ? 'var(--bone)' : 'var(--ink)',
                    borderBottom: `1px solid ${isHighlight ? 'var(--bone-3)' : 'var(--ink)'}`,
                    paddingBottom: 2,
                    background: 'transparent',
                    alignSelf: 'flex-start',
                    transition: 'color 120ms, border-color 120ms',
                  }}
                >
                  {b.cta}
                  <ArrowUpRight size={14} />
                </button>
              </article>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 32,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button onClick={onServicesClick} className="btn-link">
            {language === 'tr' ? '11 servisin tamamını gör' : 'See all 11 services'}
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
