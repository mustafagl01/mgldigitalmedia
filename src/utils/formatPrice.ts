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

/**
 * Türkçe ayrılma eki (-den/-dan/-ten/-tan), sayının okunuşunun son kelimesine göre.
 * Fiyat bölgeye göre değiştiği için ek sabit yazılamaz: "£399'den" yanlış, "£399'dan" doğru
 * (konsey metin denetimi 2026-10-20).
 */
export function ablativeTR(value: number): string {
  const n = Math.round(Math.abs(value));
  const ones: Record<number, string> = { 1: 'den', 2: 'den', 3: 'ten', 4: 'ten', 5: 'ten', 6: 'dan', 7: 'den', 8: 'den', 9: 'dan' };
  const tens: Record<number, string> = { 1: 'dan', 2: 'den', 3: 'dan', 4: 'tan', 5: 'den', 6: 'tan', 7: 'ten', 8: 'den', 9: 'dan' };
  if (n === 0) return '’dan';
  if (n % 10) return `’${ones[n % 10]}`;
  if (n % 100) return `’${tens[(n % 100) / 10]}`;
  if (n % 1000) return '’den'; // yüz
  if (n % 1_000_000) {
    // ... bin: binler grubu da kendi içinde okunur ama son kelime "bin" → -den
    return '’den';
  }
  return '’dan'; // milyon
}

/** "£399’dan" / "from £399" — fiyatın "…den başlayan" biçimi. */
export function formatFrom(value: number, region: PricingRegionCode, isEN: boolean): string {
  const p = formatPrice(value, region);
  return isEN ? `from ${p}` : `${p}${ablativeTR(value)}`;
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
