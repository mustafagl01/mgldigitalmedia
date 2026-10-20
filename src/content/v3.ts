/* v3 içerik tek kaynağı (konsey 2026-10-19). Fiyat rakamı burada YOK — src/config/pricing.ts.
   Kural: uydurma sayı/müşteri/yorum yok. İşler listesi = özel alan adıyla yayında olan gerçek siteler
   (2026-10-19 Vercel + Cloudflare taramasıyla doğrulandı). */

export type L = { tr: string; en: string };

/* ── Yapılan işler ─────────────────────────────────────────── */
export type WorkItem = { slug: string; name: string; url: string; place: L; kind: L; note?: L };

export const WORK: WorkItem[] = [
  { slug: 'elms-coffee-shop', name: 'Elms Coffee Shop', url: 'https://elmscoffeeshop.com', place: { tr: 'Battersea, Londra', en: 'Battersea, London' }, kind: { tr: 'Kafe · online sipariş', en: 'Café · online ordering' }, note: { tr: 'Sipariş mutfaktaki yazıcıdan çıkar, aynı anda bildirim gelir.', en: 'Orders print in the kitchen and trigger an instant alert.' } },
  { slug: 'erco-home-improvements', name: 'ERCO Home Improvements', url: 'https://www.ercohomeimprovements.co.uk', place: { tr: 'Londra', en: 'London' }, kind: { tr: 'İnşaat ve tadilat', en: 'Builders & renovation' } },
  { slug: 'ryhn-consultancy', name: 'Ryhn Consultancy', url: 'https://ryhnconsultancy.co.uk', place: { tr: 'Coventry', en: 'Coventry' }, kind: { tr: 'Finansal danışmanlık', en: 'Financial consultancy' } },
  { slug: 'selcem-mobile-chef', name: 'Selcem Mobile Chef', url: 'https://selcemmobilechef.co.uk', place: { tr: 'Southampton', en: 'Southampton' }, kind: { tr: 'Mobil catering', en: 'Mobile catering' } },
  { slug: 'little-lily-preschool', name: 'Little Lily Preschool', url: 'https://www.littlelilypreschool.com', place: { tr: 'Hackney, Londra', en: 'Hackney, London' }, kind: { tr: 'Anaokulu', en: 'Nursery' } },
  { slug: 'beyaz-zambak', name: 'Beyaz Zambak Anaokulu', url: 'https://kurttepebeyazzambakanaokulu.com', place: { tr: 'Kurttepe, Adana', en: 'Kurttepe, Adana' }, kind: { tr: 'Anaokulu', en: 'Nursery school' } },
  { slug: 'nightingale-cafe', name: 'Nightingale Cafe', url: 'https://nightingale-cafe.com', place: { tr: 'Edmonton, Londra', en: 'Edmonton, London' }, kind: { tr: 'Mahalle kafesi', en: 'Neighbourhood café' } },
  { slug: 'clean-blue-water', name: 'Clean Blue Water', url: 'https://cleanbluewater.uk', place: { tr: 'Londra', en: 'London' }, kind: { tr: 'Tesisat ve kombi', en: 'Plumbing & heating' } },
  { slug: 'real-quick-handyman', name: 'Real Quick Handyman', url: 'https://kamshandyman.co.uk', place: { tr: 'Kuzey Londra ve Hertfordshire', en: 'North London & Hertfordshire' }, kind: { tr: 'Tamir ve bakım', en: 'Handyman services' } },
  { slug: 'limkolin-london', name: 'Limkolin London Education', url: 'https://limkolinlondon.co.uk', place: { tr: 'Londra', en: 'London' }, kind: { tr: 'Türkçe eğitim', en: 'Turkish tuition' } },
  { slug: 'rhyl-ecc', name: 'Rhyl Education & Community Centre', url: 'https://rhylecc.org.uk', place: { tr: 'Rhyl, Galler', en: 'Rhyl, Wales' }, kind: { tr: 'Eğitim ve topluluk merkezi', en: 'Education & community centre' } },
  { slug: 'camlica-nehari', name: 'Çamlıca Nehari Merkezi', url: 'https://basarirotasi.org', place: { tr: 'Türkiye', en: 'Türkiye' }, kind: { tr: 'Eğitim merkezi', en: 'Education centre' } },
];

/** Reklam yönetimi müşterisi (ekran görüntüsü yok, metin kartı). */
export const ADS_CLIENTS = [{ name: 'Unique Building', place: { tr: 'Londra', en: 'London' }, kind: { tr: 'Meta reklam yönetimi · sürüyor', en: 'Meta ads management · ongoing' } }];

export const PROOF_UPDATED = { tr: '19 Ekim 2026', en: '19 October 2026' };

/* ── Hazır otomasyon kataloğu (konsey: 5 ürün) ─────────────── */
export type Catalog = {
  slug: string;
  title: L;
  short: L;
  who: L;
  problem: L;
  flow: { tr: string[]; en: string[] };
  output: { tr: string[]; en: string[] };
  limits: { tr: string[]; en: string[] };
  tools: L;
  faq: { tr: { q: string; a: string }[]; en: { q: string; a: string }[] };
  oldPath?: string;
};

export const CATALOG: Catalog[] = [
  {
    slug: 'talep-yakalama',
    title: { tr: 'Talep yakalama', en: 'Lead capture' },
    short: { tr: 'Formdan veya tek bir kanaldan gelen talep tabloya işlenir, ekibinize anında haber gider.', en: 'An enquiry from a form or one channel goes into your sheet and your team is alerted instantly.' },
    who: { tr: 'Tadilat, emlak, danışmanlık, servis işletmeleri', en: 'Builders, estate agents, consultants, service businesses' },
    problem: { tr: 'Talepler e-posta, form ve WhatsApp arasında dağılıyor; bazıları saatlerce görülmüyor, bazıları hiç dönülmeden kayboluyor. Geç dönülen ya da gözden kaçan talep, iş fırsatının kaybolması demek.', en: 'Enquiries scatter across email, forms and WhatsApp; some sit unseen for hours, some are never answered. A slow or missed reply can mean a lost job.' },
    flow: { tr: ['Web formu veya tek bir e-posta kutusu dinlenir.', 'Ad, telefon, istenen iş ve tarih ayıklanır.', 'Satır Google Sheets tablonuza eklenir (CRM bağlantısı Bağlantılı pakettedir).', 'Ekibinize WhatsApp bildirimi gider; isterseniz müşteriye "talebiniz alındı" cevabı taslağı hazırlanır, onayınızla gönderilir.'], en: ['A web form or one email inbox is watched.', 'Name, phone, requested job and date are extracted.', 'A row is added to your Google Sheet (a CRM connection is part of Connected).', 'Your team gets a WhatsApp alert; optionally an "enquiry received" reply is drafted and sent with your approval.'] },
    output: { tr: ['Tek tabloda tüm talepler', 'Her talep için anında bildirim', 'Cevapsız kalan talepler için ertesi gün hatırlatma'], en: ['Every enquiry in one sheet', 'An instant alert for each one', 'A next-day reminder for unanswered enquiries'] },
    limits: { tr: ['1 kaynak (web formu veya e-posta kutusu), 1 bildirim kanalı', 'Ayda 500 işleme kadar', 'Birden fazla kaynak veya CRM akışı Bağlantılı pakete girer'], en: ['1 source (form or inbox), 1 alert channel', 'Up to 500 tasks a month', 'Several sources or CRM workflows fall under Connected'] },
    tools: { tr: 'Web formu, Gmail/Outlook, Google Sheets, WhatsApp', en: 'Web form, Gmail/Outlook, Google Sheets, WhatsApp' },
    faq: { tr: [{ q: 'Müşteriye otomatik cevap gider mi?', a: 'Varsayılan olarak hayır. Cevap taslağı hazırlanır, siz onaylarsanız gider. İsterseniz sabit bir "talebiniz alındı" mesajını otomatik yapabiliriz.' }, { q: 'CRM’im yok, sorun olur mu?', a: 'Hayır. Google Sheets yeterli; ileride CRM’e geçerseniz akış oraya bağlanır.' }], en: [{ q: 'Does the customer get an automatic reply?', a: 'Not by default. A reply is drafted and sent when you approve it. A fixed "enquiry received" message can be automatic if you prefer.' }, { q: 'I have no CRM. Is that a problem?', a: 'No. Google Sheets is enough; if you move to a CRM later, the flow connects to it.' }] },
  },
  {
    slug: 'randevu-hatirlatma',
    title: { tr: 'Randevu hatırlatma', en: 'Appointment reminders' },
    short: { tr: 'Randevudan 24 ve 2 saat önce WhatsApp, SMS veya e-posta hatırlatması; onaylar tabloya yazılır.', en: 'Reminders 24 and 2 hours before each booking by WhatsApp, SMS or email; confirmations logged.' },
    who: { tr: 'Klinik, salon, servis, danışmanlık, eğitim', en: 'Clinics, salons, service businesses, consultants, tutors' },
    problem: { tr: 'Gelmeyen randevu boş geçen bir saat demek. Hatırlatmaları elle göndermek zaman alır ve yoğun günlerde kolayca atlanır.', en: 'A no-show is an empty hour. Sending reminders by hand takes time and is easily missed on busy days.' },
    flow: { tr: ['Takviminiz (Google Takvim veya randevu tablosu) okunur.', 'Her randevu için 24 saat ve 2 saat önce mesaj zamanlanır.', 'Müşteri "geliyorum" veya "iptal" der; cevap tabloya yazılır.', 'İptal olursa size bildirim gider; boşalan saati siz değerlendirirsiniz.'], en: ['Your calendar (Google Calendar or a booking sheet) is read.', 'A message is scheduled 24 hours and 2 hours before each booking.', 'The customer replies "coming" or "cancel"; the reply is logged.', 'Cancellations alert you so you can fill the slot.'] },
    output: { tr: ['Zamanında giden hatırlatmalar', 'Onay/iptal durumu tek tabloda', 'İptallerde anında bildirim'], en: ['Reminders sent on time', 'Confirmation / cancellation status in one sheet', 'Instant alerts on cancellations'] },
    limits: { tr: ['1 takvim, 1 mesaj kanalı', 'Randevu başına en fazla 2 hatırlatma', 'Ayda 500 işleme kadar'], en: ['1 calendar, 1 messaging channel', 'Up to 2 reminders per booking', 'Up to 500 tasks a month'] },
    tools: { tr: 'Google Takvim, Sheets, WhatsApp, SMS veya e-posta', en: 'Google Calendar, Sheets, WhatsApp, SMS or email' },
    faq: { tr: [{ q: 'Mesaj metnini kim yazıyor?', a: 'Birlikte yazıyoruz; işletmenizin diliyle. Değiştirmek isterseniz kapsam içinde güncelleriz.' }, { q: 'SMS ücreti dahil mi?', a: 'Hayır. SMS ve resmî WhatsApp kanal ücretleri kullanılırsa kendi hesabınızdan ödenir; e-posta ücretsizdir.' }], en: [{ q: 'Who writes the message?', a: 'We write it together, in your business’s voice. Changes are included within scope.' }, { q: 'Are SMS costs included?', a: 'No. SMS and official WhatsApp channel fees, if used, are paid from your own account; email is free.' }] },
    oldPath: '/sorunlar/randevu-hatirlatma-sistemi',
  },
  {
    slug: 'odeme-takibi',
    title: { tr: 'Ödeme takibi', en: 'Payment chaser' },
    short: { tr: 'Fatura listenizi okur; vadesi geçenlere 1, 7 ve 14. günde nazik hatırlatma gönderir, sonra durur.', en: 'Reads your invoice list and sends polite reminders on days 1, 7 and 14 past due, then stops.' },
    who: { tr: 'Her sektör: toptan, servis, danışmanlık, inşaat', en: 'Any sector: wholesale, services, consultancy, construction' },
    problem: { tr: 'Vadesi geçen faturayı hatırlatmak kimsenin sevmediği bir iş; ertelenir, alacak büyür. Unutulan bir hatırlatma ay sonunda nakit sıkıntısı olarak döner.', en: 'Chasing overdue invoices is a job nobody likes; it gets postponed and receivables grow. A forgotten reminder comes back as a cash-flow problem at month end.' },
    flow: { tr: ['Fatura listeniz (Excel, Sheets veya muhasebe programı dışa aktarımı) her sabah okunur.', 'Vadesi geçen faturalar ayıklanır.', 'Müşteriye 1, 7 ve 14. günde kibar bir hatırlatma hazırlanır; metnini siz onayladıktan sonra zamanında gider.', 'Ödeme işaretlenince akış durur; 14. günden sonra konu size bırakılır.'], en: ['Your invoice list (Excel, Sheets or an accounting export) is read every morning.', 'Overdue invoices are picked out.', 'A polite reminder is prepared for days 1, 7 and 14; they go on time once you have approved the wording.', 'Once marked paid the flow stops; after day 14 it is handed back to you.'] },
    output: { tr: ['Vadesi geçenlerin günlük listesi', 'Zamanında giden hatırlatmalar', 'Kimin ne zaman hatırlatıldığı kaydı'], en: ['A daily list of overdue invoices', 'Reminders sent on time', 'A log of who was reminded when'] },
    limits: { tr: ['1 fatura listesi, 1 kanal (e-posta veya WhatsApp)', 'En fazla 3 hatırlatma, sonra durur', 'Muhasebe programına canlı bağlantı Bağlantılı pakete girer'], en: ['1 invoice list, 1 channel (email or WhatsApp)', 'Up to 3 reminders, then it stops', 'A live accounting-software connection falls under Connected'] },
    tools: { tr: 'Excel/Sheets, e-posta veya WhatsApp', en: 'Excel/Sheets, email or WhatsApp' },
    faq: { tr: [{ q: 'Müşterimle aram bozulmaz mı?', a: 'Mesajlar kibar ve sizin dilinizle yazılır; metin sizin onayınızdan geçer. İstemediğiniz müşteriyi listeden çıkarabilirsiniz.' }, { q: 'Tahsilat yapıyor musunuz?', a: 'Hayır. Sadece hatırlatma yapılır; ödeme ve takip kararı sizde.' }], en: [{ q: 'Will it damage customer relationships?', a: 'Messages are polite and written in your voice; you approve the wording. You can exclude any customer.' }, { q: 'Do you collect the money?', a: 'No. Only reminders are sent; payment and escalation stay with you.' }] },
    oldPath: '/sorunlar/tahsilat-otomasyonu',
  },
  {
    slug: 'evrak-toplama',
    title: { tr: 'Evrak toplama', en: 'Document collection' },
    short: { tr: 'Müşteriye tek bir yükleme linki gider; evraklar gelene kadar en fazla 3 hatırlatma, dosyalar tek klasörde.', en: 'The client gets one upload link and up to 3 reminders until the files arrive in one folder.' },
    who: { tr: 'Muhasebe, hukuk, emlak, vize danışmanlığı, insan kaynakları', en: 'Accountants, lawyers, estate agents, visa advisers, HR' },
    problem: { tr: 'Eksik evrak için müşteriyi kovalamak günlerce süren mesajlaşma demek. Dosyalar e-posta, WhatsApp ve USB arasında dağılıyor; neyin eksik olduğu belirsiz kalıyor.', en: 'Chasing clients for missing documents means days of messages. Files scatter across email, WhatsApp and USB sticks; nobody is sure what is still missing.' },
    flow: { tr: ['Müşteri için evrak listesi oluşturulur (şablondan).', 'Müşteriye tek bir güvenli yükleme linki gider.', 'Gelen dosya klasöre kaydedilir, listede işaretlenir.', 'Eksik kalanlar için en fazla 3 hatırlatma gider; tamamlanınca size haber verilir.'], en: ['A document list is created for the client (from a template).', 'The client receives one secure upload link.', 'Each file is saved to the folder and ticked off.', 'Up to 3 reminders go for missing items; you are notified when complete.'] },
    output: { tr: ['Her müşteri için tek klasör', 'Eksik evrak durumu tek bakışta', 'Tamamlanınca bildirim'], en: ['One folder per client', 'Missing-document status at a glance', 'A notification when complete'] },
    limits: { tr: ['1 evrak listesi şablonu, 1 depolama (Google Drive/OneDrive)', 'En fazla 3 hatırlatma', 'Belgelerin içeriğini yapay zekâyla okumak Kapsamlı pakete girer'], en: ['1 checklist template, 1 storage (Google Drive/OneDrive)', 'Up to 3 reminders', 'Reading inside the documents (AI) falls under Complex'] },
    tools: { tr: 'Google Drive/OneDrive, e-posta veya WhatsApp, Sheets', en: 'Google Drive/OneDrive, email or WhatsApp, Sheets' },
    faq: { tr: [{ q: 'Dosyalar nerede tutuluyor?', a: 'Sizin Google Drive veya OneDrive hesabınızda. Biz dosyaları kendi sunucumuzda saklamayız.' }, { q: 'Belgenin doğru olup olmadığını kontrol ediyor mu?', a: 'Bu pakette hayır; sadece gelip gelmediği izlenir. Belgelerin içeriğini yapay zekâyla okumak Kapsamlı pakete girer.' }], en: [{ q: 'Where are the files stored?', a: 'In your own Google Drive or OneDrive. We do not keep the files on our servers.' }, { q: 'Does it check the documents are correct?', a: 'Not in this plan; it only tracks whether they arrived. Reading the contents is the Complex plan.' }] },
    oldPath: '/sorunlar/evrak-toplama-ve-takip',
  },
  {
    slug: 'yorum-isteme',
    title: { tr: 'Yorum isteme', en: 'Review requests' },
    short: { tr: 'İş veya ziyaret tamamlanınca müşteriye Google yorum linki ve bir hatırlatma gider.', en: 'When a job or visit is done, the customer gets your Google review link plus one reminder.' },
    who: { tr: 'Kafe, restoran, klinik, salon, servis, tadilat', en: 'Cafés, restaurants, clinics, salons, trades' },
    problem: { tr: 'Memnun müşteri yorum yazmayı unutur; şikâyetçi olan unutmaz. Her seferinde yorum istemeyi alışkanlık hâline getirmek zor; ama düzenli istemek Google İşletme Profilinizin güvenilirliğini destekler.', en: 'Happy customers forget to leave reviews; unhappy ones don’t. Asking every time is hard to make a habit, yet asking consistently supports your Google Business Profile.' },
    flow: { tr: ['İş "tamamlandı" olarak işaretlenir (tablo, takvim veya sipariş sistemi).', 'Birkaç saat sonra müşteriye kısa bir teşekkür ve Google yorum linki gider.', '3 gün sonra tek bir hatırlatma gider (müşteri mesaj istemediğini belirttiyse gitmez).', 'Gönderilen istekler tabloda kayıtlıdır.'], en: ['A job is marked "done" (sheet, calendar or order system).', 'A few hours later the customer gets a short thank-you and your Google review link.', 'One reminder goes after 3 days (not if the customer has opted out).', 'All requests are logged in a sheet.'] },
    output: { tr: ['Her tamamlanan iş için yorum isteği', 'Tek hatırlatma, ısrar yok', 'Gönderim kaydı'], en: ['A review request for every completed job', 'One reminder, no nagging', 'A send log'] },
    limits: { tr: ['1 tetikleyici kaynak, 1 kanal', '1 istek + 1 hatırlatma', 'Yorumlara cevap yazma bu pakette yok'], en: ['1 trigger source, 1 channel', '1 request + 1 reminder', 'Replying to reviews is not included'] },
    tools: { tr: 'Sheets/takvim, WhatsApp veya e-posta, Google İşletme Profili linki', en: 'Sheets/calendar, WhatsApp or email, Google Business Profile link' },
    faq: { tr: [{ q: 'Sadece memnun müşterilere mi gönderiliyor?', a: 'Hayır. Google kuralları, yorum isteğini yalnızca memnun müşterilere göndermeyi yasaklar; tamamlanan her işe aynı mesaj gider.' }, { q: 'Sahte yorum yazıyor musunuz?', a: 'Asla. Sadece gerçek müşterinize, gerçek iş sonrası istek gönderilir.' }], en: [{ q: 'Is it only sent to happy customers?', a: 'No. Google’s rules forbid selective review gating; every completed job gets the same message.' }, { q: 'Do you write fake reviews?', a: 'Never. Requests only go to your real customers after real work.' }] },
  },
];

/* ── Onay simülatörü senaryoları ───────────────────────────── */
export type SimStep = { label: L; rows: { tr: string[]; en: string[] }; wait?: boolean };
export type SimScenario = { id: string; tab: L; incoming: L; steps: SimStep[]; done: L; meta: { auto: L; data: L; approve: L; plan: L } };

export const SIM: SimScenario[] = [
  {
    id: 'randevu',
    tab: { tr: 'Salon randevusu', en: 'Salon booking' },
    incoming: { tr: 'WhatsApp · 21:14 — "Merhaba, yarın 15:00 saç kesimi için yer var mı?"', en: 'WhatsApp · 21:14 — "Hi, any space for a haircut tomorrow at 3pm?"' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['Mesaj mesai dışında geldi.', 'Kim yazdı, ne istiyor ayrıştırıldı: saç kesimi, yarın 15:00.'], en: ['The message arrived after hours.', 'Who and what were extracted: haircut, tomorrow 3pm.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['Takvime bakıldı: 15:00 dolu, 15:30 boş.', 'Müşteri daha önce gelmiş; adı tabloda var.'], en: ['Calendar checked: 3pm taken, 3:30 free.', 'Returning customer; name found in the sheet.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Cevap taslağı: "15:00 dolu, 15:30 uygun. Ayıralım mı?"', '15:30 geçici olarak tutuldu.'], en: ['Draft reply: "3pm is taken, 3:30 is free. Shall I book it?"', '3:30 held provisionally.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['Taslak telefonunuza düştü.', 'Siz onaylamadan müşteriye hiçbir şey gitmez.'], en: ['The draft is waiting on your phone.', 'Nothing reaches the customer until you approve.'] } },
    ],
    done: { tr: 'Gönderildi. Randevu takvime yazıldı; yarın 13:30’da hatırlatma gidecek.', en: 'Sent. The booking is in the calendar; a reminder goes tomorrow at 1:30pm.' },
    meta: { auto: { tr: 'Okuma, takvim kontrolü, taslak', en: 'Reading, calendar check, draft' }, data: { tr: 'Takviminiz ve müşteri tablonuz', en: 'Your calendar and customer sheet' }, approve: { tr: 'Müşteriye giden her cevap', en: 'Every reply to a customer' }, plan: { tr: 'Hazır otomasyon', en: 'Ready-made' } },
  },
  {
    id: 'odeme',
    tab: { tr: 'Ödeme takibi', en: 'Overdue invoice' },
    incoming: { tr: 'Sabah 08:00 — Fatura listesi okundu: vadesi geçen 3 fatura var.', en: '8:00am — Invoice list read: 3 invoices are overdue.' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['Excel’deki fatura listesi her sabah okunur.', 'Vadesi geçen 3 fatura: 1, 7 ve 14 gün.'], en: ['The Excel invoice list is read every morning.', '3 invoices overdue: 1, 7 and 14 days.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['14 günlük faturaya üçüncü ve son hatırlatma hazırlandı; sonra konu size bırakılacak.', 'Diğer ikisi için sıradaki hatırlatma seçildi.'], en: ['The 14-day invoice gets its third and final reminder; after that it is handed to you.', 'Next reminder chosen for the other two.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Üç kibar hatırlatma taslağı, fatura numarası ve tutarla.', 'Ödeme linki veya IBAN eklendi.'], en: ['Three polite reminder drafts with invoice number and amount.', 'Payment link or bank details added.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['İlk kez hatırlatılan müşteri için onayınız bekleniyor.', 'İsterseniz bir müşteriyi listeden çıkarabilirsiniz.'], en: ['Waiting for your approval on the first-time reminder.', 'You can exclude any customer.'] } },
    ],
    done: { tr: 'Gönderildi. Üç hatırlatma gitti ve kayda yazıldı; 14 günlük fatura için size not düşüldü.', en: 'Sent. Three reminders went out and were logged; a note was left for you about the 14-day invoice.' },
    meta: { auto: { tr: 'Liste okuma, ayıklama, taslak', en: 'Reading, sorting, drafting' }, data: { tr: 'Fatura listeniz', en: 'Your invoice list' }, approve: { tr: 'İlk hatırlatma', en: 'The first reminder' }, plan: { tr: 'Hazır otomasyon', en: 'Ready-made' } },
  },
  {
    id: 'teklif',
    tab: { tr: 'Üreticiye teklif talebi', en: 'Manufacturer quote request' },
    incoming: { tr: 'E-posta · 09:42 — "Ekteki listedeki ürünler için fiyat verebilir misiniz?" 📎 talep_listesi.xlsx', en: 'Email · 9:42am — "Could you quote the items in the attached list?" 📎 request_list.xlsx' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['Mail ve Excel eki okundu: 5 satır.', 'Müşteri, termin ve teslim yeri ayrıştırıldı.'], en: ['Email and Excel attachment read: 5 lines.', 'Customer, deadline and delivery location extracted.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['4 satır ürün kodlarınız ve stokla eşleşti.', '1 kod listede yok → muadil önerildi; 1 satırda adet eksik.'], en: ['4 lines matched your product codes and stock.', '1 code not found → equivalent suggested; 1 line missing quantity.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Fiyatlar listenizden alındı; 1 özel fiyat işaretlendi.', 'Taslak teklif ve müşteriye "adet" sorusu hazır.'], en: ['Prices taken from your list; 1 special price flagged.', 'Draft quote and a "quantity?" question to the customer ready.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['Satış ekibiniz taslağı inceliyor.', 'Fiyat ve gönderim kararı tamamen sizde.'], en: ['Your sales team reviews the draft.', 'Price and sending decisions stay entirely with you.'] } },
    ],
    done: { tr: 'Gönderildi. Teklif ERP/Excel formatınızda kaydedildi; müşteriye soru gitti, cevap gelince teklif güncellenecek.', en: 'Sent. The quote is saved in your ERP/Excel format; the question went to the customer and the quote updates when they reply.' },
    meta: { auto: { tr: 'Ek okuma, kod eşleme, taslak', en: 'Reading attachments, matching codes, drafting' }, data: { tr: 'Ürün, stok ve fiyat listeniz', en: 'Your product, stock and price lists' }, approve: { tr: 'Fiyat ve gönderim', en: 'Pricing and sending' }, plan: { tr: 'Kapsamlı', en: 'Complex' } },
  },  {
    id: 'talep',
    tab: { tr: 'Yeni talep', en: 'New enquiry' },
    incoming: { tr: 'Web formu · 18:52 — "Mutfak yenileme için keşif istiyoruz. Hafta içi akşam uygunuz."', en: 'Web form · 6:52pm — "We would like a quote visit for a kitchen renovation. Weekday evenings suit us."' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['Form mesai dışında doldu.', 'Ad, telefon, adres ve iş türü ayrıştırıldı: mutfak yenileme.'], en: ['The form arrived after hours.', 'Name, phone, address and job type extracted: kitchen renovation.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['Aynı kişiden daha önce talep yok; yeni kayıt açıldı.', 'Satır talep tablonuza eklendi.'], en: ['No earlier enquiry from this person; a new record was created.', 'A row was added to your enquiry sheet.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Ekibinize WhatsApp bildirimi gitti.', 'Müşteriye "talebiniz alındı, yarın arıyoruz" cevabı taslağı hazır.'], en: ['Your team got a WhatsApp alert.', 'An "enquiry received, we will call tomorrow" reply is drafted.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['Cevap metni onayınızı bekliyor.', 'Metni bir kez onaylarsanız sonraki talepler için otomatik gidebilir.'], en: ['The reply is waiting for your approval.', 'Approve the wording once and it can go automatically for future enquiries.'] } },
    ],
    done: { tr: 'Gönderildi. Müşteri cevabı aldı; talep tablonuzda, yarın sabah hatırlatma gelecek.', en: 'Sent. The customer got the reply; the enquiry is in your sheet and you get a reminder tomorrow morning.' },
    meta: { auto: { tr: 'Ayrıştırma, kayıt, bildirim', en: 'Extracting, logging, alerting' }, data: { tr: 'Web formunuz ve talep tablonuz', en: 'Your web form and enquiry sheet' }, approve: { tr: 'Müşteriye giden cevap metni', en: 'The reply wording to the customer' }, plan: { tr: 'Hazır otomasyon', en: 'Ready-made' } },
  },
  {
    id: 'evrak',
    tab: { tr: 'Evrak toplama', en: 'Document collection' },
    incoming: { tr: 'Yükleme linki · 10:15 — Müşteri 5 evraktan 3\u2019ünü yükledi.', en: 'Upload link · 10:15am — The client uploaded 3 of 5 documents.' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['3 dosya müşterinin klasörüne kaydedildi.', 'Listede işaretlendi: kimlik, adres belgesi, banka dökümü.'], en: ['3 files were saved to the client\u2019s folder.', 'Ticked off: ID, proof of address, bank statement.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['2 evrak eksik: maaş bordrosu, vergi levhası.', 'Bu müşteriye daha önce 1 hatırlatma gitmiş.'], en: ['2 documents missing: payslip, tax certificate.', 'This client has had 1 reminder so far.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Eksik iki evrakı listeleyen kısa hatırlatma taslağı hazır.', 'Yükleme linki mesaja eklendi.'], en: ['A short reminder listing the two missing documents is drafted.', 'The upload link is included.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['Hatırlatma metni onayınızı bekliyor.', 'Toplam en fazla 3 hatırlatma gider, sonra konu size kalır.'], en: ['The reminder wording is waiting for your approval.', 'At most 3 reminders go in total, then it is handed to you.'] } },
    ],
    done: { tr: 'Gönderildi. Eksik evraklar tamamlanınca size "dosya tamam" bildirimi gelecek.', en: 'Sent. You will get a "file complete" alert once the missing documents arrive.' },
    meta: { auto: { tr: 'Kaydetme, işaretleme, hatırlatma taslağı', en: 'Saving, ticking off, drafting reminders' }, data: { tr: 'Evrak listesi ve Drive/OneDrive klasörünüz', en: 'Your checklist and Drive/OneDrive folder' }, approve: { tr: 'Hatırlatma metni', en: 'The reminder wording' }, plan: { tr: 'Hazır otomasyon', en: 'Ready-made' } },
  },
  {
    id: 'yorum',
    tab: { tr: 'Yorum isteme', en: 'Review request' },
    incoming: { tr: 'Takvim · 17:30 — Kombi bakımı "tamamlandı" olarak işaretlendi.', en: 'Calendar · 5:30pm — A boiler service was marked "done".' },
    steps: [
      { label: { tr: 'Geldi', en: 'Received' }, rows: { tr: ['Tamamlanan iş kaydı okundu.', 'Müşterinin adı ve telefonu kayıttan alındı.'], en: ['The completed job was read.', 'The customer\u2019s name and phone were taken from the record.'] } },
      { label: { tr: 'Kontrol', en: 'Checked' }, rows: { tr: ['Bu müşteriye bu yıl yorum isteği gitmemiş.', 'Müşteri mesaj almayı reddetmemiş.'], en: ['No review request was sent to this customer this year.', 'The customer has not opted out of messages.'] } },
      { label: { tr: 'Taslak hazır', en: 'Draft ready' }, rows: { tr: ['Kısa teşekkür ve Google yorum linki taslağı hazır.', '3 gün sonra tek hatırlatma planlandı.'], en: ['A short thank-you with your Google review link is drafted.', 'One reminder is scheduled for 3 days later.'] } },
      { label: { tr: 'Onayınız', en: 'Your approval' }, wait: true, rows: { tr: ['Mesaj metni onayınızı bekliyor.', 'Her tamamlanan işe aynı mesaj gider; seçim yapılmaz.'], en: ['The message wording is waiting for your approval.', 'Every completed job gets the same message; nobody is filtered out.'] } },
    ],
    done: { tr: 'Gönderildi. Müşteri yorum linkini aldı; gönderim kayda yazıldı.', en: 'Sent. The customer received the review link; the send was logged.' },
    meta: { auto: { tr: 'Tetikleme, kontrol, taslak', en: 'Triggering, checking, drafting' }, data: { tr: 'Takviminiz veya iş tablonuz', en: 'Your calendar or job sheet' }, approve: { tr: 'Mesaj metni', en: 'The message wording' }, plan: { tr: 'Hazır otomasyon', en: 'Ready-made' } },
  },
];
