export type PricingRegionCode = 'TR' | 'GB';

export type CurrencyConfig = {
  code: 'TRY' | 'GBP';
  symbol: '₺' | '£';
  locale: 'tr-TR' | 'en-GB';
};

export type PackageTierKey = 'starter' | 'pro' | 'advanced' | 'business';

export type PackageTier = {
  key: PackageTierKey;
  name: string;
  price: number;
  /** Included voice assistant minutes for this tier */
  voiceMinutes: number;
};

export type RegionalPricing = {
  region: PricingRegionCode;
  currency: CurrencyConfig;
  /** One-time setup / base fee for custom package builder */
  baseSetupPrice: number;
  /** Per-minute voice assistant price in regional currency */
  pricePerMinute: number;
  /** Reference monthly employer cost used in ROI comparisons */
  monthlyEmployerCost: number;
  packages: Record<PackageTierKey, PackageTier>;
};

export const REGIONAL_PRICING: Record<PricingRegionCode, RegionalPricing> = {
  TR: {
    region: 'TR',
    currency: {
      code: 'TRY',
      symbol: '₺',
      locale: 'tr-TR',
    },
    baseSetupPrice: 2999,
    pricePerMinute: 6,          // ₺6/dk
    monthlyEmployerCost: 40000,
    packages: {
      starter:  { key: 'starter',  name: 'Essentials', price: 6999,  voiceMinutes: 300  },
      pro:      { key: 'pro',      name: 'Pro',        price: 13999, voiceMinutes: 800  },
      advanced: { key: 'advanced', name: 'Advanced',   price: 16999, voiceMinutes: 1200 },
      business: { key: 'business', name: 'Business',   price: 24999, voiceMinutes: 2000 },
    },
  },
  GB: {
    region: 'GB',
    currency: {
      code: 'GBP',
      symbol: '£',
      locale: 'en-GB',
    },
    baseSetupPrice: 75,         // £75 one-time setup
    pricePerMinute: 0.15,       // £0.15 = 15p/dk
    monthlyEmployerCost: 2200,
    packages: {
      starter:  { key: 'starter',  name: 'Starter',    price: 249, voiceMinutes: 300  },
      pro:      { key: 'pro',      name: 'Growth',     price: 449, voiceMinutes: 800  },
      advanced: { key: 'advanced', name: 'Scale',      price: 549, voiceMinutes: 1200 },
      business: { key: 'business', name: 'Enterprise', price: 799, voiceMinutes: 2000 },
    },
  },
};

export function resolveRegionByCountry(countryCode?: string | null): PricingRegionCode {
  return countryCode?.toUpperCase() === 'TR' ? 'TR' : 'GB';
}
