import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'WhatsApp Cloud API ve Evolution API arasındaki temel fark nedir?', answer: 'WhatsApp Cloud API, Meta\'nın resmi bulut çözümüdür; mesaj başına ~$0.05-0.15 ücret alır. Evolution API, Baileys kütüphanesi üzerine kurulmuş açık kaynak bir alternatiftir; sabit sunucu maliyetiyle sınırsız mesaj işler.' },
  { question: 'Evolution API (Baileys) güvenli mi?', answer: 'Evolution API aktif olarak geliştirilen ve Türkiye başta olmak üzere KOBİ ekosisteminde yaygın kullanılan bir çözümdür. Self-hosted olması veri güvenliği açısından avantaj sağlar. Ancak Meta\'nın resmi onayı yoktur; bu kısıtlamayı bilerek kullanılmalıdır.' },
  { question: 'Kurumsal şirketler hangisini kullanmalı?', answer: 'Çok yüksek mesaj hacmi, resmi API desteği ve SLA garantisi gerektiren kurumsal şirketler için WhatsApp Cloud API daha uygundur. KOBİ\'ler ve ajanslar için Evolution API daha avantajlıdır.' },
  { question: 'Evolution API ile gönderilen mesajlar engellenir mi?', answer: 'Spam davranışı (toplu mesaj gönderme, kısa sürede çok fazla kişiye ulaşma) hesap yasağına yol açabilir. İyi tasarlanmış sistemlerde, gerçek müşteri iletişiminde bu risk minimumdur.' },
  { question: 'MGL hangi stack\'i kullanıyor?', answer: 'MGL Digital Media olarak Evolution API + n8n kombinasyonunu kullanıyoruz. Bu stack, Türkiye ve UK KOBİ\'lerinin büyük çoğunluğu için maliyet ve özellik açısından optimaldır.' },
];

const FAQS_EN = [
  { question: 'What is the core difference between WhatsApp Cloud API and Evolution API?', answer: 'WhatsApp Cloud API is Meta\'s official cloud solution charging ~$0.05-0.15 per conversation. Evolution API is an open-source alternative built on Baileys; it processes unlimited messages at a fixed server cost.' },
  { question: 'Is Evolution API (Baileys) safe?', answer: 'Evolution API is actively developed and widely used in the SMB ecosystem, particularly in Turkey. Self-hosted means better data security. However, it\'s not Meta-officially approved — this should be understood before use.' },
  { question: 'Which should enterprise companies use?', answer: 'Enterprise companies requiring very high message volumes, official API support and SLA guarantees are better served by WhatsApp Cloud API. SMBs and agencies benefit more from Evolution API.' },
  { question: 'Can Evolution API messages get blocked?', answer: 'Spam behaviour (bulk messaging, reaching many new contacts rapidly) can trigger account bans. In well-designed systems handling genuine customer communication, this risk is minimal.' },
  { question: 'Which stack does MGL use?', answer: 'MGL Digital Media uses Evolution API + n8n. This stack is optimal for the vast majority of UK and Turkish SMBs in terms of cost and features.' },
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
        ['Pricing', '~$0.05-0.15 per conversation', 'Fixed server cost (~€15-30/mo)'],
        ['Message limits', 'Tiered (1K free/mo, paid after)', 'Unlimited'],
        ['Approval required', '✅ Yes (2-4 weeks)', '❌ No'],
        ['Setup time', '2-4 weeks', '1-3 days'],
        ['Data residency', '❌ Meta cloud', '✅ Your server'],
        ['API stability', '✅ Official SLA', '⚠️ Community-maintained'],
        ['Webhook support', '✅ Full', '✅ Full'],
        ['Broadcast messages', '✅ Template-based', '⚠️ Spam risk if misused'],
        ['Best for', 'Large enterprise, regulated sectors', 'SMBs, agencies, high-volume chatbots'],
      ]
    : [
        ['Sağlayıcı', 'Meta (resmi)', 'Açık kaynak / Self-hosted'],
        ['Fiyatlandırma', 'Konuşma başına ~$0.05-0.15', 'Sabit sunucu maliyeti (~€15-30/ay)'],
        ['Mesaj limiti', 'Kademeli (aylık 1K ücretsiz, sonrası ücretli)', 'Sınırsız'],
        ['Onay gereksinimi', '✅ Evet (2-4 hafta)', '❌ Hayır'],
        ['Kurulum süresi', '2-4 hafta', '1-3 gün'],
        ['Veri konumu', '❌ Meta bulutu', '✅ Kendi sunucunuz'],
        ['API stabilitesi', '✅ Resmi SLA', '⚠️ Community tarafından geliştirilir'],
        ['Webhook desteği', '✅ Tam', '✅ Tam'],
        ['Toplu mesaj', '✅ Şablon tabanlı', '⚠️ Kötüye kullanımda spam riski'],
        ['En iyi kim için', 'Büyük kurumsal, düzenlenmiş sektörler', 'KOBİ\'ler, ajanslar, yüksek hacimli chatbotlar'],
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
              ? '⚡ Quick verdict: For UK/Turkish SMBs, Evolution API + n8n is 5-10x more cost-effective. We use it for all our clients.'
              : '⚡ Hızlı sonuç: UK/Türkiye KOBİ\'leri için Evolution API + n8n 5-10x daha maliyet-etkin. Tüm müşterilerimizde bunu kullanıyoruz.'}
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
