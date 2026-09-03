import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import type { StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/useToast';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: StripeProduct;
  onAuthRequired: () => void;
}

const ENGLISH_PRODUCT_COPY: Record<string, { name: string; description: string }> = {
  assistant_monthly: { name: 'Assistant Platform Fee', description: 'Monthly platform fee for voice, WhatsApp or both. Setup, hosting, monitoring and maintenance are included. Connected call minutes and AI replies are billed separately.' },
  voice_credit_500: { name: 'Voice Credits — 500 Minutes', description: '500 connected call minutes at 23p per minute. Only connected calls count.' },
  voice_credit_1000: { name: 'Voice Credits — 1,000 Minutes', description: '1,000 connected call minutes at 21p per minute for businesses with regular call volume.' },
  voice_credit_2000: { name: 'Voice Credits — 2,000 Minutes', description: '2,000 connected call minutes at the lowest listed unit rate of 20p per minute.' },
  wa_credit_5000: { name: 'WhatsApp Credits — 5,000 Replies', description: '5,000 AI replies. Incoming messages, staff replies and system notifications do not count.' },
  wa_credit_10000: { name: 'WhatsApp Credits — 10,000 Replies', description: '10,000 AI replies at a lower unit rate than the 5,000-reply pack.' },
  wa_credit_20000: { name: 'WhatsApp Credits — 20,000 Replies', description: '20,000 AI replies at the lowest listed unit rate for high message volume.' },
  automation_setup: { name: 'Automation System — Setup', description: 'Analysis, workflow design and integration for repetitive business processes. Scope is agreed in writing. Monthly maintenance is separate.' },
  leadmail_setup: { name: 'Lead + Email System — Setup', description: 'Ideal customer profile, research, verification and a personalised email follow-up workflow. Domain, mailbox and data credits are excluded.' },
  system_maintenance: { name: 'System Maintenance — Monthly', description: 'Hosting, monitoring and incident response for an installed automation or lead-and-email system. One small change per month is included.' },
  web_landing_setup: { name: 'One-page Website — Setup', description: 'Design, copy, mobile-first build, enquiry form, search foundations, domain connection and SSL. Annual hosting is separate.' },
  web_site_setup: { name: 'Business Website — Setup', description: 'A five-page website with design, copy, forms, local search foundations, schema and three revision rounds. Annual hosting is separate.' },
  web_integrated_setup: { name: 'Integrated Website — Setup', description: 'A business website with a scoped booking, ordering or payment integration and operational notifications.' },
  web_hosting_year: { name: 'Website Hosting — Annual', description: 'Hosting, SSL renewal, backups and security updates, billed once per year.' },
  ads_meta: { name: 'Meta Ads Management', description: 'Facebook and Instagram campaign management, creative production, optimisation and monthly reporting. Ad spend is paid directly by you; we take no percentage.' },
  ads_google: { name: 'Google Ads Management', description: 'Google Search and Performance Max management, conversion tracking, optimisation and monthly reporting.' },
  ads_both: { name: 'Meta + Google Ads Management', description: 'Both platforms managed together with cross-channel budget planning, creative production and one combined monthly report.' },
  thermal_printer: { name: 'Thermal Printer', description: 'Optional printer for producing kitchen order tickets. You do not need this if you already have a compatible printer.' },
};

export function ProductCard({ product, onAuthRequired }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useAuth();
  const { t, language } = useLanguage();
  const { pricing } = useLocation();
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://mgl-digital-media-auth.mustafagl01.workers.dev';
  const englishCopy = ENGLISH_PRODUCT_COPY[product.id];
  const name = language === 'en' && englishCopy ? englishCopy.name : product.name;
  const description = language === 'en' && englishCopy ? englishCopy.description : product.description;
  const displayPrice = pricing.region === 'TR' ? product.priceTry : product.priceGbp;

  const handlePurchase = async () => {
    if (!user || !session) {
      onAuthRequired();
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/stripe/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.token}` },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      });
      if (!response.ok) throw new Error(`Checkout returned ${response.status}`);
      const data = await response.json() as { url?: string };
      if (!data.url) throw new Error('Checkout URL missing');
      window.location.assign(data.url);
    } catch (error) {
      console.error('Checkout error:', error);
      toast({ title: t('toast.checkout.error'), description: t('toast.checkout.error.desc'), variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="store-product">
      <span className="eyebrow">{product.mode === 'subscription' ? (language === 'tr' ? 'TEKRARLAYAN' : 'RECURRING') : (language === 'tr' ? 'TEK SEFERLİK' : 'ONE-OFF')}</span>
      <h2>{name}</h2>
      <p className="store-product__price">{formatPrice(displayPrice, pricing.region)}</p>
      <p className="store-product__description">{description}</p>
      <ul>
        {[t('products.feature.custom'), t('products.feature.setup'), t('products.feature.support')].map((feature) => (
          <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary btn-md" onClick={handlePurchase} disabled={isLoading}>
        <ShoppingCart size={17} aria-hidden="true" />
        {isLoading ? t('common.loading') : product.mode === 'subscription' ? t('products.subscribe') : t('products.buy')}
      </button>
    </article>
  );
}
