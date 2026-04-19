import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Home as HomeIcon,
  MessageCircle,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Target,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Seo, BASE_SCHEMAS, breadcrumbSchema, faqSchema } from '../components/seo/Seo';

type SectorKey = 'dental' | 'realestate' | 'ecommerce' | 'beauty' | 'restaurant' | 'local';
type DeepPage =
  | 'solution-klinik'
  | 'solution-emlak'
  | 'solution-eticaret'
  | 'solution-guzellik'
  | 'solution-restoran';

type PainPoint = {
  id: string;
  problem: { tr: string; en: string };
  solution: { tr: string; en: string };
  value: { tr: string; en: string };
  linkedSkus: Array<{ label: string; anchor: string }>;
};

type Sector = {
  key: SectorKey;
  icon: typeof Stethoscope;
  name: { tr: string; en: string };
  intro: { tr: string; en: string };
  points: PainPoint[];
  extraFlows: { tr: string[]; en: string[] };
  deepPage?: DeepPage;
};

const WHATSAPP_NUMBER = '905318299701';
const WHATSAPP_LABEL = '+90 531 829 97 01';

const SECTORS: Sector[] = [
  {
    key: 'dental',
    icon: Stethoscope,
    deepPage: 'solution-klinik',
    name: { tr: 'Klinik & Estetik', en: 'Clinic & Aesthetic' },
    intro: {
      tr: 'Diş ve estetik kliniklerinde ciro kaybının büyük kısmı tedavi masasında değil, cevaplanamayan WhatsApp mesajında ve gelmeyen hastada oluşuyor. Aşağıdaki üç akış bu sızıntıları kapatıyor.',
      en: 'In dental and aesthetic clinics, revenue loss rarely happens at the chair — it happens in unanswered WhatsApp messages and no-shows. The three workflows below close those leaks.',
    },
    points: [
      {
        id: 'dental-offhours',
        problem: {
          tr: 'Hastalar mesai dışı yazıyor, sekreter sabah fark edince lead soğuyor, başka kliniğe yönleniyor.',
          en: 'Patients message after hours; by the time the receptionist sees it, the lead has cooled and contacted another clinic.',
        },
        solution: {
          tr: 'WhatsApp AI asistan gece gelen mesajı saniyeler içinde karşılıyor, SSS cevaplıyor, müsait saati öneriyor, formu tamamlıyor.',
          en: 'A WhatsApp AI assistant responds within seconds, answers FAQs, proposes an available slot and completes the lead form.',
        },
        value: {
          tr: 'Gece gelen talepler sabah sekreterin takvimine sıcak randevu olarak düşüyor. Tipik olarak diş kliniklerinde mesai dışı hastaya dönüş oranı sıfırken bu akışla yüksek çift haneli seviyeye çıkıyor.',
          en: 'Overnight requests land on the morning calendar as warm bookings. After-hours response goes from zero to double-digit conversion in this sector.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 'dental-noshow',
        problem: {
          tr: 'No-show (randevuya gelmeyen hasta) doluluğu yıkıyor; bir koltuğun boş geçen saati direkt ciro kaybı.',
          en: 'No-shows wreck occupancy — an empty chair hour is direct revenue loss.',
        },
        solution: {
          tr: 'Randevudan 24 saat + 1 saat önce WhatsApp\'tan hatırlatma; konum + hazırlık notu + tek tıkla erteleme/onay butonları.',
          en: 'Reminders via WhatsApp at 24h and 1h before appointment; location + prep note + one-tap reschedule/confirm buttons.',
        },
        value: {
          tr: 'Hatırlatma akışı çalışan kliniklerde no-show oranında belirgin düşüş gözlemleniyor; takvim doluluğu korunur, ciro erimez.',
          en: 'Clinics running reminders see a measurable drop in no-shows; calendar stays full, revenue is protected.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 'dental-reviews',
        problem: {
          tr: 'Google Profil\'de yorum sayısı rakipten az; yeni hasta aramada önce rakibin linkini tıklıyor.',
          en: 'Your Google Profile has fewer reviews than competitors; new patients click their link first in search.',
        },
        solution: {
          tr: 'Hizmet bittikten 1 saat sonra hastaya "memnun kaldıysanız yıldız verin" WhatsApp mesajı; tek tıkla Google yorum sayfasına gönderir.',
          en: 'One hour after treatment, WhatsApp sends a "if you were happy, leave a star" message linking directly to your Google review page.',
        },
        value: {
          tr: 'Organik yorum hacmi artar, yerel SEO güçlenir, "yakınımdaki diş kliniği" aramalarında görünürlük yükselir.',
          en: 'Organic review volume rises, local SEO strengthens, visibility on "dentist near me" searches improves.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'SEO', anchor: 'seo' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Tedavi planı PDF\'i otomatik oluşturup hastaya gönderme',
        'Ödeme takibi (taksitli tedavilerde hatırlatma)',
        'Yeni hasta onboarding akışı (anamnez formu + randevu + konum)',
        'İkinci kontrol (follow-up) hatırlatıcısı',
      ],
      en: [
        'Auto-generated treatment plan PDFs sent to patients',
        'Payment follow-up for installment treatments',
        'New patient onboarding (intake form + booking + location)',
        'Follow-up check reminders',
      ],
    },
  },
  {
    key: 'realestate',
    icon: HomeIcon,
    deepPage: 'solution-emlak',
    name: { tr: 'Emlak & Gayrimenkul', en: 'Real Estate' },
    intro: {
      tr: 'Emlakçı sunumdayken açılmayan telefon, deftere yazılıp unutulan kriterler, "konum atar mısın?" mesaj yığını — komisyonu yakan üç darboğaz. Aşağıdaki akışlar bunları tek tek kapatıyor.',
      en: 'A missed call during a showing, a client criteria scribbled on paper and forgotten, endless "can you send the location?" messages — the three bottlenecks that burn commissions. These workflows close them.',
    },
    points: [
      {
        id: 're-missed-call',
        problem: {
          tr: 'Emlakçı sunumdayken telefonu açamıyor; o sırada arayan sıcak müşteri anında başka emlakçıyı arıyor.',
          en: 'The agent cannot pick up during a showing; the warm caller dials a competitor within minutes.',
        },
        solution: {
          tr: 'Cevapsız çağrı düştüğü anda WhatsApp\'tan otomatik mesaj: "Şu an daire gösteriyorum, sizi birazdan arayacağım. Hangi ilanı aramıştınız?"',
          en: 'The second a call is missed, WhatsApp sends: "I\'m in a showing — I\'ll call you shortly. Which listing were you calling about?"',
        },
        value: {
          tr: 'Müşteri sıcak tutulur, konu (ilan numarası) öğrenilir, emlakçı döndüğünde hazırlıklı arıyor. Komisyon rakibe gitmez.',
          en: 'The lead stays warm, the listing context is captured, the agent returns the call prepared. Commission stays with you.',
        },
        linkedSkus: [
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
        ],
      },
      {
        id: 're-criteria-match',
        problem: {
          tr: 'Müşteri "3+1, balkonlu, metroya yakın" der; emlakçı deftere yazar ve birkaç gün sonra unutur; uygun ilan düştüğünde müşteriye dönülmez.',
          en: 'A client says "3+1, balcony, near metro"; the agent writes it down and forgets days later; when a match appears, nobody follows up.',
        },
        solution: {
          tr: 'Müşteri kriteri CRM\'e girilir. İlan platformlarında o kriterlere uyan yeni ilan çıktığında emlakçıya ve müşteriye otomatik "Eşleşme bulundu" bildirimi.',
          en: 'Client criteria are stored in CRM. When a matching listing appears on portal feeds, both agent and client get an auto "Match found" alert.',
        },
        value: {
          tr: 'Emlakçı uyurken bile satış akışı çalışır; her müşterinin talebi aktif olarak kovalanır, kayıp lead sıfıra yaklaşır.',
          en: 'The sales pipeline runs even when the agent sleeps; every request is actively pursued, lead leakage drops toward zero.',
        },
        linkedSkus: [
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 're-appointment',
        problem: {
          tr: '"Konum atar mısın?", "Saat kaçtaydı?", "Kapıcı numarası ne?" mesajları emlakçının zamanını yiyor.',
          en: '"Can you send the location?", "What time again?", "Who\'s the super?" — these messages eat the agent\'s day.',
        },
        solution: {
          tr: 'Randevu oluştuğu an müşteriye otomatik paket: konum linki, saat, "evi gezmeden önce bilmeniz gerekenler" PDF\'i; randevudan 1 saat önce hatırlatma.',
          en: 'The moment a viewing is booked, the client gets: location link, time, "what to know before the viewing" PDF; auto-reminder 1 hour before.',
        },
        value: {
          tr: 'Emlakçı tekrar eden sorulardan kurtulur, müşteri kendini profesyonel karşılanmış hisseder, no-show azalır.',
          en: 'The agent stops answering the same questions, the client feels professionally handled, no-shows drop.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Sözleşme yenileme hatırlatıcı (bitişe 30 gün kala)',
        'Randevu sonrası "evi nasıl buldunuz?" mini anketi',
        'Bölge fiyat analizi (haftalık mahalle raporu)',
        'Portal ilan yüklemelerini tek panelden yönetme',
      ],
      en: [
        'Contract renewal reminder (30 days before expiry)',
        'Post-viewing "how was the property?" micro-survey',
        'Neighborhood pricing report (weekly)',
        'Multi-portal listing management from one dashboard',
      ],
    },
  },
  {
    key: 'ecommerce',
    icon: ShoppingBag,
    deepPage: 'solution-eticaret',
    name: { tr: 'E-ticaret', en: 'E-commerce' },
    intro: {
      tr: 'E-ticarette en pahalı kayıp boş sepet, yavaş destek ve verimsiz reklam. WhatsApp sepet kurtarma, AI destek botu ve Meta/Google ROAS yönetimi bu üç sızıntıyı tek sistemde kapatır.',
      en: 'In e-commerce the most expensive leaks are abandoned carts, slow support, and inefficient ads. WhatsApp cart recovery, an AI support bot, and Meta/Google ROAS management close all three in one system.',
    },
    points: [
      {
        id: 'ec-cart',
        problem: {
          tr: 'Sepete ürün eklenir ama %70+ oranında ödeme yapılmadan çıkılır; kurtarma mesajı atılmaz.',
          en: '70%+ of shoppers add to cart but leave before checkout; no recovery message goes out.',
        },
        solution: {
          tr: 'WhatsApp sepet kurtarma zinciri: 30 dk sonra hatırlatma, 24 sa sonra kişisel indirim kodu, 72 sa sonra son fırsat mesajı.',
          en: 'WhatsApp cart-recovery chain: 30-min reminder, 24-hour personal discount, 72-hour final-chance message.',
        },
        value: {
          tr: 'Terkedilen sepetlerin bir kısmı ciroya döner; ortalama sepet değerine göre aylık 6-7 haneli kurtarma potansiyeli açılır.',
          en: 'A share of abandoned carts returns to revenue; depending on basket size, monthly recovery opens into 6-7 figures.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 'ec-support',
        problem: {
          tr: 'Müşteri destek 6+ saatten önce cevap veremez, müşteri rakipten satın alır.',
          en: 'Support takes 6+ hours to reply; the customer buys from a competitor instead.',
        },
        solution: {
          tr: 'WhatsApp AI destek botu: sipariş durumu, kargo takibi, iade süreci, SSS — saniyeler içinde yanıt; karmaşık sorun insana eskalasyon.',
          en: 'WhatsApp AI support bot: order status, shipping, returns, FAQ — seconds to reply; complex cases escalate to a human.',
        },
        value: {
          tr: 'Destek cevap süresi dakikalara düşer, müşteri memnuniyeti ve tekrar satış oranı artar.',
          en: 'Response time drops to minutes; satisfaction and repeat-purchase rates climb.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
        ],
      },
      {
        id: 'ec-roas',
        problem: {
          tr: 'Meta ROAS 2.0 altında, bütçe verimsiz yanıyor; creative haftalarca değişmiyor.',
          en: 'Meta ROAS below 2.0, budget burns; creatives go weeks without refresh.',
        },
        solution: {
          tr: 'Haftalık creative rotasyonu, lookalike + retargeting segmentasyonu, UTM standardı ve Google Shopping feed yönetimi.',
          en: 'Weekly creative rotation, lookalike + retargeting segmentation, UTM standard, and Google Shopping feed management.',
        },
        value: {
          tr: 'ROAS trendi 3 ay içinde stabilleşir; reklam spend\'i başına gelir katsayısı ölçülebilir şekilde iyileşir.',
          en: 'ROAS trend stabilizes in 3 months; revenue per ad-spend unit improves measurably.',
        },
        linkedSkus: [
          { label: 'Meta Reklam', anchor: 'meta-ads' },
          { label: 'Google Reklam', anchor: 'google-ads' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Sipariş durumu ve kargo takibi WhatsApp bildirimi',
        'Stok tükenen ürün için müşteriye otomatik "tekrar stokta" uyarısı',
        'Değerlendirme (yorum) isteme akışı — teslimat sonrası 3 gün',
        'İade/değişim self-servis WhatsApp akışı',
      ],
      en: [
        'Order status and shipping notifications on WhatsApp',
        'Auto "back in stock" alerts for sold-out items',
        'Post-delivery review request flow (day 3)',
        'Self-serve return/exchange WhatsApp flow',
      ],
    },
  },
  {
    key: 'beauty',
    icon: Scissors,
    deepPage: 'solution-guzellik',
    name: { tr: 'Güzellik & Kuaför Salonları', en: 'Beauty & Hair Salons' },
    intro: {
      tr: 'Güzellik sektöründe ciro; dolu takvim, geri dönen müşteri ve doğru zamanda atılan hatırlatmada saklı. Aşağıdaki üç akış bu üç kaldıracı otomatize ediyor.',
      en: 'In beauty, revenue lives in full calendars, returning clients and timely reminders. These three workflows automate all three levers.',
    },
    points: [
      {
        id: 'beauty-dormant',
        problem: {
          tr: '60-90 gündür gelmeyen müşteri unutuluyor; salon boş saatlerde çalışırken eski müşteri bir türlü geri çağrılmıyor.',
          en: 'Clients dormant for 60-90 days are forgotten; chairs sit empty while past clients go uncalled.',
        },
        solution: {
          tr: 'CRM son ziyaretten 60 gün geçen müşteriyi tarar; kişiselleştirilmiş WhatsApp: "Sizi özledik, bu haftaya özel %20 indiriminiz var."',
          en: 'CRM scans for 60-day-dormant clients; personalized WhatsApp: "We\'ve missed you — 20% off this week only."',
        },
        value: {
          tr: 'Kayıp müşteri geri kazanılır; reklamla yeni müşteri çekmekten çok daha ucuza doluluk artar.',
          en: 'Dormant clients come back; occupancy rises far cheaper than paid acquisition.',
        },
        linkedSkus: [
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
        ],
      },
      {
        id: 'beauty-reminders',
        problem: {
          tr: 'Randevu hatırlatma eksik → son dakika iptali veya gelmeyen müşteri → boş koltuk saati.',
          en: 'Missing reminders → last-minute cancellations or no-shows → empty chair hour.',
        },
        solution: {
          tr: 'Randevudan 24 saat + 1 saat önce WhatsApp hatırlatma (onayla / yeniden planla butonlu).',
          en: 'WhatsApp reminders at 24h and 1h before (with confirm / reschedule buttons).',
        },
        value: {
          tr: 'Doluluk oranında belirgin yükseliş, aynı personelle daha fazla müşteri.',
          en: 'Measurable occupancy uplift, more clients served with the same staff.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 'beauty-birthday',
        problem: {
          tr: 'Doğum günü, yıl dönümü gibi özel tarihler unutuluyor; müşteri "beni hatırlamıyor" hissine kapılıyor.',
          en: 'Birthdays and anniversaries slip by; clients feel forgotten.',
        },
        solution: {
          tr: 'CRM doğum gününü takvim olarak tutar; o sabah otomatik kutlama + özel indirim kodu WhatsApp\'tan gönderilir.',
          en: 'CRM tracks birthdays; that morning an auto greeting + special code goes via WhatsApp.',
        },
        value: {
          tr: 'Sadakat + LTV (müşteri ömür boyu değeri) artar; tek kanalın sabit işleyen sürprizleriyle marka sıcaklığı büyür.',
          en: 'Loyalty and lifetime value rise; the brand feels personal through a single consistent channel.',
        },
        linkedSkus: [
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Paket / abonelik satışı için otomatik takip akışı',
        'Hizmet sonrası bakım hatırlatıcı (ör. boya tazeleme)',
        'Google yorum isteme otomasyonu',
        'Sosyal medya içeriği için otomatik fotoğraf isteme akışı',
      ],
      en: [
        'Package / subscription upsell follow-up',
        'Post-service maintenance reminders (e.g., color refresh)',
        'Google review request automation',
        'Social-content photo request flow',
      ],
    },
  },
  {
    key: 'restaurant',
    icon: UtensilsCrossed,
    deepPage: 'solution-restoran',
    name: { tr: 'Restoran & Cafe', en: 'Restaurant & Cafe' },
    intro: {
      tr: 'Restoranlarda en pahalı kayıp boş masa değil, geri gelmeyen müşteri. Rezervasyon, sadakat ve yorum üçlüsünü otomatize etmek ciroyu anlamlı şekilde büyütüyor.',
      en: 'The most expensive loss in hospitality is not the empty table — it\'s the client who never returns. Automating reservations, loyalty and reviews meaningfully grows revenue.',
    },
    points: [
      {
        id: 'restaurant-reservation',
        problem: {
          tr: 'Rezervasyon isteyen müşteri telefonda beklerken kapıyor; veya Instagram DM\'i akşam servis arasında kayboluyor.',
          en: 'A client calling for a reservation hangs up while on hold; or the Instagram DM is lost mid-service.',
        },
        solution: {
          tr: 'WhatsApp rezervasyon asistanı: tarih, saat, kişi sayısı, özel istek; onay mesajı + takvime otomatik kayıt.',
          en: 'WhatsApp reservation assistant: date, time, party size, special requests; confirmation + automatic calendar insert.',
        },
        value: {
          tr: 'Rezervasyon hacmi artar, garson servise odaklanır, menşelere göre hazırlık bilgisi baştan hazır olur.',
          en: 'Reservation volume grows, waiters stay on service, prep details are known up front.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
        ],
      },
      {
        id: 'restaurant-qr',
        problem: {
          tr: 'QR menü sadece menü gösteriyor, gelen müşterinin datasını toplamıyor — tekrar gelmesi için tutacak bir kanal yok.',
          en: 'The QR menu only shows items; it captures no data — there\'s no channel to bring the guest back.',
        },
        solution: {
          tr: 'QR menüye ek: "bu haftaki kampanya için WhatsApp\'ınızı ekleyin" mini form → CRM kaydı + hoş geldin mesajı.',
          en: 'QR menu add-on: "add your WhatsApp for this week\'s promo" mini form → CRM entry + welcome message.',
        },
        value: {
          tr: 'Her gelen müşteri potansiyel sadık müşteri olarak sisteme düşer; tekrar pazarlama imkânı açılır.',
          en: 'Every guest becomes a potential loyal customer in the system; re-engagement becomes possible.',
        },
        linkedSkus: [
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
          { label: 'Landing Page', anchor: 'landing-page' },
        ],
      },
      {
        id: 'restaurant-review',
        problem: {
          tr: 'Yeni müşteri Google\'da bakıyor; düşük yorum sayısı nedeniyle rakip restoranı seçiyor.',
          en: 'New customers search Google and pick a competitor because review count is low.',
        },
        solution: {
          tr: 'Hesap kapatıldıktan sonra masa QR\'ından otomatik "5 yıldız" mesajı; tek tık Google yorum sayfasına yönlendirir.',
          en: 'After the bill, a table-QR sends an auto "rate us" prompt; one tap opens the Google review page.',
        },
        value: {
          tr: 'Yıldız ortalaması ve yorum hacmi artar; "yakındaki restoran" aramasında öne çıkar.',
          en: 'Average star rating and review count grow; visibility on "restaurants near me" rises.',
        },
        linkedSkus: [
          { label: 'n8n Otomasyon', anchor: 'n8n-automation' },
          { label: 'Landing Page', anchor: 'landing-page' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Gel-al siparişi için WhatsApp bot + ödeme linki',
        'VIP müşteri algılayıcı (yüksek tutarlı hesapta ekibe Slack bildirimi)',
        'Menü değişikliğinde kayıtlı müşterilere otomatik haberleşme',
        'Çalışan yemek siparişi akışı (B2B)',
      ],
      en: [
        'Takeaway ordering via WhatsApp bot + payment link',
        'VIP detector (Slack alert for high-ticket bills)',
        'Auto-broadcast menu changes to opt-in list',
        'Corporate lunch order workflow (B2B)',
      ],
    },
  },
  {
    key: 'local',
    icon: Wrench,
    name: { tr: 'Lokal Hizmet İşletmeleri', en: 'Local Service Businesses' },
    intro: {
      tr: 'Tamirci, veteriner, petshop, eğitim kurumu, özel öğretmen — her gün aynı soruları cevaplayan işletmeler için üç vurucu otomasyon. Google\'da "yakınımdaki X" aramasında öne geçmek için de yerel SEO dahil.',
      en: 'Repair shops, veterinarians, pet stores, training centers, tutors — three impactful automations for businesses answering the same questions all day. Local SEO included to win "near me" searches.',
    },
    points: [
      {
        id: 'local-faq',
        problem: {
          tr: 'Aynı sorular (fiyat, çalışma saati, hizmet kapsamı) tekrar tekrar soruluyor; personel vaktinin yarısı buna gidiyor.',
          en: 'The same questions (price, hours, scope) asked over and over; staff spend half their day answering them.',
        },
        solution: {
          tr: 'WhatsApp SSS asistanı: fiyat, çalışma saati, hizmet listesi, konum, ödeme seçenekleri; anlamadığı soru gelirse insana aktarır.',
          en: 'WhatsApp FAQ assistant: pricing, hours, services, location, payment options; escalates to human on edge cases.',
        },
        value: {
          tr: 'Operasyonel yük çarpıcı biçimde azalır, müşteri saniyeler içinde cevap alır.',
          en: 'Operational load drops sharply, customers get answers in seconds.',
        },
        linkedSkus: [
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
        ],
      },
      {
        id: 'local-crm',
        problem: {
          tr: 'Müşteri / randevu / sipariş takibi Excel\'de; birisi çıkınca bilgi kayboluyor, kim nerede belirsiz.',
          en: 'Clients, appointments, orders tracked in Excel; if someone leaves, the data is lost.',
        },
        solution: {
          tr: 'Notion veya Airtable CRM + WhatsApp bot entegrasyonu; tek sistemde müşteri geçmişi, notlar, hatırlatmalar.',
          en: 'Notion or Airtable CRM + WhatsApp bot integration; one system for client history, notes, reminders.',
        },
        value: {
          tr: 'Hiçbir müşteri kaybolmaz, ekip devir-tesliminde bilgi aktarılır, kurumsal hafıza oluşur.',
          en: 'No client is lost, handoffs preserve knowledge, institutional memory forms.',
        },
        linkedSkus: [
          { label: 'CRM Kurulumu', anchor: 'crm-setup' },
          { label: 'WhatsApp AI Bot', anchor: 'whatsapp-bot' },
        ],
      },
      {
        id: 'local-seo',
        problem: {
          tr: 'Google\'da "yakınımdaki oto tamircisi" aratıldığında rakipler üstte, siz ikinci sayfadasınız.',
          en: 'On "auto repair near me" searches, competitors rank first and your business sits on page two.',
        },
        solution: {
          tr: 'LocalBusiness schema + Google Profil optimizasyonu + yerel kelime haritası + düzenli yorum akışı.',
          en: 'LocalBusiness schema + Google Business Profile optimization + local keyword mapping + steady review pipeline.',
        },
        value: {
          tr: 'Yerel aramalarda görünürlük artar; reklam vermeden organik lead girişi başlar.',
          en: 'Local search visibility grows; organic lead flow begins without ad spend.',
        },
        linkedSkus: [
          { label: 'SEO', anchor: 'seo' },
          { label: 'Web Sitesi', anchor: 'website' },
        ],
      },
    ],
    extraFlows: {
      tr: [
        'Servis bakım hatırlatıcı (aracın, evin, cihazın)',
        'Sipariş durumu WhatsApp güncelleme akışı',
        'Teklif (quote) otomatik hazırlama + PDF',
        'Fatura / tahsilat hatırlatma akışı',
      ],
      en: [
        'Service maintenance reminders (vehicle, home, device)',
        'Order status WhatsApp update flow',
        'Automated quote generation + PDF',
        'Invoice / payment reminder flow',
      ],
    },
  },
];

const FAQS: Array<{ q: { tr: string; en: string }; a: { tr: string; en: string } }> = [
  {
    q: {
      tr: 'Sektörümde tam olarak aynı akış var mı?',
      en: 'Does the exact workflow for my sector exist?',
    },
    a: {
      tr: 'Yukarıdaki 5 sektör en yaygın sorulara referans olsun diye seçildi. Benzer darboğazlar e-ticaret, hukuk, eğitim, turizm gibi alanlarda da karşımıza çıkıyor; 15 dakikalık keşif görüşmesinde sizin akışınıza birebir uyarlıyoruz.',
      en: 'The 5 sectors shown cover the most common questions. Similar bottlenecks exist in e-commerce, legal, education, hospitality; we tailor the workflow to your business in a 15-minute discovery call.',
    },
  },
  {
    q: {
      tr: 'Kurulum ne kadar sürer?',
      en: 'How long does setup take?',
    },
    a: {
      tr: 'WhatsApp bot 3 iş günü, n8n otomasyon 5–15 iş günü, CRM kurulumu 10–25 iş günü. SEO ve reklam yönetimi için kurulum 7 iş günü; sonuçlar 4–12 hafta içinde olgunlaşır.',
      en: 'WhatsApp bot 3 business days, n8n automation 5–15 business days, CRM setup 10–25 business days. SEO and ad management setup 7 business days; results mature in 4–12 weeks.',
    },
  },
  {
    q: {
      tr: 'İlk ay risk modeli her akış için aynı mı?',
      en: 'Is the first-month risk model the same for every workflow?',
    },
    a: {
      tr: 'Değişken maliyet düşük hizmetlerde (WhatsApp bot, n8n, SEO, analitik) ilk ay ajans ücreti yok — kurulum + 30 gün gerçek trafik bizden. Sesli asistan ve içerik üretimi gibi değişken maliyetli hizmetlerde ilk ay %50 pilot fiyat; reklam yönetiminde ilk ay yönetim ücreti %50 ve reklam harcaması pass-through.',
      en: 'Low-variable-cost services (WhatsApp bot, n8n, SEO, analytics) have zero agency fee in month one — setup + 30 days of real traffic on us. Variable-cost services (voice, content) run at 50% pilot pricing in the first month; ad management at 50% first-month fee with ad spend pass-through.',
    },
  },
  {
    q: {
      tr: 'Mevcut CRM veya web sitemle entegre olur mu?',
      en: 'Will it integrate with my existing CRM or website?',
    },
    a: {
      tr: 'Evet. HubSpot, Pipedrive, Notion, Airtable, Zoho, özel MySQL/PostgreSQL veritabanları, WordPress, Shopify, WooCommerce — n8n üzerinden 400+ uygulama desteklenir. API\'si olan her sisteme bağlanır.',
      en: 'Yes. HubSpot, Pipedrive, Notion, Airtable, Zoho, custom MySQL/PostgreSQL, WordPress, Shopify, WooCommerce — 400+ apps via n8n. Connects to any system with an API.',
    },
  },
  {
    q: {
      tr: 'Hangi dilleri destekliyorsunuz?',
      en: 'Which languages do you support?',
    },
    a: {
      tr: 'WhatsApp ve e-posta asistanları GPT-4o üzerinde 30+ dilde doğal yanıt üretir — Türkçe, İngilizce, Almanca, Fransızca, İspanyolca, Arapça, Rusça dahil. Sesli asistan Türkçe doğal ses + çok dilli aksansız seçeneklerle gelir. Müşteri hangi dilde yazarsa sistem o dilde yanıtlar.',
      en: 'WhatsApp and email assistants run on GPT-4o and reply naturally in 30+ languages — Turkish, English, German, French, Spanish, Arabic, Russian, and more. The voice agent ships with natural Turkish plus neutral-accent options across major languages. Customers get answered in whatever language they write in.',
    },
  },
  {
    q: {
      tr: 'Hangi bölgelere hizmet veriyorsunuz?',
      en: 'Which regions do you serve?',
    },
    a: {
      tr: 'Merkezimiz Londra (Enfield) — tüm Türkiye ve Birleşik Krallık\'a uzaktan hizmet veriyoruz. Tüm akışlar bulut tabanlı, yerinde kurulum gerekmiyor; görüşmeler Zoom/Meet üzerinden yürür.',
      en: 'HQ in London (Enfield) — we serve all of the UK and Turkey remotely. Every workflow is cloud-based, no on-site installation required; meetings run over Zoom/Meet.',
    },
  },
];

function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function SectorCard({
  sector,
  isEnglish,
  onNavigate,
}: {
  sector: Sector;
  isEnglish: boolean;
  onNavigate?: (page: DeepPage) => void;
}) {
  const Icon = sector.icon;
  const [flowsOpen, setFlowsOpen] = useState(false);
  const name = isEnglish ? sector.name.en : sector.name.tr;
  const intro = isEnglish ? sector.intro.en : sector.intro.tr;
  const extras = isEnglish ? sector.extraFlows.en : sector.extraFlows.tr;

  const waMessage = isEnglish
    ? `Hi, I'd like a discovery call about ${sector.name.en} workflows.`
    : `Merhaba, ${sector.name.tr} için akışları konuşmak istiyorum.`;

  return (
    <section
      id={`sector-${sector.key}`}
      aria-labelledby={`sector-${sector.key}-title`}
      style={{ scrollMarginTop: 96 }}
    >
      <header style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap' }}>
        <div
          style={{
            flexShrink: 0,
            padding: 14,
            border: '1px solid var(--border)',
            background: 'var(--paper-2)',
            borderRadius: 'var(--r-md)',
            color: 'var(--ember)',
          }}
        >
          <Icon size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2
            id={`sector-${sector.key}-title`}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            {name}
          </h2>
          <p
            style={{
              marginTop: 12,
              maxWidth: 720,
              color: 'var(--fg-2)',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {intro}
          </p>
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {sector.points.map((point) => (
          <article
            key={point.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 24,
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ember)',
                marginBottom: 10,
              }}
            >
              <AlertTriangle size={12} />
              {isEnglish ? 'Problem' : 'Problem'}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink)', margin: 0 }}>
              {isEnglish ? point.problem.en : point.problem.tr}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Target size={12} />
              {isEnglish ? 'Solution' : 'Çözüm'}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)', margin: 0 }}>
              {isEnglish ? point.solution.en : point.solution.tr}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Check size={12} />
              {isEnglish ? 'Value' : 'Değer'}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)', margin: 0 }}>
              {isEnglish ? point.value.en : point.value.tr}
            </p>

            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {point.linkedSkus.map((sku) => (
                <a
                  key={sku.anchor}
                  href={`/services#${sku.anchor}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: 'var(--ember)',
                    background: 'var(--ember-soft)',
                    border: '1px solid var(--ember)',
                    borderRadius: 999,
                  }}
                >
                  {sku.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => setFlowsOpen(!flowsOpen)}
          className="btn btn-ghost"
          aria-expanded={flowsOpen}
        >
          {flowsOpen
            ? isEnglish
              ? 'Hide additional flows'
              : 'Ek akışları gizle'
            : isEnglish
              ? `See all ${sector.points.length + extras.length}+ flows`
              : `Tüm ${sector.points.length + extras.length}+ akışı gör`}
          <ChevronDown
            size={14}
            style={{
              marginLeft: 4,
              transform: flowsOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 200ms var(--ease-out)',
            }}
          />
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sector.deepPage && onNavigate && (
            <button
              onClick={() => onNavigate(sector.deepPage!)}
              className="btn btn-primary"
            >
              {isEnglish ? 'See detail page' : 'Detay sayfası'}
              <ArrowRight size={14} />
            </button>
          )}
          <a
            href={createWhatsAppLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className={sector.deepPage && onNavigate ? 'btn btn-secondary' : 'btn btn-primary'}
          >
            <MessageCircle size={14} />
            {isEnglish ? 'Discuss' : 'Konuşalım'}
          </a>
        </div>
      </div>

      {flowsOpen && (
        <ul
          style={{
            marginTop: 20,
            padding: 24,
            listStyle: 'none',
            background: 'var(--paper-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 10,
          }}
        >
          {extras.map((flow) => (
            <li
              key={flow}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 14,
                color: 'var(--fg-1)',
                lineHeight: 1.5,
              }}
            >
              <Check size={14} style={{ marginTop: 3, flexShrink: 0, color: 'var(--ember)' }} />
              <span>{flow}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type SolutionsProps = {
  onNavigate?: (page: DeepPage) => void;
};

export default function Solutions({ onNavigate }: SolutionsProps = {}) {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const [activeKey, setActiveKey] = useState<SectorKey | 'all'>('all');

  const visibleSectors = useMemo(
    () => (activeKey === 'all' ? SECTORS : SECTORS.filter((s) => s.key === activeKey)),
    [activeKey],
  );

  const title = isEnglish
    ? 'Sector Solutions: WhatsApp, Voice & Automation Playbooks | MGL Digital Media'
    : 'Sektörel Çözümler: WhatsApp, Sesli Asistan ve Otomasyon Akışları | MGL Digital Media';

  const description = isEnglish
    ? 'Sector-specific WhatsApp bots, voice assistants and n8n workflows for dental clinics, real estate, beauty salons, restaurants and local service businesses. London HQ, serving UK & Turkey remotely.'
    : 'Diş klinikleri, emlak, güzellik salonları, restoranlar ve lokal hizmet işletmeleri için hazır WhatsApp botları, sesli asistanlar ve n8n otomasyon akışları. Londra merkezli, UK ve Türkiye\'ye uzaktan hizmet.';

  const jsonLd = [
    ...BASE_SCHEMAS,
    breadcrumbSchema([
      { name: isEnglish ? 'Home' : 'Ana Sayfa', path: '/' },
      { name: isEnglish ? 'Sector Solutions' : 'Sektörel Çözümler', path: '/solutions' },
    ]),
    faqSchema(
      FAQS.map((f) => ({
        question: isEnglish ? f.q.en : f.q.tr,
        answer: isEnglish ? f.a.en : f.a.tr,
      })),
    ),
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/solutions"
        locale={isEnglish ? 'en_GB' : 'tr_TR'}
        keywords={
          isEnglish
            ? [
                'dental clinic automation',
                'real estate WhatsApp bot',
                'beauty salon CRM',
                'restaurant reservation automation',
                'local SEO UK',
                'n8n automation agency',
              ]
            : [
                'diş kliniği whatsapp bot',
                'emlakçı otomasyon',
                'güzellik salonu CRM',
                'restoran rezervasyon botu',
                'yerel SEO',
                'n8n otomasyon ajansı',
                'sektörel dijital çözüm',
              ]
        }
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(40px, 3vw + 16px, 72px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="eyebrow">
            {isEnglish ? 'SECTOR PLAYBOOKS' : 'SEKTÖREL AKIŞ HARİTALARI'}
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
            {isEnglish ? (
              <>
                Built for your sector.
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>Not one-size-fits-all.</span>
              </>
            ) : (
              <>
                Sektörünüze göre kurulmuş.
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--fg-2)' }}>Tek tip değil.</span>
              </>
            )}
          </h1>
          <p className="lede" style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}>
            {isEnglish
              ? 'Five sectors, three highest-impact workflows each, plus linked services so you can see exactly which building blocks run in the background.'
              : 'Beş sektör, her birinde en yüksek etkili üç akış — ve arka planda hangi hizmetlerin çalıştığını gösteren bağlantılı yapı taşları.'}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section
        style={{
          position: 'sticky',
          top: 72,
          zIndex: 5,
          background: 'rgba(245, 241, 234, 0.92)',
          backdropFilter: 'saturate(140%) blur(10px)',
          WebkitBackdropFilter: 'saturate(140%) blur(10px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
        }}
      >
        <div className="container">
          <nav
            aria-label={isEnglish ? 'Filter by sector' : 'Sektöre göre filtrele'}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}
          >
            <button
              onClick={() => setActiveKey('all')}
              className={activeKey === 'all' ? 'btn btn-secondary' : 'btn btn-ghost'}
            >
              {isEnglish ? 'All sectors' : 'Tüm sektörler'} ({SECTORS.length})
            </button>
            {SECTORS.map((s) => {
              const Icon = s.icon;
              const isActive = activeKey === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveKey(s.key)}
                  className={isActive ? 'btn btn-secondary' : 'btn btn-ghost'}
                >
                  <Icon size={14} />
                  {isEnglish ? s.name.en : s.name.tr}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Sectors */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(56px, 5vw + 16px, 96px) 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
          {visibleSectors.map((sector) => (
            <SectorCard
              key={sector.key}
              sector={sector}
              isEnglish={isEnglish}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: 'clamp(64px, 5vw + 16px, 104px) 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{isEnglish ? 'FAQ' : 'SIK SORULAN'}</span>
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
          <p style={{ marginTop: 16, maxWidth: 640, color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.6 }}>
            {isEnglish
              ? 'Fast answers on fit, integration, setup timelines and risk models.'
              : 'Uygunluk, entegrasyon, kurulum süresi ve risk modelleriyle ilgili kısa cevaplar.'}
          </p>

          <div style={{ marginTop: 32 }}>
            {FAQS.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                  padding: '20px 0',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.25rem)',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    lineHeight: 1.35,
                  }}
                >
                  <span>{isEnglish ? faq.q.en : faq.q.tr}</span>
                  <span style={{ color: 'var(--ember)', fontSize: 20 }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: 12,
                    paddingRight: 34,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--fg-2)',
                  }}
                >
                  {isEnglish ? faq.a.en : faq.a.tr}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sector not listed CTA */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(72px, 6vw + 24px, 128px) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              alignItems: 'center',
              padding: 'clamp(32px, 3vw + 16px, 56px)',
              background: 'var(--paper-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
            }}
          >
            <div>
              <span className="eyebrow">{isEnglish ? 'NOT LISTED?' : 'LİSTEDE YOK MU?'}</span>
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
                {isEnglish ? 'Your sector not listed?' : 'Sektörünüz listede yok mu?'}
              </h2>
              <p style={{ marginTop: 16, color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.6 }}>
                {isEnglish
                  ? 'We also serve e-commerce, legal, healthcare groups, tourism, education, coaches and content creators. The building blocks are the same — only the wiring changes.'
                  : 'E-ticaret, hukuk büroları, sağlık grupları, turizm, eğitim, koçlar ve içerik üreticilerine de hizmet veriyoruz. Yapı taşları aynı — sadece bağlantılar değişiyor.'}
              </p>
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(isEnglish
                  ? ['E-commerce', 'Legal', 'Tourism', 'Education', 'Coaching', 'Content']
                  : ['E-ticaret', 'Hukuk', 'Turizm', 'Eğitim', 'Koçluk', 'İçerik']
                ).map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.04em',
                      color: 'var(--fg-2)',
                      background: 'var(--paper)',
                      border: '1px solid var(--border)',
                      borderRadius: 999,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 28,
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
                  lineHeight: 1.2,
                  fontWeight: 500,
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {isEnglish ? 'Book a 15-min discovery' : '15 dakikalık keşif görüşmesi'}
              </h3>
              <p style={{ marginTop: 12, fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.55 }}>
                {isEnglish
                  ? 'Tell us your top bottleneck. We map it to the right workflow, show a similar one running, and you decide what to pilot first.'
                  : 'Bize en büyük darboğazınızı söyleyin. Size uygun akışı çıkarırız, benzerinden bir örnek gösteririz, ilk neyi pilot yapacağınıza siz karar verirsiniz.'}
              </p>
              <a
                href={createWhatsAppLink(
                  isEnglish
                    ? 'Hi, my sector isn\'t on the list — I\'d like a 15-minute discovery call.'
                    : 'Merhaba, sektörüm listede yok, 15 dakikalık keşif görüşmesi istiyorum.',
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={14} />
                {isEnglish ? 'WhatsApp us' : 'WhatsApp\'tan yazın'}
              </a>
              <p
                style={{
                  marginTop: 10,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--fg-3)',
                  textAlign: 'center',
                  letterSpacing: '0.08em',
                }}
              >
                {WHATSAPP_LABEL}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
