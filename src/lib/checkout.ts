import { supabase, insertLead } from './supabase';
import { useAuth } from '../contexts/AuthContext';

// Real Stripe Payment Links
const STRIPE_PAYMENT_LINKS = {
  'automation-basic': 'https://buy.stripe.com/6oU5kDdURcIJ2gO8vV2sM0c',
  'automation-pro': 'https://buy.stripe.com/7sY3cv6spdMN2gO27x2sM0d',    
  'automation-enterprise': 'https://buy.stripe.com/dRm4gz9EBfUVcVsh2r2sM0e'
};

export const handlePurchase = async (productId: string, userEmail?: string) => {
  try {
    // Save purchase intent to database
    if (userEmail) {
      await insertLead({
        email: userEmail,
        source: 'product_purchase',
        notes: `Purchase intent for product: ${productId}`
      });
    }

    // Get payment link
    const paymentLink = STRIPE_PAYMENT_LINKS[productId as keyof typeof STRIPE_PAYMENT_LINKS];
    
    if (paymentLink) {
      // Open Stripe payment link in new tab
      window.open(paymentLink, '_blank');
      return { success: true };
    } else {
      throw new Error('Payment link not found for product');
    }
  } catch (error) {
    console.error('Purchase error:', error);
    return { success: false, error };
  }
};

// Create actual Stripe products and prices
export const stripeProductData = [
  {
    name: 'MGL Digital AI - Başlangıç Paketi',
    description: 'E-posta otomasyonu ve temel WhatsApp bot kurulumu',
    price: 49700, // 497.00 in cents
    currency: 'usd'
  },
  {
    name: 'MGL Digital AI - Profesyonel Paket', 
    description: 'Gelişmiş AI otomasyonu ve reklam entegrasyonu',
    price: 99700, // 997.00 in cents
    currency: 'usd'
  },
  {
    name: 'MGL Digital AI - Kurumsal Paket',
    description: 'Tam özelleştirilebilir kurumsal otomasyon çözümü', 
    price: 199700, // 1997.00 in cents
    currency: 'usd'
  }
];