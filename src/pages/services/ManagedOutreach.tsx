import { BarChart3, Check, Globe2, Mail, Pause, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema, serviceSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation } from '../../contexts/LocationContext';
import { LEAD_CREDIT_CATEGORIES } from '../../config/pricing';
import { formatPrice } from '../../utils/formatPrice';

const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

const COPY = {
  tr: {
    eyebrow: 'MGL YÖNETİLEN HİZMET',
    title: 'AI Müşteri Bulma ve E-posta Takip Sistemi',
    intro: 'Sistem hedef işletmeleri bulur, web sitelerindeki gerçek sinyalleri inceler, her işletmeye uygun kısa e-postalar hazırlar ve kontrollü bir takvimle gönderir. Siz sonuçları panelden izlersiniz; operasyonu MGL yönetir.',
    cta: 'Pilot görüşmesi planla',
    secondary: 'Sistemin işleyişini incele',
    proof: ['Hedef sektör ve bölgeye göre işletme araştırması', 'Site sinyaline dayalı kişiselleştirilmiş metin', 'Cevap, bounce ve ret takibi', 'Müşteriye özel güvenli sonuç paneli'],
    processTitle: 'Siz hedefi söylersiniz, sistem süreci yürütür',
    processIntro: 'Bu bir toplu gönderim aracı değildir. MGL; hedefi, veri kaynaklarını, mesajları, mailbox sağlığını ve gönderim sınırlarını birlikte yönetir.',
    steps: [
      ['Brief ve hedef', 'Teklifiniz, hedef sektörünüz, bölgeler, ton ve ulaşılmaması gereken gruplar belirlenir.'],
      ['İşletme araştırması', 'Kamuya açık işletme kaynakları taranır; tekrarlar ve daha önce iletişim kurulan adresler elenir.'],
      ['Site incelemesi', 'İşletmenin sitesi okunur; yalnız doğrulanabilen bir hizmet veya ihtiyaç sinyali çıkarılır.'],
      ['Kişisel taslak', 'AI, uydurma iddia kullanmadan kısa bir ilk mesaj ve takip metinleri hazırlar.'],
      ['Kontrollü gönderim', 'MGL örnekleri kontrol edip kampanyayı açar. Mesajlar belirlenen gün, saat ve mailbox limitlerine göre sıraya girer.'],
      ['Cevap ve takip', 'Cevap geldiğinde takip durur. Olumlu cevaplar panelde öne çıkar ve MGL ekibine bildirilir.'],
    ],
    panelTitle: 'Müşteri panelinde ne görürsünüz?',
    panelIntro: 'Teknik kurulumla uğraşmadan kampanyanın gerçek durumunu ve ticari sonuçlarını izlersiniz.',
    panel: ['Bulunan ve incelenen işletmeler', 'Gönderilen ve sırada bekleyen e-postalar', 'Cevaplar, olumlu cevaplar ve bounce oranı', 'Hangi işletmeye ne zaman ne gönderildiği', 'Mailbox sağlık durumu', 'Acil durumda kampanyayı durdurma'],
    managedTitle: 'MGL neyi yönetir?',
    managed: ['Arama sorguları ve veri kaynakları', 'Site inceleme ve kalite kuralları', 'E-posta örnekleri ve takip dizisi', 'Günlük limitler ve gönderim takvimi', 'SPF, DKIM, DMARC ve mailbox kontrolleri', 'Başlatma, yeniden başlatma ve hata yönetimi'],
    safetyTitle: 'Ana e-posta şifrenizi istemeyiz',
    safety: 'Kampanya için size ait ayrı bir mailbox kullanılır. Uygulama şifresi şifrelenerek saklanır; SPF, DKIM ve DMARC kontrolleri tamamlanmadan canlı gönderim açılmaz. Ret veya abonelikten çıkma talebi alan adresler yeniden gönderimden çıkarılır.',
    priceTitle: 'Yönetilen hizmet paketleri',
    priceIntro: 'İlk sürüm self-service yazılım lisansı değil, MGL tarafından işletilen bir hizmettir. Kurulum ücreti yoktur.',
    extra: 'Domain, kampanya mailbox’ı ve ücretli veri/API giderleri kullanıma göre ayrıca yansıtılır. Satış, cevap veya inbox yerleşimi garanti edilmez; sonuç hedef kitleye, teklife, domain sağlığına ve pazar koşullarına bağlıdır.',
    faqTitle: 'Sık sorulan sorular',
    faqs: [
      { question: 'Sistemi ben mi kullanacağım?', answer: 'Hayır. Müşteri panelinden süreci ve sonuçları izlersiniz. Lead bulma, kurulum, limitler, canlıya alma ve hata yönetimi MGL tarafından yürütülür.' },
      { question: 'Kampanyayı kendim başlatabilir miyim?', answer: 'Canlı gönderimi yalnız MGL başlatır. Siz örnekleri ve sonuçları görür, gerekli olduğunda bekleyen gönderimleri durdurabilirsiniz. Yeniden başlatma MGL kontrolünden sonra yapılır.' },
      { question: 'Her işletmeye aynı e-posta mı gider?', answer: 'Ana teklif ve çağrı aynı stratejiyi izler; ilk satır ve bağlam işletmenin web sitesindeki doğrulanabilir sinyale göre hazırlanabilir. Uydurma kişiselleştirme kullanılmaz.' },
      { question: 'Kendi ana e-posta hesabımı vermem gerekir mi?', answer: 'Ana hesabınız yerine size ait ayrı bir kampanya mailbox’ı önerilir. Ana şifreniz istenmez; sağlayıcının uygulama şifresi veya ileride OAuth bağlantısı kullanılır.' },
      { question: 'Spam’e hiç düşmez mi?', answer: 'Hiçbir sağlayıcı bunu garanti edemez. Ayrı mailbox, domain doğrulaması, düşük başlangıç limitleri, ret listesi ve sağlık eşikleri riski azaltmak için uygulanır.' },
    ],
    closeTitle: 'Potansiyel müşterileri araştıran ve cevapları size getiren yönetilen bir sistem kurun',
    closeText: 'İlk görüşmede hedef kitlenizi ve teklifinizi netleştirelim; uygun örnek akışı ve pilot kapsamını birlikte çıkaralım.',
  },
  en: {
    eyebrow: 'MGL MANAGED SERVICE',
    title: 'AI Prospecting and Email Follow-up System',
    intro: 'The system discovers target businesses, reviews factual signals on their websites, prepares relevant emails and sends them on a controlled schedule. You monitor outcomes in the portal while MGL runs the operation.',
    cta: 'Plan a pilot call', secondary: 'See how it works',
    proof: ['Business research by sector and location', 'Personalisation based on real website signals', 'Reply, bounce and opt-out tracking', 'A secure client results portal'],
    processTitle: 'You define the target; the managed system runs the process',
    processIntro: 'This is not a bulk email button. MGL manages targeting, data sources, messaging, mailbox health and sending limits as one operation.',
    steps: [
      ['Brief and target', 'We define your offer, target sector, locations, tone and exclusions.'],
      ['Business research', 'Public business sources are searched and previous contacts and duplicates are excluded.'],
      ['Website review', 'The business website is reviewed for a factual service or need signal.'],
      ['Relevant draft', 'AI prepares concise initial and follow-up messages without invented claims.'],
      ['Controlled sending', 'MGL reviews samples and launches the campaign within approved hours and mailbox limits.'],
      ['Reply handling', 'Follow-ups stop after a reply. Positive replies are highlighted in the portal and reported to MGL.'],
    ],
    panelTitle: 'What can the client see?', panelIntro: 'Monitor commercial outcomes without operating the technical stack.',
    panel: ['Businesses found and reviewed', 'Sent and queued emails', 'Replies, positive replies and bounce rate', 'Contact history for each business', 'Mailbox health', 'Emergency campaign pause'],
    managedTitle: 'What does MGL manage?', managed: ['Search queries and sources', 'Website review and quality rules', 'Email samples and follow-up sequence', 'Daily limits and schedules', 'SPF, DKIM, DMARC and mailbox checks', 'Launch, restart and error handling'],
    safetyTitle: 'We do not ask for your primary mailbox password',
    safety: 'A separate campaign mailbox owned by you is used. Its app password is encrypted, and sending stays locked until SPF, DKIM and DMARC checks pass. Opt-outs and negative replies are suppressed immediately.',
    priceTitle: 'Managed service plans', priceIntro: 'The first release is an MGL-operated service, not a self-service software licence. There is no setup fee.',
    extra: 'Domain, campaign mailbox and paid data/API costs are billed separately when used. Sales, replies and inbox placement cannot be guaranteed; outcomes depend on targeting, offer, domain health and market conditions.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { question: 'Do I operate the system myself?', answer: 'No. You monitor progress and results in the client portal. MGL handles discovery, setup, limits, launch and technical operations.' },
      { question: 'Can I launch a campaign?', answer: 'Only MGL can launch live sending. You can review progress and pause pending sends; MGL reviews the campaign before restarting it.' },
      { question: 'Does every business receive the same email?', answer: 'The offer follows one approved strategy, while context can be based on a verifiable website signal. We do not use fabricated personalisation.' },
      { question: 'Do you need my main email password?', answer: 'No. We recommend a separate campaign mailbox that you own. We use an app password or, in a later release, OAuth.' },
      { question: 'Will every email reach the inbox?', answer: 'No provider can guarantee that. Separate mailboxes, DNS authentication, conservative limits, suppression and health thresholds are used to reduce risk.' },
    ],
    closeTitle: 'Build a managed system that researches prospects and brings the replies back to you',
    closeText: 'We will define your audience and offer, then design the right pilot workflow for your market.',
  },
};

const icons = [Search, Globe2, Sparkles, Mail, ShieldCheck, BarChart3];

export default function ManagedOutreach() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isEN = language === 'en';
  const c = COPY[language];
  const leadmail = pricing.packages.leadmail;
  const creditCategories = LEAD_CREDIT_CATEGORIES.map((cat) => (isEN ? cat.en : cat.tr));
  const plans: [string, string, string, string[]][] = [
    [
      isEN ? 'Lead + Email System' : 'Lead + Mail Sistemi',
      `${formatPrice(leadmail.price, region)}${isEN ? '/month' : '/ay'}`,
      isEN ? 'no setup fee — usage credits on top' : 'kurulum ücreti yok — üstüne kullanım kredisi',
      [
        isEN ? 'Ideal customer profile definition' : 'Hedef müşteri profili çıkarımı',
        isEN ? `Credits cover: ${creditCategories.join(', ').toLowerCase()}` : `Kredi neyi kapsar: ${creditCategories.join(', ')}`,
        isEN ? 'Send log, deduplication and reply reporting' : 'Gönderim kaydı, mükerrer engelleme ve cevap raporu',
        isEN ? 'Domain, mailbox and data credits are yours' : 'Domain, mailbox ve veri kredisi size aittir',
      ],
    ],
  ];
  const breadcrumb = breadcrumbSchema([{ name: isEN ? 'Home' : 'Ana Sayfa', path: '/' }, { name: c.title, path: '/ai-musteri-bulma-mail-takip' }]);
  const service = serviceSchema({ name: c.title, description: c.intro, path: '/ai-musteri-bulma-mail-takip', category: 'Managed B2B Outreach' });

  return <>
    <Seo title={`${c.title} | MGL AI`} description={c.intro} path="/ai-musteri-bulma-mail-takip" locale={isEN ? 'en_GB' : 'tr_TR'} keywords={isEN ? ['managed email outreach', 'AI prospecting service', 'B2B lead research', 'email follow up system'] : ['AI müşteri bulma sistemi', 'otomatik müşteri bulma', 'e-posta takip sistemi', 'B2B lead araştırma', 'yönetilen cold email']} jsonLd={[service, faqSchema(c.faqs), breadcrumb]} />

    <section style={{ background: 'var(--coal)', color: 'var(--bone)', padding: 'clamp(4rem,9vw,7rem) 1.5rem' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ember)', letterSpacing: '0.12em', fontWeight: 700 }}>{c.eyebrow}</p>
        <h1 style={{ maxWidth: 900, fontSize: 'clamp(2.25rem,6vw,4.6rem)', lineHeight: 1.02, margin: '1rem 0 1.5rem', color: 'var(--bone)' }}>{c.title}</h1>
        <p style={{ maxWidth: 760, color: 'var(--bone-2)', fontSize: 'clamp(1rem,2vw,1.2rem)', lineHeight: 1.75 }}>{c.intro}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="btn btn-primary">{c.cta}</a>
          <a href="#isleyis" className="btn btn-ghost" style={{ color: 'var(--bone)', borderColor: 'var(--coal-3)' }}>{c.secondary}</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 1, marginTop: 48, background: 'var(--coal-3)', border: '1px solid var(--coal-3)' }}>
          {c.proof.map((item) => <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 18, background: 'var(--coal)' }}><Check size={17} color="var(--ember)" style={{ flex: '0 0 auto', marginTop: 2 }} /><span style={{ color: 'var(--bone-2)', fontSize: 14, lineHeight: 1.55 }}>{item}</span></div>)}
        </div>
      </div>
    </section>

    <main style={{ background: 'var(--paper)' }}>
      <section id="isleyis" style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(4rem,8vw,7rem) 1.5rem' }}>
        <h2 style={{ maxWidth: 760, fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--ink)' }}>{c.processTitle}</h2>
        <p style={{ maxWidth: 720, marginTop: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>{c.processIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 34 }}>
          {c.steps.map(([title, desc], index) => { const Icon = icons[index]; return <article key={title} style={{ padding: 24, border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: 8 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Icon size={21} color="var(--ember)" /><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', fontSize: 11 }}>0{index + 1}</span></div><h3 style={{ marginTop: 24, fontSize: 18, color: 'var(--ink)' }}>{title}</h3><p style={{ marginTop: 8, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.65 }}>{desc}</p></article>; })}
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 48 }}>
          <div><BarChart3 size={26} color="var(--ember)" /><h2 style={{ marginTop: 18, fontSize: 'clamp(1.55rem,3vw,2.25rem)', color: 'var(--ink)' }}>{c.panelTitle}</h2><p style={{ marginTop: 12, color: 'var(--fg-2)', lineHeight: 1.65 }}>{c.panelIntro}</p><List items={c.panel} /></div>
          <div><ShieldCheck size={26} color="var(--ember)" /><h2 style={{ marginTop: 18, fontSize: 'clamp(1.55rem,3vw,2.25rem)', color: 'var(--ink)' }}>{c.managedTitle}</h2><p style={{ marginTop: 12, color: 'var(--fg-2)', lineHeight: 1.65 }}>{isEN ? 'Live controls remain with MGL, so clients cannot accidentally change sending rules or mailbox settings.' : 'Canlı kontroller MGL’de kalır; müşteri yanlışlıkla gönderim kuralını veya mailbox ayarını değiştiremez.'}</p><List items={c.managed} /></div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(3rem,7vw,5rem) 1.5rem' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', border: '1px solid var(--border)', borderLeft: '4px solid var(--ember)', padding: 24, background: 'var(--surface)', borderRadius: 8 }}><ShieldCheck size={24} color="var(--ember)" style={{ flex: '0 0 auto' }} /><div><h2 style={{ fontSize: 20, color: 'var(--ink)' }}>{c.safetyTitle}</h2><p style={{ marginTop: 8, color: 'var(--fg-2)', lineHeight: 1.7 }}>{c.safety}</p></div></div>
      </section>

      <section style={{ background: 'var(--coal)', color: 'var(--bone)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--bone)' }}>{c.priceTitle}</h2><p style={{ color: 'var(--bone-2)', marginTop: 12 }}>{c.priceIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginTop: 32 }}>
            {plans.map(([name, price, note, features]) => <article key={name} style={{ border: '1px solid var(--coal-3)', padding: 24, borderRadius: 8, background: 'var(--ink)' }}><p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ember)' }}>{name}</p><p style={{ marginTop: 16, fontSize: 28, fontWeight: 700 }}>{price}</p><p style={{ marginTop: 4, color: 'var(--bone-3)', fontSize: 13 }}>{note}</p><List items={features} dark /></article>)}
          </div>
          <p style={{ marginTop: 22, color: 'var(--bone-3)', fontSize: 13, lineHeight: 1.65 }}>{c.extra}</p>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}><h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.7rem)', color: 'var(--ink)' }}>{c.faqTitle}</h2><div style={{ marginTop: 28, display: 'grid', gap: 10 }}>{c.faqs.map((faq) => <details key={faq.question} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px', background: 'var(--surface)' }}><summary style={{ color: 'var(--ink)', fontWeight: 650, cursor: 'pointer' }}>{faq.question}</summary><p style={{ color: 'var(--fg-2)', marginTop: 12, lineHeight: 1.7 }}>{faq.answer}</p></details>)}</div></section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 1.5rem 6rem' }}><div style={{ background: 'var(--ember)', color: 'white', padding: 'clamp(2rem,6vw,4rem)', borderRadius: 8 }}><Pause size={24} /><h2 style={{ maxWidth: 800, marginTop: 18, fontSize: 'clamp(1.7rem,4vw,2.8rem)', color: 'white' }}>{c.closeTitle}</h2><p style={{ maxWidth: 700, marginTop: 12, lineHeight: 1.7, opacity: 0.88 }}>{c.closeText}</p><a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: 24, background: 'white', color: 'var(--ink)' }}>{c.cta}</a></div></section>
    </main>
  </>;
}

function List({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 11 }}>{items.map((item) => <li key={item} style={{ display: 'flex', gap: 10, color: dark ? 'var(--bone-2)' : 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}><Check size={16} color="var(--ember)" style={{ flex: '0 0 auto', marginTop: 3 }} />{item}</li>)}</ul>;
}
