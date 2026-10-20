import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { WORK } from '../../content/v3';
import { Head, KapanisBandi, useV3 } from '../../components/v3/parts';

/* /hakkimizda — tek kurucu dürüstlüğü satış argümanı (konsey 2026-10-19).
   Kurucu fotoğrafı gelene kadar baş harf kartı; AI ile portre ÜRETİLMEZ. */

export default function Hakkimizda() {
  const { isEN, t } = useV3();
  return (
    <>
      <Seo
        title={t('Hakkımızda · MGL Digital Media', 'About · MGL Digital Media')}
        description={t('MGL Digital Media Ltd, İngiltere’de kayıtlı (16007414), kurucu Mustafa Gül’ün yönettiği küçük bir otomasyon ve web şirketi. UK ve Türkiye’ye hizmet verir.', 'MGL Digital Media Ltd is a small automation and web company registered in England (16007414) and run by its founder, Mustafa Gül. Serving the UK and Türkiye.')}
        path="/hakkimizda"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('Hakkımızda', 'About'), path: '/hakkimizda' }])]}
      />
      <section className="v3-section">
        <div className="v3-wrap v3-grid v3-grid--2" style={{ gap: 'clamp(24px,5vw,72px)', alignItems: 'start' }}>
          <div>
            <div className="v3-tag">{t('Hakkımızda', 'About')}</div>
            <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{t('Küçük bir şirket.', 'A small company.')}<br /><span className="soft">{t('Bilerek.', 'On purpose.')}</span></h1>
            <p className="v3-lede">
              {t(
                'MGL Digital Media, İngiltere’de kayıtlı bir şirket. Kurucusu Mustafa Gül; işletmelerin her gün elle yaptığı işleri otomatikleştiriyor, web sitesi kuruyor ve reklamlarını yönetiyor. Müşterilerimiz Londra’daki kafelerden Adana’daki bir anaokuluna, Coventry’deki bir danışmanlık firmasından inşaat şirketlerine kadar uzanıyor.',
                'MGL Digital Media is a company registered in England. Its founder, Mustafa Gül, automates the work businesses do by hand every day, builds websites and runs their ads. Clients range from cafés in London to a nursery in Adana, a consultancy in Coventry and building firms.',
              )}
            </p>
            <p className="v3-lede">
              {t(
                'Ajans büyüklüğünde görünmeye çalışmıyoruz. Sistemi kuran kişi, sonra bakımını yapan ve telefonu açan kişiyle aynı. Bu yüzden aynı anda sınırlı sayıda yeni iş alıyor, her birine yazılı kapsamla başlıyoruz.',
                'We do not pretend to be an agency of fifty. The person who builds your system is the one who maintains it and answers your messages. That is why we take on a limited number of new projects at a time and start each with a written scope.',
              )}
            </p>
          </div>
          <div className="v3-card" style={{ gap: 14 }}>
            <span className="v3-chip">{t('Şirket bilgileri', 'Company details')}</span>
            <dl style={{ margin: 0, display: 'grid', gap: 10, fontSize: '.95rem' }}>
              {[
                [t('Unvan', 'Legal name'), 'MGL Digital Media Ltd'],
                [t('Şirket numarası', 'Company number'), '16007414 (England & Wales)'],
                [t('Kayıtlı adres', 'Registered office'), '112 Bertram Road, Enfield, EN1 1LS, United Kingdom'],
                [t('Kurucu ve direktör', 'Founder and director'), 'Mustafa Gül'],
                [t('Telefon', 'Phone'), 'UK +44 7482 670606 · TR +90 531 829 97 01'],
              ].map(([a, b]) => (
                <div key={a}><dt style={{ color: 'var(--fg-3)', fontSize: '.82rem' }}>{a}</dt><dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 500 }}>{b}</dd></div>
              ))}
            </dl>
            <a className="btn btn-ghost btn-md" href="https://find-and-update.company-information.service.gov.uk/company/16007414" target="_blank" rel="noopener noreferrer">{t('Companies House kaydını görün ↗', 'View on Companies House ↗')}</a>
          </div>
        </div>
      </section>

      <section className="v3-section v3-section--white">
        <div className="v3-wrap">
          <Head tag={t('Nasıl çalışıyoruz', 'How we work')} title={t('Dört ilke.', 'Four principles.')} />
          <div className="v3-grid">
            {[
              [t('Karar sizde', 'You decide'), t('Sistem hazırlar, siz onaylarsınız. Müşterinize onaysız hiçbir şey gitmez.', 'The system prepares, you approve. Nothing reaches your customers without approval.')],
              [t('Fiyat açık', 'Open pricing'), t('Paketler ve başlangıç fiyatları sitede yazılı. Kapsam teklifte yazılı netleşir.', 'Plans and starting prices are on the site. Scope is confirmed in writing.')],
              [t('Uydurma yok', 'Nothing made up'), t('Rakam, yorum veya müşteri uydurmayız. Gösterdiğimiz her iş yayında.', 'We never invent numbers, reviews or clients. Every project we show is live.')],
              [t('Sizin araçlarınız', 'Your tools'), t('Kullandığınız e-posta, Excel, CRM veya ERP değişmez; sistem onlara bağlanır.', 'Your email, Excel, CRM or ERP stays; the system connects to it.')],
            ].map(([a, b]) => (
              <div key={a} className="v3-card"><strong className="v3-h3">{a}</strong><p>{b}</p></div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>{t(`Yayındaki ${WORK.length} müşteri sitesini görmek için: `, `To see ${WORK.length} live client websites: `)}<a href="/isler" style={{ fontWeight: 600 }}>{t('İşler →', 'Work →')}</a></p>
        </div>
      </section>
      <KapanisBandi />
    </>
  );
}
