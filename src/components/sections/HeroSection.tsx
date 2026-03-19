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
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16 bg-black">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white tracking-tighter leading-[0.95] md:leading-[0.95]">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
                className="bg-white text-black hover:bg-slate-200 px-10 py-7 text-lg font-bold rounded-full shadow-[0_0_50px_-15px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-500 flex items-center group w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-6 h-6 mr-3 text-black group-hover:rotate-12 transition-transform" />
                {useLanguage().language === 'tr' ? 'Hemen Başla (Ücretsiz)' : 'Get Started (Free)'}
              </Button>
              
              <Button
                variant="outline"
                onClick={onContactClick}
                className="border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800/60 px-10 py-7 text-lg font-bold rounded-full backdrop-blur-md transition-all duration-500 flex items-center group w-full sm:w-auto justify-center"
              >
                <BrainCircuit className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                {t('hero.cta.opportunities')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
