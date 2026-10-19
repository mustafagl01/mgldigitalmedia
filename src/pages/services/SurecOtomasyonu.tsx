import React from 'react';
import { Seo, serviceSchema, faqSchema, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';

/* Şirkete özel iş süreci otomasyonu — soğuk maillerden gelen karar vericinin indiği sayfa.
   Kurallar (2026-10-14): abartı yok ("sıfır hata", "otonom departman" vb.), müşteri sayısı/ROI yok,
   fiyat metne gömülmez (kapsam denemeden sonra yazılı netleşir). 14 gün ücretsiz deneme: kullanıcı kararı 2026-10-14 (tek süreç).
   Mailde söylenenle birebir: önce tek süreç + gerçek veriyle küçük deneme; fiyat ve onay müşteride. */

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const WHATSAPP_TR = 'https://wa.me/905318299701';
const WHATSAPP_UK = 'https://wa.me/447482670606';

const PROCESSES_TR = [
  { icon: '📄', title: 'Teklif hazırlama', desc: 'E-posta, Excel, PDF veya WhatsApp ile gelen talep listesini okur, ürün kodlarınızla eşler ve onayınıza taslak teklif hazırlar.' },
  { icon: '🧾', title: 'Sipariş girişi', desc: 'Mail veya WhatsApp ile gelen siparişleri ayıklar, tablonuza ya da sisteminize işlenecek şekilde düzenler.' },
  { icon: '📁', title: 'Evrak ve belge kontrolü', desc: 'Gelen belgelerde eksik bilgiyi bulur, ilgili kişiye hatırlatma taslağı hazırlar.' },
  { icon: '📊', title: 'Raporlama', desc: 'Farklı dosya ve sistemlerdeki verileri toplayıp günlük ya da haftalık özet hazırlar.' },
  { icon: '🛠️', title: 'Servis ve destek talepleri', desc: 'Gelen talebi konusuna göre ayırır ve doğru kişiye ya da ekibe yönlendirir.' },
  { icon: '⏰', title: 'Takip ve hatırlatmalar', desc: 'Cevapsız teklif, vadesi gelen tahsilat ya da yaklaşan bakım tarihi için zamanında hatırlatır.' },
];

const PROCESSES_EN = [
  { icon: '📄', title: 'Quote preparation', desc: 'Reads request lists arriving by email, Excel, PDF or WhatsApp, matches them to your product codes and prepares a draft quote for your approval.' },
  { icon: '🧾', title: 'Order entry', desc: 'Extracts orders from email or WhatsApp and structures them for your spreadsheet or system.' },
  { icon: '📁', title: 'Document checks', desc: 'Spots missing information in incoming documents and drafts a reminder to the right person.' },
  { icon: '📊', title: 'Reporting', desc: 'Pulls data from different files and systems into a daily or weekly summary.' },
  { icon: '🛠️', title: 'Service and support requests', desc: 'Sorts incoming requests by topic and routes them to the right person or team.' },
  { icon: '⏰', title: 'Follow-ups and reminders', desc: 'Reminds you on time about unanswered quotes, due payments or upcoming maintenance dates.' },
];

const STEPS_TR = [
  { title: 'Tek bir süreç seçiyoruz', desc: 'Şirketinizde en çok vakit alan, her gün tekrarlanan bir işi birlikte belirliyoruz.' },
  { title: '14 gün ücretsiz deneme', desc: 'Seçtiğimiz süreci kendi verinizle kuruyoruz. 14 gün boyunca ücretsiz kullanıp işe yarayıp yaramadığını görüyorsunuz.' },
  { title: 'Devam ederseniz kalıcı kurulum', desc: 'İşe yararsa kurulum ve aylık bakımı teklifte yazılı olarak netleştiriyoruz. Devam etmezseniz ücret yok, verileriniz silinir.' },
];

const STEPS_EN = [
  { title: 'We pick one process', desc: 'Together we choose a repetitive task that takes the most time in your company.' },
  { title: '14-day free trial', desc: 'We set up the chosen process with your own data. You use it free for 14 days and see whether it really helps.' },
  { title: 'If you continue, a permanent setup', desc: 'If it helps, setup and monthly maintenance are agreed in a written proposal. If not, there is no charge and your data is deleted.' },
];

const FAQS_TR = [
  { question: 'Mevcut ERP veya Excel düzenimizi değiştirmemiz gerekir mi?', answer: 'Hayır. Sistem sizin kullandığınız e-posta, Excel, ERP ya da tablolarla çalışacak şekilde kurulur. Amaç düzeninizi değiştirmek değil, tekrarlanan elle işi azaltmak.' },
  { question: 'Fiyatları veya kararları sistem mi veriyor?', answer: 'Hayır. Sistem taslak hazırlar, eksikleri işaretler ve hatırlatır. Fiyat, onay ve son karar her zaman sizin ekibinizde kalır.' },
  { question: 'Verilerimiz ne oluyor?', answer: 'Deneme için anonimleştirilmiş örnek veri yeterli. Kalıcı kurulumda veri işleme koşulları KVKK\'ya uygun şekilde teklifte yazılı olarak belirlenir.' },
  { question: 'Deneme gerçekten ücretsiz mi?', answer: 'Evet. Tek bir süreç için 14 gün ücretsiz. Taahhüt yok; devam etmezseniz ücret ödemezsiniz ve verileriniz silinir.' },
  { question: 'Devam edersek fiyat nedir?', answer: 'Paketler ve başlangıç fiyatları fiyat sayfasında açıkça yazılı (mgl-ai.com/pricing/automation). Kesin kurulum ve aylık ücret, seçilen sürecin kapsamına göre deneme sonunda yazılı teklifle netleşir.' },
  { question: 'Kiminle çalışacağım?', answer: 'Doğrudan Mustafa Gül ile. MGL Digital Media küçük bir ekip; satış ekibi ve aracı yok, kurulumu yapan kişiyle konuşursunuz.' },
];

const FAQS_EN = [
  { question: 'Do we have to change our ERP or Excel setup?', answer: 'No. The system is built to work with the email, Excel, ERP or spreadsheets you already use. The goal is less repetitive manual work, not a new setup.' },
  { question: 'Does the system set prices or make decisions?', answer: 'No. It prepares drafts, flags gaps and sends reminders. Pricing, approval and the final decision always stay with your team.' },
  { question: 'What happens to our data?', answer: 'An anonymised sample is enough for the trial. For a permanent setup, data handling terms are written into the proposal, in line with GDPR/KVKK.' },
  { question: 'Is the trial really free?', answer: 'Yes. One process, free for 14 days. No commitment: if you do not continue, you pay nothing and your data is deleted.' },
  { question: 'What does it cost if we continue?', answer: 'Plans and starting prices are listed openly on the pricing page (mgl-ai.com/pricing/automation). The exact setup and monthly fee depend on the scope of the chosen process and are confirmed in a written proposal at the end of the trial.' },
  { question: 'Who will I work with?', answer: 'Directly with Mustafa Gül. MGL Digital Media is a small team with no sales layer: you talk to the person who builds it.' },
];

const card = { padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 } as const;
const h2 = { fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.75rem' } as const;

export default function SurecOtomasyonu() {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const processes = isEN ? PROCESSES_EN : PROCESSES_TR;
  const steps = isEN ? STEPS_EN : STEPS_TR;
  const faqs = isEN ? FAQS_EN : FAQS_TR;
  const whatsapp = isEN ? WHATSAPP_UK : WHATSAPP_TR;

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Business Process Automation' : 'Süreç Otomasyonu', path: '/surec-otomasyonu' },
  ]);
  const svc = serviceSchema({
    name: isEN ? 'Custom Business Process Automation' : 'Şirkete Özel İş Süreci Otomasyonu',
    description: isEN
      ? 'Automation of repetitive internal work such as quote preparation, order entry, document checks, reporting and follow-ups, built around your existing tools with human approval.'
      : 'Teklif hazırlama, sipariş girişi, evrak kontrolü, raporlama ve takip gibi tekrarlanan iç işlerin, mevcut araçlarınızla ve insan onayıyla çalışan otomasyonu.',
    path: '/surec-otomasyonu',
    category: 'Business Process Automation',
  });

  return (
    <>
      <Seo
        title={isEN ? 'Custom Business Process Automation · MGL' : 'Şirketinize Özel Süreç Otomasyonu · MGL'}
        description={isEN
          ? 'We automate repetitive internal work like quotes, orders, documents and reporting around your existing email, Excel and ERP. Start with one process and a small trial on your real data.'
          : 'Teklif, sipariş, evrak ve raporlama gibi tekrarlanan iç işleri mevcut e-posta, Excel ve ERP düzeninizle otomatikleştiriyoruz. Tek bir süreç ve gerçek verinizle küçük bir denemeyle başlıyoruz.'}
        path="/surec-otomasyonu"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={isEN
          ? ['business process automation', 'quote automation', 'order entry automation', 'document automation', 'workflow automation uk']
          : ['süreç otomasyonu', 'iş süreci otomasyonu', 'teklif hazırlama otomasyonu', 'sipariş otomasyonu', 'evrak takip otomasyonu']}
        jsonLd={[svc, faqSchema(faqs), breadcrumb]}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '1rem' }}>
            {isEN ? 'Business process automation · 14-day free trial' : 'İş süreçleri otomasyonu · 14 gün ücretsiz deneme'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            {isEN ? 'We automate the repetitive work specific to your company.' : 'Şirketinize özel, her gün tekrarlanan işleri otomatikleştiriyoruz.'}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.65, maxWidth: 600, margin: '0 auto 2rem' }}>
            {isEN
              ? 'Quotes, orders, documents, reporting or any other routine task. We build it around the email, Excel and ERP you already use. Approval always stays with your team.'
              : 'Teklif, sipariş, evrak, raporlama ya da size özel başka bir iş. Kullandığınız e-posta, Excel ve ERP düzenini değiştirmeden kuruyoruz. Onay her zaman sizin ekibinizde kalır.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.85rem 2rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              {isEN ? 'Tell us about one process' : 'Bir sürecinizi anlatın'}
            </a>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.85rem 2rem', border: '1px solid rgba(255,255,255,0.4)', color: 'var(--paper)', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
              {isEN ? 'Book a 15-minute call' : '15 dakikalık görüşme planlayın'}
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Example processes */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <h2 style={h2}>{isEN ? 'Examples of what we automate' : 'Otomatikleştirdiğimiz işlerden örnekler'}</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {isEN
              ? 'Every company runs these differently, so each setup is designed around your own process.'
              : 'Her şirket bu işleri farklı yürütür. Bu yüzden her kurulum sizin sürecinize göre tasarlanır.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
            {processes.map((p) => (
              <div key={p.title} style={card}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{p.title}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
            <div style={{ ...card, background: 'transparent', borderStyle: 'dashed' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💬</div>
              <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                {isEN ? 'Something not on this list?' : 'Listede olmayan bir işiniz mi var?'}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                {isEN ? 'Describe it in a few lines and we will tell you honestly whether it can be automated.' : 'Birkaç cümleyle anlatın, otomatikleştirilebilir mi dürüstçe söyleyelim.'}
              </p>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={h2}>{isEN ? 'How we work' : 'Nasıl çalışıyoruz'}</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {isEN
              ? 'Instead of a big presentation, we start with one process and 14 free days on your real data.'
              : 'Büyük bir sunum yerine tek bir süreçle ve gerçek verinizle 14 günlük ücretsiz denemeyle başlıyoruz.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem' }}>
            {steps.map((s, i) => (
              <div key={s.title} style={card}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem', fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example: quote assistant with approval card */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={h2}>{isEN ? 'An example: the quote assistant' : 'Bir örnek: teklif asistanı'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 0 }}>
                {isEN
                  ? 'A customer sends a list of part codes by email or WhatsApp. The system matches each line to your stock and price list, asks the customer about anything unclear, and sends you a draft to approve.'
                  : 'Müşteriniz e-posta ya da WhatsApp ile kod listesi gönderiyor. Sistem her satırı stok ve fiyat listenizle eşleştiriyor, belirsiz kalanı müşteriye soruyor ve size onay için bir taslak gönderiyor.'}
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                {isEN
                  ? 'If a price is missing or depends on the exchange rate, it asks you instead of guessing. Unanswered quotes are reminded the next day.'
                  : 'Fiyat listede yoksa ya da kura bağlıysa tahmin etmez, size sorar. Cevapsız kalan teklif ertesi gün hatırlatılır.'}
              </p>
            </div>
            <div aria-label={isEN ? 'Example approval card' : 'Örnek onay kartı'}
              style={{ ...card, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--ink)' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEN ? 'New request · 19:42' : 'Yeni talep · 19:42'}</div>
              <div>{isEN ? '✓ 3 lines found in your list' : '✓ 3 satır listenizde bulundu'}</div>
              <div>{isEN ? '? 1 line: size missing → asked the customer' : '? 1 satırda ölçü eksik → müşteriye soruldu'}</div>
              <div>{isEN ? '• 2 prices taken from your list' : '• 2 fiyat listenizden alındı'}</div>
              <div>{isEN ? '! 1 price waiting for your approval' : '! 1 fiyat onayınızı bekliyor'}</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 6 }}>{isEN ? 'Approve' : 'Onayla'}</span>
                <span style={{ padding: '0.25rem 0.75rem', border: '1px solid var(--border)', borderRadius: 6 }}>{isEN ? 'Edit' : 'Düzenle'}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'inherit' }}>
                {isEN ? 'Illustrative example' : 'Temsili örnektir'}
              </div>
            </div>
          </div>
        </section>

        {/* What we don't do + who */}
        <section style={{ padding: '2rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
            <div style={card}>
              <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 0, fontSize: '1.05rem' }}>{isEN ? 'What we don\'t do' : 'Ne yapmıyoruz'}</h3>
              <ul style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.1rem', margin: 0 }}>
                {(isEN
                  ? ['We don\'t replace your ERP or ask you to change your setup.', 'We don\'t set prices or make decisions for you.', 'We don\'t send anything to your customers without your approval.']
                  : ['ERP\'nizi değiştirmiyor, düzeninizi bozmuyoruz.', 'Fiyat ya da karar vermiyoruz.', 'Onayınız olmadan müşterinize bir şey göndermiyoruz.']
                ).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div style={card}>
              <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 0, fontSize: '1.05rem' }}>{isEN ? 'Who you work with' : 'Kiminle çalışıyorsunuz'}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Mustafa Gül<br />
                MGL Digital Media Ltd<br />
                {isEN ? 'Company no' : 'Şirket no'}: 16007414 ({isEN ? 'England and Wales' : 'İngiltere ve Galler'})<br />
                112 Bertram Road, Enfield, EN1 1LS, {isEN ? 'United Kingdom' : 'Birleşik Krallık'}<br />
                TR: +90 531 829 97 01 · UK: +44 7482 670606
              </p>
            </div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
            {isEN ? 'Technical details: ' : 'Teknik ayrıntılar: '}
            <a href="/n8n-otomasyon" style={{ color: 'var(--accent)' }}>{isEN ? 'n8n workflow automation →' : 'n8n otomasyon →'}</a>
          </p>
        </section>

        {/* FAQ */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{ ...h2, marginBottom: '1.5rem' }}>{isEN ? 'Frequently asked questions' : 'Sıkça sorulan sorular'}</h2>
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
              {isEN ? 'Which task takes the most time in your company?' : 'Şirketinizde en çok vakit alan iş hangisi?'}
            </h2>
            <p style={{ opacity: 0.85, maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {isEN
                ? 'Tell us in a few lines. We\'ll reply honestly about whether it can be automated, then set it up for a 14-day free trial.'
                : 'Birkaç cümleyle yazın. Otomatikleştirilebilir mi dürüstçe söyleyelim, uygunsa 14 gün ücretsiz deneme için kuralım.'}
            </p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--paper)', color: 'var(--ink)', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              {isEN ? 'Write on WhatsApp →' : 'WhatsApp\'tan yazın →'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
