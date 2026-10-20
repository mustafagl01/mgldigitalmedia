import { Seo, breadcrumbSchema, faqSchema, serviceSchema } from '../../components/seo/Seo';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice, formatFrom } from '../../utils/formatPrice';
import { OnaySimulatoru } from '../../components/v3/OnaySimulatoru';
import { Pic, Head, Sss, Kurucu, KapanisBandi, useV3, WHATSAPP, CALENDAR } from '../../components/v3/parts';

/* /ureticiler — soğuk mail kampanyasının niyet sayfası (konsey 2026-10-19).
   /surec-otomasyonu buraya 301 alır; GEO içeriği (teklif hazırlama otomasyonu) burada yaşar.
   Örnekler bilerek genel: belirli bir firmanın ürününe benzemez (kullanıcı düzeltmesi). */

export default function Ureticiler() {
  const { isEN, t } = useV3();
  const { pricing, region } = useLocation();
  const cx = pricing.packages['automation-complex'];
  const cn = pricing.packages['automation-connected'];

  const faqs = [
    { q: t('Teklif hazırlama otomasyonu nedir?', 'What is quote preparation automation?'), a: t('Müşteriden gelen dağınık talep listesini (e-posta, Excel, PDF veya WhatsApp) okuyup ürün kodlarınız, stok ve fiyat listenizle eşleyen, eksikleri işaretleyen ve onayınıza taslak teklif hazırlayan bir iş akışıdır. Fiyat ve gönderim kararı ekibinizde kalır.', 'A workflow that reads messy request lists (email, Excel, PDF or WhatsApp), matches them to your product codes, stock and price list, flags gaps and prepares a draft quote for your approval. Pricing and sending stay with your team.') },
    { q: t('ERP’mizi değiştirmemiz gerekir mi?', 'Do we have to change our ERP?'), a: t('Genellikle hayır. Logo, Netsis, SAP veya Excel gibi sistemlerde önce bağlantı imkânına bakarız; aktarım yöntemi denemede netleşir ve yazılı kapsamda yer alır.', 'Usually not. With systems like Sage, SAP or Excel we first check how they can connect; the method is confirmed in the trial and written into the scope.') },
    { q: t('Verilerimiz ne oluyor?', 'What happens to our data?'), a: t('MGL verilerinizi model eğitimi için kullanmaz; kullanılan sağlayıcılar ve ayarları teklifte yazılır. İsterseniz NDA imzalarız; teknik olarak uygunsa sistem kendi hesaplarınızda kurulur. Denemede isimleri gizlenmiş örnekler yeterlidir.', 'MGL does not use your data to train models; the providers used and their settings are listed in the proposal. We sign an NDA on request and, where technically suitable, run the system in your own accounts. Anonymised samples are enough for the trial.') },
    { q: t('Deneme nasıl işliyor?', 'How does the trial work?'), a: t('Önce kısa bir keşif görüşmesi ve başarı ölçütü. Sonra tek bir belge türü veya tek süreçle 14 gün ücretsiz deneme; geçmiş talepleriniz üzerinde çalışır, sonucu birlikte ölçeriz. Ücretli plana otomatik geçiş yoktur.', 'A short discovery call and agreed success criteria first. Then a free 14-day trial on one document type or one process, run on your past requests; we measure the result together. There is no automatic switch to a paid plan.') },
    { q: t('Kiminle çalışacağız?', 'Who will we work with?'), a: t('Doğrudan kurucu Mustafa Gül ile. Satış ekibi yok; sistemi kuran ve bakımını yapan aynı kişi.', 'Directly with the founder, Mustafa Gül. No sales team; the person who builds the system also maintains it.') },
  ];

  return (
    <>
      <Seo
        title={t('Üretici ve distribütörler için teklif ve sipariş otomasyonu · MGL', 'Quote and order automation for manufacturers and distributors · MGL')}
        description={t('Gelen teklif taleplerini ve siparişleri okuyan, ürün kodlarınızla eşleyen ve onayınıza taslak hazırlayan sistem. ERP ve Excel ile, 14 gün ücretsiz deneme.', 'A system that reads incoming quote requests and orders, matches them to your product codes and prepares drafts for your approval. Works with ERP and Excel; free 14-day trial.')}
        path="/ureticiler"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[
          serviceSchema({ name: t('Teklif ve sipariş otomasyonu', 'Quote and order automation'), description: faqs[0].a, path: '/ureticiler', category: 'Business Process Automation' }),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('Üreticiler', 'Manufacturers'), path: '/ureticiler' }]),
        ]}
      />

      <section className="v3-hero">
        <div className="v3-hero__bg" aria-hidden="true"><Pic name="ureticiler" alt="" eager /></div>
        <div className="v3-wrap v3-hero__inner">
          <div className="v3-hero__text">
            <div className="v3-tag">{t('Üretici, toptancı ve distribütörler', 'Manufacturers, wholesalers and distributors')}</div>
            <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3.4vw,3.9rem)' }}>{t('Gelen teklif talebi,', 'An incoming quote request,')}<br /><span className="soft">{t('incelemeye hazır taslak.', 'a draft ready for review.')}</span></h1>
            <p className="v3-lede">{t('Sistem mail ve eklerini okur, ürün kodlarınızla ve stokla eşler, eksikleri işaretler, müşteriye soru taslağı hazırlar. Ekibiniz ayıklamaya daha az, karara daha çok zaman ayırır.', 'The system reads the email and attachments, matches codes and stock, flags gaps and drafts the question to the customer. Your team spends less time sorting and more time deciding.')}</p>
            <div className="v3-btns">
              <a className="btn btn-primary btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t('Örnek talep gönderin', 'Send a sample request')}</a>
              <a className="btn btn-ghost btn-lg" href={CALENDAR} target="_blank" rel="noopener noreferrer">{t('15 dakikalık görüşme', '15-minute call')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-wrap">
          <Head tag={t('Neyi çözer', 'What it solves')} title={t('Aynı işler,', 'The same work,')} soft={t('her gün yeniden.', 'again every day.')} />
          <div className="v3-grid">
            {[
              [t('Teklif talepleri', 'Quote requests'), t('Kod listesi, Excel, PDF veya serbest metin; satırlar ürünlerinizle eşlenir, muadil önerilir, eksik adet sorulur.', 'Code lists, Excel, PDF or free text; lines are matched to your products, equivalents suggested, missing quantities queried.')],
              [t('Sipariş girişi', 'Order entry'), t('Mail ve WhatsApp siparişleri ayıklanır, ERP veya tablonuza işlenecek biçime getirilir.', 'Email and WhatsApp orders are extracted and shaped for your ERP or spreadsheet.')],
              [t('Teknik ön inceleme', 'Technical pre-review'), t('Şartname ve eklerden ölçü, malzeme, standart ve termin çıkarılır; kapasite tablonuzla karşılaştırılır.', 'Dimensions, materials, standards and deadlines are pulled from specs and attachments and checked against your capacity table.')],
              [t('Takip', 'Follow-up'), t('Cevapsız teklifler ve yaklaşan terminler zamanında hatırlatılır.', 'Unanswered quotes and upcoming deadlines are reminded on time.')],
            ].map(([a, b]) => (
              <div key={a} className="v3-card"><strong className="v3-h3">{a}</strong><p>{b}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-section v3-section--white">
        <div className="v3-wrap">
          <Head tag={t('Örnek', 'Example')} title={t('Bir teklif talebini adım adım izleyin.', 'Follow one quote request step by step.')} soft={t('Gönder tuşu sizde.', 'The send button is yours.')} />
          <OnaySimulatoru start="teklif" only={['teklif']} />
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-wrap">
          <Head tag={t('Paketler', 'Plans')} title={t('Kapsama göre iki seçenek.', 'Two options by scope.')} lede={t('Fiyat şirket büyüklüğüne değil işin karmaşıklığına göre. Kesin rakam denemeden sonra yazılı teklifte yer alır ve 12 ay sabit kalır.', 'Priced by job complexity, not company size. The exact figure is written into the proposal after the trial and fixed for 12 months.')} />
          <div className="v3-ladder">
            <div className="v3-card">
              <span className="v3-chip">{t('Bağlantılı', 'Connected')}</span>
              <div className="v3-price">{formatPrice(cn.price, region)}<small>{t(' / ay', ' / month')}</small></div>
              <p>{t(`Kurulum ${formatPrice(cn.setupFee, region)} · 2-3 iş akışı, CRM ve bulut programları · en az 6 ay`, `Setup ${formatPrice(cn.setupFee, region)} · 2-3 workflows, CRM and cloud apps · 6-month minimum`)}</p>
            </div>
            <div className="v3-card is-featured">
              <span className="v3-chip">{t('Kapsamlı', 'Complex')}</span>
              <div className="v3-price">{formatFrom(cx.price, region, isEN)}<small>{t(' / ay', ' / month')}</small></div>
              <p>{t(`Kurulum ${formatFrom(cx.setupFee, region, false)} başlayan · ERP, belge okuma, çok dil · ayda 100 karmaşık talep dahil · en az 12 ay`, `Setup from ${formatPrice(cx.setupFee, region)} · ERP, document reading, multilingual · 100 complex requests a month · 12-month minimum`)}</p>
            </div>
          </div>
          <p style={{ marginTop: 16 }}><a href="/fiyatlandirma" style={{ fontWeight: 600 }}>{t('Tüm fiyatlar →', 'All pricing →')}</a></p>
        </div>
      </section>

      <section className="v3-section v3-section--white">
        <div className="v3-wrap v3-grid v3-grid--2" style={{ gap: 'clamp(24px,4vw,56px)' }}>
          <div>
            <div className="v3-tag">{t('Kontrol ve veri', 'Control and data')}</div>
            <h2 className="v3-h2" style={{ fontSize: 'clamp(1.5rem,1rem+1.6vw,2.2rem)' }}>{t('Sistem karar vermez.', 'The system does not decide.')}</h2>
            <ul className="v3-check">
              <li>{t('Fiyat ve teknik karar her zaman ekibinizde.', 'Pricing and technical decisions always stay with your team.')}</li>
              <li>{t('Onayınız olmadan müşterinize hiçbir şey gitmez.', 'Nothing reaches your customers without your approval.')}</li>
              <li>{t('MGL verilerinizi model eğitiminde kullanmaz; NDA ve KVKK/GDPR şartları yazılı.', 'MGL does not use your data for model training; NDA and GDPR/KVKK terms in writing.')}</li>
              <li>{t('Teknik olarak uygunsa kendi hesaplarınızda veya sunucunuzda kurulum.', 'Where technically suitable, it runs in your own accounts or on your server.')}</li>
            </ul>
          </div>
          <div>
            <div className="v3-tag">{t('Sık sorulanlar', 'FAQ')}</div>
            <Sss items={faqs} />
          </div>
        </div>
      </section>

      <section className="v3-section"><div className="v3-wrap"><Kurucu /></div></section>
      <KapanisBandi title={t('Ayda kaç talep geliyor?', 'How many requests reach you each month?')} soft={t('İsimleri gizlenmiş bir örnek gönderin.', 'Send one sample with names removed.')} text={t('Size o talep için hazırlanmış örnek bir çıktıyla dönelim.', 'We will reply with a sample output prepared for that request.')} />
    </>
  );
}
