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
      className="on-coal"
      style={{
        background: 'var(--coal)',
        color: 'var(--bone)',
        padding: 'clamp(80px, 6vw + 32px, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle dot pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(245,241,234,0.04) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <span className="eyebrow" style={{ color: 'var(--bone-3)' }}>
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
              color: 'var(--bone)',
            }}
          >
            {language === 'tr'
              ? 'Okumak yerine, gerçekten konuşun.'
              : 'Don’t just read — talk to one right now.'}
          </h2>
          <p className="lede" style={{ marginTop: 16, color: 'var(--bone-2)' }}>
            {language === 'tr'
              ? 'Aşağıdaki numara bir AI asistanın canlı demosudur. Bir randevu ayarlamayı deneyin, saatlerce dinleyin. Hiçbir kart, hiçbir kayıt gerekmez.'
              : 'The number below is an AI assistant live demo. Try booking an appointment, grill it as long as you like. No card, no signup.'}
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
              background: 'var(--coal-2)',
              border: '1px solid var(--coal-3)',
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
                  color: 'var(--bone-3)',
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
                  color: 'var(--bone)',
                  lineHeight: 1.1,
                }}
              >
                {DEMO_PHONE}
              </div>
              <p style={{ marginTop: 12, color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.55 }}>
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
              background: 'var(--coal-2)',
              border: '1px solid var(--coal-3)',
              borderRadius: 'var(--r-lg)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <MessageCircle size={20} style={{ color: 'var(--bone)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--bone-3)',
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
                  color: 'var(--bone)',
                  lineHeight: 1.1,
                }}
              >
                +90 531 829 97 01
              </div>
              <p style={{ marginTop: 12, color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.55 }}>
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
              background: 'var(--coal-2)',
              border: '1px solid var(--coal-3)',
              borderRadius: 'var(--r-lg)',
              color: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Mail size={20} style={{ color: 'var(--bone)' }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--bone-3)',
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
                  color: 'var(--bone)',
                  lineHeight: 1.1,
                }}
              >
                info@mgldigitalmedia.com
              </div>
              <p style={{ marginTop: 12, color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.55 }}>
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
