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
        padding: 'clamp(64px, 6vw + 24px, 128px) 0 clamp(48px, 4vw + 24px, 96px)',
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
            marginBottom: 48,
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
                Müşteriniz gece yazıyor.{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                  Cevabını
                </span>{' '}
                <span style={{ color: 'var(--ember)' }}>anında</span> alıyor.
              </>
            ) : (
              <>
                They message at midnight.{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                  They get an answer
                </span>{' '}
                <span style={{ color: 'var(--ember)' }}>straight away</span>.
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
              ? 'WhatsApp’a gelen mesajı, telefona gelen aramayı ve web sitenizdeki soruyu karşılayan bir sistem kuruyoruz. Siz uğraşmadan cevap verir, ilgilenen kişiyi size iletir. Reklamınızı da biz yönetiriz — gelen kişi boşa gitmesin.'
              : 'We set up a system that answers your WhatsApp messages, your phone calls and the questions on your site. It replies without you lifting a finger and passes the interested ones straight to you. We run your ads too — so the people who arrive don’t go to waste.'}
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
                    aspectRatio: '2 / 1',
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

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 17,
              lineHeight: 1.45,
              color: 'var(--fg-2)',
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
