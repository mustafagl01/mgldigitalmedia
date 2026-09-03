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
              ? 'This notice explains what information MGL Digital Media LTD collects through this website, why it is used, which providers may process it and how you can exercise your rights.'
              : 'Bu bildirim, MGL Digital Media LTD’in bu web sitesi üzerinden hangi bilgileri topladığını, neden kullandığını, hangi sağlayıcıların işleyebileceğini ve haklarınızı nasıl kullanacağınızı açıklar.'}
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
            {isEN ? 'Last updated · 3 September 2026' : 'Son güncelleme · 3 Eylül 2026'}
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
              <li>{isEN ? 'Chat and demo content: the messages you send, call or email request details, page and preferred language.' : 'Sohbet ve demo içeriği: gönderdiğiniz mesajlar, arama veya e-posta talebi bilgileri, sayfa ve dil tercihi.'}</li>
              <li>{isEN ? 'If you consent: page views, device information, referrer and advertising interaction data.' : 'Onay verirseniz: sayfa görüntüleme, cihaz bilgisi, yönlendiren sayfa ve reklam etkileşim verileri.'}</li>
              <li>{isEN ? 'Account and payment data: email, account session and Stripe transaction references. We do not receive your full card number.' : 'Hesap ve ödeme verisi: e-posta, hesap oturumu ve Stripe işlem referansları. Kart numaranızın tamamını görmeyiz.'}</li>
            </ul>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '3 · Legal basis' : '3 · Hukuki dayanak'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'We rely on consent for optional analytics, advertising measurement and requested marketing; steps requested before entering a contract and contractual necessity for orders and active clients; legal obligations for accounting; and legitimate interests for security, fraud prevention and responding to business enquiries. You may withdraw consent at any time.'
                : 'İsteğe bağlı analitik, reklam ölçümü ve talep edilen pazarlama için rızaya; sipariş ve aktif müşteriler için sözleşme öncesi adımlar ile sözleşmenin gerekliliğine; muhasebe için yasal yükümlülüklere; güvenlik, dolandırıcılığı önleme ve işletme taleplerini yanıtlama için meşru menfaate dayanırız. Rızanızı istediğiniz zaman geri çekebilirsiniz.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '4 · Where data is stored' : '4 · Veriler nerede saklanıyor'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'We use service providers for hosting and security (Cloudflare), workflow processing, business email, payments (Stripe), and—only after consent—analytics and advertising measurement (Google and Meta). These providers may process data in the UK, EEA or other countries under their contractual transfer safeguards. We share only what is needed for the stated purpose and do not sell personal data.'
                : 'Barındırma ve güvenlik (Cloudflare), iş akışı işleme, kurumsal e-posta, ödeme (Stripe) ve yalnızca onaydan sonra analitik/reklam ölçümü (Google ve Meta) için hizmet sağlayıcıları kullanırız. Bu sağlayıcılar, sözleşmelerindeki aktarım güvenceleri kapsamında veriyi UK, AEA veya başka ülkelerde işleyebilir. Yalnızca belirtilen amaç için gereken veriyi paylaşır, kişisel verileri satmayız.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '5 · Your rights' : '5 · Haklarınız'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'Depending on the law that applies, you may ask to access, correct, delete, restrict or receive your data, object to certain processing and withdraw consent. Email info@mgldigitalmedia.com. We normally respond within one month; identity verification may be required.'
                : 'Uygulanan mevzuata göre verinize erişme, düzeltme, silme, işlemeyi kısıtlama veya veriyi alma; belirli işlemlere itiraz etme ve rızayı geri çekme haklarınız olabilir. info@mgldigitalmedia.com adresine yazabilirsiniz. Normalde bir ay içinde yanıt veririz; kimlik doğrulaması isteyebiliriz.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '6 · Cookies' : '6 · Çerezler'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'Essential local storage remembers language, region, session and your consent choice. Google Analytics and Meta advertising measurement are not loaded unless you select “Accept”. Selecting “Reject” leaves those tools disabled. You can reset your choice below.'
                : 'Zorunlu yerel depolama; dil, bölge, oturum ve onay tercihinizi hatırlar. Google Analytics ve Meta reklam ölçümü yalnızca “Kabul et” seçeneğine basarsanız yüklenir. “Reddet” seçeneği bu araçları kapalı tutar. Tercihinizi aşağıdan sıfırlayabilirsiniz.'}
            </p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ marginTop: 16 }}
              onClick={() => {
                window.localStorage.removeItem('mgl-cookie-consent-v1');
                window.location.reload();
              }}
            >
              {isEN ? 'Reset cookie choice' : 'Çerez tercihini sıfırla'}
            </button>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '7 · Retention and security' : '7 · Saklama ve güvenlik'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'Enquiry and demo data is normally kept for up to 30 days unless you become a client or ask us to continue the conversation. Contract, invoice and transaction records are retained for the period required by law. We use access controls, encrypted transport and provider security controls, but no internet service can promise absolute security.'
                : 'Talep ve demo verileri, müşteri olmadığınız veya görüşmenin sürmesini istemediğiniz durumda normalde en fazla 30 gün tutulur. Sözleşme, fatura ve işlem kayıtları yasal süre boyunca saklanır. Erişim kontrolü, şifreli aktarım ve sağlayıcı güvenlik önlemleri kullanırız; ancak hiçbir internet hizmeti mutlak güvenlik vaat edemez.'}
            </p>
          </div>

          <div>
            <h2 style={sectionH2}>{isEN ? '8 · Complaints' : '8 · Şikayet'}</h2>
            <p style={bodyP}>
              {isEN
                ? 'You may complain to the UK ICO (ico.org.uk) or Turkey\'s KVKK (kvkk.gov.tr). We will cooperate with any regulator inquiry.'
                : 'UK ICO\'ya (ico.org.uk) veya Türkiye KVKK Kurumu\'na (kvkk.gov.tr) şikayette bulunabilirsiniz. Düzenleyici soruşturmalarda işbirliği yaparız.'}
            </p>
          </div>

          <p style={{ ...bodyP, color: 'var(--fg-3)', fontStyle: 'italic', marginTop: 24 }}>
            {isEN ? 'If a client project uses additional providers or categories of personal data, the contract and project-specific notice take precedence for that processing.' : 'Bir müşteri projesi ek sağlayıcılar veya özel veri kategorileri kullanıyorsa, o işlem için sözleşme ve projeye özel bildirim önceliklidir.'}
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
