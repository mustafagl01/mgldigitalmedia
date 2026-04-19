import { useLanguage } from '../../../contexts/LanguageContext';

export function ProcessTimeline() {
  const { language } = useLanguage();

  const steps =
    language === 'tr'
      ? [
          {
            day: 'Gün 01',
            title: 'Keşif & plan',
            body:
              'Ücretsiz 15 dk analiz, veri akışlarınızı çıkarırız. Aynı gün: yazılı kapsam, net süre, net fiyat.',
          },
          {
            day: 'Gün 02 – 03',
            title: 'Yap & test et',
            body:
              'Asistan, entegrasyon, içerik. Günlük canlı ilerleme. Sizinle birlikte test ederiz; onayınız olmadan canlıya almayız.',
          },
          {
            day: 'Gün 04+',
            title: 'Yayın & iyileşim',
            body:
              'Canlıya alırız, ilk haftalık raporu sunarız. Sonra her ay: metrik, iyileştirme önerisi, yeni akış.',
          },
        ]
      : [
          {
            day: 'Day 01',
            title: 'Discover & plan',
            body:
              'Free 15-min audit, data-flow mapping. Same day you get written scope, clear timeline, clear price.',
          },
          {
            day: 'Day 02 – 03',
            title: 'Build & test',
            body:
              'Assistant, integrations, content. Daily visible progress. We test with you; nothing goes live without your sign-off.',
          },
          {
            day: 'Day 04+',
            title: 'Launch & improve',
            body:
              'We ship and hand over the first weekly report. Then monthly: metrics, improvement proposal, new flow.',
          },
        ];

  return (
    <section
      id="process"
      style={{
        background: 'var(--paper-2)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
        borderBlock: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div className="section-head" style={{ maxWidth: 780 }}>
          <span className="eyebrow">{language === 'tr' ? 'SÜREÇ' : 'PROCESS'}</span>
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
              ? 'Üç günde canlıda. Üç adımda.'
              : 'Live in three days. Three steps.'}
          </h2>
          <p className="lede" style={{ marginTop: 16, color: 'var(--fg-2)' }}>
            {language === 'tr'
              ? 'Ajans jargonu yok. Saatlerce toplantı yok. Her aşamada ne olduğunu görürsünüz.'
              : 'No agency jargon. No endless meetings. You see every step as it happens.'}
          </p>
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                padding: '28px 28px 28px 0',
                borderTop: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--r-full)',
                  background: 'var(--ember)',
                  color: 'var(--paper)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: -16,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {i + 1}
              </span>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--fg-3)',
                  marginTop: 16,
                }}
              >
                {s.day}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 1rem + 0.5vw, 1.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  margin: '8px 0 12px',
                  lineHeight: 1.15,
                }}
              >
                {s.title}
              </h3>

              <p style={{ color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
