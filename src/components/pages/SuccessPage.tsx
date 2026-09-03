import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuccessPageProps { onBack: () => void; }

export function SuccessPage({ onBack }: SuccessPageProps) {
  const { t } = useLanguage();
  return (
    <main className="checkout-status-page">
      <section className="checkout-status-card">
        <CheckCircle className="checkout-status-icon is-success" aria-hidden="true" />
        <span className="eyebrow">MGL DIGITAL MEDIA</span>
        <h1>{t('success.title')}</h1>
        <p className="lede">{t('success.subtitle')}</p>
        <div className="checkout-next">
          <h2>{t('success.next.title')}</h2>
          <p>{t('success.next.contact')}</p><p>{t('success.next.details')}</p><p>{t('success.next.setup')}</p><p>{t('success.next.training')}</p>
        </div>
        <div className="checkout-actions">
          <button type="button" onClick={onBack} className="btn btn-ghost btn-md"><ArrowLeft size={17} />{t('success.back')}</button>
          <a href="https://wa.me/447482670606?text=Hello%2C%20my%20MGL%20payment%20is%20complete." target="_blank" rel="noreferrer" className="btn btn-primary btn-md"><MessageCircle size={17} />{t('success.whatsapp')}</a>
        </div>
      </section>
    </main>
  );
}
