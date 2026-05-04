import React from 'react';
import { Seo, serviceSchema, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const SITE_URL = 'https://mgl-ai.uk';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

const FAQS_TR = [
  { question: 'WhatsApp AI asistan kurmak ne kadar sürer?', answer: 'Evolution API + n8n altyapısıyla temel bir WhatsApp AI asistan 3-7 iş günü içinde devreye alınabilir. CRM entegrasyonu ve sektöre özel bilgi tabanı eklenirse 2-3 haftaya uzayabilir.' },
  { question: 'WhatsApp Business API mi kullanıyorsunuz?', answer: 'Hayır. Meta\'nın resmi Business API\'si mesaj başına ücret alır ve onay süreci gerektirir. Biz Evolution API (self-hosted, açık kaynak) kullanıyoruz; sabit maliyetle sınırsız mesaj işlenir.' },
  { question: 'Mevcut CRM\'imle entegre olabilir mi?', answer: 'Evet. n8n; HubSpot, Pipedrive, Zoho, Salesforce ve 400+ uygulamaya resmi entegrasyon sunar. Özel REST API olan herhangi bir yazılıma da bağlanılabilir.' },
  { question: 'Ses mesajlarını da anlayabiliyor mu?', answer: 'Evet. Whisper API entegrasyonu ile asistan gelen sesli mesajları metne çevirip yanıtlayabilir.' },
  { question: 'Müşteriler botla konuştuğunu anlıyor mu?', answer: 'İyi tasarlanmış sistemlerde çoğunluk fark etmez. Ancak "insan mısın?" sorusuna dürüst yanıt vermesi için sistemi yapılandırıyoruz.' },
  { question: 'Aylık ücret ne kadar?', answer: 'Starter Agent Paketi 3.999 TRY/ay\'dan başlar (kurulum dahil, teknik bakım dahil). Growth ve Advanced paketler için fiyatlandırma sayfasını inceleyin.' },
];

const FAQS_EN = [
  { question: 'How long does it take to set up a WhatsApp AI agent?', answer: 'A basic WhatsApp AI agent using Evolution API + n8n can be live within 3-7 business days. Full CRM integration and custom knowledge base typically takes 2-3 weeks.' },
  { question: 'Do you use the official WhatsApp Business API?', answer: 'No. Meta\'s official API charges per message and requires an approval process. We use Evolution API — self-hosted, open-source — which processes unlimited messages at a fixed server cost.' },
  { question: 'Can it integrate with my existing CRM?', answer: 'Yes. n8n connects to HubSpot, Pipedrive, Zoho, Salesforce and 400+ apps natively. Any custom REST API can also be integrated via the HTTP node.' },
  { question: 'Can it handle voice messages?', answer: 'Yes. With Whisper API integration, the agent transcribes incoming voice messages and responds accordingly.' },
  { question: 'Will customers know they\'re talking to a bot?', answer: 'Most customers won\'t notice with a well-designed agent. We configure the system to respond honestly when directly asked "are you a bot?".' },
  { question: 'How much does it cost per month?', answer: 'Starter Agent Package starts at £119/month (includes setup and technical maintenance). See /packages for Growth and Advanced tiers.' },
];

const PROCESS_TR = [
  { step: 1, title: 'Analiz', desc: 'İşletmenizin iletişim akışını, en sık sorulan soruları ve CRM gereksinimlerini belirleriz.' },
  { step: 2, title: 'Kurulum', desc: 'Evolution API sunucu kurulumu, WhatsApp bağlantısı, n8n workflow tasarımı ve bilgi tabanı oluşturulur.' },
  { step: 3, title: 'Test', desc: 'Gerçek senaryolarla kapsamlı test yapılır, yanıtlar kalibre edilir, uç durumlar ele alınır.' },
  { step: 4, title: 'Canlı & Bakım', desc: 'Sistemi canlıya alıyoruz ve sürekli izleme, güncelleme, destek sağlıyoruz.' },
];

const PROCESS_EN = [
  { step: 1, title: 'Discovery', desc: 'We map your communication flow, most frequent questions, and CRM requirements.' },
  { step: 2, title: 'Build', desc: 'Evolution API server setup, WhatsApp connection, n8n workflow design and knowledge base creation.' },
  { step: 3, title: 'Testing', desc: 'Comprehensive testing with real scenarios, response calibration, edge case handling.' },
  { step: 4, title: 'Go Live & Support', desc: 'We launch the system and provide ongoing monitoring, updates and support.' },
];

const CASES_TR = [
  { sector: 'Diş Kliniği', result: 'Hafta sonu gelen 120 mesajın %85\'i AI tarafından yanıtlandı; 28 ek randevu alındı.', icon: '🦷' },
  { sector: 'Emlak Ofisi', result: 'Çalışma saatleri dışı gelen leadlerin %60\'ı ertesi güne AI ile hazır bilgiyle girdi.', icon: '🏠' },
  { sector: 'Güzellik Salonu', result: 'Randevu asistanı sayesinde personel WhatsApp\'ta harcadığı 30 saati/ay sıfıra indirdi.', icon: '💇' },
];

const CASES_EN = [
  { sector: 'Dental Clinic', result: '85% of 120 weekend messages answered by AI; 28 additional bookings captured.', icon: '🦷' },
  { sector: 'Estate Agency', result: '60% of after-hours leads pre-qualified by morning with full context.', icon: '🏠' },
  { sector: 'Beauty Salon', result: 'Staff WhatsApp time reduced from 30 hours/month to near zero.', icon: '💇' },
];

export default function WhatsappAiAsistan() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const faqs = isEN ? FAQS_EN : FAQS_TR;
  const process = isEN ? PROCESS_EN : PROCESS_TR;
  const cases = isEN ? CASES_EN : CASES_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'WhatsApp AI Agent' : 'WhatsApp AI Asistan', path: '/whatsapp-ai-asistan' },
  ]);

  const svc = serviceSchema({
    name: isEN ? 'WhatsApp AI Agent' : 'WhatsApp AI Asistan',
    description: isEN
      ? 'Production-grade WhatsApp AI assistant built on Evolution API + n8n. Handles inbound messages 24/7, books appointments, qualifies leads and syncs to CRM.'
      : 'Evolution API + n8n tabanlı üretim kalitesi WhatsApp AI asistanı. Gelen mesajları 7/24 karşılar, randevu alır, lead kalifikasyonu yapar ve CRM\'e senkronize eder.',
    path: '/whatsapp-ai-asistan',
    category: 'AI Automation',
    offers: [
      { name: 'Starter', price: 3999, priceCurrency: 'TRY', priceFrom: true },
      { name: 'Starter UK', price: 119, priceCurrency: 'GBP', priceFrom: true },
    ],
  });

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEN ? 'How to set up a WhatsApp AI agent with MGL' : 'MGL ile WhatsApp AI Asistan Nasıl Kurulur',
    description: isEN
      ? '4-step process to deploy a production-grade WhatsApp AI agent for your business.'
      : 'İşletmeniz için üretim kalitesi WhatsApp AI asistan kurmanın 4 adımlı süreci.',
    totalTime: 'P7D',
    step: process.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <>
      <Seo
        title={
          isEN
            ? 'WhatsApp AI Agent for UK & Turkish Businesses · MGL'
            : 'WhatsApp AI Asistan — 7/24 Otomatik Müşteri İletişimi · MGL'
        }
        description={
          isEN
            ? 'Deploy a WhatsApp AI agent in under a week. Evolution API + n8n stack. No per-message fees. Appointment booking, FAQ handling, CRM sync. From £119/month.'
            : 'Bir haftadan kısa sürede WhatsApp AI asistan kurun. Evolution API + n8n altyapısı. Mesaj başına ücret yok. Randevu alma, SSS yanıtlama, CRM entegrasyonu. 3.999 TRY/ay\'dan başlar.'
        }
        path="/whatsapp-ai-asistan"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['whatsapp ai agent uk', 'whatsapp automation', 'evolution api', 'n8n whatsapp', 'whatsapp chatbot uk']
            : ['whatsapp ai asistan', 'whatsapp otomasyon türkiye', 'evolution api', 'whatsapp bot', 'n8n whatsapp kurulum']
        }
        jsonLd={[svc, faqSchema(faqs), breadcrumb, howToSchema]}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: 'clamp(3rem,8vw,5rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem,5vw,3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {isEN
              ? 'WhatsApp AI Agent for Your Business'
              : 'İşletmeniz için WhatsApp AI Asistan'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.65, marginBottom: '2rem', maxWidth: 580, margin: '0 auto 2rem' }}>
            {isEN
              ? 'Answer every WhatsApp message in under 3 seconds, 24/7. Book appointments, handle FAQs, qualify leads — all automatically. Evolution API + n8n, no per-message fees.'
              : 'Her WhatsApp mesajını 3 saniyede, 7/24 yanıtlayın. Randevu alın, SSS\'leri cevaplayın, lead kalifikasyonu yapın — tamamen otomatik. Evolution API + n8n, mesaj başına ücret yok.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {isEN ? 'Book Free 15-min Audit' : 'Ücretsiz 15 dk Analiz'}
            </a>
            <a
              href="/blog/whatsapp-ai-asistan-isletme-otomasyonu-2026"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                background: 'transparent',
                color: 'var(--paper)',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                border: '1.5px solid rgba(255,255,255,0.35)',
              }}
            >
              {isEN ? 'Read the Guide' : 'Rehberi Oku'}
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { v: '<3s', l: isEN ? 'Response time' : 'Yanıt süresi' },
          { v: '7/24', l: isEN ? 'Always on' : 'Kesintisiz' },
          { v: '80%', l: isEN ? 'Messages resolved automatically' : 'Mesaj otomatik çözüm' },
          { v: '3-7 ' + (isEN ? 'days' : 'gün'), l: isEN ? 'Time to go live' : 'Kurulum süresi' },
        ].map((s) => (
          <div
            key={s.v}
            style={{
              padding: '1.5rem 2.5rem',
              textAlign: 'center',
              borderRight: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{s.v}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{s.l}</div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Stack Explanation */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.3rem,3vw,1.8rem)',
              fontWeight: 800,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
            }}
          >
            {isEN ? 'Built on the right stack' : 'Doğru altyapı ile kurulmuş'}
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: 680, marginBottom: '2rem' }}>
            {isEN
              ? "We don't use Meta's official WhatsApp Business API (which charges per message and takes weeks to approve). Our stack: Evolution API (open-source, self-hosted) + n8n for workflow logic + GPT-4o for natural language understanding. Result: unlimited messages at a fixed monthly cost."
              : "Meta'nın resmi WhatsApp Business API'sini kullanmıyoruz (mesaj başına ücret alır, onayı haftalar sürer). Altyapımız: Evolution API (açık kaynak, self-hosted) + n8n workflow motoru + GPT-4o doğal dil anlama. Sonuç: sabit aylık maliyetle sınırsız mesaj."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1rem' }}>
            {[
              { name: 'Evolution API', desc: isEN ? 'Open-source WhatsApp layer. No per-message fees.' : 'Açık kaynak WhatsApp katmanı. Mesaj başına ücret yok.' },
              { name: 'n8n', desc: isEN ? 'Visual workflow engine. 400+ integrations.' : 'Görsel workflow motoru. 400+ entegrasyon.' },
              { name: 'GPT-4o / LLM', desc: isEN ? 'Natural language understanding & response generation.' : 'Doğal dil anlama ve yanıt üretimi.' },
              { name: isEN ? 'Your CRM' : 'CRM\'iniz', desc: isEN ? 'HubSpot, Pipedrive, Zoho or custom — all connected.' : 'HubSpot, Pipedrive, Zoho veya özel — hepsi bağlı.' },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  padding: '1.25rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                }}
              >
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
              <div
                key={s.step}
                style={{
                  padding: '1.5rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem', fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.5rem' }}>
            {isEN ? 'Typical results' : 'Tipik sonuçlar'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1rem' }}>
            {cases.map((c) => (
              <div
                key={c.sector}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  background: 'var(--surface)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{c.sector}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{c.result}</p>
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
              <details
                key={i}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '0.875rem 1.25rem',
                  background: 'var(--surface)',
                }}
              >
                <summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--ink)', fontSize: '0.975rem' }}>
                  {faq.question}
                </summary>
                <p style={{ marginTop: '0.75rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '2rem 0 5rem', textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              borderRadius: 16,
              padding: 'clamp(2rem,5vw,3.5rem) 2rem',
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              {isEN ? 'Ready to automate your WhatsApp?' : 'WhatsApp\'ınızı otomatize etmeye hazır mısınız?'}
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? 'Book a free 15-minute call. We\'ll assess your setup and show exactly what an AI agent would look like for your business.'
                : '15 dakikalık ücretsiz görüşme alın. Mevcut durumunuzu değerlendirir, işletmeniz için nasıl bir AI asistan kurulacağını gösteririz.'}
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2.5rem',
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {isEN ? 'Book Free 15-min Audit' : 'Ücretsiz Analiz Al →'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
