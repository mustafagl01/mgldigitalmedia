import React, { useState, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LocationProvider, useLocation } from './contexts/LocationContext';

// Shared UI
import { Toaster } from './components/ui/Toast';

// Modals (kept from previous build)
import { AuthModal } from './components/auth/AuthModal';
import { EmailDemoModal } from './components/modals/EmailDemoModal';
import { PhoneDemoModal } from './components/modals/PhoneDemoModal';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

// Pages — lazy loaded to reduce initial bundle
const ProductsPage = lazy(() => import('./components/pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const SuccessPage = lazy(() => import('./components/pages/SuccessPage').then(m => ({ default: m.SuccessPage })));
const CancelPage = lazy(() => import('./components/pages/CancelPage').then(m => ({ default: m.CancelPage })));
const Pricing = lazy(() => import('./pages/Pricing'));
const Packages = lazy(() => import('./pages/Packages'));
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

// SEO
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from './components/seo/Seo';

// New homepage sections
import { HeroV2 } from './components/sections/v2/HeroV2';
import { CredentialsStrip } from './components/sections/v2/CredentialsStrip';
import { HomeCapabilities, HomeWhoWeWorkWith } from './components/sections/v2/HomeCapabilities';
import { HomeProblems, HomeJourney } from './components/sections/v2/HomeProblems';
// HomeConnectedSystems ana sayfadan cikarildi: ayni akis artik hero'daki
// sistem haritasinda duruyor, iki yerde tekrar olmasin.
import { HomeHowWeWork, HomeWhyMgl } from './components/sections/v2/HomeApproach';
import { HomePricing } from './components/sections/v2/HomePricing';
import { DemoSection } from './components/sections/v2/DemoSection';
import { FoundersBet } from './components/sections/v2/FoundersBet';
import { ClosingCTA } from './components/sections/v2/ClosingCTA';

type AppPage =
  | 'home'
  | 'products'
  | 'success'
  | 'cancel'
  | 'pricing'
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
  '/products',
  '/success',
  '/cancel',
  '/pricing',
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
  '/lead-uretimi',
  '/ai-musteri-bulma-mail-takip',
  '/accounting-automation-uk',
  '/blog',
  '/n8n-vs-zapier',
  '/whatsapp-cloud-api-vs-baileys',
  '/voiceflow-vs-retell-ai',
  '/uk-ai-agencies-comparison',
]);

function pathToPage(path: string): AppPage {
  const withoutLanguage = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const clean = withoutLanguage.replace(/\/$/, '') || '/';
  if (clean === '/' || clean === '') return 'home';
  if (clean === '/products') return 'products';
  if (clean === '/success') return 'success';
  if (clean === '/cancel') return 'cancel';
  if (clean === '/pricing') return 'pricing';
  if (clean === '/packages') return 'packages';
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
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  // Dedicated pages render without the site shell
  if (currentPage === 'products') return <Suspense fallback={<div />}><ProductsPage onBack={() => navigateTo('home')} /></Suspense>;
  if (currentPage === 'success') return <Suspense fallback={<div />}><SuccessPage onBack={() => navigateTo('home')} /></Suspense>;
  if (currentPage === 'cancel')
    return <Suspense fallback={<div />}><CancelPage onBack={() => navigateTo('home')} onRetry={() => navigateTo('products')} /></Suspense>;

  // Content pages — wrap in site shell (header/footer)
  const headerPage: SitePage = currentPage.startsWith('solution')
    ? 'solutions'
    : currentPage.startsWith('sorun-')
      ? 'services'
      : currentPage === 'services' || currentPage === 'packages' || currentPage === 'pricing' || currentPage === 'legal'
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

  if (currentPage === 'pricing') return wrapPage(<Suspense fallback={<div />}><Pricing /></Suspense>);
  if (currentPage === 'packages') return wrapPage(<Suspense fallback={<div />}><Packages /></Suspense>);
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

  // HOME
  const isEN = language === 'en';
  const homeBreadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
  ]);

  return (
    <>
      <Seo
        title={
          isEN
            ? 'MGL Digital Media · AI Agents, Ads, Web & Automation for SMBs'
            : 'MGL Digital Media · AI Asistan, Reklam, Web ve Otomasyon Ajansı'
        }
        description={
          isEN
            ? 'We automate your operational load — AI voice/email agents, Meta & Google ads, n8n workflows, conversion-first web and SEO. One team. One system. London HQ, serving UK & Turkey remotely.'
            : 'Operasyonel yüklerinizi otomatize ederiz — sesli/e-posta AI asistanları, Meta ve Google reklamları, n8n akışları, dönüştüren web ve SEO. Tek ekip, tek sistem. Londra merkezli, UK ve Türkiye\'ye uzaktan hizmet.'
        }
        path="/"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['AI agency', 'automation agency', 'voice AI', 'n8n automation', 'Meta ads', 'Google ads', 'conversion web', 'London AI agency']
            : ['AI ajans', 'otomasyon ajansı', 'sesli asistan', 'n8n otomasyon', 'Meta reklam', 'Google reklam', 'dönüşüm odaklı web', 'Londra merkezli AI ajansı']
        }
        jsonLd={[...BASE_SCHEMAS, homeBreadcrumb]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
        <ScrollProgress />
  
        <SiteHeader
          currentPage="home"
          onNavigate={navigateSite}
          onAnalysisClick={openAnalysis}
        />

        <main style={{ flex: 1 }}>
          <HeroV2
            onAnalysisClick={openAnalysis}
            onDemoClick={() =>
              document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
          <CredentialsStrip />
          {/* Ana sayfa akışı mgl.md brief'ine göre kuruldu:
              ne yapıyoruz → hangi derdi çözüyoruz → yolculuk → sistemler
              birbirine bağlı → kimlerle → nasıl → neden biz → dene → kapanış */}
          <HomeCapabilities />
          <HomeProblems />
          <HomeJourney />
          <HomeWhoWeWorkWith />
          <HomeHowWeWork />
          <HomeWhyMgl />
          <HomePricing />
          <DemoSection
            onEmailDemo={() => setActiveDemo('email')}
            onPhoneDemo={() => setActiveDemo('phone')}
          />
          <FoundersBet onAnalysisClick={openAnalysis} />
          <ClosingCTA onAnalysisClick={openAnalysis} />
        </main>

        <SiteFooter onNavigate={navigateSite} />
      </div>

      <ChatBot />

      <EmailDemoModal isOpen={activeDemo === 'email'} onClose={() => setActiveDemo(null)} />
      <PhoneDemoModal isOpen={activeDemo === 'phone'} onClose={() => setActiveDemo(null)} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />

    </>
  );
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
