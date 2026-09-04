import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * Brief'in en kritik cümlesi burada yaşıyor:
 * "Sadece web sitesi yapmıyoruz. İşletmenizin dijital sistemlerinin
 *  birbiriyle çalışmasını sağlıyoruz."
 * Bu cümle MGL'yi klasik web ajansından ayıran şey.
 */

const FLOW_TR = ['Google Reklamı', 'Web Sitesi', 'Form', 'CRM', 'WhatsApp Mesajı', 'Randevu', 'Otomatik Takip'];
const FLOW_EN = ['Google Ad', 'Website', 'Form', 'CRM', 'WhatsApp message', 'Booking', 'Automatic follow-up'];

const HOW_TR = [
  { n: '1', t: 'İşletmenizi dinliyoruz', d: 'Neye ihtiyacınız olduğunu ve şu anda nerede zaman veya müşteri kaybettiğinizi belirliyoruz.' },
  { n: '2', t: 'Sistemi tasarlıyoruz', d: 'Size gereksiz hizmet satmak yerine, gerçekten ihtiyaç duyduğunuz çözümü oluşturuyoruz.' },
  { n: '3', t: 'Kuruyoruz', d: 'Web sitesi, reklam, AI, otomasyon veya gerekli diğer altyapıları hayata geçiriyoruz.' },
  { n: '4', t: 'Geliştiriyoruz', d: 'Sonuçlara göre sistemi optimize ediyor ve gerektiğinde yeni otomasyonlar ekliyoruz.' },
];

const HOW_EN = [
  { n: '1', t: 'We listen', d: 'We work out what you need and where you are currently losing time or customers.' },
  { n: '2', t: 'We design the system', d: 'Instead of selling you extras, we build what you actually need.' },
  { n: '3', t: 'We build it', d: 'Website, advertising, AI, automation or whatever the job requires.' },
  { n: '4', t: 'We improve it', d: 'We tune the system against results and add automations when they earn their place.' },
];

const WHY_TR = [
  { t: 'Tek bir muhatap', d: 'Web sitesi için başka, reklam için başka, otomasyon için başka şirketle çalışmak zorunda kalmazsınız.' },
  { t: 'İhtiyaca göre sistem', d: 'Hazır paketleri zorla satmak yerine işletmenize uygun yapı kuruyoruz.' },
  { t: 'Modern teknoloji', d: 'Yapay zekâ, otomasyon ve güncel dijital araçları gerçek işletme problemlerini çözmek için kullanıyoruz.' },
  { t: 'Sonuç odaklı yaklaşım', d: 'Sadece güzel görünen şeyler değil, işletmenize gerçekten fayda sağlayan sistemler kurmayı hedefliyoruz.' },
];

const WHY_EN = [
  { t: 'One point of contact', d: 'No separate agency for the website, another for ads and another for automation.' },
  { t: 'Built to fit', d: 'We shape the system around your business instead of pushing a fixed package.' },
  { t: 'Current technology', d: 'AI, automation and modern tooling used on real business problems, not for show.' },
  { t: 'Focused on outcomes', d: 'The aim is a system that helps the business, not one that only looks good.' },
];

export function HomeConnectedSystems() {
  const { language } = useLanguage();
  const isTR = language === 'tr';
  const flow = isTR ? FLOW_TR : FLOW_EN;

  return (
    <section className="section on-coal">
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 620 }}>
          {isTR ? 'Sadece web sitesi yapmıyoruz' : 'We do not just build websites'}
        </h2>
        <p style={{ marginTop: 14, maxWidth: 620, fontSize: 'var(--t-body-lg)', lineHeight: 1.6, color: 'var(--fg-2)' }}>
          {isTR
            ? 'İşletmenizin dijital sistemlerinin birbiriyle çalışmasını sağlıyoruz.'
            : 'We make your digital systems work together.'}
        </p>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '30px 0 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {flow.map((step, i) => (
            <li key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  padding: '9px 15px',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--r-md)',
                  background: 'var(--surface)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </span>
              {i < flow.length - 1 && (
                <span aria-hidden="true" style={{ color: 'var(--ember)', fontSize: 15 }}>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <p style={{ marginTop: 24, maxWidth: 640, fontSize: 14.5, lineHeight: 1.65, color: 'var(--fg-2)' }}>
          {isTR
            ? 'Bir müşteri size ulaştığında sürecin kaybolmadığı, mümkün olduğunca otomatik ilerleyen bir yapı kuruyoruz.'
            : 'When someone contacts you, nothing gets lost and as much of the process as possible runs on its own.'}
        </p>
      </div>
    </section>
  );
}

export function HomeHowWeWork() {
  const { language } = useLanguage();
  const isTR = language === 'tr';
  const steps = isTR ? HOW_TR : HOW_EN;

  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">{isTR ? 'Nasıl çalışıyoruz?' : 'How we work'}</h2>
        <div
          style={{
            marginTop: 28,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {steps.map((s) => (
            <div key={s.n}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--ember)',
                  letterSpacing: '0.12em',
                }}
              >
                {s.n}
              </span>
              <h3 style={{ marginTop: 8, fontSize: 17 }}>{s.t}</h3>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeWhyMgl() {
  const { language } = useLanguage();
  const isTR = language === 'tr';
  const reasons = isTR ? WHY_TR : WHY_EN;

  return (
    <section className="section-tight">
      <div className="container">
        <h2 className="h2">{isTR ? 'Neden MGL?' : 'Why MGL'}</h2>
        <div
          style={{
            marginTop: 26,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {reasons.map((r) => (
            <div
              key={r.t}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '20px 22px',
                background: 'var(--paper-2)',
              }}
            >
              <h3 style={{ fontSize: 16 }}>{r.t}</h3>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
