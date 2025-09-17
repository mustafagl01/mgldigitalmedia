import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key');
}

export const stripePromise = loadStripe(stripePublishableKey);

// Product definitions
export const products = [
  {
    id: 'automation-basic',
    name: 'Başlangıç Paketi',
    nameEn: 'Starter Package',
    price: 497,
    currency: 'usd',
    description: 'E-posta otomasyonu ve temel WhatsApp bot kurulumu',
    descriptionEn: 'Email automation and basic WhatsApp bot setup',
    features: [
      'E-posta otomasyon kurulumu',
      'WhatsApp bot entegrasyonu', 
      'Temel CRM bağlantısı',
      '1 ay teknik destek'
    ],
    featuresEn: [
      'Email automation setup',
      'WhatsApp bot integration',
      'Basic CRM connection',
      '1 month technical support'
    ],
    popular: false,
    stripePriceId: 'price_1QOxxxxxxxxxxxxxx' // Bu ID'yi Stripe Dashboard'dan alacağız
  },
  {
    id: 'automation-pro',
    name: 'Profesyonel Paket',
    nameEn: 'Professional Package',
    price: 997,
    currency: 'usd',
    description: 'Gelişmiş AI otomasyonu ve reklam entegrasyonu',
    descriptionEn: 'Advanced AI automation and ads integration',
    features: [
      'Tüm başlangıç özellikleri',
      'AI sesli asistan kurulumu',
      'Gelişmiş workflow otomasyonu',
      'Meta/Google Ads entegrasyonu',
      '2 ay teknik destek'
    ],
    featuresEn: [
      'All starter features',
      'AI voice assistant setup',
      'Advanced workflow automation', 
      'Meta/Google Ads integration',
      '2 months technical support'
    ],
    popular: true,
    stripePriceId: 'price_1QOxxxxxxxxxxxxxx'
  },
  {
    id: 'automation-enterprise',
    name: 'Kurumsal Paket',
    nameEn: 'Enterprise Package',
    price: 1997,
    currency: 'usd',
    description: 'Tam özelleştirilebilir kurumsal otomasyon çözümü',
    descriptionEn: 'Fully customizable enterprise automation solution',
    features: [
      'Tüm profesyonel özellikler',
      'Özel AI chatbot geliştirme',
      'Sınırsız API entegrasyonları',
      'Özel dashboard tasarımı',
      '6 ay ücretsiz destek',
      'Öncelikli müşteri desteği'
    ],
    featuresEn: [
      'All professional features',
      'Custom AI chatbot development',
      'Unlimited API integrations',
      'Custom dashboard design',
      '6 months free support',
      'Priority customer support'
    ],
    popular: false,
    stripePriceId: 'price_1QOxxxxxxxxxxxxxx'
  }
];

// Stripe Checkout session creation
export const createCheckoutSession = async (priceId: string, customerEmail?: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerEmail,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { sessionId } = await response.json();
    
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Format price for display
export const formatPrice = (price: number, currency: string = 'usd') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};