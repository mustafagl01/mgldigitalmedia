import { useState } from 'react';
import { Seo, BASE_SCHEMAS, breadcrumbSchema } from '../../components/seo/Seo';
import { useLocation } from '../../contexts/LocationContext';
import { formatPrice } from '../../utils/formatPrice';
import { CATALOG, WORK } from '../../content/v3';
import { OnaySimulatoru } from '../../components/v3/OnaySimulatoru';
import { Pic, Head, KanitSeridi, IsKartlari, Kurucu, KapanisBandi, useV3, WHATSAPP } from '../../components/v3/parts';

/* Ana sayfa v3 — 7 bölüm (konsey 2026-10-19). Hero: iki kapı + onay simülatörü.
   Gerçek işler hero'da DEĞİL; kanıt şeridinde ve /isler'de (kullanıcı 2026-10-19). */

export default function HomeV3() {
  const { lang, isEN, t } = useV3();
  const { pricing, region } = useLocation();
  const p = pricing.packages;
  const [start, setStart] = useState('randevu');

  const openDoor = (id: string) => {
    setStart(id);
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo
        title={t('MGL Digital Media · Web sitesi, reklam, AI asistan ve otomasyon', 'MGL Digital Media · Websites, ads, AI assistants and automation')}
        description={t(
          'Müşteriler sizi bulsun, hiçbir talep kaçmasın, işler onayınızla yürüsün: web sitesi, reklam yönetimi, AI telefon ve WhatsApp asistanı, otomasyon. UK ve Türkiye.',
          'Get found, never miss an enquiry, let the work run with your approval: websites, ads management, AI phone and WhatsApp assistants, automation. UK and Türkiye.',
        )}
        path="/"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[...BASE_SCHEMAS, breadcrumbSchema([{ name: t('Ana Sayfa', 'Home'), path: '/' }])]}
      />

      {/* 1 · Hero — konsey 4-5. tur (2026-10-20): çatı vaat müşteri yolculuğu; onay son adım.
          İlk ekranda 5 öğe: etiket, başlık, açıklama, iki buton, görsel. Dört hizmet hemen altta. */}
      <section className="v3-hero">
        <div className="v3-hero__bg" aria-hidden="true"><Pic name="hero2" alt="" eager /></div>
        <div className="v3-wrap v3-hero__inner">
          <div className="v3-hero__text">
            <div className="v3-tag">{t('UK ve Türkiye · küçük işletmelerden üreticilere', 'UK and Türkiye · from small businesses to manufacturers')}</div>
            <h1 className="v3-h1 v3-h1--hero">
              {t('Müşteriler sizi bulsun.', 'Get found.')}<br />
              {t('Hiçbir talep kaçmasın.', 'Never miss an enquiry.')}<br />
              <span className="soft">{t('İşler onayınızla yürüsün.', 'Let the work run, with your approval.')}</span>
            </h1>
            <p className="v3-lede">
              {t(
                'Web sitesi, reklam yönetimi, AI telefon ve WhatsApp asistanı, otomasyon: bugün hangisi gerekiyorsa oradan başlayın, isterseniz hepsini birbirine bağlayın.',
                'Websites, ads management, an AI phone and WhatsApp assistant, and automation: start with whichever you need today and connect them later if you like.',
              )}
            </p>
            <div className="v3-btns">
              <a className="btn btn-primary btn-lg" href="#hizmetler">{t('Hizmetleri görün', 'See the services')}</a>
              <a className="btn btn-ghost btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t('WhatsApp\u2019tan yazın', 'Message us on WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Dört hizmet — yolculuk sırasıyla, her biri tek başına alınabilir (website-builder TUZAK §26) */}
      <section id="hizmetler" className="v3-section" style={{ paddingTop: 'clamp(2.5rem,5vw,4rem)' }}>
        <div className="v3-wrap">
          <Head tag={t('Dört hizmet', 'Four services')} title={t('Tek bir hizmetle başlayın,', 'Start with one service,')} soft={t('ya da hepsini bağlayın.', 'or connect them all.')} />
          <div className="v3-journey">
            {[
              ['01', t('Web\u2019de bulunun', 'Get found'), t('Web sitesi', 'Websites'), t(`Tek seferlik kurulum, ilk yıl barındırma dahil. Yayında ${WORK.length} müşteri sitesi.`, `One-off build, first year of hosting included. ${WORK.length} client sites live.`), '/web-ve-reklam#web'],
              ['02', t('Reklamla görünün', 'Get seen'), t('Reklam yönetimi', 'Ads management'), t(`Meta veya Google aylık ${formatPrice(p['ads-meta'].price, region)}, ikisi birlikte ${formatPrice(p['ads-both'].price, region)}; bütçeden yüzde alınmaz.`, `Meta or Google ${formatPrice(p['ads-meta'].price, region)} a month, both ${formatPrice(p['ads-both'].price, region)}; no percentage of spend.`), '/web-ve-reklam#reklam'],
              ['03', t('Cevap verin', 'Answer'), t('AI telefon ve WhatsApp', 'AI phone and WhatsApp'), t('Mesai dışında da telefonu açar, mesajlara cevap verir, randevu alır.', 'Answers calls and messages after hours and takes bookings.'), '/asistanlar'],
              ['04', t('Otomatikleştirin', 'Automate'), t('Otomasyon', 'Automation'), t('Hatırlatma, tahsilat takibi, evrak, teklif ve sipariş işleri otomatik yürüsün; müşteriye giden cevapları siz onaylayın.', 'Reminders, payment chasing, documents, quotes and orders run automatically; you approve the replies that go to customers.'), '/otomasyon'],
            ].map(([n, verb, name, text, href]) => (
              <a key={href} className="v3-journey__item" href={href}>
                <span className="v3-journey__n">{n}</span>
                <span className="v3-chip">{verb}</span>
                <strong className="v3-h3">{name}</strong>
                <p>{text}</p>
                <span className="v3-more">{t('Ayrıntılar →', 'Details →')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="simulator" className="v3-section v3-section--white">
        <div className="v3-wrap">
          <Head tag={t('Otomasyonu deneyin', 'Try the automation')} title={t('Bir işi seçin, adım adım ilerletin.', 'Pick a task and step through it.')} soft={t('Son sözü siz söyleyin.', 'Then make the final call.')} />
          <div className="v3-doors" style={{ marginBottom: 20 }}>
            <button className={`v3-door ${start === 'randevu' ? 'is-on' : ''}`} onClick={() => setStart('randevu')}>
              <img src="/v3/kapi-kucuk.webp" alt="" width={64} height={64} />
              <div><strong>{t('Küçük işletme', 'Small business')}</strong><span>{t('Hazır bir otomasyonla başlayın', 'Start with a ready-made automation')}</span></div>
            </button>
            <button className={`v3-door ${start === 'teklif' ? 'is-on' : ''}`} onClick={() => setStart('teklif')}>
              <img src="/v3/kapi-uretici.webp" alt="" width={64} height={64} />
              <div><strong>{t('Üretici veya distribütör', 'Manufacturer or distributor')}</strong><span>{t('Süreçlerinizi bağlantılı bir sisteme dönüştürün', 'Turn your processes into a connected system')}</span></div>
            </button>
          </div>
          <OnaySimulatoru start={start} />
        </div>
      </section>

      {/* 2 · Kanıt */}
      <KanitSeridi />

      {/* 3 · Hazır otomasyonlar */}
      <section className="v3-section">
        <div className="v3-wrap">
          <Head
            tag={t('Hazır otomasyonlar', 'Ready-made automations')}
            title={t('Tek bir darboğaz.', 'One bottleneck.')}
            soft={t('Sabit kapsam, sabit fiyat.', 'Fixed scope, fixed price.')}
            lede={t(
              `Listeden birini seçin; kapsam ve gerekli erişimler netleşince kurulum tarihi yazılı olarak belirlenir. Kurulum ${formatPrice(p.automation.setupFee, region)}, aylık ${formatPrice(p.automation.price, region)}; önce canlı demo, 14 gün içinde kurulum ücreti iadesi.`,
              `Pick one from the list; the go-live date is agreed in writing once scope and access are clear. Setup ${formatPrice(p.automation.setupFee, region)}, ${formatPrice(p.automation.price, region)} a month; live demo first, setup fee refundable within 14 days.`,
            )}
          />
          <div className="v3-grid">
            {CATALOG.map((c) => (
              <a key={c.slug} className="v3-card" href={`/otomasyon/${c.slug}`}>
                <span className="v3-chip">{c.who[lang]}</span>
                <strong className="v3-h3">{c.title[lang]}</strong>
                <p>{c.short[lang]}</p>
                <span className="v3-more">{t('Nasıl çalışır →', 'How it works →')}</span>
              </a>
            ))}
            <a className="v3-card" href="/otomasyon" style={{ background: 'var(--paper-2)', boxShadow: 'none' }}>
              <span className="v3-chip">{t('Listede yok mu?', 'Not on the list?')}</span>
              <strong className="v3-h3">{t('Size özel akış', 'A workflow built for you')}</strong>
              <p>{t('Birden fazla işi birbirine bağlayan akışlar Bağlantılı pakette kurulur.', 'Flows that connect several tasks are built in the Connected plan.')}</p>
              <span className="v3-more">{t('Tüm paketler →', 'All plans →')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4 · Üreticiler */}
      <section className="v3-section v3-section--white">
        <div className="v3-wrap v3-grid v3-grid--2" style={{ alignItems: 'center', gap: 'clamp(24px,4vw,56px)' }}>
          <div className="v3-figure" style={{ aspectRatio: '4 / 3' }}><Pic name="ureticiler" alt={t('Depo, ofis ve atölyeyi tek onay noktasından geçen bir rotayla birleştiren minyatür maket', 'A miniature model joining a warehouse, office and workshop through one approval checkpoint')} /></div>
          <div>
            <div className="v3-tag">{t('Üretici ve distribütörler', 'Manufacturers and distributors')}</div>
            <h2 className="v3-h2">{t('Gelen teklif talebi,', 'An incoming quote request,')}<br /><span className="soft">{t('incelemeye hazır bir taslağa dönüşsün.', 'turned into a draft ready for review.')}</span></h2>
            <p className="v3-lede">{t('E-posta ve ekleri okunur, ürün kodlarınızla eşleştirilir, eksikler işaretlenir, müşteriye soru taslağı hazırlanır. Fiyat ve gönderim kararı ekibinizde kalır.', 'Emails and attachments are read, matched to your product codes, gaps are flagged and a question to the customer is drafted. Pricing and sending stay with your team.')}</p>
            <ul className="v3-check" style={{ marginBottom: 24 }}>
              <li>{t('ERP, Excel veya kullandığınız sistemle', 'Works with your ERP, Excel or current system')}</li>
              <li>{t('Çok dilli talepler ve PDF / teknik doküman', 'Multilingual requests and PDF / technical files')}</li>
              <li>{t('Kendi taleplerinizle 14 gün ücretsiz deneme', 'A free 14-day trial on your own requests')}</li>
            </ul>
            <div className="v3-btns">
              <a className="btn btn-primary btn-lg" href="/ureticiler">{t('Üreticiler için →', 'For manufacturers →')}</a>
              <button className="btn btn-ghost btn-lg" onClick={() => openDoor('teklif')}>{t('Örneği deneyin', 'Try the example')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · Web, reklam, asistan */}
      <section className="v3-section">
        <div className="v3-wrap">
          <Head tag={t('Web, reklam ve AI asistan', 'Web, ads and AI assistants')} title={t('Bulunun, talep alın,', 'Get found, get enquiries,')} soft={t('her müşteriye cevap verin.', 'answer every customer.')} />
          <div className="v3-grid v3-grid--2">
            <a className="v3-card" href="/web-ve-reklam" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="v3-figure" style={{ borderRadius: 0, aspectRatio: '3 / 2' }}><Pic name="webreklam" alt={t('Mavi rotanın vitrine girip yeşil onay noktasında bittiği minyatür dükkân', 'A miniature storefront where a blue route ends at a green checkpoint')} /></div>
              <div style={{ padding: '18px 22px 22px', display: 'grid', gap: 8 }}>
                <strong className="v3-h3">{t('Web sitesi ve reklam yönetimi', 'Websites and ads management')}</strong>
                <p>{t(`Siteler tek seferlik kurulur, ilk yıl barındırma dahil. Meta veya Google reklam yönetimi aylık ${formatPrice(p['ads-meta'].price, region)}; bütçeden yüzde alınmaz.`, `Websites are a one-off build with the first year of hosting included. Meta or Google ads management ${formatPrice(p['ads-meta'].price, region)} a month; no percentage of spend.`)}</p>
                <span className="v3-more">{t('Paketler →', 'Packages →')}</span>
              </div>
            </a>
            <a className="v3-card" href="/asistanlar" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="v3-figure" style={{ borderRadius: 0, aspectRatio: '3 / 2' }}><Pic name="asistanlar" alt={t('Ses ve mesaj akışlarının tek bir kuyrukta birleştiği minyatür model', 'A miniature model where voice and message streams join one queue')} /></div>
              <div style={{ padding: '18px 22px 22px', display: 'grid', gap: 8 }}>
                <strong className="v3-h3">{t('AI telefon ve WhatsApp asistanı', 'AI phone and WhatsApp assistant')}</strong>
                <p>{t(`Mesai dışında da telefonu açar, mesajlara cevap verir, randevu alır. Aylık ${formatPrice(p.voice.price, region)} + kullanım; kullanım paketleri yanmaz.`, `Answers calls and messages after hours and takes bookings. ${formatPrice(p.voice.price, region)} a month + usage; bundles never expire.`)}</p>
                <span className="v3-more">{t('Nasıl çalışır →', 'How it works →')}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 6 · Nasıl çalışıyoruz */}
      <section className="v3-section v3-section--white">
        <div className="v3-wrap">
          <Head tag={t('Nasıl çalışıyoruz', 'How we work')} title={t('Önce dinleriz,', 'We listen first,')} soft={t('sonra yazılı kapsamla kurarız.', 'then build to a written scope.')} />
          <ol className="v3-steps">
            {[
              [t('Anlatın', 'Tell us'), t('İşi birkaç cümleyle WhatsApp’tan ya da 15 dakikalık görüşmede anlatın.', 'Describe the task on WhatsApp or in a 15-minute call.')],
              [t('Kapsamı yazalım', 'Agree the scope'), t('Uygun paket, dahil olanlar ve olmayanlar yazılı olarak belirlenir.', 'The plan, what is included and what is not are agreed in writing.')],
              [t('Deneyin', 'Try it'), t('Hazır otomasyonlarda canlı demo, size özel akışlarda 14 gün ücretsiz deneme.', 'A live demo for ready-made automations, a free 14-day trial for custom flows.')],
              [t('Onaylayın', 'Approve'), t('Siz onaylayınca canlıya alınır; izleme ve bakım aylık ücrete dahil.', 'It goes live once you approve; monitoring and maintenance are in the monthly fee.')],
            ].map(([a, b], i) => (
              <li key={a}><span className="n">0{i + 1}</span><strong>{a}</strong><p>{b}</p></li>
            ))}
          </ol>
          <p style={{ marginTop: 20, fontSize: '.95rem', color: 'var(--fg-2)' }}>
            {t('Tüm fiyatlar açık: ', 'All prices are public: ')}<a href="/fiyatlandirma" style={{ fontWeight: 600 }}>{t('Fiyatlandırma →', 'Pricing →')}</a>
          </p>
        </div>
      </section>

      {/* 7 · Son işler + kurucu */}
      <section className="v3-section">
        <div className="v3-wrap">
          <Head tag={t('Son işler', 'Recent work')} title={t('Yayındaki müşteri siteleri.', 'Live client websites.')} soft={t('Hepsi gerçek, hepsi açık.', 'All real, all online.')} />
          <IsKartlari limit={3} />
          <p style={{ marginTop: 16 }}><a href="/isler" style={{ fontWeight: 600 }}>{t('Tüm işler →', 'All work →')}</a></p>
          <div style={{ marginTop: 'clamp(48px,7vw,88px)' }}><Kurucu /></div>
        </div>
      </section>

      <KapanisBandi />
    </>
  );
}
