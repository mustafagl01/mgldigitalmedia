import React, { useState } from 'react';
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

// Pages
import { ProductsPage } from './components/pages/ProductsPage';
import { SuccessPage } from './components/pages/SuccessPage';
import { CancelPage } from './components/pages/CancelPage';
import Pricing from './pages/Pricing';
import Packages from './pages/Packages';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

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
  | 'legal'
  | 'notfound';

type SitePage = 'home' | 'services' | 'solutions' | 'packages' | 'pricing' | 'legal';

const NESTED_PATHS: Partial<Record<AppPage, string>> = {
  'solution-klinik': '/solutions/klinik',
  'solution-emlak': '/solutions/emlak',
  'solution-eticaret': '/solutions/eticaret',
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
  '/legal',
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
  if (clean === '/legal') return 'legal';
  return KNOWN_PATHS.has(clean) ? 'home' : 'notfound';
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    pathToPage(window.location.pathname),
  );
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  const navigateSite = (page: SitePage, hash?: string) => navigateTo(page as AppPage, hash);

  const openAnalysis = () => {
    window.open(CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  // Dedicated pages render without the site shell
  if (currentPage === 'products') return <ProductsPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'success') return <SuccessPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'cancel')
    return <CancelPage onBack={() => navigateTo('home')} onRetry={() => navigateTo('products')} />;

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

  if (currentPage === 'pricing') return wrapPage(<Pricing />);
  if (currentPage === 'packages') return wrapPage(<Packages />);
  if (currentPage === 'services') return wrapPage(<Services />);
  if (currentPage === 'solutions') return wrapPage(<Solutions onNavigate={navigateTo} />);
  if (currentPage === 'solution-klinik') return wrapPage(<SolutionDetail sectorKey="klinik" />);
  if (currentPage === 'solution-emlak') return wrapPage(<SolutionDetail sectorKey="emlak" />);
  if (currentPage === 'solution-eticaret') return wrapPage(<SolutionDetail sectorKey="eticaret" />);
  if (currentPage === 'legal') return wrapPage(<Legal />);
  if (currentPage === 'notfound') return wrapPage(<NotFound onHome={() => navigateTo('home')} />);

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
