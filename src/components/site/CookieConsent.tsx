import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CONSENT_KEY = 'mgl-cookie-consent-v1';
type Consent = 'accepted' | 'rejected';

function loadTracking() {
  if (document.querySelector('script[data-mgl-tracking]')) return;

  const dataLayer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
  const gtag = (...args: unknown[]) => dataLayer.push(args);
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-0GNSN9EE2G', { anonymize_ip: true });

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-0GNSN9EE2G';
  ga.dataset.mglTracking = 'analytics';
  document.head.appendChild(ga);

  const pixel = document.createElement('script');
  pixel.async = true;
  pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
  pixel.dataset.mglTracking = 'advertising';
  document.head.appendChild(pixel);

  // Meta Pixel kuyruk saplamasi: fbevents.js yuklenene kadar cagrilar burada birikir,
  // yuklenince gercek fbq bunlari isler.
  type Fbq = ((...args: unknown[]) => void) & {
    queue: unknown[][];
    loaded: boolean;
    version: string;
  };
  const pixelWindow = window as unknown as { fbq?: Fbq };

  if (!pixelWindow.fbq) {
    const queue: unknown[][] = [];
    const stub = ((...args: unknown[]) => {
      queue.push(args);
    }) as Fbq;
    stub.queue = queue;
    stub.loaded = true;
    stub.version = '2.0';
    pixelWindow.fbq = stub;
  }

  pixelWindow.fbq('init', '2379329765780243');
  pixelWindow.fbq('track', 'PageView');
}

export function CookieConsent() {
  const { language } = useLanguage();
  const [choice, setChoice] = useState<Consent | null>(() => {
    try { return window.localStorage.getItem(CONSENT_KEY) as Consent | null; } catch { return null; }
  });

  useEffect(() => {
    if (choice === 'accepted') loadTracking();
  }, [choice]);

  const choose = (value: Consent) => {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* storage can be unavailable */ }
    setChoice(value);
  };

  if (choice) return null;
  const isTR = language === 'tr';

  return (
    <aside className="cookie-consent" role="dialog" aria-live="polite" aria-label={isTR ? 'Çerez tercihleri' : 'Cookie preferences'}>
      <div>
        <strong>{isTR ? 'Gizlilik tercihiniz' : 'Your privacy choice'}</strong>
        <p>
          {isTR
            ? 'Zorunlu depolama siteyi çalıştırır. Analitik ve reklam ölçümü yalnızca kabul ederseniz yüklenir.'
            : 'Essential storage keeps the site working. Analytics and advertising measurement load only if you accept.'}{' '}
          <a href={isTR ? '/legal' : '/en/legal'}>{isTR ? 'Ayrıntılar' : 'Details'}</a>
        </p>
      </div>
      <div className="cookie-consent__actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose('rejected')}>{isTR ? 'Reddet' : 'Reject'}</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => choose('accepted')}>{isTR ? 'Kabul et' : 'Accept'}</button>
      </div>
    </aside>
  );
}
