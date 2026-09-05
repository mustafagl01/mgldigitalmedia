import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useLocation } from '../../../contexts/LocationContext';
import { formatPrice, formatUnitRate } from '../../../utils/formatPrice';

/**
 * Ana sayfadaki fiyat bandı.
 *
 * Amaç: ziyaretçi fiyatı görmek için /packages'a gitmek zorunda kalmasın.
 * Fiyat en güçlü argümanımız — saklanmaz.
 *
 * Bütün rakamlar pricing.ts'ten okunur. Buraya elle rakam YAZILMAZ; yazılırsa
 * fiyat değiştiğinde sayfa kendi kendisiyle çelişir.
 */
export function HomePricing() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isTR = language === 'tr';

  const p = pricing.packages;

  const columns = [
    {
      titleTR: 'Asistanlar',
      titleEN: 'Assistants',
      headTR: 'Kurulum ücreti yok',
      headEN: 'No setup fee',
      priceLabel: `${formatPrice(p.voice.price, region)} / ${isTR ? 'ay' : 'month'}`,
      subTR: `Sesli ve WhatsApp asistanı. İkisini birden alırsanız aylık bedel tek ödenir. Üstüne kullanım: ${formatUnitRate(p.voice.usageRate ?? 0, region)} ${isTR ? 'konuşma dakikası' : 'per minute'}, ${formatUnitRate(p.whatsapp.usageRate ?? 0, region)} ${isTR ? 'AI yanıtı' : 'per AI reply'}.`,
      subEN: `Voice and WhatsApp assistants. Take both and the monthly fee is paid once. Usage on top: ${formatUnitRate(p.voice.usageRate ?? 0, region)} per connected minute, ${formatUnitRate(p.whatsapp.usageRate ?? 0, region)} per AI reply.`,
      href: '/packages#agents',
    },
    {
      titleTR: 'Kurulan sistemler',
      titleEN: 'Built systems',
      headTR: 'Tek seferlik kurulumdan başlar',
      headEN: 'From a one-off setup',
      priceLabel: `${formatPrice(p.automation.setupFee, region)}`,
      subTR: `Otomasyon sistemi tek seferlik kurulur, aylık bakım ${formatPrice(p.automation.price, region)}; barındırma, izleme ve arıza müdahalesi dahil. Lead + mail sisteminde kurulum yok — ayda ${formatPrice(p.leadmail.price, region)} + kullandığınız kredi.`,
      subEN: `The automation system is a one-off setup, ${formatPrice(p.automation.price, region)}/month maintenance including hosting, monitoring and incident response. The lead + email system has no setup fee — ${formatPrice(p.leadmail.price, region)}/month plus the credits you use.`,
      href: '/packages#systems',
    },
    {
      titleTR: 'Web siteleri',
      titleEN: 'Websites',
      headTR: 'Tek seferlik kurulum',
      headEN: 'One-off setup',
      priceLabel: `${formatPrice(p['web-landing'].setupFee, region)} – ${formatPrice(p['web-integrated'].setupFee, region)}`,
      subTR: `Tek sayfadan online sipariş ve ödeme altyapılı siteye kadar. Barındırma ${formatPrice(p['web-landing'].price, region)} / yıl.`,
      subEN: `From a one-page site to online ordering with payments. Hosting ${formatPrice(p['web-landing'].price, region)} a year.`,
      href: '/packages#web',
    },
    {
      titleTR: 'Reklam yönetimi',
      titleEN: 'Ad management',
      headTR: 'Sabit aylık ücret',
      headEN: 'Flat monthly fee',
      priceLabel: `${formatPrice(p['ads-meta'].price, region)} / ${isTR ? 'ay' : 'month'}`,
      subTR: `Meta veya Google. İkisi birden ${formatPrice(p['ads-both'].price, region)}. Reklam bütçeniz doğrudan platforma gider — üzerinden yüzde alınmaz.`,
      subEN: `Meta or Google. Both together ${formatPrice(p['ads-both'].price, region)}. Your ad budget goes straight to the platform — we take no percentage.`,
      href: '/packages#ads',
    },
  ];

  return (
    <section className="section" id="fiyatlar" style={{ background: 'var(--paper-2)' }}>
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 640 }}>
          {isTR ? 'Fiyatlar açık' : 'The prices are public'}
        </h2>
        <p style={{ marginTop: 12, maxWidth: 620, fontSize: 'var(--t-body-lg)', color: 'var(--fg-2)', lineHeight: 1.6 }}>
          {isTR
            ? 'Teklif beklemeden ne ödeyeceğinizi görün. Aralık yok, gizli kalem yok.'
            : 'See what you would pay without waiting for a quote. No ranges, no hidden items.'}
        </p>

        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {columns.map((c) => (
            <a
              key={c.href}
              href={c.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '22px 24px',
                background: 'var(--paper)',
              }}
            >
              <h3 style={{ fontSize: 16 }}>{isTR ? c.titleTR : c.titleEN}</h3>
              <p
                style={{
                  margin: '12px 0 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-3)',
                }}
              >
                {isTR ? c.headTR : c.headEN}
              </p>
              <strong
                style={{
                  display: 'block',
                  marginTop: 4,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  color: 'var(--ember)',
                }}
              >
                {c.priceLabel}
              </strong>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                {isTR ? c.subTR : c.subEN}
              </p>
              <span
                style={{
                  marginTop: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ember)',
                }}
              >
                {isTR ? 'Ayrıntılar' : 'Details'}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--fg-3)', maxWidth: 680, lineHeight: 1.6 }}>
          {isTR
            ? 'Birden fazla sistemi birlikte kurduğumuzda kapsam ve fiyat tek teklifte yazılı olarak belirlenir. Ücretsiz görüşmede hangisinin gerçekten gerektiğini birlikte çıkarırız.'
            : 'When several systems are built together, scope and price are set out in a single written proposal. In the free call we work out which ones you actually need.'}
        </p>
      </div>
    </section>
  );
}
