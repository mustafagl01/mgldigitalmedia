import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { useV3, WHATSAPP, WHATSAPP_TR, CALENDAR } from '../../components/v3/parts';

/* /iletisim — önce büyük dokunulacak düğmeler, sonra adres/sicil (Wize dersi, TUZAK §22).
   Form yok: kullanıcı telefondan yönetiyor, WhatsApp ana kanal (konsey kararı). */

export default function Iletisim() {
  const { isEN, t } = useV3();
  return (
    <>
      <Seo
        title={t('İletişim · MGL Digital Media', 'Contact · MGL Digital Media')}
        description={t('WhatsApp, telefon veya e-postayla ulaşın. UK +44 7482 670606, TR +90 531 829 97 01.', 'Reach us on WhatsApp, phone or email. UK +44 7482 670606, TR +90 531 829 97 01.')}
        path="/iletisim"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('İletişim', 'Contact'), path: '/iletisim' }])]}
      />
      <section className="v3-section">
        <div className="v3-wrap" style={{ maxWidth: 960 }}>
          <div className="v3-tag">{t('İletişim', 'Contact')}</div>
          <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{t('İşinizi anlatın.', 'Tell us about the work.')}<br /><span className="soft">{t('Birkaç cümle yeter.', 'A few lines is enough.')}</span></h1>
          <p className="v3-lede">{t('En hızlı yol WhatsApp. Mesai dışında da telefondan bakıyoruz; genelde aynı gün dönüyoruz.', 'WhatsApp is fastest. We check messages after hours too and usually reply the same day.')}</p>
          <div className="v3-contact">
            <a className="wa" href={isEN ? WHATSAPP : WHATSAPP_TR} target="_blank" rel="noopener noreferrer"><strong>WhatsApp</strong><span>{isEN ? '+44 7482 670606' : '+90 531 829 97 01'}</span></a>
            <a href={isEN ? 'tel:+447482670606' : 'tel:+905318299701'}><strong>{t('Arayın', 'Call')}</strong><span>{isEN ? '+44 7482 670606' : '+90 531 829 97 01'}</span></a>
            <a href="mailto:info@mgldigitalmedia.com"><strong>{t('E-posta', 'Email')}</strong><span>info@mgldigitalmedia.com</span></a>
            <a href={CALENDAR} target="_blank" rel="noopener noreferrer"><strong>{t('Görüşme planlayın', 'Book a call')}</strong><span>{t('15 dakika, Google Meet', '15 minutes, Google Meet')}</span></a>
          </div>
          <div className="v3-card" style={{ marginTop: 32, gap: 6 }}>
            <span className="v3-chip">{t('Şirket', 'Company')}</span>
            <p style={{ color: 'var(--ink)' }}>MGL Digital Media Ltd · {t('Şirket no', 'Company no')} 16007414 (England &amp; Wales)</p>
            <p>112 Bertram Road, Enfield, EN1 1LS, United Kingdom</p>
            <p>{t('Diğer numara', 'Other number')}: {isEN ? 'TR +90 531 829 97 01' : 'UK +44 7482 670606'}</p>
          </div>
        </div>
      </section>
    </>
  );
}
