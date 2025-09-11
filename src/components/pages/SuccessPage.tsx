import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Package } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId } from '../../stripe-config';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuccessPageProps {
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user) return;

      try {
        // Get the most recent order for this user
        const { data: orders, error } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching order:', error);
          return;
        }

        if (orders && orders.length > 0) {
          const order = orders[0];
          // Try to get subscription data as well
          const { data: subscription } = await supabase
            .from('stripe_user_subscriptions')
            .select('*')
            .maybeSingle();

          setOrderDetails({
            ...order,
            subscription,
            product: getProductByPriceId(subscription?.price_id || '')
          });
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">{t('success.title')}</h1>
          <p className="text-xl text-slate-300 mb-8">
            {t('success.subtitle')}
          </p>

          {orderDetails && (
            <div className="bg-slate-700/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t('success.order.title')}
              </h3>
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>{t('success.product')}</span>
                  <span className="font-medium">{orderDetails.product?.name || 'Otomasyon'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('success.amount')}</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: orderDetails.currency?.toUpperCase() || 'GBP',
                    }).format((orderDetails.amount_total || 0) / 100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('success.status')}</span>
                  <span className="font-medium text-green-400">{t('success.completed')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-purple-900/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">{t('success.next.title')}</h3>
            <div className="text-slate-300 space-y-2 text-left">
              <p>{t('success.next.contact')}</p>
              <p>{t('success.next.details')}</p>
              <p>{t('success.next.setup')}</p>
              <p>{t('success.next.training')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('success.back')}
            </Button>
            <Button
              onClick={() => {
                const phoneNumber = '905318299701';
                const message = encodeURIComponent('Merhaba! Otomasyon ödememim tamamlandı. Proje detaylarını konuşmak istiyorum.');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {t('success.whatsapp')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};