import { useLanguage } from '../contexts/LanguageContext';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../components/seo/Seo';

export default function Legal() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const seoTitle = isEN
    ? 'Legal · Privacy · KVKK · GDPR | MGL Digital Media'
    : 'Hukuki · Gizlilik · KVKK · GDPR | MGL Digital Media';
  const seoDescription = isEN
    ? 'Privacy policy, KVKK (Turkey), GDPR (EU/UK) notices, and data-handling commitments for MGL Digital Media LTD.'
    : 'MGL Digital Media LTD gizlilik politikası, KVKK (Türkiye) ve GDPR (AB/UK) bildirimleri ve veri işleme taahhütleri.';

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Legal' : 'Hukuki', path: '/legal' },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/legal"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[...BASE_SCHEMAS, breadcrumb]}
      />

      <section
        style={{
          background: 'var(--paper)',
          padding: 'clamp(64px, 5vw + 24px, 120px) 0 clamp(32px, 2vw + 16px, 56px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{isEN ? 'LEGAL' : 'HUKUKİ'}</span>
          <h1
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 1.2rem + 2.8vw, 3.25rem)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {isEN ? 'Privacy, KVKK & GDPR' : 'Gizlilik, KVKK ve GDPR'}
          </h1>
          <p className="lede" style={{ marginTop: 20, color: 'var(--fg-2)', maxWidth: 680 }}>
            {isEN
              ? 'This page summarises how MGL Digital Media LTD handles personal data under UK GDPR, EU GDPR, and Turkey\'s KVKK (Law No. 6698). Full legal text is being finalised with counsel; reach out for the current version.'
              : 'Bu sayfa MGL Digital Media LTD\'in kişisel verileri UK GDPR, AB GDPR ve Türkiye KVKK (6698 sayılı Kanun) kapsamında nasıl işlediğini özetler. Tam hukuki metin avukat incelemesindedir; güncel sürüm için iletişime geçin.'}
          </p>
          <p
            style={{
              marginTop: 20,
              display: 'inline-flex',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--ember)',
              padding: '6px 12px',
              border: '1px solid var(--ember)',
              background: 'var(--ember-soft)',
              borderRadius: 999,
              letterSpacing: '0.04em',
            }}
          >
            {isEN ? 'Last updated · 2026-04' : 'Son güncelleme · 2026-04'}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--paper-2)', padding: 'clamp(48px, 4vw + 16px, 96px) 0' }}>
        <div className="container" style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div>
            <h2 style={sectionH2}>{isEN ? '1 · Data controller' : '1 · Veri sorumlusu'}</h2>
            <p style={bodyP}>
              MGL Digital Media LTD (Company No. 16007414), 112 Bertram Road, Enfield, England, EN1 1LS.{' '}
              {isEN ? 'Contact:' : 'İletişim:'}{' '}
              <a href="mailto:info@mgldigitalmedia.com" style={linkStyle}>info@mgldigitalmedia.com</a>
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '2 · What data we collect' : '2 · Hangi verileri topluyoruz'}</h2>
            <ul style={bodyUl}>
              <li>{isEN ? 'Contact form submissions: name, phone, email, business sector.' : 'İletişim formu: isim, telefon, e-posta, sektör.'}</li>
              <li>{isEN ? 'Analytics (page views, device, referrer) in anonymised form.' : 'Analitik (sayfa görüntüleme, cihaz, referans) anonim olarak.'}</li>
              <li>{isEN ? 'Demo logs (voice/email demos) for quality review — deleted within 30 days.' : 'Demo kayıtları (sesli/e-posta) kalite incelemesi için — 30 gün içinde silinir.'}</li>
            </ul>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '3 · Legal basis' : '3 · Hukuki dayanak'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'We process data under: (a) consent for demo requests and marketing; (b) legitimate interest for sales outreach to businesses; (c) contractual necessity for active clients.'
                : 'Verileri şu temellerde işleriz: (a) demo talepleri ve pazarlama için rıza; (b) işletmelere yönelik satış iletişimi için meşru menfaat; (c) aktif müşteriler için sözleşme gerekliliği.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '4 · Where data is stored' : '4 · Veriler nerede saklanıyor'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'Primary storage is on EU-based servers (Supabase · EU West). CRM and email tools may process data in UK/EU regions. No transfer outside UK/EEA without standard contractual clauses.'
                : 'Birincil depolama AB sunucularındadır (Supabase · EU West). CRM ve e-posta araçları UK/AB bölgesinde işler. Standart sözleşme hükümleri olmadan UK/AEA dışına aktarım yapılmaz.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '5 · Your rights' : '5 · Haklarınız'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'Under GDPR/KVKK you can: access your data, correct it, request deletion, object to processing, and withdraw consent. Email info@mgldigitalmedia.com — we respond within 30 days.'
                : 'GDPR/KVKK kapsamında: verinize erişme, düzeltme, silinmesini isteme, işlemeye itiraz etme ve rızayı geri çekme hakkınız vardır. info@mgldigitalmedia.com — 30 gün içinde yanıtlıyoruz.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '6 · Cookies' : '6 · Çerezler'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'We use essential cookies for language/region preferences and an anonymous analytics cookie. No advertising cookies. Cookie banner is in preparation.'
                : 'Dil/bölge tercihleri için zorunlu çerezler ve anonim bir analitik çerezi kullanıyoruz. Reklam çerezi yok. Çerez bildirim bandı hazırlanıyor.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '7 · Complaints' : '7 · Şikayet'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'You may complain to the UK ICO (ico.org.uk) or Turkey\'s KVKK (kvkk.gov.tr). We will cooperate with any regulator inquiry.'
                : 'UK ICO\'ya (ico.org.uk) veya Türkiye KVKK Kurumu\'na (kvkk.gov.tr) şikayette bulunabilirsiniz. Düzenleyici soruşturmalarda işbirliği yaparız.'}
            </p>
          </div>

          <p style={{ ...bodyP, color: 'var(--fg-3)', fontStyle: 'italic', marginTop: 24 }}>
            {isEN
              ? 'This page is a plain-language summary. It does not replace the full privacy notice, which is being finalised with legal counsel.'
              : 'Bu sayfa sade dilli bir özettir. Hukuki danışman incelemesinde olan tam gizlilik bildirimi yerine geçmez.'}
          </p>
        </div>
      </section>
    </>
  );
}

const sectionH2: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.25rem, 1rem + 0.8vw, 1.5rem)',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  fontWeight: 500,
  color: 'var(--ink)',
  margin: '0 0 12px',
};

const bodyP: React.CSSProperties = {
  fontSize: 15,
  color: 'var(--fg-2)',
  lineHeight: 1.65,
  margin: 0,
};

const bodyUl: React.CSSProperties = {
  fontSize: 15,
  color: 'var(--fg-2)',
  lineHeight: 1.65,
  margin: 0,
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const linkStyle: React.CSSProperties = {
  color: 'var(--ember)',
  textDecoration: 'underline',
};
