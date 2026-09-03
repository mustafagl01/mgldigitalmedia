import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_EN = [
  { question: 'What should I look for in a UK AI automation agency?', answer: 'Key criteria: technical stack transparency (what tools they actually use), fixed pricing vs retainer, ability to integrate with your existing software, Turkish/bilingual support if needed, and actual case studies rather than vague claims.' },
  { question: 'How much do UK AI automation agencies charge?', answer: 'Fees vary materially with discovery, integrations, security, support and usage. Compare written scope, setup, recurring, usage and third-party costs rather than a headline monthly number.' },
  { question: 'Does MGL serve UK businesses?', answer: 'Yes. MGL Digital Media is registered in England and Wales (Company No. 16007414, Enfield EN1 1LS). We serve UK businesses with no setup fee: a £9.90/month system fee plus metered usage, with full technical support.' },
  { question: 'What AI automation services do UK agencies typically offer?', answer: 'WhatsApp/SMS chatbots, AI voice agents, CRM integration, workflow automation (n8n/Zapier/Make), Meta/Google ad management, SEO and conversion-focused web development.' },
  { question: 'How long does it take to see results?', answer: 'Technical measures such as response time can be observed after launch; commercial outcomes need a suitable baseline and enough real traffic. Ask the agency to define measures and review dates before work begins.' },
];

const FAQS_TR = [
  { question: 'UK AI otomasyon ajansında nelere bakmalıyım?', answer: 'Temel kriterler: teknik stack şeffaflığı (gerçekten hangi araçları kullandıkları), sabit fiyatlandırma vs retainer, mevcut yazılımınızla entegrasyon yeteneği, Türkçe/iki dilli destek ihtiyacı ve belirsiz iddialar yerine gerçek vaka çalışmaları.' },
  { question: 'UK AI otomasyon ajansları ne kadar ücret alıyor?', answer: 'Ücret; keşif, entegrasyon, güvenlik, destek ve kullanıma göre ciddi biçimde değişir. Yalnızca aylık etiketi değil; yazılı kapsamı, kurulumu, tekrarlayan bedeli, kullanımı ve üçüncü taraf giderlerini karşılaştırın.' },
  { question: 'MGL UK işletmelerine hizmet veriyor mu?', answer: 'Evet. MGL Digital Media İngiltere\'de kayıtlıdır (Şirket No: 16007414, Enfield EN1 1LS). UK işletmelerine kurulum ücreti almadan, aylık £9,90 sistem bedeli ve kullandığınız kadar kullanımla tam teknik destek veriyoruz.' },
  { question: 'UK ajansları tipik olarak hangi AI otomasyon hizmetlerini sunuyor?', answer: 'WhatsApp/SMS chatbotlar, AI sesli asistanlar, CRM entegrasyonu, workflow otomasyonu (n8n/Zapier/Make), Meta/Google reklam yönetimi, SEO ve dönüşüm odaklı web geliştirme.' },
  { question: 'Sonuçlar ne zaman görülür?', answer: 'Yanıt süresi gibi teknik ölçüler canlıya alındıktan sonra görülebilir; ticari sonuç için sağlıklı bir başlangıç verisi ve yeterli gerçek trafik gerekir. Başlamadan önce ölçüleri ve değerlendirme tarihini yazılı belirleyin.' },
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
        { name: 'Evidence', good: 'Named scope, baseline, period and measured outcome', bad: 'Percentages without source, baseline or timeframe' },
        { name: 'Integration Depth', good: 'Can connect to your specific CRM/booking system', bad: 'Only works with their in-house tools' },
        { name: 'Bilingual Support', good: 'Turkish/English support if you serve TR market', bad: 'English only, no localisation capability' },
        { name: 'Ownership', good: 'You own the workflows, data and integrations', bad: 'Lock-in: workflows only work within their platform' },
      ]
    : [
        { name: 'Stack Şeffaflığı', good: 'Spesifik araçları adlandırır: Evolution API, Retell AI, n8n', bad: '"Özel AI platformumuz" gibi belirsiz dil' },
        { name: 'Fiyatlandırma Modeli', good: 'Net kapsama sahip sabit aylık retainer', bad: 'Saatlik faturalandırma veya tanımsız "özel" fiyatlandırma' },
        { name: 'Kanıt', good: 'Açık kapsam, başlangıç verisi, dönem ve ölçülen sonuç', bad: 'Kaynağı, başlangıcı veya dönemi olmayan yüzdeler' },
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
              <div key={c.name} className="comparison-criteria-row" style={{ display: 'grid', gap: '1rem', padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.875rem' }}>
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
                  'Stack: connection, workflow, voice and model providers disclosed per project',
                  'Pricing: setup, recurring, usage and third-party fees shown separately',
                  'Bilingual: Turkish and English, native TR market expertise',
                  'Ownership: Clients own all workflows, data and integrations',
                  'Registered UK company: No. 16007414, Enfield EN1 1LS',
                  'Remote delivery: UK and Turkey served equally',
                ]
              : [
                  'Stack: bağlantı, iş akışı, ses ve model sağlayıcıları projeye göre açıklanır',
                  'Fiyatlandırma: kurulum, aylık, kullanım ve üçüncü taraf giderleri ayrı gösterilir',
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
