import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Wordmark } from './Wordmark';
import { GoogleCalendarButton } from './GoogleCalendarButton';

type Page = 'home' | 'services' | 'solutions' | 'packages' | 'pricing';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAnalysisClick: () => void;
}

export function SiteHeader({ currentPage, onNavigate, onAnalysisClick }: Props) {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav: Array<[Page, string]> =
    language === 'tr'
      ? [
          ['home', 'Ana sayfa'],
          ['services', 'Servisler'],
          ['solutions', 'Çözümler'],
          ['packages', 'Paketler'],
          ['pricing', 'ROI Simülasyonu'],
        ]
      : [
          ['home', 'Home'],
          ['services', 'Services'],
          ['solutions', 'Solutions'],
          ['packages', 'Packages'],
          ['pricing', 'ROI Simulator'],
        ];

  const handleNav = (p: Page) => {
    onNavigate(p);
    setMobileOpen(false);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905318299701', '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: scrolled ? 'rgba(245, 241, 234, 0.88)' : 'var(--paper)',
        backdropFilter: scrolled ? 'saturate(140%) blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(10px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'all 200ms var(--ease-out)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? 62 : 76,
          transition: 'height 200ms var(--ease-out)',
          gap: 16,
        }}
      >
        <button
          onClick={() => handleNav('home')}
          style={{ background: 'transparent', padding: 0, display: 'inline-flex', alignItems: 'center' }}
          aria-label="MGL Digital AI"
        >
          <Wordmark />
        </button>

        <nav className="nav-desktop" style={{ display: 'none', gap: 4 }}>
          {nav.map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`nav-link ${id === currentPage ? 'is-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            className="lang-switcher"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 0,
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 2,
            }}
          >
            {(['tr', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '4px 10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  borderRadius: 'var(--r-xs)',
                  background: language === l ? 'var(--ink)' : 'transparent',
                  color: language === l ? 'var(--paper)' : 'var(--fg-3)',
                  fontWeight: 500,
                  transition: 'all 120ms',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            className="lang-toggle-mobile"
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            aria-label={language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 40,
              padding: '0 12px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              background: 'var(--paper)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              cursor: 'pointer',
              transition: 'all 160ms var(--ease-out)',
            }}
          >
            <Globe size={14} style={{ color: 'var(--ember)' }} />
            {language === 'tr' ? 'EN' : 'TR'}
          </button>

          <button
            onClick={handleWhatsApp}
            className="btn btn-ghost btn-sm"
            style={{ display: 'none' }}
            data-hide-mobile
          >
            WhatsApp
          </button>

          <GoogleCalendarButton
            label={language === 'tr' ? 'Randevu al' : 'Book a call'}
            color="#C0392B"
          />

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              background: 'transparent',
              color: 'var(--fg)',
            }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--paper)',
            padding: '16px 24px 24px',
          }}
          className="mobile-drawer"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nav.map(([id, label]) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                style={{
                  textAlign: 'left',
                  padding: '12px 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: id === currentPage ? 'var(--ink)' : 'var(--fg-2)',
                  borderBottom: '1px solid var(--border)',
                  background: 'transparent',
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {(['tr', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '6px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  borderRadius: 'var(--r-sm)',
                  background: language === l ? 'var(--ink)' : 'transparent',
                  color: language === l ? 'var(--paper)' : 'var(--fg-3)',
                  fontWeight: 500,
                  border: '1px solid var(--border)',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
            <button onClick={handleWhatsApp} className="btn btn-ghost btn-md">
              WhatsApp
            </button>
            <GoogleCalendarButton
              label={language === 'tr' ? 'Randevu al' : 'Book a call'}
              color="#C0392B"
            />
          </div>
        </div>
      )}

      <style>{`
        .lang-toggle-mobile:hover,
        .lang-toggle-mobile:active {
          background: var(--ink) !important;
          color: var(--paper) !important;
          border-color: var(--ink) !important;
        }
        .lang-toggle-mobile:active {
          transform: scale(0.96);
        }
        @media (min-width: 960px) {
          .nav-desktop { display: flex !important; gap: 4px; }
          .lang-switcher { display: inline-flex !important; }
          .lang-toggle-mobile { display: none !important; }
          [data-hide-mobile] { display: inline-flex !important; }
          .nav-mobile-toggle { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </header>
  );
}
