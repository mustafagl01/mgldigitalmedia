import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'WhatsApp Cloud API ve Evolution API arasındaki temel fark nedir?', answer: 'WhatsApp Cloud API Meta\'nın resmî çözümüdür. Evolution API, Baileys tabanlı self-hosted ve resmî olmayan bir bağlantıdır. Fiyat, kapasite ve uygunluk mesaj türüne, ülkeye, sunucuya ve işletme gereksinimine göre değişir.' },
  { question: 'Evolution API (Baileys) güvenli mi?', answer: 'Evolution API aktif olarak geliştirilen ve Türkiye başta olmak üzere KOBİ ekosisteminde yaygın kullanılan bir çözümdür. Self-hosted olması veri güvenliği açısından avantaj sağlar. Ancak Meta\'nın resmi onayı yoktur; bu kısıtlamayı bilerek kullanılmalıdır.' },
  { question: 'Kurumsal şirketler hangisini kullanmalı?', answer: 'Çok yüksek mesaj hacmi, resmi API desteği ve SLA garantisi gerektiren kurumsal şirketler için WhatsApp Cloud API daha uygundur. KOBİ\'ler ve ajanslar için Evolution API daha avantajlıdır.' },
  { question: 'Evolution API ile gönderilen mesajlar engellenir mi?', answer: 'Spam davranışı (toplu mesaj gönderme, kısa sürede çok fazla kişiye ulaşma) hesap yasağına yol açabilir. İyi tasarlanmış sistemlerde, gerçek müşteri iletişiminde bu risk minimumdur.' },
  { question: 'MGL hangi stack\'i kullanıyor?', answer: 'Her iki rotayı da değerlendiriyoruz. Resmî şablonlar ve kurumsal kontrol gereken projelerde Meta Cloud API/BSP; uygun, kontrollü senaryolarda self-hosted bağlantı kullanılabilir.' },
];

const FAQS_EN = [
  { question: 'What is the core difference between WhatsApp Cloud API and Evolution API?', answer: 'WhatsApp Cloud API is Meta\'s official solution. Evolution API is a self-hosted, unofficial connection built on Baileys. Price, capacity and suitability vary by message type, country, infrastructure and operating requirements.' },
  { question: 'Is Evolution API (Baileys) safe?', answer: 'Evolution API is actively developed and widely used in the SMB ecosystem, particularly in Turkey. Self-hosted means better data security. However, it\'s not Meta-officially approved — this should be understood before use.' },
  { question: 'Which should enterprise companies use?', answer: 'Enterprise companies requiring very high message volumes, official API support and SLA guarantees are better served by WhatsApp Cloud API. SMBs and agencies benefit more from Evolution API.' },
  { question: 'Can Evolution API messages get blocked?', answer: 'Spam behaviour (bulk messaging, reaching many new contacts rapidly) can trigger account bans. In well-designed systems handling genuine customer communication, this risk is minimal.' },
  { question: 'Which stack does MGL use?', answer: 'We assess both routes. Meta Cloud API/BSP suits official templates and enterprise controls; a self-hosted connection may suit carefully controlled use cases.' },
];

export default function WhatsappCloudApiVsBaileys() {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const faqs = isEN ? FAQS_EN : FAQS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'WhatsApp Cloud API vs Baileys' : 'WhatsApp Cloud API vs Baileys', path: '/whatsapp-cloud-api-vs-baileys' },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEN ? 'WhatsApp Cloud API vs Baileys (Evolution API): 2026 Comparison' : 'WhatsApp Cloud API vs Baileys (Evolution API): 2026 Karşılaştırma',
    url: `${SITE_URL}/whatsapp-cloud-api-vs-baileys`,
    datePublished: '2026-05-03',
    author: { '@id': `${SITE_URL}/#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const rows = isEN
    ? [
        ['Provider', 'Meta (official)', 'Open-source / Self-hosted'],
        ['Pricing', 'Meta pricing varies by market and message category', 'Server, maintenance and provider usage'],
        ['Capacity', 'Account, quality and platform rules apply', 'Depends on server and connection stability'],
        ['Business verification', 'May be required for production features', 'No Meta approval, but remains unofficial'],
        ['Setup time', 'Depends on verification and scope', 'Depends on hosting, testing and scope'],
        ['Data residency', '❌ Meta cloud', '✅ Your server'],
        ['API stability', '✅ Official SLA', '⚠️ Community-maintained'],
        ['Webhook support', '✅ Full', '✅ Full'],
        ['Broadcast messages', '✅ Template-based', '⚠️ Spam risk if misused'],
        ['Best for', 'Official support, templates, enterprise controls', 'Controlled use cases that accept unofficial-connection risk'],
      ]
    : [
        ['Sağlayıcı', 'Meta (resmi)', 'Açık kaynak / Self-hosted'],
        ['Fiyatlandırma', 'Pazara ve mesaj kategorisine göre değişir', 'Sunucu, bakım ve sağlayıcı kullanımı'],
        ['Kapasite', 'Hesap, kalite ve platform kuralları geçerli', 'Sunucu ve bağlantı kararlılığına bağlı'],
        ['İşletme doğrulama', 'Üretim özellikleri için gerekebilir', 'Meta onayı yoktur; bağlantı resmî değildir'],
        ['Kurulum süresi', 'Doğrulama ve kapsama bağlı', 'Barındırma, test ve kapsama bağlı'],
        ['Veri konumu', '❌ Meta bulutu', '✅ Kendi sunucunuz'],
        ['API stabilitesi', '✅ Resmi SLA', '⚠️ Community tarafından geliştirilir'],
        ['Webhook desteği', '✅ Tam', '✅ Tam'],
        ['Toplu mesaj', '✅ Şablon tabanlı', '⚠️ Kötüye kullanımda spam riski'],
        ['En iyi kim için', 'Resmî destek, şablonlar, kurumsal kontrol', 'Resmî olmayan bağlantı riskini kabul eden kontrollü senaryolar'],
      ];

  return (
    <>
      <Seo
        title={
          isEN
            ? 'WhatsApp Cloud API vs Baileys/Evolution API: 2026 Comparison · MGL'
            : 'WhatsApp Cloud API vs Baileys (Evolution API): 2026 Karşılaştırma · MGL'
        }
        description={
          isEN
            ? 'WhatsApp Cloud API vs Evolution API (Baileys): pricing, setup time, data residency, and which is better for your UK or Turkish business.'
            : 'WhatsApp Cloud API ve Evolution API (Baileys): fiyatlandırma, kurulum süresi, veri konumu ve işletmeniz için hangisinin daha iyi olduğu.'
        }
        path="/whatsapp-cloud-api-vs-baileys"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['whatsapp cloud api vs baileys', 'evolution api vs whatsapp api', 'whatsapp business api alternative', 'baileys whatsapp']
            : ['whatsapp cloud api karşılaştırma', 'evolution api vs whatsapp', 'whatsapp api alternatifi', 'baileys whatsapp türkiye']
        }
        jsonLd={[articleSchema, faqSchema(faqs), breadcrumb]}
      />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {isEN ? 'WhatsApp Cloud API vs Baileys (Evolution API): 2026 Comparison' : 'WhatsApp Cloud API vs Baileys (Evolution API): 2026 Karşılaştırma'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 680 }}>
            {isEN
              ? 'Meta\'s official WhatsApp Business API charges per conversation. Evolution API (built on Baileys) is self-hosted and free of per-message fees. Which is right for your business?'
              : 'Meta\'nın resmi WhatsApp Business API\'si konuşma başına ücret alıyor. Evolution API (Baileys tabanlı) self-hosted ve mesaj başına ücret yok. İşletmeniz için hangisi doğru?'}
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
            {isEN
              ? 'Quick verdict: choose the official route when account continuity, templates and support are critical. Consider self-hosted only after accepting and controlling its connection risk.'
              : 'Hızlı sonuç: hesap sürekliliği, şablonlar ve destek kritikse resmî rotayı seçin. Self-hosted bağlantıyı ancak riskini kabul edip kontrol edebiliyorsanız değerlendirin.'}
          </p>
        </header>

        {/* Table */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'Feature' : 'Özellik'}
                  </th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)', whiteSpace: 'nowrap' }}>WhatsApp Cloud API</th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)', whiteSpace: 'nowrap' }}>Evolution API (Baileys)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feat, cloud, baileys]) => (
                  <tr key={feat}>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--ink)' }}>{feat}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--muted)' }}>{cloud}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>{baileys}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'Want to deploy a WhatsApp AI agent?' : 'WhatsApp AI asistan kurmak ister misiniz?'}</p>
          <p style={{ opacity: 0.8, marginBottom: '1.25rem', fontSize: '0.9rem' }}>{isEN ? 'We handle the full setup — Evolution API, n8n, AI integration.' : 'Tüm kurulumu yapıyoruz — Evolution API, n8n, AI entegrasyonu.'}</p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            {isEN ? 'Book Free Audit' : 'Ücretsiz Analiz →'}
          </a>
        </div>
      </section>
    </>
  );
}
