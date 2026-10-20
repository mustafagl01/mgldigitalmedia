import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice, formatFrom } from '../../utils/formatPrice';
import type { PackageTierKey } from '../../config/pricing';
import { Head, KapanisBandi, useV3 } from '../../components/v3/parts';

/* /fiyatlandirma — tek fiyat merkezi (konsey 2026-10-19). /pricing, /pricing/automation,
   /pricing/local, /packages buraya 301 alır. Rakamlar yalnız pricing.ts'den. Ayrıntı ilgili sayfalarda. */

export default function Fiyatlandirma() {
  const { isEN, t } = useV3();
  const { pricing, region } = useLocation();
  const p = pricing.packages;
  const fp = (n: number) => formatPrice(n, region);
  const from = (n: number) => formatFrom(n, region, isEN);

  const auto: Array<{ key: PackageTierKey; name: string; tools: string; terms: string }> = [
    { key: 'automation', name: t('Hazır otomasyon', 'Ready-made'), tools: t('Excel, WhatsApp, takvim', 'Excel, WhatsApp, calendar'), terms: t('Canlı demo · 14 gün içinde kurulum ücreti iadesi · en az 3 ay', 'Live demo · setup fee refundable within 14 days · 3-month minimum') },
    { key: 'automation-connected', name: t('Bağlantılı', 'Connected'), tools: t('CRM, muhasebe, bulut programları', 'CRM, accounting, cloud apps'), terms: t('14 gün ücretsiz deneme · en az 6 ay', 'Free 14-day trial · 6-month minimum') },
    { key: 'automation-complex', name: t('Kapsamlı', 'Complex'), tools: t('ERP, belge okuma, çok dil', 'ERP, document reading, multilingual'), terms: t('Tek süreçle 14 gün ücretsiz deneme · en az 12 ay', 'Free 14-day trial on one process · 12-month minimum') },
    { key: 'automation-custom', name: t('Özel', 'Custom'), tools: t('Birden fazla sistem ve departman', 'Several systems and departments'), terms: t('Görüşme sonrası yazılı teklif · yıllık', 'Written proposal after a call · annual') },
  ];

  const row = (label: string, value: string, sub?: string, href?: string) => (
    <a key={label} href={href} className="v3-card" style={{ gap: 4 }}>
      <strong>{label}</strong>
      <div className="v3-price" style={{ fontSize: '1.3rem' }}>{value}</div>
      {sub && <p>{sub}</p>}
    </a>
  );

  return (
    <>
      <Seo
        title={t('Fiyatlandırma · MGL Digital Media', 'Pricing · MGL Digital Media')}
        description={t('Otomasyon paketleri, web sitesi, reklam yönetimi ve AI asistan fiyatları. Paketler şirket büyüklüğüne değil işin karmaşıklığına göre.', 'Automation plans, website, ads management and AI assistant pricing. Plans are set by job complexity, not company size.')}
        path="/fiyatlandirma"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('Fiyatlandırma', 'Pricing'), path: '/fiyatlandirma' }])]}
      />
      <section className="v3-section" style={{ paddingBottom: 'clamp(2rem,4vw,3rem)' }}>
        <div className="v3-wrap">
          <div className="v3-tag">{t('Fiyatlandırma', 'Pricing')}</div>
          <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{t('Fiyatlar açık.', 'Prices are public.')}<br /><span className="soft">{t('Gizli kalem yok.', 'No hidden items.')}</span></h1>
          <p className="v3-lede">{t('Otomasyonda paket, şirket büyüklüğüne göre değil, kullandığınız araçlara ve işin karmaşıklığına göre seçilir. Kurulum tek seferliktir; aylık ücrete barındırma, izleme, arıza müdahalesi ve destek dahildir.', 'For automation, the plan depends on the tools you use and how complex the job is, not on company size. Setup is one-off; the monthly fee covers hosting, monitoring, fixes and support.')}</p>
        </div>
      </section>

      <section className="v3-section v3-section--white" style={{ paddingTop: 'clamp(2.5rem,5vw,4rem)' }}>
        <div className="v3-wrap">
          <Head tag={t('Otomasyon', 'Automation')} title={t('Dört paket.', 'Four plans.')} />
          <div className="v3-ladder">
            {auto.map((a) => {
              const tier = p[a.key];
              return (
                <div key={a.key} className={`v3-card ${tier.featured ? 'is-featured' : ''}`}>
                  <span className="v3-chip">{t('Araçlar', 'Tools')}: {a.tools}</span>
                  <strong className="v3-h3">{a.name}</strong>
                  {tier.customPrice ? (
                    <div className="v3-price" style={{ fontSize: '1.25rem' }}>{t('Görüşme sonrası', 'Quoted after a call')}</div>
                  ) : (
                    <>
                      <div className="v3-price">{tier.priceFrom ? from(tier.price) : fp(tier.price)}<small>{t(' / ay', ' / month')}</small></div>
                      <p>{t('Kurulum', 'Setup')} {tier.priceFrom ? from(tier.setupFee) : fp(tier.setupFee)}</p>
                    </>
                  )}
                  <p style={{ fontSize: '.84rem', color: 'var(--fg-3)' }}>{a.terms}</p>
                </div>
              );
            })}
          </div>
          <p style={{ marginTop: 14, fontSize: '.88rem', color: 'var(--fg-3)' }}>{t('SMS veya resmî WhatsApp kanalı kullanılırsa mesaj ücretleri kendi hesabınızdan ödenir; e-posta bildirimleri dahildir.', 'SMS and official WhatsApp messaging charges, if used, are paid from your own account; email notifications are included.')}</p>
          <p style={{ marginTop: 8 }}><a href="/otomasyon" style={{ fontWeight: 600 }}>{t('Paketlerin ayrıntısı ve hazır otomasyon listesi →', 'Plan details and the ready-made list →')}</a></p>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-wrap">
          <Head tag={t('Web, reklam ve asistan', 'Web, ads and assistants')} title={t('Sabit fiyatlı hizmetler.', 'Fixed-price services.')} />
          <div className="v3-grid">
            {row(t('Tek sayfa site', 'One-page site'), fp(p['web-landing'].setupFee), t(`Tek seferlik · ilk yıl barındırma dahil, sonra ${fp(p['web-landing'].price)}/yıl`, `One-off · first year hosting included, then ${fp(p['web-landing'].price)}/yr`), '/web-ve-reklam#web')}
            {row(t('Kurumsal site', 'Business website'), fp(p['web-site'].setupFee), t(`Beş sayfa · tek seferlik · ilk yıl barındırma dahil, sonra ${fp(p['web-site'].price)}/yıl`, `Five pages · one-off · first year hosting included, then ${fp(p['web-site'].price)}/yr`), '/web-ve-reklam#web')}
            {row(t('Entegrasyonlu site', 'Integrated website'), fp(p['web-integrated'].setupFee), t(`Online sipariş, rezervasyon ve/veya ödeme · ilk yıl barındırma dahil, sonra ${fp(p['web-integrated'].price)}/yıl`, `Online ordering, bookings and/or payments · first year hosting included, then ${fp(p['web-integrated'].price)}/yr`), '/web-ve-reklam#web')}
            {row(t('Meta veya Google reklam', 'Meta or Google ads'), `${fp(p['ads-meta'].price)}${t(' / ay', ' / month')}`, t(`İkisi birlikte ${fp(p['ads-both'].price)}/ay · bütçe hariç`, `Both ${fp(p['ads-both'].price)}/month · ad spend excluded`), '/web-ve-reklam#reklam')}
            {row(t('AI telefon asistanı', 'AI phone assistant'), `${fp(p.voice.price)}${t(' / ay', ' / month')}`, t(`Kurulum ${fp(p.voice.setupFee)} · dakika paketleri yanmaz · iki asistan birlikte alınırsa aylık ücret bir kez ödenir`, `Setup ${fp(p.voice.setupFee)} · minute bundles never expire · one monthly fee if you take both assistants`), '/asistanlar')}
            {row(t('WhatsApp asistanı', 'WhatsApp assistant'), `${fp(p.whatsapp.price)}${t(' / ay', ' / month')}`, t('Kurulum yok · yanıt paketleri yanmaz', 'No setup · reply bundles never expire'), '/asistanlar')}
          </div>
        </div>
      </section>
      <KapanisBandi />
    </>
  );
}
