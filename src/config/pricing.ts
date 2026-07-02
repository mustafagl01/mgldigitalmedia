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
  | 'ads-starter'
  | 'ads-growth'
  | 'ads-scale'
  | 'web-landing'
  | 'web-site'
  | 'web-platform'
  | 'web-custom'
  | 'web-pro';

export type PackageTier = {
  key: PackageTierKey;
  category: PackageCategoryKey;
  name: string;
  /** Monthly retainer price in regional currency. Ignored when customPrice is true. */
  price: number;
  /** One-time setup fee in regional currency (0 = included). */
  setupFee: number;
  /** Agent-only: included voice assistant minutes per month (0 = no voice / pass-through) */
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
  /** Display a "From £X" prefix on the headline price */
  priceFrom?: boolean;
  /** Render the headline price as "Quote only" instead of a number */
  customPrice?: boolean;
  /** One-off setup model: headline = setupFee, sub-line = recurring price (used for web tiers) */
  oneOffSetup?: boolean;
  /** Recurring price unit shown next to the figure ('month' default, 'year' for hosting-based plans) */
  priceUnit?: 'month' | 'year';
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
        name: 'Temel Otomasyon',
        price: 6999,
        setupFee: 19999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
      },
      pro: {
        key: 'pro',
        category: 'agents',
        name: 'Operasyonel Merkez',
        price: 17999,
        setupFee: 49999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 14,
        priceFrom: true,
      },
      advanced: {
        key: 'advanced',
        category: 'agents',
        name: 'AI Çözüm Ortağı',
        price: 34999,
        setupFee: 89999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 0,
        priceFrom: true,
      },
      'ads-starter': {
        key: 'ads-starter',
        category: 'ads',
        name: 'Reklam Başlangıç',
        price: 9999,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 5,
        priceFrom: true,
      },
      'ads-growth': {
        key: 'ads-growth',
        category: 'ads',
        name: 'Büyüme Reklamları',
        price: 24999,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
      },
      'ads-scale': {
        key: 'ads-scale',
        category: 'ads',
        name: 'Scale Partner',
        price: 49999,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 10,
        priceFrom: true,
      },
      'web-landing': {
        key: 'web-landing',
        category: 'web',
        name: 'Kurumsal Site',
        price: 3499,
        setupFee: 6999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-site': {
        key: 'web-site',
        category: 'web',
        name: 'Randevu Sitesi',
        price: 3499,
        setupFee: 12499,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 14,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-platform': {
        key: 'web-platform',
        category: 'web',
        name: 'Online Sipariş Sitesi',
        price: 3499,
        setupFee: 17999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 21,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-custom': {
        key: 'web-custom',
        category: 'web',
        name: 'Akıllı Site',
        price: 3499,
        setupFee: 32999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 28,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-pro': {
        key: 'web-pro',
        category: 'web',
        name: 'Profesyonel Hizmet Sitesi',
        price: 3499,
        setupFee: 44999,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 28,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
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
        name: 'Core Automation',
        price: 199,
        setupFee: 499,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
      },
      pro: {
        key: 'pro',
        category: 'agents',
        name: 'Operational Hub',
        price: 499,
        setupFee: 1200,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 14,
        priceFrom: true,
      },
      advanced: {
        key: 'advanced',
        category: 'agents',
        name: 'AI Solution Partner',
        price: 999,
        setupFee: 2500,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 0,
        priceFrom: true,
      },
      'ads-starter': {
        key: 'ads-starter',
        category: 'ads',
        name: 'Ad Start',
        price: 300,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 5,
        priceFrom: true,
      },
      'ads-growth': {
        key: 'ads-growth',
        category: 'ads',
        name: 'Growth Ads',
        price: 750,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
      },
      'ads-scale': {
        key: 'ads-scale',
        category: 'ads',
        name: 'Scale Partner',
        price: 1500,
        setupFee: 0,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 10,
        priceFrom: true,
      },
      'web-landing': {
        key: 'web-landing',
        category: 'web',
        name: 'Business Website',
        price: 100,
        setupFee: 200,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 7,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-site': {
        key: 'web-site',
        category: 'web',
        name: 'Booking Website',
        price: 100,
        setupFee: 350,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 14,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-platform': {
        key: 'web-platform',
        category: 'web',
        name: 'Online Ordering Website',
        price: 100,
        setupFee: 500,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 21,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-custom': {
        key: 'web-custom',
        category: 'web',
        name: 'Smart Website',
        price: 100,
        setupFee: 900,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 28,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
      'web-pro': {
        key: 'web-pro',
        category: 'web',
        name: 'Bespoke Professional',
        price: 100,
        setupFee: 1250,
        voiceMinutes: 0,
        chatConversations: 0,
        overageChatPer100: 0,
        overageVoicePer100: 0,
        adManagementPercent: 0,
        deliveryDays: 28,
        priceFrom: true,
        oneOffSetup: true,
        priceUnit: 'year',
      },
    },
  },
};

export function resolveRegionByCountry(countryCode?: string | null): PricingRegionCode {
  return countryCode?.toUpperCase() === 'TR' ? 'TR' : 'GB';
}

export const AGENT_TIER_KEYS: PackageTierKey[] = ['starter', 'pro', 'advanced'];
export const ADS_TIER_KEYS: PackageTierKey[] = ['ads-starter', 'ads-growth', 'ads-scale'];
export const WEB_TIER_KEYS: PackageTierKey[] = ['web-landing', 'web-site', 'web-platform', 'web-custom', 'web-pro'];

export function tierKeysForCategory(category: PackageCategoryKey): PackageTierKey[] {
  if (category === 'ads') return ADS_TIER_KEYS;
  if (category === 'web') return WEB_TIER_KEYS;
  return AGENT_TIER_KEYS;
}

export function isPackageCategoryKey(value: string | null | undefined): value is PackageCategoryKey {
  return value === 'ads' || value === 'agents' || value === 'web';
}
