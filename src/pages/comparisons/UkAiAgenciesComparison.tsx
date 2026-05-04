import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.uk';

const FAQS_EN = [
  { question: 'What should I look for in a UK AI automation agency?', answer: 'Key criteria: technical stack transparency (what tools they actually use), fixed pricing vs retainer, ability to integrate with your existing software, Turkish/bilingual support if needed, and actual case studies rather than vague claims.' },
  { question: 'How much do UK AI automation agencies charge?', answer: 'Typical range: £500-5,000/month depending on scope. Simple WhatsApp automation: £100-250/month. Full AI stack (voice + chat + CRM + automation): £400-1,500/month. Watch out for large setup fees without performance guarantees.' },
  { question: 'Does MGL serve UK businesses?', answer: 'Yes. MGL Digital Media is registered in England and Wales (Company No. 16007414, Enfield EN1 1LS). We serve UK businesses from £119/month with full technical support.' },
  { question: 'What AI automation services do UK agencies typically offer?', answer: 'WhatsApp/SMS chatbots, AI voice agents, CRM integration, workflow automation (n8n/Zapier/Make), Meta/Google ad management, SEO and conversion-focused web development.' },
  { question: 'How long does it take to see results?', answer: 'WhatsApp AI agents: visible within the first week (response time, message volume handled). Voice agents: 1-2 weeks to calibrate. Lead generation campaigns: first qualified leads within 2-4 weeks.' },
];

const FAQS_TR = [
  { question: 'UK AI otomasyon ajansında nelere bakmalıyım?', answer: 'Temel kriterler: teknik stack şeffaflığı (gerçekten hangi araçları kullandıkları), sabit fiyatlandırma vs retainer, mevcut yazılımınızla entegrasyon yeteneği, Türkçe/iki dilli destek ihtiyacı ve belirsiz iddialar yerine gerçek vaka çalışmaları.' },
  { question: 'UK AI otomasyon ajansları ne kadar ücret alıyor?', answer: 'Tipik aralık: kapsama göre £500-5.000/ay. Basit WhatsApp otomasyonu: £100-250/ay. Tam AI stack (sesli + sohbet + CRM + otomasyon): £400-1.500/ay. Performans garantisi olmayan büyük kurulum ücretlerine dikkat edin.' },
  { question: 'MGL UK işletmelerine hizmet veriyor mu?', answer: 'Evet. MGL Digital Media İngiltere\'de kayıtlıdır (Şirket No: 16007414, Enfield EN1 1LS). UK işletmelerine £119/ay\'dan tam teknik destekle hizmet veriyoruz.' },
  { question: 'UK ajansları tipik olarak hangi AI otomasyon hizmetlerini sunuyor?', answer: 'WhatsApp/SMS chatbotlar, AI sesli asistanlar, CRM entegrasyonu, workflow otomasyonu (n8n/Zapier/Make), Meta/Google reklam yönetimi, SEO ve dönüşüm odaklı web geliştirme.' },
  { question: 'Sonuçlar ne zaman görülür?', answer: 'WhatsApp AI asistanlar: ilk haftada görünür (yanıt süresi, işlenen mesaj hacmi). Sesli asistanlar: kalibrasyon için 1-2 hafta. Lead üretim kampanyaları: 2-4 hafta içinde ilk nitelikli leadler.' },
];

export default function UkAiAgenciesComparison() {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const faqs = isEN ? FAQS_EN : FAQS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'UK AI Agencies Comparison' : 'UK AI Ajansları Karşılaştırması', path: '/uk-ai-agencies-comparison' },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEN
      ? 'UK AI Automation Agencies: What to Look For in 2026'
      : 'UK AI Otomasyon Ajansları: 2026\'da Nelere Bakmalı',
    url: `${SITE_URL}/uk-ai-agencies-comparison`,
    datePublished: '2026-05-03',
    author: { '@id': `${SITE_URL}/#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const criteria = isEN
    ? [
        { name: 'Stack Transparency', good: 'Names the specific tools: Evolution API, Retell AI, n8n, GPT-4o', bad: 'Vague "proprietary AI platform" language' },
        { name: 'Pricing Model', good: 'Fixed monthly retainer with clear scope', bad: 'Hourly billing or undefined "custom" pricing' },
        { name: 'Case Studies', good: 'Specific results: "Clinic X reduced no-shows by 40%"', bad: '"We helped many businesses improve efficiency"' },
        { name: 'Integration Depth', good: 'Can connect to your specific CRM/booking system', bad: 'Only works with their in-house tools' },
        { name: 'Bilingual Support', good: 'Turkish/English support if you serve TR market', bad: 'English only, no localisation capability' },
        { name: 'Ownership', good: 'You own the workflows, data and integrations', bad: 'Lock-in: workflows only work within their platform' },
      ]
    : [
        { name: 'Stack Şeffaflığı', good: 'Spesifik araçları adlandırır: Evolution API, Retell AI, n8n', bad: '"Özel AI platformumuz" gibi belirsiz dil' },
        { name: 'Fiyatlandırma Modeli', good: 'Net kapsama sahip sabit aylık retainer', bad: 'Saatlik faturalandırma veya tanımsız "özel" fiyatlandırma' },
        { name: 'Vaka Çalışmaları', good: 'Spesifik sonuçlar: "X Kliniği no-show\'larını %40 azalttı"', bad: '"Pek çok işletmenin verimliliğini artırdık"' },
        { name: 'Entegrasyon Derinliği', good: 'Spesifik CRM/rezervasyon sisteminize bağlanabilir', bad: 'Yalnızca kendi iç araçlarıyla çalışır' },
        { name: 'İki Dilli Destek', good: 'TR pazarına hizmet veriyorsanız Türkçe/İngilizce destek', bad: 'Yalnızca İngilizce, yerelleştirme yeteneği yok' },
        { name: 'Sahiplik', good: 'Workflow\'lar, veriler ve entegrasyonlar size ait', bad: 'Bağımlılık: workflow\'lar yalnızca kendi platformunda çalışır' },
      ];

  return (
    <>
      <Seo
        title={
          isEN
            ? 'UK AI Automation Agencies: What to Look For in 2026 · MGL'
            : 'UK AI Otomasyon Ajansları: 2026\'da Nelere Bakmalı · MGL'
        }
        description={
          isEN
            ? 'Choosing an AI automation agency in the UK? Key criteria, red flags, pricing benchmarks and what questions to ask. Updated for 2026.'
            : 'UK\'de AI otomasyon ajansı mı seçiyorsunuz? Temel kriterler, kırmızı bayraklar, fiyat kıyasları ve sormanız gereken sorular. 2026 güncellemesi.'
        }
        path="/uk-ai-agencies-comparison"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['uk ai automation agency', 'ai agency london', 'best ai agency uk', 'automation agency comparison uk', 'n8n agency uk']
            : ['uk ai otomasyon ajansı', 'ai ajans londra', 'en iyi ai ajansı uk', 'otomasyon ajansı karşılaştırma']
        }
        jsonLd={[articleSchema, faqSchema(faqs), breadcrumb]}
      />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {isEN
              ? 'UK AI Automation Agencies: What to Look For in 2026'
              : 'UK AI Otomasyon Ajansları: 2026\'da Nelere Bakmalı'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 680 }}>
            {isEN
              ? 'The UK AI agency market is crowded with bold claims and vague promises. This guide covers what separates good agencies from great ones — and the red flags that should make you walk away.'
              : 'UK AI ajans pazarı cesur iddialar ve belirsiz vaatlerle dolup taşıyor. Bu rehber, iyi ajansları harikalardan ayıran şeyleri ve sizi uzaklaştırması gereken kırmızı bayrakları ele alıyor.'}
          </p>
        </header>

        {/* Criteria Grid */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1.25rem' }}>
            {isEN ? 'Evaluation criteria' : 'Değerlendirme kriterleri'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {criteria.map((c) => (
              <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: '1rem', padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'flex-start' }}>{c.name}</div>
                <div style={{ color: 'var(--body)', lineHeight: 1.55 }}><span style={{ color: 'green', fontWeight: 700 }}>✅ </span>{c.good}</div>
                <div style={{ color: 'var(--muted)', lineHeight: 1.55 }}><span style={{ color: 'red', fontWeight: 700 }}>🚩 </span>{c.bad}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MGL positioning */}
        <section style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>
            {isEN ? 'Where MGL Digital Media fits' : 'MGL Digital Media\'nın konumu'}
          </h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: 'var(--body)', fontSize: '0.925rem' }}>
            {(isEN
              ? [
                  'Stack: Evolution API + n8n + Retell AI + GPT-4o — fully disclosed',
                  'Pricing: Fixed retainers from £119/month, all-inclusive',
                  'Bilingual: Turkish and English, native TR market expertise',
                  'Ownership: Clients own all workflows, data and integrations',
                  'Registered UK company: No. 16007414, Enfield EN1 1LS',
                  'Remote delivery: UK and Turkey served equally',
                ]
              : [
                  'Stack: Evolution API + n8n + Retell AI + GPT-4o — tam şeffaflık',
                  'Fiyatlandırma: £119/ay\'dan sabit retainer, hepsi dahil',
                  'İki dilli: Türkçe ve İngilizce, yerel TR pazar uzmanlığı',
                  'Sahiplik: Müşteriler tüm workflow\'ları, verileri ve entegrasyonları sahiplenir',
                  'Kayıtlı UK şirketi: No. 16007414, Enfield EN1 1LS',
                  'Uzaktan teslimat: UK ve Türkiye eşit şekilde hizmet görür',
                ]
            ).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1.25rem' }}>
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

        <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
            {isEN ? 'Want to see what MGL would do for your business?' : 'MGL\'nin işletmeniz için neler yapabileceğini görmek ister misiniz?'}
          </p>
          <p style={{ opacity: 0.8, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            {isEN ? 'Free 15-minute audit. Specific recommendations, no sales pitch.' : 'Ücretsiz 15 dakikalık analiz. Spesifik öneriler, satış baskısı yok.'}
          </p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            {isEN ? 'Book Free Audit' : 'Ücretsiz Analiz →'}
          </a>
        </div>
      </section>
    </>
  );
}
