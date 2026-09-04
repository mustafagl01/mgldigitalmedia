import { Globe, Bot, Workflow, Megaphone, Search, CalendarCheck } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * "İşletmeniz İçin Neler Yapabiliriz?" — tek tek hizmet satmak yerine
 * işletmenin dijital altyapısını bir bütün olarak anlatır.
 * İçerik mgl.md brief'inden; başlıklar ve maddeler birebir korunmuştur.
 */

type Group = {
  icon: typeof Globe;
  titleTR: string;
  titleEN: string;
  ledeTR: string;
  ledeEN: string;
  itemsTR: string[];
  itemsEN: string[];
};

const GROUPS: Group[] = [
  {
    icon: Globe,
    titleTR: 'Web Sitesi ve Dijital Varlık',
    titleEN: 'Website and Digital Presence',
    ledeTR: 'İşletmenizi profesyonel şekilde temsil eden, hızlı ve dönüşüm odaklı dijital altyapılar kuruyoruz.',
    ledeEN: 'Fast, conversion-focused foundations that represent your business properly.',
    itemsTR: ['Kurumsal web sitesi', 'Landing page', 'Kurumsal e-posta', 'Google Business Profile', 'Google Maps kurulumu', 'QR menü', 'Online sipariş sistemleri'],
    itemsEN: ['Business website', 'Landing page', 'Business email', 'Google Business Profile', 'Google Maps setup', 'QR menu', 'Online ordering'],
  },
  {
    icon: Bot,
    titleTR: 'Yapay Zekâ Asistanları',
    titleEN: 'AI Assistants',
    ledeTR: 'Müşterilerinize siz müsait değilken bile cevap veren yapay zekâ sistemleri kuruyoruz.',
    ledeEN: 'Systems that answer your customers when you are not available.',
    itemsTR: ['WhatsApp AI asistanı', 'Web sitesi chatbotu', 'Sesli AI asistanı', 'Otomatik müşteri yanıtları', 'Çok dilli müşteri desteği', '7/24 müşteri iletişimi'],
    itemsEN: ['WhatsApp AI assistant', 'Website chatbot', 'Voice AI assistant', 'Automatic customer replies', 'Multilingual support', '24/7 customer contact'],
  },
  {
    icon: Workflow,
    titleTR: 'Otomasyon ve CRM Sistemleri',
    titleEN: 'Automation and CRM',
    ledeTR: 'Tekrarlanan işleri azaltıyor, müşteri takibini otomatik hale getiriyoruz.',
    ledeEN: 'We cut repetitive work and make customer follow-up automatic.',
    itemsTR: ['CRM kurulumu', 'Lead takibi', 'Otomatik takip mesajları', 'WhatsApp otomasyonları', 'E-posta otomasyonları', 'n8n ve özel workflow sistemleri', 'Form → CRM → WhatsApp → Takvim bağlantıları'],
    itemsEN: ['CRM setup', 'Lead tracking', 'Automatic follow-up messages', 'WhatsApp automations', 'Email automations', 'n8n and custom workflows', 'Form → CRM → WhatsApp → Calendar links'],
  },
  {
    icon: Megaphone,
    titleTR: 'Reklam ve Büyüme',
    titleEN: 'Advertising and Growth',
    ledeTR: 'Sadece görünür olmanızı değil, doğru müşterilere ulaşmanızı hedefliyoruz.',
    ledeEN: 'Not just visibility — reaching the right customers.',
    itemsTR: ['Meta Ads', 'Google Ads', 'Reklam kampanyası kurulumu', 'Lead toplama sistemleri', 'Dönüşüm optimizasyonu', 'Reklam performans takibi'],
    itemsEN: ['Meta Ads', 'Google Ads', 'Campaign setup', 'Lead capture systems', 'Conversion optimisation', 'Performance tracking'],
  },
  {
    icon: Search,
    titleTR: 'SEO ve Google Görünürlüğü',
    titleEN: 'SEO and Google Visibility',
    ledeTR: 'Müşterileriniz sizi aradığında bulunmanızı sağlıyoruz.',
    ledeEN: 'So you are found when your customers search for you.',
    itemsTR: ['SEO çalışmaları', 'Lokal SEO', 'Google Business optimizasyonu', 'Google Maps görünürlüğü', 'Teknik SEO', 'İçerik optimizasyonu', 'GEO — yapay zekâ aramalarında görünürlük'],
    itemsEN: ['SEO work', 'Local SEO', 'Google Business optimisation', 'Google Maps visibility', 'Technical SEO', 'Content optimisation', 'GEO — visibility in AI search'],
  },
  {
    icon: CalendarCheck,
    titleTR: 'Rezervasyon ve Müşteri Sistemleri',
    titleEN: 'Booking and Customer Systems',
    ledeTR: 'Müşterilerinizin size ulaşmasını, rezervasyon yapmasını ve tekrar gelmesini kolaylaştırıyoruz.',
    ledeEN: 'Easier to reach you, easier to book, easier to come back.',
    itemsTR: ['Online rezervasyon', 'Randevu sistemleri', 'Online sipariş', 'QR menü', 'Müşteri takip sistemleri', 'Sadakat programları', 'Otomatik hatırlatmalar'],
    itemsEN: ['Online booking', 'Appointment systems', 'Online ordering', 'QR menu', 'Customer tracking', 'Loyalty programmes', 'Automatic reminders'],
  },
];

const SECTORS_TR = ['Restoran ve kafeler', 'Güzellik salonları', 'Klinikler', 'Emlak firmaları', 'Danışmanlık şirketleri', 'Hizmet işletmeleri', 'Yerel işletmeler', 'E-ticaret markaları'];
const SECTORS_EN = ['Restaurants and cafés', 'Beauty salons', 'Clinics', 'Estate agencies', 'Consultancies', 'Service businesses', 'Local businesses', 'E-commerce brands'];

export function HomeCapabilities() {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section className="section" id="neler-yapabiliriz">
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 760 }}>
          {isTR ? 'İşletmeniz için neler yapabiliriz?' : 'What we can do for your business'}
        </h2>
        <p style={{ marginTop: 12, maxWidth: 660, fontSize: 'var(--t-body-lg)', color: 'var(--fg-2)', lineHeight: 1.6 }}>
          {isTR
            ? 'Tek tek hizmet satmak yerine, işletmenizin dijital altyapısını bir bütün olarak kuruyoruz.'
            : 'Rather than selling services one by one, we build your digital foundation as one system.'}
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <article
                key={g.titleTR}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)',
                  padding: '24px 26px',
                  background: 'var(--paper-2)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: 38,
                    height: 38,
                    borderRadius: 'var(--r-md)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--paper)',
                    border: '1px solid var(--border)',
                    color: 'var(--ember)',
                  }}
                >
                  <Icon size={19} aria-hidden="true" />
                </span>
                <h3 style={{ marginTop: 14, fontSize: 18 }}>{isTR ? g.titleTR : g.titleEN}</h3>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                  {isTR ? g.ledeTR : g.ledeEN}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
                  {(isTR ? g.itemsTR : g.itemsEN).map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 13.5,
                        color: 'var(--fg-2)',
                        padding: '5px 0 5px 16px',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: 'var(--ember)' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeWhoWeWorkWith() {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section className="section-tight">
      <div className="container">
        <h2 className="h3">{isTR ? 'Kimlerle çalışıyoruz?' : 'Who we work with'}</h2>
        <p style={{ marginTop: 10, maxWidth: 620, fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.6 }}>
          {isTR
            ? 'Dijital tarafta büyümek, daha profesyonel görünmek veya operasyonlarını otomatikleştirmek isteyen işletmelerle çalışıyoruz.'
            : 'We work with businesses that want to grow online, look more professional, or automate their operations.'}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(isTR ? SECTORS_TR : SECTORS_EN).map((s) => (
            <li
              key={s}
              style={{
                fontSize: 13,
                color: 'var(--fg-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-full)',
                padding: '6px 14px',
                background: 'var(--paper-2)',
              }}
            >
              {s}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 16, fontSize: 13.5, color: 'var(--fg-3)' }}>
          {isTR
            ? 'İşletmeniz bu listede olmasa bile size özel bir sistem oluşturabiliriz.'
            : 'If your business is not on this list, we can still build something that fits it.'}
        </p>
      </div>
    </section>
  );
}
