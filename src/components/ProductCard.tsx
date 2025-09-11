import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/useToast';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: StripeProduct;
  onAuthRequired: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAuthRequired }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();
  const { t } = useLanguage();

  const handlePurchase = async () => {
    if (!user || !session) {
      onAuthRequired();
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          customer_email: user.email,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout session creation failed');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: t('toast.checkout.error'),
        description: t('toast.checkout.error.desc'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-purple-400/50 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        {product.price && product.currency && (
          <div className="text-3xl font-bold text-purple-400 mb-4">
            {formatPrice(product.price, product.currency)}
          </div>
        )}
      </div>

      <div className="mb-8">
        <p className="text-slate-300 leading-relaxed">{product.description}</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-slate-300">{t('products.feature.custom')}</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-slate-300">{t('products.feature.setup')}</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-slate-300">{t('products.feature.support')}</span>
        </div>
      </div>

      <Button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-4 text-lg"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.mode === 'subscription' ? t('products.subscribe') : t('products.buy')}
          </>
        )}
      </Button>
    </motion.div>
  );
};