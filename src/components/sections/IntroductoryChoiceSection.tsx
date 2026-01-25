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
    <section id="choice" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, once: true }}
          className="max-w-5xl w-full text-center mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-gradient tracking-tight leading-[1.1]">
            {t('choice.title')}
          </h2>
          <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
            {t('choice.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Choice 1: Automation */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card glass-card-hover p-8 rounded-3xl cursor-pointer h-full flex flex-col group"
              onClick={() => handleChoice('demos')}
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">{t('choice.automation.title')}</h3>
              <p className="text-slate-400 flex-grow leading-relaxed">
                {t('choice.automation.desc')}
              </p>
              <div className="mt-8 text-purple-400 font-bold flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                {t('choice.automation.cta')} <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
            </motion.div>

            {/* Choice 2: Advertising */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card glass-card-hover p-8 rounded-3xl cursor-pointer h-full flex flex-col group"
              onClick={() => handleChoice('services')}
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">{t('choice.customers.title')}</h3>
              <p className="text-slate-400 flex-grow leading-relaxed">
                {t('choice.customers.desc')}
              </p>
              <div className="mt-8 text-purple-400 font-bold flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                {t('choice.customers.cta')} <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
            </motion.div>

            {/* Choice 3: Full System */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white p-8 rounded-3xl border border-white/20 cursor-pointer h-full flex flex-col group shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] transform transition-all duration-500"
              onClick={() => handleChoice('hero')}
            >
              <h3 className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform duration-500">{t('choice.system.title')}</h3>
              <p className="text-purple-50 flex-grow leading-relaxed font-medium">
                {t('choice.system.desc')}
              </p>
              <div className="mt-8 font-black flex items-center justify-center gap-2 group-hover:gap-4 transition-all bg-white/20 py-3 rounded-2xl backdrop-blur-sm">
                {t('choice.system.cta')} <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};