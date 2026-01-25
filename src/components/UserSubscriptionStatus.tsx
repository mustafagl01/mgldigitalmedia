import React, { useEffect, useState } from 'react';
import { Crown, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProductByPriceId } from '../stripe-config';

import { useLanguage } from '../contexts/LanguageContext';

export const UserSubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    // MOCK SUBSCRIPTION DATA
    // In "Simulated Auth" mode, we won't have real Stripe data.
    // We'll assume a free tier or no subscription for now to prevent errors.
    setLoading(false);
  }, [user]);

  if (!user || loading) {
    return null;
  }

  const hasActiveSubscription = subscription?.subscription_status === 'active';
  const hasCompletedOrders = orders.some(order => order.order_status === 'completed');

  if (!hasActiveSubscription && !hasCompletedOrders) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl p-4 border border-purple-400/30">
      <div className="flex items-center gap-3">
        {hasActiveSubscription ? (
          <Crown className="w-6 h-6 text-yellow-400" />
        ) : (
          <Package className="w-6 h-6 text-green-400" />
        )}
        <div>
          <h3 className="font-semibold text-white">
            {hasActiveSubscription ? 'Aktif Abonelik' : 'Satın Alınan Ürünler'}
            {hasActiveSubscription ? t('subscription.active') : t('subscription.products')}
          </h3>
          <p className="text-sm text-slate-300">
            {hasActiveSubscription
              ? `${getProductByPriceId(subscription.price_id)?.name || 'Otomasyon'} - ${t('subscription.active.desc')}`
              : `${orders.length} ${t('subscription.products.desc')}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};