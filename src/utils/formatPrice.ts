import { type PricingRegionCode, REGIONAL_PRICING } from '../config/pricing';

export function formatPrice(value: number, region: PricingRegionCode): string {
  const pricing = REGIONAL_PRICING[region];
  const normalizedValue = region === 'TR' ? Math.round(value) : Number(value.toFixed(2));

  return new Intl.NumberFormat(pricing.currency.locale, {
    style: 'currency',
    currency: pricing.currency.code,
    maximumFractionDigits: region === 'TR' ? 0 : 2,
  }).format(normalizedValue);
}
