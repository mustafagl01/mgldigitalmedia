import { useState } from 'react';
import { Seo, faqSchema, breadcrumbSchema, serviceSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice } from '../../utils/formatPrice';
import { AUTOMATION_TIERS, STEPS, TRIAL, SECURITY, FAQS } from './automationContent';
import {
  CALENDAR_URL, whatsappLink, card, h2, lede, sectionPad, eyebrow,
  CheckList, FaqList, PrimaryButton, GhostButton, CompanyBlock,
} from './shared';

/* B2B fiyat sayfası — soğuk maillerin indiği yer. Konsey kararı 2026-10-19 (KARAR.md).
   Burada esnaf paketleri (web, reklam, asistan) GÖSTERİLMEZ ve onlara link verilmez. */

export default function PricingAutomation() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isEN = language === 'en';
  const lang = isEN ? 'en' : 'tr';
  const wa = whatsappLink(
    region,
    isEN
      ? 'Hi, we receive about __ quote/order requests a month. Could you show us a sample output?'
      : 'Merhaba, ayda yaklaşık __ teklif/sipariş talebi alıyoruz. Örnek bir çıktı görebilir miyiz?',
  );

  const faqs = FAQS[lang];
  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Pricing' : 'Fiyatlar', path: '/pricing' },
    { name: isEN ? 'Business automation' : 'İş otomasyonu', path: '/pricing/automation' },
  ]);
  const svc = serviceSchema({
    name: isEN ? 'Quote and order process automation' : 'Teklif ve sipariş süreci otomasyonu',
    description: isEN
      ? 'Reads incoming quote and order requests with attachments, extracts the fields into a checklist, flags missing information and hands the result to your team for approval.'
      : 'Gelen teklif ve sipariş taleplerini ekleriyle okur, alanları kontrol listesine döker, eksik bilgiyi işaretler ve sonucu onay için ekibinize verir.',
    path: '/pricing/automation',
    category: 'Business Process Automation',
  });

  return (
    <>
      <Seo
        title={isEN ? 'Business Automation Pricing · MGL' : 'İş Otomasyonu Fiyatları · MGL'}
        description={isEN
          ? 'Quote and order automation for manufacturers and distributors: Starter, Business and Custom plans, a free 14-day trial and a sample output.'
          : 'Üretici ve distribütörler için teklif ve sipariş otomasyonu: Başlangıç, İşletme ve Özel paketler, 14 gün ücretsiz deneme ve örnek çıktı.'}
        path="/pricing/automation"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={isEN
          ? ['quote automation pricing', 'order processing automation', 'rfq automation', 'b2b process automation']
          : ['teklif otomasyonu fiyat', 'sipariş otomasyonu', 'teklif hazırlama otomasyonu', 'süreç otomasyonu fiyatları']}
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,5rem) 1.25rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ ...eyebrow, color: 'inherit', opacity: 0.7 }}>
            {isEN ? 'For manufacturers, distributors and teams of 20-500' : 'Üretici, distribütör ve 20-500 kişilik ekipler için'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 1rem' }}>
            {isEN ? 'Turn incoming quote requests into a review-ready list.' : 'Gelen teklif taleplerini incelemeye hazır listeye çevirin.'}
          </h1>
          <p style={{ fontSize: '1.08rem', opacity: 0.85, lineHeight: 1.65, maxWidth: 620, margin: '0 auto 2rem' }}>
            {isEN
              ? 'The system reads the email and its attachments, extracts the specifications, flags what is missing and drafts the question to the customer. Your team approves. Start with a free 14-day trial on your own requests.'
              : 'Sistem maili ve eklerini okur, teknik bilgileri ayıklar, eksikleri işaretler ve müşteriye sorulacak soruyu hazırlar. Onay ekibinizde. Kendi talepleriniz üzerinde 14 gün ücretsiz denemeyle başlayın.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton href={wa} inverted>{isEN ? 'Write on WhatsApp' : 'WhatsApp’tan yazın'}</PrimaryButton>
            <GhostButton href="#paketler" onDark>{isEN ? 'See plans' : 'Paketleri görün'}</GhostButton>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 1.25rem' }}>
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

        {/* Paketler */}
        <section id="paketler" style={sectionPad}>
          <h2 style={h2}>{isEN ? 'Plans' : 'Paketler'}</h2>
          <p style={lede}>
            {isEN
              ? 'Every plan starts with a free 14-day trial. Setup is one-off; the monthly fee covers hosting, monitoring, fixes and support.'
              : 'Her paket 14 gün ücretsiz denemeyle başlar. Kurulum tek seferliktir; aylık ücrete barındırma, izleme, arıza müdahalesi ve destek dahildir.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: '1rem', alignItems: 'stretch' }}>
            {AUTOMATION_TIERS.map((t) => {
              const tier = pricing.packages[t.key];
              const featured = !!tier.featured;
              return (
                <article key={t.key} style={{ ...card, display: 'flex', flexDirection: 'column', gap: '1rem', border: featured ? '2px solid var(--ink)' : card.border }}>
                  <div>
                    {featured && (
                      <div style={{ ...eyebrow, color: 'var(--ink)', marginBottom: '0.4rem' }}>
                        {isEN ? 'Most common for manufacturers' : 'Üreticiler için en yaygın'}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{t.label[lang]}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55, margin: '0.35rem 0 0' }}>{t.fits[lang]}</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.85rem 0' }}>
                    {tier.customPrice ? (
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)' }}>{isEN ? 'Quoted after the trial' : 'Deneme sonrası teklif'}</div>
                    ) : (
                      <>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>
                          {formatPrice(tier.price, region)}<span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--muted)' }}>{isEN ? ' / month' : ' / ay'}</span>
                        </div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                          {isEN ? `Setup from ${formatPrice(tier.setupFee, region)} (one-off)` : `Kurulum ${formatPrice(tier.setupFee, region)}’den başlayan (tek seferlik)`}
                        </div>
                      </>
                    )}
                  </div>
                  <CheckList items={t.included[lang]} />
                  {t.note && <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{t.note[lang]}</p>}
                  <div style={{ marginTop: 'auto' }}>
                    <PrimaryButton href={wa}>{isEN ? 'Start the free trial' : 'Ücretsiz denemeyi başlatın'}</PrimaryButton>
                  </div>
                </article>
              );
            })}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '1rem 0 0' }}>
            {isEN ? 'We take on at most 2 new trials at a time so that each one gets proper attention.' : 'Her denemeye hakkıyla vakit ayırabilmek için aynı anda en fazla 2 yeni deneme alıyoruz.'}
          </p>
        </section>

        <CostCalculator isEN={isEN} region={region} />

        {/* Deneme + güvenlik */}
        <section style={sectionPad}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: '1rem' }}>
            <div style={card}>
              <h2 style={{ ...h2, fontSize: '1.25rem' }}>{isEN ? 'The 14-day trial' : '14 günlük deneme'}</h2>
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
              {isEN ? 'How many requests reach you each month?' : 'Ayda kaç talep geliyor?'}
            </h2>
            <p style={{ opacity: 0.85, maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? 'Send us a rough number and one example request with names removed. We will reply with a sample output.'
                : 'Yaklaşık sayıyı ve isimleri gizlenmiş bir örnek talebi gönderin; size örnek çıktıyla dönelim.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <PrimaryButton href={wa} inverted>{isEN ? 'Write on WhatsApp' : 'WhatsApp’tan yazın'}</PrimaryButton>
              <GhostButton href={CALENDAR_URL} onDark>{isEN ? 'Book a 15-minute call' : '15 dakikalık görüşme planlayın'}</GhostButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.82rem', lineHeight: 1.7 } as const;

function SampleOutput({ isEN }: { isEN: boolean }) {
  const rows = isEN
    ? [
        ['✓', 'Product', 'Hydraulic cylinder, double acting'],
        ['✓', 'Quantity', '2 pcs'],
        ['✓', 'Bore / rod', 'Ø250 / Ø160 mm'],
        ['✓', 'Stroke', '1,800 mm'],
        ['✓', 'Working pressure', '250 bar'],
        ['?', 'Test pressure', 'not stated → question drafted'],
        ['?', 'Rod coating', 'drawing says chrome, email says ceramic → conflict'],
        ['✓', 'Standard', 'EN 1090, 3.1 material certificate'],
        ['!', 'Capacity', 'within honing and chrome limits'],
        ['✓', 'Delivery', 'requested: week 12'],
      ]
    : [
        ['✓', 'Ürün', 'Hidrolik silindir, çift etkili'],
        ['✓', 'Adet', '2'],
        ['✓', 'Piston / mil', 'Ø250 / Ø160 mm'],
        ['✓', 'Strok', '1.800 mm'],
        ['✓', 'Çalışma basıncı', '250 bar'],
        ['?', 'Test basıncı', 'belirtilmemiş → soru hazırlandı'],
        ['?', 'Mil kaplaması', 'resimde krom, mailde seramik → çelişki'],
        ['✓', 'Standart', 'EN 1090, 3.1 malzeme sertifikası'],
        ['!', 'Kapasite', 'honlama ve krom sınırları içinde'],
        ['✓', 'Termin', 'istenen: 12. hafta'],
      ];
  return (
    <section style={sectionPad}>
      <h2 style={h2}>{isEN ? 'What you get: a sample' : 'Ne elde edersiniz: bir örnek'}</h2>
      <p style={lede}>
        {isEN
          ? 'Left: a request as it usually arrives. Right: what your engineer sees before opening the attachments.'
          : 'Solda talep genelde nasıl geliyorsa öyle. Sağda mühendisinizin ekleri açmadan önce gördüğü özet.'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: '1rem' }}>
        <div style={{ ...card, ...mono, color: 'var(--ink)' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'Incoming email' : 'Gelen mail'}</div>
          <div style={{ color: 'var(--muted)' }}>{isEN ? 'Subject: RFQ cylinders – urgent' : 'Konu: RFQ cylinders – urgent'}</div>
          <p style={{ margin: '0.6rem 0' }}>
            Dear Sir, please quote 2 pcs double acting cylinder acc. to attached drawing, bore 250 rod 160, stroke 1800,
            working pressure 250 bar. Rod ceramic coated. EN 1090 + 3.1 cert. Delivery wk 12 latest. Thanks
          </p>
          <div style={{ color: 'var(--muted)' }}>📎 drawing_rev3.pdf · spec_sheet.xlsx</div>
        </div>
        <div style={{ ...card, ...mono, color: 'var(--ink)' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'Pre-review summary' : 'Ön inceleme özeti'}</div>
          {rows.map(([mark, field, value]) => (
            <div key={field} style={{ display: 'grid', gridTemplateColumns: '1.2rem 9.5rem 1fr', gap: '0.25rem' }}>
              <span style={{ fontWeight: 700 }}>{mark}</span>
              <span style={{ color: 'var(--muted)' }}>{field}</span>
              <span>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.75rem', paddingTop: '0.6rem', borderTop: '1px dashed var(--border)' }}>
            {isEN ? 'Draft to customer: "Could you confirm the test pressure and whether the rod should be chrome or ceramic?"' : 'Müşteriye taslak: "Test basıncını ve milin krom mu seramik mi olacağını teyit edebilir misiniz?"'}
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
      <h2 style={h2}>{isEN ? 'What do requests cost you today?' : 'Talepler bugün size neye mal oluyor?'}</h2>
      <p style={lede}>
        {isEN
          ? 'Enter your own figures. This is only the time spent reading and sorting requests, before any pricing work.'
          : 'Kendi rakamlarınızı girin. Bu, fiyatlandırmadan önce yalnızca talepleri okuyup ayıklamaya giden süredir.'}
      </p>
      <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap: '1rem', alignItems: 'end' }}>
        <label>
          <span style={label}>{isEN ? 'Requests per month' : 'Aylık talep sayısı'}</span>
          <input style={input} type="number" min={0} value={requests} onChange={(e) => setRequests(num(e.target.value))} />
        </label>
        <label>
          <span style={label}>{isEN ? 'Minutes per request' : 'Talep başına dakika'}</span>
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
