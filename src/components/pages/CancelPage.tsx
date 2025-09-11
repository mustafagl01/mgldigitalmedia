import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface CancelPageProps {
  onBack: () => void;
  onRetry: () => void;
}

export const CancelPage: React.FC<CancelPageProps> = ({ onBack, onRetry }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">Ödeme İptal Edildi</h1>
          <p className="text-xl text-slate-300 mb-8">
            Ödeme işlemi iptal edildi. Herhangi bir ücret tahsil edilmedi.
          </p>

          <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Yardıma mı İhtiyacınız Var?</h3>
            <p className="text-slate-300 text-sm">
              Ödeme sürecinde sorun yaşıyorsanız, doğrudan bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Ana Sayfaya Dön
            </Button>
            <Button
              onClick={onRetry}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Tekrar Dene
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <Button
              onClick={() => {
                const phoneNumber = '905318299701';
                const message = encodeURIComponent('Merhaba! Ödeme sürecinde sorun yaşıyorum. Yardım alabilir miyim?');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              variant="ghost"
              className="text-green-400 hover:text-green-300"
            >
              WhatsApp ile Destek Al
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};