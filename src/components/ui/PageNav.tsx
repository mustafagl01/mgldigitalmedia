import { ArrowLeft, Boxes, LayoutGrid, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

type NavKey = 'services' | 'packages' | 'solutions';

type PageNavProps = {
  current: NavKey;
};

const LABELS: Record<NavKey, { tr: string; en: string; path: string; icon: typeof Boxes }> = {
  services: { tr: 'Hizmetler', en: 'Services', path: '/services', icon: Boxes },
  packages: { tr: 'Paketler', en: 'Packages', path: '/packages', icon: LayoutGrid },
  solutions: { tr: 'Sektörel Çözümler', en: 'Sector Solutions', path: '/solutions', icon: Sparkles },
};

function navigateTo(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function PageNav({ current }: PageNavProps) {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const otherLinks = (Object.keys(LABELS) as NavKey[]).filter((k) => k !== current);

  return (
    <nav
      aria-label={isEnglish ? 'Page navigation' : 'Sayfa navigasyonu'}
      className="relative z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          aria-label={isEnglish ? 'Back to home' : 'Ana sayfaya dön'}
        >
          <ArrowLeft className="h-4 w-4" />
          {isEnglish ? 'Home' : 'Ana Sayfa'}
        </button>

        <div className="flex items-center gap-2 text-sm">
          {otherLinks.map((key) => {
            const Icon = LABELS[key].icon;
            return (
              <button
                key={key}
                onClick={() => navigateTo(LABELS[key].path)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Icon className="h-3.5 w-3.5" />
                {isEnglish ? LABELS[key].en : LABELS[key].tr}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function navigate(path: string) {
  navigateTo(path);
}
