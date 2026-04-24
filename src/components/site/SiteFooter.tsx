import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/mgl.ai.uk', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-gul-311090287/', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552306640065', Icon: Facebook },
];

type Page = 'home' | 'services' | 'solutions' | 'packages' | 'pricing' | 'legal';

interface Props {
  onNavigate: (page: Page, hash?: string) => void;
}

export function SiteFooter({ onNavigate }: Props) {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const columns =
    language === 'tr'
      ? [
          {
            heading: 'Paketler',
            links: [
              { label: 'AI Reklam', go: 'packages' as Page, hash: 'ads' },
              { label: 'AI Agent & Otomasyon', go: 'packages' as Page, hash: 'agents' },
              { label: 'Dönüşüm Odaklı Web', go: 'packages' as Page, hash: 'web' },
              { label: 'Sektörel Çözümler', go: 'solutions' as Page },
            ],
          },
          {
            heading: 'Firma',
            links: [
              { label: 'ROI Simülasyonu', go: 'pricing' as Page },
              { label: '11 Servisin Tamamı', go: 'services' as Page },
              { label: 'Paketler', go: 'packages' as Page },
            ],
          },
        ]
      : [
          {
            heading: 'Packages',
            links: [
              { label: 'AI Advertising', go: 'packages' as Page, hash: 'ads' },
              { label: 'AI Agents & Automation', go: 'packages' as Page, hash: 'agents' },
              { label: 'Conversion-first Web', go: 'packages' as Page, hash: 'web' },
              { label: 'Industry Solutions', go: 'solutions' as Page },
            ],
          },
          {
            heading: 'Company',
            links: [
              { label: 'ROI Simulator', go: 'pricing' as Page },
              { label: 'All 11 Services', go: 'services' as Page },
              { label: 'Packages', go: 'packages' as Page },
            ],
          },
        ];

  const contactHeading = language === 'tr' ? 'İletişim' : 'Contact';
  const legalHeading = language === 'tr' ? 'Hukuki' : 'Legal';
  const companyDesc =
    language === 'tr'
      ? 'AI asistan, otomasyon ve dönüşüm odaklı web — işletmeler ve kurumlar için. Londra merkezli, Türkiye ve Birleşik Krallık\'ta uzaktan hizmet.'
      : 'AI assistants, automation, and conversion-first web — for businesses and enterprises. London HQ, serving the UK & Turkey remotely.';

  return (
    <footer
      id="contact"
      className="on-coal"
      style={{
        background: 'var(--coal)',
        color: 'var(--bone)',
        padding: '80px 0 40px',
        marginTop: 'auto',
        scrollMarginTop: 80,
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
                  letterSpacing: '0.14em',
                  marginLeft: 10,
                }}
              >
                / systems
              </span>
            </div>
            <p style={{ marginTop: 16, color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.6 }}>
              {companyDesc}
            </p>
            <div
              lang="en"
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
              <span>London, United Kingdom</span>
            </div>

            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--coal-3)',
                    color: 'var(--bone-2)',
                    transition: 'all 160ms var(--ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--ember)';
                    e.currentTarget.style.color = 'var(--coal)';
                    e.currentTarget.style.borderColor = 'var(--ember)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--bone-2)';
                    e.currentTarget.style.borderColor = 'var(--coal-3)';
                  }}
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              ))}
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
                      onClick={() => onNavigate(l.go, l.hash)}
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
          <span lang="en">© {year} MGL Digital Media LTD</span>
          <button
            onClick={() => onNavigate('legal')}
            style={{
              background: 'transparent',
              border: 0,
              padding: 0,
              color: 'var(--bone-3)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              letterSpacing: 'inherit',
              textTransform: 'inherit',
              cursor: 'pointer',
              textDecoration: 'underline',
              textDecorationColor: 'var(--coal-3)',
              textUnderlineOffset: 4,
            }}
          >
            {legalHeading} · KVKK · GDPR
          </button>
        </div>

        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            color: 'var(--bone-3)',
            opacity: 0.7,
            lineHeight: 1.6,
          }}
        >
          {language === 'tr'
            ? 'Company No 16007414 · Registered in England & Wales · Registered Office: 112 Bertram Road, Enfield EN1 1LS, United Kingdom.'
            : 'Company No 16007414 · Registered in England & Wales · Registered Office: 112 Bertram Road, Enfield EN1 1LS, United Kingdom.'}
        </p>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.2fr !important; gap: 48px !important; }
        }
      `}</style>
    </footer>
  );
}
