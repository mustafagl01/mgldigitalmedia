export type SectorKey = 'klinik' | 'emlak' | 'eticaret';

export type Bilingual = { tr: string; en: string };

export type PainItem = {
  pain: Bilingual;
  cost: Bilingual;
};

export type HowStep = {
  name: Bilingual;
  desc: Bilingual;
};

export type IncludedService = {
  skuKey: string;
  label: Bilingual;
  blurb: Bilingual;
};

export type FaqItem = {
  q: Bilingual;
  a: Bilingual;
};

export type SectorContent = {
  slug: string;
  emberBadge: Bilingual;
  heroTitle: Bilingual;
  heroAnswer: Bilingual;
  heroStats: Array<{ label: Bilingual; value: Bilingual }>;
  painPoints: PainItem[];
  howItWorks: HowStep[];
  includedServices: IncludedService[];
  recommendedPackage: 'agents' | 'ads' | 'web';
  packageCta: Bilingual;
  faq: FaqItem[];
  seoKeywords: { tr: string[]; en: string[] };
  displayName: Bilingual;
  metaTitle: Bilingual;
  metaDescription: Bilingual;
};

export const SOLUTIONS: Record<SectorKey, SectorContent> = {
  klinik: {
    slug: 'klinik',
    emberBadge: { tr: 'KLİNİK OTOMASYONU', en: 'CLINIC AUTOMATION' },
    displayName: { tr: 'Klinik & Estetik', en: 'Clinic & Aesthetic' },
    heroTitle: {
      tr: 'Kliniğiniz her gün çağrı kaçırıyor mu?',
      en: 'Is your clinic missing calls every day?',
    },
    heroAnswer: {
      tr: 'Klinikler ortalama %35 çağrı kaçırır; kaçan her çağrı yaklaşık 2.500 TL değerinde bir randevu kaybıdır. MGL AI kurduğu sistem 7/24 çağrıyı ve WhatsApp mesajını karşılar, randevuyu takvime yazar, hastaya hatırlatma gönderir.',
      en: 'Clinics miss around 35% of inbound calls on average; each missed call is roughly a 2,500 TL appointment lost. MGL AI builds a system that answers calls and WhatsApp messages 24/7, writes bookings to your calendar and sends reminders automatically.',
    },
    heroStats: [
      {
        label: { tr: 'Çağrı kaçış ortalaması', en: 'Average missed-call rate' },
        value: { tr: '%35', en: '35%' },
      },
      {
        label: { tr: 'AI resepsiyonist', en: 'AI receptionist' },
        value: { tr: '7/24', en: '24/7' },
      },
      {
        label: { tr: 'Kurulum süresi', en: 'Setup time' },
        value: { tr: '7 gün', en: '7 days' },
      },
    ],
    painPoints: [
      {
        pain: {
          tr: 'Mesai dışı gelen 10+ randevu isteği ertesi sabaha unutulur.',
          en: '10+ after-hours booking requests are forgotten by morning.',
        },
        cost: { tr: '~45.000 TL/ay tahmini kayıp', en: '~45,000 TL/month est. loss' },
      },
      {
        pain: {
          tr: 'Sekreter öğle arasında veya tuvalet molasında 3-4 çağrıyı açamaz.',
          en: 'The receptionist misses 3-4 calls during lunch or breaks.',
        },
        cost: { tr: '~25.000 TL/ay tahmini kayıp', en: '~25,000 TL/month est. loss' },
      },
      {
        pain: {
          tr: 'No-show (gelmeyen hasta) oranı %20 seyreder; boş koltuk saati ciroyu yer.',
          en: 'No-show rate hovers at 20%; empty-chair hours eat revenue.',
        },
        cost: { tr: '~60.000 TL/ay tahmini kayıp', en: '~60,000 TL/month est. loss' },
      },
      {
        pain: {
          tr: 'WhatsApp mesajları 2-3 kişi tarafından cevaplanır, çelişen bilgi çıkar.',
          en: '2-3 staff answer WhatsApp independently; conflicting info goes out.',
        },
        cost: { tr: 'güven + zaman kaybı', en: 'trust + time loss' },
      },
      {
        pain: {
          tr: 'Tedavi sonrası Google yorum isteme unutulur; rakibin yıldız sayısı sizi geçer.',
          en: 'Post-treatment Google review requests are forgotten; competitors overtake you.',
        },
        cost: { tr: 'organik trafik kaybı', en: 'organic traffic loss' },
      },
      {
        pain: {
          tr: 'Asistan ayrıldığında hasta geçmişi ve randevu notları kaybolur.',
          en: 'When an assistant leaves, patient history and booking notes are lost.',
        },
        cost: { tr: 'kurumsal hafıza sıfırlanır', en: 'institutional memory resets' },
      },
    ],
    howItWorks: [
      {
        name: { tr: '1. Bağlıyoruz', en: '1. We connect' },
        desc: {
          tr: 'WhatsApp Business API, sesli hat (Vapi veya Retell), Google Takvim ve CRM\'inizi tek sisteme bağlıyoruz.',
          en: 'We connect WhatsApp Business API, a voice line (Vapi or Retell), Google Calendar and your CRM into a single system.',
        },
      },
      {
        name: { tr: '2. Eğitiyoruz', en: '2. We train' },
        desc: {
          tr: 'SSS, tedavi listesi, fiyat aralıkları ve randevu akışınız kliniğinize özel promptlanır — asistan "sizin kliniğiniz gibi" konuşur.',
          en: 'FAQs, treatment list, price ranges and booking flow are prompted to match your clinic — the assistant sounds like your team.',
        },
      },
      {
        name: { tr: '3. Test ediyoruz', en: '3. We test' },
        desc: {
          tr: '7 gün pilot trafiği gerçek hasta sorularıyla doğrulanır; kenar vakalar insan ekibe yönlendirilir.',
          en: 'A 7-day pilot validates real patient scenarios; edge cases hand off to a human operator.',
        },
      },
      {
        name: { tr: '4. Ölçüyoruz', en: '4. We measure' },
        desc: {
          tr: 'Haftalık rapor: karşılanan çağrı, dönüşen lead, no-show oranı, yorum sayısı — net rakam.',
          en: 'Weekly report: answered calls, converted leads, no-show rate, review count — hard numbers.',
        },
      },
    ],
    includedServices: [
      {
        skuKey: 'whatsapp-bot',
        label: { tr: 'WhatsApp AI Asistanı', en: 'WhatsApp AI Assistant' },
        blurb: {
          tr: '7/24 hasta mesajlarını karşılar, SSS yanıtlar, randevu açar.',
          en: 'Answers patient messages 24/7, handles FAQs, books appointments.',
        },
      },
      {
        skuKey: 'voice-agent',
        label: { tr: 'Sesli AI Resepsiyonist', en: 'Voice AI Receptionist' },
        blurb: {
          tr: 'Kaçan çağrıyı saniyeler içinde karşılar, randevuya yazar.',
          en: 'Picks up missed calls in seconds and writes bookings.',
        },
      },
      {
        skuKey: 'n8n-automation',
        label: { tr: 'n8n Otomasyon', en: 'n8n Automation' },
        blurb: {
          tr: 'CRM, takvim, SMS/WhatsApp hatırlatma akışlarını bağlar.',
          en: 'Wires CRM, calendar, SMS/WhatsApp reminder flows.',
        },
      },
      {
        skuKey: 'crm-setup',
        label: { tr: 'CRM Kurulumu', en: 'CRM Setup' },
        blurb: {
          tr: 'Hasta geçmişi, tedavi notu, iletişim tercihi tek panelde.',
          en: 'Patient history, treatment notes, contact preferences — one panel.',
        },
      },
    ],
    recommendedPackage: 'agents',
    packageCta: {
      tr: 'Bu sistem AI Asistan paketiyle kurulur.',
      en: 'This system is delivered with the AI Assistant package.',
    },
    faq: [
      {
        q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
        a: {
          tr: '7 iş günü: ilk 3 gün entegrasyon (WhatsApp API + sesli hat + takvim), sonraki 4 gün klinik akışının eğitimi ve test.',
          en: '7 business days: first 3 days for integration (WhatsApp API + voice line + calendar), next 4 days for clinic flow training and testing.',
        },
      },
      {
        q: { tr: 'Aylık ücret nedir?', en: 'What is the monthly fee?' },
        a: {
          tr: 'Growth tier 9.999 TL / £299 ajans ücreti. WhatsApp ve sesli API harcaması size ait, geçişli faturalandırılır (aylık yaklaşık 500-1.500 TL).',
          en: 'Growth tier 9,999 TL / £299 agency fee. WhatsApp and voice API consumption is pass-through (typically 500-1,500 TL/month), billed separately.',
        },
      },
      {
        q: {
          tr: 'Mevcut randevu sistemimle entegre olur mu?',
          en: 'Does it integrate with my existing booking system?',
        },
        a: {
          tr: 'Evet. Google Takvim, Outlook, Doctoranytime, SaluSoft, Medikal, özel sistemler API varsa — tamamı desteklenir.',
          en: 'Yes. Google Calendar, Outlook, Doctoranytime, SaluSoft, Medikal and custom systems with an API are all supported.',
        },
      },
      {
        q: {
          tr: 'Türkçe sesli asistan doğal mı konuşuyor?',
          en: 'Does the Turkish voice agent sound natural?',
        },
        a: {
          tr: 'Evet. ElevenLabs ve OpenAI\'ın Türkçe ses modelleri akıcıdır, robotik aksan yoktur. Demo hattımızı arayıp test edebilirsiniz.',
          en: 'Yes. ElevenLabs and OpenAI Turkish voice models are fluent without robotic accent. You can call our demo line to test.',
        },
      },
      {
        q: { tr: 'Hasta verisi KVKK/GDPR uyumlu mu?', en: 'Is patient data KVKK/GDPR compliant?' },
        a: {
          tr: 'Evet. Sunucular AB bölgesinde (Frankfurt), veriler şifrelidir; işleyici sözleşmesi (DPA) kurulum sırasında imzalanır.',
          en: 'Yes. Servers are in the EU (Frankfurt), data is encrypted, and a Data Processing Agreement is signed at setup.',
        },
      },
      {
        q: { tr: 'İptal edersem ne olur?', en: 'What happens if I cancel?' },
        a: {
          tr: 'Aylık sözleşme, 30 gün öncesinden haber verip iptal edersiniz. İptal sonrası akışların export\'u (n8n JSON, CRM verisi) size teslim edilir.',
          en: 'Month-to-month contract, 30-day notice to cancel. After cancellation, workflow exports (n8n JSON, CRM data) are handed over to you.',
        },
      },
      {
        q: {
          tr: 'Benzer hizmet veren rakiplerden farkınız ne?',
          en: 'How are you different from similar vendors?',
        },
        a: {
          tr: 'Tek operatör model: ses + WhatsApp + CRM + hatırlatma tek ekipten gelir. Ajans-freelancer zinciri yok, sizinle direkt kurucu çalışır.',
          en: 'Single-operator model: voice + WhatsApp + CRM + reminders from one team. No agency-freelancer chain — you work with the founder directly.',
        },
      },
      {
        q: { tr: 'Pilot imkanı var mı?', en: 'Is a pilot available?' },
        a: {
          tr: 'İlk ay %50 pilot fiyat; 30 gün sonunda doğrulanmış metrikle devam kararı verirsiniz.',
          en: '50% pilot pricing in month one; after 30 days you decide to continue based on validated metrics.',
        },
      },
    ],
    seoKeywords: {
      tr: [
        'klinik çağrı otomasyonu',
        'klinik AI resepsiyonist',
        'diş kliniği WhatsApp botu',
        'estetik klinik randevu otomasyonu',
        'no-show hatırlatma sistemi',
        'klinik CRM kurulumu',
      ],
      en: [
        'clinic call automation',
        'clinic AI receptionist',
        'dental WhatsApp bot',
        'aesthetic clinic booking automation',
        'no-show reminder system',
        'clinic CRM setup',
      ],
    },
    metaTitle: {
      tr: 'Klinik Çağrı Otomasyonu ve AI Resepsiyonist | MGL AI',
      en: 'Clinic Call Automation & AI Receptionist | MGL AI',
    },
    metaDescription: {
      tr: 'Klinikler ortalama %35 çağrı kaçırır. MGL AI\'ın sesli ve WhatsApp AI asistanı 7/24 çağrıyı karşılar, CRM\'e randevu yazar, hatırlatma gönderir. 7 günde kurulum, şeffaf aylık ücret.',
      en: 'Clinics miss ~35% of inbound calls. MGL AI voice + WhatsApp assistants answer 24/7, book appointments into your CRM, and send reminders. 7-day setup, transparent monthly pricing.',
    },
  },

  emlak: {
    slug: 'emlak',
    emberBadge: { tr: 'EMLAK OTOMASYONU', en: 'REAL ESTATE AUTOMATION' },
    displayName: { tr: 'Emlak & Gayrimenkul', en: 'Real Estate' },
    heroTitle: {
      tr: 'Lead\'leriniz rakibinize mi gidiyor?',
      en: 'Are your leads going to competitors?',
    },
    heroAnswer: {
      tr: 'Emlak sektöründe ilk 60 saniyede dönülmeyen lead\'in yaklaşık %78\'i başka emlakçıya gider. MGL AI portal ve reklam lead\'lerini WhatsApp üzerinden anında karşılar, kriterleri toplar, emlakçıya hazır brief ile teslim eder.',
      en: 'In real estate, leads not contacted in the first 60 seconds go to competitors roughly 78% of the time. MGL AI answers portal and ad leads instantly on WhatsApp, collects criteria, and hands the agent a ready brief.',
    },
    heroStats: [
      {
        label: { tr: 'İlk yanıt hedefi', en: 'First-response target' },
        value: { tr: '60 saniye', en: '60 seconds' },
      },
      {
        label: { tr: 'Portal + reklam akışı', en: 'Portal + ad channel' },
        value: { tr: 'tek sistem', en: 'one system' },
      },
      {
        label: { tr: 'Kurulum süresi', en: 'Setup time' },
        value: { tr: '14 gün', en: '14 days' },
      },
    ],
    painPoints: [
      {
        pain: {
          tr: 'Sahibinden/Zingat\'tan gelen lead 1 saat sonra görülür, rakibe gider.',
          en: 'Portal leads (Sahibinden, Zingat) are seen 1 hour late and go to rivals.',
        },
        cost: { tr: '~120.000 TL/ay tahmini komisyon kaybı', en: '~120,000 TL/month est. commission loss' },
      },
      {
        pain: {
          tr: '"3+1, balkonlu, metroya yakın" kriterleri deftere yazılır ve unutulur.',
          en: 'Client criteria ("3+1, balcony, near metro") go on paper and get forgotten.',
        },
        cost: { tr: 'portföy sirkülasyonu yavaşlar', en: 'portfolio circulation slows' },
      },
      {
        pain: {
          tr: 'Daire sunumundayken kaçan çağrılar geri aranmaz.',
          en: 'Calls missed during a showing are never returned.',
        },
        cost: { tr: '%40+ lead soğur', en: '40%+ lead cool-down' },
      },
      {
        pain: {
          tr: '"Konum atar mısın", "saat kaçtaydı" mesajları emlakçının günün yarısını yer.',
          en: '"Send location", "what time again" messages eat half the agent\'s day.',
        },
        cost: { tr: 'verimlilik kaybı', en: 'productivity loss' },
      },
      {
        pain: {
          tr: 'Portföye uyan yeni ilan çıktığında eski müşteriye dönülmez.',
          en: 'When a matching listing appears, old clients are not re-engaged.',
        },
        cost: { tr: 'tekrar satış fırsatı kaçar', en: 'repeat opportunity missed' },
      },
      {
        pain: {
          tr: 'Bayrampaşa-Nişantaşı-Ataşehir ofis arası lead paylaşımı Excel\'de yapılır.',
          en: 'Cross-office lead sharing runs on spreadsheets and falls through.',
        },
        cost: { tr: 'kayıp + iç çatışma', en: 'loss + internal conflict' },
      },
    ],
    howItWorks: [
      {
        name: { tr: '1. Bağlıyoruz', en: '1. We connect' },
        desc: {
          tr: 'Sahibinden, Hurriyet Emlak, Zingat feed\'leri + WhatsApp Business + CRM (Pipedrive veya HubSpot).',
          en: 'Sahibinden, Hurriyet Emlak, Zingat feeds + WhatsApp Business + CRM (Pipedrive or HubSpot).',
        },
      },
      {
        name: { tr: '2. Kuruyoruz', en: '2. We build' },
        desc: {
          tr: 'Kriter toplama sohbet akışı: m², oda, bütçe, semt, finansman. Portföy eşleşme kuralları CRM içinde.',
          en: 'Criteria-collection chat flow: m², rooms, budget, district, financing. Portfolio matching rules live in CRM.',
        },
      },
      {
        name: { tr: '3. Eğitiyoruz', en: '3. We train' },
        desc: {
          tr: 'Ekibinize panel, WhatsApp yönlendirme ve lead sahiplenme akışını 2 saatlik seansla aktarıyoruz.',
          en: 'We train your team on the panel, WhatsApp handoff and lead ownership flow in a 2-hour session.',
        },
      },
      {
        name: { tr: '4. Ölçüyoruz', en: '4. We measure' },
        desc: {
          tr: 'Haftalık rapor: kaynak bazlı lead, ilk yanıt süresi, sunuma dönüşüm, satışa dönüşüm oranı.',
          en: 'Weekly report: leads by source, first-response time, viewing conversion, sale conversion rate.',
        },
      },
    ],
    includedServices: [
      {
        skuKey: 'whatsapp-bot',
        label: { tr: 'WhatsApp AI Asistanı', en: 'WhatsApp AI Assistant' },
        blurb: {
          tr: 'Portal ve reklam lead\'lerini 60 saniye içinde karşılar.',
          en: 'Responds to portal and ad leads within 60 seconds.',
        },
      },
      {
        skuKey: 'crm-setup',
        label: { tr: 'CRM Kurulumu', en: 'CRM Setup' },
        blurb: {
          tr: 'Pipedrive veya HubSpot üzerine emlak portföyü yapılandırma.',
          en: 'Real-estate portfolio structure on Pipedrive or HubSpot.',
        },
      },
      {
        skuKey: 'n8n-automation',
        label: { tr: 'n8n Otomasyon', en: 'n8n Automation' },
        blurb: {
          tr: 'Portal feed → CRM → WhatsApp zinciri otomatik çalışır.',
          en: 'Portal feed → CRM → WhatsApp chain runs end-to-end.',
        },
      },
      {
        skuKey: 'meta-ads',
        label: { tr: 'Meta Reklam', en: 'Meta Ads' },
        blurb: {
          tr: 'Lead kampanyası + WhatsApp CTR optimizasyonu.',
          en: 'Lead campaigns + WhatsApp CTR optimization.',
        },
      },
    ],
    recommendedPackage: 'agents',
    packageCta: {
      tr: 'Bu sistem AI Asistan paketiyle kurulur.',
      en: 'This system is delivered with the AI Assistant package.',
    },
    faq: [
      {
        q: { tr: 'Hangi portallarla entegre olur?', en: 'Which portals are supported?' },
        a: {
          tr: 'Sahibinden.com, Hurriyet Emlak, Zingat, Emlakjet — CSV veya API ile. UK için Rightmove ve Zoopla feed\'leri de desteklenir.',
          en: 'Sahibinden.com, Hurriyet Emlak, Zingat, Emlakjet via CSV or API. Rightmove and Zoopla feeds supported for UK.',
        },
      },
      {
        q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
        a: {
          tr: '14 iş günü: portal entegrasyonu (5 gün) + CRM kurulum (4 gün) + WhatsApp akış eğitimi (5 gün).',
          en: '14 business days: portal integration (5 days) + CRM setup (4 days) + WhatsApp flow training (5 days).',
        },
      },
      {
        q: { tr: 'Aylık ücret nedir?', en: 'What is the monthly fee?' },
        a: {
          tr: 'Growth tier 9.999 TL / £299 ajans ücreti. Portal ve reklam harcaması size ait — direkt Sahibinden, Meta, Google\'a ödenir.',
          en: 'Growth tier 9,999 TL / £299 agency fee. Portal and ad spend is yours — paid directly to Sahibinden, Meta, Google.',
        },
      },
      {
        q: { tr: 'Kriterler ne kadar detaylı toplanır?', en: 'How detailed is the criteria capture?' },
        a: {
          tr: 'Oda sayısı, m² aralığı, bütçe, ilçe + semt, finansman tercihi (peşin/krediyle), aidat tolerans, balkon/otopark/asansör tercihi.',
          en: 'Room count, m² range, budget, district + neighbourhood, financing preference (cash/mortgage), maintenance fee tolerance, balcony/parking/lift preference.',
        },
      },
      {
        q: { tr: 'Birden fazla ofis varsa nasıl ayrışır?', en: 'How does routing work for multi-office firms?' },
        a: {
          tr: 'Her ofise ayrı hat + yönlendirme kuralı. Lead geldiği semte göre en uygun danışmana atanır; danışman meşgulse sıradakine geçer.',
          en: 'Per-office numbers + routing rules. Leads assign to the best-fit agent by district; if busy, they cascade to the next.',
        },
      },
      {
        q: { tr: 'Müşteri bot ile mi müzakere eder?', en: 'Does the bot negotiate?' },
        a: {
          tr: 'Hayır. Bot sadece kriter toplar, sunum randevusu açar, soruları yanıtlar. Müzakere ve fiyat konuşması insan emlakçıya geçer.',
          en: 'No. The bot only collects criteria, books showings, and answers FAQs. Negotiation and price discussion go to the human agent.',
        },
      },
      {
        q: { tr: 'CRM\'im yok, ne yapacağız?', en: 'I don\'t have a CRM — what now?' },
        a: {
          tr: 'Pipedrive veya HubSpot standart paket içinde kurulur. Lisans ücreti size ait (aylık 30-60 €/kullanıcı). Veri tamamen sizin hesabınızda.',
          en: 'Pipedrive or HubSpot setup is included. Licence fee is yours (€30-60/user/month). Data stays fully in your account.',
        },
      },
      {
        q: { tr: 'Reklam yönetimi dahil mi?', en: 'Is ad management included?' },
        a: {
          tr: 'Ayrı paket. Ads Growth tier 19.999 TL / £699 aylık; eklenirse Meta lead campaign + WhatsApp handoff kurulur.',
          en: 'Separate package. Ads Growth tier 19,999 TL / £699 monthly; when added, Meta lead campaigns + WhatsApp handoff are included.',
        },
      },
    ],
    seoKeywords: {
      tr: [
        'emlak WhatsApp botu',
        'emlak lead otomasyonu',
        'portal lead yönetimi',
        'emlakçı CRM kurulumu',
        'İstanbul emlak otomasyon',
        'Sahibinden lead asistanı',
      ],
      en: [
        'real estate WhatsApp bot',
        'real estate lead automation',
        'portal lead management',
        'real estate CRM setup',
        'London property automation',
        'Rightmove lead assistant',
      ],
    },
    metaTitle: {
      tr: 'Emlak Lead Otomasyonu ve WhatsApp Asistanı | MGL AI',
      en: 'Real Estate Lead Automation & WhatsApp Assistant | MGL AI',
    },
    metaDescription: {
      tr: 'Emlak sektöründe ilk 60 saniyede dönülmeyen lead\'in %78\'i rakibe gider. MGL AI portal ve reklam lead\'lerini WhatsApp\'tan anında karşılar, emlakçıya hazır brief teslim eder. 14 günde kurulum.',
      en: 'In real estate, 78% of leads not contacted in 60 seconds go to competitors. MGL AI instantly answers portal and ad leads via WhatsApp and hands agents a ready brief. 14-day setup.',
    },
  },

  eticaret: {
    slug: 'eticaret',
    emberBadge: { tr: 'E-TİCARET OTOMASYONU', en: 'E-COMMERCE AUTOMATION' },
    displayName: { tr: 'E-ticaret', en: 'E-commerce' },
    heroTitle: {
      tr: 'Sepet terk oranınız %70\'in üstünde mi?',
      en: 'Is your cart abandonment above 70%?',
    },
    heroAnswer: {
      tr: 'Türkiye e-ticaret sektöründe ortalama sepet terk oranı %77 civarında; terkedilen her sepet yaklaşık 650 TL kayıp potansiyeli taşır. MGL AI WhatsApp sepet kurtarma akışı, AI destek botu ve Meta/Google ROAS yönetimi bu kaybı ciroya çevirir.',
      en: 'Average cart abandonment in e-commerce sits near 77%; every abandoned cart carries roughly 650 TL of lost potential. MGL AI runs a WhatsApp cart-recovery flow, an AI support bot, and Meta/Google ROAS management to turn that loss into revenue.',
    },
    heroStats: [
      {
        label: { tr: 'Sektör ortalama sepet terk', en: 'Industry avg. abandonment' },
        value: { tr: '%77', en: '77%' },
      },
      {
        label: { tr: 'Asistan + reklam', en: 'Agents + ads' },
        value: { tr: 'tek sistem', en: 'one system' },
      },
      {
        label: { tr: 'Kurulum süresi', en: 'Setup time' },
        value: { tr: '10 gün', en: '10 days' },
      },
    ],
    painPoints: [
      {
        pain: {
          tr: 'Sepete ürün eklenir ama %70+ ödeme yapılmadan çıkılır.',
          en: '70%+ of shoppers add to cart but leave before checkout.',
        },
        cost: { tr: '~150.000 TL/ay kurtarılabilir gelir', en: '~150,000 TL/month recoverable revenue' },
      },
      {
        pain: {
          tr: 'Müşteri destek 6 saatten önce cevap veremez; müşteri rakipten alır.',
          en: 'Support takes 6+ hours to reply; the customer buys elsewhere.',
        },
        cost: { tr: '~40.000 TL/ay tahmini kayıp', en: '~40,000 TL/month est. loss' },
      },
      {
        pain: {
          tr: 'Meta reklam ROAS 2.0 altında, bütçe verimsiz yanıyor.',
          en: 'Meta ads ROAS below 2.0; budget burns inefficiently.',
        },
        cost: { tr: '~80.000 TL/ay verimsiz reklam', en: '~80,000 TL/month wasted ad spend' },
      },
      {
        pain: {
          tr: 'Stok biten ürün sitede aktif; sipariş iptali + iade gerekiyor.',
          en: 'Out-of-stock items stay active on the site; orders must be cancelled and refunded.',
        },
        cost: { tr: 'iade + güven kaybı', en: 'refund + trust cost' },
      },
      {
        pain: {
          tr: 'Trendyol-Hepsiburada-site-Instagram DM dağınık yönetilir.',
          en: 'Trendyol, Hepsiburada, web store and Instagram DMs are managed in silos.',
        },
        cost: { tr: 'saat + çelişki kaybı', en: 'hours + conflicting info' },
      },
      {
        pain: {
          tr: 'İade/değişim süreci manuel; müşteri 3 gün bekler, bir daha alışveriş yapmaz.',
          en: 'Return/exchange is manual; the customer waits 3 days and never orders again.',
        },
        cost: { tr: 'LTV (müşteri ömrü) kaybı', en: 'lifetime value loss' },
      },
    ],
    howItWorks: [
      {
        name: { tr: '1. Bağlıyoruz', en: '1. We connect' },
        desc: {
          tr: 'Shopify, WooCommerce, Ticimax veya Ikas + WhatsApp Business + Meta Pixel + Google Analytics 4 tek panelde.',
          en: 'Shopify, WooCommerce, Ticimax or Ikas + WhatsApp Business + Meta Pixel + Google Analytics 4 in one panel.',
        },
      },
      {
        name: { tr: '2. Kuruyoruz', en: '2. We build' },
        desc: {
          tr: 'Sepet terk kurtarma akışı (30 dk → 24 sa → 72 sa), destek SSS botu, sipariş/kargo durumu otomasyonu.',
          en: 'Cart recovery flow (30m → 24h → 72h), support FAQ bot, order/shipment status automation.',
        },
      },
      {
        name: { tr: '3. Reklamları alıyoruz', en: '3. We take ads' },
        desc: {
          tr: 'Meta ve Google kampanyaları, haftalık creative, UTM standardı — reklam spend\'i sizden, yönetim bizden.',
          en: 'Meta and Google campaigns, weekly creatives, UTM standard — ad spend is yours, management is ours.',
        },
      },
      {
        name: { tr: '4. Ölçüyoruz', en: '4. We measure' },
        desc: {
          tr: 'Haftalık ROAS, sepet kurtarma gelir katkısı, destek cevap süresi, LTV — tek dashboard.',
          en: 'Weekly ROAS, cart-recovery revenue contribution, support response time, LTV — one dashboard.',
        },
      },
    ],
    includedServices: [
      {
        skuKey: 'whatsapp-bot',
        label: { tr: 'WhatsApp AI Asistanı', en: 'WhatsApp AI Assistant' },
        blurb: {
          tr: 'Sepet kurtarma + destek + sipariş durumu tek botta.',
          en: 'Cart recovery + support + order status in one bot.',
        },
      },
      {
        skuKey: 'meta-ads',
        label: { tr: 'Meta Reklam', en: 'Meta Ads' },
        blurb: {
          tr: 'Lookalike + retargeting + haftalık creative testleri.',
          en: 'Lookalike + retargeting + weekly creative tests.',
        },
      },
      {
        skuKey: 'google-ads',
        label: { tr: 'Google Reklam', en: 'Google Ads' },
        blurb: {
          tr: 'Shopping + Search kampanyaları, ürün feed yönetimi.',
          en: 'Shopping + Search campaigns, product feed management.',
        },
      },
      {
        skuKey: 'n8n-automation',
        label: { tr: 'n8n Otomasyon', en: 'n8n Automation' },
        blurb: {
          tr: 'Stok + sipariş + iade + kargo akışları WhatsApp\'a bağlı.',
          en: 'Stock + order + return + shipment flows wired to WhatsApp.',
        },
      },
      {
        skuKey: 'analytics',
        label: { tr: 'Analitik Dashboard', en: 'Analytics Dashboard' },
        blurb: {
          tr: 'ROAS, sepet kurtarma, LTV — haftalık rapor.',
          en: 'ROAS, cart recovery, LTV — weekly report.',
        },
      },
    ],
    recommendedPackage: 'ads',
    packageCta: {
      tr: 'Bu sistem AI Reklam paketiyle kurulur; WhatsApp asistanı pakete cross-eklenir.',
      en: 'This system is delivered with the AI Ads package; WhatsApp assistant is cross-added.',
    },
    faq: [
      {
        q: { tr: 'Hangi platformlarla çalışır?', en: 'Which platforms are supported?' },
        a: {
          tr: 'Shopify, WooCommerce, Ticimax, İdeasoft, Ikas, Magento, özel PHP/Node siteler. API\'si veya webhook\'u olan her sistem.',
          en: 'Shopify, WooCommerce, Ticimax, İdeasoft, Ikas, Magento, custom PHP/Node stores. Any system with an API or webhook.',
        },
      },
      {
        q: { tr: 'Sepet kurtarma akışı nasıl çalışır?', en: 'How does the cart-recovery flow work?' },
        a: {
          tr: '30 dakika sonra WhatsApp hatırlatma, 24 saat sonra kişisel indirim kodu, 72 saat sonra son fırsat mesajı. Müşteri yanıtlayınca destek botuna geçer.',
          en: '30-minute WhatsApp reminder, 24-hour personal discount code, 72-hour final-chance message. When the customer replies, the support bot takes over.',
        },
      },
      {
        q: { tr: 'Reklam bütçesi nasıl yönetilir?', en: 'How is ad budget handled?' },
        a: {
          tr: 'Reklam harcaması Meta ve Google\'a direkt sizden gider — biz erişim sahibiyiz, değil ödeyen. Yönetim ücreti %10 spend + sabit ajans ücreti ayrı faturalanır.',
          en: 'Ad spend goes from you directly to Meta and Google — we have access, not payment responsibility. Management fee is 10% of spend + fixed agency fee, billed separately.',
        },
      },
      {
        q: { tr: 'Kurulum ne kadar sürer?', en: 'How long does setup take?' },
        a: {
          tr: '10 iş günü: WhatsApp bot 3 gün, reklam hesabı ve creative 5 gün, dashboard 2 gün.',
          en: '10 business days: WhatsApp bot 3 days, ad accounts and creatives 5 days, dashboard 2 days.',
        },
      },
      {
        q: { tr: 'ROAS kaç çıkacak?', en: 'What ROAS should I expect?' },
        a: {
          tr: 'Garanti vermiyoruz. ROAS ürüne, fiyat noktasına, mevsime ve geçmiş pixel datasına bağlı. İlk 3 ay trend oturuyor; optimize edilmiş kampanyalarda genelde 3+ hedeflenir.',
          en: 'No guarantees. ROAS depends on product, price point, season, pixel history. The first 3 months stabilize the trend; optimized campaigns generally target 3+.',
        },
      },
      {
        q: {
          tr: 'Trendyol ve Hepsiburada için de çalışır mı?',
          en: 'Does it work for Trendyol and Hepsiburada too?',
        },
        a: {
          tr: 'WhatsApp destek ve sipariş durumu akışı evet. Reklam optimizasyonu marketplace\'lerde sınırlı — sadece kendi siteniz için tam kapsamlı çalışır.',
          en: 'WhatsApp support and order-status flows, yes. Ad optimization on marketplaces is limited — full scope only applies to your own store.',
        },
      },
      {
        q: { tr: 'Aylık ücret nedir?', en: 'What is the monthly fee?' },
        a: {
          tr: 'Reklam Growth tier 19.999 TL / £699 + Asistan Growth tier 9.999 TL / £299. Reklam spend pass-through (asgari 50.000 TL/ay tavsiye).',
          en: 'Ads Growth tier 19,999 TL / £699 + Assistant Growth tier 9,999 TL / £299. Ad spend pass-through (50,000 TL/month minimum recommended).',
        },
      },
      {
        q: { tr: 'Pilot imkanı var mı?', en: 'Is a pilot available?' },
        a: {
          tr: 'Evet. İlk ay %50 pilot fiyat; 30 gün sonunda ROAS + sepet kurtarma metriklerine bakıp devam kararı verilir.',
          en: 'Yes. 50% pilot pricing in month one; after 30 days you decide based on ROAS + cart-recovery metrics.',
        },
      },
    ],
    seoKeywords: {
      tr: [
        'sepet terk WhatsApp kurtarma',
        'e-ticaret AI destek botu',
        'Meta ROAS optimizasyonu',
        'Shopify WhatsApp entegrasyonu',
        'WooCommerce otomasyon',
        'e-ticaret iade yönetimi',
      ],
      en: [
        'WhatsApp cart recovery',
        'e-commerce AI support bot',
        'Meta ROAS optimization',
        'Shopify WhatsApp integration',
        'WooCommerce automation',
        'e-commerce return automation',
      ],
    },
    metaTitle: {
      tr: 'E-ticaret Sepet Kurtarma ve Meta ROAS Otomasyonu | MGL AI',
      en: 'E-commerce Cart Recovery & Meta ROAS Automation | MGL AI',
    },
    metaDescription: {
      tr: 'E-ticaret ortalama sepet terk oranı %77. MGL AI WhatsApp sepet kurtarma akışı, AI destek botu ve Meta/Google ROAS yönetimini tek sistemde kurar. 10 günde canlı, şeffaf ücret.',
      en: 'E-commerce cart abandonment averages 77%. MGL AI ships a WhatsApp recovery flow, AI support bot, and Meta/Google ROAS management in one system. Live in 10 days, transparent pricing.',
    },
  },
};

export const SECTOR_KEYS: SectorKey[] = ['klinik', 'emlak', 'eticaret'];
