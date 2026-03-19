import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import ScrollStop from '../ui/ScrollStop';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const { t, language } = useLanguage();

  const heroTitleContent = (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tight leading-[1.05]">
        {t('hero.title')}
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
        <Button
          onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
          className="pointer-events-auto bg-white text-black hover:bg-slate-200 px-8 py-6 text-base font-bold rounded-full shadow-[0_0_30px_-10px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-all duration-300 flex items-center group w-full sm:w-auto justify-center"
        >
          <Sparkles className="w-5 h-5 mr-3 text-black group-hover:rotate-12 transition-transform" />
          {language === 'tr' ? 'Hemen Başla (Ücretsiz)' : 'Get Started (Free)'}
        </Button>
        <Button
          variant="outline"
          onClick={onContactClick}
          className="pointer-events-auto border border-white/20 bg-black/40 text-white hover:border-white/50 hover:bg-white/10 px-8 py-6 text-base font-bold rounded-full backdrop-blur-md transition-all duration-300 flex items-center group w-full sm:w-auto justify-center"
        >
          <BrainCircuit className="w-5 h-5 mr-3 group-hover:animate-pulse" />
          {t('hero.cta.opportunities')}
        </Button>
      </div>
    </div>
  );

  const features = [
    {
      title: t('benefits.time.title'),
      description: t('benefits.time.desc'),
      startProgress: 0.15,
      endProgress: 0.40,
    },
    {
      title: t('benefits.sales.title'),
      description: t('benefits.sales.desc'),
      startProgress: 0.45,
      endProgress: 0.70,
    },
    {
      title: t('benefits.error.title'),
      description: t('benefits.error.desc'),
      startProgress: 0.75,
      endProgress: 0.95,
    }
  ];

  return (
    <div id="hero">
      <ScrollStop
        frameCount={121}
        frameFolder="/chaos-scroll"
        title={heroTitleContent}
        subtitle={t('hero.subtitle')}
        features={features}
      />
    </div>
  );
};