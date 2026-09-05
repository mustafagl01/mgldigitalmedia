import React from 'react';
import { Seo, serviceSchema, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { REGIONAL_PRICING } from '../../config/pricing';
import { formatPrice } from '../../utils/formatPrice';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const AUTOMATION_TR = REGIONAL_PRICING.TR.packages.automation;
const AUTOMATION_GB = REGIONAL_PRICING.GB.packages.automation;

const FAQS_TR = [
  { question: 'N8N nedir?', answer: 'N8N, görsel arayüzü ile iş akışlarını otomatize etmenizi sağlayan açık kaynaklı bir otomasyon motorudur. 400+ uygulama entegrasyonu, kod blokları ve koşullu mantık ile karmaşık süreçleri otomatize eder.' },
  { question: 'Zapier veya Make ile farkı nedir?', answer: 'Self-hosted n8n, çalışma kapasitesini kullandığınız sunucu ve akış tasarımına göre yönetmenizi sağlar. Bu model yüksek hacimde ekonomik olabilir; hangi aracın daha uygun olduğunu süreç, ekip ve bakım ihtiyacına göre belirliyoruz.' },
  { question: 'Hangi uygulamalarla entegre olabilir?', answer: 'Gmail, WhatsApp (Evolution API), HubSpot, Pipedrive, Zoho, Stripe, iyzico, Google Sheets, Airtable, Slack, Telegram ve 400+ uygulama. Özel REST API olan herhangi bir yazılıma da bağlanılabilir.' },
  { question: 'Teknik bilgim olmadan kullanabilir miyim?', answer: 'MGL olarak tüm tasarım, kurulum ve bakımı yapıyoruz; sizin teknik bilgiye ihtiyacınız yok. Sistemin çalışıp çalışmadığını görmek için basit bir dashboard sunuyoruz.' },
  { question: 'Bir sorun olduğunda ne yapıyorsunuz?', answer: 'Otomatik hata bildirimleri kuruyor, akış kayıtlarını inceliyor ve bakım kapsamındaki sorunları teklifinizde yazan yanıt süresine göre ele alıyoruz.' },
  { question: 'Aylık ücret ne kadar?', answer: `Otomasyon sistemi ${formatPrice(AUTOMATION_TR.setupFee, 'TR')} tek seferlik kurulum ve ${formatPrice(AUTOMATION_TR.price, 'TR')}/ay bakımdır. Kapsam akış sayısıyla değil işletmenizin süreçleriyle tanımlanır ve teklifte yazılı olarak yer alır; barındırma, izleme, hata uyarıları ve bakım dahildir. Sesli ve WhatsApp asistanlarının arkasında da aynı n8n akışları çalışır.` },
];

const FAQS_EN = [
  { question: 'What is n8n?', answer: 'n8n is an open-source workflow automation tool with a visual interface. 400+ app integrations, code blocks and conditional logic automate complex processes.' },
  { question: 'How is it different from Zapier or Make?', answer: 'Self-hosted n8n lets you manage processing capacity through your own server and workflow design. It can be economical at higher volume; we choose the platform around your process, team and maintenance needs.' },
  { question: 'What apps can it integrate with?', answer: 'Gmail, WhatsApp (Evolution API), HubSpot, Pipedrive, Zoho, Stripe, Google Sheets, Airtable, Slack, Telegram and 400+ more. Any custom REST API can also be integrated.' },
  { question: 'Do I need technical knowledge?', answer: 'No. MGL handles all design, setup and maintenance. We provide a simple monitoring dashboard so you can see your automations are running.' },
  { question: 'What happens if something breaks?', answer: 'We configure automated failure alerts, inspect execution logs and handle covered issues within the response window written into your proposal.' },
  { question: 'How much does it cost?', answer: `The automation system is a ${formatPrice(AUTOMATION_GB.setupFee, 'GB')} one-off setup plus ${formatPrice(AUTOMATION_GB.price, 'GB')}/month maintenance. Scope is defined by your processes rather than a workflow count and is written into the proposal. Hosting, monitoring, failure alerts and maintenance are included. The same n8n workflows also run behind the voice and WhatsApp assistants.` },
];

const PROCESS_TR = [
  { step: 1, title: 'Süreç Haritası', desc: 'Mevcut manuel süreçler belgelenir, otomasyon fırsatları ve entegrasyon noktaları belirlenir.' },
  { step: 2, title: 'Workflow Tasarımı', desc: 'N8N\'de her süreç için ayrı workflow kurulur; tetikleyiciler, koşullar ve eylemler yapılandırılır.' },
  { step: 3, title: 'Entegrasyon', desc: 'Tüm uygulamalar bağlanır (CRM, takvim, ödeme, mesajlaşma); veri akışı test edilir.' },
  { step: 4, title: 'İzleme & Bakım', desc: 'Hata bildirimleri, performans izleme ve teklif kapsamındaki düzenli bakım ile sistem takip edilir.' },
];

const PROCESS_EN = [
  { step: 1, title: 'Process Mapping', desc: 'Existing manual processes documented, automation opportunities and integration points identified.' },
  { step: 2, title: 'Workflow Design', desc: 'Separate workflow built in n8n for each process; triggers, conditions and actions configured.' },
  { step: 3, title: 'Integration', desc: 'All apps connected (CRM, calendar, payments, messaging); data flow tested end-to-end.' },
  { step: 4, title: 'Monitoring & Support', desc: 'Error notifications, performance monitoring and regular maintenance keep the system healthy.' },
];

const USE_CASES_TR = [
  { title: 'WhatsApp + CRM', desc: 'Gelen WhatsApp mesajı → Lead kaydı otomatik HubSpot\'a eklenir → Takip dizisi başlar.', icon: '💬' },
  { title: 'Randevu Hatırlatıcı', desc: 'Takvim → belirlenen saatte WhatsApp veya SMS hatırlatıcı → yanıt ve katılım kaydı.', icon: '📅' },
  { title: 'Ödeme Bildirimi', desc: 'Stripe/iyzico ödeme → Müşteriye otomatik teşekkür + fatura → CRM güncelleme.', icon: '💳' },
  { title: 'Lead Takip Dizisi', desc: 'Form doldurma → Anında kişiselleştirilmiş mail → 3 gün sonra takip → CRM puanlama.', icon: '🎯' },
  { title: 'Haftalık Rapor', desc: 'Tüm veriler otomatik derlenir → Özelleştirilmiş rapor → Telegram/e-posta ile gönderilir.', icon: '📊' },
  { title: 'E-ticaret Entegrasyonu', desc: 'Sipariş → Kargo bildirimi → Teslimat sonrası yorum isteği → Müşteri memnuniyeti takibi.', icon: '🛒' },
];

const USE_CASES_EN = [
  { title: 'WhatsApp + CRM', desc: 'Incoming WhatsApp message → Lead auto-created in HubSpot → Follow-up sequence starts.', icon: '💬' },
  { title: 'Appointment Reminders', desc: 'Calendar → WhatsApp or SMS reminder at the agreed time → response and attendance tracking.', icon: '📅' },
  { title: 'Payment Notifications', desc: 'Stripe payment → Auto thank-you + invoice → CRM updated.', icon: '💳' },
  { title: 'Lead Nurture Sequence', desc: 'Form submitted → Instant personalised email → 3-day follow-up → CRM scoring.', icon: '🎯' },
  { title: 'Weekly Reports', desc: 'All data automatically compiled → Custom report → Delivered via Telegram/email.', icon: '📊' },
  { title: 'E-commerce Flow', desc: 'Order → Shipping notification → Post-delivery review request → Satisfaction tracking.', icon: '🛒' },
];

export default function N8nOtomasyon() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const faqs = isEN ? FAQS_EN : FAQS_TR;
  const process = isEN ? PROCESS_EN : PROCESS_TR;
  const useCases = isEN ? USE_CASES_EN : USE_CASES_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'n8n Automation' : 'N8N Otomasyon', path: '/n8n-otomasyon' },
  ]);

  const svc = serviceSchema({
    name: isEN ? 'n8n Automation Workflows' : 'N8N Otomasyon Workflow\'ları',
    description: isEN
      ? 'Managed n8n workflows connecting CRM, messaging, calendars and payments, scoped to your business processes, with monitoring and maintenance included.'
      : 'CRM, mesajlaşma, takvim ve ödeme sistemlerini bağlayan, işletmenizin süreçlerine göre kapsamlanan, izleme ve bakımı dahil yönetilen n8n otomasyonu.',
    path: '/n8n-otomasyon',
    category: 'Workflow Automation',
    offers: [
      { name: 'Özel n8n Otomasyonu Kurulumu', price: AUTOMATION_TR.setupFee, priceCurrency: 'TRY' },
      { name: 'Custom n8n Automation Setup', price: AUTOMATION_GB.setupFee, priceCurrency: 'GBP' },
    ],
  });

  return (
    <>
      <Seo
        title={
          isEN
            ? 'n8n Automation Workflows for UK & Turkish Businesses · MGL'
            : 'N8N Otomasyon — WhatsApp, CRM, Takvim, Ödeme Entegrasyonu · MGL'
        }
        description={
          isEN
            ? `Managed n8n workflow automation for CRM sync, reminders, payments and reporting. ${formatPrice(AUTOMATION_GB.setupFee, 'GB')} one-off setup plus ${formatPrice(AUTOMATION_GB.price, 'GB')}/month, scope agreed in writing.`
            : `CRM senkronu, hatırlatma, ödeme ve raporlama için yönetilen n8n otomasyonu. ${formatPrice(AUTOMATION_TR.setupFee, 'TR')} kurulum + ${formatPrice(AUTOMATION_TR.price, 'TR')}/ay; kapsam teklifte yazılı.`
        }
        path="/n8n-otomasyon"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['n8n automation uk', 'n8n workflow', 'business automation', 'crm automation', 'n8n agency london']
            : ['n8n otomasyon türkiye', 'n8n workflow kurulumu', 'iş süreci otomasyonu', 'crm otomasyon', 'n8n ajans istanbul']
        }
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            {isEN ? 'n8n Automation Workflows' : 'N8N Otomasyon Workflow\'ları'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.65, marginBottom: '2rem', maxWidth: 560, margin: '0 auto 2rem' }}>
            {isEN
              ? 'Connect your CRM, messaging, calendar and payments in one monitored system. Self-hosted where appropriate, with capacity and data handling agreed for your project.'
              : 'CRM, mesajlaşma, takvim ve ödeme araçlarınızı izlenen tek sistemde bağlayın. Uygun projelerde self-hosted kurulum; kapasite ve veri işleme koşulları teklifte netleşir.'}
          </p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.85rem 2.25rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
            {isEN ? 'Book Free Workflow Audit' : 'Ücretsiz Workflow Analizi'}
          </a>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Use Cases Grid */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {isEN ? 'What we automate' : 'Neler otomatize ediyoruz'}
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {isEN
              ? 'Common workflow automations we build for clients. Each is custom-designed for your specific stack and processes.'
              : 'Müşterilerimiz için kurduğumuz yaygın workflow otomasyonları. Her biri sizin araçlarınıza ve süreçlerinize özel tasarlanır.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
            {useCases.map((uc) => (
              <div key={uc.title} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{uc.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{uc.title}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* N8N vs Zapier mini */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.5rem' }}>
            {isEN ? 'Why n8n over Zapier?' : 'Neden Zapier değil n8n?'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
            {(isEN
              ? [
                  { t: 'Capacity you control', d: 'Self-hosted n8n capacity is governed by your infrastructure rather than a SaaS task allowance.' },
                  { t: 'GDPR-compliant', d: 'Your data stays on your server. No data leaving to US-based cloud services.' },
                  { t: 'Full customisation', d: 'JavaScript/Python code blocks let you handle anything. Not possible in Zapier.' },
                  { t: 'Cost matched to volume', d: 'We compare hosting, maintenance and execution volume before recommending a platform.' },
                ]
              : [
                  { t: 'Kontrol sizde', d: 'Self-hosted n8n kapasitesi sabit bir SaaS görev kotası yerine altyapınıza göre yönetilir.' },
                  { t: 'KVKK uyumlu', d: 'Verileriniz kendi sunucunuzda kalır. ABD merkezli bulut servislerine veri gitmiyor.' },
                  { t: 'Tam özelleştirme', d: 'JavaScript/Python kod blokları ile her şeyi halledebilirsiniz. Zapier\'da mümkün değil.' },
                  { t: 'Hacme uygun maliyet', d: 'Platform önerisinden önce barındırma, bakım ve çalışma hacmini birlikte hesaplarız.' },
                ]
            ).map((item) => (
              <div key={item.t} style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.35rem' }}>✅ {item.t}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item.d}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
            {isEN ? (
              <>Detailed comparison: <a href="/n8n-vs-zapier" style={{ color: 'var(--accent)' }}>n8n vs Zapier →</a></>
            ) : (
              <>Detaylı karşılaştırma: <a href="/n8n-vs-zapier" style={{ color: 'var(--accent)' }}>n8n vs Zapier →</a></>
            )}
          </p>
        </section>

        {/* Process */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '2rem' }}>
            {isEN ? 'How we work' : 'Nasıl çalışıyoruz'}
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
              {isEN ? 'Ready to automate your workflows?' : 'Workflow\'larınızı otomatize etmeye hazır mısınız?'}
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? "Free 15-minute call. We'll map your top 3 automation opportunities and show you what ROI looks like."
                : 'Ücretsiz 15 dakikalık görüşme. En önemli 3 otomasyon fırsatınızı ve ROI\'sini gösterelim.'}
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              {isEN ? 'Book Free Audit' : 'Ücretsiz Analiz →'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
