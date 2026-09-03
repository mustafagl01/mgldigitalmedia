import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onAnalysisClick: () => void;
}

export function ClosingCTA({ onAnalysisClick }: Props) {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    window.open('https://wa.me/447482670606', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      style={{
        background: 'var(--paper-2)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
          maxWidth: 820,
        }}
      >
        <span className="eyebrow">{language === 'tr' ? 'BAŞLAMAYA HAZIR' : 'READY TO START'}</span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 600,
            color: 'var(--ink)',
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {language === 'tr' ? (
            <>
              15 dakikada{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                nerede talep kaçırdığınızı
              </span>{' '}
              birlikte çıkaralım.
            </>
          ) : (
            <>
              In 15 minutes, let’s map{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                where enquiries are being lost.
              </span>
            </>
          )}
        </h2>

        <p style={{ color: 'var(--fg-2)', fontSize: '1.125rem', lineHeight: 1.55, maxWidth: 620 }}>
          {language === 'tr'
            ? 'Kart bilgisi ve taahhüt istemiyoruz. Mevcut akışınızı dinler, otomasyonun gerçekten yararlı olacağı bir sonraki adımı söyleriz.'
            : 'No card and no commitment. We listen to your current process and identify the next step where automation would genuinely help.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 8 }}>
          <button type="button" onClick={onAnalysisClick} className="btn btn-primary btn-lg">
            {language === 'tr' ? 'Ücretsiz analiz alın' : 'Book the free audit'}
          </button>
          <button onClick={handleWhatsApp} className="btn btn-ghost btn-lg">
            WhatsApp
          </button>
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            letterSpacing: '0.04em',
          }}
        >
          info@mgldigitalmedia.com · +44 7414 605612
        </div>
      </div>
    </section>
  );
}
