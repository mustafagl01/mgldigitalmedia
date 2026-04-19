import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from '../../hooks/useToast';

interface EmailDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EmailDemoModal: React.FC<EmailDemoModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
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
    if (isLoading) return;

    const nextErrors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) {
      nextErrors.name = isEN ? 'Please enter your name.' : 'Adınızı girin.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = isEN ? 'Please enter your email.' : 'E-posta adresinizi girin.';
    } else if (!EMAIL_RE.test(formData.email.trim())) {
      nextErrors.email = isEN
        ? 'Enter a valid email (example@email.com).'
        : 'Geçerli bir e-posta girin (ornek@email.com).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    setIsLoading(true);
    const webhookUrl = 'https://nt3ys1ml.rpcd.host/webhook/b258d591-af79-4580-9e8c-3c661256359b';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
      toast({
        title: isEN ? 'Request sent.' : 'İstek gönderildi.',
        description: isEN
          ? 'Your details were passed to the workflow.'
          : 'Bilgileriniz iş akışına iletildi.',
      });
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
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
    setErrors({});
    onClose();
  };

  const eyebrow = isEN ? 'EMAIL AGENT / DEMO' : 'E-POSTA ASİSTANI / DEMO';
  const title = isEN ? 'See the email automation in action' : 'E-posta otomasyonunu canlı görün';
  const lede = isEN
    ? 'Drop your name and email — our agent will start the follow-up sequence in your inbox within seconds.'
    : 'Adınızı ve e-postanızı bırakın — asistanımız saniyeler içinde gelen kutunuza bir takip akışı başlatsın.';
  const submitLabel = isEN ? 'Start the automation' : 'Otomasyonu başlat';

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
            aria-labelledby="email-demo-title"
            style={{
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              width: '100%',
              maxWidth: 520,
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
                <Mail size={16} />
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
              id="email-demo-title"
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

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.6 }}>{lede}</p>

                <Field
                  id="name"
                  label={isEN ? 'Your name' : 'Adınız'}
                  placeholder={isEN ? 'e.g. Ahmet Yılmaz' : 'Örn: Ahmet Yılmaz'}
                  type="text"
                  value={formData.name}
                  onChange={(v) => {
                    setFormData((prev) => ({ ...prev, name: v }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={errors.name}
                  disabled={isLoading}
                />

                <Field
                  id="email"
                  label={isEN ? 'Email address' : 'E-posta adresiniz'}
                  placeholder="ornek@email.com"
                  type="email"
                  value={formData.email}
                  onChange={(v) => {
                    setFormData((prev) => ({ ...prev, email: v }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  disabled={isLoading}
                />

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
                    transition: 'opacity 120ms',
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
                      <Send size={16} />
                      {submitLabel}
                    </>
                  )}
                </button>

                <p
                  style={{
                    marginTop: 4,
                    marginBottom: 0,
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    color: 'var(--fg-3)',
                    lineHeight: 1.6,
                  }}
                >
                  {isEN
                    ? 'We only use your address for this demo · Unsubscribe in one click.'
                    : 'Adresiniz yalnızca bu demo için kullanılır · Tek tık ile çıkabilirsiniz.'}
                </p>
              </form>
            ) : (
              <div style={{ marginTop: 20 }}>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
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
                </motion.div>
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
                  {isEN ? `Great, ${formData.name || 'friend'}.` : `Harika, ${formData.name || ''}.`}
                </h4>
                <p style={{ marginTop: 12, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.6 }}>
                  {isEN
                    ? 'Your automation is live. The first email is on its way to your inbox — reply to it and you can brainstorm with our agent.'
                    : 'Otomasyonunuz başladı. İlk e-posta gelen kutunuza düşüyor — cevapladığınızda AI asistanımızla fikirler geliştirebilirsiniz.'}
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
              </div>
            )}

            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

function Field({ id, label, placeholder, type, value, error, disabled, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          height: 44,
          padding: '0 14px',
          background: 'var(--paper-2)',
          color: 'var(--ink)',
          border: `1px solid ${error ? 'var(--ember)' : 'var(--border)'}`,
          borderRadius: 'var(--r-md)',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          outline: 'none',
        }}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            marginTop: 6,
            marginBottom: 0,
            fontSize: 13,
            color: 'var(--ember)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.02em',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
