import type { PackageTierKey } from '../../config/pricing';

/* B2B otomasyon sayfası metinleri. Fiyat rakamı BURADA YOK — pricing.ts'den okunur. */

type L = { tr: string; en: string };
type LL = { tr: string[]; en: string[] };

export type AutomationTierContent = {
  key: PackageTierKey;
  label: L;
  fits: L;
  included: LL;
  note?: L;
};

export const AUTOMATION_TIERS: AutomationTierContent[] = [
  {
    key: 'automation',
    label: { tr: 'Başlangıç', en: 'Starter' },
    fits: {
      tr: 'Tek ve net bir iş: ör. sipariş maillerinin tabloya işlenmesi.',
      en: 'One clear task, e.g. turning order emails into a spreadsheet.',
    },
    included: {
      tr: [
        '1 iş akışı',
        'Ayda 50 belgeye / talebe kadar',
        'Gelen mail ve eklerden alanların ayıklanması',
        'Eksik bilgi işaretleme',
        'Excel / Google Sheets çıktısı',
        'Barındırma, izleme ve hata uyarısı',
        'E-posta ve WhatsApp desteği',
      ],
      en: [
        '1 workflow',
        'Up to 50 documents / requests a month',
        'Fields extracted from emails and attachments',
        'Missing information flagged',
        'Excel / Google Sheets output',
        'Hosting, monitoring and failure alerts',
        'Email and WhatsApp support',
      ],
    },
  },
  {
    key: 'automation-business',
    label: { tr: 'İşletme', en: 'Business' },
    fits: {
      tr: 'Üretici ve distribütörlerin ana teklif / sipariş süreci.',
      en: 'The core quote / order process of manufacturers and distributors.',
    },
    included: {
      tr: [
        'Ana teklif veya sipariş süreciniz uçtan uca',
        'Ayda 100 talep dahil',
        'PDF ve Excel ekleri',
        'Müşteriye netleştirme sorusu taslağı',
        'Ürün kodları, stok ve fiyat listesiyle eşleme',
        '1 ERP veya Excel entegrasyonu',
        'Aylık birlikte gözden geçirme',
      ],
      en: [
        'Your core quote or order process end to end',
        '100 requests a month included',
        'PDF and Excel attachments',
        'Draft clarification questions for the customer',
        'Matching against product codes, stock and price list',
        '1 ERP or Excel integration',
        'Monthly review together',
      ],
    },
    note: {
      tr: 'En az 3 ay. 100 talebin üstü için talep başı ücret teklifte yazılıdır.',
      en: 'Minimum 3 months. Requests above 100 are billed per request, as written in the proposal.',
    },
  },
  {
    key: 'automation-custom',
    label: { tr: 'Özel', en: 'Custom' },
    fits: {
      tr: 'Çok dilli belgeler, firmaya özel kurallar veya birden fazla süreç.',
      en: 'Multilingual documents, company-specific rules or several processes.',
    },
    included: {
      tr: [
        'İşletme paketindeki her şey',
        'Çok dilli belge işleme (TR / EN / DE ...)',
        'Firmaya özel teknik kontrol kuralları',
        'Birden fazla süreç ve departman',
        'Derin ERP / API entegrasyonu',
        'Yüksek hacim ve hizmet seviyesi (SLA)',
      ],
      en: [
        'Everything in Business',
        'Multilingual document processing (EN / DE / TR ...)',
        'Company-specific technical rules',
        'Several processes and departments',
        'Deep ERP / API integration',
        'High volume and a service level agreement (SLA)',
      ],
    },
    note: {
      tr: 'Fiyat, 14 günlük deneme sonunda ölçülen hacme ve kapsama göre yazılı verilir.',
      en: 'Priced in writing after the 14-day trial, based on the measured volume and scope.',
    },
  },
];

export const STEPS = {
  tr: [
    { title: 'Alır', desc: 'Teklif ve sipariş mailleri, ekleriyle birlikte tek bir kutuda toplanır.' },
    { title: 'Ayıklar', desc: 'Ölçü, adet, malzeme, standart, termin gibi alanlar kontrol listesine dökülür.' },
    { title: 'Kontrol eder, sorar', desc: 'Eksik veya çelişkili alan işaretlenir; müşteriye soru taslağı hazırlanır.' },
    { title: 'Aktarır', desc: 'Ekibiniz onaylar; veri Excel, ERP veya teklif şablonunuza geçer.' },
  ],
  en: [
    { title: 'Receives', desc: 'Quote and order emails land in one inbox together with their attachments.' },
    { title: 'Extracts', desc: 'Dimensions, quantities, materials, standards and deadlines go into a checklist.' },
    { title: 'Checks and asks', desc: 'Missing or conflicting fields are flagged and a question to the customer is drafted.' },
    { title: 'Hands over', desc: 'Your team approves; the data moves into Excel, your ERP or your quote template.' },
  ],
};

export const TRIAL = {
  tr: [
    'Siz: geçmişten 10-20 talep (müşteri adı gizlenebilir) ve kullandığınız kontrol listesi.',
    '3. gün: ilk akış geçmiş taleplerinizle çalışır, çıktıyı birlikte inceleriz.',
    '7. gün: yeni gelen taleplerde ekibinizin yanında paralel çalışır.',
    '14. gün: kaç alan doğru çıktı, ne kadar vakit kazanıldı birlikte ölçeriz. Devam kararı sizin.',
    'Ücretli plana otomatik geçiş yok. Devam etmezseniz verileriniz silinir.',
  ],
  en: [
    'You: 10-20 past requests (customer names can be removed) and the checklist you use today.',
    'Day 3: the first workflow runs on your past requests and we review the output together.',
    'Day 7: it runs in parallel next to your team on new requests.',
    'Day 14: we measure together how many fields were right and how much time was saved. You decide.',
    'No automatic switch to a paid plan. If you stop, your data is deleted.',
  ],
};

export const SECURITY = {
  tr: [
    'Sistem fiyat ve teknik karar vermez; her çıktı ekibinizin onayından geçer.',
    'Onayınız olmadan müşterinize hiçbir şey gönderilmez.',
    'Verileriniz yapay zekâ modellerini eğitmek için kullanılmaz.',
    'İsterseniz gizlilik sözleşmesi (NDA) imzalarız; KVKK ve GDPR koşulları teklifte yazılıdır.',
    'Gerekirse sistem sizin hesaplarınızda veya sunucunuzda kurulur.',
  ],
  en: [
    'The system does not set prices or make technical decisions; every output is approved by your team.',
    'Nothing is sent to your customers without your approval.',
    'Your data is not used to train AI models.',
    'We sign an NDA on request; GDPR and KVKK terms are written into the proposal.',
    'If needed, the system runs in your own accounts or on your own server.',
  ],
};

export const FAQS = {
  tr: [
    { question: 'Deneme gerçekten ücretsiz mi?', answer: 'Evet. Tek süreç için 14 gün ücretsiz, kart veya taahhüt yok. Aynı anda en fazla 2 yeni deneme alıyoruz; bu yüzden başlangıç tarihini birlikte belirliyoruz.' },
    { question: 'ERP veya Excel düzenimizi değiştirmemiz gerekir mi?', answer: 'Hayır. Sistem kullandığınız e-posta, Excel ve ERP ile çalışacak şekilde kurulur. Logo, Netsis, SAP gibi sistemlerde aktarım yöntemi denemede netleşir.' },
    { question: '"Talep" neyi kapsar?', answer: 'Bir müşteriden gelen bir teklif veya sipariş isteği, ekleriyle birlikte tek talep sayılır. Aynı talep için yapılan yazışmalar ayrıca sayılmaz.' },
    { question: 'Sözleşme süresi var mı?', answer: 'Başlangıç paketi aylıktır. İşletme paketi en az 3 aydır; sonrasında aylık devam eder. Kurulum ücreti tek seferliktir.' },
    { question: 'Fiyatlar neden "…den başlayan"?', answer: 'Kurulum, belge türü ve entegrasyona göre değişir. Kesin rakam denemeden sonra yazılı teklifte yer alır ve 12 ay sabit kalır.' },
  ],
  en: [
    { question: 'Is the trial really free?', answer: 'Yes. One process, free for 14 days, no card and no commitment. We take on at most 2 new trials at a time, so we agree the start date together.' },
    { question: 'Do we have to change our ERP or Excel setup?', answer: 'No. The system works with the email, Excel and ERP you already use. For systems like SAP, Sage or Xero the handover method is confirmed during the trial.' },
    { question: 'What counts as a "request"?', answer: 'One quote or order request from a customer, including its attachments, counts as one request. Follow-up emails on the same request are not counted again.' },
    { question: 'Is there a contract term?', answer: 'Starter is monthly. Business has a 3-month minimum and then continues monthly. Setup is a one-off fee.' },
    { question: 'Why are prices shown as "from"?', answer: 'Setup depends on document types and integrations. The exact figure is written into the proposal after the trial and is fixed for 12 months.' },
  ],
};
