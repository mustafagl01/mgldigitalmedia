import type { PackageTierKey } from '../../config/pricing';

/* Otomasyon fiyat sayfası metinleri. Fiyat rakamı BURADA YOK — pricing.ts'den okunur.
   Konsey 2026-10-19 (4-6. tur, oybirliği): paketler işin karmaşıklığına göre ayrılır, şirket
   büyüklüğüne göre değil. Ziyaretçi kendini kullandığı araçlara göre seçer. Metin tek bir sektöre
   veya tek bir işe daraltılmaz. Karar: b2b-otomasyon-satis/project_logs/konsey_2026-10-19_paketler_sayfasi/KARAR.md */

type L = { tr: string; en: string };
type LL = { tr: string[]; en: string[] };

export type AutomationTierContent = {
  key: PackageTierKey;
  tools: L;
  fits: L;
  included: LL;
  terms: L;
};

export const AUTOMATION_TIERS: AutomationTierContent[] = [
  {
    key: 'automation',
    tools: { tr: 'Excel, WhatsApp, e-posta, takvim', en: 'Excel, WhatsApp, email, calendar' },
    fits: {
      tr: 'Listeden tek bir hazır sistem seçersiniz; kapsamı sabit, hızlı kurulur. Küçük işletmeler için.',
      en: 'Pick one ready-made system from the list; fixed scope, quick to set up. Built for small businesses.',
    },
    included: {
      tr: [
        'Aşağıdaki listeden 1 hazır otomasyon',
        '1 kaynak, 1 mesaj kanalı',
        'Ayda 500 işleme kadar',
        'Barındırma, izleme ve hata uyarısı',
        'Yazılı destek (e-posta / WhatsApp mesajı)',
      ],
      en: [
        '1 ready-made automation from the list below',
        '1 source, 1 messaging channel',
        'Up to 500 tasks a month',
        'Hosting, monitoring and failure alerts',
        'Written support (email / WhatsApp message)',
      ],
    },
    terms: {
      tr: 'Önce canlı demo. Kurulumdan sonraki 14 gün içinde memnun kalmazsanız kurulum ücreti iade edilir ve abonelik başlamadan sona erer. Devam ederseniz en az 3 ay.',
      en: 'Live demo first. If you are not happy within 14 days of setup, the setup fee is refunded and the subscription ends before it starts. If you continue, minimum 3 months.',
    },
  },
  {
    key: 'automation-connected',
    tools: { tr: 'CRM, muhasebe ve bulut programları', en: 'CRM, accounting and cloud apps' },
    fits: {
      tr: 'Birkaç işin birbirine bağlandığı akışlar: talep → CRM → teklif → hatırlatma gibi.',
      en: 'Several tasks connected into one flow: enquiry → CRM → quote → reminder and similar.',
    },
    included: {
      tr: [
        '2-3 iş akışı, size göre kurulur',
        'Standart CRM ve bulut program bağlantıları',
        'Ayda 1.500 işleme kadar',
        'Onay adımları ve basit raporlama',
        'Öncelikli destek',
      ],
      en: [
        '2-3 workflows, built around you',
        'Standard CRM and cloud app connections',
        'Up to 1,500 tasks a month',
        'Approval steps and simple reporting',
        'Priority support',
      ],
    },
    terms: {
      tr: '14 gün ücretsiz deneme: kendi verinizle tek akış kurulur, beğenirseniz devam. En az 6 ay.',
      en: '14-day free trial: one workflow built on your own data; continue only if you like it. Minimum 6 months.',
    },
  },
  {
    key: 'automation-complex',
    tools: { tr: 'ERP, belge okuma (PDF, teknik doküman), çok dil', en: 'ERP, document reading (PDF, technical files), multiple languages' },
    fits: {
      tr: 'Şirketin ana süreci uçtan uca: gelen teklif talepleri, siparişler, belgeler.',
      en: 'A core process end to end: incoming quote requests, orders, documents.',
    },
    included: {
      tr: [
        'Ana süreciniz uçtan uca',
        'ERP veya özel sistem entegrasyonu',
        'PDF ve eklerden bilgi okuma, çok dilli belgeler',
        'Ayda 100 karmaşık talep dahil',
        'Aylık birlikte gözden geçirme',
      ],
      en: [
        'Your core process end to end',
        'ERP or custom system integration',
        'Reading information from PDFs and attachments, multilingual documents',
        '100 complex requests a month included',
        'Monthly review together',
      ],
    },
    terms: {
      tr: '14 gün ücretsiz deneme tek belge türü veya tek süreçle yapılır. En az 12 ay.',
      en: '14-day free trial on one document type or one process. Minimum 12 months.',
    },
  },
  {
    key: 'automation-custom',
    tools: { tr: 'Birden fazla sistem ve departman', en: 'Several systems and departments' },
    fits: {
      tr: 'Birden fazla süreç ve departman, denetim gereksinimi veya hizmet seviyesi sözleşmesi.',
      en: 'Several processes and departments, audit requirements or a service level agreement.',
    },
    included: {
      tr: ['Kapsamlı paketteki her şey', 'Birden fazla süreç ve departman', 'Yetki, kayıt ve denetim gereksinimleri', 'Hizmet seviyesi sözleşmesi (SLA)'],
      en: ['Everything in Complex', 'Several processes and departments', 'Permission, logging and audit requirements', 'Service level agreement (SLA)'],
    },
    terms: {
      tr: 'Keşif görüşmesinden sonra yazılı teklif. Yıllık sözleşme.',
      en: 'Written proposal after a discovery call. Annual contract.',
    },
  },
];

/** Hazır otomasyon kataloğu (konsey 6. tur): tek kaynak, sabit mesaj sayısı; fazlası = Bağlantılı. */
export const READY_CATALOG = {
  tr: [
    { title: 'Talep yakalama', desc: 'Formdan veya tek bir kanaldan gelen yeni talep tabloya / CRM’e işlenir, ekibinize anında WhatsApp bildirimi gider.' },
    { title: 'Randevu hatırlatma', desc: 'Takviminizdeki randevular için 24 saat ve 2 saat önce WhatsApp, SMS veya e-posta hatırlatması; onaylar tabloya yazılır.' },
    { title: 'Ödeme takibi', desc: 'Fatura listenizi okur; vadesi geçenlere 1, 7 ve 14. günde nazik hatırlatma gönderir, sonra durur.' },
    { title: 'Evrak toplama', desc: 'Müşteriye tek bir yükleme linki gider; evraklar gelene kadar en fazla 3 hatırlatma yapılır, dosyalar tek klasörde toplanır.' },
    { title: 'Yorum isteme', desc: 'İş veya ziyaret tamamlanınca müşteriye Google yorum linki ve bir hatırlatma gönderilir.' },
  ],
  en: [
    { title: 'Lead capture', desc: 'A new enquiry from a form or one channel goes into your sheet / CRM and your team gets an instant WhatsApp alert.' },
    { title: 'Appointment reminders', desc: 'Reminders 24 hours and 2 hours before each booking by WhatsApp, SMS or email; confirmations logged to a sheet.' },
    { title: 'Payment chaser', desc: 'Reads your invoice list and sends polite reminders on days 1, 7 and 14 past due, then stops.' },
    { title: 'Document collection', desc: 'The client gets one upload link and up to 3 reminders until the files arrive in one folder.' },
    { title: 'Review requests', desc: 'When a job or visit is done, the customer gets your Google review link plus one reminder.' },
  ],
};

/** Sektörlerden örnek işler — mevcut sorun sayfalarına bağlanır. */
export const EXAMPLES = {
  tr: [
    { title: 'Teklif ve sipariş', who: 'Üretim, toptan, distribütör', desc: 'Gelen talep listesini ürün ve fiyat listenizle eşler, onayınıza taslak teklif hazırlar.', href: '/ureticiler' },
    { title: 'Randevu hatırlatma', who: 'Klinik, salon, servis', desc: 'Randevuyu WhatsApp, SMS veya e-postayla hatırlatır; iptal ve değişikliği size bildirir.', href: '/otomasyon/randevu-hatirlatma' },
    { title: 'Tahsilat takibi', who: 'Her sektör', desc: 'Vadesi geçen faturaları Excel veya muhasebe programından okur, nazik hatırlatma gönderir.', href: '/otomasyon/odeme-takibi' },
    { title: 'Evrak toplama', who: 'Muhasebe, hukuk, emlak', desc: 'Müşteriye eksik evrak listesini gönderir, geleni kaydeder, eksik kalanı takip eder.', href: '/otomasyon/evrak-toplama' },
    { title: 'Excel’den e-posta ve WhatsApp', who: 'Her sektör', desc: 'Tablonuzdaki satırlardan otomatik mesaj, görev ve bildirim üretir.', href: '/sorunlar/excelden-otomatik-mail-whatsapp' },
    { title: 'Raporlama', who: 'Her ölçek', desc: 'Farklı dosya ve sistemlerdeki veriyi toplayıp günlük ya da haftalık özet hazırlar.', href: '/iletisim' },
  ],
  en: [
    { title: 'Quotes and orders', who: 'Manufacturing, wholesale, distribution', desc: 'Matches incoming request lists to your products and prices and prepares a draft quote for approval.', href: '/ureticiler' },
    { title: 'Appointment reminders', who: 'Clinics, salons, service businesses', desc: 'Reminds by WhatsApp, SMS or email and tells you about cancellations and changes.', href: '/otomasyon/randevu-hatirlatma' },
    { title: 'Payment follow-up', who: 'Any sector', desc: 'Reads overdue invoices from Excel or your accounting software and sends polite reminders.', href: '/otomasyon/odeme-takibi' },
    { title: 'Document collection', who: 'Accounting, legal, property', desc: 'Sends the client their missing-document list, logs what arrives and chases the rest.', href: '/otomasyon/evrak-toplama' },
    { title: 'Email and WhatsApp from Excel', who: 'Any sector', desc: 'Turns spreadsheet rows into automatic messages, tasks and notifications.', href: '/sorunlar/excelden-otomatik-mail-whatsapp' },
    { title: 'Reporting', who: 'Any size', desc: 'Pulls data from different files and systems into a daily or weekly summary.', href: '/iletisim' },
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
    'Hazır otomasyon: önce canlı demo görürsünüz. Kurulumdan sonraki 14 gün içinde memnun kalmazsanız kurulum ücreti iade edilir ve abonelik başlamadan sona erer.',
    'Bağlantılı: kendi verinizle tek bir akış 14 gün ücretsiz kurulur. Beğenirseniz kurulum ücretiyle devam edilir.',
    'Kapsamlı: önce kısa bir keşif görüşmesi ve başarı ölçütü; 14 günlük ücretsiz deneme tek belge türü veya tek süreçle yapılır.',
    'Ücretli plana otomatik geçiş yok. Devam etmezseniz deneme için bizdeki kopyalar silinir; kendi hesaplarınızdaki veriler sizde kalır.',
    'Asgari süre sistem canlıya alındığı gün başlar; deneme süresi sayılmaz.',
  ],
  en: [
    'Ready-made: you see a live demo first. If you are not happy within 14 days of setup, the setup fee is refunded and the subscription ends before it starts.',
    'Connected: one workflow is built on your own data, free for 14 days. If you like it, you continue with the setup fee.',
    'Complex: a short discovery call and agreed success criteria first; the free 14-day trial covers one document type or one process.',
    'No automatic switch to a paid plan. If you stop, the trial copies we hold are deleted; data in your own accounts stays with you.',
    'The minimum term starts on go-live; the trial period does not count.',
  ],
};

export const SECURITY = {
  tr: [
    'Sistem fiyat veya karar vermez; önemli her adım sizin onayınızdan geçer.',
    'Müşteriye giden cevaplar onayınızı bekler; hatırlatma gibi sabit mesajlar, metnini onayladıktan sonra otomatik gider.',
    'MGL verilerinizi model eğitimi için kullanmaz; kullanılan sağlayıcılar ve ayarları teklifte yazılır.',
    'İsterseniz gizlilik sözleşmesi (NDA) imzalarız; KVKK ve GDPR koşulları teklifte yazılıdır.',
    'Teknik olarak uygunsa sistem sizin hesaplarınızda veya sunucunuzda kurulur.',
  ],
  en: [
    'The system does not set prices or make decisions; every important step is approved by you.',
    'Replies to customers wait for your approval; fixed messages such as reminders go automatically once you approve the wording.',
    'MGL does not use your data to train models; the providers used and their settings are listed in the proposal.',
    'We sign an NDA on request; GDPR and KVKK terms are written into the proposal.',
    'Where technically suitable, the system runs in your own accounts or on your own server.',
  ],
};

export const FAQS = {
  tr: [
    { question: 'Hangi paket bana uygun?', answer: 'Şirketinizin büyüklüğüne değil, kullandığınız araçlara bakın. Excel, WhatsApp ve takvimle çalışıyorsanız Hazır otomasyon; CRM veya muhasebe programı bağlanacaksa Bağlantılı; ERP, belge okuma veya çok dilli iş varsa Kapsamlı.' },
    { question: 'Küçük bir işletmeyiz, bize uygun mu?', answer: 'Evet. Hazır otomasyonlar küçük işletmeler için tasarlandı: listeden birini seçersiniz, sabit fiyatla kurulur. İhtiyaç büyüdükçe üst pakete geçebilirsiniz.' },
    { question: 'Listede olmayan bir iş istersem?', answer: 'Hazır listenin dışındaki veya birden fazla işi birbirine bağlayan her şey Bağlantılı pakete girer. İşinizi anlatın, hangi pakete girdiğini dürüstçe söyleyelim.' },
    { question: '"İşlem" neyi kapsar?', answer: 'Sistemin baştan sona yürüttüğü bir iş: bir hatırlatma, bir talep, bir sipariş veya bir belge. Aynı iş için yapılan yazışmalar ayrıca sayılmaz.' },
    { question: 'Kullandığımız programı değiştirmemiz gerekir mi?', answer: 'Genellikle hayır. Önce kullandığınız araçların bağlantı imkânına bakarız; nasıl bağlanacağı ya da gereken alternatif yöntem yazılı kapsamda belirtilir.' },
    { question: 'Değişiklik istersem ne olur?', answer: 'Kapsam içindeki küçük düzeltmeler aylık ücrete dahildir. Yeni akış veya kapsam dışı değişiklikler önceden yazılı fiyatla yapılır.' },
  ],
  en: [
    { question: 'Which plan is right for me?', answer: 'Look at the tools you use, not the size of your company. Excel, WhatsApp and a calendar: Ready-made. A CRM or accounting software to connect: Connected. ERP, document reading or multilingual work: Complex.' },
    { question: 'We are a small business. Is this for us?', answer: 'Yes. Ready-made automations are designed for small businesses: pick one from the list and it is set up at a fixed price. You can move up as your needs grow.' },
    { question: 'What if I need something that is not on the list?', answer: 'Anything outside the ready-made list, or anything that connects several tasks, falls under Connected. Describe it and we will tell you honestly which plan it fits.' },
    { question: 'What counts as a "task"?', answer: 'One piece of work the system handles end to end: a reminder, an enquiry, an order or a document. Follow-up messages on the same item are not counted again.' },
    { question: 'Do we have to change our software?', answer: 'Usually not. We first check how your current tools can connect; the method, or any workaround needed, is written into the scope.' },
    { question: 'What if I want changes later?', answer: 'Small fixes within scope are included in the monthly fee. New workflows or out-of-scope changes are done at a price agreed in writing first.' },
  ],
};
