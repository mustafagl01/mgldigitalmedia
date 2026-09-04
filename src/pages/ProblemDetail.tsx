import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Seo,
  BASE_SCHEMAS,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  solutionSchema,
  webPageSchema,
} from '../components/seo/Seo';
import { PROBLEMS, type Problem } from '../config/problems';

const WHATSAPP_NUMBER = '447482670606';

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Props = { slug: string };

/**
 * "Sorunlar" sayfası — mglautomation.uk'ten taşınan problem sayfaları için
 * tek şablon. PLAN.md bölüm 4: bu sayfalar mgl-ai.com'da karşılığı olmayan,
 * gerçek arama sorgularına doğrudan cevap veren en değerli içerik.
 *
 * Ton kuralı SolutionDetail.tsx ile aynı: "cevap-önce" — ilk cümle tek
 * başına anlamlı olmalı, GEO'nun aradığı alıntılanabilir cümle budur.
 */
export default function ProblemDetail({ slug }: Props) {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const lang = (x: { tr: string; en: string }) => (isEN ? x.en : x.tr);
  const langArr = (x: { tr: string[]; en: string[] }) => (isEN ? x.en : x.tr);

  const problem: Problem = PROBLEMS[slug];
  const path = `/sorunlar/${problem.slug}`;
  const heroTitle = lang(problem.heroTitle);

  const waMessage = isEN
    ? `Hi, I'd like to talk about: ${heroTitle}`
    : `Merhaba, "${heroTitle}" hakkında konuşmak istiyorum.`;

  const jsonLd = [
    ...BASE_SCHEMAS,
    breadcrumbSchema([
      { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: isEN ? 'Automation' : 'Otomasyon', path: '/n8n-otomasyon' },
      { name: heroTitle, path },
    ]),
    webPageSchema({
      path,
      title: lang(problem.metaTitle),
      description: lang(problem.metaDescription),
      inLanguage: isEN ? 'en-GB' : 'tr-TR',
      primaryTopic: heroTitle,
    }),
    solutionSchema({
      name: lang(problem.metaTitle),
      sector: isEN ? 'Business automation' : 'İşletme otomasyonu',
      problem: langArr(problem.painPoints)[0] ?? '',
      solution: lang(problem.heroAnswer),
      path,
    }),
    howToSchema({
      name: isEN ? `How MGL AI solves: ${heroTitle}` : `MGL AI ${heroTitle} sorununu nasıl çözer`,
      description: lang(problem.heroAnswer),
      path,
      steps: problem.steps.map((s) => ({ name: lang(s.name), text: lang(s.desc) })),
    }),
    faqSchema(problem.faq.map((f) => ({ question: lang(f.q), answer: lang(f.a) }))),
  ];

  return (
    <>
      <Seo
        title={lang(problem.metaTitle)}
        description={lang(problem.metaDescription)}
        path={path}
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={langArr(problem.seoKeywords)}
        jsonLd={jsonLd}
      />

      {/* HERO — cevap-önce: ilk cümle tek başına anlamlı olmalı */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(48px, 4vw + 16px, 80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow">{lang(problem.eyebrow)}</span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 1.1rem + 3.2vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {heroTitle}
          </h1>
          <p
            className="lede"
            style={{
              marginTop: 22,
              color: 'var(--fg-2)',
              maxWidth: 680,
              fontSize: 'clamp(16px, 0.9rem + 0.3vw, 18px)',
              lineHeight: 1.65,
            }}
          >
            {lang(problem.heroAnswer)}
          </p>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href={waLink(waMessage)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={14} />
              {isEN ? 'Ask on WhatsApp' : 'WhatsApp\'tan sor'}
            </a>
            <a href="/packages#systems" className="btn btn-ghost">
              {isEN ? 'See pricing' : 'Fiyatları gör'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* SORUN */}
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 className="h3">{isEN ? 'What this fixes' : 'Bu sistem hangi sorunu çözer?'}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'grid', gap: 10 }}>
            {langArr(problem.painPoints).map((p) => (
              <li key={p} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg-2)' }}>
                <span style={{ color: 'var(--ember)', flex: 'none' }}>—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* İŞ AKIŞI */}
      <section className="section-tight" style={{ background: 'var(--paper-2)' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 className="h3">{isEN ? 'How it works' : 'İş akışı nasıl çalışır?'}</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 16 }}>
            {problem.steps.map((s, i) => (
              <li key={s.name.tr} style={{ display: 'flex', gap: 14 }}>
                <span
                  style={{
                    flex: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--ember)',
                    paddingTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <strong style={{ fontSize: 15 }}>{lang(s.name)}</strong>
                  <p style={{ marginTop: 4, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)' }}>{lang(s.desc)}</p>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 18, fontSize: 13, color: 'var(--fg-3)' }}>
            {isEN
              ? 'Approval points and rules are agreed to fit your process before launch.'
              : 'Onay noktaları ve kurallar, canlıya almadan önce sizin sürecinize göre birlikte belirlenir.'}
          </p>
        </div>
      </section>

      {/* ARAÇLAR */}
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 className="h3">{isEN ? 'Connects with' : 'Bağlanabilen araçlar'}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {langArr(problem.tools).map((t) => (
              <li
                key={t}
                style={{
                  fontSize: 13,
                  color: 'var(--fg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-full)',
                  padding: '6px 14px',
                  background: 'var(--paper-2)',
                }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FİYAT */}
      <section className="section-tight" style={{ background: 'var(--paper-2)' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 className="h3">{isEN ? 'Pricing' : 'Fiyat'}</h2>
          <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 620 }}>
            {isEN
              ? 'This is built as part of the automation system: a one-off setup plus low monthly maintenance covering hosting, monitoring and incident response.'
              : 'Bu, otomasyon sisteminin bir parçası olarak kurulur: tek seferlik kurulum ve barındırma, izleme, arıza müdahalesini kapsayan düşük bir aylık bakım bedeli.'}
          </p>
          <a href="/packages#systems" className="btn btn-primary" style={{ marginTop: 16 }}>
            {isEN ? 'See automation pricing' : 'Otomasyon fiyatlarını gör'}
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* SSS */}
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 className="h3">{isEN ? 'Frequently asked questions' : 'Sık sorulan sorular'}</h2>
          <div style={{ marginTop: 20, display: 'grid', gap: 18 }}>
            {problem.faq.map((f) => (
              <div key={f.q.tr}>
                <strong style={{ fontSize: 15 }}>{lang(f.q)}</strong>
                <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>{lang(f.a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLGİLİ */}
      {problem.relatedSlugs.length > 0 && (
        <section className="section-tight" style={{ background: 'var(--paper-2)' }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <h2 className="h3">{isEN ? 'Related' : 'İlgili çözümler'}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
              {problem.relatedSlugs.map((rs) => {
                const rel = PROBLEMS[rs];
                if (!rel) return null;
                return (
                  <li key={rs}>
                    <a
                      href={`/sorunlar/${rs}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 14.5,
                        color: 'var(--ink)',
                        textDecoration: 'none',
                      }}
                    >
                      <Check size={14} style={{ color: 'var(--ember)' }} />
                      {lang(rel.heroTitle)}
                      <ArrowRight size={13} style={{ color: 'var(--fg-3)' }} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
