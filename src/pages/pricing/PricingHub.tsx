import React from 'react';
import { Seo, breadcrumbSchema } from '../../components/seo/Seo';
import { useLanguage } from '../../contexts/LanguageContext';
import { card, eyebrow, localPath, CheckList } from './shared';

/* /pricing — iki kapılı seçici, rakam yok (konsey 2026-10-19). Soğuk mailler buraya değil
   doğrudan /pricing/automation'a bağlanır. */

// Eski /packages#<sekme> linkleri (mail, blog, dış siteler) doğru sayfaya gitsin.
const LEGACY_HASH: Record<string, string> = {
  systems: '/pricing/automation',
  agents: '/pricing/local#asistan',
  web: '/pricing/local#web',
  ads: '/pricing/local#reklam',
};

export default function PricingHub() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  React.useEffect(() => {
    const target = LEGACY_HASH[window.location.hash.replace('#', '')];
    if (target) window.location.replace(localPath(target, isEN));
  }, [isEN]);

  const doors = [
    {
      href: localPath('/pricing/automation', isEN),
      tag: isEN ? 'Manufacturers · distributors · teams of 20-500' : 'Üretici · distribütör · 20-500 kişilik ekipler',
      title: isEN ? 'Business automation' : 'İş otomasyonu',
      desc: isEN
        ? 'Quote and order requests, documents and data entry handled by a system your team approves.'
        : 'Teklif ve sipariş talepleri, evrak ve veri girişi; ekibinizin onayladığı bir sistemle.',
      items: isEN
        ? ['Starter, Business and Custom plans', 'Free 14-day trial on your own requests', 'Works with your email, Excel and ERP']
        : ['Başlangıç, İşletme ve Özel paketler', 'Kendi talepleriniz üzerinde 14 gün ücretsiz deneme', 'E-posta, Excel ve ERP düzeninizle çalışır'],
      cta: isEN ? 'See automation plans →' : 'Otomasyon paketlerini görün →',
    },
    {
      href: localPath('/pricing/local', isEN),
      tag: isEN ? 'Clinics · shops · restaurants · local services' : 'Klinik · mağaza · restoran · yerel hizmetler',
      title: isEN ? 'Local business' : 'Yerel işletme',
      desc: isEN
        ? 'A website that gets found, ads that bring customers and an assistant that answers every call and message.'
        : 'Bulunan bir web sitesi, müşteri getiren reklam ve her arama ile mesaja cevap veren asistan.',
      items: isEN
        ? ['Websites with yearly hosting', 'Meta and Google ads management', 'AI phone and WhatsApp assistants']
        : ['Yıllık barındırmalı web siteleri', 'Meta ve Google reklam yönetimi', 'AI telefon ve WhatsApp asistanları'],
      cta: isEN ? 'See prices →' : 'Fiyatları görün →',
    },
  ];

  return (
    <>
      <Seo
        title={isEN ? 'Pricing · MGL Digital Media' : 'Fiyatlar · MGL Digital Media'}
        description={isEN
          ? 'Two price lists: business automation for manufacturers and distributors, and websites, ads and AI assistants for local businesses.'
          : 'İki fiyat listesi: üretici ve distribütörler için iş otomasyonu; yerel işletmeler için web sitesi, reklam ve AI asistan.'}
        path="/pricing"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        jsonLd={[breadcrumbSchema([
          { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
          { name: isEN ? 'Pricing' : 'Fiyatlar', path: '/pricing' },
        ])]}
      />
      <section style={{ padding: 'clamp(3rem,8vw,5rem) 1.25rem clamp(3rem,6vw,4.5rem)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={eyebrow}>{isEN ? 'Pricing' : 'Fiyatlar'}</div>
            <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.15, margin: '0 0 0.75rem' }}>
              {isEN ? 'Which one describes you?' : 'Hangisi sizi anlatıyor?'}
            </h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              {isEN
                ? 'We keep two separate price lists so that each page only shows what is relevant to you.'
                : 'Her sayfada yalnızca size uygun olanı görmeniz için iki ayrı fiyat listesi tutuyoruz.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '1.25rem' }}>
            {doors.map((d) => (
              <a key={d.href} href={d.href} style={{ ...card, padding: '1.75rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ ...eyebrow, marginBottom: 0 }}>{d.tag}</div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{d.title}</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
                <CheckList items={d.items} />
                <span style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--ink)' }}>{d.cta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
