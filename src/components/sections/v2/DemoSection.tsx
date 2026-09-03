import { Phone, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Props {
  onEmailDemo: () => void;
  onPhoneDemo: () => void;
}

const DEMO_PHONE = '+44 7414 605612';
const WHATSAPP_LINK = 'https://wa.me/447482670606';

export function DemoSection({ onEmailDemo, onPhoneDemo }: Props) {
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
              ? 'Aşağıdaki numara gerçekten çalışan bir asistan. Arayın, soru sorun, zorlayın. Kart yok, kayıt yok.'
              : 'The number below is a working assistant. Call it, ask it things, push it. No card, no signup.'}
          </p>

          {/* Gerçek bir işten çıkan hikâye. Teknik anlatım yerine çözülen
              sorun: saç ekimi hastalarının çoğu yurt dışından ve İngilizcesi
              zayıf — kendi dilinde konuşabilmek gerçek bir engeli kaldırıyor. */}
          <div
            style={{
              marginTop: 28,
              padding: '20px 22px',
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--ember)',
              borderRadius: 'var(--r-lg)',
              maxWidth: 680,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ember)',
                marginBottom: 10,
              }}
            >
              {language === 'tr' ? 'BİR SAÇ EKİMİ KLİNİĞİNDE' : 'AT A HAIR CLINIC'}
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)' }}>
              {language === 'tr'
                ? 'Hastaların çoğu yurt dışından geliyor ve İngilizcesi yetmiyor. Sitedeki asistan onlarla kendi dillerinde konuşuyor: fotoğrafını gönderiyor, ne yapılabileceğini soruyor, cevabını gece yarısı bile alıyor. Klinik sabah sadece ciddi olanlara bakıyor.'
                : 'Most patients come from abroad and their English runs out fast. The assistant on the site talks to them in their own language: they send a photo, ask what can be done, and get an answer even at midnight. In the morning the clinic only deals with the serious ones.'}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {/* PHONE — primary */}
          <button
            onClick={onPhoneDemo}
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
                  ? 'Numaranızı girin, asistan sizi arasın. Sorularınızı yanıtlar ve talebinizi ekibimize iletir.'
                  : 'Enter your number and get called back. The agent answers questions and passes your request to our team.'}
              </p>
            </div>
          </button>

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
                  fontSize: 'clamp(1.25rem, 0.9rem + 1vw, 1.6rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                }}
              >
                {language === 'tr' ? '+44 7482 670606' : 'Chat on WhatsApp'}
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
                  fontSize: 'clamp(1.125rem, 0.85rem + 0.9vw, 1.5rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                }}
              >
                info@mgldigitalmedia.com
              </div>
              <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>
                {language === 'tr'
                  ? 'Bir örnek yazışma görün: asistanın dil tonu, soru-cevap akışı, hatırlatma örnekleri.'
                  : 'See a sample thread: AI tone, booking flow, reminder examples.'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
