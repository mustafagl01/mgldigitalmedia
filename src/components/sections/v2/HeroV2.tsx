import { ArrowUpRight, Play } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { HeroBackdrop } from '../../site/HeroBackdrop';

interface Props {
  onAnalysisClick: () => void;
  onDemoClick: () => void;
}

/**
 * Hero ürün görseli — dil + viewport bazlı seçilen premium ürün görseli.
 *
 * ÖNCEKİ HALİ (v1): 3 markasız "konsept demo" web sitesi kartı, sağ kolonda
 * küçük bir sidebar olarak. ÖNCEKİ HALİ (v2): aynı görsel ama yine sağ
 * kolonda 460px'e sıkıştırılmıştı — görsel içindeki telefon/laptop/akış
 * kartı detayı bu kadar küçülünce okunaksız kalıyordu (2026-09-05).
 *
 * ŞİMDİKİ HALİ: hero dikey ürün sunumu. Metin üstte dar, görsel altta
 * container'dan geniş — Apple/Stripe tipi tanıtım mantığı.
 *
 * Mobilyapı: her iki dil için de özel dikey varyant var (mobile, ~2:3 ve ~4:5
 * oranlarında — kaynak görseller birebir aynı oranda üretilmedi, bu yüzden
 * oran CSS custom property üzerinden görsele göre ayarlanıyor, bkz.
 * `--hero-mobile-ratio` ve index.css `.hero-visual--portrait`). Masaüstü/
 * tablette her iki dil de yatay ana görseli (1536×1024) kullanıyor.
 */
const HERO_IMAGE = {
  tr: {
    desktop: { src: '/hero/hero-system-tr.webp', alt: 'Google aramasından WhatsApp üzerinden rezervasyona, CRM kaydına ve otomatik takibe kadar uçtan uca dijital müşteri sistemi' },
    mobile: { src: '/hero/hero-system-tr-mobile.webp', alt: 'Mobil Türkçe: WhatsApp sohbeti, CRM bildirimleri ve rezervasyon konfirmasyonu gösteren uçtan uca dijital müşteri sistemi', ratio: '1024 / 1536' },
  },
  en: {
    desktop: { src: '/hero/hero-system-en.webp', alt: 'End-to-end digital customer system from a Google search through a WhatsApp booking to the CRM record and automated follow-up' },
    mobile: { src: '/hero/hero-system-en-mobile.webp', alt: 'Mobile: WhatsApp chat, CRM notifications and a reservation confirmation showing an end-to-end digital customer system', ratio: '1122 / 1402' },
  },
} as const;

export function HeroV2({ onAnalysisClick, onDemoClick }: Props) {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        padding: 'clamp(36px, 3vw + 16px, 72px) 0 clamp(56px, 5vw + 24px, 104px)',
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

      {/* Metin bloğu — başlık artık dar bir kolona sıkıştırılmıyor.
          Önceki hali (maxWidth: 1050 tüm blokta) başlığı 4-5 satıra
          düşürüyor, sağda ölü boşluk bırakıyor ve görseli aşağı itiyordu
          (kullanıcı geri bildirimi, 2026-09-05). Başlık artık container'a
          yakın genişlikte (1200px), sola hizalı — justify YOK, MGL'nin
          editorial kimliği ortalanmış "SaaS landing page" hissinden
          bilinçli olarak uzak duruyor. Açıklama hâlâ dar (640px, aşağıda). */}
      <div className="container" style={{ position: 'relative' }}>
        <div className="animate-fade-in" style={{ marginBottom: 22 }}>
          {/* Eskiden "yeni proje alıyoruz" rozeti sağda ayrı, havada duran bir
              öge olarak sıra bozuyordu. Tek satırlık eyebrow'a birleştirildi. */}
          <span className="eyebrow" style={{ flexWrap: 'wrap', rowGap: 6 }}>
            <span>{isTR ? 'LONDRA MERKEZLİ · DİJİTAL SİSTEMLER' : 'LONDON-BASED · DIGITAL SYSTEMS'}</span>
            <span style={{ opacity: 0.35 }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span className="dot-live" />
              {isTR ? 'Yeni proje alıyoruz' : 'Taking new projects now'}
            </span>
          </span>
        </div>

        <div className="animate-fade-up" style={{ maxWidth: 1200 }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 1.2rem + 3.6vw, 4.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: 0,
              textWrap: 'balance',
              textAlign: 'left',
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
            }}
          >
            {/* Başlık kuralı: ne sattığımız ilk cümlede net olsun. Somut:
                kim, ne zaman, ne oluyor. DİKKAT — sadece gerçekten yapılan
                şey yazılır; olmayan özellik vaat edilmez.
                .hero-line: masaüstünde (≥900px) block olup satırı zorluyor —
                "İşletmenizi bulduruyor, müşteriyi yakalıyor" / "ve süreci
                otomatikleştiriyoruz." iki satıra sabitlenir. Mobilde inline
                kalır, tarayıcı doğal sarar (2-3-4 satır olabilir, zorlanmaz). */}
            {isTR ? (
              <>
                <span className="hero-line">
                  İşletmenizi bulduruyor,{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                    müşteriyi yakalıyor
                  </span>
                </span>{' '}
                <span className="hero-line">
                  ve süreci <span style={{ color: 'var(--ember)' }}>otomatikleştiriyoruz</span>.
                </span>
              </>
            ) : (
              <>
                <span className="hero-line">
                  We get you found,{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>
                    capture the customer
                  </span>
                </span>{' '}
                <span className="hero-line">
                  and <span style={{ color: 'var(--ember)' }}>automate the process</span>.
                </span>
              </>
            )}
          </h1>

          <p
            className="lede"
            style={{
              marginTop: 20,
              color: 'var(--fg-2)',
              fontSize: 'clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem)',
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            {isTR
              ? 'Web sitesi, Google, reklam, SEO, yapay zekâ ve otomasyon. Birbirinden kopuk hizmetler değil — birlikte çalışan bir müşteri sistemi.'
              : 'Website, Google, advertising, SEO, AI and automation. Not disconnected services — one customer system that works together.'}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 28,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <button onClick={onAnalysisClick} className="btn btn-primary btn-lg">
              {isTR ? 'İşletmemi Analiz Et' : 'Analyse my business'}
              <ArrowUpRight size={18} />
            </button>
            <button onClick={onDemoClick} className="btn btn-ghost btn-lg">
              <Play size={16} style={{ marginRight: 2 }} />
              {isTR ? 'Sesli asistanı ara' : 'Call the voice agent'}
            </button>
          </div>

          {/* Transparency strip — honest pledge, no fake metrics */}
          <div
            style={{
              marginTop: 20,
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
            <span>{isTR ? 'Kurulum bizden' : 'Setup on us'}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{isTR ? 'Aylık çıkış hakkı' : 'Monthly cancellation'}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{isTR ? 'UK Ltd. sözleşmesi' : 'UK Ltd. contract'}</span>
          </div>
        </div>
      </div>

      {/* Ürün görseli — hero'nun ana görsel öznesi. Metin sütunundan daha
          geniş bir container kullanır ve viewport'un büyük kısmını kaplar;
          "yardımcı dekorasyon" değil "showcase". Üstteki boşluk sıkılaştırıldı
          (72px→56px tepe) ki görsel ilk ekranın içine daha yukarı girsin. */}
      <div
        className="container animate-fade-up hero-visual hero-visual--portrait-mobile"
        style={{
          marginTop: 'clamp(32px, 4vw, 56px)',
          maxWidth: 1400,
          ['--hero-mobile-ratio' as string]: HERO_IMAGE[language].mobile.ratio,
        }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMAGE[language].mobile.src} />
          <img
            src={HERO_IMAGE[language].desktop.src}
            alt={HERO_IMAGE[language].desktop.alt}
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 20,
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          />
        </picture>
      </div>

      {/* Sistem haritası — artık görselin ANLATTIĞI şeyin yazılı özeti olarak
          görselin altında duruyor (önceden dar sağ kolonun yanındaki boşluğu
          doldurmak için buradaydı; o gerekçe iki kolonlu düzenle kalktı). */}
      <div className="container" style={{ marginTop: 'clamp(48px, 5vw, 80px)' }}>
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          {isTR ? 'İŞLETMENİZİN DİJİTAL SİSTEMİ' : 'YOUR BUSINESS AS ONE SYSTEM'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 0.9rem + 0.6vw, 1.5rem)',
            lineHeight: 1.3,
            color: 'var(--ink)',
            margin: '0 0 20px',
            maxWidth: 560,
          }}
        >
          {isTR
            ? 'Birbirinden kopuk hizmetler değil. Birlikte çalışan bir sistem kuruyoruz.'
            : 'Not disconnected services. One system that works together.'}
        </p>

        <ol
          className="hero-system-map"
          style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 18 }}
        >
          {(isTR
            ? [
                ['01 — Bul', ['Google', 'Maps', 'SEO', 'GEO', 'Reklam']],
                ['02 — İkna Et', ['Web sitesi', 'Landing page', 'Marka', 'İçerik']],
                ['03 — Dönüştür', ['WhatsApp', 'Telefon', 'Form', 'Rezervasyon', 'Sipariş']],
                ['04 — Otomatikleştir', ['AI', 'CRM', 'Workflow', 'Takip']],
                ['05 — Geri Getir', ['Hatırlatma', 'Sadakat', 'Remarketing']],
              ]
            : [
                ['01 — Get Found', ['Google', 'Maps', 'SEO', 'GEO', 'Ads']],
                ['02 — Persuade', ['Website', 'Landing page', 'Brand', 'Content']],
                ['03 — Convert', ['WhatsApp', 'Phone', 'Form', 'Booking', 'Ordering']],
                ['04 — Automate', ['AI', 'CRM', 'Workflow', 'Tracking']],
                ['05 — Bring Back', ['Reminders', 'Loyalty', 'Remarketing']],
              ]
          ).map(([label, chips]) => (
            <li key={label as string}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ember)',
                    minWidth: 128,
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
            </li>
          ))}
        </ol>

        <p style={{ marginTop: 18, fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-3)', maxWidth: 520 }}>
          {isTR
            ? 'Müşteri sizi bulduğu andan tekrar satın aldığı ana kadar süreci birbirine bağlıyoruz.'
            : 'We connect the journey from the moment someone finds you to the moment they buy again.'}
        </p>
      </div>
    </section>
  );
}
