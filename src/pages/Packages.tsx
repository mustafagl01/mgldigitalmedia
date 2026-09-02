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

const WHATSAPP_NUMBER = '447482670606';
const WHATSAPP_LABEL = '+44 7482 670606';

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
    label: { tr: 'Asistanlar', en: 'Assistants' },
    hero: {
      eyebrow: { tr: 'SESLİ VE WHATSAPP ASİSTANI', en: 'VOICE AND WHATSAPP ASSISTANTS' },
      title: {
        tr: 'Kurulum yok. Kullandığınız kadar ödeyin.',
        en: 'No setup fee. Pay for what you use.',
      },
      lede: {
        tr: 'Küçük bir aylık sistem bedeli, üstüne konuştuğunuz dakika veya verilen cevap kadar kullanım. İkisini birden alırsanız aylık bedel tek ödenir. Aylık çıkış hakkı, KVKK/GDPR uyumlu.',
        en: 'A small monthly system fee, then usage — connected minutes or replies sent. Take both and you pay the monthly fee once. Cancel monthly, KVKK/GDPR compliant.',
      },
    },
  },
  systems: {
    key: 'systems',
    label: { tr: 'Kurulan Sistemler', en: 'Built Systems' },
    hero: {
      eyebrow: { tr: 'OTOMASYON VE LEAD SİSTEMLERİ', en: 'AUTOMATION AND LEAD SYSTEMS' },
      title: {
        tr: 'Bir kere kurulur, çalışmaya devam eder.',
        en: 'Built once, then it keeps running.',
      },
      lede: {
        tr: 'Tekrar eden işleriniz ve müşteri bulma süreciniz bir sisteme dönüşür. Tek seferlik kurulum, düşük aylık bakım — barındırma, izleme ve arıza müdahalesi dahil.',
        en: 'Your repetitive work and your lead generation become a system. One-off setup, low monthly maintenance — hosting, monitoring and incident response included.',
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
        tr: 'Sade tanıtım sitesinden, müşterinize kendi dilinde gece gündüz cevap veren siteye kadar — ne yapılacağı yazılı, fiyat baştan belli, sonradan çıkan kalem yok.',
        en: 'From straightforward business sites to AI websites that answer every visitor in their own language, 24/7 — clear scope, transparent pricing and no surprise integrations.',
      },
    },
  },
};

const PLAN_CONTENT: Record<PackageTierKey, PlanContent> = {
  // ---------------- HAZIR ÜRÜNLER — kurulum yok, kontörle çalışır ----------------
  voice: {
    subtitle: {
      tr: 'Telefonu açar, soruyu cevaplar, randevuyu veya siparişi alır. Kurulum ücreti yok.',
      en: 'Answers the phone, handles questions, takes the booking or order. No setup fee.',
    },
    included: {
      tr: [
        '7/24 telefon karşılama',
        'Randevu ve sipariş alma',
        'Takvim ile canlı senkron',
        'Mevcut numaranızın yönlendirilmesi',
        'Türkçe ve İngilizce',
        'Çağrı kaydı ve yazılı özet',
      ],
      en: [
        '24/7 call answering',
        'Bookings and orders taken',
        'Live calendar sync',
        'Your existing number forwarded',
        'Turkish and English',
        'Call recording and written summary',
      ],
    },
    excluded: {
      tr: ['Telefon hattı aboneliği', 'Termal yazıcı (takeaway için opsiyonel)'],
      en: ['Phone line subscription', 'Thermal printer (optional, for takeaways)'],
    },
    quotas: {
      tr: [
        'Kurulum: ücretsiz',
        'Aylık sistem bedeli — WhatsApp asistanını da alırsanız tek ödenir',
      ],
      en: [
        'Setup: free',
        'Monthly system fee — paid once if you also take the WhatsApp assistant',
      ],
    },
    overages: {
      tr: [
        'Konuşma dakikası kullandığınız kadar; hacim arttıkça birim fiyat düşer',
        'Yalnızca bağlanan çağrılar sayılır',
      ],
      en: [
        'Pay per connected minute; the unit rate drops as volume grows',
        'Only connected calls are billed',
      ],
    },
    recommended: true,
    usageNote: {
      tr: 'Dakika kullanımı aylık sistem bedelinden ayrı faturalanır.',
      en: 'Minute usage is billed separately from the monthly system fee.',
    },
  },
  whatsapp: {
    subtitle: {
      tr: 'Müşteriniz WhatsApp’tan yazar, asistan cevaplar. Kurulum ücreti yok.',
      en: 'Your customer messages on WhatsApp, the assistant replies. No setup fee.',
    },
    included: {
      tr: [
        '7/24 otomatik yanıt',
        'Randevu ve sipariş alma',
        'Sık sorulan soruların cevaplanması',
        'Lead nitelendirme ve CRM aktarımı',
        'Türkçe ve İngilizce',
        'Devralma butonu — istediğiniz an siz devam edersiniz',
      ],
      en: [
        '24/7 automatic replies',
        'Bookings and orders taken',
        'FAQ handling',
        'Lead qualification and CRM handoff',
        'Turkish and English',
        'Takeover button — step in whenever you want',
      ],
    },
    excluded: {
      tr: ['Meta resmi API ücretleri (bu rotayı seçerseniz)', 'İşletme numarası'],
      en: ['Official Meta API fees (only if that route is chosen)', 'Business phone number'],
    },
    quotas: {
      tr: [
        'Kurulum: ücretsiz',
        'Aylık sistem bedeli — sesli asistanı da alırsanız tek ödenir',
      ],
      en: [
        'Setup: free',
        'Monthly system fee — paid once if you also take the voice assistant',
      ],
    },
    overages: {
      tr: [
        'AI yanıtı başına ödersiniz; kontör paketiyle birim fiyat düşer',
        'Kontör bitince asistan susmaz — otomatik yükleme açıktır, kapatabilirsiniz',
      ],
      en: [
        'You pay per AI reply; bundles bring the unit rate down',
        'The assistant never goes silent — auto top-up is on by default and can be switched off',
      ],
    },
    usageNote: {
      tr: 'AI yanıtı = asistanın gönderdiği mesaj. Gelen mesaj, personelinizin yazdığı mesaj ve sistem bildirimleri sayılmaz.',
      en: 'An AI reply is a message the assistant sends. Incoming messages, messages your staff writes and system notifications are not counted.',
    },
  },

  // ---------------- KURULAN SİSTEMLER — kurulum + bakım ----------------
  automation: {
    subtitle: {
      tr: 'İşletmenizin tekrar eden süreçleri, siz uyurken de çalışan bir sisteme dönüşür.',
      en: 'Your repetitive processes become a system that keeps running while you sleep.',
    },
    included: {
      tr: [
        'Süreç analizi ve akış tasarımı',
        'Mevcut sistemlerinizle entegrasyon (CRM, takvim, ödeme, Sheets, Excel)',
        'Kendi sunucumuzda barındırma — görev limiti yok',
        'Hata alarmı ve izleme',
        'Ayda bir değişiklik hakkı',
      ],
      en: [
        'Process analysis and workflow design',
        'Integration with your existing systems (CRM, calendar, payments, Sheets, Excel)',
        'Self-hosted — no task limits',
        'Failure alerts and monitoring',
        'One change request per month',
      ],
    },
    excluded: {
      tr: ['Üçüncü parti servis abonelikleri', 'Kapsam dışı yeni akışlar ayrıca fiyatlandırılır'],
      en: ['Third-party service subscriptions', 'New workflows outside the agreed scope are quoted separately'],
    },
    quotas: {
      tr: ['Tek seferlik kurulum', 'Aylık bakım: barındırma, izleme, arıza müdahalesi'],
      en: ['One-off setup', 'Monthly maintenance: hosting, monitoring, incident response'],
    },
    overages: { tr: [], en: [] },
    footnote: {
      tr: 'Kapsam akış sayısıyla değil, işletmenizin süreçleriyle tanımlanır ve teklifte yazılı olarak belirtilir.',
      en: 'Scope is defined by your processes, not by a workflow count, and is written into the proposal.',
    },
  },
  leadmail: {
    subtitle: {
      tr: 'Hedef işletmeleri bulan, doğrulayan ve kişiselleştirilmiş mail gönderen sistem — sizin adınıza, sizin kutunuzdan.',
      en: 'A system that finds target businesses, verifies them and sends personalised email — in your name, from your mailbox.',
    },
    included: {
      tr: [
        'Hedef müşteri profili çıkarımı',
        'Lead toplama ve zenginleştirme',
        'E-posta doğrulama (bounce koruması)',
        'Her işletmeye özel yazılmış ilk mail ve takip',
        'Gönderim kaydı ve mükerrer engelleme',
        'Yanıt raporu',
      ],
      en: [
        'Ideal customer profile definition',
        'Lead sourcing and enrichment',
        'Email verification (bounce protection)',
        'A first email and follow-up written for each business',
        'Send log and deduplication',
        'Reply reporting',
      ],
    },
    excluded: {
      tr: ['Domain ve mailbox bedelleri', 'Veri / API kredileri (Apollo, doğrulama vb.)'],
      en: ['Domain and mailbox costs', 'Data / API credits (Apollo, verification, etc.)'],
    },
    quotas: {
      tr: ['Tek seferlik kurulum', 'Aylık bakım ve izleme'],
      en: ['One-off setup', 'Monthly maintenance and monitoring'],
    },
    overages: { tr: [], en: [] },
    footnote: {
      tr: 'Şablon veya spintax kullanılmaz — her mail, o işletme hakkında bulunan gerçek bir gözlemle yazılır.',
      en: 'No templates, no spintax — every email is written around a real observation about that business.',
    },
  },

  // ---------------- WEB ----------------
  'web-landing': {
    subtitle: {
      tr: 'Tek sayfa, tek amaç: arayan kişiyi müşteriye çevirmek.',
      en: 'One page, one job: turn the visitor into a customer.',
    },
    included: {
      tr: [
        'Tek sayfa tasarım ve yazım',
        'Mobil öncelikli, hızlı yükleme',
        'İletişim / randevu formu',
        'Google’da bulunabilirlik temeli (SEO, sitemap, schema)',
        'Domain bağlantısı ve SSL',
      ],
      en: [
        'Single-page design and copy',
        'Mobile-first, fast loading',
        'Contact / booking form',
        'Search foundations (SEO, sitemap, schema)',
        'Domain connection and SSL',
      ],
    },
    excluded: {
      tr: ['Logo tasarımı', 'Profesyonel fotoğraf çekimi'],
      en: ['Logo design', 'Professional photography'],
    },
    quotas: {
      tr: ['Tek seferlik kurulum', 'Yıllık barındırma ve bakım'],
      en: ['One-off setup', 'Yearly hosting and maintenance'],
    },
    overages: { tr: [], en: [] },
  },
  'web-site': {
    subtitle: {
      tr: 'Beş sayfalık tam site — işletmenizi anlatan, arandığında bulunan.',
      en: 'A full five-page site — explains your business and gets found.',
    },
    included: {
      tr: [
        'Beş sayfa tasarım ve yazım',
        'Mobil öncelikli, hızlı yükleme',
        'İletişim ve randevu formları',
        'Google İşletme Profili uyumu, yerel SEO',
        'Schema işaretlemesi ve paylaşım kartı',
        'Domain bağlantısı ve SSL',
        'Üç revizyon turu',
      ],
      en: [
        'Five pages designed and written',
        'Mobile-first, fast loading',
        'Contact and booking forms',
        'Google Business Profile alignment, local SEO',
        'Schema markup and social share card',
        'Domain connection and SSL',
        'Three revision rounds',
      ],
    },
    excluded: {
      tr: ['Logo tasarımı', 'Sıfırdan içerik yazarlığı', 'Ek sayfalar ayrıca fiyatlandırılır'],
      en: ['Logo design', 'Copywriting from scratch', 'Extra pages quoted separately'],
    },
    quotas: {
      tr: ['Tek seferlik kurulum', 'Yıllık barındırma ve bakım'],
      en: ['One-off setup', 'Yearly hosting and maintenance'],
    },
    overages: { tr: [], en: [] },
    recommended: true,
  },
  'web-integrated': {
    subtitle: {
      tr: 'Sitenin üstüne çalışan bir sistem: online sipariş, ödeme veya AI asistan.',
      en: 'A working system on top of the site: online ordering, payments or an AI assistant.',
    },
    included: {
      tr: [
        'Kurumsal site paketindeki her şey',
        'Online sipariş veya randevu altyapısı',
        'Ödeme altyapısı entegrasyonu (Stripe / iyzico)',
        'Mutfak yazıcısı veya Telegram / WhatsApp bildirimi',
        'İsteğe bağlı AI asistan bağlantısı',
        'Uygulama olarak eklenebilme (PWA)',
      ],
      en: [
        'Everything in the business website package',
        'Online ordering or booking flow',
        'Payment integration (Stripe / iyzico)',
        'Kitchen printer or Telegram / WhatsApp notifications',
        'Optional AI assistant connection',
        'Installable as an app (PWA)',
      ],
    },
    excluded: {
      tr: ['Ödeme sağlayıcısının işlem komisyonu', 'Termal yazıcı donanımı'],
      en: ['Payment provider transaction fees', 'Thermal printer hardware'],
    },
    quotas: {
      tr: ['Tek seferlik kurulum', 'Yıllık barındırma ve bakım'],
      en: ['One-off setup', 'Yearly hosting and maintenance'],
    },
    overages: { tr: [], en: [] },
    premium: true,
    footnote: {
      tr: 'Çalışan örnek: elmscoffeeshop.com — online sipariş mutfaktaki yazıcıdan çıkıyor, aynı anda Telegram’a bildirim gidiyor.',
      en: 'Live example: elmscoffeeshop.com — online orders print in the kitchen and land on Telegram at the same time.',
    },
  },

  // ---------------- REKLAM ----------------
  'ads-meta': {
    subtitle: {
      tr: 'Facebook ve Instagram reklamlarınızın kurulumu ve günlük yönetimi.',
      en: 'Setup and day-to-day management of your Facebook and Instagram ads.',
    },
    included: {
      tr: [
        'Kampanya kurulumu ve hedefleme',
        'Kreatif üretimi ve test',
        'Sürekli optimizasyon',
        'Aylık rapor',
      ],
      en: [
        'Campaign setup and targeting',
        'Creative production and testing',
        'Ongoing optimisation',
        'Monthly report',
      ],
    },
    excluded: {
      tr: ['Reklam bütçesi — doğrudan Meta’ya, kendi kartınızdan ödenir'],
      en: ['Ad spend — paid directly to Meta from your own card'],
    },
    quotas: { tr: ['Sabit aylık ücret', 'Kurulum ücreti yok'], en: ['Flat monthly fee', 'No setup fee'] },
    overages: { tr: [], en: [] },
    footnote: {
      tr: 'Bütçe üzerinden yüzde alınmaz. Ne kadar harcarsanız harcayın yönetim ücreti sabittir.',
      en: 'No percentage of your ad spend. The management fee is flat, whatever you spend.',
    },
  },
  'ads-google': {
    subtitle: {
      tr: 'Google Arama ve Performance Max kampanyalarının kurulumu ve yönetimi.',
      en: 'Setup and management of Google Search and Performance Max campaigns.',
    },
    included: {
      tr: [
        'Anahtar kelime araştırması',
        'Kampanya kurulumu ve dönüşüm takibi',
        'Sürekli optimizasyon',
        'Aylık rapor',
      ],
      en: [
        'Keyword research',
        'Campaign setup and conversion tracking',
        'Ongoing optimisation',
        'Monthly report',
      ],
    },
    excluded: {
      tr: ['Reklam bütçesi — doğrudan Google’a, kendi kartınızdan ödenir'],
      en: ['Ad spend — paid directly to Google from your own card'],
    },
    quotas: { tr: ['Sabit aylık ücret', 'Kurulum ücreti yok'], en: ['Flat monthly fee', 'No setup fee'] },
    overages: { tr: [], en: [] },
  },
  'ads-both': {
    subtitle: {
      tr: 'Meta ve Google birlikte — tek ekip, tek rapor, indirimli fiyat.',
      en: 'Meta and Google together — one team, one report, one lower price.',
    },
    included: {
      tr: [
        'Meta ve Google kampanyalarının tamamı',
        'Platformlar arası bütçe dağılımı',
        'Kreatif üretimi ve test',
        'Tek birleşik aylık rapor',
      ],
      en: [
        'All Meta and Google campaigns',
        'Budget split across platforms',
        'Creative production and testing',
        'One combined monthly report',
      ],
    },
    excluded: {
      tr: ['Reklam bütçesi — doğrudan platformlara, kendi kartınızdan ödenir'],
      en: ['Ad spend — paid directly to the platforms from your own card'],
    },
    quotas: { tr: ['Sabit aylık ücret', 'Kurulum ücreti yok'], en: ['Flat monthly fee', 'No setup fee'] },
    overages: { tr: [], en: [] },
    recommended: true,
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
        tr: 'Hayır. Reklam bütçesi doğrudan Meta / Google\'a, kendi kartınızdan ödenir — biz tahsil etmeyiz, kesmeyiz. Bütçeniz üzerinden yüzde de almayız; yönetim ücreti sabittir.',
        en: 'No. Ad spend goes directly to Meta / Google from your own card — we neither collect nor deduct it. We also take no percentage of your budget; the management fee is flat.',
      },
    },
    {
      q: { tr: 'Bütçem büyürse ücret artar mı?', en: 'Does the fee go up as my budget grows?' },
      a: {
        tr: 'Hayır. Aylık yönetim ücreti sabittir; ister az ister çok harcayın değişmez. Bütçesi büyüyen bir işletme için bu, yüzde alan ajanslara göre belirgin şekilde ucuzdur.',
        en: 'No. The monthly management fee is flat whether you spend a little or a lot. For a growing budget that is markedly cheaper than a percentage-based agency.',
      },
    },
    {
      q: { tr: 'Meta ve Google\'ı birlikte almak ne kazandırır?', en: 'What do I gain by taking Meta and Google together?' },
      a: {
        tr: 'İki platformu ayrı ayrı almak yerine tek pakette alırsanız indirim uygulanır, bütçe iki platform arasında sonuçlara göre kaydırılabilir ve raporlama tek ekranda birleşir.',
        en: 'Taking both in one package is discounted, budget can be shifted between the two platforms according to results, and reporting is combined into one view.',
      },
    },
  ],
  agents: [
    {
      q: { tr: 'Gerçekten kurulum ücreti yok mu?', en: 'Is setup really free?' },
      a: {
        tr: 'Yok. Asistanı kurar, menünüzü veya sık sorulan sorularınızı sisteme işler, numaranızı yönlendirir ve devreye alırız — bunun için ücret almıyoruz. Kazancımız aylık sistem bedeli ve kullanımdan gelir.',
        en: 'It is. We set the assistant up, load your menu or FAQs, forward your number and take it live at no charge. We earn from the monthly system fee and usage.',
      },
    },
    {
      q: { tr: 'İkisini birden alırsam aylık bedeli iki kez mi öderim?', en: 'If I take both, do I pay the monthly fee twice?' },
      a: {
        tr: 'Hayır. Sesli asistan ve WhatsApp asistanını birlikte alırsanız aylık sistem bedeli tek seferdir. Kullanım kalemleri — dakika ve AI yanıtı — kendi tarifelerinden ayrı işler.',
        en: 'No. Take the voice and WhatsApp assistants together and the monthly system fee is paid once. Usage — minutes and AI replies — is billed on its own tariff.',
      },
    },
    {
      q: { tr: 'Kontörüm biterse asistan susar mı?', en: 'Does the assistant stop if my credit runs out?' },
      a: {
        tr: 'Susmaz. Bakiyeniz eşiğin altına inince otomatik yükleme devreye girer ve size bildirim gider. Otomatik yüklemeyi kapatabilirsiniz; o durumda önceden uyarı alırsınız.',
        en: 'It does not. When your balance drops below the threshold, auto top-up kicks in and you are notified. You can switch auto top-up off, in which case you get advance warnings instead.',
      },
    },
    {
      q: { tr: 'WhatsApp\'ta tam olarak ne sayılıyor?', en: 'What exactly is counted on WhatsApp?' },
      a: {
        tr: 'Sadece asistanın gönderdiği yanıtlar. Müşterinizden gelen mesajlar, personelinizin elle yazdığı mesajlar ve sistem bildirimleri sayılmaz.',
        en: 'Only the replies the assistant sends. Incoming customer messages, messages typed by your staff and system notifications are not counted.',
      },
    },
  ],
  systems: [
    {
      q: { tr: 'Aylık bakım ücreti neyi kapsıyor?', en: 'What does the monthly maintenance cover?' },
      a: {
        tr: 'Sistemin kendi sunucumuzda barındırılmasını, çalışıp çalışmadığının izlenmesini, bir akış bozulduğunda müdahale edilmesini ve ayda bir değişiklik hakkını kapsar. Kapsam dışı yeni işler ayrıca fiyatlandırılır.',
        en: 'Hosting on our own server, monitoring that everything is running, fixing a workflow when it breaks, and one change request per month. New work outside the agreed scope is quoted separately.',
      },
    },
    {
      q: { tr: 'Kaç akış kurulacağı belli mi?', en: 'Is the number of workflows fixed?' },
      a: {
        tr: 'Fiyat akış sayısına göre değil, işletmenizin süreçlerine göre belirlenir. Hangi süreçlerin kapsamda olduğu teklifte yazılı olarak yer alır — sonradan sayı tartışması çıkmaz.',
        en: 'The price is set by your processes, not by a workflow count. The proposal lists in writing which processes are in scope, so there is no argument about numbers later.',
      },
    },
    {
      q: { tr: 'Lead + mail sisteminde mailler benim adresimden mi gidiyor?', en: 'Does the lead and email system send from my own address?' },
      a: {
        tr: 'Evet. Sistem sizin domaininiz ve sizin posta kutunuz üzerinden çalışır; domain, mailbox ve veri kredisi bedelleri size aittir. Böylece hem gönderen itibarı hem veri sizde kalır.',
        en: 'Yes. It runs on your domain and your mailbox; domain, mailbox and data credit costs are yours. That way both the sender reputation and the data stay with you.',
      },
    },
  ],
  web: [
    {
      q: {
        tr: 'Çok Dilli AI Web Sitesi paketini mevcut siteme ekler misiniz?',
        en: 'Can you add the Multilingual AI Website package to my existing site?',
      },
      a: {
        tr: 'Bu paket, MGL tarafından hazırlanan yeni web sitesi üzerinde sunulur. Mevcut üçüncü taraf site, WordPress/CMS, CRM veya randevu sistemine entegrasyon pakete dahil değildir. Böyle bir ihtiyaç varsa erişim ve uyumluluk teknik olarak incelenir ve ayrı projelendirilir.',
        en: 'This package is delivered on a new website built by MGL. Integration into an existing third-party site, WordPress/CMS, CRM or booking system is not included. If required, access and compatibility are reviewed first and the work is quoted as a separate project.',
      },
    },
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
        tr: 'Çok Dilli AI Web Sitesi paketinde ilk yıl web hosting ve SSL, kurulum ücretine dahildir. İkinci yıldan itibaren web hosting ve temel bakım 3.499 TL/yıl olarak yenilenir. Aylık abonelik; AI model/API kullanımını, uptime takibini, güvenlik güncellemelerini ve belirtilen AI yanıt kotasını kapsar.',
        en: 'For the Multilingual AI Website, first-year web hosting and SSL are included in the setup fee. From year two, web hosting and core maintenance renew at £100/year. The monthly subscription covers AI model/API usage, uptime monitoring, security updates and the stated AI reply allowance.',
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
  // Kullanım kalemleri artık kontör modelinden geliyor; ürüne özel istisna yok.
  // (Eski 'web-ai' kademesi ve overageChatPer100 alanı kaldırıldı — PLAN.md bölüm 2.)
  const overageItems = isEnglish ? content.overages.en : content.overages.tr;

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
            {overageItems.map((o) => (
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
        ? 'Website Packages — Business, Booking, Multilingual AI & Bespoke | MGL Digital Media'
        : 'Web Sitesi Paketleri — Kurumsal, Randevu, Çok Dilli AI ve Profesyonel | MGL Digital Media';
    }
    return isEnglish
      ? 'AI Agent Packages — WhatsApp, Voice Receptionist, Front Desk & Operations | MGL Digital Media'
      : 'Fiyatlar — Sesli ve WhatsApp Asistanı, Otomasyon, Web, Reklam | MGL Digital Media';
  }, [activeCategory, isEnglish]);

  const seoDescription = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? 'Flat-price ad management: Meta, Google, or both together at a discount. No percentage of your ad spend; the budget is paid directly to Meta / Google. No ranges.'
        : 'Sabit fiyatlı reklam yönetimi: Meta, Google veya ikisi birden indirimli. Bütçeniz üzerinden yüzde alınmaz; reklam bütçesi direkt Meta / Google\'a ödenir. Aralık yok.';
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? 'Six clear website packages, from a £200 one-pager to a multilingual AI website and a fully bespoke professional-services site. Scope, hosting and AI usage are shown upfront.'
        : 'Altı açık web paketi: £200 tek sayfadan çok dilli AI web sitesine ve tamamen özel profesyonel siteye. Kapsam, hosting ve AI kullanımı baştan belirtilir.';
    }
    return isEnglish
      ? 'Clear UK pricing for the voice and WhatsApp assistants, automation and lead systems, websites and ad management. No setup fee on the assistants; usage rates and bundles shown upfront.'
      : 'Sesli ve WhatsApp asistanı, otomasyon ve lead sistemleri, web siteleri ve reklam yönetimi için açık fiyatlar. Asistanlarda kurulum ücreti yok; kullanım tarifesi ve kontör paketleri baştan belirtilir.';
  }, [activeCategory, isEnglish]);

  const seoKeywords = useMemo(() => {
    if (activeCategory === 'ads') {
      return isEnglish
        ? ['AI ads packages', 'Meta ads agency', 'Google ads agency', 'SEO package', 'London ad agency']
        : ['AI reklam paketleri', 'Meta reklam ajansı', 'Google ads ajansı', 'SEO paketi', 'Londra reklam ajansı'];
    }
    if (activeCategory === 'web') {
      return isEnglish
        ? ['website packages', 'multilingual AI website', 'website AI assistant', 'conversion web design', 'Next.js web agency']
        : ['web sitesi paketleri', 'çok dilli AI web sitesi', 'web AI asistanı', 'dönüşüm odaklı web', 'kurumsal site paketi'];
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
            {(['agents', 'systems', 'web', 'ads'] as PackageCategoryKey[]).map((cat) => {
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
                  title: isEnglish ? 'Take both assistants' : 'İkisini birden alın',
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
                ? 'In plain English: take the WhatsApp assistant when most enquiries arrive as messages, the voice assistant when missed calls cost you bookings, and both when the two channels must share the same calendar and CRM — the monthly system fee is still paid only once. We confirm the exact provider stack and usage estimate before launch.'
                : 'Kısaca: Talepleriniz çoğunlukla mesajla geliyorsa WhatsApp asistanını, cevapsız çağrılar randevu kaybettiriyorsa sesli asistanı, iki kanal aynı takvim ve CRM ile çalışacaksa ikisini birden alın — aylık sistem bedeli yine tek ödenir. Sağlayıcı altyapısını ve tahmini kullanım bedelini canlıya almadan önce netleştiririz.'}
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
                    ? 'For deadline reminders, document collection, payment follow-up, spreadsheet/CRM synchronisation or internal reports. Scope is defined by your processes rather than a workflow count and is written into the proposal; hosting, monitoring, failure alerts and monthly maintenance are included.'
                    : 'Deadline hatırlatma, evrak toplama, ödeme takibi, Excel/CRM senkronizasyonu veya iç raporlar için. Kapsam akış sayısıyla değil işletmenizin süreçleriyle tanımlanır ve teklifte yazılı olarak yer alır; barındırma, izleme, hata uyarıları ve aylık bakım dahildir.'}
                </p>
              </div>
              <div style={{ minWidth: 190, textAlign: 'right' }}>
                <strong style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: 25, color: 'var(--ink)' }}>
                  {formatPrice(pricing.packages.automation.setupFee, region)} {isEnglish ? 'setup' : 'kurulum'}
                </strong>
                <span style={{ display: 'block', marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                  + {formatPrice(pricing.packages.automation.price, region)} / {isEnglish ? 'month maintenance' : 'ay bakım'}
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
                  ? '* Multilingual AI Website: first-year hosting is included in setup; £100/year from year two.'
                  : '* Çok Dilli AI Web Sitesi: ilk yıl hosting kuruluma dahil; 2. yıldan itibaren 3.499 TL/yıl.'}
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
                packageMatch={isEnglish ? 'Voice + WhatsApp Assistant' : 'Sesli + WhatsApp Asistanı'}
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
                packageMatch={isEnglish ? 'Voice + WhatsApp Assistant' : 'Sesli + WhatsApp Asistanı'}
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
                packageMatch={isEnglish ? 'Voice + WhatsApp Assistant' : 'Sesli + WhatsApp Asistanı'}
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
                packageMatch={isEnglish ? 'Voice + WhatsApp Assistant' : 'Sesli + WhatsApp Asistanı'}
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
                packageMatch={isEnglish ? 'WhatsApp Assistant' : 'WhatsApp Asistanı'}
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
                ? 'For requirements beyond the standard automation system, we scope an Enterprise system: on-premise deployment, custom integrations (SAP, Nebim, Logo, ERP), dedicated infrastructure and a named engineer with 24/7 priority support.'
                : 'Standart otomasyon sisteminin kapsamını aşan ihtiyaçlar için Enterprise sistem tasarlarız: on-premise kurulum, özel entegrasyonlar (SAP, Nebim, Logo, ERP), dedicated altyapı ve 7/24 öncelikli destek için atanmış mühendis.'}
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
