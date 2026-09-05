/**
 * MGL — Fiyat modeli (tek kaynak)
 *
 * 2026-09-02'de kuruldu, 2026-09-04'te ikinci mimariye genişletildi
 * (gerekçe: kullanıcı talimatı — "pricing engine", tek seferlik + finansmanlı
 * seçenekler, MGL Care, lead sistemi kredi modeli). Değişiklik geçmişi PLAN.md.
 *
 * ⚠️ TRY POLİTİKASI — 2026-09-04:
 * Bu turda tanıtılan tamamen YENİ fiyat noktaları (MGL Care, web finansman
 * planları, otomasyon Tier B finansmanı, lead+mail kredi fiyatları) için
 * TL karşılığı UYDURULMADI — kullanıcı açık talimat verdi. Bu kalemlerde
 * `priceTbd: true` işaretlenir ve TR bölgesinde "İletişime geçin" gösterilir.
 * Sadece ÖNCEDEN ONAYLANMIŞ bir GBP değeriyle birebir aynı yeni bir kalem
 * varsa (örn. £9,90 — zaten Voice/WhatsApp'ta 649 TL karşılığı onaylı) o
 * eşleşme yeniden kullanılıyor; bu "icat" değil, mevcut kararın tekrarı.
 *
 * Model üç kalemden oluşur ve müşteri bu üçünü ezberleyebilmeli:
 *   1) Kurulum  — £0 (hazır ürün) / £200 (tek şey) / £400 (işletmenin bütünü) / £500 (entegrasyonlu)
 *   2) Aylık    — £9,90 (asistan sistemi) / £29 (kurulmuş sistem bakımı) / £99-169 (reklam)
 *   3) Kullanım — kontör: sesli dakika, WhatsApp AI yanıtı
 *
 * Kur: £1 = 65 ₺ (yalnızca önceden onaylanmış kalemler için geçerli).
 */

export type PricingRegionCode = 'TR' | 'GB';

export type CurrencyConfig = {
  code: 'TRY' | 'GBP';
  symbol: '₺' | '£';
  locale: 'tr-TR' | 'en-GB';
};

export type PackageCategoryKey = 'agents' | 'systems' | 'web' | 'ads';

export type PackageTierKey =
  // Hazır ürünler — kurulum yok, kontörle çalışır
  | 'voice'
  | 'whatsapp'
  // Kurulan sistemler — kurulum + bakım
  | 'automation'
  | 'leadmail'
  // Web
  | 'web-landing'
  | 'web-site'
  | 'web-integrated'
  // Web sonrası — satılabilir "tier" değil, bilgi kartı
  | 'website-care'
  // Reklam
  | 'ads-meta'
  | 'ads-google'
  | 'ads-both';

/** Kontörlü ürünlerde ölçülen birim. */
export type UsageUnit = 'minute' | 'message';

/**
 * Düşük giriş bariyerli finansman seçeneği: peşin yerine küçük bir başlangıç
 * + N ay taksit. `months` dolunca ürün "ödenmiş" sayılır — sonrasında ayrı
 * bir bakım/platform bedeline geçilir (bkz. websiteCareTransition).
 */
export type FinancingPlan = {
  downPayment: number;
  monthlyAmount: number;
  months: number;
  /** Bu bölgede rakam henüz onaylanmadı — UI "İletişime geçin" göstermeli. */
  priceTbd?: boolean;
};

export type PackageTier = {
  key: PackageTierKey;
  category: PackageCategoryKey;
  name: string;
  /** Tekrarlayan bedel (0 = yok). Birimi priceUnit ile belirlenir. */
  price: number;
  /** Tek seferlik kurulum (0 = kurulum yok). */
  setupFee: number;
  /** Tekrarlayan bedelin birimi. Web paketlerinde 'year' (hosting). */
  priceUnit?: 'month' | 'year';
  /** Kontörlü ürünlerde ölçülen birim. Yoksa ürün kullanım bazlı değildir. */
  usageUnit?: UsageUnit;
  /** Kontör almadan kullananın standart birim fiyatı (bölgesel para birimi). */
  usageRate?: number;
  /** Vitrinde "…'den başlayan" öneki gösterilsin mi. */
  priceFrom?: boolean;
  /** Fiyat yerine "Teklife göre" yazılsın mı. */
  customPrice?: boolean;
  /** Başlık fiyatı kurulum, alt satır tekrarlayan bedel (web paketleri). */
  oneOffSetup?: boolean;
  /** Reklam bütçesi üzerinden alınan yüzde. Yeni modelde 0 — sabit ücret. */
  adManagementPercent: number;
  /** Vaat edilen kurulum süresi (iş günü). 0 = belirtilmiyor. */
  deliveryDays: number;
  /** Peşin yerine düşük başlangıç + taksit seçeneği (web, otomasyon). */
  financing?: FinancingPlan;
  /** "En popüler / en iyi değer" rozeti — vitrinde bir tanesi olmalı. */
  featured?: boolean;
  /** Bu bölgede fiyat henüz onaylanmadı — "İletişime geçin" gösterilir. */
  priceTbd?: boolean;
  /** Büyük/özel kullanım eşiğinin üstü için not (örn. reklam bütçesi tavanı). */
  enterpriseNote?: { tr: string; en: string };
};

/** Kontör paketi — hacimle birim fiyat düşer. */
export type CreditPack = {
  key: string;
  product: 'voice' | 'whatsapp';
  /** Paketteki dakika veya mesaj adedi. */
  units: number;
  /** Paketin toplam fiyatı (bölgesel para birimi). */
  price: number;
  /** Birim fiyat — units'ten türetilebilir ama vitrinde yuvarlanmış hâli gösterilir. */
  unitRate: number;
  name: string;
};

/** Paket almadan kullananın kademeli tarifesi (üst sınır dahil). */
export type UsageTier = {
  upTo: number;
  rate: number;
};

/**
 * Lead + Mail sisteminde kredi harcayan işlem kategorileri.
 * Bilinçli olarak £/kredi rakamı YOK — gerçek backend ekonomisi henüz
 * onaylanmadığı için kullanıcı talimatıyla uydurulmadı (bkz. dosya başı not).
 * Yalnızca "neye kredi harcanır" açıklanır.
 */
export type LeadCreditCategory = { tr: string; en: string };

export const LEAD_CREDIT_CATEGORIES: LeadCreditCategory[] = [
  { tr: 'Hedef işletme araştırması', en: 'Target business research' },
  { tr: 'E-posta doğrulama', en: 'Email verification' },
  { tr: 'Veri zenginleştirme', en: 'Data enrichment' },
  { tr: 'Kişiselleştirilmiş e-posta yazımı', en: 'Personalised email drafting' },
  { tr: 'Takip mesajı', en: 'Follow-up message' },
];

export type RegionalPricing = {
  region: PricingRegionCode;
  currency: CurrencyConfig;
  /** Sesli asistan standart dakika fiyatı — ROI hesaplarında referans. */
  pricePerMinute: number;
  /** Karşılaştırmalarda kullanılan aylık personel maliyeti referansı. */
  monthlyEmployerCost: number;
  /** Termal yazıcı — takeaway'de opsiyonel donanım. */
  thermalPrinterPrice: number;
  packages: Record<PackageTierKey, PackageTier>;
  creditPacks: CreditPack[];
  voiceUsageTiers: UsageTier[];
};

const TR_PACKAGES: Record<PackageTierKey, PackageTier> = {
  voice: {
    key: 'voice',
    category: 'agents',
    name: 'Sesli Asistan',
    price: 649,
    setupFee: 0,
    priceUnit: 'month',
    usageUnit: 'minute',
    usageRate: 16,
    adManagementPercent: 0,
    deliveryDays: 7,
  },
  whatsapp: {
    key: 'whatsapp',
    category: 'agents',
    name: 'WhatsApp Asistanı',
    price: 649,
    setupFee: 0,
    priceUnit: 'month',
    usageUnit: 'message',
    usageRate: 0.45,
    adManagementPercent: 0,
    deliveryDays: 5,
  },
  automation: {
    key: 'automation',
    category: 'systems',
    name: 'Otomasyon Sistemi',
    price: 1899,
    setupFee: 25999,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 7,
    // Tier B (düşük başlangıçlı finansman): GBP'de yeni tanıtıldı, TL'si onaylı değil.
    financing: { downPayment: 0, monthlyAmount: 0, months: 12, priceTbd: true },
  },
  leadmail: {
    key: 'leadmail',
    category: 'systems',
    // YENİ MODEL (2026-09-04): setup kalktı, aylık platform bedeli + kredi.
    // £9,90 = 649 TL eşleşmesi bu sitede zaten onaylı (Voice/WhatsApp) — yeni
    // icat değil, aynı kararın tekrar kullanımı.
    name: 'Lead + Mail Sistemi',
    price: 649,
    setupFee: 0,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 5,
  },
  'web-landing': {
    key: 'web-landing',
    category: 'web',
    name: 'Tek Sayfa Site',
    price: 6499,
    setupFee: 12999,
    priceUnit: 'year',
    oneOffSetup: true,
    adManagementPercent: 0,
    deliveryDays: 3,
  },
  'web-site': {
    key: 'web-site',
    category: 'web',
    name: 'Kurumsal Site',
    price: 6499,
    setupFee: 25999,
    priceUnit: 'year',
    oneOffSetup: true,
    adManagementPercent: 0,
    deliveryDays: 5,
    // Finansmanlı seçenek GBP'de yeni — TL'si onaylı değil.
    financing: { downPayment: 0, monthlyAmount: 0, months: 12, priceTbd: true },
  },
  'web-integrated': {
    key: 'web-integrated',
    category: 'web',
    name: 'Entegrasyonlu Site',
    price: 6499,
    setupFee: 32499,
    priceUnit: 'year',
    oneOffSetup: true,
    adManagementPercent: 0,
    deliveryDays: 7,
    featured: true,
    financing: { downPayment: 0, monthlyAmount: 0, months: 12, priceTbd: true },
  },
  'website-care': {
    key: 'website-care',
    category: 'web',
    name: 'MGL Care',
    price: 0,
    setupFee: 0,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 0,
    priceTbd: true, // GBP'de yeni tanıtıldı (£14,90), TL'si onaylı değil.
  },
  'ads-meta': {
    key: 'ads-meta',
    category: 'ads',
    name: 'Meta Reklam Yönetimi',
    price: 6499,
    setupFee: 0,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 3,
    enterpriseNote: {
      tr: 'Standart küçük ve orta ölçekli işletme kampanyaları için. Yüksek bütçeli, çok lokasyonlu veya özel kampanya yapıları özel fiyatlandırılır.',
      en: 'For standard small and medium business campaigns. High-budget, multi-location or custom campaign structures are quoted separately.',
    },
  },
  'ads-google': {
    key: 'ads-google',
    category: 'ads',
    name: 'Google Reklam Yönetimi',
    price: 6499,
    setupFee: 0,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 3,
    enterpriseNote: {
      tr: 'Standart küçük ve orta ölçekli işletme kampanyaları için. Yüksek bütçeli, çok lokasyonlu veya özel kampanya yapıları özel fiyatlandırılır.',
      en: 'For standard small and medium business campaigns. High-budget, multi-location or custom campaign structures are quoted separately.',
    },
  },
  'ads-both': {
    key: 'ads-both',
    category: 'ads',
    name: 'Meta + Google',
    price: 10999,
    setupFee: 0,
    priceUnit: 'month',
    adManagementPercent: 0,
    deliveryDays: 3,
    enterpriseNote: {
      tr: 'Standart küçük ve orta ölçekli işletme kampanyaları için. Yüksek bütçeli, çok lokasyonlu veya özel kampanya yapıları özel fiyatlandırılır.',
      en: 'For standard small and medium business campaigns. High-budget, multi-location or custom campaign structures are quoted separately.',
    },
  },
};

const GB_PACKAGES: Record<PackageTierKey, PackageTier> = {
  voice: { ...TR_PACKAGES.voice, name: 'Voice Assistant', price: 9.9, usageRate: 0.25 },
  whatsapp: { ...TR_PACKAGES.whatsapp, name: 'WhatsApp Assistant', price: 9.9, usageRate: 0.007 },
  automation: {
    ...TR_PACKAGES.automation,
    name: 'Automation System',
    price: 29,
    setupFee: 399, // Kullanıcı talimatı: £400 değil, £399.
    financing: { downPayment: 49, monthlyAmount: 49, months: 12 },
  },
  leadmail: { ...TR_PACKAGES.leadmail, name: 'Lead + Email System', price: 9.9 },
  'web-landing': { ...TR_PACKAGES['web-landing'], name: 'One-Page Website', price: 100, setupFee: 200 },
  'web-site': {
    ...TR_PACKAGES['web-site'],
    name: 'Business Website',
    price: 100,
    setupFee: 400,
    financing: { downPayment: 49, monthlyAmount: 39, months: 12 },
  },
  'web-integrated': {
    ...TR_PACKAGES['web-integrated'],
    name: 'Integrated Website',
    price: 100,
    setupFee: 500,
    featured: true,
    financing: { downPayment: 49, monthlyAmount: 49, months: 12 },
  },
  'website-care': {
    ...TR_PACKAGES['website-care'],
    name: 'MGL Care',
    price: 14.9,
    priceTbd: false,
  },
  'ads-meta': { ...TR_PACKAGES['ads-meta'], name: 'Meta Ads Management', price: 99 },
  'ads-google': { ...TR_PACKAGES['ads-google'], name: 'Google Ads Management', price: 99 },
  'ads-both': { ...TR_PACKAGES['ads-both'], name: 'Meta + Google', price: 169 },
};

export const REGIONAL_PRICING: Record<PricingRegionCode, RegionalPricing> = {
  TR: {
    region: 'TR',
    currency: { code: 'TRY', symbol: '₺', locale: 'tr-TR' },
    pricePerMinute: 16,
    monthlyEmployerCost: 40000,
    thermalPrinterPrice: 12999,
    packages: TR_PACKAGES,
    creditPacks: [
      { key: 'voice-500', product: 'voice', units: 500, price: 7499, unitRate: 15, name: 'Başlangıç' },
      { key: 'voice-1000', product: 'voice', units: 1000, price: 13999, unitRate: 14, name: 'Yoğun' },
      { key: 'voice-2000', product: 'voice', units: 2000, price: 25999, unitRate: 13, name: 'Hacimli' },
      { key: 'wa-5000', product: 'whatsapp', units: 5000, price: 1899, unitRate: 0.38, name: 'Başlangıç' },
      { key: 'wa-10000', product: 'whatsapp', units: 10000, price: 3199, unitRate: 0.32, name: 'Yoğun' },
      { key: 'wa-20000', product: 'whatsapp', units: 20000, price: 5799, unitRate: 0.29, name: 'Hacimli' },
    ],
    voiceUsageTiers: [
      { upTo: 200, rate: 16 },
      { upTo: 500, rate: 15 },
      { upTo: 1000, rate: 14 },
      { upTo: 2000, rate: 13 },
    ],
  },
  GB: {
    region: 'GB',
    currency: { code: 'GBP', symbol: '£', locale: 'en-GB' },
    pricePerMinute: 0.25,
    monthlyEmployerCost: 2200,
    thermalPrinterPrice: 199,
    packages: GB_PACKAGES,
    creditPacks: [
      { key: 'voice-500', product: 'voice', units: 500, price: 115, unitRate: 0.23, name: 'Starter' },
      { key: 'voice-1000', product: 'voice', units: 1000, price: 210, unitRate: 0.21, name: 'Busy' },
      { key: 'voice-2000', product: 'voice', units: 2000, price: 400, unitRate: 0.2, name: 'Volume' },
      { key: 'wa-5000', product: 'whatsapp', units: 5000, price: 29, unitRate: 0.0058, name: 'Starter' },
      { key: 'wa-10000', product: 'whatsapp', units: 10000, price: 49, unitRate: 0.0049, name: 'Busy' },
      { key: 'wa-20000', product: 'whatsapp', units: 20000, price: 89, unitRate: 0.00445, name: 'Volume' },
    ],
    voiceUsageTiers: [
      { upTo: 200, rate: 0.25 },
      { upTo: 500, rate: 0.23 },
      { upTo: 1000, rate: 0.21 },
      { upTo: 2000, rate: 0.2 },
    ],
  },
};

export function resolveRegionByCountry(countryCode?: string | null): PricingRegionCode {
  return countryCode?.toUpperCase() === 'TR' ? 'TR' : 'GB';
}

export const AGENT_TIER_KEYS: PackageTierKey[] = ['voice', 'whatsapp'];
export const SYSTEM_TIER_KEYS: PackageTierKey[] = ['automation', 'leadmail'];
// website-care kasıtlı olarak burada YOK — satılan bir "tier" değil, web
// sekmesinde ayrı bir bilgi kartı olarak gösteriliyor (12 ay sonrası).
export const WEB_TIER_KEYS: PackageTierKey[] = ['web-landing', 'web-site', 'web-integrated'];
export const ADS_TIER_KEYS: PackageTierKey[] = ['ads-meta', 'ads-google', 'ads-both'];

export function tierKeysForCategory(category: PackageCategoryKey): PackageTierKey[] {
  if (category === 'ads') return ADS_TIER_KEYS;
  if (category === 'web') return WEB_TIER_KEYS;
  if (category === 'systems') return SYSTEM_TIER_KEYS;
  return AGENT_TIER_KEYS;
}

export function isPackageCategoryKey(value: string | null | undefined): value is PackageCategoryKey {
  return value === 'ads' || value === 'agents' || value === 'web' || value === 'systems';
}

export function creditPacksFor(
  region: PricingRegionCode,
  product: 'voice' | 'whatsapp'
): CreditPack[] {
  return REGIONAL_PRICING[region].creditPacks.filter((pack) => pack.product === product);
}

/**
 * Kademeli tarifeyle sesli asistan kullanım bedeli.
 * Dakikalar kademelere bölünür; her kademe kendi fiyatından hesaplanır.
 */
export function voiceUsageCost(minutes: number, region: PricingRegionCode): number {
  const tiers = REGIONAL_PRICING[region].voiceUsageTiers;
  const used = Math.max(0, minutes);

  // Girilen kademenin oranı TÜM dakikalara uygulanır — kademeler ayrı ayrı
  // toplanmaz. Örnek: 300 dakika, 201-500 bandındadır, hepsi 23p'den işler.
  // mglsystems.uk (AloSipariş) canlıda bu yöntemi kullanıyor; iki sitenin aynı
  // dakika için farklı toplam göstermemesi için burası ona hizalandı.
  const band = tiers.find((tier) => used <= tier.upTo) ?? tiers[tiers.length - 1];
  return used * band.rate;
}
