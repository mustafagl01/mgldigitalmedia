import { useLanguage } from '../../contexts/LanguageContext';

type Page = 'home' | 'services' | 'solutions' | 'packages' | 'pricing';

interface Props {
  onNavigate: (page: Page) => void;
}

export function SiteFooter({ onNavigate }: Props) {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const columns =
    language === 'tr'
      ? [
          {
            heading: 'Sistem',
            links: [
              { label: 'AI Reklam', go: 'packages' as Page },
              { label: 'AI Agent & Otomasyon', go: 'services' as Page },
              { label: 'Web Tasarım', go: 'services' as Page },
              { label: 'Sektörel Çözümler', go: 'solutions' as Page },
            ],
          },
          {
            heading: 'Firma',
            links: [
              { label: 'Paketler', go: 'packages' as Page },
              { label: 'Fiyatlar', go: 'pricing' as Page },
              { label: 'Servisler', go: 'services' as Page },
            ],
          },
        ]
      : [
          {
            heading: 'System',
            links: [
              { label: 'AI Advertising', go: 'packages' as Page },
              { label: 'AI Agents & Automation', go: 'services' as Page },
              { label: 'Web Design', go: 'services' as Page },
              { label: 'Industry Solutions', go: 'solutions' as Page },
            ],
          },
          {
            heading: 'Company',
            links: [
              { label: 'Packages', go: 'packages' as Page },
              { label: 'Pricing', go: 'pricing' as Page },
              { label: 'Services', go: 'services' as Page },
            ],
          },
        ];

  const contactHeading = language === 'tr' ? 'İletişim' : 'Contact';
  const legalHeading = language === 'tr' ? 'Hukuki' : 'Legal';
  const companyDesc =
    language === 'tr'
      ? 'AI agent, otomasyon ve dönüşüm odaklı web — KOBİ’ler için. Londra merkezli, İstanbul bağlantılı.'
      : 'AI agents, automation, and conversion-first web — for SMBs. London HQ, Istanbul roots.';

  return (
    <footer
      className="on-coal"
      style={{
        background: 'var(--coal)',
        color: 'var(--bone)',
        padding: '80px 0 40px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 48,
          }}
          className="footer-grid"
        >
          {/* Brand block */}
          <div style={{ maxWidth: 360 }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--bone)',
              }}
            >
              mgl<span style={{ color: 'var(--ember)', fontStyle: 'italic', fontWeight: 500 }}>ai</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--bone-3)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginLeft: 10,
                }}
              >
                / digital
              </span>
            </div>
            <p style={{ marginTop: 16, color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.6 }}>
              {companyDesc}
            </p>
            <div
              style={{
                marginTop: 20,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--bone-3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span>MGL Digital Media LTD</span>
              <span>London · Istanbul</span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--bone-3)',
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <button
                      onClick={() => onNavigate(l.go)}
                      style={{
                        color: 'var(--bone-2)',
                        fontSize: 14,
                        background: 'transparent',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--bone-3)',
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              {contactHeading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li>
                <a href="mailto:info@mgldigitalmedia.com" style={{ color: 'var(--bone-2)' }}>
                  info@mgldigitalmedia.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/905318299701" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bone-2)' }}>
                  WhatsApp: +90 531 829 97 01
                </a>
              </li>
              <li>
                <a href="tel:+447414605612" style={{ color: 'var(--bone-2)' }}>
                  {language === 'tr' ? 'Sesli asistan: +44 7414 605612' : 'Voice agent: +44 7414 605612'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr
          style={{
            marginTop: 64,
            border: 0,
            borderTop: '1px solid var(--coal-3)',
          }}
        />

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--bone-3)',
          }}
        >
          <span>© {year} MGL Digital Media LTD</span>
          <span>{legalHeading} · KVKK · GDPR</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.2fr !important; gap: 48px !important; }
        }
      `}</style>
    </footer>
  );
}
