import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onAnalysisClick: () => void;
}

export function ClosingCTA({ onAnalysisClick }: Props) {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    window.open('https://wa.me/905318299701', '_blank', 'noopener,noreferrer');
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
              Bir telefon araması.{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                On beş dakika.
              </span>
              <br />
              İşleyişiniz bir daha asla aynı olmayabilir.
            </>
          ) : (
            <>
              One phone call.{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 500 }}>
                Fifteen minutes.
              </span>
              <br />
              Your operations may never feel the same.
            </>
          )}
        </h2>

        <p style={{ color: 'var(--fg-2)', fontSize: '1.125rem', lineHeight: 1.55, maxWidth: 620 }}>
          {language === 'tr'
            ? 'Hiçbir kart, hiçbir taahhüt. 15 dakikada; nerede zaman kaybettiğinizi, nerede para kaçtığını ve birkaç asistanın neyi değiştireceğini konuşuruz.'
            : 'No card, no commitment. In 15 minutes we show you where time is lost, where money leaks, and what a couple of assistants would change.'}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <button onClick={onAnalysisClick} className="btn btn-primary btn-lg">
            {language === 'tr' ? 'Ücretsiz analiz al' : 'Book the free audit'}
            <ArrowUpRight size={18} />
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
