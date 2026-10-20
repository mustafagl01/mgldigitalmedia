import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from '../../contexts/LocationContext';
import { REGIONAL_PRICING, type PackageTierKey, type PricingRegionCode, type RegionalPricing } from '../../config/pricing';

/* Paket adı fiyat bölgesine değil sayfa diline göre (TR sayfada İngilizce ad çıkmasın). */
const nameOf = (key: PackageTierKey, isEN: boolean) => REGIONAL_PRICING[isEN ? 'GB' : 'TR'].packages[key].name;
import { formatPrice, formatUnitRate } from '../../utils/formatPrice';
import { WEB_TIERS, ADS_TIERS, ASSISTANTS, LOCAL_FAQS, type LocalTierContent } from './localContent';
import {
  CALENDAR_URL, whatsappLink, localPath, card, h2, lede, sectionPad, eyebrow,
  CheckList, FaqList, PrimaryButton, GhostButton, CompanyBlock,
} from './shared';

/* Web, reklam ve AI asistan fiyat sayfası — her sektör ve her ölçek için (kullanıcı düzeltmesi 2026-10-19).
   Otomasyon paketleri /pricing/automation'da; sayfa sonunda oraya yönlendiren kısa kart var. */

type Mode = 'webads' | 'assistants';

export default function PricingLocal({ mode = 'webads' }: { mode?: Mode }) {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isEN = language === 'en';
  const lang = isEN ? 'en' : 'tr';
  const wa = (topic: string) => whatsappLink(region, isEN ? `Hi, I would like to ask about ${topic}.` : `Merhaba, ${topic} hakkında bilgi almak istiyorum.`);
  const showWeb = mode === 'webads';
  const showAst = mode === 'assistants';
  const path = showWeb ? '/web-ve-reklam' : '/asistanlar';

  const faqs = LOCAL_FAQS[lang].filter((_, i) => (showWeb ? [0, 1, 2] : [1, 3, 4]).includes(i));
  const title = showWeb
    ? (isEN ? 'Websites and ads management' : 'Web sitesi ve reklam yönetimi')
    : (isEN ? 'AI phone and WhatsApp assistants' : 'AI telefon ve WhatsApp asistanı');
  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: title, path },
  ]);

  return (
    <>
      <Seo
        title={`${title} · MGL`}
        description={showWeb
          ? (isEN ? 'Websites with the first year of hosting included and flat-fee Meta and Google ads management, for businesses of any size.' : 'İlk yıl barındırması dahil web siteleri ve sabit ücretli Meta ve Google reklam yönetimi; her ölçekteki işletme için.')
          : (isEN ? 'An AI receptionist that answers calls and a WhatsApp assistant that replies 24/7, takes bookings and hands over to you. Bundles never expire.' : 'Telefonu açan AI resepsiyon ve 7/24 cevap veren WhatsApp asistanı: randevu alır, gerektiğinde size devreder. Paketler bitene kadar geçerli.')}
        path={path}
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={showWeb
          ? (isEN ? ['small business website price', 'meta ads management price', 'google ads management price'] : ['web sitesi fiyatları', 'meta reklam yönetimi fiyat', 'google reklam yönetimi fiyat'])
          : (isEN ? ['ai receptionist price', 'whatsapp ai assistant', 'ai phone answering'] : ['ai telefon asistanı fiyat', 'whatsapp ai asistan', 'mesai dışı telefon cevaplama'])}
        jsonLd={[faqSchema(faqs), breadcrumb]}
      />

      <section className="v3-hero">
        <div className="v3-hero__bg" aria-hidden="true">
          <picture>
            <source media="(max-width: 760px)" srcSet={`/v3/${showWeb ? 'webreklam' : 'asistanlar'}-m.webp`} />
            <img src={`/v3/${showWeb ? 'webreklam' : 'asistanlar'}-d.webp`} alt="" fetchPriority="high" />
          </picture>
        </div>
        <div className="v3-wrap v3-hero__inner">
          <div className="v3-hero__text">
            <div className="v3-tag">{isEN ? 'For small and large businesses in any sector' : 'Her sektörden küçük ve büyük işletmeler için'}</div>
            <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>
              {showWeb ? (isEN ? 'Get found,' : 'Bulunun,') : (isEN ? 'Every call answered,' : 'Her arama karşılanır,')}<br />
              <span className="soft">{showWeb ? (isEN ? 'get enquiries.' : 'talep alın.') : (isEN ? 'every message replied.' : 'her mesaja cevap gider.')}</span>
            </h1>
            <p className="v3-lede">
              {showWeb
                ? (isEN ? 'Websites and ads management with fixed prices. What is included is written down; no surprise items later.' : 'Web sitesi ve reklam yönetimi sabit fiyatla. Neyin dahil olduğu yazılı; sonradan çıkan kalem yok.')
                : (isEN ? 'A monthly system fee plus usage. The assistant takes bookings and orders and hands the conversation to you whenever you want.' : 'Aylık sistem ücreti artı kullanım. Asistan randevu ve sipariş alır, istediğiniz an konuşmayı size devreder.')}
            </p>
            {showWeb && (
              <div className="v3-btns">
                <a className="btn btn-ghost btn-md" href="#web">{isEN ? 'Websites' : 'Web siteleri'}</a>
                <a className="btn btn-ghost btn-md" href="#reklam">{isEN ? 'Ads management' : 'Reklam yönetimi'}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 1.25rem' }}>
        {showWeb && <>
        <section id="web" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'Websites' : 'Web siteleri'}</h2>
          <p style={lede}>
            {isEN
              ? 'A one-off build that belongs to you. The first year of hosting is included; from year two a yearly fee covers hosting, SSL, security updates and maintenance.'
              : 'Bir kez ödenen ve sizin olan kurulum. İlk yıl barındırma dahildir; ikinci yıldan itibaren yıllık ücret barındırma, SSL, güvenlik güncellemeleri ve bakımı kapsar.'}
          </p>
          <TierGrid tiers={WEB_TIERS} pricing={pricing} region={region} isEN={isEN} wa={wa(isEN ? 'a website' : 'web sitesi')} />
        </section>

        <section id="reklam" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'Ads management' : 'Reklam yönetimi'}</h2>
          <p style={lede}>
            {isEN
              ? 'A flat monthly fee, no setup fee and no percentage of your spend. The ad budget is paid directly to the platform from your own card.'
              : 'Sabit aylık ücret; kurulum ücreti ve bütçeden yüzde yok. Reklam bütçesi kendi kartınızdan doğrudan platforma ödenir.'}
          </p>
          <TierGrid tiers={ADS_TIERS} pricing={pricing} region={region} isEN={isEN} wa={wa(isEN ? 'ads management' : 'reklam yönetimi')} />
          <div style={{ ...card, marginTop: '1rem', background: 'transparent', borderStyle: 'dashed' }}>
            <strong style={{ color: 'var(--ink)' }}>{isEN ? 'Website + ads together' : 'Web sitesi + reklam birlikte'}</strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.35rem 0 0' }}>
              {isEN
                ? 'Most clients take both: the site is built for the visitors the ads bring, and one person looks after both.'
                : 'Çoğu müşteri ikisini birlikte alır: site, reklamın getirdiği ziyaretçiye göre kurulur ve ikisiyle aynı kişi ilgilenir.'}
            </p>
          </div>
        </section>

        </>}

        {showAst && (
        <section id="asistan" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'AI assistants' : 'AI asistanlar'}</h2>
          <p style={lede}>
            {isEN
              ? 'A monthly system fee plus usage. Usage is loaded with prepaid bundles that stay valid until used up.'
              : 'Aylık sistem ücreti artı kullanım. Kullanım ön ödemeli paketlerle yüklenir; paketler bitene kadar geçerlidir.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '1rem' }}>
            {ASSISTANTS.map((t) => (
              <AssistantCard key={t.key} t={t} pricing={pricing} region={region} isEN={isEN} wa={wa(nameOf(t.key, isEN))} />
            ))}
          </div>
        </section>
        )}

        <section style={{ ...sectionPad, paddingTop: 0 }}>
          <a href={localPath('/otomasyon', isEN)} style={{ ...card, display: 'block', textDecoration: 'none', marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--ink)' }}>{isEN ? 'Repetitive work in your business too?' : 'İşletmenizde tekrarlanan işler de mi var?'}</strong>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.35rem 0 0' }}>
              {isEN
                ? 'Appointment reminders, payment follow-up, orders or documents can be automated too. See automation plans →'
                : 'Randevu hatırlatma, tahsilat takibi, sipariş veya evrak işleri de otomatikleştirilebilir. Otomasyon paketlerini görün →'}
            </p>
          </a>
          <CompanyBlock isEN={isEN} />
        </section>

        <section style={sectionPad}>
          <h2 style={{ ...h2, marginBottom: '1.25rem' }}>{isEN ? 'Frequently asked questions' : 'Sıkça sorulan sorular'}</h2>
          <FaqList items={faqs} />
        </section>

        <section style={{ padding: '1rem 0 5rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 16, padding: 'clamp(2rem,5vw,3.5rem) 1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 800, margin: '0 0 0.75rem' }}>
              {isEN ? 'Not sure which one you need?' : 'Hangisine ihtiyacınız olduğundan emin değil misiniz?'}
            </h2>
            <p style={{ opacity: 0.85, maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN ? 'Tell us about your business in a few lines and we will suggest the most useful first step.' : 'İşletmenizi birkaç cümleyle anlatın, en yararlı ilk adımı önerelim.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <PrimaryButton href={wa(isEN ? 'my business' : 'işletmem')} inverted>{isEN ? 'Write on WhatsApp' : 'WhatsApp’tan yazın'}</PrimaryButton>
              <GhostButton href={CALENDAR_URL} onDark>{isEN ? 'Book a 15-minute call' : '15 dakikalık görüşme planlayın'}</GhostButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

type GridProps = { tiers: LocalTierContent[]; pricing: RegionalPricing; region: PricingRegionCode; isEN: boolean; wa: string };

function TierGrid({ tiers, pricing, region, isEN, wa }: GridProps) {
  const lang = isEN ? 'en' : 'tr';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: '1rem', alignItems: 'stretch' }}>
      {tiers.map((t) => {
        const tier = pricing.packages[t.key];
        const yearly = tier.priceUnit === 'year';
        return (
          <article key={t.key} style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0.9rem', border: tier.featured ? '2px solid var(--ink)' : card.border }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{nameOf(t.key, isEN)}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55, margin: '0.35rem 0 0' }}>{t.subtitle[lang]}</p>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.8rem 0' }}>
              {yearly ? (
                <>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)' }}>
                    {formatPrice(tier.setupFee, region)}<span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{isEN ? ' one-off' : ' tek seferlik'}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                    {isEN
                      ? `First year of hosting included, then ${formatPrice(tier.price, region)} / year`
                      : `İlk yıl barındırma dahil, sonra ${formatPrice(tier.price, region)} / yıl`}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)' }}>
                    {formatPrice(tier.price, region)}<span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{isEN ? ' / month' : ' / ay'}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                    {isEN ? 'No setup fee · ad budget excluded' : 'Kurulum ücreti yok · reklam bütçesi hariç'}
                  </div>
                </>
              )}
            </div>
            <CheckList items={t.included[lang]} />
            <div style={{ marginTop: 'auto' }}>
              <PrimaryButton href={wa}>{isEN ? 'Ask on WhatsApp' : 'WhatsApp’tan sorun'}</PrimaryButton>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function AssistantCard({ t, pricing, region, isEN, wa }: { t: LocalTierContent } & Omit<GridProps, 'tiers'>) {
  const lang = isEN ? 'en' : 'tr';
  const tier = pricing.packages[t.key];
  const product = t.key === 'voice' ? 'voice' : 'whatsapp';
  const unit = product === 'voice' ? (isEN ? 'min' : 'dk') : (isEN ? 'AI reply' : 'AI yanıtı');
  const unitPlural = product === 'voice' ? (isEN ? 'minutes' : 'dakika') : (isEN ? 'replies' : 'yanıt');
  const packs = pricing.creditPacks.filter((p) => p.product === product);

  return (
    <article style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{nameOf(t.key, isEN)}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55, margin: '0.35rem 0 0' }}>{t.subtitle[lang]}</p>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.8rem 0' }}>
        <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)' }}>
          {formatPrice(tier.price, region)}<span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{isEN ? ' / month' : ' / ay'}</span>
        </div>
        <div style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
          {tier.setupFee > 0
            ? `${isEN ? 'Setup' : 'Kurulum'} ${formatPrice(tier.setupFee, region)}${tier.setupNote ? ` (${tier.setupNote[lang]})` : ''}`
            : (isEN ? 'No setup fee' : 'Kurulum ücreti yok')}
          {tier.usageRate != null && ` · ${isEN ? 'without a bundle' : 'paketsiz'} ${formatUnitRate(tier.usageRate, region)} / ${unit}`}
        </div>
      </div>
      <CheckList items={t.included[lang]} />
      {t.excluded && <CheckList items={t.excluded[lang].map((x) => `${isEN ? 'Not included' : 'Dahil değil'}: ${x}`)} muted />}

      <div>
        <div style={{ ...eyebrow, marginBottom: '0.4rem' }}>{isEN ? `Prepaid ${unitPlural} · valid until used` : `Ön ödemeli ${unitPlural} · bitene kadar geçerli`}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', color: 'var(--ink)' }}>
          <tbody>
            {packs.map((p) => (
              <tr key={p.key} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '0.4rem 0' }}>{p.units.toLocaleString(isEN ? 'en-GB' : 'tr-TR')} {unitPlural}</td>
                <td style={{ padding: '0.4rem 0', textAlign: 'right', fontWeight: 700 }}>{formatPrice(p.price, region)}</td>
                <td style={{ padding: '0.4rem 0 0.4rem 0.75rem', textAlign: 'right', color: 'var(--muted)' }}>{formatUnitRate(p.unitRate, region)} / {unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <PrimaryButton href={wa}>{isEN ? 'Ask on WhatsApp' : 'WhatsApp’tan sorun'}</PrimaryButton>
      </div>
    </article>
  );
}
