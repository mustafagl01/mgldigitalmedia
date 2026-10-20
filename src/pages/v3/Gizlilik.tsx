import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { Head, KapanisBandi, useV3 } from '../../components/v3/parts';

/* /gizlilik-ve-guvenlik — veri, onay noktaları, iade ve deneme şartları tek yerde (konsey 2026-10-19).
   Yasal metnin tamamı /legal'da kalır. */

export default function Gizlilik() {
  const { isEN, t } = useV3();
  const blocks: Array<[string, string[]]> = [
    [t('Onay noktaları', 'Approval points'), [
      t('Müşterinize giden her mesaj, fiyat ve teklif varsayılan olarak onayınızı bekler.', 'Every message, price and quote to your customers waits for your approval by default.'),
      t('Hatırlatma gibi sabit mesajlar, metinlerini yazılı olarak onayladıktan sonra otomatik gönderilir.', 'Fixed messages such as reminders go automatically once you have approved their wording in writing.'),
      t('Sistem fiyat, teknik veya hukuki karar vermez.', 'The system never makes pricing, technical or legal decisions.'),
    ]],
    [t('Verileriniz', 'Your data'), [
      t('Verileriniz yalnızca kurulan iş için işlenir. MGL verilerinizi model eğitimi için kullanmaz; kullanılan sağlayıcılar ve ayarları teklifte yazılır.', 'Your data is processed only for the agreed work. MGL does not use it to train models; the providers used and their settings are listed in the proposal.'),
      t('Dosyalar mümkün olduğunca sizin hesaplarınızda (Google Drive, OneDrive, ERP) kalır.', 'Files stay in your own accounts (Google Drive, OneDrive, ERP) wherever possible.'),
      t('İsterseniz gizlilik sözleşmesi (NDA) imzalarız; KVKK ve UK GDPR şartları teklifte yazılıdır.', 'We sign an NDA on request; GDPR and KVKK terms are written into the proposal.'),
      t('Teknik olarak uygunsa sistem tamamen sizin sunucunuzda veya hesabınızda kurulur.', 'Where technically suitable, the whole system runs on your own server or account.'),
    ]],
    [t('Deneme ve iade', 'Trial and refund'), [
      t('Hazır otomasyon: önce canlı demo; kurulumdan sonraki 14 gün içinde memnun kalmazsanız kurulum ücreti iade edilir ve abonelik başlamadan sona erer.', 'Ready-made: live demo first; if you are not happy within 14 days of setup, the setup fee is refunded and the subscription ends before it starts.'),
      t('Bağlantılı: Kendi verinizle tek bir akışı 14 gün ücretsiz deneyin; beğenirseniz kurulum ücretini ödeyerek devam edin.', 'Connected: one workflow on your own data, free for 14 days; continue with the setup fee if you like it.'),
      t('Kapsamlı: Önce başarı ölçütü yazılır; ardından tek bir belge türü veya süreçle 14 gün ücretsiz deneme yapılır.', 'Complex: the free 14-day trial covers one document type or one process; success criteria are written first.'),
      t('Ücretli plana otomatik geçiş yok. Devam etmezseniz deneme için bizdeki kopyalar silinir; kendi hesaplarınızdaki veriler sizde kalır.', 'No automatic switch to a paid plan. If you stop, the trial copies we hold are deleted; data in your own accounts stays with you.'),
    ]],
    [t('Sahiplik ve iptal', 'Ownership and cancellation'), [
      t('Web siteleri tek seferlik satın alınır ve sizin olur; ilk yıl barındırma dahildir.', 'Websites are a one-off purchase and belong to you; the first year of hosting is included.'),
      t('Asgari süreler: Hazır otomasyon 3 ay, Bağlantılı 6 ay, Kapsamlı 12 ay; süre canlıya alındığı gün başlar.', 'Minimum terms: Ready-made 3 months, Connected 6, Complex 12; the term starts on go-live.'),
      t('Reklam yönetimi ve asistanların aylık ücreti istediğiniz zaman durdurulabilir; asistan kullanım paketleri yanmaz; reklam bütçesi doğrudan platforma ödenir.', 'Ads management and assistant monthly fees can be stopped any time; assistant usage bundles never expire; ad spend is paid directly to the platform.'),
    ]],
  ];
  return (
    <>
      <Seo
        title={t('Gizlilik ve güvenlik · MGL', 'Privacy and security · MGL')}
        description={t('Onay noktaları, veri işleme, NDA, KVKK/GDPR, deneme ve iade şartları.', 'Approval points, data handling, NDA, GDPR/KVKK, trial and refund terms.')}
        path="/gizlilik-ve-guvenlik"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('Gizlilik ve güvenlik', 'Privacy and security'), path: '/gizlilik-ve-guvenlik' }])]}
      />
      <section className="v3-section">
        <div className="v3-wrap" style={{ maxWidth: 960 }}>
          <div className="v3-tag">{t('Gizlilik ve güvenlik', 'Privacy and security')}</div>
          <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{t('Kontrol sizde kalır.', 'You stay in control.')}<br /><span className="soft">{t('Yazılı olarak.', 'In writing.')}</span></h1>
          <p className="v3-lede">{t('Bu sayfa, sistemin neyi kendisi yaptığını, neyi size bıraktığını ve verinizin nerede durduğunu anlatır. Yasal metnin tamamı için: ', 'This page explains what the system does on its own, what it leaves to you and where your data lives. For the full legal text: ')}<a href="/legal">{t('Yasal sayfası', 'Legal page')}</a>.</p>
        </div>
      </section>
      <section className="v3-section v3-section--white" style={{ paddingTop: 'clamp(2.5rem,5vw,4rem)' }}>
        <div className="v3-wrap v3-grid v3-grid--2">
          {blocks.map(([h, items]) => (
            <div key={h} className="v3-card"><Head title={h} /><ul className="v3-check">{items.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
        </div>
      </section>
      <KapanisBandi />
    </>
  );
}
