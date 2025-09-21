import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface CtaSectionProps {
  onContactClick: () => void;
  onProductsClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onContactClick, onProductsClick }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, once: true }} 
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onContactClick} 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <BrainCircuit className="w-6 h-6 mr-2" /> 
              {t('cta.analysis')}
            </Button>
            <Button 
              onClick={onProductsClick} 
              variant="outline"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg rounded-full"
            >
              {t('cta.products')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};