import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from '../../hooks/useToast';

interface PhoneDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneDemoModal: React.FC<PhoneDemoModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const [countryCode, setCountryCode] = useState('+90');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    const focusables = getFocusable();
    focusables[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const current = getFocusable();
      if (current.length === 0) return;
      const first = current[0];
      const last = current[current.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, '');
    if (isLoading) return;
    if (!digits) {
      setInlineError(isEN ? 'Please enter your phone number.' : 'Telefon numaranızı girin.');
      return;
    }
    if (digits.length < 9) {
      setInlineError(
        isEN
          ? 'Enter a valid phone number (at least 9 digits).'
          : 'Geçerli bir telefon numarası girin (en az 9 rakam).',
      );
      return;
    }
    setInlineError(null);
    setIsLoading(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s/g, '')}`;
    const webhookUrl = 'https://nt3ys1ml.rpcd.host/webhook/a1efbd5d-e366-4aeb-affb-8c75dbcfe5f8';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'call_request', phoneNumber: fullPhoneNumber }),
      });
      toast({
        title: isEN ? 'Done.' : 'Harika!',
        description: isEN
          ? 'Our AI assistant will call the number you entered.'
          : 'AI asistanımız belirttiğiniz numarayı arayacak.',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: isEN ? 'Error' : 'Hata!',
        description: isEN ? 'Failed to reach the workflow.' : 'İş akışına bağlanırken bir sorun oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhoneNumber('');
    setCountryCode('+90');
    setIsSubmitted(false);
    setInlineError(null);
    onClose();
  };

  const eyebrow = isEN ? 'VOICE AGENT / DEMO' : 'SESLİ ASİSTAN / DEMO';
  const title = isEN ? 'Let our voice agent call you' : 'AI sesli asistanı sizi arasın';
  const lede = isEN
    ? 'Enter your number and our AI agent will call within seconds so you can hear it speak, qualify a lead, and book a slot.'
    : 'Numaranızı girin, AI asistanımız saniyeler içinde sizi arayarak nasıl konuştuğunu, lead nitelediğini ve randevu aldığını gösterir.';
  const submitLabel = isEN ? 'Call me' : 'Beni arasın';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 17, 20, 0.72)', backdropFilter: 'blur(6px)' }}
          onClick={handleClose}
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-demo-title"
            style={{
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              width: '100%',
              maxWidth: 480,
              padding: 32,
              boxShadow: '0 30px 80px -20px rgba(15, 17, 20, 0.45)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={isEN ? 'Close' : 'Kapat'}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                color: 'var(--fg-2)',
                cursor: 'pointer',
                transition: 'color 120ms, border-color 120ms',
              }}
            >
              <X size={14} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--coal)',
                  color: 'var(--ember)',
                }}
              >
                <Phone size={16} />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-3)',
                }}
              >
                {eyebrow}
              </span>
            </div>

            <h3
              id="phone-demo-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 1rem + 0.9vw, 1.875rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              {title}
            </h3>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.6 }}>{lede}</p>

                  <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={isLoading}
                        style={{
                          height: 44,
                          padding: '0 12px',
                          background: 'var(--paper-2)',
                          color: 'var(--ink)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--r-md)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 13,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="+90">TR +90</option>
                        <option value="+44">UK +44</option>
                      </select>
                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="555 123 4567"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (inlineError) setInlineError(null);
                        }}
                        disabled={isLoading}
                        aria-invalid={Boolean(inlineError)}
                        aria-describedby={inlineError ? 'phone-demo-error' : undefined}
                        style={{
                          flex: 1,
                          height: 44,
                          padding: '0 14px',
                          background: 'var(--paper-2)',
                          color: 'var(--ink)',
                          border: `1px solid ${inlineError ? 'var(--ember)' : 'var(--border)'}`,
                          borderRadius: 'var(--r-md)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 15,
                          outline: 'none',
                        }}
                      />
                    </div>

                    {inlineError && (
                      <p
                        id="phone-demo-error"
                        role="alert"
                        style={{
                          margin: 0,
                          fontSize: 13,
                          color: 'var(--ember)',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {inlineError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        marginTop: 4,
                        height: 48,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        background: 'var(--ember)',
                        color: 'var(--paper)',
                        border: 0,
                        borderRadius: 'var(--r-md)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: 15,
                        letterSpacing: '0.01em',
                        cursor: isLoading ? 'progress' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'opacity 120ms, transform 80ms',
                      }}
                    >
                      {isLoading ? (
                        <span
                          aria-hidden
                          style={{
                            width: 16,
                            height: 16,
                            border: '2px solid var(--paper)',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                      ) : (
                        <>
                          <Phone size={16} />
                          {submitLabel}
                        </>
                      )}
                    </button>
                  </form>

                  <p
                    style={{
                      marginTop: 16,
                      marginBottom: 0,
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.04em',
                      color: 'var(--fg-3)',
                      lineHeight: 1.6,
                    }}
                  >
                    {isEN
                      ? 'Call comes from +44 7414 605612 · Your number is used for this demo only.'
                      : 'Arama +44 7414 605612 numarasından gelir · Numaranız yalnızca bu demo için kullanılır.'}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ marginTop: 20 }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'var(--coal)',
                      color: 'var(--ember)',
                      marginBottom: 16,
                    }}
                  >
                    <CheckCircle size={24} />
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 22,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {isEN ? 'Call request received.' : 'Çağrı isteğiniz alındı.'}
                  </h4>
                  <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.6 }}>
                    {isEN ? (
                      <>
                        Our AI agent will ring you shortly from{' '}
                        <strong style={{ color: 'var(--ink)' }}>+44 7414 605612</strong>. Keep your phone close.
                      </>
                    ) : (
                      <>
                        AI asistanımız kısa süre içinde <strong style={{ color: 'var(--ink)' }}>+44 7414 605612</strong>{' '}
                        numarasından sizi arayacak. Telefonunuzu yakınınızda tutun.
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    style={{
                      marginTop: 20,
                      height: 44,
                      width: '100%',
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      border: 0,
                      borderRadius: 'var(--r-md)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: '0.01em',
                      cursor: 'pointer',
                    }}
                  >
                    {isEN ? 'Close' : 'Kapat'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
