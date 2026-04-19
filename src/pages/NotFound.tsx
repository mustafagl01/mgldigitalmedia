import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Seo } from '../components/seo/Seo';

interface Props {
  onHome: () => void;
}

export default function NotFound({ onHome }: Props) {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const seoTitle = isEN
    ? 'Page not found · 404 | MGL Digital Media'
    : 'Sayfa bulunamadı · 404 | MGL Digital Media';
  const seoDescription = isEN
    ? 'The page you are looking for does not exist. Head back to the homepage.'
    : 'Aradığınız sayfa bulunamadı. Ana sayfaya dönün.';

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/404"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        noindex
      />

      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(96px, 8vw + 24px, 160px) 0 clamp(64px, 4vw + 24px, 120px)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <span
            className="eyebrow"
            style={{ color: 'var(--ember)' }}
          >
            {isEN ? 'ERROR · 404' : 'HATA · 404'}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 1.2rem + 4vw, 4.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEN ? 'This page does not exist.' : 'Bu sayfa bulunamadı.'}
          </h1>
          <p className="lede" style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 560 }}>
            {isEN
              ? 'The link may be broken or the page may have moved. Head back to the homepage — everything we offer is one click away.'
              : 'Link bozuk ya da sayfa taşınmış olabilir. Ana sayfaya dönün — sunduğumuz her şey bir tık uzakta.'}
          </p>
          <div style={{ marginTop: 32 }}>
            <button onClick={onHome} className="btn btn-primary btn-lg">
              {isEN ? 'Back to homepage' : 'Ana sayfaya dön'}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
