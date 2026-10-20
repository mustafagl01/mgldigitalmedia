import { Seo, breadcrumbSchema, faqSchema, serviceSchema } from '../../components/seo/Seo';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice } from '../../utils/formatPrice';
import { CATALOG } from '../../content/v3';
import { OnaySimulatoru } from '../../components/v3/OnaySimulatoru';
import { Head, Sss, KapanisBandi, useV3, WHATSAPP } from '../../components/v3/parts';

/* Hazır otomasyon sayfası şablonu — 5 sayfa, aynı yapı, içerik content/v3.ts'den.
   Eski /sorunlar/* sayfaları buraya 301 alır. */

export default function CatalogPage({ slug }: { slug: string }) {
  const { lang, isEN, t } = useV3();
  const { pricing, region } = useLocation();
  const c = CATALOG.find((x) => x.slug === slug) ?? CATALOG[0];
  const tier = pricing.packages.automation;
  const path = `/otomasyon/${c.slug}`;
  const faqs = c.faq[lang].map((f) => ({ question: f.q, answer: f.a }));
  const simStart = ({ 'talep-yakalama': 'talep', 'randevu-hatirlatma': 'randevu', 'odeme-takibi': 'odeme', 'evrak-toplama': 'evrak', 'yorum-isteme': 'yorum' } as Record<string, string>)[c.slug] ?? 'randevu';

  return (
    <>
      <Seo
        title={`${c.title[lang]} ${t('otomasyonu', 'automation')} · MGL`}
        description={c.short[lang]}
        path={path}
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[
          serviceSchema({ name: c.title[lang], description: c.short[lang], path, category: 'Business Process Automation' }),
          faqSchema(faqs),
          breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }, { name: t('Otomasyon', 'Automation'), path: '/otomasyon' }, { name: c.title[lang], path }]),
        ]}
      />

      <section className="v3-section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="v3-wrap v3-grid v3-grid--2" style={{ alignItems: 'end', gap: 'clamp(24px,4vw,56px)' }}>
          <div>
            <div className="v3-tag"><a href="/otomasyon" style={{ color: 'inherit' }}>{t('Hazır otomasyon', 'Ready-made automation')}</a></div>
            <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3vw,3.6rem)' }}>{c.title[lang]}</h1>
            <p className="v3-lede">{c.short[lang]}</p>
            <div className="v3-btns">
              <a className="btn btn-primary btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t('Demo isteyin', 'Ask for a demo')}</a>
              <a className="btn btn-ghost btn-lg" href="#nasil">{t('Nasıl çalışır', 'How it works')}</a>
            </div>
          </div>
          <div className="v3-card" style={{ gap: 6 }}>
            <span className="v3-chip">{t('Sabit fiyat', 'Fixed price')}</span>
            <div className="v3-price">{formatPrice(tier.price, region)}<small>{t(' / ay', ' / month')}</small></div>
            <p>{t(`Kurulum ${formatPrice(tier.setupFee, region)} (tek seferlik) · en az 3 ay · 14 gün içinde kurulum ücreti iadesi`, `Setup ${formatPrice(tier.setupFee, region)} (one-off) · 3-month minimum · setup fee refundable within 14 days`)}</p>
            <p style={{ fontSize: '.86rem', color: 'var(--fg-3)' }}>{t('Kimler kullanıyor: ', 'Typical users: ')}{c.who[lang]}</p>
          </div>
        </div>
      </section>

      <section className="v3-section v3-section--white">
        <div className="v3-wrap v3-grid v3-grid--2" style={{ gap: 'clamp(24px,4vw,56px)' }}>
          <div>
            <div className="v3-tag">{t('Sorun', 'The problem')}</div>
            <h2 className="v3-h2" style={{ fontSize: 'clamp(1.5rem,1rem+1.6vw,2.2rem)' }}>{t('Neden otomatikleştirmeli?', 'Why automate it?')}</h2>
            <p className="v3-lede">{c.problem[lang]}</p>
          </div>
          <div id="nasil">
            <div className="v3-tag">{t('Nasıl çalışır', 'How it works')}</div>
            <ol className="v3-steps" style={{ gridTemplateColumns: '1fr' }}>
              {c.flow[lang].map((s, i) => (
                <li key={s} style={{ borderRight: 0 }}><span className="n">0{i + 1}</span><p style={{ marginTop: 4 }}>{s}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-wrap">
          <div className="v3-grid">
            <div className="v3-card"><span className="v3-chip">{t('Ne elde edersiniz', 'What you get')}</span><ul className="v3-check">{c.output[lang].map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="v3-card"><span className="v3-chip">{t('Sınırlar', 'Limits')}</span><ul className="v3-check">{c.limits[lang].map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="v3-card"><span className="v3-chip">{t('Araçlar', 'Tools')}</span><p>{c.tools[lang]}</p><p style={{ fontSize: '.86rem', color: 'var(--fg-3)' }}>{t('Kullandığınız düzen değişmez; sistem mevcut araçlarınıza bağlanır.', 'Your setup stays as it is; the system connects to the tools you already use.')}</p></div>
          </div>
        </div>
      </section>

      <section className="v3-section v3-section--white">
        <div className="v3-wrap">
          <Head tag={t('Deneyin', 'Try it')} title={t('Onay noktası nerede?', 'Where is the approval point?')} soft={t('Kendiniz görün.', 'See for yourself.')} />
          <OnaySimulatoru start={simStart} only={[simStart]} />
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-wrap" style={{ maxWidth: 860 }}>
          <Head tag={t('Sık sorulanlar', 'FAQ')} title={t('Sorular', 'Questions')} />
          <Sss items={c.faq[lang].concat([
            { q: t('Listede olmayan bir şey istersem?', 'What if I need something extra?'), a: t('Birden fazla kaynak, CRM veya muhasebe programı bağlantısı Bağlantılı pakete girer. İşinizi anlatın, hangi pakete girdiğini söyleyelim.', 'Several sources, a CRM or accounting software connection fall under the Connected plan. Tell us the task and we will tell you which plan fits.') },
          ])} />
          <p style={{ marginTop: 24 }}>{t('Diğer hazır otomasyonlar: ', 'Other ready-made automations: ')}
            {CATALOG.filter((x) => x.slug !== c.slug).map((x, i, a) => (
              <span key={x.slug}><a href={`/otomasyon/${x.slug}`}>{x.title[lang]}</a>{i < a.length - 1 ? ' · ' : ''}</span>
            ))}
          </p>
        </div>
      </section>

      <KapanisBandi />
    </>
  );
}
