import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * "Sizin Probleminiz Hangisi?" — ziyaretçi hizmet adı değil kendi derdini arar.
 * Her kart bir dert ve onu çözen sayfaya giden tek bir yol.
 * İçerik mgl.md brief'inden.
 */

type Problem = {
  titleTR: string;
  titleEN: string;
  bodyTR: string;
  bodyEN: string;
  ctaTR: string;
  ctaEN: string;
  href: string;
};

const PROBLEMS: Problem[] = [
  {
    titleTR: 'Müşteriler beni Google\'da bulamıyor.',
    titleEN: 'Customers cannot find me on Google.',
    bodyTR: 'Google, SEO, Google Maps, Meta Ads ve Google Ads ile işletmenizin daha fazla kişiye ulaşmasını sağlıyoruz.',
    bodyEN: 'We use Google, SEO, Maps, Meta Ads and Google Ads to put your business in front of more people.',
    ctaTR: 'Çözümleri gör',
    ctaEN: 'See the solutions',
    href: '/packages#ads',
  },
  {
    titleTR: 'Mesajlara ve aramalara yetişemiyorum.',
    titleEN: 'I cannot keep up with messages and calls.',
    bodyTR: 'Müşterilerinize 7/24 cevap verebilen WhatsApp, web ve sesli yapay zekâ asistanları kuruyoruz.',
    bodyEN: 'We set up WhatsApp, web and voice AI assistants that answer your customers around the clock.',
    ctaTR: 'AI çözümlerini gör',
    ctaEN: 'See the AI solutions',
    href: '/packages#agents',
  },
  {
    titleTR: 'Müşteri ve işler dağınık ilerliyor.',
    titleEN: 'Customers and jobs are tracked all over the place.',
    bodyTR: 'Müşteri takibi, mesajlar, formlar, rezervasyonlar ve takip süreçlerini otomatikleştiriyoruz.',
    bodyEN: 'We automate customer follow-up, messages, forms, bookings and reminders.',
    ctaTR: 'Otomasyonları gör',
    ctaEN: 'See the automations',
    href: '/n8n-otomasyon',
  },
  {
    titleTR: 'Trafik geliyor ama müşteriye dönüşmüyor.',
    titleEN: 'Traffic arrives but does not turn into customers.',
    bodyTR: 'Web sitesi, Google Business, kurumsal e-posta ve marka altyapınızı birlikte kuruyoruz.',
    bodyEN: 'We build the website, Google Business profile, business email and brand basics together.',
    ctaTR: 'Dijital varlığımı güçlendir',
    ctaEN: 'Strengthen my presence',
    href: '/packages#web',
  },
  {
    titleTR: 'Rezervasyon ve siparişleri daha kolay almak istiyorum.',
    titleEN: 'I want bookings and orders to be easier.',
    bodyTR: 'Online rezervasyon, sipariş, QR menü ve otomatik müşteri iletişim sistemleri kuruyoruz.',
    bodyEN: 'We set up online booking, ordering, QR menus and automatic customer messaging.',
    ctaTR: 'Sistemleri incele',
    ctaEN: 'Explore the systems',
    href: '/services',
  },
];

const STEPS = [
  {
    n: '1',
    titleTR: 'Bulunun',
    titleEN: 'Get found',
    bodyTR: 'Google, Maps, SEO ve GEO ile müşterilerinizin sizi bulmasını sağlarız.',
    bodyEN: 'Google, Maps, SEO and GEO so customers can find you.',
  },
  {
    n: '2',
    titleTR: 'İlgi Çekin',
    titleEN: 'Earn attention',
    bodyTR: 'Web siteniz, markanız ve reklamlarınızla güven oluştururuz.',
    bodyEN: 'Your site, brand and advertising build trust.',
  },
  {
    n: '3',
    titleTR: 'Müşteri Kazanın',
    titleEN: 'Win the customer',
    bodyTR: 'Formlar, WhatsApp, telefon ve rezervasyon sistemleriyle gelen ilgiyi müşteriye dönüştürürüz.',
    bodyEN: 'Forms, WhatsApp, phone and booking turn interest into customers.',
  },
  {
    n: '4',
    titleTR: 'Otomatikleştirin',
    titleEN: 'Automate',
    bodyTR: 'Mesajları, müşteri takibini ve tekrar eden operasyonları otomatik hale getiririz.',
    bodyEN: 'Messages, follow-up and repetitive operations run on their own.',
  },
  {
    n: '5',
    titleTR: 'Müşteriyi Koruyun',
    titleEN: 'Keep the customer',
    bodyTR: 'CRM, sadakat sistemleri ve otomatik takiplerle mevcut müşterilerinizle ilişkinizi güçlendiririz.',
    bodyEN: 'CRM, loyalty and automatic follow-up strengthen existing relationships.',
  },
];

export function HomeProblems() {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section className="section on-coal" id="probleminiz">
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 620 }}>
          {isTR ? 'Sizin probleminiz hangisi?' : 'Which one is your problem?'}
        </h2>

        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 18,
          }}
        >
          {PROBLEMS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '22px 24px',
                background: 'var(--surface)',
                color: 'inherit',
                transition: 'border-color var(--d-base) var(--ease-out)',
              }}
            >
              <h3 style={{ fontSize: 17, lineHeight: 1.35 }}>{isTR ? p.titleTR : p.titleEN}</h3>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                {isTR ? p.bodyTR : p.bodyEN}
              </p>
              <span
                style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ember)',
                }}
              >
                {isTR ? p.ctaTR : p.ctaEN}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeJourney() {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 780 }}>
          {isTR
            ? 'İşletmenizin dijital yolculuğunu tek bir sistem haline getiriyoruz'
            : 'We turn your digital journey into one system'}
        </h2>
        <p
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.04em',
            color: 'var(--ember)',
          }}
        >
          {isTR
            ? 'Bulunun → İlgi Çekin → Müşteri Kazanın → Otomatikleştirin → Müşteriyi Koruyun'
            : 'Get found → Earn attention → Win the customer → Automate → Keep the customer'}
        </p>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '30px 0 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 18,
          }}
        >
          {STEPS.map((s) => (
            <li
              key={s.n}
              style={{
                borderTop: '2px solid var(--ember)',
                paddingTop: 14,
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>{s.n}</span>
              <h3 style={{ marginTop: 6, fontSize: 16 }}>{isTR ? s.titleTR : s.titleEN}</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                {isTR ? s.bodyTR : s.bodyEN}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
