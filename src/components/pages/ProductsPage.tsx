import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProductCard } from '../ProductCard';
import { AuthModal } from '../auth/AuthModal';
import { products } from '../../lib/stripe';
import { handlePurchase } from '../../lib/checkout';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from '../../hooks/useToast';

interface ProductsPageProps {
  onBack: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onBack }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();

  const handleSignOut = async () => {
    console.log('Logout button clicked');
    try {
      console.log('Calling signOut...');
      await signOut();
      console.log('SignOut completed, navigating back...');
      // Give a small delay to allow auth state to update before navigation
      setTimeout(() => {
        onBack(); // Ana sayfaya dön
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: language === 'tr' ? 'Hata!' : 'Error!',
        description: language === 'tr' 
          ? 'Çıkış yapılırken bir hata oluştu.' 
          : 'An error occurred while signing out.',
        variant: 'destructive'
      });
    }
  };

  const handleProductPurchase = async (productId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    setIsLoading(productId);
    
    try {
      toast({
        title: language === 'tr' ? 'Ödeme Sayfası' : 'Payment Page',
        description: language === 'tr' 
          ? 'Stripe ödeme sayfasına yönlendiriliyorsunuz...' 
          : 'Redirecting to Stripe payment page...'
      });

      const result = await handlePurchase(productId, user.email);
      
      if (result.success) {
        toast({
          title: language === 'tr' ? 'Başarılı!' : 'Success!',
          description: language === 'tr' 
            ? 'Ödeme sayfası açıldı. Lütfen ödemenizi tamamlayın.' 
            : 'Payment page opened. Please complete your payment.'
        });
      } else {
        throw new Error('Purchase failed');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: t('toast.checkout.error'),
        description: t('toast.checkout.error.desc'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('products.back')}
          </Button>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-slate-300 hidden sm:block">
                {t('header.welcome')}, {user.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t('header.logout')}
              </Button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">{t('products.title')}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: products.indexOf(product) * 0.1 }}
              className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border ${
                product.popular 
                  ? 'border-purple-500 ring-2 ring-purple-500/20' 
                  : 'border-slate-700'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {language === 'tr' ? 'EN POPÜLER' : 'MOST POPULAR'}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {language === 'tr' ? product.name : product.nameEn}
                </h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  ${product.price}
                </div>
                <p className="text-gray-400">
                  {language === 'tr' ? product.description : product.descriptionEn}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {(language === 'tr' ? product.features : product.featuresEn).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleProductPurchase(product.id)}
                disabled={isLoading === product.id}
                className={`w-full py-4 text-lg font-semibold ${
                  product.popular
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'
                    : 'bg-slate-700 hover:bg-slate-600'
                } transition-all duration-200`}
              >
                {isLoading === product.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === 'tr' ? 'İşleniyor...' : 'Processing...'}
                  </div>
                ) : (
                  language === 'tr' ? 'Satın Al' : 'Buy Now'
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode="signup"
        />
      </div>
    </div>
  );
};