import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'Voiceflow nedir?', answer: 'Voiceflow, görsel sürükle-bırak arayüzüyle sesli ve metin bazlı konuşma akışları tasarlamanızı sağlayan bir platformdur. Hem web chatbot hem de sesli asistan için kullanılabilir.' },
  { question: 'Retell AI nedir?', answer: 'Retell AI, düşük gecikmeli gerçek zamanlı sesli AI asistan platformudur. Telefon aramaları için optimize edilmiş; 0.8-1.5 sn yanıt süresi ve Türkçe dil desteği sunar.' },
  { question: 'Hangisi Türkçe destekliyor?', answer: 'Her iki platform da Türkçeyi destekler. Retell AI\'ın sesli konuşma kalitesi (ElevenLabs entegrasyonu ile) telefon aramaları için daha doğal bir deneyim sunar.' },
  { question: 'Fiyat farkı nedir?', answer: 'Voiceflow\'un ücretsiz planı mevcut. Retell AI $29/ay\'dan başlar. Her iki platform da kullanım bazlı ek ücretler alabilir.' },
  { question: 'MGL hangi platformu kullanıyor?', answer: 'Telefon aramaları için Retell AI, karmaşık chatbot akışları için n8n + özel LLM entegrasyonunu tercih ediyoruz.' },
];

const FAQS_EN = [
  { question: 'What is Voiceflow?', answer: 'Voiceflow is a visual drag-and-drop platform for designing voice and text-based conversation flows. Usable for both web chatbots and voice assistants.' },
  { question: 'What is Retell AI?', answer: 'Retell AI is a low-latency real-time voice AI platform optimised for phone calls. Offers 0.8-1.5s response time and Turkish language support.' },
  { question: 'Which supports Turkish?', answer: 'Both platforms support Turkish. Retell AI\'s voice quality (with ElevenLabs integration) provides a more natural phone call experience.' },
  { question: 'What is the price difference?', answer: 'Voiceflow has a free plan. Retell AI starts at $29/month. Both platforms may charge additional usage-based fees.' },
  { question: 'Which does MGL use?', answer: 'We use Retell AI for phone calls and n8n + custom LLM integration for complex chatbot flows.' },
];

export default function VoiceflowVsRetellAi() {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const faqs = isEN ? FAQS_EN : FAQS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Voiceflow vs Retell AI' : 'Voiceflow vs Retell AI', path: '/voiceflow-vs-retell-ai' },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEN ? 'Voiceflow vs Retell AI: 2026 Comparison for Voice AI' : 'Voiceflow vs Retell AI: 2026 Sesli AI Karşılaştırması',
    url: `${SITE_URL}/voiceflow-vs-retell-ai`,
    datePublished: '2026-05-03',
    author: { '@id': `${SITE_URL}/#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const rows = isEN
    ? [
        ['Primary use case', 'Chatbot + voice flow design', 'Low-latency phone voice agents'],
        ['Interface', 'Visual drag-and-drop', 'Code/API + dashboard'],
        ['Latency (voice)', 'Higher (~2-4s)', 'Very low (0.8-1.5s)'],
        ['Turkish support', '✅ Yes', '✅ Yes (ElevenLabs)'],
        ['Phone call handling', '⚠️ Limited', '✅ Built for phone calls'],
        ['Pricing', 'Free tier; paid from $50/mo', '$29/mo baseline'],
        ['n8n integration', '⚠️ Via webhook', '✅ Native webhook'],
        ['Custom LLM', '✅ Yes', '✅ Yes'],
        ['Best for', 'Multi-channel chatbot design', 'Phone AI receptionist / voice agent'],
      ]
    : [
        ['Birincil kullanım', 'Chatbot + sesli akış tasarımı', 'Düşük gecikmeli telefon sesli asistanı'],
        ['Arayüz', 'Görsel sürükle-bırak', 'Kod/API + dashboard'],
        ['Gecikme (sesli)', 'Yüksek (~2-4sn)', 'Çok düşük (0.8-1.5sn)'],
        ['Türkçe desteği', '✅ Evet', '✅ Evet (ElevenLabs)'],
        ['Telefon araması', '⚠️ Sınırlı', '✅ Telefon için tasarlandı'],
        ['Fiyatlandırma', 'Ücretsiz katman; $50/ay\'dan ücretli', '$29/ay başlangıç'],
        ['n8n entegrasyonu', '⚠️ Webhook üzerinden', '✅ Doğal webhook'],
        ['Özel LLM', '✅ Evet', '✅ Evet'],
        ['En iyi kim için', 'Çok kanallı chatbot tasarımı', 'Telefon AI resepsiyonisti / sesli asistan'],
      ];

  return (
    <>
      <Seo
        title={
          isEN
            ? 'Voiceflow vs Retell AI 2026: Which Voice AI Platform? · MGL'
            : 'Voiceflow vs Retell AI 2026: Hangi Sesli AI Platformu? · MGL'
        }
        description={
          isEN
            ? 'Voiceflow vs Retell AI: features, latency, pricing and Turkish language support. Which voice AI platform is right for your business?'
            : 'Voiceflow vs Retell AI: özellikler, gecikme, fiyatlandırma ve Türkçe dil desteği. İşletmeniz için hangi sesli AI platformu doğru?'
        }
        path="/voiceflow-vs-retell-ai"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['voiceflow vs retell ai', 'voice ai platform comparison', 'retell ai review', 'voiceflow alternative', 'ai phone agent platform']
            : ['voiceflow vs retell ai', 'sesli ai platform karşılaştırma', 'retell ai inceleme', 'sesli ai türkiye']
        }
        jsonLd={[articleSchema, faqSchema(faqs), breadcrumb]}
      />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {isEN ? 'Voiceflow vs Retell AI (2026): Voice AI Platform Comparison' : 'Voiceflow vs Retell AI (2026): Sesli AI Platform Karşılaştırması'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 680 }}>
            {isEN
              ? 'Voiceflow excels at multi-channel chatbot design with a visual interface. Retell AI is purpose-built for low-latency phone calls. The right choice depends on your primary use case.'
              : 'Voiceflow görsel arayüzüyle çok kanallı chatbot tasarımında öne çıkıyor. Retell AI düşük gecikmeli telefon aramaları için tasarlandı. Doğru seçim birincil kullanım durumunuza bağlı.'}
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
            {isEN
              ? '⚡ Quick verdict: For phone-based AI receptionist — Retell AI. For omni-channel chatbot design — Voiceflow.'
              : '⚡ Hızlı sonuç: Telefon tabanlı AI resepsiyonist için — Retell AI. Çok kanallı chatbot tasarımı için — Voiceflow.'}
          </p>
        </header>

        <section style={{ marginBottom: '3rem' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'Feature' : 'Özellik'}
                  </th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>Voiceflow</th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>Retell AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feat, vf, retell]) => (
                  <tr key={feat}>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--ink)' }}>{feat}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>{vf}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>{retell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {isEN ? 'Related resources' : 'İlgili kaynaklar'}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><a href="/sesli-ai" style={{ color: 'var(--accent)', textDecoration: 'none' }}>→ {isEN ? 'Voice AI service (Retell AI powered)' : 'Sesli AI hizmetimiz (Retell AI)'}</a></li>
            <li><a href="/blog/sesli-ai-telefon-asistani-rehberi" style={{ color: 'var(--accent)', textDecoration: 'none' }}>→ {isEN ? 'Voice AI phone assistant guide' : 'Sesli AI telefon asistanı rehberi'}</a></li>
          </ul>
        </section>

        <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'Want a demo voice AI call?' : 'Demo sesli AI araması ister misiniz?'}</p>
          <p style={{ opacity: 0.8, marginBottom: '1.25rem', fontSize: '0.9rem' }}>{isEN ? 'Book a free call and hear what your AI receptionist would sound like.' : 'Ücretsiz demo araması alın, AI resepsiyonistinizin nasıl konuşacağını duyun.'}</p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            {isEN ? 'Book Free Demo' : 'Ücretsiz Demo →'}
          </a>
        </div>
      </section>
    </>
  );
}
