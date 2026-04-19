import { Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onAnalysisClick: () => void;
}

export function FoundersBet({ onAnalysisClick }: Props) {
  const { language } = useLanguage();

  const pledges =
    language === 'tr'
      ? [
          {
            h: 'İlk 30 gün ücretsiz deneyin',
            p: 'Asistan çalışmazsa, sonuç göremezseniz — hiçbir şey ödemezsiniz. Sistem sizde kalır.',
          },
          {
            h: 'Sabit fiyat, yazılı kapsam',
            p: 'Her iş yazılı sözleşme ile. Sürpriz fatura yok, saat bazlı gizli ücret yok.',
          },
          {
            h: 'Aylık çıkış hakkınız',
            p: 'Beğenmezseniz bir sonraki ay biter. Verileriniz ve kurulumunuz size teslim edilir.',
          },
        ]
      : [
          {
            h: 'First 30 days free',
            p: 'If the assistant doesn’t work or you don’t see results — you pay nothing. You keep the system.',
          },
          {
            h: 'Fixed price, written scope',
            p: 'Every engagement is contracted. No surprise invoices, no hidden hourly fees.',
          },
          {
            h: 'Monthly exit right',
            p: 'Not happy? Cancel at the end of the next month. Your data and setup are handed over.',
          },
        ];

  return (
    <section
      style={{
        background: 'var(--paper)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 48,
            alignItems: 'start',
          }}
          className="founders-grid"
        >
          <div>
            <span className="eyebrow">{language === 'tr' ? 'SÖZÜMÜZ' : 'OUR PROMISE'}</span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--t-h2)',
                lineHeight: 'var(--lh-tight)',
                letterSpacing: 'var(--ls-snug)',
                fontWeight: 600,
                color: 'var(--ink)',
                maxWidth: 520,
              }}
            >
              {language === 'tr' ? (
                <>
                  Risk bizde.{' '}
                  <span style={{ color: 'var(--ember)' }}>Kazanç sizde.</span>
                </>
              ) : (
                <>
                  We take the risk. <span style={{ color: 'var(--ember)' }}>You keep the upside.</span>
                </>
              )}
            </h2>
            <p style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 520, lineHeight: 1.6 }}>
              {language === 'tr'
                ? 'Yeni bir şirketiz; küçük ama net kurallarla çalışıyoruz. Çünkü danışanlarımızdan güven ile birlikte gerçek sonuç da bekliyoruz.'
                : 'We’re a new firm, and we work by small but clear rules. Because we expect real outcomes — not just trust — from every engagement.'}
            </p>

            <div style={{ marginTop: 32 }}>
              <button onClick={onAnalysisClick} className="btn btn-primary btn-lg">
                {language === 'tr' ? '15 dk analiz al' : 'Book the 15-min audit'}
              </button>
            </div>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {pledges.map((pl, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 20,
                  padding: '20px 0',
                  borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--r-full)',
                    background: 'var(--ember-soft)',
                    color: 'var(--ember-ink)',
                    flexShrink: 0,
                  }}
                >
                  <Check size={18} strokeWidth={2.5} />
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {pl.h}
                  </h3>
                  <p style={{ color: 'var(--fg-2)', margin: '8px 0 0', lineHeight: 1.55 }}>{pl.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @media (min-width: 960px) {
            .founders-grid { grid-template-columns: 1fr 1.1fr !important; gap: 96px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
