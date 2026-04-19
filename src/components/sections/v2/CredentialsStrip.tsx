import { useLanguage } from '../../../contexts/LanguageContext';

export function CredentialsStrip() {
  const { language } = useLanguage();

  const items =
    language === 'tr'
      ? [
          ['7/24', 'Kesintisiz çalışma'],
          ['~3 sn', 'Ortalama yanıt süresi'],
          ['3 gün', 'Kurulum taahhüdü'],
          ['30+ dil', 'AI asistan desteği'],
        ]
      : [
          ['24/7', 'Always-on uptime'],
          ['~3 s', 'Average response'],
          ['3 days', 'Delivery promise'],
          ['30+ languages', 'AI agent coverage'],
        ];

  return (
    <section
      aria-label={language === 'tr' ? 'Temel taahhütler' : 'Core commitments'}
      style={{
        borderBlock: '1px solid var(--border)',
        background: 'var(--paper)',
        padding: '32px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
          }}
        >
          {items.map(([value, label], i) => (
            <div
              key={i}
              className="stat"
              style={{
                borderLeft: '2px solid var(--ember)',
                paddingLeft: 16,
              }}
            >
              <span className="stat-value" style={{ fontSize: 'clamp(1.75rem, 1rem + 1.8vw, 2.5rem)' }}>
                {value}
              </span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
