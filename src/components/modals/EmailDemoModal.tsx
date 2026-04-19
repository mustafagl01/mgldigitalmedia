import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { toast } from '../../hooks/useToast';

interface EmailDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EmailDemoModal: React.FC<EmailDemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const nextErrors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) nextErrors.name = 'Adınızı girin.';
    if (!formData.email.trim()) nextErrors.email = 'E-posta adresinizi girin.';
    else if (!EMAIL_RE.test(formData.email.trim())) nextErrors.email = 'Geçerli bir e-posta girin (ornek@email.com).';

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
            body: JSON.stringify(formData)
        });
        setIsSubmitted(true);
        toast({ title: "İstek Gönderildi! 🚀", description: "Bilgileriniz iş akışına başarıyla iletildi." });
    } catch(error) {
        console.error('Webhook error:', error);
        toast({ title: "Hata!", description: "İş akışına bağlanırken bir sorun oluştu.", variant: "destructive" });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-demo-title"
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-lg w-full border border-gray-700 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="email-demo-title" className="text-2xl font-bold text-white flex items-center">
                <Mail className="w-6 h-6 mr-2 text-blue-400" />
                Otomatik E-posta Demo
              </h3>
              <Button variant="ghost" onClick={handleClose} aria-label="Kapat">✕</Button>
            </div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-gray-300">Bu formu doldurun ve e-posta otomasyonunun nasıl başladığını görün.</p>
                <div>
                  <Label htmlFor="name" className="text-gray-400">Adınız</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className="mt-1"
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'email-demo-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="email-demo-name-error" role="alert" className="mt-1 text-sm text-rose-300">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-400">E-posta Adresiniz</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className="mt-1"
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-demo-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-demo-email-error" role="alert" className="mt-1 text-sm text-rose-300">
                      {errors.email}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? '' : 'Otomasyonu Başlat'}
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <motion.div 
                  initial={{scale: 0.5, opacity: 0}} 
                  animate={{scale: 1, opacity: 1}} 
                  transition={{type: 'spring', delay: 0.2}}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Harika, {formData.name}!</h3>
                <p className="text-gray-300 mb-6 max-w-sm mx-auto">
                  Otomasyonunuz başarıyla başlatıldı. İlk e-postamız gelen kutunuza ulaştı bile. 
                  Cevap verdiğinizde AI asistanımızla fikirler geliştirebilirsiniz.
                </p>
                <Button onClick={handleClose} className="w-full bg-gray-600 hover:bg-gray-700 mt-4">
                  Harika!
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};