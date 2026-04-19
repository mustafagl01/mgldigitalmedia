import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LocationProvider, useLocation } from './contexts/LocationContext';

// Shared UI
import { Toaster } from './components/ui/Toast';

// Modals (kept from previous build)
import { AuthModal } from './components/auth/AuthModal';
import { EmailDemoModal } from './components/modals/EmailDemoModal';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

// Pages
import { ProductsPage } from './components/pages/ProductsPage';
import { SuccessPage } from './components/pages/SuccessPage';
import { CancelPage } from './components/pages/CancelPage';
import Pricing from './pages/Pricing';
import Packages from './pages/Packages';
import Services from './pages/Services';
import Solutions from './pages/Solutions';

// New site shell
import { AnnouncementBar } from './components/site/AnnouncementBar';
import { SiteHeader } from './components/site/SiteHeader';
import { SiteFooter } from './components/site/SiteFooter';
import { ScrollProgress } from './components/site/ScrollProgress';

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
  | 'solutions';

type SitePage = 'home' | 'services' | 'solutions' | 'packages' | 'pricing';

function pathToPage(path: string): AppPage {
  if (path === '/products') return 'products';
  if (path === '/success') return 'success';
  if (path === '/cancel') return 'cancel';
  if (path === '/pricing') return 'pricing';
  if (path === '/packages') return 'packages';
  if (path === '/services') return 'services';
  if (path === '/solutions') return 'solutions';
  return 'home';
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    pathToPage(window.location.pathname),
  );
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t } = useLanguage();
  useLocation(); // keeps region hydrated for pricing
  useAuth(); // keeps session hydrated

  React.useEffect(() => {
    const handlePopState = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const navigateSite = (page: SitePage) => navigateTo(page as AppPage);

  const openAnalysis = () => {
    window.open(CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  // Dedicated pages render without the site shell
  if (currentPage === 'products') return <ProductsPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'success') return <SuccessPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'cancel')
    return <CancelPage onBack={() => navigateTo('home')} onRetry={() => navigateTo('products')} />;

  // Content pages — wrap in site shell (header/footer)
  const wrapPage = (node: React.ReactNode) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
      <ScrollProgress />
      <AnnouncementBar onClaim={openAnalysis} />
      <SiteHeader
        currentPage={(currentPage as SitePage) ?? 'home'}
        onNavigate={navigateSite}
        onAnalysisClick={openAnalysis}
      />
      <main style={{ flex: 1 }}>{node}</main>
      <SiteFooter onNavigate={navigateSite} />
    </div>
  );

  if (currentPage === 'pricing') return wrapPage(<Pricing />);
  if (currentPage === 'packages') return wrapPage(<Packages />);
  if (currentPage === 'services') return wrapPage(<Services />);
  if (currentPage === 'solutions') return wrapPage(<Solutions />);

  // HOME
  return (
    <>
      <Helmet>
        <title>{t('header.title')} — {t('header.agency')}</title>
        <meta name="description" content={t('header.metaDescription')} />
        <meta property="og:title" content={`${t('header.title')} — ${t('header.agency')}`} />
        <meta property="og:description" content={t('header.ogDescription')} />
      </Helmet>

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
            onServicesClick={() => navigateTo('services')}
            onPackagesClick={() => navigateTo('packages')}
          />
          <ProcessTimeline />
          <DemoSection onEmailDemo={() => setActiveDemo('email')} />
          <FoundersBet onAnalysisClick={openAnalysis} />
          <ClosingCTA onAnalysisClick={openAnalysis} />
        </main>

        <SiteFooter onNavigate={navigateSite} />
      </div>

      <EmailDemoModal isOpen={activeDemo === 'email'} onClose={() => setActiveDemo(null)} />
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
