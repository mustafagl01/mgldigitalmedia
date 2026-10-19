import type { PackageTierKey } from '../../config/pricing';

/* Otomasyon fiyat sayfası metinleri. Fiyat rakamı BURADA YOK — pricing.ts'den okunur.
   2026-10-19 kullanıcı düzeltmesi: otomasyon her sektör ve her ölçek (küçük esnaf dahil) içindir;
   metin tek bir sektöre (üretici/distribütör) veya tek bir işe (teklif) daraltılmaz. */

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
      tr: 'Küçük işletmeler ve tek bir iş için: randevu hatırlatma, tahsilat takibi, siparişlerin tabloya işlenmesi gibi.',
      en: 'For small businesses and one task: appointment reminders, payment follow-up, orders into a spreadsheet and similar.',
    },
    included: {
      tr: [
        '1 iş akışı',
        'Ayda 50 işleme kadar',
        'E-posta, WhatsApp, form veya Excel bağlantısı',
        'Otomatik hatırlatma ve bildirimler',
        'Excel / Google Sheets çıktısı',
        'Barındırma, izleme ve hata uyarısı',
        'E-posta ve WhatsApp desteği',
      ],
      en: [
        '1 workflow',
        'Up to 50 tasks a month',
        'Email, WhatsApp, form or Excel connection',
        'Automatic reminders and notifications',
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
      tr: 'Şirketinizin ana sürecini uçtan uca: teklif, sipariş, evrak veya müşteri takibi.',
      en: 'Your company’s core process end to end: quotes, orders, documents or customer follow-up.',
    },
    included: {
      tr: [
        'Ana süreciniz uçtan uca',
        'Ayda 100 işlem dahil',
        'PDF ve Excel eklerini okuma',
        'Eksik bilgi işaretleme ve müşteriye soru taslağı',
        'Ürün, stok, fiyat listesi veya CRM ile eşleme',
        '1 ERP, CRM veya Excel entegrasyonu',
        'Aylık birlikte gözden geçirme',
      ],
      en: [
        'Your core process end to end',
        '100 tasks a month included',
        'Reading PDF and Excel attachments',
        'Missing information flagged and a question to the customer drafted',
        'Matching against products, stock, price list or CRM',
        '1 ERP, CRM or Excel integration',
        'Monthly review together',
      ],
    },
    note: {
      tr: 'En az 3 ay. 100 işlemin üstü için işlem başı ücret teklifte yazılıdır.',
      en: 'Minimum 3 months. Tasks above 100 are billed per task, as written in the proposal.',
    },
  },
  {
    key: 'automation-custom',
    label: { tr: 'Özel', en: 'Custom' },
    fits: {
      tr: 'Birden fazla süreç, çok dilli belgeler, firmaya özel kurallar veya yüksek hacim.',
      en: 'Several processes, multilingual documents, company-specific rules or high volume.',
    },
    included: {
      tr: [
        'İşletme paketindeki her şey',
        'Birden fazla süreç ve departman',
        'Çok dilli belge işleme',
        'Firmaya özel kontrol kuralları',
        'Derin ERP / API entegrasyonu',
        'Yüksek hacim ve hizmet seviyesi (SLA)',
      ],
      en: [
        'Everything in Business',
        'Several processes and departments',
        'Multilingual document processing',
        'Company-specific checking rules',
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

/** Sektörlerden örnek işler — mevcut sorun sayfalarına bağlanır. */
export const EXAMPLES = {
  tr: [
    { title: 'Teklif ve sipariş', who: 'Üretim, toptan, distribütör', desc: 'Gelen talep listesini ürün ve fiyat listenizle eşler, onayınıza taslak teklif hazırlar.', href: '/surec-otomasyonu' },
    { title: 'Randevu hatırlatma', who: 'Klinik, salon, servis', desc: 'Randevuyu WhatsApp, SMS veya e-postayla hatırlatır; iptal ve değişikliği size bildirir.', href: '/sorunlar/randevu-hatirlatma-sistemi' },
    { title: 'Tahsilat takibi', who: 'Her sektör', desc: 'Vadesi geçen faturaları Excel veya muhasebe programından okur, nazik hatırlatma gönderir.', href: '/sorunlar/tahsilat-otomasyonu' },
    { title: 'Evrak toplama', who: 'Muhasebe, hukuk, emlak', desc: 'Müşteriye eksik evrak listesini gönderir, geleni kaydeder, eksik kalanı takip eder.', href: '/sorunlar/evrak-toplama-ve-takip' },
    { title: 'Excel’den mail ve WhatsApp', who: 'Her sektör', desc: 'Tablonuzdaki satırlardan otomatik mesaj, görev ve bildirim üretir.', href: '/sorunlar/excelden-otomatik-mail-whatsapp' },
    { title: 'Raporlama', who: 'Her ölçek', desc: 'Farklı dosya ve sistemlerdeki veriyi toplayıp günlük ya da haftalık özet hazırlar.', href: '/n8n-otomasyon' },
  ],
  en: [
    { title: 'Quotes and orders', who: 'Manufacturing, wholesale, distribution', desc: 'Matches incoming request lists to your products and prices and prepares a draft quote for approval.', href: '/surec-otomasyonu' },
    { title: 'Appointment reminders', who: 'Clinics, salons, service businesses', desc: 'Reminds by WhatsApp, SMS or email and tells you about cancellations and changes.', href: '/sorunlar/randevu-hatirlatma-sistemi' },
    { title: 'Payment follow-up', who: 'Any sector', desc: 'Reads overdue invoices from Excel or your accounting software and sends polite reminders.', href: '/sorunlar/tahsilat-otomasyonu' },
    { title: 'Document collection', who: 'Accounting, legal, property', desc: 'Sends the client their missing-document list, logs what arrives and chases the rest.', href: '/sorunlar/evrak-toplama-ve-takip' },
    { title: 'Email and WhatsApp from Excel', who: 'Any sector', desc: 'Turns spreadsheet rows into automatic messages, tasks and notifications.', href: '/sorunlar/excelden-otomatik-mail-whatsapp' },
    { title: 'Reporting', who: 'Any size', desc: 'Pulls data from different files and systems into a daily or weekly summary.', href: '/n8n-otomasyon' },
  ],
};

export const STEPS = {
  tr: [
    { title: 'Alır', desc: 'İş nereden geliyorsa oradan: e-posta, WhatsApp, form, Excel veya programınız.' },
    { title: 'Düzenler', desc: 'Gerekli bilgiyi çıkarır, tablonuza veya sisteminize uygun hale getirir.' },
    { title: 'Kontrol eder', desc: 'Eksik veya hatalı olanı işaretler; gerekirse soru ya da hatırlatma taslağı hazırlar.' },
    { title: 'Aktarır', desc: 'Onayınızla Excel, CRM, ERP veya takviminize işler, ilgili kişiye haber verir.' },
  ],
  en: [
    { title: 'Receives', desc: 'Wherever the work arrives: email, WhatsApp, a form, Excel or your software.' },
    { title: 'Organises', desc: 'Extracts the information needed and shapes it for your spreadsheet or system.' },
    { title: 'Checks', desc: 'Flags anything missing or wrong and drafts a question or reminder when needed.' },
    { title: 'Hands over', desc: 'With your approval it updates Excel, your CRM, ERP or calendar and notifies the right person.' },
  ],
};

export const TRIAL = {
  tr: [
    'Siz: otomatikleştirmek istediğiniz işten 10-20 geçmiş örnek (isimler gizlenebilir) ve bugün nasıl yaptığınız.',
    '3. gün: ilk akış geçmiş örneklerinizle çalışır, çıktıyı birlikte inceleriz.',
    '7. gün: gerçek işlerde ekibinizin yanında paralel çalışır.',
    '14. gün: ne kadarı doğru çalıştı, ne kadar vakit kazanıldı birlikte ölçeriz. Devam kararı sizin.',
    'Ücretli plana otomatik geçiş yok. Devam etmezseniz verileriniz silinir.',
  ],
  en: [
    'You: 10-20 past examples of the task (names can be removed) and how you do it today.',
    'Day 3: the first workflow runs on your past examples and we review the output together.',
    'Day 7: it runs in parallel next to your team on real work.',
    'Day 14: we measure together how much worked correctly and how much time was saved. You decide.',
    'No automatic switch to a paid plan. If you stop, your data is deleted.',
  ],
};

export const SECURITY = {
  tr: [
    'Sistem fiyat veya karar vermez; önemli her adım sizin onayınızdan geçer.',
    'Onayınız olmadan müşterinize hiçbir şey gönderilmez.',
    'Verileriniz yapay zekâ modellerini eğitmek için kullanılmaz.',
    'İsterseniz gizlilik sözleşmesi (NDA) imzalarız; KVKK ve GDPR koşulları teklifte yazılıdır.',
    'Gerekirse sistem sizin hesaplarınızda veya sunucunuzda kurulur.',
  ],
  en: [
    'The system does not set prices or make decisions; every important step is approved by you.',
    'Nothing is sent to your customers without your approval.',
    'Your data is not used to train AI models.',
    'We sign an NDA on request; GDPR and KVKK terms are written into the proposal.',
    'If needed, the system runs in your own accounts or on your own server.',
  ],
};

export const FAQS = {
  tr: [
    { question: 'Küçük bir işletmeyiz, bize uygun mu?', answer: 'Evet. Başlangıç paketi tek bir iş için kurulur; randevu hatırlatma veya tahsilat takibi gibi. İhtiyaç büyüdükçe İşletme paketine geçebilirsiniz.' },
    { question: 'Deneme gerçekten ücretsiz mi?', answer: 'Evet. Tek iş için 14 gün ücretsiz, kart veya taahhüt yok. Aynı anda en fazla 2 yeni deneme alıyoruz; bu yüzden başlangıç tarihini birlikte belirliyoruz.' },
    { question: 'Kullandığımız programı değiştirmemiz gerekir mi?', answer: 'Hayır. Sistem kullandığınız e-posta, WhatsApp, Excel, CRM veya ERP ile çalışacak şekilde kurulur. Bağlantı yöntemi denemede netleşir.' },
    { question: '"İşlem" neyi kapsar?', answer: 'Sistemin baştan sona yürüttüğü bir iş: bir teklif talebi, bir sipariş, bir belge ya da bir hatırlatma. Aynı iş için yapılan yazışmalar ayrıca sayılmaz.' },
    { question: 'Sözleşme süresi var mı?', answer: 'Başlangıç paketi aylıktır. İşletme paketi en az 3 aydır; sonrasında aylık devam eder. Kurulum ücreti tek seferliktir.' },
    { question: 'Fiyatlar neden "…den başlayan"?', answer: 'Kurulum, işin kapsamına ve bağlanacak sistemlere göre değişir. Kesin rakam denemeden sonra yazılı teklifte yer alır ve 12 ay sabit kalır.' },
  ],
  en: [
    { question: 'We are a small business. Is this for us?', answer: 'Yes. The Starter plan is built for a single task, such as appointment reminders or payment follow-up. You can move to Business as your needs grow.' },
    { question: 'Is the trial really free?', answer: 'Yes. One task, free for 14 days, no card and no commitment. We take on at most 2 new trials at a time, so we agree the start date together.' },
    { question: 'Do we have to change our software?', answer: 'No. The system works with the email, WhatsApp, Excel, CRM or ERP you already use. The connection method is confirmed during the trial.' },
    { question: 'What counts as a "task"?', answer: 'One piece of work the system handles end to end: a quote request, an order, a document or a reminder. Follow-up messages on the same item are not counted again.' },
    { question: 'Is there a contract term?', answer: 'Starter is monthly. Business has a 3-month minimum and then continues monthly. Setup is a one-off fee.' },
    { question: 'Why are prices shown as "from"?', answer: 'Setup depends on the scope and the systems to connect. The exact figure is written into the proposal after the trial and is fixed for 12 months.' },
  ],
};
