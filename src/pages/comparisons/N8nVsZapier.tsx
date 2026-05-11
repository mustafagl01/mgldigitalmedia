import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'N8N ve Zapier arasındaki en önemli fark nedir?', answer: 'En kritik fark maliyettir. N8N self-hosted\'da görev/ay limiti yokken Zapier\'ın Business planı (10.000 görev) $99/ay tutar. Orta ölçekli KOBİ için n8n yıllık $1.000+ tasarruf sağlar.' },
  { question: 'N8N self-hosted kurmak zor mu?', answer: 'Docker ile VPS\'e kurulum yaklaşık 30-60 dakika sürer ve teknik bilgi gerektirir. MGL gibi bir ajansla çalışıyorsanız tüm kurulum ve bakım ajans tarafından yapılır.' },
  { question: 'Zapier\'dan n8n\'e geçmek mümkün mü?', answer: 'Evet. Mevcut Zapier workflow\'larınızı n8n\'e aktarmak mümkündür. İki platform arasında 1-1 eşleşme olmasa da mantık genellikle aktarılabilir.' },
  { question: 'KVKK için hangisi daha uygun?', answer: 'N8N self-hosted. Verileriniz kendi sunucunuzda kalır, ABD merkezli buluta gitmez. Zapier\'ın cloud altyapısı KVKK açısından ek düzenleme gerektirebilir.' },
  { question: 'İkisinin de ücretsiz sürümü var mı?', answer: 'N8N community edition tamamen ücretsiz (sunucu maliyeti hariç). Zapier\'ın ücretsiz planı 100 görev/ay ile sınırlıdır — çoğu KOBİ için yetersizdir.' },
];

const FAQS_EN = [
  { question: 'What is the most important difference between n8n and Zapier?', answer: 'The most critical difference is cost. Self-hosted n8n has no task/month limit, while Zapier\'s Business plan (10,000 tasks) costs $99/month. A typical SMB saves $1,000+ per year with n8n.' },
  { question: 'Is self-hosted n8n difficult to set up?', answer: 'Docker installation on a VPS takes 30-60 minutes and requires some technical knowledge. If you work with an agency like MGL, all setup and maintenance is handled for you.' },
  { question: 'Can I migrate from Zapier to n8n?', answer: 'Yes. Migrating existing Zapier workflows to n8n is feasible. There\'s no 1-to-1 mapping but the logic is generally transferable.' },
  { question: 'Which is better for GDPR compliance?', answer: 'Self-hosted n8n. Your data stays on your own server — it doesn\'t go to US-based cloud infrastructure. Zapier\'s cloud setup may require additional GDPR arrangements.' },
  { question: 'Do both have free versions?', answer: 'n8n community edition is completely free (excluding server costs). Zapier\'s free plan is limited to 100 tasks/month — insufficient for most SMBs.' },
];

export default function N8nVsZapier() {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const faqs = isEN ? FAQS_EN : FAQS_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'n8n vs Zapier' : 'n8n vs Zapier', path: '/n8n-vs-zapier' },
  ]);

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEN ? 'n8n vs Zapier: Detailed Comparison 2026' : 'n8n vs Zapier: 2026 Detaylı Karşılaştırma',
    description: isEN
      ? 'Side-by-side comparison of n8n and Zapier: pricing, features, GDPR compliance and best use cases for SMBs.'
      : 'n8n ve Zapier yan yana karşılaştırma: fiyatlandırma, özellikler, KVKK uyumu ve KOBİ\'ler için en iyi kullanım senaryoları.',
    url: `${SITE_URL}/n8n-vs-zapier`,
    datePublished: '2026-05-03',
    author: { '@id': `${SITE_URL}/#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const rows = isEN
    ? [
        ['Price (basic paid)', 'n8n Cloud: $24/mo', 'Zapier Starter: $29.99/mo'],
        ['Task limits', 'Self-hosted: Unlimited | Cloud: 2,500/mo', '100 (free) → 750 (Starter)'],
        ['Integrations', '400+', '7,000+'],
        ['Code blocks (JS/Python)', '✅ Yes', '❌ No'],
        ['Webhook support', '✅ Full', '✅ Yes (limited free tier)'],
        ['Multi-step flows', '✅ Unlimited steps', '✅ Yes (free: 2 steps only)'],
        ['Data residency (GDPR)', '✅ Self-hosted = your server', '❌ US cloud'],
        ['Conditional logic', '✅ Advanced', '⚠️ Basic'],
        ['Custom code execution', '✅ Yes', '❌ No'],
        ['UI complexity', '⚠️ Steeper learning curve', '✅ Very beginner-friendly'],
        ['Best for', 'High-volume, GDPR-sensitive, custom logic', 'Quick setup, small workflows, non-technical users'],
      ]
    : [
        ['Fiyat (temel ücretli)', 'n8n Cloud: $24/ay', 'Zapier Starter: $29.99/ay'],
        ['Görev limiti', 'Self-hosted: Sınırsız | Cloud: 2.500/ay', '100 (ücretsiz) → 750 (Starter)'],
        ['Entegrasyon sayısı', '400+', '7.000+'],
        ['Kod blokları (JS/Python)', '✅ Evet', '❌ Yok'],
        ['Webhook desteği', '✅ Tam', '✅ Evet (ücretsiz kısıtlı)'],
        ['Çok adımlı akış', '✅ Sınırsız adım', '✅ Evet (ücretsiz: 2 adım)'],
        ['Veri konumu (KVKK)', '✅ Self-hosted = kendi sunucunuz', '❌ ABD bulutu'],
        ['Koşullu mantık', '✅ Gelişmiş', '⚠️ Temel'],
        ['Özel kod çalıştırma', '✅ Evet', '❌ Yok'],
        ['Arayüz zorluğu', '⚠️ Daha dik öğrenme eğrisi', '✅ Çok yeni başlayan dostu'],
        ['En iyi kim için', 'Yüksek hacim, KVKK hassas, özel mantık', 'Hızlı kurulum, küçük workflow, teknik olmayan kullanıcı'],
      ];

  return (
    <>
      <Seo
        title={
          isEN
            ? 'n8n vs Zapier 2026: Full Comparison for UK & Turkish SMBs'
            : 'n8n vs Zapier 2026: Türkiye\'deki KOBİ\'ler için Tam Karşılaştırma'
        }
        description={
          isEN
            ? 'n8n vs Zapier: pricing, features, GDPR compliance and verdict. Which automation tool is right for your UK or Turkish business in 2026?'
            : 'n8n vs Zapier: fiyatlandırma, özellikler, KVKK uyumu ve karar. 2026\'da Türkiye\'deki KOBİ\'niz için hangi otomasyon aracı doğru?'
        }
        path="/n8n-vs-zapier"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['n8n vs zapier', 'n8n comparison', 'zapier alternative', 'workflow automation comparison', 'n8n uk']
            : ['n8n vs zapier türkçe', 'n8n karşılaştırma', 'zapier alternatifi', 'workflow otomasyon', 'n8n türkiye']
        }
        jsonLd={[comparisonSchema, faqSchema(faqs), breadcrumb]}
      />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Header */}
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {isEN ? 'n8n vs Zapier (2026): Full Comparison' : 'n8n vs Zapier (2026): Tam Karşılaştırma'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 680 }}>
            {isEN
              ? 'Zapier has 7,000+ integrations and beginner-friendly UX. n8n has no task limits and keeps your data on your server. Which should your business choose in 2026? We compare them on every dimension that matters.'
              : 'Zapier 7.000+ entegrasyona ve yeni başlayan dostu arayüze sahip. n8n görev limiti yok ve verilerinizi kendi sunucunuzda tutuyor. 2026\'da işletmeniz hangisini seçmeli? Her önemli boyutta karşılaştırıyoruz.'}
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>
            {isEN
              ? '⚡ Quick verdict: For most Turkish and UK SMBs processing 1,000+ tasks/month, self-hosted n8n wins on cost and control.'
              : '⚡ Hızlı sonuç: Aylık 1.000+ görev işleyen Türkiye ve UK KOBİ\'leri için self-hosted n8n maliyet ve kontrol açısından kazanır.'}
          </p>
        </header>

        {/* Comparison Table */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1.25rem' }}>
            {isEN ? 'Feature comparison' : 'Özellik karşılaştırması'}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)' }}>
                    {isEN ? 'Feature' : 'Özellik'}
                  </th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)', whiteSpace: 'nowrap' }}>n8n</th>
                  <th style={{ padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left', color: 'var(--ink)', whiteSpace: 'nowrap' }}>Zapier</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feat, n8n, zapier]) => (
                  <tr key={feat}>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--ink)' }}>{feat}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>{n8n}</td>
                    <td style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', color: 'var(--muted)' }}>{zapier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cost Analysis */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>
            {isEN ? 'Cost analysis (10,000 tasks/month)' : 'Maliyet analizi (10.000 görev/ay)'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
            {[
              { name: 'n8n Self-Hosted', cost: isEN ? '~€5-10/mo' : '~€5-10/ay', detail: isEN ? 'VPS only. Unlimited tasks.' : 'Yalnızca VPS. Sınırsız görev.' },
              { name: 'n8n Cloud (Pro)', cost: '$50/mo', detail: isEN ? '50,000 tasks included.' : '50.000 görev dahil.' },
              { name: 'Zapier Business', cost: '$99/mo', detail: isEN ? '10,000 tasks — costs rise fast.' : '10.000 görev — hızla artar.' },
            ].map((item) => (
              <div key={item.name} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>{item.name}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.4rem' }}>{item.cost}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>
            {isEN ? 'Our verdict' : 'Sonucumuz'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                {isEN ? 'Choose n8n if:' : 'n8n seçin:'}
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--body)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {(isEN
                  ? ['You process 1,000+ tasks/month', 'GDPR/KVKK data residency matters', 'You need custom code or complex logic', 'You have a technical team or use an agency', 'Long-term automation investment']
                  : ['Aylık 1.000+ görev işliyorsunuz', 'KVKK/GDPR veri konumu önemli', 'Özel kod veya karmaşık mantık gerekiyor', 'Teknik ekibiniz veya ajansınız var', 'Uzun vadeli otomasyon yatırımı']
                ).map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                {isEN ? 'Choose Zapier if:' : 'Zapier seçin:'}
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--body)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {(isEN
                  ? ['Under 500 tasks/month', 'You need a very specific app (7,000+ catalog)', 'No technical resources at all', 'Short-term or one-off project', 'Absolute beginner, speed matters most']
                  : ['Aylık 500\'den az görev', 'Çok özel bir uygulamaya bağlanmanız gerekiyor', 'Hiç teknik kaynağınız yok', 'Kısa vadeli veya tek seferlik proje', 'Mutlak yeni başlayan, hız en önemli']
                ).map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
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

        {/* Related */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>
            {isEN ? 'Related resources' : 'İlgili kaynaklar'}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><a href="/n8n-otomasyon" style={{ color: 'var(--accent)', textDecoration: 'none' }}>→ {isEN ? 'Our n8n automation service' : 'n8n otomasyon hizmetimiz'}</a></li>
            <li><a href="/blog/n8n-vs-zapier-turkce-rehber" style={{ color: 'var(--accent)', textDecoration: 'none' }}>→ {isEN ? 'Detailed n8n vs Zapier guide (TR)' : 'Detaylı n8n vs Zapier rehberi'}</a></li>
            <li><a href="/whatsapp-ai-asistan" style={{ color: 'var(--accent)', textDecoration: 'none' }}>→ {isEN ? 'WhatsApp AI agent (uses n8n)' : 'WhatsApp AI asistan (n8n tabanlı)'}</a></li>
          </ul>
        </section>

        {/* CTA */}
        <div style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {isEN ? 'Need help choosing or migrating?' : 'Seçmekte veya geçişte yardım mı istiyorsunuz?'}
          </p>
          <p style={{ opacity: 0.8, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            {isEN ? 'Free 15-min call. We\'ll assess your needs and recommend the right setup.' : 'Ücretsiz 15 dk görüşme. İhtiyacınızı değerlendirip doğru kurulumu önerelim.'}
          </p>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            {isEN ? 'Book Free Call' : 'Ücretsiz Görüşme →'}
          </a>
        </div>
      </section>
    </>
  );
}
