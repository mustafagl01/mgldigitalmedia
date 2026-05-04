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
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Service pages (E)
const WhatsappAiAsistan = lazy(() => import('./pages/services/WhatsappAiAsistan'));
const SesliAi = lazy(() => import('./pages/services/SesliAi'));
const N8nOtomasyon = lazy(() => import('./pages/services/N8nOtomasyon'));
const LeadUretimi = lazy(() => import('./pages/services/LeadUretimi'));

// Blog pages (F)
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Comparison pages (G)
const N8nVsZapier = lazy(() => import('./pages/comparisons/N8nVsZapier'));
const WhatsappCloudApiVsBaileys = lazy(() => import('./pages/comparisons/WhatsappCloudApiVsBaileys'));
const VoiceflowVsRetellAi = lazy(() => import('./pages/comparisons/VoiceflowVsRetellAi'));
const UkAiAgenciesComparison = lazy(() => import('./pages/comparisons/UkAiAgenciesComparison'));

// New site shell
import { AnnouncementBar } from './components/site/AnnouncementBar';
import { SiteHeader } from './components/site/SiteHeader';
import { SiteFooter } from './components/site/SiteFooter';
import { ScrollProgress } from './components/site/ScrollProgress';
import { ChatBot } from './components/site/ChatBot';

// SEO
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from './components/seo/Seo';

// New homepage sections
import { HeroV2 } from './components/sections/v2/HeroV2';
import { CredentialsStrip } from './components/sections/v2/CredentialsStrip';
import { ThreeBuckets } from './components/sections/v2/ThreeBuckets';
import { ProcessTimeline } from './components/sections/v2/ProcessTimeline';
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
  | 'legal'
  | 'notfound'
  // Service pages (E)
  | 'whatsapp-ai-asistan'
  | 'sesli-ai'
  | 'n8n-otomasyon'
  | 'lead-uretimi'
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
  '/legal',
  '/whatsapp-ai-asistan',
  '/sesli-ai',
  '/n8n-otomasyon',
  '/lead-uretimi',
  '/blog',
  '/n8n-vs-zapier',
  '/whatsapp-cloud-api-vs-baileys',
  '/voiceflow-vs-retell-ai',
  '/uk-ai-agencies-comparison',
]);

function pathToPage(path: string): AppPage {
  const clean = path.replace(/\/$/, '') || '/';
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
  if (clean === '/legal') return 'legal';
  // Service pages
  if (clean === '/whatsapp-ai-asistan') return 'whatsapp-ai-asistan';
  if (clean === '/sesli-ai') return 'sesli-ai';
  if (clean === '/n8n-otomasyon') return 'n8n-otomasyon';
  if (clean === '/lead-uretimi') return 'lead-uretimi';
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
    const parts = window.location.pathname.split('/');
    return parts.length >= 3 && parts[1] === 'blog' ? parts[2] : '';
  });
  const { t, language } = useLanguage();
  useLocation(); // keeps region hydrated for pricing
  useAuth(); // keeps session hydrated

  React.useEffect(() => {
    const handlePopState = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: AppPage, hash?: string) => {
    setCurrentPage(page);
    const basePath = page === 'home' ? '/' : (NESTED_PATHS[page] ?? `/${page}`);
    const path = hash ? `${basePath}#${hash}` : basePath;
    window.history.pushState({}, '', path);
    // Notify hash-aware listeners (pushState doesn't fire hashchange/popstate natively)
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const navigateToBlogPost = (slug: string) => {
    setBlogSlug(slug);
    setCurrentPage('blog-post');
    window.history.pushState({}, '', `/blog/${slug}`);
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
    : ((currentPage as SitePage) ?? 'home');

  const wrapPage = (node: React.ReactNode) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
      <ScrollProgress />
      <AnnouncementBar onClaim={openAnalysis} />
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
  if (currentPage === 'legal') return wrapPage(<Suspense fallback={<div />}><Legal /></Suspense>);
  if (currentPage === 'notfound') return wrapPage(<Suspense fallback={<div />}><NotFound onHome={() => navigateTo('home')} /></Suspense>);

  // Service pages (E)
  if (currentPage === 'whatsapp-ai-asistan') return wrapPage(<Suspense fallback={<div />}><WhatsappAiAsistan /></Suspense>);
  if (currentPage === 'sesli-ai') return wrapPage(<Suspense fallback={<div />}><SesliAi /></Suspense>);
  if (currentPage === 'n8n-otomasyon') return wrapPage(<Suspense fallback={<div />}><N8nOtomasyon /></Suspense>);
  if (currentPage === 'lead-uretimi') return wrapPage(<Suspense fallback={<div />}><LeadUretimi /></Suspense>);

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
        <AnnouncementBar onClaim={openAnalysis} />
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
          <ThreeBuckets
            onAdsClick={() => navigateTo('packages', 'ads')}
            onAgentsClick={() => navigateTo('packages', 'agents')}
            onWebClick={() => navigateTo('packages', 'web')}
            onServicesClick={() => navigateTo('services')}
          />
          <ProcessTimeline />
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

      <Toaster />
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
          </HelmetProvider>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
