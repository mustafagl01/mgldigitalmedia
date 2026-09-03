import { type PricingRegionCode, REGIONAL_PRICING } from '../config/pricing';

/**
 * Kullanim birimi fiyati (dakika / AI yaniti gibi kurus alti tutarlar).
 *
 * formatPrice bunlar icin KULLANILMAZ: tam fiyatlar icin yazildigi icin
 * TR'de yuvarlayip 0,45 TL'yi "0 TL" (bedava!), GB'de 0.007'yi "£0.01" (0,7p
 * yerine 1p) gosteriyordu. Ikisi de yanlis fiyat ilan etmek demek.
 */
export function formatUnitRate(value: number, region: PricingRegionCode): string {
  if (region === 'TR') {
    return `${value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`;
  }
  const pence = value * 100;
  if (pence < 100) {
    return `${pence.toLocaleString('en-GB', { maximumFractionDigits: 2 })}p`;
  }
  return formatPrice(value, region);
}

export function formatPrice(value: number, region: PricingRegionCode): string {
  const pricing = REGIONAL_PRICING[region];
  const normalizedValue = region === 'TR' ? Math.round(value) : Number(value.toFixed(2));
  const wholeNumber = Number.isInteger(normalizedValue);

  return new Intl.NumberFormat(pricing.currency.locale, {
    style: 'currency',
    currency: pricing.currency.code,
    maximumFractionDigits: region === 'TR' || wholeNumber ? 0 : 2,
  }).format(normalizedValue);
}
