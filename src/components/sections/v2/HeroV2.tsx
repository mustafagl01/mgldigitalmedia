import { ArrowUpRight, Play } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { HeroBackdrop } from '../../site/HeroBackdrop';
// Görsel içerik hash'leri — demo siteler değişince görseli yeniliyoruz ama
// dosya adı aynı kalıyor. Bu damga olmadan tarayıcı eski görseli göstermeye
// devam ediyor. scripts/build_portfolio_images.py üretir.
import manifest from '../../../data/portfolio-manifest.json';

interface Props {
  onAnalysisClick: () => void;
  onDemoClick: () => void;
}

/**
 * Hero'daki iş duvarı.
 *
 * MARKASIZ SUNUM — bilinçli karar: bu siteler demo olarak yapıldı, ilgili
 * işletmeler müşteri olmadı. Başkasının marka adını/logosunu portföyde
 * göstermek izinsiz kullanım olur. Bu yüzden sektör + yapılan iş yazılıyor,
 * görsellerde logo/isim kırpıldı (scripts/build_portfolio_images.py).
 *
 * Anlatım kuralı: ne kurulduğu değil, müşterinin ne kazandığı yazılır.
 * "n8n webhook" değil → "gece de cevap veren asistan".
 */
const HERO_WORKS = [
  {
    slug: 'sac-ekimi',
    img: '/portfolio/sac-ekimi.webp',
    url: 'https://estelondon.vercel.app/',
    tr: 'Saç ekimi kliniği',
    trWhat: 'Hasta kendi dilinde konuşuyor, fotoğrafını yolluyor',
    en: 'Hair transplant clinic',
    enWhat: 'Patients speak in their own language, send photos',
  },
  {
    slug: 'dis-klinigi',
    img: '/portfolio/dis-klinigi.webp',
    url: 'https://denteuropa.vercel.app/',
    tr: 'Diş kliniği',
    trWhat: 'Tedavi ve fiyat sorularını gece de cevaplıyor',
    en: 'Dental clinic',
    enWhat: 'Answers treatment and fee questions after hours',
  },
  {
    slug: 'anaokulu',
    img: '/portfolio/anaokulu.webp',
    url: 'https://beyaz-zambak-kurttepe.vercel.app/',
    tr: 'Anaokulu',
    trWhat: 'Veli sorularını karşılıyor, iletişime yönlendiriyor',
    en: 'Nursery school',
    enWhat: 'Fields parent questions and points them to contact',
  },
  // NOT: Mali müşavir (musavir.vercel.app) bilerek eklenmedi — yeni başlanmış
  // bir iş. Yarım işi vitrine koymak, iyi işlerin değerini de düşürür.
  // Bitince buraya eklenir.
] as const;

export function HeroV2({ onAnalysisClick, onDemoClick }: Props) {
  const { language } = useLanguage();

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        padding: 'clamp(36px, 3vw + 16px, 72px) 0 clamp(48px, 4vw + 24px, 96px)',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      {/* Fine dot-grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14, 14, 12, 0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Animated sine-wave backdrop — ember, breathing, mouse-parallax */}
      <HeroBackdrop />

      <div className="container hero-grid" style={{ position: 'relative' }}>
        <div>
        {/* Eyebrow row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
          className="animate-fade-in"
        >
          <span className="eyebrow">
            {language === 'tr' ? 'LONDRA MERKEZLİ · AI & OTOMASYON AJANSI' : 'LONDON-BASED · AI & AUTOMATION AGENCY'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span className="dot-live" />
            {language === 'tr' ? 'Şu an yeni proje alıyoruz' : 'Taking new projects now'}
          </span>
        </div>

        {/* Headline */}
        <div className="animate-fade-up">
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 1.2rem + 5vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: 0,
              textWrap: 'balance',
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
            }}
          >
            {/* Başlık kuralı: ne sattığımız ilk cümlede net olsun.
                Eski hali "Operasyonel yüklerinizi otomatize ederiz" idi —
                soyut ve mühendis dili. Meslektaş geri bildirimi: "ne sattığın
                ilk banner'da yok". Yeni hali somut: kim, ne zaman, ne oluyor. */}
            {/* DİKKAT — sadece gerçekten yapılan şey yazılır.
                Randevu/takvim entegrasyonu HENÜZ YOK: sistem soruyu karşılar,
                cevaplar ve talebi size iletir. Olmayan özellik vaat edilmez;
                müşteri gelip sorduğunda karşılığı olmalı. */}
            {language === 'tr' ? (
              <>
                İşletmenizin{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                  dijital tarafını
                </span>{' '}
                <span style={{ color: 'var(--ember)' }}>baştan sona</span> kuruyoruz.
              </>
            ) : (
              <>
                We build your{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                  entire digital side
                </span>{' '}
                <span style={{ color: 'var(--ember)' }}>end to end</span>.
              </>
            )}
          </h1>

          <p
            className="lede"
            style={{
              marginTop: 28,
              color: 'var(--fg-2)',
              fontSize: 'clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem)',
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            {/* Jargon temizlendi: "n8n otomasyonu", "AI asistan", "SEO",
                "dijital motorlar" çıkarıldı. Müşterinin ne kazandığı yazıldı.
                Teknik detay aşağıdaki bölümlerde duruyor — meraklı olan görsün,
                arayan kişi kaçmasın. */}
            {language === 'tr'
              ? 'Web sitenizden Google görünürlüğünüze, reklamlardan yapay zekâ asistanlarına, otomasyondan müşteri takibine kadar işletmenizin ihtiyaç duyduğu dijital sistemleri kuruyor ve yönetiyoruz.'
              : 'From your website and Google visibility to advertising, AI assistants, automation and customer follow-up — we build and run the digital systems your business needs.'}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 40,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <button onClick={onAnalysisClick} className="btn btn-primary btn-lg">
              {language === 'tr' ? 'Ücretsiz 15 dk analiz' : 'Free 15-min audit'}
              <ArrowUpRight size={18} />
            </button>
            <button onClick={onDemoClick} className="btn btn-ghost btn-lg">
              <Play size={16} style={{ marginRight: 2 }} />
              {language === 'tr' ? 'Sesli asistanı ara' : 'Call the voice agent'}
            </button>
          </div>

          {/* Transparency strip — honest pledge, no fake metrics */}
          <div
            style={{
              marginTop: 28,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--fg-3)',
              letterSpacing: '0.04em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 18px',
              alignItems: 'center',
            }}
          >
            <span>
              {language === 'tr' ? 'Kurulum bizden' : 'Setup on us'}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {language === 'tr' ? 'Aylık çıkış hakkı' : 'Monthly cancellation'}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {language === 'tr' ? 'UK Ltd. sözleşmesi' : 'UK Ltd. contract'}
            </span>
          </div>

          {/* Sistem haritası.
              Bu alan daha önce boştu: sağdaki iş duvarı sol kolondan uzun
              olduğu için altta 259px boşluk kalıyordu. Oraya rastgele bir kart
              koymak yerine ziyaretçinin "MGL aslında ne kuruyor?" sorusunu
              tek bakışta cevaplayan katman şeması kondu.
              NOT: Aşağıdaki "Sadece web sitesi yapmıyoruz" akış bölümü bunun
              tekrarı olduğu için ana sayfadan çıkarıldı. */}
          <div style={{ marginTop: 40 }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>
              {language === 'tr' ? 'İŞLETMENİZİN DİJİTAL SİSTEMİ' : 'YOUR BUSINESS AS ONE SYSTEM'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.15rem, 0.9rem + 0.6vw, 1.5rem)',
                lineHeight: 1.3,
                color: 'var(--ink)',
                margin: '0 0 18px',
                maxWidth: 460,
              }}
            >
              {language === 'tr'
                ? 'Birbirinden kopuk hizmetler değil. Birlikte çalışan bir sistem kuruyoruz.'
                : 'Not disconnected services. One system that works together.'}
            </p>

            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(language === 'tr'
                ? [
                    ['Bulunun', ['Google', 'SEO', 'Reklam']],
                    ['İlgi çekin', ['Web sitesi', 'Landing page']],
                    ['Yanıtlayın', ['WhatsApp', 'Sesli AI', 'Chatbot']],
                    ['Kazanın', ['CRM', 'Rezervasyon', 'Sipariş']],
                    ['Koruyun', ['Otomatik takip', 'Sadakat']],
                  ]
                : [
                    ['Get found', ['Google', 'SEO', 'Ads']],
                    ['Earn attention', ['Website', 'Landing page']],
                    ['Answer', ['WhatsApp', 'Voice AI', 'Chatbot']],
                    ['Win', ['CRM', 'Booking', 'Ordering']],
                    ['Keep', ['Follow-up', 'Loyalty']],
                  ]
              ).map(([label, chips], i, arr) => (
                <li key={label as string} style={{ position: 'relative', paddingBottom: i < arr.length - 1 ? 14 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--ember)',
                        minWidth: 92,
                      }}
                    >
                      {label as string}
                    </span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(chips as string[]).map((c) => (
                        <span
                          key={c}
                          style={{
                            fontSize: 12.5,
                            color: 'var(--fg-2)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--r-sm)',
                            padding: '3px 9px',
                            background: 'var(--paper-2)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 40,
                        bottom: 1,
                        width: 1,
                        height: 11,
                        background: 'var(--border-2)',
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>

            <p style={{ marginTop: 16, fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-3)', maxWidth: 440 }}>
              {language === 'tr'
                ? 'Müşteri sizi bulduğu andan tekrar satın aldığı ana kadar süreci birbirine bağlıyoruz.'
                : 'We connect the journey from the moment someone finds you to the moment they buy again.'}
            </p>
          </div>
        </div>
        </div>

        {/* Right column — Bento work wall (desktop ≥1024px only)
            ÖNCEKİ HALİ: terminal log kutusu (agent.n8n.webhook → 14:02:08).
            NEDEN DEĞİŞTİ: Bir web tasarımcısı meslektaşın geri bildirimi —
            "teknik jargon, bilmeyene bunlar ne ifade eder", "tamirci gibi
            duruyor". Log ekranı sistemi tamir eden kişinin baktığı şeydir;
            müşteri sonuç görmek ister. Yerine yapılan işlerin görseli kondu.
            Markasız: işletmeler müşteri değil, demo — isim/logo kırpıldı. */}
        <aside
          className="hero-artifact animate-fade-up"
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ember)',
              paddingBottom: 10,
              borderBottom: '1px solid rgba(188, 59, 21, 0.22)',
              marginBottom: 20,
            }}
          >
            {language === 'tr' ? 'KONSEPT DEMOLAR · CANLI İNCELEYİN' : 'CONCEPT DEMOS · EXPLORE LIVE'}
          </div>

          <div
            className="hero-work-grid"
            style={{
              display: 'grid',
              gap: 12,
              marginBottom: 20,
            }}
          >
            {HERO_WORKS.map((w) => (
              <a
                key={w.slug}
                href={w.url}
                target="_blank"
                rel="noopener"
                className="hero-work"
                style={{
                  position: 'relative',
                  display: 'block',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid rgba(14, 14, 12, 0.1)',
                  background: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <img
                  src={`${w.img}?v=${(manifest as Record<string, string>)[w.slug] ?? ''}`}
                  alt={language === 'tr' ? `${w.tr} için hazırlanmış örnek web ve asistan arayüzü` : `Sample website and assistant interface for a ${w.en.toLowerCase()}`}
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={470}
                  style={{
                    width: '100%',
                    aspectRatio: '5 / 2',
                    objectFit: 'cover',
                    objectPosition: 'left top',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '8px 11px 10px' }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                    }}
                  >
                    {language === 'tr' ? w.tr : w.en}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--fg-3)',
                      marginTop: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {language === 'tr' ? w.trWhat : w.enWhat}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Yasal/etik açıklama — durması şart ama görsel hiyerarşide ana
              mesajla yarışmamalı. Eskiden 17px serif italikti ve göz oraya
              gidiyordu; küçültülüp griye alındı. */}
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: 'var(--fg-3)',
              margin: 0,
              fontWeight: 400,
            }}
          >
            {language === 'tr'
              ? 'Bunlar yaklaşımımızı göstermek için hazırladığımız konsept çalışmalardır; gerçek müşteri sonucu iddiası taşımaz.'
              : 'These are concept builds made to demonstrate our approach; they are not presented as client results.'}
          </p>
        </aside>
      </div>
    </section>
  );
}
