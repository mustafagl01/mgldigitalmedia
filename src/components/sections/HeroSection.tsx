import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden pt-16 pb-20 bg-[#0A0E27]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#11183f] to-[#0A0E27]" />
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-cyan-400/25 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-28 -right-10 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-pulse [animation-delay:1200ms]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.2),transparent_45%)]" />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-8xl font-black mb-8 text-gradient tracking-tight leading-[1.1] md:leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-10 py-7 text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_50px_-5px_rgba(147,51,234,0.6)] transform hover:scale-105 transition-all duration-500 flex items-center group"
            >
              <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              {useLanguage().language === 'tr' ? 'Hemen Başla (Ücretsiz Strateji)' : 'Get Started (Free Strategy Session)'}
            </Button>
            <Button
              variant="outline"
              onClick={onContactClick}
              className="border-2 border-slate-700 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 px-10 py-7 text-lg font-bold rounded-full backdrop-blur-md transition-all duration-500 flex items-center group"
            >
              <BrainCircuit className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              {t('hero.cta.opportunities')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
