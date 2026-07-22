import React from 'react';
import { Seo, serviceSchema, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'Sesli AI Türkçe konuşabiliyor mu?', answer: 'Evet. Retell AI, Türkçe konuşma tanıma (ASR) ve ElevenLabs ses sentezi (TTS) ile doğal Türkçe konuşma sağlar.' },
  { question: 'Yanıt süresi ne kadar?', answer: 'İyi yapılandırılmış Retell AI kurulumunda ilk yanıt 0.8-1.5 saniye. Bir insan operatörün "Merhaba" demesinden daha hızlı.' },
  { question: 'Asistan randevu alabiliyor mu?', answer: 'Evet. n8n entegrasyonu ile Google Calendar, Calendly veya özel takvim sistemlerine gerçek zamanlı bağlanır; müşteri uygun saati söyleyince anında randevu oluşturur.' },
  { question: 'Çalışma saatleri dışındaki aramaları karşılayabilir mi?', answer: 'Evet. Mesai dışı aramalar AI asistan tarafından karşılanır, randevu alınır veya ertesi gün için kayıt tutulur.' },
  { question: 'Müşteriler robotla konuştuğunu anlıyor mu?', answer: 'ElevenLabs sesiyle oldukça doğal konuşma üretilir. Yasal ve etik açıdan aramanın başında "AI asistanla konuşuyorsunuz" bilgisi verilmesini öneriyoruz.' },
  { question: 'Mevcut telefon numaram korunur mu?', answer: 'Evet. Mevcut +90 numaranıza yönlendirme yapılır; müşteriler aynı numarayı aramaya devam eder.' },
  { question: 'Ücretlendirme nasıl?', answer: 'Sesli AI Resepsiyonist 8.999 TRY/ay ve 24.999 TRY tek seferlik kurulumdur. Bağlanan çağrılar ilk dakikadan itibaren 9 TRY/dakikadır; ses, telefon ve üretim tipi AI model/API maliyeti bu dakika ücretine dahildir.' },
];

const FAQS_EN = [
  { question: 'Does the voice AI support Turkish?', answer: 'Yes. Retell AI with ElevenLabs voice synthesis delivers natural Turkish speech recognition and synthesis.' },
  { question: 'What is the response latency?', answer: 'A well-configured Retell AI setup responds in 0.8-1.5 seconds — faster than a human picking up and saying "Hello".' },
  { question: 'Can it book appointments?', answer: 'Yes. Via n8n integration it connects to Google Calendar, Calendly or custom booking systems in real-time; bookings are created instantly when the caller provides their preferred slot.' },
  { question: 'Can it handle after-hours calls?', answer: 'Yes. After-hours calls are handled by the AI agent — appointments booked, information given, or messages logged for follow-up.' },
  { question: 'Will callers know they\'re talking to AI?', answer: 'ElevenLabs produces very natural speech. We recommend (and configure) the agent to identify itself as AI at the start of the call — both ethically and legally.' },
  { question: 'Can I keep my existing phone number?', answer: 'Yes. Call forwarding is set up from your existing number, so customers keep calling the same number they know.' },
  { question: 'How is it priced?', answer: 'Voice AI Receptionist is £249/month plus a £750 one-time setup. Connected calls are £0.15/min from the first minute; voice, telephony and production AI model/API usage are included in that minute rate.' },
];

const PROCESS_TR = [
  { step: 1, title: 'Senaryo Tasarımı', desc: 'Aramanızın akışı, asistanın kişiliği, yapabileceği eylemler ve fallback mantığı belirlenir.' },
  { step: 2, title: 'Retell AI Kurulumu', desc: 'Agent oluşturulur, ses seçilir, Türkçe konfigürasyon yapılır, telefon numarası bağlanır.' },
  { step: 3, title: 'Araç Entegrasyonu', desc: 'n8n üzerinde takvim, CRM ve bilgi tabanı araçları bağlanır; gerçek zamanlı veri erişimi sağlanır.' },
  { step: 4, title: 'Test & Kalibrasyon', desc: 'Farklı aksan ve senaryolarla kapsamlı test, yanıt kalitesi kalibrasyonu, canlıya alma.' },
];

const PROCESS_EN = [
  { step: 1, title: 'Scenario Design', desc: 'Call flow, agent persona, available actions and fallback logic are defined.' },
  { step: 2, title: 'Retell AI Setup', desc: 'Agent created, voice selected, language configured, phone number connected.' },
  { step: 3, title: 'Tool Integration', desc: 'Calendar, CRM and knowledge base tools connected via n8n for real-time data access.' },
  { step: 4, title: 'Test & Go Live', desc: 'Comprehensive testing with different accents and scenarios, response quality calibration, launch.' },
];

export default function SesliAi() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const faqs = isEN ? FAQS_EN : FAQS_TR;
  const process = isEN ? PROCESS_EN : PROCESS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Voice AI' : 'Sesli AI', path: '/sesli-ai' },
  ]);

  const svc = serviceSchema({
    name: isEN ? 'Voice AI Phone Agent' : 'Sesli AI Telefon Asistanı',
    description: isEN
      ? 'AI voice agent powered by Retell AI and ElevenLabs. Handles inbound calls 24/7, books appointments, answers FAQs in Turkish and English.'
      : 'Retell AI ve ElevenLabs ile çalışan sesli AI asistan. Gelen aramaları 7/24 karşılar, randevu alır, Türkçe ve İngilizce SSS yanıtlar.',
    path: '/sesli-ai',
    category: 'AI Voice Agent',
    offers: [
      { name: 'Sesli AI Resepsiyonist', price: 8999, priceCurrency: 'TRY' },
      { name: 'Voice AI Receptionist', price: 249, priceCurrency: 'GBP' },
    ],
  });

  return (
    <>
      <Seo
        title={
          isEN
            ? 'Voice AI Phone Agent for UK & Turkish Businesses · MGL'
            : 'Sesli AI Telefon Asistanı — 7/24 Otomatik Çağrı Merkezi · MGL'
        }
        description={
          isEN
            ? 'Managed Voice AI Receptionist powered by Retell AI. £249/month + £750 setup; connected calls £0.15/min including voice, telephony and AI API usage.'
            : 'Retell AI destekli yönetilen Sesli AI Resepsiyonist. 8.999 TRY/ay + 24.999 TRY kurulum; bağlı çağrılar ses, telefon ve AI API dahil 9 TRY/dakika.'
        }
        path="/sesli-ai"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['voice ai uk', 'ai phone agent', 'retell ai', 'voice receptionist', 'ai call handling']
            : ['sesli ai türkiye', 'ai telefon asistanı', 'retell ai türkçe', 'sesli asistan kurulumu', 'otomatik çağrı merkezi']
        }
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            {isEN ? 'AI Voice Agent for Your Business' : 'İşletmeniz için Sesli AI Asistan'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.65, marginBottom: '2rem', maxWidth: 560, margin: '0 auto 2rem' }}>
            {isEN
              ? 'Every inbound call answered in under 1.5 seconds. Books appointments, answers questions, never takes a break. Powered by Retell AI + ElevenLabs.'
              : 'Her arama 1.5 saniyede karşılanır. Randevu alır, soruları yanıtlar, hiç mola vermez. Retell AI + ElevenLabs altyapısı.'}
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2.25rem',
              background: 'var(--paper)',
              color: 'var(--ink)',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            {isEN ? 'Book Free Demo Call' : 'Ücretsiz Demo Ara'}
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
        {[
          { v: '< 1.5s', l: isEN ? 'Answer time' : 'Yanıt süresi' },
          { v: '7/24', l: isEN ? 'Always on' : 'Kesintisiz' },
          { v: isEN ? 'TR + EN' : 'TR + EN', l: isEN ? 'Languages' : 'Diller' },
          { v: '3-7 ' + (isEN ? 'days' : 'gün'), l: isEN ? 'Deployment' : 'Kurulum' },
        ].map((s) => (
          <div key={s.v} style={{ padding: '1.5rem 2.5rem', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{s.v}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{s.l}</div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Technology */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {isEN ? 'Powered by Retell AI + ElevenLabs' : 'Retell AI + ElevenLabs altyapısı'}
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: 680, marginBottom: '2rem' }}>
            {isEN
              ? 'Retell AI handles real-time speech recognition and conversation management. ElevenLabs provides the natural-sounding voice. n8n connects your calendar, CRM and knowledge base — so the agent can actually do things, not just talk.'
              : 'Retell AI gerçek zamanlı konuşma tanıma ve konuşma yönetimini üstlenir. ElevenLabs doğal ses sağlar. n8n ise takvim, CRM ve bilgi tabanını bağlar; asistan sadece konuşmaz, gerçek işlemler yapar.'}
          </p>
        </section>

        {/* Process */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '2rem' }}>
            {isEN ? 'Deployment process' : 'Kurulum süreci'}
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

        {/* Comparison: AI vs Human */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.5rem' }}>
            {isEN ? 'AI Agent vs Human Receptionist' : 'AI Asistan vs İnsan Resepsiyonist'}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'Feature' : 'Özellik'}
                  </th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'AI Voice Agent' : 'AI Sesli Asistan'}
                  </th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'Human Receptionist' : 'İnsan Resepsiyonist'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(isEN
                  ? [
                      ['Availability', '24/7/365', 'Working hours only'],
                      ['Response time', '< 1.5 seconds', 'Variable, after rings'],
                      ['Simultaneous calls', 'Unlimited', '1 at a time'],
                      ['Monthly cost', '£249 + call usage', '£1,500-2,500+'],
                      ['Sick days / holidays', 'None', 'Yes'],
                      ['Consistency', 'Perfect every time', 'Variable'],
                    ]
                  : [
                      ['Müsaitlik', '7/24/365', 'Sadece mesai saatleri'],
                      ['Yanıt süresi', '< 1.5 saniye', 'Değişken, zil sonrası'],
                      ['Eş zamanlı arama', 'Sınırsız', 'Bir seferde 1'],
                      ['Aylık maliyet', '8.999 TRY + çağrı kullanımı', '11.000 TRY+'],
                      ['Hastalık/izin', 'Yok', 'Var'],
                      ['Tutarlılık', 'Her seferinde mükemmel', 'Değişken'],
                    ]
                ).map(([feat, ai, human]) => (
                  <tr key={feat}>
                    <td style={{ padding: '0.6rem 1rem', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--ink)' }}>{feat}</td>
                    <td style={{ padding: '0.6rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>✅ {ai}</td>
                    <td style={{ padding: '0.6rem 1rem', border: '1px solid var(--border)', color: 'var(--muted)' }}>{human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              {isEN ? 'Hear the AI agent for yourself' : 'AI asistanı kendiniz deneyin'}
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? 'Book a free demo call. We\'ll show you exactly what your AI receptionist would sound and act like.'
                : 'Ücretsiz demo görüşmesi alın. AI resepsiyonistinizin nasıl konuşacağını ve davranacağını gösterelim.'}
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              {isEN ? 'Book Free Demo' : 'Ücretsiz Demo →'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
