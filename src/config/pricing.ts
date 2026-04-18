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
  /** Included voice assistant minutes for this tier (0 = no voice) */
  voiceMinutes: number;
  /** Included chat conversations per month (WhatsApp / IG DM) */
  chatConversations: number;
  /** One-time setup fee for this tier (0 = included) */
  setupFee: number;
  /** Overage price per 100 chat conversations beyond the monthly quota */
  overageChatPer100: number;
  /** Overage price per 100 voice minutes beyond the monthly quota (0 if no voice) */
  overageVoicePer100: number;
};

export type RegionalPricing = {
  region: PricingRegionCode;
  currency: CurrencyConfig;
  /** Legacy — kept for backwards compatibility with any lingering references. */
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
    baseSetupPrice: 0,
    pricePerMinute: 6,
    monthlyEmployerCost: 40000,
    packages: {
      starter: {
        key: 'starter',
        name: 'Başlangıç',
        price: 1999,
        voiceMinutes: 0,
        chatConversations: 500,
        setupFee: 0,
        overageChatPer100: 399,
        overageVoicePer100: 0,
      },
      pro: {
        key: 'pro',
        name: 'Büyüme',
        price: 4999,
        voiceMinutes: 0,
        chatConversations: 1500,
        setupFee: 0,
        overageChatPer100: 349,
        overageVoicePer100: 0,
      },
      advanced: {
        key: 'advanced',
        name: 'Oto-Sekreter',
        price: 12999,
        voiceMinutes: 500,
        chatConversations: 1500,
        setupFee: 14999,
        overageChatPer100: 349,
        overageVoicePer100: 1499,
      },
      business: {
        key: 'business',
        name: 'Tam Otonomi',
        price: 24999,
        voiceMinutes: 2000,
        chatConversations: 5000,
        setupFee: 24999,
        overageChatPer100: 299,
        overageVoicePer100: 1299,
      },
    },
  },
  GB: {
    region: 'GB',
    currency: {
      code: 'GBP',
      symbol: '£',
      locale: 'en-GB',
    },
    baseSetupPrice: 0,
    pricePerMinute: 0.15,
    monthlyEmployerCost: 2200,
    packages: {
      starter: {
        key: 'starter',
        name: 'Starter',
        price: 59,
        voiceMinutes: 0,
        chatConversations: 500,
        setupFee: 0,
        overageChatPer100: 12,
        overageVoicePer100: 0,
      },
      pro: {
        key: 'pro',
        name: 'Growth',
        price: 149,
        voiceMinutes: 0,
        chatConversations: 1500,
        setupFee: 0,
        overageChatPer100: 10,
        overageVoicePer100: 0,
      },
      advanced: {
        key: 'advanced',
        name: 'Auto-Receptionist',
        price: 399,
        voiceMinutes: 500,
        chatConversations: 1500,
        setupFee: 450,
        overageChatPer100: 10,
        overageVoicePer100: 45,
      },
      business: {
        key: 'business',
        name: 'Full Autonomy',
        price: 749,
        voiceMinutes: 2000,
        chatConversations: 5000,
        setupFee: 750,
        overageChatPer100: 9,
        overageVoicePer100: 39,
      },
    },
  },
};

export function resolveRegionByCountry(countryCode?: string | null): PricingRegionCode {
  return countryCode?.toUpperCase() === 'TR' ? 'TR' : 'GB';
}
