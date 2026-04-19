import { Phone, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onEmailDemo: () => void;
}

const DEMO_PHONE = '+44 7414 605612';
const DEMO_PHONE_TEL = 'tel:+447414605612';
const WHATSAPP_LINK = 'https://wa.me/905318299701';

export function DemoSection({ onEmailDemo }: Props) {
  const { language } = useLanguage();

  return (
    <section
      id="demos"
      style={{
        background: 'var(--paper-2)',
        color: 'var(--ink)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* subtle dot pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(14,14,12,0.05) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <span className="eyebrow">
            {language === 'tr' ? 'CANLI DEMO' : 'LIVE DEMO'}
          </span>
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
              ? 'Okumak yerine, bir tanesiyle konuşun.'
              : 'Don’t just read — talk to one right now.'}
          </h2>
          <p className="lede" style={{ marginTop: 16, color: 'var(--fg-2)' }}>
            {language === 'tr'
              ? 'Aşağıdaki numara bir AI asistanın canlı demosudur. Bir randevu ayarlayın, limitleri bizzat zorlayın. Hiçbir kart, hiçbir kayıt gerekmez.'
              : 'The number below is a live AI assistant demo. Try booking an appointment, push it to its limits. No card, no signup.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {/* PHONE — primary */}
          <a
            href={DEMO_PHONE_TEL}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: 32,
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 200ms, transform 200ms',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Phone size={20} style={{ color: 'var(--ember)' }} />
              <span
                className="badge"
                style={{ background: 'var(--ember)', color: 'var(--paper)', borderColor: 'transparent' }}
              >
                {language === 'tr' ? 'Canlı' : 'Live'}
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--fg-3)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {language === 'tr' ? 'SESLİ ASİSTAN' : 'VOICE AGENT'}
              </span>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 1rem + 1.2vw, 2rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                }}
              >
                {DEMO_PHONE}
              </div>
              <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                {language === 'tr'
                  ? 'Tıklayıp arayın. Asistan randevu alır, fiyat söyler, sizi geri arama kuyruğuna koyar.'
                  : 'Tap to call. The agent books, quotes, and schedules callbacks.'}
              </p>
            </div>
          </a>

          {/* WHATSAPP */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: 32,
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <MessageCircle size={20} style={{ color: 'var(--ink)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--fg-3)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                WHATSAPP
              </span>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 1rem + 1.2vw, 2rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                }}
              >
                +90 531 829 97 01
              </div>
              <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                {language === 'tr'
                  ? 'Mustafa’ya doğrudan yazın. Analiz randevusu burada ayarlanır.'
                  : 'Message Mustafa directly. We set audit meetings here.'}
              </p>
            </div>
          </a>

          {/* EMAIL */}
          <button
            onClick={onEmailDemo}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: 32,
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              color: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Mail size={20} style={{ color: 'var(--ink)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--fg-3)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {language === 'tr' ? 'E-POSTA DEMO' : 'EMAIL DEMO'}
              </span>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 1rem + 1.2vw, 2rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                }}
              >
                info@mgldigitalmedia.com
              </div>
              <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                {language === 'tr'
                  ? 'Bir örnek yazışma görün: AI asistanın dil tonu, randevu akışı, hatırlatma örnekleri.'
                  : 'See a sample thread: AI tone, booking flow, reminder examples.'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
