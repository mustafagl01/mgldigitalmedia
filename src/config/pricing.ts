export type PricingRegionCode = 'TR' | 'GB';

export type CurrencyConfig = {
  code: 'TRY' | 'GBP';
  symbol: '₺' | '£';
  locale: 'tr-TR' | 'en-GB';
};

export type PackageCategoryKey = 'ads' | 'agents' | 'web';

export type PackageTierKey =
  | 'starter'
  | 'pro'
  | 'advanced'
  | 'business'
  | 'ads-starter'
  | 'ads-growth'
  | 'ads-scale'
  | 'web-landing'
  | 'web-site'
  | 'web-platform';

export type PackageTier = {
  key: PackageTierKey;
  category: PackageCategoryKey;
  name: string;
  /** Monthly retainer price in regional currency */
  price: number;
  /** One-time setup fee in regional currency (0 = included) */
  setupFee: number;
  /** Agent-only: included voice assistant minutes per month (0 = no voice) */
  voiceMinutes: number;
  /** Agent-only: included chat conversations per month (WhatsApp / IG DM) */
  chatConversations: number;
  /** Agent-only: overage price per 100 chat conversations beyond quota */
  overageChatPer100: number;
  /** Agent-only: overage price per 100 voice minutes beyond quota (0 if no voice) */
  overageVoicePer100: number;
  /** Ads-only: ad spend management fee percentage (0 = not an ads tier) */
  adManagementPercent: number;
  /** Shared: promised delivery / setup time in business days (0 = N/A) */
  deliveryDays: number;
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
        category: 'agents',
        name: 'Başlangıç',
        price: 3999,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 500,
        overageChatPer100: 50,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 3,
      },
      pro: {
        key: 'pro',
        category: 'agents',
        name: 'Büyüme',
        price: 9999,
        setupFee: 4999,
        voiceMinutes: 0,
        chatConversations: 1500,
        overageChatPer100: 40,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 5,
      },
      advanced: {
        key: 'advanced',
        category: 'agents',
        name: 'Oto-Sekreter',
        price: 14999,
        setupFee: 14999,
        voiceMinutes: 500,
        chatConversations: 1500,
        overageChatPer100: 40,
        overageVoicePer100: 500,
        adManagementPercent: 0,
        deliveryDays: 14,
      },
      business: {
        key: 'business',
        category: 'agents',
        name: 'Tam Otonomi',
        price: 24999,
        setupFee: 24999,
        voiceMinutes: 2000,
        chatConversations: 5000,
        overageChatPer100: 30,
        overageVoicePer100: 400,
        adManagementPercent: 0,
        deliveryDays: 21,
      },
      'ads-starter': {
        key: 'ads-starter',
        category: 'ads',
        name: 'Tek Kanal',
        price: 9999,
        setupFee: 9999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 5,
      },
      'ads-growth': {
        key: 'ads-growth',
        category: 'ads',
        name: 'Çift Kanal + SEO',
        price: 19999,
        setupFee: 24999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 7,
      },
      'ads-scale': {
        key: 'ads-scale',
        category: 'ads',
        name: 'Full Funnel',
        price: 39999,
        setupFee: 49999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 10,
      },
      'web-landing': {
        key: 'web-landing',
        category: 'web',
        name: 'Tek Sayfa',
        price: 999,
        setupFee: 19999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
      },
      'web-site': {
        key: 'web-site',
        category: 'web',
        name: 'Kurumsal Site',
        price: 3999,
        setupFee: 49999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 21,
      },
      'web-platform': {
        key: 'web-platform',
        category: 'web',
        name: 'Dönüşüm Platformu',
        price: 7999,
        setupFee: 89999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 45,
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
        category: 'agents',
        name: 'Starter',
        price: 119,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 500,
        overageChatPer100: 1.5,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 3,
      },
      pro: {
        key: 'pro',
        category: 'agents',
        name: 'Growth',
        price: 299,
        setupFee: 149,
        voiceMinutes: 0,
        chatConversations: 1500,
        overageChatPer100: 1.2,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 5,
      },
      advanced: {
        key: 'advanced',
        category: 'agents',
        name: 'Auto-Receptionist',
        price: 449,
        setupFee: 450,
        voiceMinutes: 500,
        chatConversations: 1500,
        overageChatPer100: 1.2,
        overageVoicePer100: 15,
        adManagementPercent: 0,
        deliveryDays: 14,
      },
      business: {
        key: 'business',
        category: 'agents',
        name: 'Full Autonomy',
        price: 749,
        setupFee: 750,
        voiceMinutes: 2000,
        chatConversations: 5000,
        overageChatPer100: 0.9,
        overageVoicePer100: 12,
        adManagementPercent: 0,
        deliveryDays: 21,
      },
      'ads-starter': {
        key: 'ads-starter',
        category: 'ads',
        name: 'Single Channel',
        price: 349,
        setupFee: 299,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 5,
      },
      'ads-growth': {
        key: 'ads-growth',
        category: 'ads',
        name: 'Dual Channel + SEO',
        price: 699,
        setupFee: 699,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 7,
      },
      'ads-scale': {
        key: 'ads-scale',
        category: 'ads',
        name: 'Full Funnel',
        price: 1399,
        setupFee: 1499,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 10,
        deliveryDays: 10,
      },
      'web-landing': {
        key: 'web-landing',
        category: 'web',
        name: 'Single Landing',
        price: 29,
        setupFee: 599,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
      },
      'web-site': {
        key: 'web-site',
        category: 'web',
        name: 'Corporate Site',
        price: 119,
        setupFee: 1499,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 21,
      },
      'web-platform': {
        key: 'web-platform',
        category: 'web',
        name: 'Conversion Platform',
        price: 239,
        setupFee: 2699,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 45,
      },
    },
  },
};

export function resolveRegionByCountry(countryCode?: string | null): PricingRegionCode {
  return countryCode?.toUpperCase() === 'TR' ? 'TR' : 'GB';
}

export const AGENT_TIER_KEYS: PackageTierKey[] = ['starter', 'pro', 'advanced', 'business'];
export const ADS_TIER_KEYS: PackageTierKey[] = ['ads-starter', 'ads-growth', 'ads-scale'];
export const WEB_TIER_KEYS: PackageTierKey[] = ['web-landing', 'web-site', 'web-platform'];

export function tierKeysForCategory(category: PackageCategoryKey): PackageTierKey[] {
  if (category === 'ads') return ADS_TIER_KEYS;
  if (category === 'web') return WEB_TIER_KEYS;
  return AGENT_TIER_KEYS;
}

export function isPackageCategoryKey(value: string | null | undefined): value is PackageCategoryKey {
  return value === 'ads' || value === 'agents' || value === 'web';
}
