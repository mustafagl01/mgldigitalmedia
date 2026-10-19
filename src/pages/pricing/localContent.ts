import type { PackageTierKey } from '../../config/pricing';

/* Web, reklam ve AI asistan fiyat sayfası metinleri (eski /packages içeriğinden sadeleştirildi, 2026-10-19).
   Fiyat rakamı burada yok, pricing.ts'den okunur. */

type L = { tr: string; en: string };
type LL = { tr: string[]; en: string[] };

export type LocalTierContent = {
  key: PackageTierKey;
  subtitle: L;
  included: LL;
  excluded?: LL;
};

export const WEB_TIERS: LocalTierContent[] = [
  {
    key: 'web-landing',
    subtitle: { tr: 'Tek sayfa, tek amaç: ziyaretçiyi müşteriye çevirmek.', en: 'One page, one job: turn the visitor into a customer.' },
    included: {
      tr: ['Tek sayfa tasarım ve yazım', 'Mobil öncelikli, hızlı yükleme', 'İletişim / randevu formu', 'Google İşletme Profili ve Maps kurulumu', 'Kurumsal e-posta kurulumu', 'Domain bağlantısı ve SSL'],
      en: ['Single-page design and copy', 'Mobile-first, fast loading', 'Contact / booking form', 'Google Business Profile and Maps setup', 'Business email setup', 'Domain connection and SSL'],
    },
  },
  {
    key: 'web-site',
    subtitle: { tr: 'Beş sayfalık tam site: işletmenizi anlatır, arandığında bulunur.', en: 'A full five-page site that explains your business and gets found.' },
    included: {
      tr: ['Beş sayfa tasarım ve yazım', 'İletişim ve randevu formları', 'Google İşletme Profili, Maps ve yerel SEO', 'Teknik SEO ve paylaşım kartı', 'Kurumsal e-posta kurulumu', 'Üç revizyon turu'],
      en: ['Five pages designed and written', 'Contact and booking forms', 'Google Business Profile, Maps and local SEO', 'Technical SEO and social share card', 'Business email setup', 'Three revision rounds'],
    },
  },
  {
    key: 'web-integrated',
    subtitle: { tr: 'Sitenin üstünde çalışan sistem: online sipariş, rezervasyon veya ödeme.', en: 'A working system on top of the site: online ordering, bookings or payments.' },
    included: {
      tr: ['Kurumsal sitedeki her şey', 'Online sipariş, rezervasyon ve randevu', 'QR menü', 'Ödeme entegrasyonu (Stripe / iyzico)', 'Mutfak yazıcısı veya WhatsApp / Telegram bildirimi', 'Uygulama olarak eklenebilme (PWA)'],
      en: ['Everything in the business website', 'Online ordering, reservations and appointments', 'QR menu', 'Payment integration (Stripe / iyzico)', 'Kitchen printer or WhatsApp / Telegram notifications', 'Installable as an app (PWA)'],
    },
  },
];

export const ADS_TIERS: LocalTierContent[] = [
  {
    key: 'ads-meta',
    subtitle: { tr: 'Facebook ve Instagram reklamlarının kurulumu ve günlük yönetimi.', en: 'Setup and day-to-day management of Facebook and Instagram ads.' },
    included: {
      tr: ['Kampanya kurulumu ve hedefleme', 'Kreatif üretimi ve test', 'Sürekli optimizasyon', 'Aylık rapor'],
      en: ['Campaign setup and targeting', 'Creative production and testing', 'Ongoing optimisation', 'Monthly report'],
    },
  },
  {
    key: 'ads-google',
    subtitle: { tr: 'Google Arama ve Performance Max kampanyalarının kurulumu ve yönetimi.', en: 'Setup and management of Google Search and Performance Max campaigns.' },
    included: {
      tr: ['Anahtar kelime araştırması', 'Kampanya kurulumu ve dönüşüm takibi', 'Sürekli optimizasyon', 'Aylık rapor'],
      en: ['Keyword research', 'Campaign setup and conversion tracking', 'Ongoing optimisation', 'Monthly report'],
    },
  },
  {
    key: 'ads-both',
    subtitle: { tr: 'Meta ve Google birlikte: tek ekip, tek rapor, daha düşük toplam ücret.', en: 'Meta and Google together: one team, one report, a lower total fee.' },
    included: {
      tr: ['Meta ve Google kampanyalarının tamamı', 'Platformlar arası bütçe dağılımı', 'Kreatif üretimi ve test', 'Tek birleşik aylık rapor'],
      en: ['All Meta and Google campaigns', 'Budget split across platforms', 'Creative production and testing', 'One combined monthly report'],
    },
  },
];

export const ASSISTANTS: LocalTierContent[] = [
  {
    key: 'voice',
    subtitle: { tr: 'Telefonu açar, soruyu cevaplar, randevuyu veya siparişi alır.', en: 'Answers the phone, handles questions, takes the booking or order.' },
    included: {
      tr: ['7/24 telefon karşılama', 'Randevu ve sipariş alma', 'Takvim ile canlı senkron', 'Mevcut numaranızın yönlendirilmesi', 'Türkçe ve İngilizce', 'Çağrı kaydı ve yazılı özet'],
      en: ['24/7 call answering', 'Bookings and orders taken', 'Live calendar sync', 'Your existing number forwarded', 'Turkish and English', 'Call recording and written summary'],
    },
    excluded: { tr: ['Telefon hattı aboneliği'], en: ['Phone line subscription'] },
  },
  {
    key: 'whatsapp',
    subtitle: { tr: 'Müşteriniz WhatsApp’tan yazar, asistan cevaplar. Kurulum ücreti yok.', en: 'Your customer messages on WhatsApp, the assistant replies. No setup fee.' },
    included: {
      tr: ['7/24 otomatik yanıt', 'Randevu ve sipariş alma', 'Sık sorulan soruların cevaplanması', 'Türkçe ve İngilizce', 'Devralma butonu: istediğiniz an siz devam edersiniz'],
      en: ['24/7 automatic replies', 'Bookings and orders taken', 'FAQ handling', 'Turkish and English', 'Takeover button: step in whenever you want'],
    },
    excluded: { tr: ['Meta resmi API ücretleri (bu yol seçilirse)', 'İşletme numarası'], en: ['Official Meta API fees (only if that route is chosen)', 'Business phone number'] },
  },
];

export const LOCAL_FAQS = {
  tr: [
    { question: 'Reklam bütçesi ücrete dahil mi?', answer: 'Hayır. Reklam bütçesi doğrudan Meta veya Google’a, kendi kartınızdan ödenir. Yönetim ücreti sabittir; bütçe üzerinden yüzde alınmaz.' },
    { question: 'Sözleşme süresi var mı?', answer: 'Reklam yönetimi ve asistanlar aylıktır, istediğiniz zaman durdurabilirsiniz. Web sitesi tek seferlik satın alınır ve sizin olur.' },
    { question: 'Yıllık ücret neleri kapsar?', answer: 'Web sitelerinde yıllık ücret barındırma, SSL, güvenlik güncellemeleri ve bakımı kapsar. Ayrı bir bakım paketi gerekmez.' },
    { question: 'Dakika ve yanıt paketleri nasıl işler?', answer: 'Sesli asistanda dakika, WhatsApp asistanında AI yanıtı ön ödemeli paketle yüklenir. Paketler bitene kadar geçerlidir, ay sonunda yanmaz. Paket almadan da kullanabilirsiniz; o zaman standart birim fiyat uygulanır.' },
    { question: 'Sesli ve WhatsApp asistanını birlikte alırsam?', answer: 'Aylık sistem ücreti bir kez ödenir; kullanım her kanal için ayrı ölçülür.' },
  ],
  en: [
    { question: 'Is the ad budget included?', answer: 'No. Your ad budget is paid directly to Meta or Google from your own card. The management fee is flat; we take no percentage of your spend.' },
    { question: 'Is there a contract term?', answer: 'Ads management and assistants are monthly and can be stopped any time. A website is a one-off purchase and it is yours.' },
    { question: 'What does the yearly fee cover?', answer: 'For websites, the yearly fee covers hosting, SSL, security updates and maintenance. No separate care plan is needed.' },
    { question: 'How do minute and reply bundles work?', answer: 'Voice minutes and WhatsApp AI replies are loaded with prepaid bundles. Bundles stay valid until used up; they do not expire at the end of the month. You can also use the assistants without a bundle at the standard unit rate.' },
    { question: 'What if I take both the voice and WhatsApp assistant?', answer: 'The monthly system fee is paid once; usage is measured separately for each channel.' },
  ],
};
