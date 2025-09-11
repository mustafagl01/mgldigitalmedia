import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Bot, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../../hooks/useToast';

interface PhoneDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneDemoModal: React.FC<PhoneDemoModalProps> = ({ isOpen, onClose }) => {
  const [countryCode, setCountryCode] = useState('+90');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || isLoading) {
      toast({ title: "Geçersiz Numara", description: "Lütfen geçerli bir telefon numarası girin.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s/g, '')}`;
    const webhookUrl = 'https://mustafagl01.app.n8n.cloud/webhook/a1efbd5d-e366-4aeb-affb-8c75dbcfe5f8';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'call_request', phoneNumber: fullPhoneNumber })
      });
      toast({ title: "Harika!", description: "AI asistanımız belirttiğiniz numarayı arayacak." });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Webhook error:', error);
      toast({ title: "Hata!", description: "İş akışına bağlanırken bir sorun oluştu.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhoneNumber('');
    setCountryCode('+90');
    setIsSubmitted(false);
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
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-gray-700 shadow-2xl text-center"
          >
            <div className="flex items-center justify-between mb-6 relative">
              <h3 className="text-2xl font-bold text-white flex items-center mx-auto">
                <Phone className="w-6 h-6 mr-3 text-rose-400" /> 
                AI Sesli Asistan Demo
              </h3>
              <Button variant="ghost" onClick={handleClose} className="text-gray-400 hover:text-white absolute -top-4 -right-4">
                ✕
              </Button>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-rose-500/20 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div key="form" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                  <p className="text-gray-300 mb-4">
                    AI sesli asistanımızın yeteneklerini test etmek için telefon numaranızı girin, sizi arayalım.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                      <select 
                        value={countryCode} 
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white ring-offset-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                      >
                        <option value="+90">TR +90</option>
                        <option value="+44">UK +44</option>
                      </select>
                      <Input 
                        id="phoneNumber" 
                        type="tel" 
                        placeholder="555 123 4567" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 py-3 text-lg" disabled={isLoading}>
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Phone className="w-5 h-5 mr-2" />
                      )}
                      {isLoading ? '' : 'AI Beni Arasın'}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-xl text-white mb-2">Çağrı İsteğiniz Alındı!</p>
                  <p className="text-gray-300">
                    AI asistanımız <strong>+44 (7414) 605612</strong> numaralı hattan sizi arayacak. 
                    Lütfen telefonunuzu kontrol edin.
                  </p>
                  <Button onClick={handleClose} className="w-full mt-6">Kapat</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};