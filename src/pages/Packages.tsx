import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Calendar, Check, ChevronDown, MessageCircle, ShieldCheck, ArrowUpRight, X, Stethoscope, UtensilsCrossed, Home as HomeIcon, ShoppingBag, Scissors, Wrench } from 'lucide-react';
import {
  type PackageCategoryKey,
  type PackageTier,
  type PackageTierKey,
  isPackageCategoryKey,
  tierKeysForCategory,
} from '../config/pricing';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';

type PlanCtaType = 'whatsapp' | 'booking';

type PlanContent = {
  subtitle: { tr: string; en: string };
  included: { tr: string[]; en: string[] };
  excluded: { tr: string[]; en: string[] };
  quotas: { tr: string[]; en: string[] };
  overages: { tr: string[]; en: string[] };
  recommended?: boolean;
  /** Render the card with a dark, premium treatment (for the enterprise tier). */
  premium?: boolean;
  /** Override the CTA destination; defaults to WhatsApp pilot flow. */
  ctaType?: PlanCtaType;
  /** Optional custom CTA label override. */
  ctaLabel?: { tr: string; en: string };
  /** Optional override for the setup-fee prefix label (e.g. "Custom Architecture from"). */
  setupPrefix?: { tr: string; en: string };
  /** Optional note rendered between the feature list and the CTA (e.g. dev-hour rate). */
  footnote?: { tr: string; en: string };
  /** Tiny usage caveat shown in the fine-print row (e.g. "Voice usage billed separately."). */
  usageNote?: { tr: string; en: string };
};

const STRATEGY_CALL_URL = 'https://calendar.app.google/jgu53NFAy7BnYVui8';

type FaqItem = {
  q: { tr: string; en: string };
  a: { tr: string; en: string };
};

type CategoryMeta = {
  key: PackageCategoryKey;
  label: { tr: string; en: string };
  hero: {
    eyebrow: { tr: string; en: string };
    title: { tr: string; en: string };
    lede: { tr: string; en: string };
  };
};

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';

const CATEGORY_META: Record<PackageCategoryKey, CategoryMeta> = {
  ads: {
    key: 'ads',
    label: { tr: 'AI Reklam', en: 'AI Advertising' },
    hero: {
      eyebrow: { tr: 'AI REKLAM PAKETLERİ', en: 'AI ADVERTISING PACKAGES' },
      title: {
        tr: 'Meta, Google ve SEO — tek ekipten.',
        en: 'Meta, Google and SEO — one team.',
      },
      lede: {
        tr: 'Şeffaf fee, reklam bütçesi sizde kalır. AI kreatif, günlük optimizasyon, tek bir ROI panosu. Aralık yok, sabit fiyat.',
        en: 'Transparent fee, your ad budget stays with you. AI creatives, daily optimisation, one ROI dashboard. No ranges — flat prices.',
      },
    },
  },
  agents: {
    key: 'agents',
    label: { tr: 'AI Agent', en: 'AI Agents' },
    hero: {
      eyebrow: { tr: 'AI AGENT PAKETLERİ', en: 'AI AGENT PACKAGES' },
      title: {
        tr: 'İhtiyacınız olan sistemi seçin.',
        en: 'Choose the system you actually need.',
      },
      lede: {
        tr: 'Yalnızca WhatsApp, yalnızca telefon, birleşik ön büro veya çok süreçli operasyon. Her pakette kurulum, kapsam ve kullanım ücretleri açık.',
        en: 'WhatsApp only, phone only, a joined-up front desk, or multi-process operations. Setup, scope and usage are clear in every plan.',
      },
    },
  },
  web: {
    key: 'web',
    label: { tr: 'Web Siteleri', en: 'Websites' },
    hero: {
      eyebrow: { tr: 'WEB SİTESİ PAKETLERİ', en: 'WEBSITE PACKAGES' },
      title: {
        tr: 'Müşteri kazandıran web siteleri.',
        en: 'Websites that win you customers.',
      },
      lede: {
        tr: 'Tek seferlik kurulum, sabit yıllık hosting. Kafenizden takeaway\'inize, randevu alan kliniğinizden muhasebe ve hukuk bürolarına — her ölçek için sade, profesyonel paketler.',
        en: 'One clear setup fee, one flat yearly hosting cost. Honest packages for UK cafés, takeaways, clinics — and bespoke builds for accountants, solicitors and consultancies.',
      },
    },
  },
};

const PLAN_CONTENT: Record<PackageTierKey, PlanContent> = {
  // ---------------- AGENTS ----------------
  starter: {
    subtitle: {
      tr: 'WhatsApp mesajlarını 7/24 yanıtlar, bilgi toplar ve müşteriyi doğru sonraki adıma götürür.',
      en: 'Replies on WhatsApp 24/7, captures the enquiry and moves each customer to the right next step.',
    },
    included: {
      tr: [
        'Onaylı işletme bilgilerinizle 7/24 WhatsApp yanıtı',
        'Sık sorulan sorular, lead bilgisi ve talep toplama',
        'Randevu linki veya takvim, CRM ya da tablo bağlantısı',
        'Gerektiğinde personele aktarma ve kısa görüşme özeti',
        'En fazla 2 n8n otomasyon akışı ve 1 entegrasyon',
        'Aylık Performans Raporu',
        'Aylık 1 saate kadar içerik veya akış güncellemesi',
      ],
      en: [
        '24/7 WhatsApp replies using your approved business information',
        'FAQs, lead details and enquiry capture',
        'Booking link or one calendar, CRM or spreadsheet connection',
        'Human hand-off with a concise conversation summary',
        'Up to 2 n8n automation workflows and 1 integration',
        'Monthly Performance Report',
        'Up to 1 hour/month of content or workflow updates',
      ],
    },
    excluded: {
      tr: ['Telefon aramalarını yanıtlama', 'Çoklu CRM veya özel klinik yazılımı entegrasyonu'],
      en: ['Phone-call handling', 'Multiple CRM or bespoke clinic-software integrations'],
    },
    quotas: {
      tr: ['Aylık 2.000 AI yanıtı', '1 WhatsApp numarası', '1 bağlı sistem'],
      en: ['2,000 AI replies per month', '1 WhatsApp number', '1 connected system'],
    },
    overages: {
      tr: ['Ek AI yanıtı: 2 TL', 'Resmî Meta/BSP mesaj ücretleri kullanılırsa ayrıca yansıtılır'],
      en: ['Additional AI reply: £0.02', 'Official Meta/BSP messaging fees are passed through when used'],
    },
    usageNote: {
      tr: 'AI model/API kullanımı belirtilen kota içinde dahildir. Telefon özelliği bu pakette yoktur.',
      en: 'AI model/API usage is included within the stated allowance. Phone answering is not included.',
    },
  },
  voice: {
    subtitle: {
      tr: 'Gelen çağrıları 7/24 yanıtlar, arayanın talebini anlar ve randevu ya da geri arama oluşturur.',
      en: 'Answers inbound calls 24/7, understands the request and books an appointment or callback.',
    },
    included: {
      tr: [
        'Doğal sesli AI ile 7/24 gelen çağrı yanıtlama',
        'Sık sorulan sorular, arayan bilgisi ve talep toplama',
        'Randevu alma veya geri arama talebi oluşturma',
        'Canlı personele aktarma ve cevapsız durumda güvenli yönlendirme',
        'Çağrı metni, özet ve e-posta/Telegram bildirimi',
        'En fazla 2 n8n otomasyon akışı ve 1 entegrasyon',
        'Aylık 1 saate kadar içerik veya akış güncellemesi',
      ],
      en: [
        '24/7 inbound call handling with a natural AI voice',
        'FAQs, caller details and enquiry capture',
        'Appointment booking or callback-request creation',
        'Live staff transfer with a safe fallback when unavailable',
        'Call transcript, summary and email/Telegram notification',
        'Up to 2 n8n automation workflows and 1 integration',
        'Up to 1 hour/month of content or workflow updates',
      ],
    },
    excluded: {
      tr: ['WhatsApp mesaj yanıtlama', 'Toplu veya yüksek hacimli giden arama kampanyaları'],
      en: ['WhatsApp message handling', 'Bulk or high-volume outbound call campaigns'],
    },
    quotas: {
      tr: ['1 telefon numarası veya çağrı yönlendirmesi', '1 takvim, CRM veya tablo entegrasyonu'],
      en: ['1 phone number or call-forwarding route', '1 calendar, CRM or spreadsheet integration'],
    },
    overages: {
      tr: ['Sesli kullanım: bağlı dakika başına 9 TL (Retell/telefon/ses seçimine göre netleşir)'],
      en: ['Voice usage: £0.15 per connected minute (confirmed against the selected Retell/telephony/voice stack)'],
    },
    usageNote: {
      tr: 'Ses, telefon ve AI model/API maliyeti dakika ücretine dahildir. Yalnızca bağlanan çağrılar ücretlenir.',
      en: 'Voice, telephony and AI model/API costs are included in the minute rate. Only connected calls are billed.',
    },
  },
  pro: {
    subtitle: {
      tr: 'Telefon, WhatsApp ve web taleplerini tek randevu ve müşteri akışında birleştirir.',
      en: 'Joins phone, WhatsApp and website enquiries into one booking and customer workflow.',
    },
    included: {
      tr: [
        'Birlikte çalışan Sesli AI + WhatsApp asistanı',
        'Web formu veya web chat taleplerini aynı akışa alma',
        'Randevu alma, değiştirme, hatırlatma ve no-show takibi',
        'Lead qualification, insan devri ve görüşme özetleri',
        'En fazla 5 n8n otomasyon akışı ve 3 entegrasyon',
        'CRM, takvim, booking sistemi veya Google Sheets bağlantıları',
        'Öncelikli destek ve aylık strateji görüşmesi',
        'Aylık 3 saate kadar içerik veya akış güncellemesi',
      ],
      en: [
        'Voice AI and WhatsApp assistants working together',
        'Website form or live-chat enquiries routed into the same journey',
        'Booking, rescheduling, reminders and no-show follow-up',
        'Lead qualification, human hand-off and conversation summaries',
        'Up to 5 n8n automation workflows and 3 integrations',
        'CRM, calendar, booking-system or Google Sheets connections',
        'Priority support and a monthly strategy call',
        'Up to 3 hours/month of content or workflow updates',
      ],
    },
    excluded: {
      tr: ['Birden fazla departman için ayrı AI agent ekipleri', 'Özel on-premise veya dedicated sunucu'],
      en: ['Separate AI-agent teams for multiple departments', 'Bespoke on-premise or dedicated infrastructure'],
    },
    quotas: {
      tr: ['Aylık 5.000 AI yanıtı', 'Telefon + WhatsApp + web', '5 iş akışı ve 3 entegrasyon'],
      en: ['5,000 AI replies per month', 'Phone + WhatsApp + web', '5 workflows and 3 integrations'],
    },
    overages: {
      tr: ['Sesli kullanım: bağlı dakika başına 9 TL', 'Ek AI yanıtı: 2 TL', 'Üçüncü taraf mesaj ücretleri ayrıca'],
      en: ['Voice usage: £0.15 per connected minute', 'Additional AI reply: £0.02', 'Third-party messaging fees are separate'],
    },
    recommended: true,
    usageNote: {
      tr: 'Metin AI model/API kullanımı kota içinde dahildir. Sesli kullanım ilk bağlı dakikadan ayrıca ücretlenir.',
      en: 'Text AI model/API usage is included within the allowance. Voice is billed separately from the first connected minute.',
    },
  },
  advanced: {
    subtitle: {
      tr: 'Müşteri iletişiminin yanında tahsilat, belge, lead ve iç operasyon akışlarını da otomatikleştirir.',
      en: 'Automates collections, documents, lead follow-up and internal operations alongside customer communication.',
    },
    included: {
      tr: [
        'En fazla 3 ayrı AI agent veya iş süreci',
        'Gelen/giden telefon, WhatsApp, e-posta, SMS ve web akışları',
        'Tahsilat, eksik belge, lead yeniden aktivasyonu ve randevu takibi',
        'En fazla 10 üretim n8n akışı ve 6 entegrasyon',
        'Yönetim dashboard\'u, denetim kaydı ve otomatik raporlama',
        'Hata uyarıları, güvenli insan devri ve operasyon izleme',
        'Atanmış hesap yöneticisi ve öncelikli destek',
        'Aylık 5 saate kadar özel geliştirme veya iyileştirme',
      ],
      en: [
        'Up to 3 separate AI agents or business processes',
        'Inbound/outbound phone, WhatsApp, email, SMS and web workflows',
        'Collections, missing documents, lead reactivation and booking follow-up',
        'Up to 10 production n8n workflows and 6 integrations',
        'Management dashboard, audit trail and automated reporting',
        'Failure alerts, safe human hand-off and operational monitoring',
        'Named account manager and priority support',
        'Up to 5 hours/month of custom development or optimisation',
      ],
    },
    excluded: {
      tr: ['On-premise, SSO ve kurumsal 7/24 SLA; Enterprise teklifi gerektirir'],
      en: ['On-premise, SSO and enterprise 24/7 SLA; these require an Enterprise quote'],
    },
    quotas: {
      tr: ['Aylık 10.000 AI yanıtı', '3 agent/süreç', '10 iş akışı ve 6 entegrasyon'],
      en: ['10,000 AI replies per month', '3 agents/processes', '10 workflows and 6 integrations'],
    },
    overages: {
      tr: ['Sesli kullanım: bağlı dakika başına 9 TL', 'Ek AI yanıtı: 2 TL', 'Ek geliştirme: £80/saat karşılığı'],
      en: ['Voice usage: £0.15 per connected minute', 'Additional AI reply: £0.02', 'Additional development: £80/hour'],
    },
    premium: true,
    ctaType: 'booking',
    ctaLabel: { tr: 'Strateji Görüşmesi Planla', en: 'Book a Strategy Call' },
    footnote: {
      tr: 'Çok şube, dedicated altyapı, SSO veya on-premise ihtiyaçları Enterprise olarak ayrıca kapsamlandırılır.',
      en: 'Multi-location, dedicated infrastructure, SSO or on-premise requirements are scoped separately as Enterprise.',
    },
    usageNote: {
      tr: 'Metin AI model/API kullanımı kota içinde dahildir. Sesli ve üçüncü taraf kanal ücretleri kullanıma göre ayrıca faturalandırılır.',
      en: 'Text AI model/API usage is included within the allowance. Voice and third-party channel fees are billed separately by usage.',
    },
  },

  // ---------------- ADS ----------------
  'ads-starter': {
    subtitle: {
      tr: 'Tek platformda temiz, ölçülebilir bir başlangıç.',
      en: 'A clean, measurable start on a single platform.',
    },
    included: {
      tr: [
        'Kampanya kurulumu',
        'Temel optimizasyon',
        'Aylık raporlama',
        '1 platform',
      ],
      en: [
        'Campaign setup',
        'Basic optimisation',
        'Monthly reporting',
        '1 platform',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'ads-growth': {
    subtitle: {
      tr: 'Çoklu kampanya yönetimi ve sürekli iyileştirme.',
      en: 'Multi-campaign management with ongoing improvement.',
    },
    included: {
      tr: [
        'Çoklu kampanya yönetimi',
        'Haftalık optimizasyon',
        'Kreatif yönlendirme',
        'Aylık performans değerlendirmesi',
        '1–2 platform',
      ],
      en: [
        'Multi-campaign management',
        'Weekly optimisation',
        'Creative guidance',
        'Monthly performance review',
        '1–2 platforms',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    recommended: true,
  },
  'ads-scale': {
    subtitle: {
      tr: 'Ölçeklenmek için tam strateji ve operasyon ortaklığı.',
      en: 'Full strategy and operational partnership for scaling.',
    },
    included: {
      tr: [
        'Tam strateji ve yönetim',
        'Reklam kreatif desteği',
        'Sürekli optimizasyon',
        'Raporlama ve analiz',
        'Çoklu platform desteği',
      ],
      en: [
        'Full strategy and management',
        'Ad creative support',
        'Ongoing optimisation',
        'Reporting and analysis',
        'Multi-platform support',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    premium: true,
  },

  // ---------------- WEB ----------------
  'web-landing': {
    subtitle: {
      tr: 'Kafeler, yerel dükkanlar ve küçük işletmeler için.',
      en: 'Best for cafés, local shops, and small businesses.',
    },
    included: {
      tr: [
        'Tek sayfa kaydırmalı web sitesi',
        'Mobil uyumlu tasarım',
        'İletişim bilgileri, harita, çalışma saatleri',
        'Temel menü / hizmet bölümü',
        '1 revizyon turu',
      ],
      en: [
        'One-page scrolling website',
        'Mobile responsive design',
        'Contact details, map, opening hours',
        'Basic menu / services section',
        'One revision round',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'web-site': {
    subtitle: {
      tr: 'Online randevu veya rezervasyon talebi alan işletmeler için.',
      en: 'For businesses that need online booking or appointment requests.',
    },
    included: {
      tr: [
        'Tek sayfa veya küçük çok bölümlü site',
        'Rezervasyon / talep formu',
        'Takvim bağlantısı',
        'Onay mesajı',
        'Mobil uyumlu tasarım',
        '2 revizyon turu',
      ],
      en: [
        'One-page or small multi-section website',
        'Booking / request form',
        'Calendar connection',
        'Confirmation message',
        'Mobile responsive design',
        'Two revision rounds',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    recommended: true,
  },
  'web-platform': {
    subtitle: {
      tr: 'Restoranlar, marketler ve paket servis tarzı işletmeler için.',
      en: 'For restaurants, markets, and takeaway-style businesses.',
    },
    included: {
      tr: [
        'Sipariş sayfası',
        'Teslimat tarihi / saati seçimi',
        'Sipariş onay akışı',
        'Yönetici bildirimi',
        'Mobil uyumlu tasarım',
        '3 revizyon turu',
      ],
      en: [
        'Ordering page',
        'Delivery date / time selection',
        'Order confirmation flow',
        'Admin notification',
        'Mobile responsive design',
        'Three revision rounds',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'web-custom': {
    subtitle: {
      tr: 'Arka planda otomasyonla çalışan bir site isteyen işletmeler için.',
      en: 'For businesses that want a website with automation behind the scenes.',
    },
    included: {
      tr: [
        'Özel site yapısı',
        'Sipariş / rezervasyon / lead akışı',
        'Bildirim otomasyonu',
        'CRM veya tablo senkronizasyonu',
        'Öncelikli kurulum ve destek',
      ],
      en: [
        'Custom website structure',
        'Order / booking / lead flow',
        'Notification automation',
        'CRM or spreadsheet sync',
        'Priority setup and support',
      ],
    },
    excluded: { tr: [], en: [] },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
  },
  'web-pro': {
    subtitle: {
      tr: 'Muhasebeciler, avukatlar, danışmanlar ve klinikler için üst düzey kurumsal varlık.',
      en: 'For accountants, solicitors, consultants and clinics — a flagship online presence.',
    },
    included: {
      tr: [
        'Tamamen özel çok sayfalı tasarım — şablon yok (5–8 sayfa)',
        'Mevcut içeriğin taşınması + metinlerin profesyonelce düzenlenmesi',
        'Markaya özel üretilmiş görseller — stok fotoğraf yok',
        'Online randevu / booking entegrasyonu',
        'SEO altyapısı: schema, sitemap, Search Console + indexleme',
        'Domain bağlama + SSL',
        'Gerçek cihazlarda mobil, tablet ve masaüstü testi',
        '3 revizyon turu',
        '30 gün yayın sonrası destek',
      ],
      en: [
        'Fully bespoke multi-page design — no templates (5–8 pages)',
        'Existing content migrated + professionally edited copy',
        'Custom brand-matched imagery — no stock photos',
        'Online booking / appointment integration',
        'SEO foundation: schema, sitemap, Search Console + indexing',
        'Domain connection + SSL',
        'Tested on real mobile, tablet and desktop devices',
        'Three revision rounds',
        '30 days post-launch support',
      ],
    },
    excluded: {
      tr: ['Logo tasarımı', 'Sıfırdan içerik yazarlığı', 'Ek sayfalar ve yeni özellikler ayrıca fiyatlandırılır'],
      en: ['Logo design', 'Copywriting from scratch', 'Extra pages and new features quoted separately'],
    },
    quotas: { tr: [], en: [] },
    overages: { tr: [], en: [] },
    premium: true,
  },
};

const COMMON_FAQ: FaqItem[] = [
  {
    q: { tr: 'Sözleşme süresi var mı?', en: 'Is there a contract term?' },
    a: {
      tr: 'Hayır. Aylık abonelik — istediğiniz zaman durdurabilirsiniz. Yıllık ödemede indirim konuşulabilir.',
      en: 'No. Monthly subscription — cancel anytime. Annual billing discount is negotiable.',
    },
  },
  {
    q: { tr: 'Kullanım ve aşım ücretleri nasıl işler?', en: 'How do usage and overage charges work?' },
    a: {
      tr: 'Aylık ücret sistemin kurulumu, bakımı ve belirtilen metin AI yanıt kotasını kapsar. Kota sonrası ek AI yanıtı 2 TL\'dir. Sesli çağrı kullanımı Retell, telefon hattı, ses ve seçilen model maliyetlerini kapsayan ayrı bir kullanım kalemidir; standart oran bağlı dakika başına 9 TL\'dir ve teklif öncesi netleştirilir. Resmî Meta/BSP, SMS veya benzeri kanal ücretleri yalnızca o kanal kullanılırsa ayrıca yansıtılır. Kota dolduğunda sistem durmaz; uyarı gönderilir ve kullanım devam eder.',
      en: 'The monthly fee covers the system, maintenance and the stated text-AI reply allowance. Additional AI replies cost £0.02 each. Voice is a separate usage line covering Retell, telephony, voice and the selected model; the current standard rate is £0.15 per connected minute and is confirmed before launch. Official Meta/BSP, SMS or similar channel fees are passed through only when that channel is used. The system does not stop at quota; you receive an alert and service continues.',
    },
  },
  {
    q: { tr: 'Neden WhatsApp ve sesli kullanım ayrı fiyatlanıyor?', en: 'Why are WhatsApp and voice usage priced separately?' },
    a: {
      tr: 'Çünkü WhatsApp mesajı ile telefon görüşmesinin üçüncü taraf maliyetleri aynı değildir. Böylece az kullanan müşteri yüksek arama hacmini sübvanse etmez; siz de yalnızca gerçek kanal kullanımınız kadar ödersiniz. Aylık paket sistemin işletmesini, kullanım kalemi ise dış servis trafiğini karşılar.',
      en: 'Because the third-party cost of a WhatsApp message is different from the cost of a live phone minute. Separating them means low-usage clients do not subsidise heavy calling, and you pay for the channels you actually use. The monthly plan runs the system; usage covers external channel traffic.',
    },
  },
  {
    q: { tr: 'Verilerim güvende mi?', en: 'Is my data secure?' },
    a: {
      tr: 'Tüm mesaj, çağrı ve sipariş verileri AB lokasyonlu sunucularda tutulur. Üçüncü parti pazarlama paylaşımı yoktur. Kurumsal paketlerde on-premise seçeneği sunulur (KVKK / GDPR uyumlu).',
      en: 'All message, call and order data is stored on EU-region servers. No third-party marketing sharing. Enterprise tiers offer on-premise (KVKK / GDPR compliant).',
    },
  },
];

const CATEGORY_FAQ: Record<PackageCategoryKey, FaqItem[]> = {
  ads: [
    {
      q: { tr: 'Reklam bütçesi fiyata dahil mi?', en: 'Is ad spend included in the price?' },
      a: {
        tr: 'Hayır. Reklam bütçesi direkt Meta / Google\'a ödenir — biz tahsil etmez, biz kesmez. Yönetim payı (%10) yalnızca bu bütçe üzerinden hesaplanır ve aylık fee\'den ayrı bir kalemdir.',
        en: 'No. Ad spend is paid directly to Meta / Google — we do not collect or deduct it. The 10% management fee is calculated only on that budget and is billed separately from the monthly retainer.',
      },
    },
    {
      q: { tr: 'Minimum reklam bütçesi önerir misiniz?', en: 'Is there a minimum ad budget?' },
      a: {
        tr: 'Starter için 500 ₺ / gün (≈ 15.000 ₺ / ay). Growth için 1.000 ₺ / gün, Scale için 2.500 ₺ / gün. Altı da çalışır ama veri toplama süresi uzar.',
        en: 'For Starter we recommend £15 / day (≈ £450 / month). Growth £30 / day, Scale £75 / day. Lower is possible but data collection takes longer.',
      },
    },
    {
      q: { tr: 'Raporlar nasıl paylaşılır?', en: 'How are reports shared?' },
      a: {
        tr: 'Tüm tier\'larda GA4 + platform dashboard\'larına erişiminiz var. Growth\'tan itibaren tek ekranda birleşik ROI dashboard. Scale\'de günlük otomatik PDF özeti e-posta ile gelir.',
        en: 'Every tier gives you access to GA4 + platform dashboards. Growth adds a unified ROI dashboard. Scale emails a daily PDF summary.',
      },
    },
  ],
  agents: [
    {
      q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
      a: {
        tr: 'Gerekli erişim ve içerikler teslim edildikten sonra WhatsApp AI Asistan yaklaşık 5, Sesli AI Resepsiyonist 7, AI Ön Büro 10 ve AI Operasyon Merkezi 15 iş gününde kurulur. Özel veya kısıtlı erişime sahip entegrasyonlarda takvim görüşme sonrası netleşir.',
        en: 'Once access and approved content are supplied, setup is approximately 5 business days for WhatsApp AI Assistant, 7 for Voice AI Receptionist, 10 for AI Front Desk and 15 for AI Operations Hub. Bespoke or restricted integrations may require a separately agreed timeline.',
      },
    },
    {
      q: { tr: 'Mevcut CRM\'ime entegre olur mu?', en: 'Does it integrate with my existing CRM?' },
      a: {
        tr: 'Evet. WhatsApp ve Sesli AI paketleri bir CRM, takvim veya tablo bağlantısı içerir. AI Ön Büro 3, AI Operasyon Merkezi 6 entegrasyona kadar destekler. Özel klinik veya şirket yazılımı için kullanılabilir API ve erişim yetkisi kontrol edilir.',
        en: 'Yes. The WhatsApp and Voice plans include one CRM, calendar or spreadsheet connection. AI Front Desk supports up to 3 integrations and AI Operations Hub up to 6. Bespoke clinic or business software is subject to available API access and permissions.',
      },
    },
    {
      q: { tr: '“AI model/API kullanımı dahil” ne demek?', en: 'What does “AI model/API usage included” mean?' },
      a: {
        tr: 'Müşteri mesajlarını anlayıp yanıt üreten üretim tipi yapay zeka servisinin maliyeti, paketinizdeki yanıt kotasına kadar aylık ücrete dahildir. Ayrı bir OpenAI veya benzeri model hesabı açıp fatura ödemeniz gerekmez. Sesli çağrı ve resmî mesaj kanalı ücretleri kartlarda ayrıca gösterilir.',
        en: 'The production AI service that understands and drafts customer replies is covered up to your plan\'s reply allowance. You do not need to open and pay for a separate OpenAI or similar model account. Voice calls and official messaging-channel charges are shown separately on the plan cards.',
      },
    },
    {
      q: { tr: 'Kota aşımında ne olur, sistem kilitlenir mi?', en: 'What happens when I exceed quota?' },
      a: {
        tr: 'Asla kilitlenmez. Aşım olduğunda otomatik uyarı gider, trafik kesintisiz devam eder ve ekstra kullanım ilan edilen aşım tarifesiyle faturaya eklenir.',
        en: 'It never locks. You get an alert, traffic continues uninterrupted, and extra usage is billed at the published overage rate.',
      },
    },
  ],
  web: [
    {
      q: { tr: 'Mevcut siteyi yeniliyor musunuz yoksa sıfırdan mı?', en: 'Do you redesign existing sites or build from scratch?' },
      a: {
        tr: 'İkisi de. Mevcut bir siteniz varsa içerik ve URL yapısını taşıyıp SEO kaybını minimize ediyoruz. Sıfırdan istenirse tamamen yeni mimari kuruyoruz. Her iki durumda fiyat aynıdır.',
        en: 'Both. If you have an existing site we migrate content and URL structure to minimise SEO loss. If you want a fresh start we architect from zero. Pricing is the same either way.',
      },
    },
    {
      q: { tr: 'Hosting ve bakım aylık ücrete dahil mi?', en: 'Are hosting and maintenance included in the monthly fee?' },
      a: {
        tr: 'Evet — aylık fee\'ye Vercel / Netlify hosting, SSL, uptime monitor ve güvenlik güncellemeleri dahil. Ek bir sunucu kirası ödemezsiniz.',
        en: 'Yes — the monthly fee includes Vercel / Netlify hosting, SSL, uptime monitor, and security updates. No separate server rental.',
      },
    },
    {
      q: { tr: 'Hangi teknolojiyi kullanıyorsunuz — WordPress mı, Next.js mi?', en: 'Which stack — WordPress or Next.js?' },
      a: {
        tr: 'Varsayılanımız React + Vite veya Next.js. Sebep: hız (Core Web Vitals), güvenlik ve AI entegrasyonu için daha temiz altyapı. WordPress\'te ısrar ederseniz uyumluyuz ama hız vaat etmiyoruz.',
        en: 'Default is React + Vite or Next.js. Reason: speed (Core Web Vitals), security, and a cleaner base for AI integrations. If you insist on WordPress we can work with it but we do not guarantee Core Web Vitals.',
      },
    },
  ],
};

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getCategoryFromHash(): PackageCategoryKey {
  if (typeof window === 'undefined') return 'agents';
  const hash = window.location.hash.replace('#', '');
  return isPackageCategoryKey(hash) ? hash : 'agents';
}

type PlanCardProps = {
  tier: PackageTier;
  content: PlanContent;
  region: 'TR' | 'GB';
  isEnglish: boolean;
};

function PlanCard({ tier, content, region, isEnglish }: PlanCardProps) {
  const rec = content.recommended;
  const premium = content.premium;
  const hasSetup = tier.setupFee > 0;
  const isAds = tier.category === 'ads';

  // Premium variant uses a darker, enterprise treatment
  const cardBg = premium ? 'var(--coal)' : 'var(--paper-2)';
  const cardBorder = premium
    ? '1px solid var(--coal-3)'
    : `1px solid ${rec ? 'var(--ember)' : 'var(--border)'}`;
  const titleColor = premium ? 'var(--bone)' : 'var(--ink)';
  const subtitleColor = premium ? 'var(--bone-2)' : 'var(--fg-2)';
  const priceColor = premium ? 'var(--bone)' : 'var(--ink)';
  const labelMutedColor = premium ? 'var(--bone-3)' : 'var(--fg-3)';
  const featureColor = premium ? 'var(--bone)' : 'var(--fg-1)';
  const dividerColor = premium ? 'var(--coal-3)' : 'var(--border)';

  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: cardBg,
        border: cardBorder,
        borderRadius: 'var(--r-lg)',
        padding: 28,
        minHeight: 640,
        boxShadow: premium
          ? '0 20px 50px -28px rgba(0,0,0,0.55)'
          : rec
          ? '0 2px 0 var(--ember-soft)'
          : 'none',
        color: premium ? 'var(--bone)' : 'inherit',
      }}
    >
      {rec && (
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: -12,
            left: 24,
            background: 'var(--ember)',
            color: 'var(--paper)',
          }}
        >
          {isEnglish ? 'Most Popular' : 'En Popüler'}
        </span>
      )}

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: labelMutedColor,
        }}
      >
        / {tier.category === 'agents' ? (isEnglish ? 'managed AI system' : 'yönetilen AI sistemi') : tier.key}
      </span>

      <h2
        style={{
          marginTop: 12,
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 1rem + 0.6vw, 1.75rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          fontWeight: 600,
          color: titleColor,
        }}
      >
        {tier.name}
      </h2>
      <p style={{ marginTop: 6, fontSize: 14, color: subtitleColor, lineHeight: 1.45 }}>
        {isEnglish ? content.subtitle.en : content.subtitle.tr}
      </p>

      {/* Price */}
      <div style={{ marginTop: 20 }}>
        {tier.customPrice ? (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.2vw, 2.25rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              color: priceColor,
              margin: 0,
            }}
          >
            {isEnglish ? 'Quote only' : 'Talep üzerine'}
          </p>
        ) : tier.oneOffSetup ? (
          <>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.4rem + 1.4vw, 2.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                color: priceColor,
                margin: 0,
              }}
            >
              {tier.priceFrom && (
                <span
                  style={{
                    fontSize: '0.55em',
                    color: labelMutedColor,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  {isEnglish ? 'From' : 'Başlangıç'}
                </span>
              )}
              {formatPrice(tier.setupFee, region)}
            </p>
            <p
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: labelMutedColor,
              }}
            >
              {isEnglish ? 'one-off setup' : 'tek seferlik kurulum'}
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.4rem + 1.4vw, 2.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                color: priceColor,
                margin: 0,
              }}
            >
              {tier.priceFrom && (
                <span
                  style={{
                    fontSize: '0.55em',
                    color: labelMutedColor,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  {isEnglish ? 'From' : 'Başlangıç'}
                </span>
              )}
              {formatPrice(tier.price, region)}
            </p>
            <p
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: labelMutedColor,
              }}
            >
              {isEnglish ? 'per month' : 'aylık'}
            </p>
          </>
        )}
        {isAds && tier.adManagementPercent > 0 && (
          <p style={{ marginTop: 8, fontSize: 12, color: subtitleColor, lineHeight: 1.5 }}>
            {isEnglish
              ? `+ your ad budget × ${tier.adManagementPercent}% management fee (budget is paid directly to Meta / Google)`
              : `+ reklam bütçeniz × %${tier.adManagementPercent} yönetim payı (bütçe direkt Meta / Google'a ödenir)`}
          </p>
        )}
      </div>

      {/* Recurring / setup line below the headline */}
      {!tier.customPrice && (
        <div
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: subtitleColor,
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          {tier.oneOffSetup ? (
            <span>
              {isEnglish ? 'Yearly hosting: ' : 'Yıllık hosting: '}
              <strong style={{ color: titleColor }}>
                {formatPrice(tier.price, region)}
                {tier.priceUnit === 'year'
                  ? isEnglish
                    ? ' / year'
                    : ' / yıl'
                  : isEnglish
                  ? ' / month'
                  : ' / ay'}
              </strong>
            </span>
          ) : hasSetup ? (
            <span>
              {content.setupPrefix
                ? isEnglish
                  ? content.setupPrefix.en
                  : content.setupPrefix.tr
                : isEnglish
                ? 'One-time setup: '
                : 'Tek seferlik kurulum: '}
              <strong style={{ color: titleColor }}>{formatPrice(tier.setupFee, region)}</strong>
            </span>
          ) : (
            <span style={{ color: 'var(--ember)' }}>
              {isEnglish ? '✓ Setup included' : '✓ Kurulum dahil'}
            </span>
          )}
          {tier.deliveryDays > 0 && (
            <span style={{ marginLeft: 12, color: labelMutedColor }}>
              ·{' '}
              {isEnglish
                ? `Delivery ${tier.deliveryDays} business days`
                : `Teslim ${tier.deliveryDays} iş günü`}
            </span>
          )}
        </div>
      )}

      {/* Dahil — sadece içerik varsa */}
      {content.included.tr.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ember)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'INCLUDED' : 'DAHİL'}
          </p>
          <ul
            style={{
              marginTop: 10,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {(isEnglish ? content.included.en : content.included.tr).map((feature) => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 14,
                  color: featureColor,
                  lineHeight: 1.45,
                }}
              >
                <Check size={14} style={{ marginTop: 4, flexShrink: 0, color: 'var(--ember)' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dahil değil — sadece içerik varsa */}
      {content.excluded.tr.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: labelMutedColor,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'NOT INCLUDED' : 'DAHİL DEĞİL'}
          </p>
          <ul
            style={{
              marginTop: 10,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {(isEnglish ? content.excluded.en : content.excluded.tr).map((feature) => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 13,
                  color: labelMutedColor,
                  lineHeight: 1.45,
                }}
              >
                <X size={13} style={{ marginTop: 4, flexShrink: 0, color: labelMutedColor }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kota — sadece içerik varsa */}
      {content.quotas.tr.length > 0 && (
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: premium ? 'var(--bone-2)' : 'var(--fg-2)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {isEnglish ? 'QUOTAS' : 'KOTA'}
          </p>
          <ul
            style={{
              marginTop: 8,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: featureColor,
            }}
          >
            {(isEnglish ? content.quotas.en : content.quotas.tr).map((q) => (
              <li key={q}>· {q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage and overage */}
      {content.overages.tr.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: labelMutedColor,
              margin: 0,
            }}
          >
            {isEnglish ? 'USAGE & OVERAGE' : 'KULLANIM VE AŞIM'}
          </p>
          <ul
            style={{
              marginTop: 6,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: subtitleColor,
            }}
          >
            {(isEnglish ? content.overages.en : content.overages.tr).map((o) => (
              <li key={o}>· {o}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tiny usage caveat (e.g. voice usage billed separately) */}
      {content.usageNote && (
        <p
          style={{
            margin: '14px 0 0',
            paddingTop: 14,
            borderTop: `1px solid ${dividerColor}`,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: labelMutedColor,
            lineHeight: 1.5,
          }}
        >
          {isEnglish ? content.usageNote.en : content.usageNote.tr}
        </p>
      )}

      {/* Footnote (e.g. dev-hour rate) — sits above CTA */}
      {content.footnote && (
        <p
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: labelMutedColor,
            lineHeight: 1.5,
            margin: '14px 0 0',
          }}
        >
          {isEnglish ? content.footnote.en : content.footnote.tr}
        </p>
      )}

      {/* CTA — booking link for enterprise, WhatsApp for everyone else */}
      <div style={{ marginTop: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {content.ctaType === 'booking' ? (
          <a
            href={STRATEGY_CALL_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'var(--ember)',
              color: 'var(--paper)',
              borderColor: 'var(--ember)',
            }}
          >
            <Calendar size={14} />
            {isEnglish
              ? content.ctaLabel?.en ?? 'Book a Strategy Call'
              : content.ctaLabel?.tr ?? 'Strateji Görüşmesi Planla'}
          </a>
        ) : (
          <a
            href={createWhatsAppLink(
              isEnglish
                ? `Hello, coming from the MGL site. I'd like to get started with the ${tier.name} package.`
                : `Merhaba, MGL sitesinden geliyorum. ${tier.name} paketiyle başlamak istiyorum.`,
            )}
            target="_blank"
            rel="noreferrer"
            className={rec ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <MessageCircle size={14} />
            {isEnglish
              ? content.ctaLabel?.en ?? 'Get Started'
              : content.ctaLabel?.tr ?? 'Hemen Başla'}
          </a>
        )}
      </div>
    </article>
  );
}

type SectorExampleProps = {
  icon: ReactNode;
  title: string;
  examples: string[];
  packageMatch: string;
  packageLabel: string;
};

function SectorExample({ icon, title, examples, packageMatch, packageLabel }: SectorExampleProps) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 24,
        height: '100%',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          color: 'var(--ember)',
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.125rem',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'var(--ink)',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          marginTop: 12,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
        }}
      >
        {examples.map((example) => (
          <li
            key={example}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 13.5,
              color: 'var(--fg-1)',
              lineHeight: 1.45,
            }}
          >
            <Check size={13} style={{ marginTop: 4, flexShrink: 0, color: 'var(--ember)' }} />
            <span>{example}</span>
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
        }}
      >
        <span>{packageLabel}: </span>
        <strong style={{ color: 'var(--ink)' }}>{packageMatch}</strong>
      </div>
    </article>
  );
}

export default function Packages() {
  const { pricing, region } = useLocation();
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const [activeCategory, setActiveCategory] = useState<PackageCategoryKey>(() =>
    getCategoryFromHash(),
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Hash sync (back/forward & direct links)
  useEffect(() => {
    const handleHashChange = () => setActiveCategory(getCategoryFromHash());
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const switchCategory = (cat: PackageCategoryKey) => {
    setActiveCategory(cat);
    setOpenFaq(0);
    window.history.replaceState({}, '', `/packages#${cat}`);
  };

  const categoryTiers = useMemo(() => {
    const keys = tierKeysForCategory(activeCategory);
    return keys.map((k) => ({
      tier: pricing.packages[k],
      content: PLAN_CONTENT[k],
    }));
  }, [activeCategory, pricing]);

  const meta = CATEGORY_META[activeCategory];
  const faqItems = useMemo(
    () => [...COMMON_FAQ, ...CATEGORY_FAQ[activeCategory]],
    [activeCategory],
  );

  const seoTitle = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? 'AI Advertising Packages — Meta + Google + SEO | MGL Digital Media'
        : 'AI Reklam Paketleri — Meta + Google + SEO | MGL Digital Media';
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? 'Website Packages — Business, Booking, Ordering, Smart & Bespoke Professional | MGL Digital Media'
        : 'Web Sitesi Paketleri — Kurumsal, Randevu, Sipariş, Akıllı ve Profesyonel | MGL Digital Media';
    }
    return isEnglish
      ? 'AI Agent Packages — WhatsApp, Voice Receptionist, Front Desk & Operations | MGL Digital Media'
      : 'AI Agent Paketleri — WhatsApp, Sesli Resepsiyon, AI Ön Büro ve Operasyon | MGL Digital Media';
  }, [activeCategory, isEnglish]);

  const seoDescription = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? 'Three flat-price ad packages: Single Channel, Dual Channel + SEO, Full Funnel. Transparent 10% management fee, ad budget paid directly to Meta / Google. No ranges.'
        : 'Üç sabit fiyatlı reklam paketi: Tek Kanal, Çift Kanal + SEO, Full Funnel. %10 şeffaf yönetim payı, reklam bütçesi direkt Meta / Google\'a ödenir. Aralık yok.';
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? 'Five flat-price website packages, from a £200 one-pager to a fully bespoke professional-services site: booking, online ordering, automation and SEO foundations included per tier.'
        : 'Beş sabit fiyatlı web paketi: £200 tek sayfadan muhasebeci ve hukuk büroları için tamamen özel profesyonel siteye. Randevu, online sipariş, otomasyon ve SEO kademeye göre dahil.';
    }
    return isEnglish
      ? 'Clear UK pricing for a WhatsApp AI assistant, Voice AI receptionist, joined-up AI Front Desk and multi-process AI Operations Hub. AI API allowances, setup and voice usage shown upfront.'
      : 'WhatsApp AI asistan, Sesli AI resepsiyonist, birleşik AI Ön Büro ve çok süreçli AI Operasyon Merkezi için açık fiyatlar. AI API kotası, kurulum ve ses kullanımı baştan belirtilir.';
  }, [activeCategory, isEnglish]);

  const seoKeywords = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? ['AI ads packages', 'Meta ads agency', 'Google ads agency', 'SEO package', 'London ad agency']
        : ['AI reklam paketleri', 'Meta reklam ajansı', 'Google ads ajansı', 'SEO paketi', 'Londra reklam ajansı'];
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? ['website packages', 'conversion web design', 'landing page agency', 'Next.js web agency', 'e-commerce web']
        : ['web sitesi paketleri', 'dönüşüm odaklı web', 'landing page ajansı', 'kurumsal site paketi', 'e-ticaret web'];
    }
    return isEnglish
      ? ['AI agent packages', 'WhatsApp AI bot', 'voice assistant', 'AI automation bundle', 'SME AI package']
      : ['AI agent paketleri', 'WhatsApp AI bot', 'sesli asistan', 'AI otomasyon bundle', 'KOBİ AI paketi'];
  }, [activeCategory, isEnglish]);

  const breadcrumb = breadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEnglish ? 'Packages' : 'Paketler', path: '/packages' },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/packages"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={seoKeywords}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(32px, 3vw + 12px, 64px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">
            {isEnglish ? meta.hero.eyebrow.en : meta.hero.eyebrow.tr}
          </span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEnglish ? meta.hero.title.en : meta.hero.title.tr}
          </h1>
          <p
            className="lede"
            style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}
          >
            {isEnglish ? meta.hero.lede.en : meta.hero.lede.tr}
          </p>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {[
              { icon: <ShieldCheck size={14} />, tr: 'Sabit fiyat · aralık yok', en: 'Flat price · no ranges' },
              { tr: 'Aylık çıkış hakkı', en: 'Monthly cancellation' },
              { tr: 'Şeffaf kota + aşım', en: 'Transparent quota + overage' },
              { tr: 'Veriler AB sunucularında', en: 'EU-region data hosting' },
            ].map((chip, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-2)',
                  padding: '6px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  background: 'var(--paper-2)',
                }}
              >
                {chip.icon}
                {isEnglish ? chip.en : chip.tr}
              </span>
            ))}
          </div>

          {/* Category tabs */}
          <div
            role="tablist"
            aria-label={isEnglish ? 'Package categories' : 'Paket kategorileri'}
            className="category-tabs"
            style={{
              marginTop: 36,
              gap: 4,
              padding: 4,
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderRadius: 999,
            }}
          >
            {(['ads', 'agents', 'web'] as PackageCategoryKey[]).map((cat) => {
              const isActive = activeCategory === cat;
              const { tr, en } = CATEGORY_META[cat].label;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => switchCategory(cat)}
                  className="category-tab"
                  style={{
                    borderRadius: 999,
                    background: isActive ? 'var(--ink)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--fg-2)',
                    fontWeight: 500,
                    transition: 'background 160ms, color 160ms',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: 1.25,
                  }}
                >
                  {isEnglish ? en : tr}
                </button>
              );
            })}
          </div>

          <style>{`
            .category-tabs {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              width: 100%;
              max-width: 440px;
            }
            .category-tab {
              padding: 10px 8px;
              font-size: 12px;
              white-space: normal;
            }
            @media (min-width: 640px) {
              .category-tabs {
                display: inline-flex;
                width: auto;
                max-width: none;
              }
              .category-tab {
                padding: 8px 20px;
                font-size: 13px;
                white-space: nowrap;
              }
            }
          `}</style>
        </div>
      </section>

      {activeCategory === 'agents' && (
        <section
          style={{
            background: 'var(--paper-2)',
            borderBottom: '1px solid var(--border)',
            padding: 'clamp(36px, 4vw, 60px) 0',
          }}
        >
          <div className="container">
            <span className="eyebrow">{isEnglish ? 'WHICH ONE FITS?' : 'HANGİSİ SİZE UYGUN?'}</span>
            <h2
              style={{
                marginTop: 12,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)',
                lineHeight: 1.1,
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              {isEnglish ? 'Start with the result, not the technology.' : 'Teknolojiden değil, ihtiyacınızdan başlayın.'}
            </h2>
            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 24,
              }}
            >
              {[
                {
                  title: isEnglish ? 'Choose WhatsApp' : 'WhatsApp seçin',
                  text: isEnglish
                    ? 'Customers mostly message you. The assistant answers approved questions, captures details and starts the booking journey.'
                    : 'Müşterileriniz çoğunlukla mesaj yazıyorsa; asistan soruları yanıtlar, bilgileri toplar ve randevu sürecini başlatır.',
                },
                {
                  title: isEnglish ? 'Choose Voice' : 'Sesli Asistan seçin',
                  text: isEnglish
                    ? 'You miss calls during appointments or after hours. The receptionist answers, books, transfers and sends a summary.'
                    : 'Randevu sırasında veya mesai dışında çağrı kaçırıyorsanız; resepsiyonist telefonu açar, randevu alır, aktarır ve özet gönderir.',
                },
                {
                  title: isEnglish ? 'Choose Front Desk' : 'AI Ön Büro seçin',
                  text: isEnglish
                    ? 'Calls, WhatsApp and website enquiries must share the same diary, CRM and follow-up rules.'
                    : 'Telefon, WhatsApp ve web taleplerinin aynı takvim, CRM ve takip kurallarıyla çalışmasını istiyorsanız.',
                },
                {
                  title: isEnglish ? 'Choose Operations Hub' : 'Operasyon Merkezi seçin',
                  text: isEnglish
                    ? 'You also want collections, document chasing, lead follow-up, reports or internal workflows automated.'
                    : 'Resepsiyonun yanında tahsilat, evrak, lead takibi, raporlama veya iç süreçleri de otomatikleştirmek istiyorsanız.',
                },
              ].map((item) => (
                <div key={item.title} style={{ paddingLeft: 18, borderLeft: '2px solid var(--ember)' }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeCategory === 'agents' && (
        <section
          aria-labelledby="agent-billing-heading"
          style={{
            background: 'var(--paper-2)',
            borderBottom: '1px solid var(--border)',
            padding: 'clamp(36px, 4vw, 60px) 0',
          }}
        >
          <div className="container">
            <span className="eyebrow">{isEnglish ? 'HOW BILLING WORKS' : 'ÜCRET NASIL İŞLİYOR?'}</span>
            <h2
              id="agent-billing-heading"
              style={{
                marginTop: 12,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)',
                lineHeight: 1.1,
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              {isEnglish ? 'One system fee. Clear channel usage.' : 'Tek sistem ücreti. Açık kanal kullanımı.'}
            </h2>
            <div
              style={{
                marginTop: 24,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
              }}
            >
              {[
                {
                  title: isEnglish ? '1. Monthly system fee' : '1. Aylık sistem ücreti',
                  text: isEnglish
                    ? 'Covers the live AI assistant, n8n workflows, monitoring, maintenance, support and the text-AI allowance shown on the plan.'
                    : 'Canlı AI asistanı, n8n akışlarını, izlemeyi, bakımı, desteği ve pakette yazan metin AI yanıt kotasını kapsar.',
                },
                {
                  title: isEnglish ? '2. One-off setup' : '2. Tek seferlik kurulum',
                  text: isEnglish
                    ? 'Covers discovery, conversation design, integrations, testing, hand-off rules and launch. It is paid once.'
                    : 'İhtiyaç analizi, konuşma tasarımı, entegrasyonlar, testler, insan devri kuralları ve canlıya almayı kapsar. Bir kez ödenir.',
                },
                {
                  title: isEnglish ? '3. Channel usage' : '3. Kanal kullanımı',
                  text: isEnglish
                    ? 'Voice usage is billed per connected minute. Official Meta/BSP, SMS and other provider charges are passed through only when used.'
                    : 'Sesli kullanım bağlı dakika üzerinden ücretlenir. Resmî Meta/BSP, SMS ve diğer sağlayıcı ücretleri yalnızca kullanılırsa ayrıca yansıtılır.',
                },
              ].map((item) => (
                <div key={item.title} style={{ paddingLeft: 18, borderLeft: '2px solid var(--ember)' }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)' }}>{item.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 22, fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 900 }}>
              {isEnglish
                ? 'In plain English: choose WhatsApp when most enquiries arrive as messages; choose Voice when missed calls cost you bookings; choose AI Front Desk when both channels must share the same calendar and CRM. We confirm the exact provider stack and usage estimate before launch.'
                : 'Kısaca: Talepleriniz çoğunlukla mesajla geliyorsa WhatsApp\'ı, cevapsız çağrılar randevu kaybettiriyorsa Sesli AI\'ı, iki kanal aynı takvim ve CRM ile çalışacaksa AI Ön Büro\'yu seçin. Sağlayıcı altyapısını ve tahmini kullanım bedelini canlıya almadan önce netleştiririz.'}
            </p>
          </div>
        </section>
      )}

      {/* Plans grid */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(48px, 4vw + 16px, 88px) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {categoryTiers.map(({ tier, content }) => (
              <PlanCard
                key={tier.key}
                tier={tier}
                content={content}
                region={region}
                isEnglish={isEnglish}
              />
            ))}
          </div>

          {activeCategory === 'agents' && (
            <div
              style={{
                marginTop: 32,
                padding: '24px 28px',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--ember)',
                borderRadius: 'var(--r-md)',
                background: 'var(--paper-2)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: 24,
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ember)' }}>
                  {isEnglish ? 'WORKFLOW AUTOMATION WITHOUT AN AI RECEPTIONIST' : 'AI RESEPSİYON OLMADAN İŞ AKIŞI OTOMASYONU'}
                </p>
                <h3 style={{ marginTop: 8, fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--ink)' }}>
                  {isEnglish ? 'Custom n8n Workflow Automation' : 'Özel n8n İş Akışı Otomasyonu'}
                </h3>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 760 }}>
                  {isEnglish
                    ? 'For deadline reminders, document collection, payment follow-up, spreadsheet/CRM synchronisation or internal reports. Includes up to 3 production workflows, 2 integrations, monitoring, failure alerts and monthly maintenance.'
                    : 'Deadline hatırlatma, evrak toplama, ödeme takibi, Excel/CRM senkronizasyonu veya iç raporlar için. En fazla 3 üretim akışı, 2 entegrasyon, izleme, hata uyarıları ve aylık bakım dahildir.'}
                </p>
              </div>
              <div style={{ minWidth: 190, textAlign: 'right' }}>
                <strong style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: 25, color: 'var(--ink)' }}>
                  {formatPrice(region === 'TR' ? 4999 : 149, region)} / {isEnglish ? 'month' : 'ay'}
                </strong>
                <span style={{ display: 'block', marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                  + {formatPrice(region === 'TR' ? 24999 : 750, region)} {isEnglish ? 'one-off setup' : 'tek seferlik kurulum'}
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer — API usage costs + dev-hour transparency */}
          {activeCategory === 'agents' && (
            <p
              style={{
                marginTop: 28,
                maxWidth: 920,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              {isEnglish
                ? '* Text AI model/API usage is included up to each plan\'s stated allowance. Connected voice calls are billed from the first minute. Official Meta/BSP, SMS and other third-party channel charges are passed through only when used.'
                : '* Metin AI model/API kullanımı her paketin belirtilen kotasına kadar dahildir. Bağlanan sesli çağrılar ilk dakikadan ücretlenir. Resmî Meta/BSP, SMS ve diğer üçüncü taraf kanal ücretleri yalnızca kullanıldığında yansıtılır.'}
            </p>
          )}

          {/* Agents: RandevuAI self-serve cross-link — TR only */}
          {activeCategory === 'agents' && region === 'TR' && (
            <div
              style={{
                marginTop: 36,
                padding: '20px 24px',
                background: 'var(--paper-2)',
                border: '1px solid var(--border)',
                borderLeft: '2px solid #25D366',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--ink)' }}>
                  {isEnglish ? 'Smaller budget? Try self-serve: ' : 'Daha uygun bütçe? Kendin kur: '}
                </strong>
                {isEnglish
                  ? 'RandevuAI (₺1.290/mo) — sector template, 5-min setup, WhatsApp Evolution API, 5,000 conversations/mo included. No custom CRM/Calendar integration. Data stays in RandevuAI dashboard.'
                  : 'RandevuAI (₺1.290/ay) — sektör şablonu, 5 dk kurulum, WhatsApp Evolution API, 5.000 sohbet/ay dahil. CRM/Calendar entegrasyonu yok, veriler RandevuAI\'de durur. Farklı ihtiyaç = farklı ürün.'}
              </div>
              <a
                href={isEnglish ? 'https://www.randevu-ai.com' : 'https://www.randevu-ai.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  background: '#25D366',
                  color: '#111B21',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {isEnglish ? 'RandevuAI →' : 'RandevuAI →'}
              </a>
            </div>
          )}

          {/* Ads disclaimer */}
          {activeCategory === 'ads' && (
            <ul
              style={{
                marginTop: 28,
                maxWidth: 920,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              <li>{isEnglish ? '* Ad spend is not included — paid directly to the ad platforms.' : '* Reklam bütçesi dahil değildir — direkt reklam platformlarına ödenir.'}</li>
              <li>
                {isEnglish
                  ? '* Third-party costs (creative tools, tracking, etc.) are billed separately where applicable.'
                  : '* 3. parti maliyetler (kreatif araçlar, izleme vb.) ilgili olduğunda ayrıca faturalandırılır.'}
              </li>
            </ul>
          )}

          {/* Web disclaimer — what hosting covers + scope expectations */}
          {activeCategory === 'web' && (
            <ul
              style={{
                marginTop: 28,
                maxWidth: 920,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              <li>
                {isEnglish
                  ? '* Yearly hosting covers hosting, SSL, basic uptime monitoring, and core maintenance.'
                  : '* Yıllık hosting; hosting, SSL, temel uptime izleme ve ana bakım masraflarını kapsar.'}
              </li>
              <li>
                {isEnglish
                  ? '* Major content changes, extra pages, or new features are quoted separately.'
                  : '* Büyük içerik değişiklikleri, ek sayfalar veya yeni özellikler ayrıca fiyatlandırılır.'}
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* Sektörlere göre kullanım örnekleri */}
      {activeCategory === 'agents' && (
        <section
          style={{
            background: 'var(--paper)',
            padding: 'clamp(56px, 4vw + 24px, 96px) 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container" style={{ maxWidth: 1080 }}>
            <span className="eyebrow">
              {isEnglish ? 'INDUSTRY EXAMPLES' : 'SEKTÖR ÖRNEKLERİ'}
            </span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              {isEnglish ? 'AI assistants by industry' : 'Sektörünüze göre AI asistanlar'}
            </h2>
            <p
              style={{
                marginTop: 12,
                color: 'var(--fg-2)',
                maxWidth: 720,
                fontSize: 'clamp(0.95rem, 0.88rem + 0.25vw, 1.0625rem)',
                lineHeight: 1.6,
              }}
            >
              {isEnglish
                ? 'Packages are sector-agnostic. Same package infrastructure, flows tailored per industry.'
                : 'Paketler sektör bağımsız. Aynı paket altyapısı, sektöre göre özelleştirilmiş akışlar.'}
            </p>

            <div
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              <SectorExample
                icon={<Stethoscope size={20} />}
                title={isEnglish ? 'Clinic & Aesthetic' : 'Klinik & Estetik'}
                examples={
                  isEnglish
                    ? [
                        'After-hours WhatsApp booking',
                        'No-show reducing reminders',
                        'Voice AI for night-time calls',
                      ]
                    : [
                        'Mesai dışı WhatsApp randevu',
                        'No-show azaltan hatırlatma',
                        'Gece çağrılarına Sesli AI',
                      ]
                }
                packageMatch={isEnglish ? 'AI Front Desk or AI Operations Hub' : 'AI Ön Büro veya AI Operasyon Merkezi'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<UtensilsCrossed size={20} />}
                title={isEnglish ? 'Restaurant & Cafe' : 'Restoran & Kafe'}
                examples={
                  isEnglish
                    ? [
                        'WhatsApp reservations',
                        'Voice AI takes orders',
                        'Peak-hour phone load handled',
                      ]
                    : [
                        'WhatsApp rezervasyon',
                        'Sesli AI sipariş alır',
                        'Yoğun saat telefon yükü',
                      ]
                }
                packageMatch={
                  isEnglish
                    ? 'WhatsApp AI Assistant or Voice AI Receptionist'
                    : 'WhatsApp AI Asistan veya Sesli AI Resepsiyonist'
                }
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<HomeIcon size={20} />}
                title={isEnglish ? 'Real Estate' : 'Emlak & Gayrimenkul'}
                examples={
                  isEnglish
                    ? [
                        'Missed-call callbacks',
                        'Buyer criteria captured in CRM',
                        'Listing-match notifications',
                      ]
                    : [
                        'Cevapsız çağrı dönüşü',
                        'Müşteri kriteri CRM',
                        'İlan eşleşme bildirimleri',
                      ]
                }
                packageMatch={isEnglish ? 'AI Front Desk' : 'AI Ön Büro'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<ShoppingBag size={20} />}
                title={isEnglish ? 'E-commerce' : 'E-ticaret'}
                examples={
                  isEnglish
                    ? [
                        '7-language multilingual support',
                        'Order / return / shipping replies',
                        'Time-zone gap solved',
                      ]
                    : [
                        '7 dil çok dilli destek',
                        'Sipariş/iade/kargo cevabı',
                        'Saat farkı çözümü',
                      ]
                }
                packageMatch={isEnglish ? 'AI Front Desk or AI Operations Hub' : 'AI Ön Büro veya AI Operasyon Merkezi'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<Scissors size={20} />}
                title={isEnglish ? 'Beauty & Salon' : 'Güzellik & Salon'}
                examples={
                  isEnglish
                    ? [
                        'Instant booking welcome',
                        'Reminders that cut no-shows',
                        '5-second voice AI greeting',
                      ]
                    : [
                        'Anlık randevu karşılama',
                        'Hatırlatma + no-show düşürme',
                        'Sesli AI 5 sn karşılama',
                      ]
                }
                packageMatch={isEnglish ? 'AI Front Desk' : 'AI Ön Büro'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
              <SectorExample
                icon={<Wrench size={20} />}
                title={isEnglish ? 'Service Firm / Education' : 'Servis Firması / Eğitim'}
                examples={
                  isEnglish
                    ? [
                        'Fault / enrolment intake forms',
                        'Quote follow-up',
                        'Consultation scheduling',
                      ]
                    : [
                        'Arıza/kayıt formu',
                        'Teklif takibi',
                        'Görüşme planlama',
                      ]
                }
                packageMatch={isEnglish ? 'WhatsApp AI Assistant or AI Front Desk' : 'WhatsApp AI Asistan veya AI Ön Büro'}
                packageLabel={isEnglish ? 'Best fit' : 'Uygun paket'}
              />
            </div>

            <p
              style={{
                marginTop: 24,
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              {isEnglish
                ? 'Industry packs are not sold separately — the examples run on the same package infrastructure.'
                : 'Sektör paketleri ayrı satılmaz — örnekler aynı paket altyapısıyla çalışır.'}
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: 'clamp(64px, 5vw + 16px, 104px) 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{isEnglish ? 'FREQUENTLY ASKED' : 'SIK SORULAN'}</span>
          <h2
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEnglish ? 'Questions we hear most.' : 'En sık duyduğumuz sorular.'}
          </h2>

          <div style={{ marginTop: 32 }}>
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q.tr}
                  style={{
                    borderTop: idx === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 0',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.25rem)',
                        lineHeight: 1.35,
                        fontWeight: 500,
                        color: 'var(--ink)',
                      }}
                    >
                      {isEnglish ? item.q.en : item.q.tr}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        flexShrink: 0,
                        color: 'var(--ember)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms var(--ease-out)',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <p
                      style={{
                        paddingBottom: 20,
                        paddingRight: 34,
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: 'var(--fg-2)',
                      }}
                    >
                      {isEnglish ? item.a.en : item.a.tr}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise callout (only on agents tab) */}
      {activeCategory === 'agents' && (
        <section
          className="on-coal"
          style={{
            background: 'var(--coal)',
            color: 'var(--bone)',
            padding: 'clamp(72px, 6vw + 24px, 128px) 0',
          }}
        >
          <div className="container" style={{ maxWidth: 960 }}>
            <span className="eyebrow" style={{ color: 'var(--ember)' }}>
              {isEnglish ? 'ENTERPRISE & CUSTOM' : 'KURUMSAL & ÖZEL'}
            </span>
            <h2
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: 'var(--bone)',
              }}
            >
              {isEnglish
                ? 'Hospital chain, multi-branch or regulated?'
                : 'Hastane zinciri, çok şubeli veya düzenlemeye tabi?'}
            </h2>
            <p
              style={{
                marginTop: 20,
                maxWidth: 720,
                color: 'var(--bone-2)',
                fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
                lineHeight: 1.6,
              }}
            >
              {isEnglish
                ? 'For requirements beyond AI Operations Hub, we scope an Enterprise system: on-premise deployment, custom integrations (SAP, Nebim, Logo, ERP), dedicated infrastructure and a named engineer with 24/7 priority support.'
                : 'AI Operasyon Merkezi kapsamını aşan ihtiyaçlar için Enterprise sistem tasarlarız: on-premise kurulum, özel entegrasyonlar (SAP, Nebim, Logo, ERP), dedicated altyapı ve 7/24 öncelikli destek için atanmış mühendis.'}
            </p>

            <a
              href={createWhatsAppLink(
                isEnglish
                  ? 'Hello, I would like to discuss an enterprise / custom AI agent project.'
                  : 'Merhaba, kurumsal / özel bir AI agent projesi için görüşmek istiyorum.',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-lg"
              style={{ marginTop: 36 }}
            >
              {isEnglish ? 'Talk to a project consultant' : 'Proje danışmanıyla görüş'}
              <ArrowUpRight size={16} />
            </a>

            <p
              style={{
                marginTop: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--bone-3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {WHATSAPP_LABEL}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
