import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Wordmark } from './Wordmark';

/* Header v3 (konsey 2026-10-19). Menü hizmete göre: Otomasyon · Üreticiler · Asistanlar ·
   Web ve Reklam · İşler · Fiyatlar · Hakkımızda. Linkler düz <a>; LanguageContext site içi
   linkleri kendisi /en/ ile yerelleştiriyor. Props geriye uyum için duruyor. */

interface Props {
  currentPage?: string;
  onNavigate?: (page: never) => void;
  onAnalysisClick?: () => void;
}

const WHATSAPP = 'https://wa.me/447482670606';

export function SiteHeader(_props: Props) {
  const { language, setLanguage } = useLanguage();
  const isEN = language === 'en';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname.replace(/^\/en(?=\/|$)/, '') || '/'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onPop = () => setPath(window.location.pathname.replace(/^\/en(?=\/|$)/, '') || '/');
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  const nav: Array<[string, string]> = [
    ['/otomasyon', isEN ? 'Automation' : 'Otomasyon'],
    ['/ureticiler', isEN ? 'Manufacturers' : 'Üreticiler'],
    ['/asistanlar', isEN ? 'AI assistants' : 'Asistanlar'],
    ['/web-ve-reklam', isEN ? 'Web & ads' : 'Web ve Reklam'],
    ['/isler', isEN ? 'Work' : 'İşler'],
    ['/fiyatlandirma', isEN ? 'Pricing' : 'Fiyatlar'],
    ['/hakkimizda', isEN ? 'About' : 'Hakkımızda'],
  ];
  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header className={`v3-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container v3-header__bar">
        <a href="/" className="v3-header__logo" onClick={() => setOpen(false)}>
          <Wordmark size={21} />
        </a>

        <nav className="v3-header__nav" aria-label={isEN ? 'Main' : 'Ana menü'}>
          {nav.map(([href, label]) => (
            <a key={href} href={href} className={`v3-navlink ${active(href) ? 'is-active' : ''}`} aria-current={active(href) ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="v3-header__actions">
          <div className="v3-lang" role="group" aria-label={isEN ? 'Language' : 'Dil'}>
            {(['tr', 'en'] as const).map((l) => (
              <button key={l} onClick={() => setLanguage(l)} aria-pressed={language === l} className={language === l ? 'is-on' : ''}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm v3-header__cta">
            WhatsApp
          </a>
          <button className="v3-header__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={isEN ? 'Menu' : 'Menü'}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="v3-drawer">
          <nav className="container" aria-label={isEN ? 'Mobile' : 'Mobil menü'}>
            {nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className={active(href) ? 'is-active' : ''}>
                {label}
              </a>
            ))}
            <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
            <a href="/iletisim" onClick={() => setOpen(false)}>{isEN ? 'Contact' : 'İletişim'}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md" style={{ marginTop: 16 }}>
              {isEN ? 'Message us on WhatsApp' : 'WhatsApp’tan yazın'}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
