import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const IntroductoryChoiceSection: React.FC = () => {
  const { t } = useLanguage();

  const handleChoice = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="choice" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, once: true }}
          className="max-w-4xl w-full text-center mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent leading-tight md:leading-tight">
            {t('choice.title')}
          </h2>
          <p className="text-lg text-slate-400 mb-12">
            {t('choice.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Choice 1: Automation */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }} 
              className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 cursor-pointer h-full flex flex-col" 
              onClick={() => handleChoice('demos')}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{t('choice.automation.title')}</h3>
              <p className="text-slate-400 flex-grow">
                {t('choice.automation.desc')}
              </p>
              <span className="mt-6 text-purple-400 font-semibold flex items-center justify-center">
                {t('choice.automation.cta')} <ArrowRight className="ml-2 w-5 h-5"/>
              </span>
            </motion.div>
            
            {/* Choice 2: Advertising */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }} 
              className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 cursor-pointer h-full flex flex-col" 
              onClick={() => handleChoice('services')}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{t('choice.customers.title')}</h3>
              <p className="text-slate-400 flex-grow">
                {t('choice.customers.desc')}
              </p>
              <span className="mt-6 text-purple-400 font-semibold flex items-center justify-center">
                {t('choice.customers.cta')} <ArrowRight className="ml-2 w-5 h-5"/>
              </span>
            </motion.div>
            
            {/* Choice 3: Full System */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }} 
              className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white p-8 rounded-2xl border border-purple-500 cursor-pointer h-full flex flex-col" 
              onClick={() => handleChoice('hero')}
            >
              <h3 className="text-2xl font-bold mb-3">{t('choice.system.title')}</h3>
              <p className="text-purple-200 flex-grow">
                {t('choice.system.desc')}
              </p>
              <span className="mt-6 font-semibold flex items-center justify-center">
                {t('choice.system.cta')} <ArrowRight className="ml-2 w-5 h-5"/>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};