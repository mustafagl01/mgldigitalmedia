import { ArrowLeft, MessageCircle, RefreshCw, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CancelPageProps { onBack: () => void; onRetry: () => void; }

export function CancelPage({ onBack, onRetry }: CancelPageProps) {
  const { t } = useLanguage();
  return (
    <main className="checkout-status-page">
      <section className="checkout-status-card">
        <XCircle className="checkout-status-icon is-cancel" aria-hidden="true" />
        <span className="eyebrow">MGL DIGITAL MEDIA</span>
        <h1>{t('cancel.title')}</h1>
        <p className="lede">{t('cancel.subtitle')}</p>
        <div className="checkout-next"><h2>{t('cancel.help.title')}</h2><p>{t('cancel.help.desc')}</p></div>
        <div className="checkout-actions">
          <button type="button" onClick={onBack} className="btn btn-ghost btn-md"><ArrowLeft size={17} />{t('cancel.back')}</button>
          <button type="button" onClick={onRetry} className="btn btn-primary btn-md"><RefreshCw size={17} />{t('cancel.retry')}</button>
        </div>
        <a className="checkout-support" href="https://wa.me/447482670606?text=Hello%2C%20I%20need%20help%20with%20checkout." target="_blank" rel="noreferrer"><MessageCircle size={16} />{t('cancel.support')}</a>
      </section>
    </main>
  );
}
