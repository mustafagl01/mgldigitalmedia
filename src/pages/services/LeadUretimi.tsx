import React from 'react';
import { Seo, serviceSchema, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

const FAQS_TR = [
  { question: 'Lead üretimi nasıl yapılıyor?', answer: 'Apollo.io veya Google Maps\'ten hedef sektör ve bölge bazlı lead listesi çekilir. Özel enrichment scripti ile website, iletişim bilgileri ve karar verici verisi tamamlanır. Dedupe işlemi sonrası temiz lead listesi elde edilir.' },
  { question: 'Hedef kitlemi nasıl belirleyebilirim?', answer: 'Sektör, konum, şirket büyüklüğü, çalışan sayısı, kullandığı teknolojiler gibi filtrelerle hedef kitle oluşturuyoruz. İlk görüşmede ideal müşteri profilinizi birlikte belirleriz.' },
  { question: 'Leadler gerçekten doğrulanıyor mu?', answer: 'Evet. E-posta doğrulama, web sitesi varlık kontrolü, MX kayıt doğrulama ve çift dedupe (telefon + domain + e-posta) uygulanır. Ortalama deliverability %92+.' },
  { question: 'Kaç lead teslim ediyorsunuz?', answer: 'Sektör ve bölgeye göre değişir. Tipik kampanyada aylık 100-500 nitelikli, dedupe\'lanmış lead teslim edilir. Minimum lead garantisi paket kapsamında belirtilir.' },
  { question: 'Lead üretimi cold outreach ile birlikte mi kullanılıyor?', answer: 'Evet, entegre hizmet sunuyoruz. Lead üretimi → enrichment → cold mail/WhatsApp outreach → cevap takibi şeklinde tam pipeline kurulabilir.' },
  { question: 'Fiyat nasıl belirleniyor?', answer: 'Paket fiyatına ek olarak kullanılan API maliyeti (Apollo, Google Maps) ayrıca hesaplanır. Detay için ücretsiz görüşme alın.' },
];

const FAQS_EN = [
  { question: 'How is lead generation done?', answer: 'We pull targeted lead lists from Apollo.io or Google Maps by sector and region. A custom enrichment script fills in website, contact info and decision-maker data. After deduplication you get a clean, qualified list.' },
  { question: 'How do you define my target audience?', answer: 'We build your ICP (Ideal Customer Profile) using filters: sector, location, company size, employee count, tech stack. We define this together in the first call.' },
  { question: 'Are leads verified?', answer: 'Yes. Email validation, website existence check, MX record verification and double dedup (phone + domain + email) applied. Average deliverability 92%+.' },
  { question: 'How many leads do you deliver?', answer: 'Depends on sector and region. Typically 100-500 qualified, deduped leads per month. Minimum lead guarantee specified in each package.' },
  { question: 'Is lead generation combined with cold outreach?', answer: 'Yes, we offer an integrated service. Lead generation → enrichment → cold email/WhatsApp outreach → reply tracking as a full pipeline.' },
  { question: 'How is pricing structured?', answer: 'Package fee plus API costs (Apollo, Google Maps) billed separately at cost. Book a free call for a tailored quote.' },
];

const PROCESS_TR = [
  { step: 1, title: 'ICP Tanımı', desc: 'Ideal müşteri profili: sektör, konum, şirket büyüklüğü, karar verici rolü ve ek filtreler belirlenir.' },
  { step: 2, title: 'Veri Çekme', desc: 'Apollo.io veya Google Maps\'ten hedef kriterlere uygun lead listesi çekilir.' },
  { step: 3, title: 'Enrichment', desc: 'Her lead için website ziyareti, iletişim bilgisi tamamlama, KVKK uyumlu veri zenginleştirme.' },
  { step: 4, title: 'Dedupe & Doğrulama', desc: 'Önceki kampanyalarla kıyaslama, e-posta doğrulama, temiz CSV teslimi.' },
];

const PROCESS_EN = [
  { step: 1, title: 'ICP Definition', desc: 'Ideal Customer Profile: sector, location, company size, decision-maker role and additional filters defined.' },
  { step: 2, title: 'Data Extraction', desc: 'Lead list pulled from Apollo.io or Google Maps matching your target criteria.' },
  { step: 3, title: 'Enrichment', desc: 'Website visit, contact info completion, GDPR-compliant data enrichment for each lead.' },
  { step: 4, title: 'Dedup & Validation', desc: 'Cross-check against previous campaigns, email validation, clean CSV delivery.' },
];

export default function LeadUretimi() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const faqs = isEN ? FAQS_EN : FAQS_TR;
  const process = isEN ? PROCESS_EN : PROCESS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Lead Generation' : 'Lead Üretimi', path: '/lead-uretimi' },
  ]);

  const svc = serviceSchema({
    name: isEN ? 'AI-Powered Lead Generation' : 'AI Destekli Lead Üretimi',
    description: isEN
      ? 'Targeted B2B lead generation using Apollo.io and Google Maps. Custom enrichment, deduplication, email validation. Clean, qualified lead lists delivered monthly.'
      : 'Apollo.io ve Google Maps ile hedefli B2B lead üretimi. Özel enrichment, dedupe, e-posta doğrulama. Aylık temiz, nitelikli lead listesi teslimi.',
    path: '/lead-uretimi',
    category: 'Lead Generation',
  });

  return (
    <>
      <Seo
        title={
          isEN
            ? 'AI Lead Generation for UK & Turkish Businesses · MGL'
            : 'AI Destekli Lead Üretimi — Nitelikli B2B Lead Listesi · MGL'
        }
        description={
          isEN
            ? 'Targeted B2B lead generation: Apollo.io + Google Maps + custom enrichment + email validation. 100-500 qualified leads/month. GDPR-compliant.'
            : 'Hedefli B2B lead üretimi: Apollo.io + Google Maps + enrichment + e-posta doğrulama. Aylık 100-500 nitelikli lead. KVKK uyumlu.'
        }
        path="/lead-uretimi"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['lead generation uk', 'b2b lead generation', 'apollo io leads', 'sales prospecting uk', 'ai lead generation']
            : ['lead üretimi türkiye', 'b2b lead üretimi', 'apollo io lead', 'satış prospecting', 'ai destekli lead']
        }
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            {isEN ? 'AI-Powered Lead Generation' : 'AI Destekli Lead Üretimi'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.65, marginBottom: '2rem', maxWidth: 560, margin: '0 auto 2rem' }}>
            {isEN
              ? 'Qualified, verified B2B leads from Apollo.io and Google Maps. Custom enrichment, deduplication and email validation. Ready to contact.'
              : 'Apollo.io ve Google Maps\'ten nitelikli, doğrulanmış B2B leadler. Özel enrichment, dedupe ve e-posta doğrulama. İletişime hazır.'}
          </p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.85rem 2.25rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
            {isEN ? 'Book Free Strategy Call' : 'Ücretsiz Strateji Görüşmesi'}
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
        {[
          { v: '92%+', l: isEN ? 'Deliverability' : 'Deliverability' },
          { v: '100-500', l: isEN ? 'Leads/month' : 'Lead/ay' },
          { v: isEN ? 'Deduped' : 'Dedupe\'lı', l: isEN ? 'No duplicates' : 'Tekrar yok' },
          { v: isEN ? 'GDPR' : 'KVKK', l: isEN ? 'Compliant' : 'Uyumlu' },
        ].map((s) => (
          <div key={s.v} style={{ padding: '1.5rem 2.5rem', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{s.v}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{s.l}</div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Data Sources */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {isEN ? 'Our data sources' : 'Veri kaynaklarımız'}
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: 680, marginBottom: '2rem' }}>
            {isEN
              ? 'We use best-in-class tools and combine them with custom enrichment scripts built for Turkey and UK markets.'
              : 'Sektörün en iyi araçlarını Türkiye ve UK pazarlarına özel geliştirdiğimiz enrichment scriptleriyle birleştiriyoruz.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
            {[
              { name: 'Apollo.io', desc: isEN ? '250M+ B2B contacts. Best for professional services, SaaS, enterprise targets.' : '250M+ B2B iletişim. Profesyonel hizmetler, SaaS, kurumsal hedefler için ideal.' },
              { name: 'Google Maps', desc: isEN ? 'Local business discovery. Best for SMB sectors: dental, beauty, restaurant, legal.' : 'Yerel işletme keşfi. KOBİ sektörleri için ideal: dental, güzellik, restoran, hukuk.' },
              { name: isEN ? 'Custom Enrichment' : 'Özel Enrichment', desc: isEN ? 'Website crawl for contact info, decision-maker identification, social profiles.' : 'İletişim bilgisi için website taraması, karar verici tespiti, sosyal profiller.' },
              { name: isEN ? 'Email Validation' : 'E-posta Doğrulama', desc: isEN ? 'MX record check, SMTP ping, catch-all detection. 92%+ deliverability guaranteed.' : 'MX kayıt kontrolü, SMTP ping, catch-all tespiti. %92+ deliverability garantisi.' },
            ].map((item) => (
              <div key={item.name} style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.35rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '2rem' }}>
            {isEN ? 'How it works' : 'Nasıl çalışır'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.25rem' }}>
            {process.map((s) => (
              <div key={s.step} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {s.step}
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem', fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.5rem' }}>
            {isEN ? 'Frequently asked questions' : 'Sıkça sorulan sorular'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '0.875rem 1.25rem', background: 'var(--surface)' }}>
                <summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--ink)', fontSize: '0.975rem' }}>{faq.question}</summary>
                <p style={{ marginTop: '0.75rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '2rem 0 5rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 16, padding: 'clamp(2rem,5vw,3.5rem) 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              {isEN ? 'Ready to fill your pipeline?' : 'Pipeline\'ınızı doldurmaya hazır mısınız?'}
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? "Free strategy call. We'll define your ICP and show you what a qualified lead list looks like for your market."
                : 'Ücretsiz strateji görüşmesi. ICP\'nizi tanımlayıp pazarınız için nasıl bir nitelikli lead listesi oluşturabileceğimizi gösterelim.'}
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              {isEN ? 'Book Free Strategy Call' : 'Ücretsiz Görüşme →'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
