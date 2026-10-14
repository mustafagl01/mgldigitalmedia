import { Workflow, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * Ana sayfadan /surec-otomasyonu sayfasına sade köprü (2026-10-14).
 * Ana sayfanın müşteri kazanımı odağını bozmaz; şirket içi süreçlerini hızlandırmak
 * isteyen B2B ziyaretçiyi ayrı sayfaya yönlendirir. Abartı yok, fiyat yok.
 */
export function HomeProcessBridge() {
  const { language } = useLanguage();
  const isTR = language === 'tr';

  return (
    <section className="section" id="surec-otomasyonu">
      <div className="container">
        <a
          href="/surec-otomasyonu"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            padding: '28px 30px',
            background: 'var(--paper-2)',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', maxWidth: 720 }}>
            <span
              style={{
                display: 'inline-flex',
                flex: '0 0 auto',
                width: 38,
                height: 38,
                borderRadius: 'var(--r-md)',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                color: 'var(--ember)',
              }}
            >
              <Workflow size={19} aria-hidden="true" />
            </span>
            <div>
              <h3 style={{ fontSize: 20 }}>
                {isTR ? 'Şirket içi işler için özel otomasyonlar' : 'Custom automation for internal work'}
              </h3>
              <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                {isTR
                  ? 'Müşteri kazanımının yanında; teklif hazırlama, sipariş ve evrak işleri, raporlama gibi tekrarlanan işleri kendi sistemlerinizle çalışan otomasyonlarla hızlandırıyoruz. Tek bir süreçle 14 gün ücretsiz deneyebilirsiniz.'
                  : 'Alongside customer acquisition, we speed up repetitive work such as quotes, orders, documents and reporting with automations that run on your own systems. Try one process free for 14 days.'}
              </p>
            </div>
          </div>
          <span className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {isTR ? 'Süreç otomasyonunu incele' : 'See process automation'}
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>
    </section>
  );
}
