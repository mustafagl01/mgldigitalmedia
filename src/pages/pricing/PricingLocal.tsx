import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from '../../contexts/LocationContext';
import type { PricingRegionCode, RegionalPricing } from '../../config/pricing';
import { formatPrice, formatUnitRate } from '../../utils/formatPrice';
import { WEB_TIERS, ADS_TIERS, ASSISTANTS, LOCAL_FAQS, type LocalTierContent } from './localContent';
import {
  CALENDAR_URL, whatsappLink, card, h2, lede, sectionPad, eyebrow,
  CheckList, FaqList, PrimaryButton, GhostButton, CompanyBlock,
} from './shared';

/* Yerel işletme fiyat sayfası (klinik, mağaza, restoran). Konsey kararı 2026-10-19 (KARAR.md).
   B2B otomasyon paketleri burada GÖSTERİLMEZ, onlara link verilmez; "otomasyon" kelimesi geçmez. */

export default function PricingLocal() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isEN = language === 'en';
  const lang = isEN ? 'en' : 'tr';
  const wa = (topic: string) => whatsappLink(region, isEN ? `Hi, I would like to ask about ${topic}.` : `Merhaba, ${topic} hakkında bilgi almak istiyorum.`);

  const faqs = LOCAL_FAQS[lang];
  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Pricing' : 'Fiyatlar', path: '/pricing' },
    { name: isEN ? 'Local business' : 'Yerel işletme', path: '/pricing/local' },
  ]);

  const nav = [
    ['web', isEN ? 'Websites' : 'Web siteleri'],
    ['reklam', isEN ? 'Ads management' : 'Reklam yönetimi'],
    ['asistan', isEN ? 'AI assistants' : 'AI asistanlar'],
  ];

  return (
    <>
      <Seo
        title={isEN ? 'Websites, Ads and AI Assistants Pricing · MGL' : 'Web Sitesi, Reklam ve AI Asistan Fiyatları · MGL'}
        description={isEN
          ? 'Clear prices for local businesses: websites with yearly hosting, flat-fee Meta and Google ads management, and AI phone and WhatsApp assistants.'
          : 'Yerel işletmeler için net fiyatlar: yıllık barındırmalı web siteleri, sabit ücretli Meta ve Google reklam yönetimi, AI telefon ve WhatsApp asistanları.'}
        path="/pricing/local"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={isEN
          ? ['small business website price', 'meta ads management price', 'google ads management price', 'ai receptionist price']
          : ['web sitesi fiyatları', 'meta reklam yönetimi fiyat', 'google reklam yönetimi fiyat', 'ai telefon asistanı fiyat']}
        jsonLd={[faqSchema(faqs), breadcrumb]}
      />

      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,4.5rem) 1.25rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ ...eyebrow, color: 'inherit', opacity: 0.7 }}>
            {isEN ? 'For clinics, shops, restaurants and local services' : 'Klinik, mağaza, restoran ve yerel hizmetler için'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 1rem' }}>
            {isEN ? 'Get found, get enquiries, answer every customer.' : 'Bulunun, talep alın, her müşteriye cevap verin.'}
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.65, maxWidth: 600, margin: '0 auto 1.75rem' }}>
            {isEN
              ? 'Websites, ads management and AI assistants with fixed prices. What is included is written down; no surprise items later.'
              : 'Web sitesi, reklam yönetimi ve AI asistanlar sabit fiyatla. Neyin dahil olduğu yazılı; sonradan çıkan kalem yok.'}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {nav.map(([id, label]) => (
              <GhostButton key={id} href={`#${id}`} onDark>{label}</GhostButton>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 1.25rem' }}>
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

        <section id="asistan" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'AI assistants' : 'AI asistanlar'}</h2>
          <p style={lede}>
            {isEN
              ? 'A monthly system fee plus usage. Usage is loaded with prepaid bundles that stay valid until used up.'
              : 'Aylık sistem ücreti artı kullanım. Kullanım ön ödemeli paketlerle yüklenir; paketler bitene kadar geçerlidir.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '1rem' }}>
            {ASSISTANTS.map((t) => (
              <AssistantCard key={t.key} t={t} pricing={pricing} region={region} isEN={isEN} wa={wa(pricing.packages[t.key].name)} />
            ))}
          </div>
        </section>

        <section style={{ ...sectionPad, paddingTop: 0 }}>
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{tier.name}</h3>
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
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{tier.name}</h3>
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
