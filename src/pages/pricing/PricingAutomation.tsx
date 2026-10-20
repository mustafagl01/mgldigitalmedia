import { useState } from 'react';
import { Seo, faqSchema, breadcrumbSchema, serviceSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice, formatFrom } from '../../utils/formatPrice';
import { AUTOMATION_TIERS, READY_CATALOG, EXAMPLES, STEPS, TRIAL, SECURITY, FAQS } from './automationContent';
import type { PackageTierKey } from '../../config/pricing';

const READY_SLUGS = ['talep-yakalama', 'randevu-hatirlatma', 'odeme-takibi', 'evrak-toplama', 'yorum-isteme'];

const TIER_LABELS: Partial<Record<PackageTierKey, { tr: string; en: string }>> = {
  automation: { tr: 'Hazır otomasyon', en: 'Ready-made' },
  'automation-connected': { tr: 'Bağlantılı', en: 'Connected' },
  'automation-complex': { tr: 'Kapsamlı', en: 'Complex' },
  'automation-custom': { tr: 'Özel', en: 'Custom' },
};
import {
  CALENDAR_URL, whatsappLink, localPath, card, h2, lede, sectionPad, eyebrow,
  CheckList, FaqList, PrimaryButton, GhostButton, CompanyBlock,
} from './shared';
import { OzelKapi } from '../../components/v3/parts';

/* Otomasyon fiyat sayfası. Her sektör ve her ölçek için (küçük esnaftan büyük şirkete) —
   kullanıcı düzeltmesi 2026-10-19. Web, reklam ve asistan fiyatları /pricing/local'da. */

export default function PricingAutomation() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isEN = language === 'en';
  const lang = isEN ? 'en' : 'tr';
  const wa = whatsappLink(
    region,
    isEN
      ? 'Hi, there is a task we would like to automate: '
      : 'Merhaba, otomatikleştirmek istediğimiz bir iş var: ',
  );

  const faqs = FAQS[lang];
  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Automation' : 'Otomasyon', path: '/otomasyon' },
  ]);
  const svc = serviceSchema({
    name: isEN ? 'Business process automation' : 'İş süreci otomasyonu',
    description: isEN
      ? 'Automation of repetitive work such as quotes, orders, appointment reminders, payment follow-up, document collection and reporting, for businesses of any size and sector, with human approval.'
      : 'Teklif, sipariş, randevu hatırlatma, tahsilat takibi, evrak toplama ve raporlama gibi tekrarlanan işlerin, her sektör ve ölçekteki işletme için insan onayıyla otomasyonu.',
    path: '/otomasyon',
    category: 'Business Process Automation',
  });

  return (
    <>
      <Seo
        title={isEN ? 'Automation Plans · MGL' : 'Otomasyon Paketleri · MGL'}
        description={isEN
          ? 'Automation for businesses of any size and sector: Ready-made, Connected, Complex and Custom plans.'
          : 'Her sektör ve ölçekteki işletme için otomasyon: Hazır, Bağlantılı, Kapsamlı ve Özel paketler.'}
        path="/otomasyon"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={isEN
          ? ['automation pricing', 'business process automation cost', 'quote automation', 'appointment reminder automation', 'payment follow-up automation']
          : ['otomasyon fiyatları', 'iş süreci otomasyonu fiyat', 'teklif otomasyonu', 'randevu hatırlatma otomasyonu', 'tahsilat otomasyonu']}
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero v3 */}
      <section className="v3-hero">
        <div className="v3-hero__bg" aria-hidden="true">
          <picture>
            <source media="(max-width: 760px)" srcSet="/v3/otomasyon-m.webp" />
            <img src="/v3/otomasyon-d.webp" alt="" fetchPriority="high" />
          </picture>
        </div>
        <div className="v3-wrap v3-hero__inner">
          <div className="v3-hero__text">
            <div className="v3-tag">{isEN ? 'Any sector · small and large businesses' : 'Her sektör · küçük ve büyük işletmeler'}</div>
            <h1 className="v3-h1" style={{ fontSize: 'clamp(2.1rem,1.2rem+3.4vw,3.9rem)' }}>
              {isEN ? 'Automate the work you do by hand.' : 'Elle yapılan işi otomatikleştirin.'}<br />
              <span className="soft">{isEN ? 'Keep the decisions.' : 'Kararlar sizde kalsın.'}</span>
            </h1>
            <p className="v3-lede">
              {isEN
                ? 'Quotes, orders, appointment reminders, payment follow-up, documents and reporting. Plans are set by job complexity, not company size.'
                : 'Teklif, sipariş, randevu hatırlatma, tahsilat takibi, evrak ve raporlama. Paketler şirket büyüklüğüne değil, işin karmaşıklığına göre belirlenir.'}
            </p>
            <div className="v3-btns">
              <a className="btn btn-primary btn-lg" href="#paketler">{isEN ? 'See plans' : 'Paketleri görün'}</a>
              <a className="btn btn-ghost btn-lg" href={wa} target="_blank" rel="noopener noreferrer">{isEN ? 'Message us on WhatsApp' : 'WhatsApp’tan yazın'}</a>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Örnek işler */}
        <section style={sectionPad}>
          <h2 style={h2}>{isEN ? 'What can be automated?' : 'Neler otomatikleştirilebilir?'}</h2>
          <p style={lede}>
            {isEN
              ? 'A few common examples. If your task is not here, describe it and we will tell you honestly whether it can be done.'
              : 'Sık karşılaştığımız birkaç örnek. İşiniz listede yoksa anlatın; yapılıp yapılamayacağını dürüstçe söyleyelim.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: '1rem' }}>
            {EXAMPLES[lang].map((ex) => (
              <a key={ex.title} href={localPath(ex.href, isEN)} style={{ ...card, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ ...eyebrow, marginBottom: 0 }}>{ex.who}</span>
                <strong style={{ color: 'var(--ink)', fontSize: '1.02rem' }}>{ex.title}</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>{ex.desc}</span>
              </a>
            ))}
          </div>
        </section>

        <section style={{ paddingBottom: 'clamp(1.5rem,3vw,2.5rem)' }}><OzelKapi /></section>

        <SampleOutput isEN={isEN} />

        {/* Nasıl çalışır */}
        <section style={sectionPad}>
          <h2 style={h2}>{isEN ? 'How it works' : 'Nasıl çalışır'}</h2>
          <p style={lede}>{isEN ? 'Four steps, built around the email, Excel and ERP you already use.' : 'Dört adım; kullandığınız e-posta, Excel ve ERP düzeni değişmeden.'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(210px,100%),1fr))', gap: '1rem' }}>
            {STEPS[lang].map((s, i) => (
              <div key={s.title} style={card}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>{i + 1}</div>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 0.4rem', fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Paketler — konsey 2026-10-19: ayrım işin karmaşıklığına / kullanılan araçlara göre */}
        <section id="paketler" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'Plans' : 'Paketler'}</h2>
          <p style={lede}>
            {isEN
              ? 'Choose by the tools you use, not by the size of your company. Setup is one-off; the monthly fee covers hosting, monitoring, fixes and support.'
              : 'Şirketinizin büyüklüğüne değil, kullandığınız araçlara göre seçin. Kurulum tek seferliktir; aylık ücrete barındırma, izleme, arıza müdahalesi ve destek dahildir.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: '1rem', alignItems: 'stretch' }}>
            {AUTOMATION_TIERS.map((t) => {
              const tier = pricing.packages[t.key];
              const featured = !!tier.featured;
              const from = !!tier.priceFrom;
              const monthly = formatPrice(tier.price, region);
              const setup = formatPrice(tier.setupFee, region);
              return (
                <article key={t.key} style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0.9rem', border: featured ? '2px solid var(--ink)' : card.border }}>
                  <div>
                    {featured && (
                      <div style={{ ...eyebrow, color: 'var(--ink)', marginBottom: '0.4rem' }}>
                        {isEN ? 'Recommended' : 'Önerilen'}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{TIER_LABELS[t.key]?.[lang] ?? tier.name}</h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', margin: '0.35rem 0 0' }}>
                      {isEN ? 'Tools: ' : 'Araçlar: '}{t.tools[lang]}
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55, margin: '0.35rem 0 0' }}>{t.fits[lang]}</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.85rem 0' }}>
                    {tier.customPrice ? (
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)' }}>{isEN ? 'Quoted after scoping' : 'Görüşme sonrası teklif'}</div>
                    ) : (
                      <>
                        <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)' }}>
                          {from ? formatFrom(tier.price, region, isEN) : monthly}
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--muted)' }}>{isEN ? ' / month' : ' / ay'}</span>
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          {isEN
                            ? `${from ? 'Setup from' : 'Setup'} ${setup} (one-off)`
                            : `Kurulum ${from ? `${formatFrom(tier.setupFee, region, false)} başlar` : setup} (tek seferlik)`}
                        </div>
                      </>
                    )}
                  </div>
                  <CheckList items={t.included[lang]} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{t.terms[lang]}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <PrimaryButton href={wa}>
                      {t.key === 'automation' ? (isEN ? 'Ask for a demo' : 'Demo isteyin') : t.key === 'automation-custom' ? (isEN ? 'Get in touch' : 'İletişime geçin') : (isEN ? 'Start the free trial' : 'Ücretsiz denemeyi başlatın')}
                    </PrimaryButton>
                  </div>
                </article>
              );
            })}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '1rem 0 0' }}>
            {isEN ? 'We take on a limited number of new setups at a time so that each one gets proper attention.' : 'Her kuruluma hakkıyla vakit ayırabilmek için aynı anda sınırlı sayıda yeni kurulum alıyoruz.'}
          </p>
        </section>

        {/* Hazır otomasyon kataloğu */}
        <section id="hazir" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'Ready-made automations' : 'Hazır otomasyonlar'}</h2>
          <p style={lede}>
            {isEN
              ? 'Fixed-scope systems you can choose for the Ready-made plan. Anything beyond these falls under Connected.'
              : 'Hazır otomasyon paketinde seçebileceğiniz, kapsamı sabit sistemler. Bunların dışındaki işler Bağlantılı pakete girer.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: '1rem' }}>
            {READY_CATALOG[lang].map((c, i) => (
              <a key={c.title} href={`/otomasyon/${READY_SLUGS[i]}`} className="v3-card">
                <strong style={{ color: 'var(--ink)' }}>{c.title}</strong>
                <p>{c.desc}</p>
                <span className="v3-more">{isEN ? 'Details →' : 'Ayrıntılar →'}</span>
              </a>
            ))}
          </div>
        </section>

        <CostCalculator isEN={isEN} region={region} />

        {/* Deneme + güvenlik */}
        <section style={sectionPad}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: '1rem' }}>
            <div style={card}>
              <h2 style={{ ...h2, fontSize: '1.25rem' }}>{isEN ? 'Trial and refund' : 'Deneme ve iade'}</h2>
              <CheckList items={TRIAL[lang]} />
            </div>
            <div style={card}>
              <h2 style={{ ...h2, fontSize: '1.25rem' }}>{isEN ? 'Control and data' : 'Kontrol ve veri'}</h2>
              <CheckList items={SECURITY[lang]} />
            </div>
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
              {isEN ? 'Which task takes up most of your time?' : 'En çok vaktinizi alan iş hangisi?'}
            </h2>
            <p style={{ opacity: 0.85, maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? 'Describe it in a few lines. We will tell you honestly whether it can be automated and which plan it fits.'
                : 'Birkaç cümleyle anlatın; otomatikleştirmeye uygun olup olmadığını ve hangi pakete gireceğini dürüstçe söyleyelim.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <PrimaryButton href={wa} inverted>{isEN ? 'Message us on WhatsApp' : 'WhatsApp’tan yazın'}</PrimaryButton>
              <GhostButton href={CALENDAR_URL} onDark>{isEN ? 'Book a 15-minute call' : '15 dakikalık görüşme planlayın'}</GhostButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Örnek bilerek genel tutuldu (2026-10-19, kullanıcı düzeltmesi): belirli bir firmanın
// ürününe/işine benzememeli; sıradan bir teklif talebi (sayfadaki birçok örnekten biri).
function SampleOutput({ isEN }: { isEN: boolean }) {
  const lines = isEN
    ? [
        ['✓', '4 of 5 lines matched to your product codes and stock'],
        ['?', '1 code not in your list → equivalent product suggested for your approval'],
        ['?', 'Quantity missing on 1 line → question to the customer drafted'],
        ['✓', '3 prices taken from your price list'],
        ['!', '1 price is a special price → waiting for your approval'],
        ['✓', 'Draft quote ready in your usual Excel / ERP format'],
      ]
    : [
        ['✓', '5 satırın 4’ü ürün kodlarınızla eşleşti ve stokta var'],
        ['?', '1 kod listenizde yok → onayınız için muadil ürün önerildi'],
        ['?', '1 satırda adet eksik → müşteriye soru taslağı hazırlandı'],
        ['✓', '3 satırın fiyatı listenizden alındı'],
        ['!', '1 satır özel fiyat gerektiriyor → onayınızı bekliyor'],
        ['✓', 'Taslak teklif her zamanki Excel / ERP formatınızda hazır'],
      ];
  return (
    <section style={sectionPad}>
      <h2 style={h2}>{isEN ? 'An example: a quote request' : 'Bir örnek: teklif talebi'}</h2>
      <p style={lede}>
        {isEN
          ? 'A customer emails a list asking for a quote. Before anyone on your team opens it, this summary is waiting.'
          : 'Müşteriniz teklif için bir liste gönderiyor. Ekibinizden biri e-postayı açmadan önce bu özet hazır oluyor.'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: '1rem' }}>
        <div style={{ ...card, color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65 }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'Incoming email' : 'Gelen e-posta'}</div>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            {isEN
              ? '"Hi, could you quote the items in the attached list? Some codes are from our old supplier. We need them by the end of the month."'
              : '"Merhaba, ekteki listedeki ürünler için fiyat verebilir misiniz? Bazı kodlar eski tedarikçimizin. Ay sonuna kadar lazım."'}
          </p>
          <div style={{ color: 'var(--muted)', marginTop: '0.6rem' }}>📎 {isEN ? 'request_list.xlsx' : 'talep_listesi.xlsx'}</div>
        </div>
        <div style={{ ...card, color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, marginBottom: '0.6rem' }}>{isEN ? 'Summary for your team' : 'Ekibinize giden özet'}</div>
          <div style={{ display: 'grid', gap: '0.45rem' }}>
            {lines.map(([mark, text]) => (
              <div key={text} style={{ display: 'flex', gap: '0.55rem' }}>
                <span style={{ fontWeight: 700, flex: '0 0 1rem' }}>{mark}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.9rem' }}>
            <span style={{ padding: '0.25rem 0.75rem', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 6, fontSize: '0.85rem' }}>{isEN ? 'Approve' : 'Onayla'}</span>
            <span style={{ padding: '0.25rem 0.75rem', border: '1px solid var(--border)', borderRadius: 6, fontSize: '0.85rem' }}>{isEN ? 'Edit' : 'Düzenle'}</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.6rem 0 0' }}>
        {isEN ? 'Illustrative example, not customer data.' : 'Temsili örnektir, müşteri verisi değildir.'}
      </p>
    </section>
  );
}

function CostCalculator({ isEN, region }: { isEN: boolean; region: 'TR' | 'GB' }) {
  const [requests, setRequests] = useState(80);
  const [minutes, setMinutes] = useState(30);
  const [hourly, setHourly] = useState(region === 'TR' ? 500 : 30);
  const hours = (requests * minutes) / 60;
  const cost = hours * hourly;
  const input = { width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--paper)', color: 'var(--ink)', fontSize: '1rem' } as const;
  const label = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.35rem' } as const;
  const num = (v: string) => Math.max(0, Number(v) || 0);

  return (
    <section style={sectionPad}>
      <h2 style={h2}>{isEN ? 'What does a manual task cost you today?' : 'Elle yapılan bir iş size ayda ne kadara mal oluyor?'}</h2>
      <p style={lede}>
        {isEN
          ? 'Enter your own figures for one repetitive task. This is only the staff time it takes.'
          : 'Tekrarlanan bir iş için kendi rakamlarınızı girin. Hesap yalnızca o işe ayrılan personel süresini kapsar.'}
      </p>
      <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap: '1rem', alignItems: 'end' }}>
        <label>
          <span style={label}>{isEN ? 'Times per month' : 'Ayda kaç kez yapılıyor'}</span>
          <input style={input} type="number" min={0} value={requests} onChange={(e) => setRequests(num(e.target.value))} />
        </label>
        <label>
          <span style={label}>{isEN ? 'Minutes each time' : 'Her seferinde kaç dakika'}</span>
          <input style={input} type="number" min={0} value={minutes} onChange={(e) => setMinutes(num(e.target.value))} />
        </label>
        <label>
          <span style={label}>{isEN ? 'Hourly staff cost' : 'Saatlik personel maliyeti'} ({region === 'TR' ? '₺' : '£'})</span>
          <input style={input} type="number" min={0} value={hourly} onChange={(e) => setHourly(num(e.target.value))} />
        </label>
        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{isEN ? 'Hours per month' : 'Aylık saat'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{Math.round(hours).toLocaleString(isEN ? 'en-GB' : 'tr-TR')}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{isEN ? 'Cost per month' : 'Aylık maliyet'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{formatPrice(cost, region)}</div>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0.6rem 0 0' }}>
        {isEN
          ? 'An estimate based on your inputs. How much of this the system removes is measured together during the trial.'
          : 'Girdiğiniz rakamlara dayalı tahmindir. Bunun ne kadarının azaldığını denemede birlikte ölçeriz.'}
      </p>
    </section>
  );
}
