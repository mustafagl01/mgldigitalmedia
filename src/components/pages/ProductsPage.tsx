import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProductCard } from '../ProductCard';
import { AuthModal } from '../auth/AuthModal';
import { stripeProducts } from '../../stripe-config';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductsPageProps {
  onBack: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onBack }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    onBack(); // Ana sayfaya dön
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
          {stripeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAuthRequired={() => setIsAuthModalOpen(true)}
            />
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