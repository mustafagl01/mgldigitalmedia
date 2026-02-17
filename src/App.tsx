import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
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
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

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
  };

  const handleDemoRedirect = () => {
    setIdeaAssistantModalOpen(false); // Close the modal first
    setTimeout(() => {
      document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Give modal time to close
  };

  const handleProductsClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    navigateTo('products');
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
        <title>{t('header.title')} - {language === 'tr' ? 'AI Agent & Otomasyon Ajansı' : 'AI Agent & Automation Agency'}</title>
        <meta name="description" content={language === 'tr' ? 'Stratejiyle dönüşüm sağlıyoruz. Reklam ve iş süreçlerinizi AI Agent ile otomatikleştirerek size sadece \'tıklama\' değil, gerçek \'sonuç\' getiriyoruz.' : 'We drive transformation through strategy. By automating your advertising and business processes with AI Agents, we bring real \'results\', not just \'clicks\'.'} />
        <meta property="og:title" content={`${t('header.title')} - ${language === 'tr' ? 'AI Agent & Otomasyon Ajansı' : 'AI Agent & Automation Agency'}`} />
        <meta property="og:description" content={language === 'tr' ? 'AI Agent ve Otomasyon çözümleriyle iş süreçlerinizi dönüştürün. Manuel işlere son verin, verimliliği artırın.' : 'Transform your business processes with AI Agent and Automation solutions. End manual tasks, increase efficiency.'} />
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
          <div className="container mx-auto flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png"
                alt="MGL Digital AI Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-white">{t('header.title')}</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'tr'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  🇹🇷 TR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-sm font-medium transition-colors ${language === 'en'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  🇬🇧 EN
                </button>
              </div>
              {/* ROI Live Ticker - THE CONVERSION BEAST */}
              <RoiButton onClick={() => navigateTo('pricing')} />
              {user ? (
                <>
                  <span className="text-sm text-slate-300 hidden sm:block">
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
                    Çıkış Yap
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
          <BookingSection />
          <TrustMarquee />
          <BenefitsSection />
          <ServicesSection />
          <ProcessSection />
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
        <HelmetProvider>
          <AppContent />
        </HelmetProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;