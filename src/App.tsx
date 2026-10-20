import React, { useState, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LocationProvider, useLocation } from './contexts/LocationContext';

// Shared UI
import { Toaster } from './components/ui/Toast';


const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

// Pages — lazy loaded to reduce initial bundle
// 2026-10-19: /pricing = seçici, /pricing/automation (B2B), /pricing/local (yerel). /packages -> /pricing (_redirects + PricingHub hash yönlendirmesi).
const PricingHub = lazy(() => import('./pages/pricing/PricingHub'));
// v3 yeniden tasarım (konsey 2026-10-19): docs/konsey/2026-10-19-site-konsey-karar.md
const HomeV3 = lazy(() => import('./pages/v3/Home'));
const CatalogPage = lazy(() => import('./pages/v3/CatalogPage'));
const Ureticiler = lazy(() => import('./pages/v3/Ureticiler'));
const Fiyatlandirma = lazy(() => import('./pages/v3/Fiyatlandirma'));
const Isler = lazy(() => import('./pages/v3/Isler'));
const Hakkimizda = lazy(() => import('./pages/v3/Hakkimizda'));
const Iletisim = lazy(() => import('./pages/v3/Iletisim'));
const Gizlilik = lazy(() => import('./pages/v3/Gizlilik'));
const PricingAutomation = lazy(() => import('./pages/pricing/PricingAutomation'));
const PricingLocal = lazy(() => import('./pages/pricing/PricingLocal'));
const Services = lazy(() => import('./pages/Services'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const ProblemDetail = lazy(() => import('./pages/ProblemDetail'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Service pages (E)
const WhatsappAiAsistan = lazy(() => import('./pages/services/WhatsappAiAsistan'));
const SesliAi = lazy(() => import('./pages/services/SesliAi'));
const N8nOtomasyon = lazy(() => import('./pages/services/N8nOtomasyon'));
const SurecOtomasyonu = lazy(() => import('./pages/services/SurecOtomasyonu'));
const LeadUretimi = lazy(() => import('./pages/services/LeadUretimi'));
const ManagedOutreach = lazy(() => import('./pages/services/ManagedOutreach'));
const AccountingAutomation = lazy(() => import('./pages/AccountingAutomation'));

// Blog pages (F)
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Comparison pages (G)
const N8nVsZapier = lazy(() => import('./pages/comparisons/N8nVsZapier'));
const WhatsappCloudApiVsBaileys = lazy(() => import('./pages/comparisons/WhatsappCloudApiVsBaileys'));
const VoiceflowVsRetellAi = lazy(() => import('./pages/comparisons/VoiceflowVsRetellAi'));
const UkAiAgenciesComparison = lazy(() => import('./pages/comparisons/UkAiAgenciesComparison'));

// New site shell
import { SiteHeader } from './components/site/SiteHeader';
import { SiteFooter } from './components/site/SiteFooter';
import { ScrollProgress } from './components/site/ScrollProgress';
import { ChatBot } from './components/site/ChatBot';
import { CookieConsent } from './components/site/CookieConsent';

// HomeConnectedSystems ana sayfadan cikarildi: ayni akis artik hero'daki
// sistem haritasinda duruyor, iki yerde tekrar olmasin.

type AppPage =
  | 'home'
  | 'v3-otomasyon'
  | 'v3-katalog'
  | 'v3-ureticiler'
  | 'v3-asistanlar'
  | 'v3-webreklam'
  | 'v3-fiyat'
  | 'v3-isler'
  | 'v3-hakkimizda'
  | 'v3-iletisim'
  | 'v3-gizlilik'
  | 'pricing'
  | 'pricing-automation'
  | 'pricing-local'
  | 'packages'
  | 'services'
  | 'solutions'
  | 'solution-klinik'
  | 'solution-emlak'
  | 'solution-eticaret'
  | 'solution-guzellik'
  | 'solution-restoran'
  | 'sorun-mesai-disi-arama-cevaplama'
  | 'sorun-randevu-hatirlatma-sistemi'
  | 'sorun-tahsilat-otomasyonu'
  | 'sorun-evrak-toplama-ve-takip'
  | 'sorun-excelden-otomatik-mail-whatsapp'
  | 'legal'
  | 'notfound'
  // Service pages (E)
  | 'whatsapp-ai-asistan'
  | 'sesli-ai'
  | 'n8n-otomasyon'
  | 'surec-otomasyonu'
  | 'lead-uretimi'
  | 'ai-musteri-bulma-mail-takip'
  | 'accounting-automation-uk'
  // Blog (F)
  | 'blog'
  | 'blog-post'
  // Comparison pages (G)
  | 'n8n-vs-zapier'
  | 'whatsapp-cloud-api-vs-baileys'
  | 'voiceflow-vs-retell-ai'
  | 'uk-ai-agencies-comparison';

type SitePage = 'home' | 'services' | 'solutions' | 'packages' | 'pricing' | 'legal';

const NESTED_PATHS: Partial<Record<AppPage, string>> = {
  'pricing-automation': '/pricing/automation',
  'pricing-local': '/pricing/local',
  packages: '/pricing',
  'solution-klinik': '/solutions/klinik',
  'solution-emlak': '/solutions/emlak',
  'solution-eticaret': '/solutions/eticaret',
  'solution-guzellik': '/solutions/guzellik',
  'solution-restoran': '/solutions/restoran',
  'sorun-mesai-disi-arama-cevaplama': '/sorunlar/mesai-disi-arama-cevaplama',
  'sorun-randevu-hatirlatma-sistemi': '/sorunlar/randevu-hatirlatma-sistemi',
  'sorun-tahsilat-otomasyonu': '/sorunlar/tahsilat-otomasyonu',
  'sorun-evrak-toplama-ve-takip': '/sorunlar/evrak-toplama-ve-takip',
  'sorun-excelden-otomatik-mail-whatsapp': '/sorunlar/excelden-otomatik-mail-whatsapp',
};

const KNOWN_PATHS = new Set([
  '/',
  '/pricing',
  '/pricing/automation',
  '/pricing/local',
  '/packages',
  '/services',
  '/solutions',
  '/solutions/klinik',
  '/solutions/emlak',
  '/solutions/eticaret',
  '/solutions/guzellik',
  '/solutions/restoran',
  '/sorunlar/mesai-disi-arama-cevaplama',
  '/sorunlar/randevu-hatirlatma-sistemi',
  '/sorunlar/tahsilat-otomasyonu',
  '/sorunlar/evrak-toplama-ve-takip',
  '/sorunlar/excelden-otomatik-mail-whatsapp',
  '/legal',
  '/whatsapp-ai-asistan',
  '/sesli-ai',
  '/n8n-otomasyon',
  '/surec-otomasyonu',
  '/lead-uretimi',
  '/ai-musteri-bulma-mail-takip',
  '/accounting-automation-uk',
  '/blog',
  '/n8n-vs-zapier',
  '/whatsapp-cloud-api-vs-baileys',
  '/voiceflow-vs-retell-ai',
  '/uk-ai-agencies-comparison',
]);

/* v3: eski adres → yeni adres (sunucuda public/_redirects 301; burada uygulama içi gezinme için). */
const LEGACY_V3: Record<string, string> = {
  '/services': '/otomasyon',
  '/solutions': '/otomasyon',
  '/n8n-otomasyon': '/otomasyon',
  '/pricing': '/fiyatlandirma',
  '/packages': '/fiyatlandirma',
  '/pricing/automation': '/otomasyon',
  '/pricing/local': '/web-ve-reklam',
  '/surec-otomasyonu': '/ureticiler',
  '/sesli-ai': '/asistanlar',
  '/whatsapp-ai-asistan': '/asistanlar',
  '/sorunlar/mesai-disi-arama-cevaplama': '/asistanlar',
  '/sorunlar/randevu-hatirlatma-sistemi': '/otomasyon/randevu-hatirlatma',
  '/sorunlar/tahsilat-otomasyonu': '/otomasyon/odeme-takibi',
  '/sorunlar/evrak-toplama-ve-takip': '/otomasyon/evrak-toplama',
  '/sorunlar/excelden-otomatik-mail-whatsapp': '/otomasyon',
};
const V3_PAGES: Record<string, AppPage> = {
  '/otomasyon': 'v3-otomasyon',
  '/ureticiler': 'v3-ureticiler',
  '/asistanlar': 'v3-asistanlar',
  '/web-ve-reklam': 'v3-webreklam',
  '/fiyatlandirma': 'v3-fiyat',
  '/isler': 'v3-isler',
  '/hakkimizda': 'v3-hakkimizda',
  '/iletisim': 'v3-iletisim',
  '/gizlilik-ve-guvenlik': 'v3-gizlilik',
};
const CATALOG_SLUGS = ['talep-yakalama', 'randevu-hatirlatma', 'odeme-takibi', 'evrak-toplama', 'yorum-isteme'];

function pathToPage(path: string): AppPage {
  {
    const isEn = /^\/en(?=\/|$)/.test(path);
    let c = (path.replace(/^\/en(?=\/|$)/, '') || '/').replace(/\/$/, '') || '/';
    if (LEGACY_V3[c]) {
      c = LEGACY_V3[c];
      if (typeof window !== 'undefined') window.history.replaceState({}, '', `${isEn ? '/en' : ''}${c}${window.location.hash}`);
    }
    if (V3_PAGES[c]) return V3_PAGES[c];
    if (c.startsWith('/otomasyon/') && CATALOG_SLUGS.includes(c.slice(11))) return 'v3-katalog';
  }
  const withoutLanguage = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const clean = withoutLanguage.replace(/\/$/, '') || '/';
  if (clean === '/' || clean === '') return 'home';
  if (clean === '/pricing') return 'pricing';
  if (clean === '/pricing/automation') return 'pricing-automation';
  if (clean === '/pricing/local') return 'pricing-local';
  if (clean === '/packages') return 'pricing';
  if (clean === '/services') return 'services';
  if (clean === '/solutions') return 'solutions';
  if (clean === '/solutions/klinik') return 'solution-klinik';
  if (clean === '/solutions/emlak') return 'solution-emlak';
  if (clean === '/solutions/eticaret') return 'solution-eticaret';
  if (clean === '/solutions/guzellik') return 'solution-guzellik';
  if (clean === '/solutions/restoran') return 'solution-restoran';
  if (clean === '/sorunlar/mesai-disi-arama-cevaplama') return 'sorun-mesai-disi-arama-cevaplama';
  if (clean === '/sorunlar/randevu-hatirlatma-sistemi') return 'sorun-randevu-hatirlatma-sistemi';
  if (clean === '/sorunlar/tahsilat-otomasyonu') return 'sorun-tahsilat-otomasyonu';
  if (clean === '/sorunlar/evrak-toplama-ve-takip') return 'sorun-evrak-toplama-ve-takip';
  if (clean === '/sorunlar/excelden-otomatik-mail-whatsapp') return 'sorun-excelden-otomatik-mail-whatsapp';
  if (clean === '/legal') return 'legal';
  // Service pages
  if (clean === '/whatsapp-ai-asistan') return 'whatsapp-ai-asistan';
  if (clean === '/sesli-ai') return 'sesli-ai';
  if (clean === '/n8n-otomasyon') return 'n8n-otomasyon';
  if (clean === '/surec-otomasyonu') return 'surec-otomasyonu';
  if (clean === '/lead-uretimi') return 'lead-uretimi';
  if (clean === '/ai-musteri-bulma-mail-takip') return 'ai-musteri-bulma-mail-takip';
  if (clean === '/accounting-automation-uk') return 'accounting-automation-uk';
  // Blog
  if (clean === '/blog') return 'blog';
  if (clean.startsWith('/blog/')) return 'blog-post';
  // Comparisons
  if (clean === '/n8n-vs-zapier') return 'n8n-vs-zapier';
  if (clean === '/whatsapp-cloud-api-vs-baileys') return 'whatsapp-cloud-api-vs-baileys';
  if (clean === '/voiceflow-vs-retell-ai') return 'voiceflow-vs-retell-ai';
  if (clean === '/uk-ai-agencies-comparison') return 'uk-ai-agencies-comparison';
  return KNOWN_PATHS.has(clean) ? 'home' : 'notfound';
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    pathToPage(window.location.pathname),
  );
  // Blog slug — extracted from URL for blog-post pages
  const [blogSlug, setBlogSlug] = useState<string>(() => {
    const parts = window.location.pathname.replace(/^\/en(?=\/|$)/, '').split('/');
    return parts.length >= 3 && parts[1] === 'blog' ? parts[2] : '';
  });
  const { language } = useLanguage();
  useLocation(); // keeps region hydrated for pricing
  useAuth(); // keeps session hydrated

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pathToPage(window.location.pathname));
      const parts = window.location.pathname.replace(/^\/en(?=\/|$)/, '').split('/');
      setBlogSlug(parts.length >= 3 && parts[1] === 'blog' ? parts[2] : '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: AppPage, hash?: string) => {
    setCurrentPage(page);
    const basePath = page === 'home' ? '/' : (NESTED_PATHS[page] ?? `/${page}`);
    const localizedBase = language === 'en' ? `/en${basePath === '/' ? '/' : basePath}` : basePath;
    const path = hash ? `${localizedBase}#${hash}` : localizedBase;
    window.history.pushState({}, '', path);
    // Notify hash-aware listeners (pushState doesn't fire hashchange/popstate natively)
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const navigateToBlogPost = (slug: string) => {
    setBlogSlug(slug);
    setCurrentPage('blog-post');
    window.history.pushState({}, '', `${language === 'en' ? '/en' : ''}/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const navigateSite = (page: SitePage, hash?: string) => navigateTo(page as AppPage, hash);

  const openAnalysis = () => {
    window.open(CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  // Content pages — wrap in site shell (header/footer)
  const headerPage: SitePage = currentPage.startsWith('solution')
    ? 'solutions'
    : currentPage.startsWith('sorun-')
      ? 'services'
      : currentPage === 'pricing' || currentPage === 'pricing-automation' || currentPage === 'pricing-local' || currentPage === 'packages'
        ? 'pricing'
      : currentPage === 'services' || currentPage === 'legal'
        ? currentPage
        : 'home';

  const wrapPage = (node: React.ReactNode) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
      <ScrollProgress />

      <SiteHeader
        currentPage={headerPage}
        onNavigate={navigateSite}
        onAnalysisClick={openAnalysis}
      />
      <main style={{ flex: 1 }}>{node}</main>
      <SiteFooter onNavigate={navigateSite} />
      <ChatBot />
    </div>
  );

  // v3 sayfaları
  if (currentPage === 'v3-otomasyon') return wrapPage(<Suspense fallback={<div />}><PricingAutomation /></Suspense>);
  if (currentPage === 'v3-katalog') return wrapPage(<Suspense fallback={<div />}><CatalogPage slug={window.location.pathname.replace(/\/$/, '').split('/').pop() ?? ''} /></Suspense>);
  if (currentPage === 'v3-ureticiler') return wrapPage(<Suspense fallback={<div />}><Ureticiler /></Suspense>);
  if (currentPage === 'v3-asistanlar') return wrapPage(<Suspense fallback={<div />}><PricingLocal mode="assistants" /></Suspense>);
  if (currentPage === 'v3-webreklam') return wrapPage(<Suspense fallback={<div />}><PricingLocal mode="webads" /></Suspense>);
  if (currentPage === 'v3-fiyat') return wrapPage(<Suspense fallback={<div />}><Fiyatlandirma /></Suspense>);
  if (currentPage === 'v3-isler') return wrapPage(<Suspense fallback={<div />}><Isler /></Suspense>);
  if (currentPage === 'v3-hakkimizda') return wrapPage(<Suspense fallback={<div />}><Hakkimizda /></Suspense>);
  if (currentPage === 'v3-iletisim') return wrapPage(<Suspense fallback={<div />}><Iletisim /></Suspense>);
  if (currentPage === 'v3-gizlilik') return wrapPage(<Suspense fallback={<div />}><Gizlilik /></Suspense>);

  if (currentPage === 'pricing' || currentPage === 'packages') return wrapPage(<Suspense fallback={<div />}><PricingHub /></Suspense>);
  if (currentPage === 'pricing-automation') return wrapPage(<Suspense fallback={<div />}><PricingAutomation /></Suspense>);
  if (currentPage === 'pricing-local') return wrapPage(<Suspense fallback={<div />}><PricingLocal /></Suspense>);
  if (currentPage === 'services') return wrapPage(<Suspense fallback={<div />}><Services /></Suspense>);
  if (currentPage === 'solutions') return wrapPage(<Suspense fallback={<div />}><Solutions onNavigate={navigateTo} /></Suspense>);
  if (currentPage === 'solution-klinik') return wrapPage(<Suspense fallback={<div />}><SolutionDetail sectorKey="klinik" /></Suspense>);
  if (currentPage === 'solution-emlak') return wrapPage(<Suspense fallback={<div />}><SolutionDetail sectorKey="emlak" /></Suspense>);
  if (currentPage === 'solution-eticaret') return wrapPage(<Suspense fallback={<div />}><SolutionDetail sectorKey="eticaret" /></Suspense>);
  if (currentPage === 'solution-guzellik') return wrapPage(<Suspense fallback={<div />}><SolutionDetail sectorKey="guzellik" /></Suspense>);
  if (currentPage === 'solution-restoran') return wrapPage(<Suspense fallback={<div />}><SolutionDetail sectorKey="restoran" /></Suspense>);
  if (currentPage === 'sorun-mesai-disi-arama-cevaplama') return wrapPage(<Suspense fallback={<div />}><ProblemDetail slug="mesai-disi-arama-cevaplama" /></Suspense>);
  if (currentPage === 'sorun-randevu-hatirlatma-sistemi') return wrapPage(<Suspense fallback={<div />}><ProblemDetail slug="randevu-hatirlatma-sistemi" /></Suspense>);
  if (currentPage === 'sorun-tahsilat-otomasyonu') return wrapPage(<Suspense fallback={<div />}><ProblemDetail slug="tahsilat-otomasyonu" /></Suspense>);
  if (currentPage === 'sorun-evrak-toplama-ve-takip') return wrapPage(<Suspense fallback={<div />}><ProblemDetail slug="evrak-toplama-ve-takip" /></Suspense>);
  if (currentPage === 'sorun-excelden-otomatik-mail-whatsapp') return wrapPage(<Suspense fallback={<div />}><ProblemDetail slug="excelden-otomatik-mail-whatsapp" /></Suspense>);
  if (currentPage === 'legal') return wrapPage(<Suspense fallback={<div />}><Legal /></Suspense>);
  if (currentPage === 'notfound') return wrapPage(<Suspense fallback={<div />}><NotFound onHome={() => navigateTo('home')} /></Suspense>);

  // Service pages (E)
  if (currentPage === 'whatsapp-ai-asistan') return wrapPage(<Suspense fallback={<div />}><WhatsappAiAsistan /></Suspense>);
  if (currentPage === 'sesli-ai') return wrapPage(<Suspense fallback={<div />}><SesliAi /></Suspense>);
  if (currentPage === 'n8n-otomasyon') return wrapPage(<Suspense fallback={<div />}><N8nOtomasyon /></Suspense>);
  if (currentPage === 'surec-otomasyonu') return wrapPage(<Suspense fallback={<div />}><SurecOtomasyonu /></Suspense>);
  if (currentPage === 'lead-uretimi') return wrapPage(<Suspense fallback={<div />}><LeadUretimi /></Suspense>);
  if (currentPage === 'ai-musteri-bulma-mail-takip') return wrapPage(<Suspense fallback={<div />}><ManagedOutreach /></Suspense>);
  if (currentPage === 'accounting-automation-uk') return wrapPage(<Suspense fallback={<div />}><AccountingAutomation /></Suspense>);

  // Blog pages (F)
  if (currentPage === 'blog') return wrapPage(<Suspense fallback={<div />}><BlogList onPost={navigateToBlogPost} /></Suspense>);
  if (currentPage === 'blog-post') return wrapPage(<Suspense fallback={<div />}><BlogPost slug={blogSlug} onBack={() => navigateTo('blog')} onPost={navigateToBlogPost} /></Suspense>);

  // Comparison pages (G)
  if (currentPage === 'n8n-vs-zapier') return wrapPage(<Suspense fallback={<div />}><N8nVsZapier /></Suspense>);
  if (currentPage === 'whatsapp-cloud-api-vs-baileys') return wrapPage(<Suspense fallback={<div />}><WhatsappCloudApiVsBaileys /></Suspense>);
  if (currentPage === 'voiceflow-vs-retell-ai') return wrapPage(<Suspense fallback={<div />}><VoiceflowVsRetellAi /></Suspense>);
  if (currentPage === 'uk-ai-agencies-comparison') return wrapPage(<Suspense fallback={<div />}><UkAiAgenciesComparison /></Suspense>);

  // HOME (v3)
  return wrapPage(<Suspense fallback={<div />}><HomeV3 /></Suspense>);
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <HelmetProvider>
            <AppContent />
            <Toaster />
            <CookieConsent />
          </HelmetProvider>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
