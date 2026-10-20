import type { ReactNode } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WORK, ADS_CLIENTS, PROOF_UPDATED } from '../../content/v3';

/* v3 ortak parçalar: görsel (masaüstü/mobil art direction), kanıt şeridi, iş kartları,
   kurucu bloğu, SSS, kapanış bandı. Tek kaynak — sayfalarda tekrar yazılmaz. */

export const WHATSAPP = 'https://wa.me/447482670606';
export const WHATSAPP_TR = 'https://wa.me/905318299701';
export const CALENDAR = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

export function useV3() {
  const { language } = useLanguage();
  const lang: 'tr' | 'en' = language === 'en' ? 'en' : 'tr';
  return { lang, isEN: lang === 'en', t: (tr: string, en: string) => (lang === 'en' ? en : tr) };
}

/** Masaüstü + mobil ayrı kompozisyon. Dosyalar public/v3/<ad>-d.webp ve <ad>-m.webp. */
export function Pic({ name, alt, eager = false, ratio }: { name: string; alt: string; eager?: boolean; ratio?: string }) {
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={`/v3/${name}-m.webp`} />
      <img src={`/v3/${name}-d.webp`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} style={ratio ? { aspectRatio: ratio } : undefined} />
    </picture>
  );
}

export function Head({ tag, title, soft, lede, children }: { tag?: string; title: string; soft?: string; lede?: string; children?: ReactNode }) {
  return (
    <div className="v3-head">
      {tag && <div className="v3-tag">{tag}</div>}
      <h2 className="v3-h2">{title}{soft && <><br /><span className="soft">{soft}</span></>}</h2>
      {lede && <p className="v3-lede">{lede}</p>}
      {children}
    </div>
  );
}

export function KanitSeridi() {
  const { lang, t } = useV3();
  return (
    <section className="v3-section--tight v3-section--white" aria-label={t('Bugün itibarıyla', 'As of today')}>
      <div className="v3-wrap v3-proof">
        <div className="v3-proof__facts">
          <div className="v3-tag" style={{ marginBottom: 6 }}>{t('Bugün itibarıyla', 'As of today')}</div>
          <div><b>{t(`Yayında ${WORK.length} müşteri sitesi`, `${WORK.length} live client websites`)}</b> · {t('1 sürekli reklam müşterisi', '1 ongoing ads client')}</div>
          <div>{t('Otomasyon: ilk kurulumlar görüşme aşamasında', 'Automation: first setups in discussion')}</div>
          <div style={{ fontSize: 12.5, color: 'var(--fg-3)' }}>
            MGL Digital Media Ltd · {t('Şirket no', 'Company no')} <a href="https://find-and-update.company-information.service.gov.uk/company/16007414" target="_blank" rel="noopener noreferrer">16007414</a> · {t('Güncelleme', 'Updated')}: {PROOF_UPDATED[lang]}
          </div>
        </div>
        <div className="v3-proof__sites">
          {WORK.slice(0, 8).map((w) => (
            <a key={w.slug} className="v3-pill" href={w.url} target="_blank" rel="noopener noreferrer"><i />{w.name}</a>
          ))}
          <a className="v3-pill" href="/isler" style={{ fontWeight: 600, color: 'var(--ember)' }}>{t('Tümü →', 'See all →')}</a>
        </div>
      </div>
    </section>
  );
}

export function IsKartlari({ limit }: { limit?: number }) {
  const { lang, t } = useV3();
  const list = limit ? WORK.slice(0, limit) : WORK;
  return (
    <>
      <div className="v3-work">
        {list.map((w) => (
          <a key={w.slug} className="v3-work__card" href={w.url} target="_blank" rel="noopener noreferrer">
            <div className="v3-work__shot"><img src={`/v3/isler/${w.slug}.webp`} alt={t(`${w.name} web sitesi ana sayfası`, `${w.name} website home page`)} loading="lazy" decoding="async" width={1200} height={750} /></div>
            <div className="v3-work__body">
              <em>{w.kind[lang]}</em>
              <strong>{w.name}</strong>
              <span>{w.place[lang]}{w.note ? ` · ${w.note[lang]}` : ''}</span>
            </div>
          </a>
        ))}
      </div>
      {!limit && (
        <div className="v3-grid" style={{ marginTop: 16 }}>
          {ADS_CLIENTS.map((c) => (
            <div key={c.name} className="v3-card">
              <span className="v3-chip">{c.kind[lang]}</span>
              <strong>{c.name}</strong>
              <p>{c.place[lang]}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function Kurucu() {
  const { t } = useV3();
  return (
    <div className="v3-founder">
      <div className="v3-founder__mark" aria-hidden="true">MG</div>
      <div>
        <div className="v3-tag">{t('Kiminle çalışıyorsunuz', 'Who you work with')}</div>
        <h2 className="v3-h2" style={{ fontSize: 'clamp(1.5rem,1rem+1.6vw,2.2rem)' }}>{t('İşi kuran kişiyle konuşursunuz.', 'You talk to the person who builds it.')}</h2>
        <p className="v3-lede" style={{ marginBottom: 0 }}>
          {t(
            'MGL Digital Media, kurucu Mustafa Gül’ün yönettiği küçük bir şirket. Arada satış ekibi yok; sistemi kuran ve sonra bakımını yapan aynı kişi. Sistemler mümkün olduğunca sizin hesaplarınızda kurulur, erişimler ve kurulum notları size teslim edilir. Aynı anda sınırlı sayıda yeni iş alıyoruz.',
            'MGL Digital Media is a small company run by its founder, Mustafa Gül. There is no sales layer; the person who builds your system also maintains it. Systems are set up in your own accounts wherever possible, and access and setup notes are handed over to you. We take on a limited number of new projects at a time.',
          )}
        </p>
      </div>
      <div className="v3-btns" style={{ alignSelf: 'end' }}>
        <a className="btn btn-primary btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t('WhatsApp’tan yazın', 'Message us on WhatsApp')}</a>
        <a className="btn btn-ghost btn-lg" href="/hakkimizda">{t('Hakkımızda', 'About us')}</a>
      </div>
    </div>
  );
}

export function Sss({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="v3-faq">
      {items.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}
    </div>
  );
}

export function KapanisBandi({ title, soft, text }: { title?: string; soft?: string; text?: string }) {
  const { t } = useV3();
  return (
    <section className="v3-section v3-section--dark">
      <div className="v3-wrap" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', alignItems: 'end' }}>
        <div>
          <div className="v3-tag">{t('Sonraki adım', 'Next step')}</div>
          <h2 className="v3-h2">{title ?? t('Neye ihtiyacınız var?', 'What do you need?')}<br /><span style={{ color: 'var(--bone-3)' }}>{soft ?? t('Birkaç cümleyle yazın.', 'Tell us in a few lines.')}</span></h2>
          <p className="v3-lede" style={{ marginBottom: 0 }}>{text ?? t('Web sitesi, reklam, asistan ya da otomasyon: işinizi anlatın, size uygun paketi ve sonraki adımı önerelim.', 'Website, ads, assistant or automation: tell us about your business and we will suggest the right plan and next step.')}</p>
        </div>
        <div className="v3-btns" style={{ justifyContent: 'flex-start' }}>
          <a className="btn btn-primary btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t('WhatsApp’tan yazın', 'Message us on WhatsApp')}</a>
          <a className="btn btn-lg" style={{ border: '1px solid var(--coal-3)', color: 'var(--bone)' }} href={CALENDAR} target="_blank" rel="noopener noreferrer">{t('15 dakikalık görüşme', '15-minute call')}</a>
        </div>
      </div>
    </section>
  );
}
