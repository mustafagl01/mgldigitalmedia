import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { WORK, PROOF_UPDATED } from '../../content/v3';
import { IsKartlari, KapanisBandi, useV3 } from '../../components/v3/parts';

/* /isler — yalnız gerçek, yayındaki müşteri işleri (2026-10-19 Vercel + Cloudflare taraması).
   Ekran görüntüleri gerçek (scripts/v3_isler_ekran.py); AI görseli yok, uydurma sonuç yok. */

export default function Isler() {
  const { lang, isEN, t } = useV3();
  return (
    <>
      <Seo
        title={t('Yaptığımız işler · MGL Digital Media', 'Our work · MGL Digital Media')}
        description={t(`Yayındaki ${WORK.length} müşteri sitesi ve süren reklam yönetimi işleri: kafe, inşaat, danışmanlık, anaokulu, catering ve daha fazlası.`, `${WORK.length} live client websites and ongoing ads management: cafés, builders, consultancy, nurseries, catering and more.`)}
        path="/isler"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('İşler', 'Work'), path: '/isler' }])]}
      />
      <section className="v3-section" style={{ paddingBottom: 'clamp(2rem,4vw,3rem)' }}>
        <div className="v3-wrap">
          <div className="v3-tag">{t('Yaptığımız işler', 'Our work')}</div>
          <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{t('Yayındaki siteler.', 'Live websites.')}<br /><span className="soft">{t('Tıklayın, kendiniz gezin.', 'Click and look around.')}</span></h1>
          <p className="v3-lede">
            {t(
              'Aşağıdakiler müşterilerimizin şu an yayında olan siteleri; ekran görüntüleri gerçek ana sayfalardan alındı. Satış veya trafik rakamı yazmıyoruz, çünkü bunlar müşterinin verisi. Otomasyon tarafında ilk kurulumlar görüşme aşamasında; tamamlandıkça buraya ekleyeceğiz.',
              'These are our clients’ live websites; the screenshots come from their real home pages. We do not publish sales or traffic figures, because that data belongs to the client. On the automation side, the first setups are in discussion; we will add them here as they go live.',
            )}
          </p>
          <div className="v3-chip">{t('Son güncelleme', 'Last updated')}: {PROOF_UPDATED[lang]}</div>
        </div>
      </section>
      <section className="v3-section" style={{ paddingTop: 0 }}>
        <div className="v3-wrap"><IsKartlari /></div>
      </section>
      <KapanisBandi title={t('Sizin siteniz ya da sisteminiz.', 'Your website or system.')} soft={t('Birkaç cümleyle anlatın.', 'Tell us in a few lines.')} />
    </>
  );
}
