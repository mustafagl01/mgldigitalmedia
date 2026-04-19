import { ArrowUpRight, Play } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { HeroBackdrop } from '../../site/HeroBackdrop';

interface Props {
  onAnalysisClick: () => void;
  onDemoClick: () => void;
}

export function HeroV2({ onAnalysisClick, onDemoClick }: Props) {
  const { language } = useLanguage();

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        padding: 'clamp(64px, 6vw + 24px, 128px) 0 clamp(48px, 4vw + 24px, 96px)',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      {/* Fine dot-grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14, 14, 12, 0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Animated sine-wave backdrop — ember, breathing, mouse-parallax */}
      <HeroBackdrop />

      <div className="container hero-grid" style={{ position: 'relative' }}>
        <div>
        {/* Eyebrow row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}
          className="animate-fade-in"
        >
          <span className="eyebrow">
            {language === 'tr' ? 'LONDRA MERKEZLİ · AI & OTOMASYON AJANSI' : 'LONDON-BASED · AI & AUTOMATION AGENCY'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span className="dot-live" />
            {language === 'tr' ? 'Şu an yeni proje alıyoruz' : 'Taking new projects now'}
          </span>
        </div>

        {/* Headline */}
        <div className="animate-fade-up">
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 1.2rem + 5vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: 0,
              textWrap: 'balance',
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
            }}
          >
            {language === 'tr' ? (
              <>
                Operasyonel{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>yüklerinizi</span>{' '}
                otomatize ederiz.
                <br />
                Siz sadece <span style={{ color: 'var(--ember)' }}>büyümeye</span> odaklanırsınız.
              </>
            ) : (
              <>
                We automate your operational{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>load</span>.
                <br />
                You focus only on <span style={{ color: 'var(--ember)' }}>growth</span>.
              </>
            )}
          </h1>

          <p
            className="lede"
            style={{
              marginTop: 28,
              color: 'var(--fg-2)',
              fontSize: 'clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem)',
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            {language === 'tr'
              ? 'AI asistanlardan Meta/Google reklamlarına, n8n otomasyonundan dönüştüren web ve SEO\'ya — bir işletmenin tüm dijital motorlarını tek ekipten, tek sistemden kuruyoruz. Biz kurarız, sistem çalıştırır.'
              : 'From AI assistants to Meta/Google ads, n8n automation to conversion-first web and SEO — we build every digital motor your business runs on from one team, one system. We build it. The system runs it.'}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 40,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <button onClick={onAnalysisClick} className="btn btn-primary btn-lg">
              {language === 'tr' ? 'Ücretsiz 15 dk analiz' : 'Free 15-min audit'}
              <ArrowUpRight size={18} />
            </button>
            <button onClick={onDemoClick} className="btn btn-ghost btn-lg">
              <Play size={16} style={{ marginRight: 2 }} />
              {language === 'tr' ? 'Sesli asistanı ara' : 'Call the voice agent'}
            </button>
          </div>

          {/* Transparency strip — honest pledge, no fake metrics */}
          <div
            style={{
              marginTop: 28,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--fg-3)',
              letterSpacing: '0.04em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 18px',
              alignItems: 'center',
            }}
          >
            <span>
              {language === 'tr' ? 'Kurulum bizden' : 'Setup on us'}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {language === 'tr' ? 'Aylık çıkış hakkı' : 'Monthly cancellation'}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {language === 'tr' ? 'UK Ltd. sözleşmesi' : 'UK Ltd. contract'}
            </span>
          </div>
        </div>
        </div>

        {/* Right column — Editorial System Artifact (desktop ≥1024px only) */}
        <aside
          className="hero-artifact animate-fade-up"
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ember)',
              paddingBottom: 10,
              borderBottom: '1px solid rgba(188, 59, 21, 0.22)',
              marginBottom: 28,
            }}
          >
            {language === 'tr' ? 'SİSTEM KANITI' : 'SYSTEM PROOF'}
          </div>

          {/* WhatsApp-style bubble — brand-native palette, no WhatsApp green */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.55)',
              border: '1px solid rgba(14, 14, 12, 0.08)',
              borderLeft: '3px solid var(--ember)',
              borderRadius: 14,
              padding: '18px 20px',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                color: 'var(--fg-3)',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              14:02 · {language === 'tr' ? 'Asistan' : 'Agent'}
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.5,
                color: 'var(--ink)',
              }}
            >
              {language === 'tr'
                ? 'Merhaba Ayşe Hanım, cuma 15:00 uygun. Onaylıyor musunuz?'
                : 'Hi Alice, Friday 3 pm works. Shall I confirm?'}
            </div>
          </div>

          {/* Trace lines */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              lineHeight: 1.9,
              color: 'var(--fg-3)',
              paddingLeft: 2,
              marginBottom: 24,
            }}
          >
            <div>
              <span style={{ color: 'var(--ember)' }}>›</span> agent.n8n.webhook
              <span style={{ opacity: 0.5 }}> → 14:02:08</span>
            </div>
            <div>
              <span style={{ color: 'var(--ember)' }}>›</span> lead.sentiment
              <span style={{ opacity: 0.5 }}> → ok</span>
            </div>
            <div>
              <span style={{ color: 'var(--ember)' }}>›</span> message.delivered
              <span style={{ opacity: 0.5 }}> → seen</span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: 'rgba(14, 14, 12, 0.1)',
              marginBottom: 18,
              maxWidth: 120,
            }}
          />

          {/* Italic tagline */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 18,
              lineHeight: 1.45,
              color: 'var(--fg-2)',
              margin: 0,
              fontWeight: 400,
            }}
          >
            {language === 'tr'
              ? 'Bu mesajı bir insan yazmadı. Sistem yazdı, onay sizde kaldı.'
              : "A human didn't write this. The system did — the approval stayed with you."}
          </p>
        </aside>
      </div>
    </section>
  );
}
