import { useLanguage } from '../contexts/LanguageContext';
import {
  Seo,
  BASE_SCHEMAS,
  breadcrumbSchema,
  faqSchema,
  aboutPageSchema,
  howToSchema,
  solutionSchema,
  webPageSchema,
} from '../components/seo/Seo';
import { SOLUTIONS, type SectorKey } from '../config/solutions';
import { MessageCircle, Calendar, ArrowRight, Check } from 'lucide-react';

const WHATSAPP_NUMBER = '905318299701';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Props = {
  sectorKey: SectorKey;
};

export default function SolutionDetail({ sectorKey }: Props) {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const lang = (x: { tr: string; en: string }) => (isEN ? x.en : x.tr);
  const langArr = (x: { tr: string[]; en: string[] }) => (isEN ? x.en : x.tr);

  const sector = SOLUTIONS[sectorKey];
  const path = `/solutions/${sector.slug}`;
  const displayName = lang(sector.displayName);

  const waMessage = isEN
    ? `Hi, I'd like a discovery call about ${displayName} automation.`
    : `Merhaba, ${displayName} için kurulumu konuşmak istiyorum.`;

  const jsonLd = [
    ...BASE_SCHEMAS,
    breadcrumbSchema([
      { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: isEN ? 'Solutions' : 'Çözümler', path: '/solutions' },
      { name: displayName, path },
    ]),
    webPageSchema({
      path,
      title: lang(sector.metaTitle),
      description: lang(sector.metaDescription),
      inLanguage: isEN ? 'en-GB' : 'tr-TR',
      primaryTopic: displayName,
    }),
    aboutPageSchema({
      path,
      headline: lang(sector.heroTitle),
      summary: lang(sector.heroAnswer),
      inLanguage: isEN ? 'en-GB' : 'tr-TR',
    }),
    solutionSchema({
      name: lang(sector.metaTitle),
      sector: displayName,
      problem: lang(sector.heroTitle),
      solution: lang(sector.heroAnswer),
      path,
    }),
    howToSchema({
      name: isEN
        ? `How MGL AI sets up ${displayName} automation`
        : `MGL AI ${displayName} otomasyonunu nasıl kurar`,
      description: lang(sector.heroAnswer),
      path,
      steps: sector.howItWorks.map((s) => ({
        name: lang(s.name),
        text: lang(s.desc),
      })),
    }),
    faqSchema(
      sector.faq.map((f) => ({
        question: lang(f.q),
        answer: lang(f.a),
      })),
    ),
  ];

  return (
    <>
      <Seo
        title={lang(sector.metaTitle)}
        description={lang(sector.metaDescription)}
        path={path}
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={langArr(sector.seoKeywords)}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(48px, 4vw + 16px, 80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">{lang(sector.emberBadge)}</span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {lang(sector.heroTitle)}
          </h1>
          <p
            className="lede"
            style={{
              marginTop: 24,
              color: 'var(--fg-1)',
              maxWidth: 720,
              fontSize: 'clamp(16px, 0.9rem + 0.3vw, 18px)',
              lineHeight: 1.65,
            }}
          >
            {lang(sector.heroAnswer)}
          </p>

          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={14} />
              {isEN ? 'WhatsApp us' : 'WhatsApp\'tan yazın'}
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <Calendar size={14} />
              {isEN ? 'Book 15-min discovery' : '15 dk keşif görüşmesi'}
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {sector.heroStats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 18px',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-3)',
                    marginBottom: 6,
                  }}
                >
                  {lang(stat.label)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {lang(stat.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN STRIP */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: 'clamp(64px, 5vw + 16px, 104px) 0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 1120 }}>
          <span className="eyebrow">{isEN ? 'PROBLEM' : 'SORUN'}</span>
          <h2
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: 'var(--ink)',
              maxWidth: 720,
            }}
          >
            {isEN
              ? `Six leaks a ${displayName.toLowerCase()} business lives with every day.`
              : `${displayName} işletmelerinin her gün yaşadığı 6 kayıp.`}
          </h2>

          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {sector.painPoints.map((p, i) => (
              <article
                key={i}
                style={{
                  padding: 22,
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: 'var(--ember)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'var(--ink)',
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {lang(p.pain)}
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--fg-3)',
                    letterSpacing: '0.04em',
                    marginTop: 'auto',
                    paddingTop: 10,
                    borderTop: '1px dashed var(--border)',
                  }}
                >
                  {lang(p.cost)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (coal) */}
      <section
        className="on-coal"
        style={{
          background: 'var(--coal)',
          padding: 'clamp(64px, 5vw + 24px, 112px) 0',
          color: 'var(--paper)',
        }}
      >
        <div className="container" style={{ maxWidth: 1120 }}>
          <span
            className="eyebrow"
            style={{ color: 'var(--ember)' }}
          >
            {isEN ? 'AUTOPILOT SYSTEM' : 'OTOPİLOT SİSTEM'}
          </span>
          <h2
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: 'var(--paper)',
              maxWidth: 720,
            }}
          >
            {isEN ? 'How MGL AI stops the leak' : 'MGL AI bu kaybı nasıl durdurur'}
          </h2>

          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {sector.howItWorks.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: 24,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(245,241,234,0.12)',
                  borderRadius: 'var(--r-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    color: 'var(--ember)',
                    textTransform: 'uppercase',
                  }}
                >
                  {`STEP ${i + 1}`}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    letterSpacing: '-0.02em',
                    fontWeight: 500,
                    margin: 0,
                    color: 'var(--paper)',
                  }}
                >
                  {lang(step.name)}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'rgba(245,241,234,0.75)',
                    margin: 0,
                  }}
                >
                  {lang(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED SERVICES */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 5vw + 16px, 104px) 0' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <span className="eyebrow">{isEN ? 'WHAT\'S INSIDE' : 'BUNUN İÇİNDE'}</span>
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
            {isEN ? 'The services that run the system' : 'Sistemi çalıştıran servisler'}
          </h2>

          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {sector.includedServices.map((svc) => (
              <a
                key={svc.skuKey}
                href={`/services#${svc.skuKey}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: 22,
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 180ms var(--ease-out)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} style={{ color: 'var(--ember)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 18,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {lang(svc.label)}
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>
                  {lang(svc.blurb)}
                </p>
                <span
                  style={{
                    marginTop: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--ember)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {isEN ? 'DETAIL' : 'DETAY'} <ArrowRight size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGE CTA BAND */}
      <section
        style={{
          background: 'var(--ember-soft, #F5E1D8)',
          padding: 'clamp(48px, 4vw + 16px, 80px) 0',
          borderTop: '1px solid var(--ember)',
          borderBottom: '1px solid var(--ember)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div>
              <span
                className="eyebrow"
                style={{ color: 'var(--ember)' }}
              >
                {isEN ? 'PACKAGE' : 'PAKET'}
              </span>
              <h3
                style={{
                  marginTop: 12,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 1rem + 1.2vw, 1.875rem)',
                  lineHeight: 1.2,
                  fontWeight: 500,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {lang(sector.packageCta)}
              </h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`/packages#${sector.recommendedPackage}`}
                className="btn btn-primary"
              >
                {isEN ? 'View package' : 'Paketi incele'} <ArrowRight size={14} />
              </a>
              <a href="/pricing" className="btn btn-ghost">
                {isEN ? 'See pricing' : 'Fiyatlandırma'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 16px, 104px) 0',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{isEN ? 'FAQ' : 'SIK SORULAN'}</span>
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
            {isEN
              ? `Questions from ${displayName.toLowerCase()} teams`
              : `${displayName} ekiplerinden gelen sorular`}
          </h2>

          <div style={{ marginTop: 32 }}>
            {sector.faq.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                  padding: '20px 0',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.2rem)',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.35,
                  }}
                >
                  <span>{lang(faq.q)}</span>
                  <span style={{ color: 'var(--ember)', fontSize: 20 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: 12,
                    paddingRight: 34,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--fg-2)',
                  }}
                >
                  {lang(faq.a)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA (coal) */}
      <section
        className="on-coal"
        style={{
          background: 'var(--coal)',
          padding: 'clamp(72px, 6vw + 24px, 128px) 0',
          color: 'var(--paper)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: 'var(--paper)',
              margin: 0,
            }}
          >
            {isEN ? 'Want to see it running?' : 'Çalışırken görmek ister misiniz?'}
          </h2>
          <p
            style={{
              marginTop: 20,
              maxWidth: 560,
              marginInline: 'auto',
              color: 'rgba(245,241,234,0.75)',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            {isEN
              ? 'Book 15 minutes — we map your leak, show you a similar system in action, and you decide whether to pilot.'
              : '15 dakikada darboğazınızı çıkarırız, benzer sistemin çalışan örneğini gösteririz, pilot kararı sizde kalır.'}
          </p>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={14} />
              {isEN ? 'WhatsApp us' : 'WhatsApp\'tan yazın'}
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <Calendar size={14} />
              {isEN ? 'Book discovery' : 'Görüşme planla'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
