import { type PricingRegionCode, REGIONAL_PRICING } from '../config/pricing';

export function formatPrice(value: number, region: PricingRegionCode): string {
  const roundedValue = Math.round(value);

  if (region === 'TR') {
    return `${new Intl.NumberFormat(REGIONAL_PRICING.TR.currency.locale).format(roundedValue)} ${REGIONAL_PRICING.TR.currency.symbol}`;
  }

  return `${REGIONAL_PRICING.GB.currency.symbol}${new Intl.NumberFormat(REGIONAL_PRICING.GB.currency.locale).format(roundedValue)}`;
}
