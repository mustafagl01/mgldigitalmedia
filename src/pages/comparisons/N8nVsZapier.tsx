import React from 'react';
import { Seo, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const SITE_URL = 'https://mgl-ai.com';

const FAQS_TR = [
  { question: 'N8N ve Zapier arasındaki en önemli fark nedir?', answer: 'Temel fark fiyatlandırma ve işletim modelidir. n8n Cloud tamamlanan workflow çalıştırmalarını, Zapier ise başarılı aksiyon görevlerini sayar. Self-hosted n8n daha fazla altyapı ve bakım sorumluluğu getirir.' },
  { question: 'N8N self-hosted kurmak zor mu?', answer: 'Docker ile VPS\'e kurulum yaklaşık 30-60 dakika sürer ve teknik bilgi gerektirir. MGL gibi bir ajansla çalışıyorsanız tüm kurulum ve bakım ajans tarafından yapılır.' },
  { question: 'Zapier\'dan n8n\'e geçmek mümkün mü?', answer: 'Evet. Mevcut Zapier workflow\'larınızı n8n\'e aktarmak mümkündür. İki platform arasında 1-1 eşleşme olmasa da mantık genellikle aktarılabilir.' },
  { question: 'KVKK için hangisi daha uygun?', answer: 'Tek başına araç seçimi uyumluluk sağlamaz. Self-hosted n8n veri konumunda daha fazla kontrol verebilir; her iki seçenekte de hukuki dayanak, veri işleyen sözleşmeleri, erişim ve saklama politikası değerlendirilmelidir.' },
  { question: 'İkisinin de ücretsiz sürümü var mı?', answer: 'n8n Community Edition kendi altyapınızda kullanılabilir; sunucu ve bakım size aittir. Zapier ücretsiz bir başlangıç planı sunar. Güncel limitleri satın almadan önce resmî fiyat sayfalarında kontrol edin.' },
];

const FAQS_EN = [
  { question: 'What is the most important difference between n8n and Zapier?', answer: 'Their billing and operating models differ. n8n Cloud counts completed workflow executions, while Zapier counts successful action tasks. Self-hosted n8n also brings infrastructure and maintenance responsibility.' },
  { question: 'Is self-hosted n8n difficult to set up?', answer: 'Docker installation on a VPS takes 30-60 minutes and requires some technical knowledge. If you work with an agency like MGL, all setup and maintenance is handled for you.' },
  { question: 'Can I migrate from Zapier to n8n?', answer: 'Yes. Migrating existing Zapier workflows to n8n is feasible. There\'s no 1-to-1 mapping but the logic is generally transferable.' },
  { question: 'Which is better for GDPR compliance?', answer: 'Tool choice alone does not create compliance. Self-hosted n8n can offer more control over data location; with either option assess lawful basis, processor terms, access controls and retention.' },
  { question: 'Do both have free versions?', answer: 'n8n Community Edition can run on your own infrastructure, which you must operate and maintain. Zapier offers a free entry plan. Check current limits on each vendor\'s official pricing page before buying.' },
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
        ['Billing unit', 'Completed workflow execution', 'Successful action task'],
        ['Hosted allowance', 'Varies by execution tier', 'Varies by task tier'],
        ['Integrations', 'Broad node library + HTTP/API', 'Broad app library + webhooks'],
        ['Code', 'JS/Python and self-hosted options', 'Code and SDK available; plan rules apply'],
        ['Multi-step flows', 'Supported on paid cloud plans', 'Supported on Professional and above'],
        ['Data residency', 'n8n Cloud in EU; self-hosted location is your choice', 'Review Zapier\'s current data and transfer terms'],
        ['Conditional logic', 'Advanced workflow controls', 'Paths, filters and formatting available'],
        ['UI complexity', '⚠️ Steeper learning curve', '✅ Very beginner-friendly'],
        ['Best for', 'High-volume, GDPR-sensitive, custom logic', 'Quick setup, small workflows, non-technical users'],
      ]
    : [
        ['Faturalama birimi', 'Tamamlanan workflow çalıştırması', 'Başarılı aksiyon görevi'],
        ['Hosted kullanım', 'Çalıştırma kademesine göre', 'Görev kademesine göre'],
        ['Entegrasyonlar', 'Geniş node kütüphanesi + HTTP/API', 'Geniş uygulama kütüphanesi + webhook'],
        ['Kod', 'JS/Python ve self-hosted seçenekleri', 'Kod ve SDK var; plan kuralları geçerli'],
        ['Çok adımlı akış', 'Ücretli cloud planlarında desteklenir', 'Professional ve üzerinde desteklenir'],
        ['Veri konumu', 'n8n Cloud AB\'de; self-hosted konumu siz seçersiniz', 'Güncel veri ve transfer şartları incelenmeli'],
        ['Koşullu mantık', 'Gelişmiş workflow kontrolleri', 'Paths, filtre ve biçimlendirme mevcut'],
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
              ? 'Zapier prioritises a managed, beginner-friendly experience. n8n offers cloud and self-hosted operating models with execution-based pricing. Compare them on cost, ownership, governance and maintenance.'
              : 'Zapier yönetilen ve başlangıcı kolay bir deneyime odaklanır. n8n, çalıştırma bazlı fiyatla cloud ve self-hosted modeller sunar. Maliyet, sahiplik, yönetişim ve bakım açısından karşılaştırıyoruz.'}
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}>
            {isEN
              ? 'Quick verdict: choose n8n when control and custom logic justify operating complexity; choose Zapier when speed, simplicity and a managed platform matter more.'
              : 'Hızlı sonuç: kontrol ve özel mantık işletim yüküne değiyorsa n8n; hız, kolaylık ve yönetilen platform daha önemliyse Zapier seçin.'}
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
            {isEN ? 'How to compare cost' : 'Maliyet nasıl karşılaştırılır'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
            {[
              { name: 'n8n Self-Hosted', cost: isEN ? 'Infrastructure + operations' : 'Altyapı + operasyon', detail: isEN ? 'Include hosting, backups, upgrades, monitoring and engineering time.' : 'Sunucu, yedek, güncelleme, izleme ve teknik emeği dahil edin.' },
              { name: 'n8n Cloud', cost: isEN ? 'Per execution tier' : 'Çalıştırma kademesi', detail: isEN ? 'One complete workflow run counts as an execution.' : 'Bir workflow\'un baştan sona çalışması bir execution sayılır.' },
              { name: 'Zapier', cost: isEN ? 'Per task tier' : 'Görev kademesi', detail: isEN ? 'Successful actions consume tasks; model the steps in each workflow.' : 'Başarılı aksiyonlar görev tüketir; her akıştaki adımları hesaplayın.' },
            ].map((item) => (
              <div key={item.name} style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>{item.name}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.4rem' }}>{item.cost}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.detail}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
            {isEN ? 'Pricing changes over time. Checked 3 September 2026: ' : 'Fiyatlar zamanla değişir. 3 Eylül 2026 kontrolü: '}
            <a href="https://n8n.io/pricing/" target="_blank" rel="noopener noreferrer">n8n</a>
            {' · '}
            <a href="https://zapier.com/pricing" target="_blank" rel="noopener noreferrer">Zapier</a>
          </p>
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
