import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onContactClick: () => void;
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const { t, language } = useLanguage();
  const words = t('hero.title').split(' ');

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20 bg-black">
      {/* Dramatic Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-violet-600/15 via-blue-600/10 to-transparent blur-[140px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px] rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-purple-600/8 blur-[100px] rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300 tracking-wide">
              {language === 'tr' ? 'AI ile İşinizi Dönüştürün' : 'Transform Your Business with AI'}
            </span>
          </motion.div>

          {/* Staggered Word-by-Word Title */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-8 tracking-tighter leading-[0.95] md:leading-[0.92]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.3em] bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent animate-gradient-text"
                style={{ backgroundSize: '200% auto' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-slate-400 mb-14 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Button
              onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
              className="relative bg-white text-black hover:bg-slate-100 px-10 py-7 text-lg font-bold rounded-full shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)] transform hover:scale-[1.03] transition-all duration-500 flex items-center group w-full sm:w-auto justify-center overflow-hidden"
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <Sparkles className="relative w-6 h-6 mr-3 text-black group-hover:rotate-12 transition-transform" />
              <span className="relative">
                {language === 'tr' ? 'Hemen Başla (Ücretsiz)' : 'Get Started (Free)'}
              </span>
            </Button>

            <Button
              variant="outline"
              onClick={onContactClick}
              className="border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10 px-10 py-7 text-lg font-bold rounded-full backdrop-blur-md transition-all duration-500 flex items-center group w-full sm:w-auto justify-center"
            >
              <BrainCircuit className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              {t('hero.cta.opportunities')}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-slate-600">
              {language === 'tr' ? 'Keşfet' : 'Explore'}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border-2 border-slate-700 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-slate-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
