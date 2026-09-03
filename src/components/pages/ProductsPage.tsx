import { useState } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { ProductCard } from '../ProductCard';
import { AuthModal } from '../auth/AuthModal';
import { stripeProducts } from '../../stripe-config';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductsPageProps { onBack: () => void; }

export function ProductsPage({ onBack }: ProductsPageProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();

  const handleSignOut = async () => { await signOut(); onBack(); };

  return (
    <main className="store-page">
      <header className="store-header container">
        <button type="button" className="btn btn-ghost btn-md" onClick={onBack}><ArrowLeft size={17} />{t('products.back')}</button>
        {user && <div className="store-user"><span>{user.email}</span><button type="button" onClick={handleSignOut}><LogOut size={16} />{t('header.logout')}</button></div>}
      </header>

      <section className="store-intro container">
        <span className="eyebrow">MGL DIGITAL MEDIA · {language === 'tr' ? 'GÜVENLİ ÖDEME' : 'SECURE CHECKOUT'}</span>
        <h1 className="h-display">{t('products.title')}</h1>
        <p className="lede">{t('products.subtitle')}</p>
        <div className="store-notice">{language === 'tr' ? 'Türkiye fiyatları bilgilendirme amaçlı TL karşılığıdır; ödeme ekranında tahsilat para birimini kontrol edin.' : 'Review the billing frequency, currency and included scope on the Stripe checkout page before confirming.'}</div>
      </section>

      <section className="container store-grid">
        {stripeProducts.map((product) => <ProductCard key={product.id} product={product} onAuthRequired={() => setIsAuthModalOpen(true)} />)}
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode="signup" />
    </main>
  );
}
