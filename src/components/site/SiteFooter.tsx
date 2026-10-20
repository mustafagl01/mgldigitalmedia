import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Wordmark } from './Wordmark';

/* Footer v3 (konsey 2026-10-19): hizmete göre sütunlar, gerçek şirket kimliği.
   Linkler düz <a>; LanguageContext /en/ önekini kendisi ekliyor. */

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/mgl.ai.uk', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-gul-311090287/', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552306640065', Icon: Facebook },
];

interface Props {
  onNavigate?: (page: never, hash?: string) => void;
}

export function SiteFooter(_props: Props) {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const t = (tr: string, en: string) => (isEN ? en : tr);
  const year = new Date().getFullYear();

  const cols: Array<{ h: string; links: Array<[string, string]> }> = [
    {
      h: t('Otomasyon', 'Automation'),
      links: [
        ['/otomasyon', t('Paketler', 'Plans')],
        ['/otomasyon/talep-yakalama', t('Talep yakalama', 'Lead capture')],
        ['/otomasyon/randevu-hatirlatma', t('Randevu hatırlatma', 'Appointment reminders')],
        ['/otomasyon/odeme-takibi', t('Ödeme takibi', 'Payment chaser')],
        ['/otomasyon/evrak-toplama', t('Evrak toplama', 'Document collection')],
        ['/otomasyon/yorum-isteme', t('Yorum isteme', 'Review requests')],
        ['/ureticiler', t('Üreticiler için', 'For manufacturers')],
      ],
    },
    {
      h: t('Web, reklam, asistan', 'Web, ads, assistants'),
      links: [
        ['/web-ve-reklam', t('Web siteleri ve reklam', 'Websites and ads')],
        ['/asistanlar', t('AI telefon ve WhatsApp', 'AI phone and WhatsApp')],
        ['/fiyatlandirma', t('Fiyatlandırma', 'Pricing')],
        ['/isler', t('Yaptığımız işler', 'Our work')],
      ],
    },
    {
      h: t('Şirket', 'Company'),
      links: [
        ['/hakkimizda', t('Hakkımızda', 'About')],
        ['/iletisim', t('İletişim', 'Contact')],
        ['/gizlilik-ve-guvenlik', t('Gizlilik ve güvenlik', 'Privacy and security')],
        ['/blog', 'Blog'],
        ['/legal', t('Yasal · KVKK · GDPR', 'Legal · GDPR')],
      ],
    },
  ];

  return (
    <footer style={{ background: 'var(--coal)', color: 'var(--bone-2)', padding: 'clamp(48px,7vw,80px) 0 28px' }}>
      <div className="v3-wrap">
        <div className="v3-footer-grid" style={{ display: 'grid', gap: 36, gridTemplateColumns: '1fr' }}>
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            <Wordmark size={24} inverse />
            <p style={{ color: 'var(--bone-3)', fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 34 + 'ch' }}>
              {t('Müşteriler sizi bulsun, hiçbir talep kaçmasın, işler onayınızla yürüsün. Web, reklam, AI asistan ve otomasyon; UK ve Türkiye.', 'Get found, never miss an enquiry, let the work run with your approval. Web, ads, AI assistants and automation; UK and Türkiye.')}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', border: '1px solid var(--coal-3)', borderRadius: 8, color: 'var(--bone-2)' }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <a href="https://wa.me/447482670606" style={{ color: 'var(--bone)' }}>UK +44 7482 670606</a><br />
              <a href="https://wa.me/905318299701" style={{ color: 'var(--bone)' }}>TR +90 531 829 97 01</a>
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h} style={{ display: 'grid', gap: 2, alignContent: 'start' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '.06em', color: 'var(--bone-3)', marginBottom: 8 }}>{c.h}</div>
              {c.links.map(([href, label]) => (
                <a key={href} href={href} style={{ color: 'var(--bone-2)', fontSize: 14.5, padding: '6px 0', textDecoration: 'none' }}>{label}</a>
              ))}
            </nav>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--coal-3)', marginTop: 40, paddingTop: 20, fontSize: 12.5, color: 'var(--bone-3)', lineHeight: 1.7 }}>
          © {year} MGL Digital Media Ltd · Company No{' '}
          <a href="https://find-and-update.company-information.service.gov.uk/company/16007414" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bone-2)' }}>16007414</a>
          {' '}· Registered in England &amp; Wales · 112 Bertram Road, Enfield EN1 1LS, United Kingdom
        </div>
      </div>
      <style>{`@media (min-width: 860px){ .v3-footer-grid{ grid-template-columns: 1.4fr 1fr 1fr 1fr !important; gap: 48px !important; } }`}</style>
    </footer>
  );
}
