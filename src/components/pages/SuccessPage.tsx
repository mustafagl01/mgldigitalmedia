import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuccessPageProps {
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">{t('success.title')}</h1>
          <p className="text-xl text-slate-300 mb-8">
            {t('success.subtitle')}
          </p>

          <div className="bg-purple-900/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">{t('success.next.title')}</h3>
            <div className="text-slate-300 space-y-2 text-left">
              <p>{t('success.next.contact')}</p>
              <p>{t('success.next.details')}</p>
              <p>{t('success.next.setup')}</p>
              <p>{t('success.next.training')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('success.back')}
            </Button>
            <Button
              onClick={() => {
                const phoneNumber = '905318299701';
                const message = encodeURIComponent('Merhaba! Otomasyon ödememim tamamlandı. Proje detaylarını konuşmak istiyorum.');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {t('success.whatsapp')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
