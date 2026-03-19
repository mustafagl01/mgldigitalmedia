import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Menu, X } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LocationProvider, useLocation } from './contexts/LocationContext';
import { Button } from './components/ui/Button';
import RoiButton from './components/RoiButton';

// Components
import { Toaster } from './components/ui/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { ProductsPage } from './components/pages/ProductsPage';
import { SuccessPage } from './components/pages/SuccessPage';
import { CancelPage } from './components/pages/CancelPage';
import { UserSubscriptionStatus } from './components/UserSubscriptionStatus';
import { EmailDemoModal } from './components/modals/EmailDemoModal';
import { PhoneDemoModal } from './components/modals/PhoneDemoModal';
import { IdeaAssistantModal } from './components/modals/IdeaAssistantModal';
import { Chatbot } from './components/Chatbot';
import { IntroductoryChoiceSection } from './components/sections/IntroductoryChoiceSection';
import { HeroSection } from './components/sections/HeroSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { AutomationExamplesSection } from './components/sections/AutomationExamplesSection';
import StrategySection from './components/sections/StrategySection';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';
import { TrustMarquee } from './components/sections/TrustMarquee';
import { ProcessSection } from './components/sections/ProcessSection';
import { BookingSection } from './components/sections/BookingSection';
import { BookingAnnouncementBar } from './components/ui/BookingAnnouncementBar';
import { FloatingBookingButton } from './components/ui/FloatingBookingButton';
import Pricing from './pages/Pricing';
import Packages from './pages/Packages';



type AppPage = 'home' | 'products' | 'success' | 'cancel' | 'pricing' | 'packages';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const path = window.location.pathname;
    if (path === '/products') return 'products';
    if (path === '/success') return 'success';
    if (path === '/cancel') return 'cancel';
    if (path === '/pricing') return 'pricing';
    if (path === '/packages') return 'packages';
    return 'home';
  });
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isIdeaAssistantModalOpen, setIdeaAssistantModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { region } = useLocation();

  React.useEffect(() => {
    setLanguage(region === 'TR' ? 'tr' : 'en');
  }, [region, setLanguage]);

  // Handle browser navigation
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/products') setCurrentPage('products');
      else if (path === '/success') setCurrentPage('success');
      else if (path === '/cancel') setCurrentPage('cancel');
      else if (path === '/pricing') setCurrentPage('pricing');
      else if (path === '/packages') setCurrentPage('packages');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    setIsMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/905318299701', '_blank', 'noopener,noreferrer');
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    handleWhatsAppClick();
  };

  const handleDemoRedirect = () => {
    setIdeaAssistantModalOpen(false); // Close the modal first
    setTimeout(() => {
      document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Give modal time to close
  };

  const handleProductsClick = () => {
    navigateTo('pricing');
  };

  if (currentPage === 'products') {
    return <ProductsPage onBack={() => navigateTo('home')} />;
  }

  if (currentPage === 'success') {
    return <SuccessPage onBack={() => navigateTo('home')} />;
  }

  if (currentPage === 'cancel') {
    return <CancelPage onBack={() => navigateTo('home')} onRetry={() => navigateTo('products')} />;
  }

  if (currentPage === 'pricing') {
    return <Pricing />;
  }

  if (currentPage === 'packages') {
    return <Packages />;
  }

  return (
    <>
      <Helmet>
        <title>{t('header.title')} - {t('header.agency')}</title>
        <meta name="description" content={t('header.metaDescription')} />
        <meta property="og:title" content={`${t('header.title')} - ${t('header.agency')}`} />
        <meta property="og:description" content={t('header.ogDescription')} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-gray-200 font-['Inter',_sans-serif] relative overflow-hidden">
        <BookingAnnouncementBar />

        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <style>{` body { background-color: #030712; } `}</style>

        {/* Header */}
        <header className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-700/50">
          <div className="container mx-auto flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div
                className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img
                  src="/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png"
                  alt="MGL Digital AI Logo"
                  className="w-8 h-8 object-contain shrink-0"
                />
                <span className="text-base sm:text-xl font-bold text-white truncate">{t('header.title')}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-purple-500 transition-colors"
                  aria-label={t('header.menuButton')}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Language Switcher */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLanguage('tr')}
                    className={`px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${language === 'tr'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${language === 'en'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    EN
                  </button>
                </div>

                {/* ROI Live Ticker - THE CONVERSION BEAST */}
                <RoiButton onClick={() => navigateTo('pricing')} />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between gap-4">
              <nav className="flex items-center gap-5 text-sm font-medium text-slate-300">
                <button onClick={() => navigateTo('home')} className="hover:text-cyan-300 transition-colors">
                  {t('header.home')}
                </button>
                <button onClick={() => navigateTo('packages')} className="hover:text-cyan-300 transition-colors">
                  {t('header.packages')}
                </button>
                <button onClick={handleContactClick} className="hover:text-cyan-300 transition-colors">
                  {t('header.contact')}
                </button>
              </nav>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="sm"
                  className="border-emerald-400 text-emerald-300 hover:bg-emerald-500/10"
                >
                  WhatsApp
                </Button>
                <Button
                  onClick={() => navigateTo('packages')}
                  size="sm"
                  className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white border-none shadow-[0_0_25px_-6px_rgba(168,85,247,0.95)] hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.9)]"
                >
                  {t('header.calculateProfit')}
                </Button>
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden rounded-xl border border-slate-700/80 bg-slate-950/95 p-3 space-y-3">
                <nav className="flex flex-col gap-1 text-sm text-slate-200">
                  <button onClick={() => navigateTo('home')} className="text-left px-3 py-2 rounded-md hover:bg-slate-800">
                    {t('header.home')}
                  </button>
                  <button onClick={() => navigateTo('packages')} className="text-left px-3 py-2 rounded-md hover:bg-slate-800">
                    {t('header.packages')}
                  </button>
                  <button onClick={handleContactClick} className="text-left px-3 py-2 rounded-md hover:bg-slate-800">
                    {t('header.contact')}
                  </button>
                </nav>

                <div className="grid grid-cols-1 gap-2">
                  <Button
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    size="sm"
                    className="border-emerald-400 text-emerald-300 hover:bg-emerald-500/10"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => navigateTo('packages')}
                    size="sm"
                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white border-none shadow-[0_0_25px_-6px_rgba(168,85,247,0.95)]"
                  >
                    {t('header.calculateProfit')}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {user ? (
                <>
                  <span className="text-sm text-slate-300 hidden md:block mr-auto">
                    {user.email}
                  </span>
                  <Button
                    onClick={() => setIdeaAssistantModalOpen(true)}
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    {t('header.opportunities')}
                  </Button>
                  <Button
                    onClick={signOut}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    {t('header.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIdeaAssistantModalOpen(true)}
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    {t('header.opportunities')}
                  </Button>
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white"
                  >
                    {t('header.login')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {user && (
          <div className="container mx-auto px-4 py-4">
            <UserSubscriptionStatus />
          </div>
        )}

        <main>
          <IntroductoryChoiceSection />
          <HeroSection onContactClick={() => setIdeaAssistantModalOpen(true)} />

          {/* Premium Dark-to-Light Section Transition */}
          <div className="relative h-32 md:h-48 bg-black">
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none">
              <path d="M0,120 L0,60 Q360,0 720,60 Q1080,120 1440,60 L1440,120 Z" fill="#f8fafc" />
            </svg>
          </div>

          <BookingSection />
          
          {/* Trust Marquee with seamless blend */}
          <div className="bg-slate-50 border-y border-slate-200/60">
            <TrustMarquee />
          </div>

          <div className="bg-slate-50 text-slate-900">
            <BenefitsSection />
            <ServicesSection />
            <ProcessSection />
          </div>

          <AutomationExamplesSection onDemoClick={setActiveDemo} />
          <StrategySection />
          <CtaSection
            onContactClick={() => setIdeaAssistantModalOpen(true)}
            onProductsClick={handleProductsClick}
          />
        </main>
        <Footer />

        <EmailDemoModal isOpen={activeDemo === 'email'} onClose={() => setActiveDemo(null)} />
        <PhoneDemoModal isOpen={activeDemo === 'phone'} onClose={() => setActiveDemo(null)} />
        <IdeaAssistantModal
          isOpen={isIdeaAssistantModalOpen}
          onClose={() => setIdeaAssistantModalOpen(false)}
          onDemoRedirect={handleDemoRedirect}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode="signup"
        />

        <Toaster />
        <Chatbot />
      </div>
    </>
  );
}

// Root component to provide context
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
