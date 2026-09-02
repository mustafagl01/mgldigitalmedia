/**
 * MGL — Stripe ürün kataloğu
 *
 * 2026-09-02'de yeni fiyat modeline göre yeniden yazıldı (PLAN.md bölüm 2).
 *
 * ⚠️ ÖNEMLİ: Buradaki `priceId` değerleri Stripe'taki GERÇEK fiyat nesnelerine
 * işaret eder. Aşağıdaki `priceGbp` sayısını değiştirmek Stripe'ta tahsil edilen
 * tutarı DEĞİŞTİRMEZ — sitede yazan ile karttan çekilen ayrışır. Fiyat değişecekse
 * önce Stripe'ta yeni bir price oluşturulmalı, sonra buraya kimliği yazılmalıdır.
 *
 * ⚠️ `priceTry` yalnızca GÖSTERİM içindir. Checkout her zaman GBP fiyatı üzerinden
 * yapılır (worker/src/auth-handler.ts → line_items[0][price]). Türkiye'de TL ile
 * tahsilat isteniyorsa Stripe'ta ayrı TRY price nesneleri gerekir. Kur: £1 = 65 ₺.
 *
 * AloSipariş kalemleri (asistan aboneliği, termal yazıcı, sesli kontör) Stripe'ta
 * zaten doğru fiyatlarla mevcuttu; yeniden oluşturulmadı, mevcut kimlikleri kullanıldı.
 */

export type StripeCategory = 'assistant' | 'credit' | 'system' | 'web' | 'ads' | 'hardware';

export interface StripeProduct {
  /** Kod içi kararlı anahtar — Stripe product id değil. */
  id: string;
  /** Stripe'taki gerçek price nesnesinin kimliği. Checkout bunu kullanır. */
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  category: StripeCategory;
  priceGbp: number;
  /** Yalnızca gösterim — tahsilat GBP üzerinden yapılır. */
  priceTry: number;
}

export const stripeProducts: StripeProduct[] = [
  // ─── Asistanlar — kurulum yok, aylık sistem bedeli ───
  {
    id: 'assistant_monthly',
    priceId: 'price_1UAFHlDsBtMM0UXX0e37yiXd',
    name: 'Asistan Sistem Bedeli',
    description:
      'Sesli asistan ve WhatsApp asistanının aylık sistem bedeli. Kurulum ücretsizdir. Numaranızın yönlendirilmesi, barındırma, izleme ve bakım dahildir. İki asistanı birden kullansanız da bu bedel tek ödenir. Konuşma dakikası ve AI yanıtı kullanımı ayrıca faturalanır.',
    mode: 'subscription',
    category: 'assistant',
    priceGbp: 9.9,
    priceTry: 649,
  },

  // ─── Sesli asistan kontörü ───
  {
    id: 'voice_credit_500',
    priceId: 'price_1UAGAEDsBtMM0UXXgjGKDtYv',
    name: 'Sesli Kontör — 500 Dakika',
    description:
      'Sesli asistan için 500 konuşma dakikası. Dakika başı 23 peniye denk gelir; standart 25 peni tarifeye göre tasarruf sağlar. Yalnızca bağlanan çağrılar sayılır.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 115,
    priceTry: 7499,
  },
  {
    id: 'voice_credit_1000',
    priceId: 'price_1UAGAFDsBtMM0UXXNWVptrwy',
    name: 'Sesli Kontör — 1.000 Dakika',
    description:
      'Sesli asistan için 1.000 konuşma dakikası. Dakika başı 21 peniye denk gelir. Düzenli telefon trafiği olan işletmeler için.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 210,
    priceTry: 13999,
  },
  {
    id: 'voice_credit_2000',
    priceId: 'price_1UAGAGDsBtMM0UXX5F9VQFZC',
    name: 'Sesli Kontör — 2.000 Dakika',
    description:
      'Sesli asistan için 2.000 konuşma dakikası. Dakika başı 20 peniye denk gelir — en düşük birim fiyat.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 400,
    priceTry: 25999,
  },

  // ─── WhatsApp asistanı kontörü ───
  {
    id: 'wa_credit_5000',
    priceId: 'price_1UBL8IDsBtMM0UXXflQAnGg2',
    name: 'WhatsApp Kontör — 5.000 Yanıt',
    description:
      'WhatsApp asistanı için 5.000 AI yanıtı. AI yanıtı, asistanın gönderdiği mesajdır; gelen mesajlar ve personelinizin yazdığı mesajlar sayılmaz.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 29,
    priceTry: 1899,
  },
  {
    id: 'wa_credit_10000',
    priceId: 'price_1UBL8JDsBtMM0UXX0iFmTcEh',
    name: 'WhatsApp Kontör — 10.000 Yanıt',
    description:
      'WhatsApp asistanı için 10.000 AI yanıtı. 5.000’lik pakete göre yanıt başına daha ucuzdur.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 49,
    priceTry: 3199,
  },
  {
    id: 'wa_credit_20000',
    priceId: 'price_1UBL8JDsBtMM0UXXObWWOPLH',
    name: 'WhatsApp Kontör — 20.000 Yanıt',
    description:
      'WhatsApp asistanı için 20.000 AI yanıtı — en düşük birim fiyat. Yoğun mesaj trafiği olan işletmeler için.',
    mode: 'payment',
    category: 'credit',
    priceGbp: 89,
    priceTry: 5799,
  },

  // ─── Kurulan sistemler ───
  {
    id: 'automation_setup',
    priceId: 'price_1UBL8FDsBtMM0UXXQZuR1X5a',
    name: 'Otomasyon Sistemi — Kurulum',
    description:
      'İşletmenizin tekrar eden süreçlerinin analizi, akış tasarımı ve mevcut sistemlerinizle entegrasyonu. Kapsam teklifte yazılı olarak belirlenir. Aylık sistem bakımı ayrı kalemdir.',
    mode: 'payment',
    category: 'system',
    priceGbp: 400,
    priceTry: 25999,
  },
  {
    id: 'leadmail_setup',
    priceId: 'price_1UBL8GDsBtMM0UXXUiYtstcJ',
    name: 'Lead + Mail Sistemi — Kurulum',
    description:
      'Hedef müşteri profili çıkarımı, lead toplama ve zenginleştirme, e-posta doğrulama ve kişiselleştirilmiş gönderim akışının kurulumu. Domain, mailbox ve veri kredileri müşteriye aittir.',
    mode: 'payment',
    category: 'system',
    priceGbp: 200,
    priceTry: 12999,
  },
  {
    id: 'system_maintenance',
    priceId: 'price_1UBL8HDsBtMM0UXXkmgXUrd7',
    name: 'Sistem Bakımı — Aylık',
    description:
      'Kurulmuş otomasyon veya lead+mail sisteminizin barındırılması, izlenmesi ve arıza müdahalesi. Ayda bir değişiklik hakkı dahildir.',
    mode: 'subscription',
    category: 'system',
    priceGbp: 29,
    priceTry: 1899,
  },

  // ─── Web ───
  {
    id: 'web_landing_setup',
    priceId: 'price_1UBL8DDsBtMM0UXXVcMrrJjO',
    name: 'Tek Sayfa Site — Kurulum',
    description:
      'Tek sayfalık site: tasarım, yazım, mobil öncelikli hızlı yapı, iletişim veya randevu formu, arama motoru temeli, domain bağlantısı ve SSL. Yıllık barındırma ayrı kalemdir.',
    mode: 'payment',
    category: 'web',
    priceGbp: 200,
    priceTry: 12999,
  },
  {
    id: 'web_site_setup',
    priceId: 'price_1UBL8DDsBtMM0UXX6yZxjOMf',
    name: 'Kurumsal Site — Kurulum',
    description:
      'Beş sayfalık tam site: tasarım, yazım, formlar, yerel SEO, schema işaretlemesi, paylaşım kartı ve üç revizyon turu. Yıllık barındırma ayrı kalemdir.',
    mode: 'payment',
    category: 'web',
    priceGbp: 400,
    priceTry: 25999,
  },
  {
    id: 'web_integrated_setup',
    priceId: 'price_1UBL8EDsBtMM0UXXj1TLO8SQ',
    name: 'Entegrasyonlu Site — Kurulum',
    description:
      'Kurumsal site paketinin tamamı ile birlikte online sipariş veya randevu altyapısı, ödeme entegrasyonu, mutfak yazıcısı veya Telegram / WhatsApp bildirimi ve uygulama olarak eklenebilme.',
    mode: 'payment',
    category: 'web',
    priceGbp: 500,
    priceTry: 32499,
  },
  {
    id: 'web_hosting_year',
    priceId: 'price_1UBL8FDsBtMM0UXXTITMOu0A',
    name: 'Web Barındırma — Yıllık',
    description:
      'Sitenizin barındırılması, SSL yenilemesi, yedekleme ve güvenlik güncellemeleri. Yılda bir kez tahsil edilir.',
    mode: 'subscription',
    category: 'web',
    priceGbp: 100,
    priceTry: 6499,
  },

  // ─── Reklam ───
  {
    id: 'ads_meta',
    priceId: 'price_1UBL8HDsBtMM0UXXxNpvaedY',
    name: 'Meta Reklam Yönetimi',
    description:
      'Facebook ve Instagram reklamlarının kurulumu, kreatif üretimi, sürekli optimizasyon ve aylık raporlama. Reklam bütçesi doğrudan Meta’ya, kendi kartınızdan ödenir; bütçeniz üzerinden yüzde alınmaz.',
    mode: 'subscription',
    category: 'ads',
    priceGbp: 99,
    priceTry: 6499,
  },
  {
    id: 'ads_google',
    priceId: 'price_1UBL8IDsBtMM0UXX4kflR7j6',
    name: 'Google Reklam Yönetimi',
    description:
      'Google Arama ve Performance Max kampanyalarının kurulumu, dönüşüm takibi, sürekli optimizasyon ve aylık raporlama. Reklam bütçesi doğrudan Google’a ödenir.',
    mode: 'subscription',
    category: 'ads',
    priceGbp: 99,
    priceTry: 6499,
  },
  {
    id: 'ads_both',
    priceId: 'price_1UBL8IDsBtMM0UXXYaIHAzAR',
    name: 'Meta + Google Reklam Yönetimi',
    description:
      'İki platformun birlikte yönetimi: platformlar arası bütçe dağılımı, kreatif üretimi ve tek birleşik aylık rapor. Ayrı ayrı almaya göre indirimlidir.',
    mode: 'subscription',
    category: 'ads',
    priceGbp: 169,
    priceTry: 10999,
  },

  // ─── Donanım ───
  {
    id: 'thermal_printer',
    priceId: 'price_1UAFHmDsBtMM0UXXOmlK0oz2',
    name: 'Termal Yazıcı',
    description:
      'Siparişin mutfakta kâğıt fiş olarak çıkması için termal yazıcı. Tek seferliktir ve zorunlu değildir — uyumlu bir yazıcınız varsa gerekmez.',
    mode: 'payment',
    category: 'hardware',
    priceGbp: 199,
    priceTry: 12999,
  },
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined =>
  stripeProducts.find((product) => product.priceId === priceId);

export const getProductById = (id: string): StripeProduct | undefined =>
  stripeProducts.find((product) => product.id === id);

export const getProductsByCategory = (category: StripeCategory): StripeProduct[] =>
  stripeProducts.filter((product) => product.category === category);
