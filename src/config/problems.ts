/**
 * "Sorunlar" sayfaları — mglautomation.uk'ten taşındı (2026-09-04).
 *
 * Kaynak sayfalarda her iş akışı adımının açıklaması birebir aynı tek
 * cümleydi ("Kurallar, yetkiler ve insan onay noktaları işletmenizin
 * sürecine göre belirlenir" — 5 kez tekrar) — doldurulmamış bir şablon
 * kalıntısıydı. Buraya taşırken her adıma gerçek, ayrıştırıcı açıklama
 * yazıldı.
 *
 * Bu sayfalar PLAN.md bölüm 4'te "en değerli varlık" olarak işaretlenmişti:
 * mgl-ai.com'da karşılığı olmayan, gerçek arama sorgularına yanıt veren
 * problem sayfaları. Hepsi otomasyon sistemine bağlanıyor (/packages#systems).
 */

export type ProblemStep = { name: { tr: string; en: string }; desc: { tr: string; en: string } };
export type ProblemFaq = { q: { tr: string; en: string }; a: { tr: string; en: string } };

export type Problem = {
  slug: string;
  eyebrow: { tr: string; en: string };
  metaTitle: { tr: string; en: string };
  metaDescription: { tr: string; en: string };
  heroTitle: { tr: string; en: string };
  heroAnswer: { tr: string; en: string };
  painPoints: { tr: string[]; en: string[] };
  steps: ProblemStep[];
  tools: { tr: string[]; en: string[] };
  seoKeywords: { tr: string[]; en: string[] };
  faq: ProblemFaq[];
  relatedSlugs: string[];
};

export const PROBLEMS: Record<string, Problem> = {
  'mesai-disi-arama-cevaplama': {
    slug: 'mesai-disi-arama-cevaplama',
    eyebrow: { tr: 'SESLİ ASİSTAN · TELEFON', en: 'VOICE ASSISTANT · PHONE' },
    metaTitle: {
      tr: 'Mesai Dışında Telefonlara Cevap Veren Yapay Zeka | MGL AI',
      en: 'AI That Answers Calls After Hours | MGL AI',
    },
    metaDescription: {
      tr: 'Mesai dışında veya yoğunlukta cevapsız kalan aramaları karşılayan, bilgi veren ve randevu oluşturan AI sesli asistan. Kurulum ücretsiz.',
      en: 'An AI voice assistant that answers calls missed after hours or during rush, gives information and books appointments. No setup fee.',
    },
    heroTitle: {
      tr: 'Kaçırılan aramalar için AI sesli asistan',
      en: 'An AI voice assistant for the calls you miss',
    },
    heroAnswer: {
      tr: 'İşletmenizin onayladığı bilgiler ve kurallar çerçevesinde telefonları doğal konuşmayla yanıtlayan, randevu oluşturan ve konuşma özetini ekibinize gönderen bir AI sesli asistan kurulur.',
      en: 'We set up an AI voice assistant that answers calls in natural conversation within the information and rules your business approves, books appointments, and sends a call summary to your team.',
    },
    painPoints: {
      tr: [
        'Mesai dışında veya yoğunlukta cevapsız kalan aramalar',
        'Personelin aynı soruları tekrar tekrar yanıtlaması',
        'Konuşma notlarının CRM\'e girilmemesi',
        'Randevu ve geri arama taleplerinin kaybolması',
      ],
      en: [
        'Calls that go unanswered after hours or during busy periods',
        'Staff answering the same questions over and over',
        'Call notes never making it into the CRM',
        'Appointment and callback requests getting lost',
      ],
    },
    steps: [
      {
        name: { tr: 'Karşılar', en: 'Answers' },
        desc: {
          tr: 'Gelen aramayı işletme adıyla karşılar; asistan olduğunu açıkça belirtir.',
          en: 'Answers the call in your business name and states clearly that it is an AI assistant.',
        },
      },
      {
        name: { tr: 'Dinler ve toplar', en: 'Listens and collects' },
        desc: {
          tr: 'Arama nedenini ve gerekli bilgileri doğal konuşmayla toplar.',
          en: 'Works out why the customer is calling and collects the details it needs, in natural conversation.',
        },
      },
      {
        name: { tr: 'Yanıtlar veya randevu oluşturur', en: 'Answers or books' },
        desc: {
          tr: 'Yetkisi içindeki soruyu yanıtlar veya doğrudan randevu oluşturur.',
          en: 'Answers questions within its approved scope or books the appointment directly.',
        },
      },
      {
        name: { tr: 'İnsana aktarır', en: 'Hands off to a human' },
        desc: {
          tr: 'Acil, hassas ya da belirsiz bir konuyla karşılaşırsa insana aktarır — tahmin yürütmez.',
          en: 'Passes urgent, sensitive or unclear cases to a person rather than guessing.',
        },
      },
      {
        name: { tr: 'Kaydeder', en: 'Logs it' },
        desc: {
          tr: 'Konuşma özetini, kayıt politikanızı ve takip görevini sisteme işler.',
          en: 'Writes the call summary, your recording policy and the follow-up task into your system.',
        },
      },
    ],
    tools: {
      tr: ['Telefon numarası ve çağrı altyapısı', 'CRM, Excel ve Google Sheets', 'Takvim ve randevu sistemi', 'E-posta, SMS ve WhatsApp', 'Telegram ve yönetici raporu'],
      en: ['Phone number and call infrastructure', 'CRM, Excel and Google Sheets', 'Calendar and booking system', 'Email, SMS and WhatsApp', 'Telegram and manager reports'],
    },
    seoKeywords: {
      tr: ['mesai dışında telefona cevap veren yapay zeka', 'telefonlara bakan yapay zeka', 'AI çağrı asistanı fiyatı', 'cevapsız aramaları otomatik karşılama'],
      en: ['ai that answers calls after hours', 'ai phone answering service', 'missed call automation', 'ai voice receptionist cost'],
    },
    faq: [
      {
        q: { tr: 'İnsan gibi konuşabilir mi?', en: 'Does it sound like a real person?' },
        a: {
          tr: 'Doğal ve akıcı konuşabilir; ancak arayan kişiye yapay zeka asistanı olduğu açıkça belirtilir.',
          en: 'It speaks naturally and fluently, but the caller is always told clearly that they are speaking to an AI assistant.',
        },
      },
      {
        q: { tr: 'Her soruya cevap verir mi?', en: 'Does it answer every question?' },
        a: {
          tr: 'Hayır. Yalnızca onaylanmış bilgi ve işlemlerle sınırlandırılır; emin olmadığı konuyu ekibinize yönlendirir.',
          en: 'No. It is limited to approved information and actions, and routes anything it is unsure about to your team.',
        },
      },
      {
        q: { tr: 'Konuşma raporu nereye gelir?', en: 'Where does the call report go?' },
        a: {
          tr: 'CRM\'e, Excel\'e, e-postaya, panele veya Telegram mesajına gönderilebilir.',
          en: 'It can be sent to your CRM, Excel, email, a dashboard or a Telegram message.',
        },
      },
    ],
    relatedSlugs: ['randevu-hatirlatma-sistemi'],
  },

  'randevu-hatirlatma-sistemi': {
    slug: 'randevu-hatirlatma-sistemi',
    eyebrow: { tr: 'OTOMASYON · RANDEVU', en: 'AUTOMATION · BOOKING' },
    metaTitle: {
      tr: 'Otomatik Randevu Hatırlatma ve Rezervasyon Sistemi | MGL AI',
      en: 'Automatic Appointment Reminder and Booking System | MGL AI',
    },
    metaDescription: {
      tr: 'Randevuyu kaydeden, WhatsApp/SMS/e-posta ile hatırlatan, iptal ve yeniden planlamayı işleyen otomasyon. Klinik, salon, emlak ve danışmanlık için.',
      en: 'Automation that books the appointment, reminds by WhatsApp/SMS/email, and handles cancellations and rescheduling. For clinics, salons, estate agents and consultancies.',
    },
    heroTitle: { tr: 'Randevu ve rezervasyon otomasyonu', en: 'Appointment and booking automation' },
    heroAnswer: {
      tr: 'Mevcut takviminize veya randevu yazılımınıza bağlanan sistem: yeni randevuyu kaydeder, belirlediğiniz zamanda WhatsApp, SMS, e-posta ya da telefonla hatırlatır, iptal ve yeniden planlama cevabını işler.',
      en: 'A system that connects to your existing calendar or booking software: it logs the new appointment, reminds by WhatsApp, SMS, email or phone at the time you choose, and handles cancellations and rescheduling replies.',
    },
    painPoints: {
      tr: [
        'Randevu teyitlerinin çalışanlar tarafından tek tek yapılması',
        'Unutulan randevular ve boş kalan zamanlar',
        'İptal ve değişikliklerin farklı kanallarda dağınık kalması',
        'Takvim ile müşteri kaydının eşleşmemesi',
      ],
      en: [
        'Staff confirming every appointment one by one',
        'Forgotten appointments and empty slots',
        'Cancellations and changes scattered across different channels',
        'Calendar and customer records not matching up',
      ],
    },
    steps: [
      {
        name: { tr: 'Talebi alır', en: 'Takes the request' },
        desc: { tr: 'Telefon, form veya mesajdan gelen randevu talebini alır.', en: 'Picks up the booking request from a call, form or message.' },
      },
      {
        name: { tr: 'Uygunluğu kontrol eder', en: 'Checks availability' },
        desc: { tr: 'Takvim ve kaynak uygunluğunu kontrol eder.', en: 'Checks calendar and resource availability.' },
      },
      {
        name: { tr: 'Kaydeder ve teyit eder', en: 'Books and confirms' },
        desc: { tr: 'Randevuyu kaydedip müşteriye teyit mesajı gönderir.', en: 'Logs the appointment and sends the customer a confirmation.' },
      },
      {
        name: { tr: 'Hatırlatır', en: 'Reminds' },
        desc: { tr: 'Belirlenen zamanlarda (örn. 24 saat ve 2 saat önce) hatırlatma gönderir.', en: 'Sends reminders at the times you set (e.g. 24 hours and 2 hours before).' },
      },
      {
        name: { tr: 'Değişikliği işler', en: 'Handles changes' },
        desc: { tr: 'İptal veya değişikliği işler ve ekibe güncel durumu bildirir.', en: 'Processes a cancellation or change and tells your team the current status.' },
      },
    ],
    tools: {
      tr: ['Google Calendar ve Outlook', 'Randevu ve rezervasyon yazılımları', 'WhatsApp, SMS, e-posta ve telefon', 'CRM ve müşteri listeleri', 'Rapor ve no-show takibi'],
      en: ['Google Calendar and Outlook', 'Booking and reservation software', 'WhatsApp, SMS, email and phone', 'CRM and customer lists', 'Reporting and no-show tracking'],
    },
    seoKeywords: {
      tr: ['otomatik randevu hatırlatma', 'WhatsApp randevu teyit sistemi', 'randevu alan yapay zeka', 'müşteri randevusunu unutmasın'],
      en: ['automatic appointment reminders', 'whatsapp booking confirmation', 'ai appointment booking', 'reduce no-shows'],
    },
    faq: [
      {
        q: { tr: 'Mevcut takvimimiz kullanılır mı?', en: 'Does it use our existing calendar?' },
        a: {
          tr: 'Uygun API veya bağlantı varsa evet. Takvim erişimi yoksa kontrollü bir ara tablo veya yeni rezervasyon akışı kurulabilir.',
          en: 'Yes, if there is a suitable API or connection. Without calendar access we can set up a controlled intermediate sheet or a new booking flow.',
        },
      },
      {
        q: { tr: 'Hatırlatma ne zaman gider?', en: 'When are reminders sent?' },
        a: {
          tr: 'İşletmenin tercihine göre birden fazla kural tanımlanabilir — örneğin 24 saat ve 2 saat önce.',
          en: 'You can set more than one rule to your preference — for example 24 hours and 2 hours before.',
        },
      },
      {
        q: { tr: 'Müşteri iptal ederse ne olur?', en: 'What happens if the customer cancels?' },
        a: {
          tr: 'Yanıt algılanıp randevu güncellenir, boş kalan yer bekleme listesindeki müşteriye önerilebilir ve ekip bilgilendirilir.',
          en: 'The reply is detected and the booking updated; the freed slot can be offered to someone on the waiting list and the team is notified.',
        },
      },
    ],
    relatedSlugs: ['mesai-disi-arama-cevaplama', 'excelden-otomatik-mail-whatsapp'],
  },

  'tahsilat-otomasyonu': {
    slug: 'tahsilat-otomasyonu',
    eyebrow: { tr: 'OTOMASYON · TAHSİLAT', en: 'AUTOMATION · COLLECTIONS' },
    metaTitle: {
      tr: 'Ödemeyen Müşteriyi Otomatik Takip Eden Tahsilat Sistemi | MGL AI',
      en: 'Automated Follow-up for Overdue Payments | MGL AI',
    },
    metaDescription: {
      tr: 'Vadesi geçen alacakları Excel veya CRM\'den okuyup e-posta, SMS, WhatsApp ya da sesli aramayla takip eden tahsilat otomasyonu.',
      en: 'Automation that reads overdue invoices from Excel or your CRM and follows up by email, SMS, WhatsApp or voice call.',
    },
    heroTitle: { tr: 'Tahsilat takip otomasyonu', en: 'Payment follow-up automation' },
    heroAnswer: {
      tr: 'Şirket verilerini Excel, muhasebe yazılımı veya CRM\'den okuyup müşterilere e-posta, SMS, WhatsApp veya sesli aramayla ulaşan, ödeme taahhütlerini kaydeden ve sonuçları tabloya yazan bir sistem.',
      en: 'A system that reads your data from Excel, accounting software or CRM, reaches customers by email, SMS, WhatsApp or voice call, records payment promises and writes results back to your table.',
    },
    painPoints: {
      tr: [
        'Vadesi geçen faturaların geç fark edilmesi',
        'Hatırlatmaların düzensiz ve kişiye bağlı kalması',
        'Müşterinin verdiği ödeme tarihinin kaydedilmemesi',
        'İtiraz ve uyuşmazlıkların doğru kişiye ulaşmaması',
      ],
      en: [
        'Overdue invoices noticed too late',
        'Reminders staying irregular and dependent on one person',
        'The payment date a customer promises never getting recorded',
        'Disputes not reaching the right person',
      ],
    },
    steps: [
      {
        name: { tr: 'Veriyi okur', en: 'Reads the data' },
        desc: { tr: 'Vade ve müşteri verisini izinli kaynaktan okur.', en: 'Reads due dates and customer data from an authorised source.' },
      },
      {
        name: { tr: 'Kanalı seçer', en: 'Picks the channel' },
        desc: { tr: 'Gecikme süresi ve risk kuralına göre takip kanalını seçer.', en: 'Chooses the follow-up channel based on how overdue the payment is and your risk rules.' },
      },
      {
        name: { tr: 'Sorar', en: 'Asks' },
        desc: { tr: 'Onaylı ve saygılı bir mesajla ödeme durumunu sorar.', en: 'Asks about payment status with an approved, respectful message.' },
      },
      {
        name: { tr: 'Kaydeder', en: 'Records it' },
        desc: { tr: 'Verilen ödeme tarihini, itirazı veya geri arama talebini kaydeder.', en: 'Logs the payment date given, any dispute, or a callback request.' },
      },
      {
        name: { tr: 'Yeniden kontrol eder', en: 'Follows up again' },
        desc: { tr: 'Taahhüdü yeniden kontrol eder; istisnaları finans ekibine aktarır.', en: 'Checks the promise again; escalates exceptions to your finance team.' },
      },
    ],
    tools: {
      tr: ['Excel, Google Sheets ve CRM', 'Muhasebe ve fatura yazılımları', 'E-posta, WhatsApp ve SMS', 'AI sesli arama', 'Panel ve Telegram raporu'],
      en: ['Excel, Google Sheets and CRM', 'Accounting and invoicing software', 'Email, WhatsApp and SMS', 'AI voice calling', 'Dashboard and Telegram reports'],
    },
    seoKeywords: {
      tr: ['ödemeyen müşteriyi otomatik arayan sistem', 'alacak takip otomasyonu', 'otomatik ödeme hatırlatma', 'Excel tahsilat takip sistemi'],
      en: ['automated payment collection', 'overdue invoice follow-up automation', 'automatic payment reminders', 'excel debt tracking'],
    },
    faq: [
      {
        q: { tr: 'Müşteriyi hangi kanaldan takip eder?', en: 'Which channel does it use to follow up?' },
        a: {
          tr: 'E-posta, SMS, WhatsApp veya sesli arama kullanılabilir. Kanal, sıklık ve mesaj tonu işletmenin politikasıyla belirlenir.',
          en: 'Email, SMS, WhatsApp or voice call can be used. Channel, frequency and tone are set by your policy.',
        },
      },
      {
        q: { tr: 'Ödeme sözü verirse ne olur?', en: 'What happens if they promise to pay?' },
        a: {
          tr: 'Tarih ve not kaydedilir; belirlenen tarihte yeniden kontrol edilir. Ödeme görünmüyorsa takip adımı devam eder.',
          en: 'The date and note are logged; it is checked again on that date. If payment has not landed, follow-up continues.',
        },
      },
      {
        q: { tr: 'Hukuki tahsilat yapar mı?', en: 'Does it carry out legal debt collection?' },
        a: {
          tr: 'Hayır. Sistem idari hatırlatma ve kayıt işini yürütür; uyuşmazlık veya hukuki süreç yetkili kişiye aktarılır.',
          en: 'No. It handles administrative reminders and record-keeping; disputes or legal action are escalated to the right person.',
        },
      },
    ],
    relatedSlugs: ['evrak-toplama-ve-takip', 'excelden-otomatik-mail-whatsapp'],
  },

  'evrak-toplama-ve-takip': {
    slug: 'evrak-toplama-ve-takip',
    eyebrow: { tr: 'OTOMASYON · EVRAK', en: 'AUTOMATION · DOCUMENTS' },
    metaTitle: {
      tr: 'Müşteriden Otomatik Evrak İsteme ve Takip Sistemi | MGL AI',
      en: 'Automated Document Requests and Tracking | MGL AI',
    },
    metaDescription: {
      tr: 'Eksik evrak listesini müşteriye gönderen, gelen dosyayı kaydeden, eksikleri hatırlatan belge takip otomasyonu. Muhasebe ve danışmanlık firmaları için.',
      en: 'Automation that sends customers their missing-document list, logs incoming files and chases what is still missing. For accountants and consultancies.',
    },
    heroTitle: { tr: 'Belge ve eksik evrak otomasyonu', en: 'Document and missing-file automation' },
    heroAnswer: {
      tr: 'Müşteri veya dosya bazında gerekli belge listesini okuyan, eksikleri kişiselleştirilmiş mesajla isteyen, gelen dosyaları doğru kayıtla eşleştiren, cevap gelmezse kademeli hatırlatan ve tamamlanmayan işleri personele bildiren sistem.',
      en: 'A system that reads the required document list per customer or file, requests what is missing with a personalised message, matches incoming files to the right record, escalates reminders if there is no reply, and notifies staff when a file stays incomplete.',
    },
    painPoints: {
      tr: [
        'Hangi müşteride hangi belgenin eksik olduğunun karışması',
        'Aynı evrakın tekrar tekrar istenmesi',
        'E-posta ve mesaj eklerinin farklı yerlerde kalması',
        'Tamamlanmayan dosyanın son tarihe yaklaşması',
      ],
      en: [
        'Losing track of which customer is missing which document',
        'Requesting the same document more than once',
        'Email and message attachments scattered everywhere',
        'Incomplete files drifting towards a deadline unnoticed',
      ],
    },
    steps: [
      {
        name: { tr: 'Listeyi oluşturur', en: 'Builds the checklist' },
        desc: { tr: 'Dosya türüne göre gerekli evrak kontrol listesini oluşturur.', en: 'Builds the required-document checklist based on the file type.' },
      },
      {
        name: { tr: 'İster', en: 'Requests it' },
        desc: { tr: 'Eksik listeyi müşteriye uygun kanaldan gönderir.', en: 'Sends the missing-item list to the customer on the right channel.' },
      },
      {
        name: { tr: 'Eşleştirir', en: 'Matches it' },
        desc: { tr: 'Gelen belgeyi doğru müşteri ve dosyayla eşleştirir.', en: 'Matches the incoming document to the right customer and file.' },
      },
      {
        name: { tr: 'Yeniden hatırlatır', en: 'Chases it up' },
        desc: { tr: 'Eksik kalanlar için belirlenen aralıkta kademeli olarak hatırlatır.', en: 'Sends escalating reminders at the interval you set for what is still missing.' },
      },
      {
        name: { tr: 'Bildirir', en: 'Notifies' },
        desc: { tr: 'Dosya tamamlanınca veya risk oluşunca sorumlu kişiye bildirir.', en: 'Notifies the responsible person when the file is complete or at risk.' },
      },
    ],
    tools: {
      tr: ['E-posta ve WhatsApp', 'Google Drive, OneDrive ve SharePoint', 'CRM, Excel ve Google Sheets', 'Form ve belge işleme', 'Görev ve son tarih uyarıları'],
      en: ['Email and WhatsApp', 'Google Drive, OneDrive and SharePoint', 'CRM, Excel and Google Sheets', 'Forms and document processing', 'Task and deadline alerts'],
    },
    seoKeywords: {
      tr: ['müşteriden otomatik evrak isteme', 'eksik belge takip sistemi', 'WhatsApp evrak toplama', 'dosya tamamlanınca bildirim'],
      en: ['automated document collection', 'missing document tracking', 'whatsapp document requests', 'file completion alerts'],
    },
    faq: [
      {
        q: { tr: 'Gelen dosyayı otomatik tanır mı?', en: 'Does it recognise incoming files automatically?' },
        a: {
          tr: 'Tanımlı belge türlerinde ön sınıflandırma ve dosya eşleştirme yapılabilir; kritik doğrulama insan onayında bırakılabilir.',
          en: 'For defined document types it can pre-classify and match files; critical checks can be left for human approval.',
        },
      },
      {
        q: { tr: 'Belgeler nerede saklanır?', en: 'Where are documents stored?' },
        a: {
          tr: 'İşletmenin seçtiği güvenli depolama alanı kullanılır. Otomasyon erişimi en az yetki prensibiyle sınırlandırılır.',
          en: 'Your chosen secure storage is used. Automation access is limited on a least-privilege basis.',
        },
      },
      {
        q: { tr: 'Müşteri cevap vermezse ne olur?', en: 'What if the customer does not reply?' },
        a: {
          tr: 'Kademeli hatırlatma uygulanır; belirlenen sayı veya son tarih eşiğinde sorumlu çalışana görev açılır.',
          en: 'Reminders escalate; at the number of attempts or deadline you set, a task is opened for the responsible team member.',
        },
      },
    ],
    relatedSlugs: ['tahsilat-otomasyonu', 'excelden-otomatik-mail-whatsapp'],
  },

  'excelden-otomatik-mail-whatsapp': {
    slug: 'excelden-otomatik-mail-whatsapp',
    eyebrow: { tr: 'OTOMASYON · EXCEL', en: 'AUTOMATION · SPREADSHEETS' },
    metaTitle: {
      tr: 'Excel\'den Otomatik Mail ve WhatsApp Gönderme | MGL AI',
      en: 'Automatic Email and WhatsApp from Excel | MGL AI',
    },
    metaDescription: {
      tr: 'Tablodaki tarihi ve durumu sistem okusun, doğru işlemi kendisi başlatsın. Excel ve Google Sheets satırlarından otomatik e-posta, WhatsApp, SMS ve görev.',
      en: 'Let the system read the date and status in your spreadsheet and act on it. Automatic email, WhatsApp, SMS and tasks from Excel and Google Sheets rows.',
    },
    heroTitle: { tr: 'Excel ve Google Sheets otomasyonu', en: 'Excel and Google Sheets automation' },
    heroAnswer: {
      tr: 'Elektronik tablo satırlarını kurallarınıza göre okuyup otomatik e-posta, WhatsApp, SMS, görev ve rapor oluşturan bir sistem.',
      en: 'A system that reads your spreadsheet rows against your own rules and generates automatic email, WhatsApp, SMS, tasks and reports.',
    },
    painPoints: {
      tr: [
        'Tabloyu günlük açıp tarihi gelen satırları elle arama zorunluluğu',
        'Kopyala-yapıştır hatalarından yanlış alıcıya mesaj gitmesi',
        'Gönderim bilgisinin tablodan ayrı bir yerde tutulması',
        'Cevap ve işlem sonuçlarının tabloya geri yazılmaması',
      ],
      en: [
        'Having to open the sheet daily and manually find rows that are due',
        'Copy-paste mistakes sending a message to the wrong recipient',
        'Send records being kept somewhere separate from the sheet',
        'Replies and results never being written back to the row',
      ],
    },
    steps: [
      {
        name: { tr: 'Tabloyu düzenler', en: 'Structures the sheet' },
        desc: { tr: 'Tablo başlıkları ve veri tiplerini otomasyona uygun hale getirir.', en: 'Gets your headers and data types ready for automation.' },
      },
      {
        name: { tr: 'Kuralları tanımlar', en: 'Sets the rules' },
        desc: { tr: 'Çalışma sıklığı ile tarih ve durum kurallarını tanımlar.', en: 'Defines how often it runs and the date/status rules that trigger it.' },
      },
      {
        name: { tr: 'İşlemi başlatır', en: 'Acts' },
        desc: { tr: 'Koşulu sağlayan satır için izinli işlemi başlatır.', en: 'Starts the approved action for any row that meets the condition.' },
      },
      {
        name: { tr: 'Sonucu yazar', en: 'Writes the result' },
        desc: { tr: 'Başarı, hata, tarih ve mesaj kimliğini tabloya geri yazar.', en: 'Writes success, error, date and message ID back into the sheet.' },
      },
      {
        name: { tr: 'İstisnayı bildirir', en: 'Flags exceptions' },
        desc: { tr: 'Gelen yanıtı eşleştirir; istisna ve hatayı sorumluya bildirir.', en: 'Matches incoming replies and reports exceptions or errors to the responsible person.' },
      },
    ],
    tools: {
      tr: ['Excel ve Google Sheets', 'Gmail, Outlook ve SMTP', 'WhatsApp ve SMS', 'CRM, takvim ve görev araçları', 'Telegram ve panel'],
      en: ['Excel and Google Sheets', 'Gmail, Outlook and SMTP', 'WhatsApp and SMS', 'CRM, calendar and task tools', 'Telegram and dashboards'],
    },
    seoKeywords: {
      tr: ['Excelden otomatik mail gönderme', 'Google Sheets WhatsApp otomasyonu', 'tablodaki tarihe göre mesaj gönderme', 'Excel satırından görev oluşturma'],
      en: ['send email automatically from excel', 'google sheets whatsapp automation', 'trigger message from spreadsheet date', 'create task from excel row'],
    },
    faq: [
      {
        q: { tr: 'Bilgisayar açık olmak zorunda mı?', en: 'Does a computer need to stay switched on?' },
        a: {
          tr: 'Hayır. Bulutta çalışan iş akışı kurulursa kişisel bilgisayarın açık kalması gerekmez; zamanlayıcı sunucuda çalışır.',
          en: 'No. When the workflow runs in the cloud, no personal computer needs to stay on — the scheduler runs on the server.',
        },
      },
      {
        q: { tr: 'Yanlış kişiye mesaj gitmesi nasıl önlenir?', en: 'How is sending to the wrong person prevented?' },
        a: {
          tr: 'Test alıcısı, izinli alıcı listesi, veri doğrulama, önizleme ve insan onayı gibi güvenlik katmanları eklenebilir.',
          en: 'Safeguards such as a test recipient, an approved recipient list, data validation, a preview step and human approval can be added.',
        },
      },
      {
        q: { tr: 'Tablodaki cevap güncellenebilir mi?', en: 'Can the reply be written back to the sheet?' },
        a: {
          tr: 'Evet. Gönderim zamanı, durum, yanıt özeti, hata veya sonraki takip tarihi ilgili satıra yazılabilir.',
          en: 'Yes. Send time, status, a reply summary, error or the next follow-up date can be written into the same row.',
        },
      },
    ],
    relatedSlugs: ['tahsilat-otomasyonu', 'evrak-toplama-ve-takip'],
  },
};

export const PROBLEM_SLUGS = Object.keys(PROBLEMS);
