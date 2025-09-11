import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Target, Users, ArrowRight, LineChart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface StrategyCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, children, icon: Icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setRotate({ x: -y * 10, y: x * 10 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div style={{ transform: 'translateZ(40px)' }}>
        <div className="flex items-center gap-4 mb-4">
          <Icon className="w-8 h-8 text-purple-400" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-slate-300 prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const StrategySection: React.FC = () => (
  const { t } = useLanguage();

  return (
  <section id="strategy" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, once: true }} 
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('strategy.title')}</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('strategy.subtitle')}</p>
      </motion.div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-purple-300">{t('strategy.funnel')}</h3>
          <StrategyCard title={t('strategy.awareness.title')} icon={Search}>
            <p><strong>{t('strategy.awareness.psychology')}</strong> {t('strategy.awareness.psychology.desc')}</p>
            <p><strong>{t('strategy.awareness.approach')}</strong> {t('strategy.awareness.approach.desc')}</p>
          </StrategyCard>
          <StrategyCard title={t('strategy.consideration.title')} icon={Lightbulb}>
            <p><strong>{t('strategy.consideration.psychology')}</strong> {t('strategy.consideration.psychology.desc')}</p>
            <p><strong>{t('strategy.consideration.approach')}</strong> {t('strategy.consideration.approach.desc')}</p>
          </StrategyCard>
          <StrategyCard title={t('strategy.decision.title')} icon={Target}>
            <p><strong>{t('strategy.decision.psychology')}</strong> {t('strategy.decision.psychology.desc')}</p>
            <p><strong>{t('strategy.decision.approach')}</strong> {t('strategy.decision.approach.desc')}</p>
          </StrategyCard>
        </div>
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-cyan-300">{t('strategy.kpi')}</h3>
          <StrategyCard title={t('strategy.cpm.title')} icon={Users}>
            <p>{t('strategy.cpm.desc')}</p>
          </StrategyCard>
          <StrategyCard title={t('strategy.ctr.title')} icon={ArrowRight}>
            <p>{t('strategy.ctr.desc')}</p>
          </StrategyCard>
          <StrategyCard title={t('strategy.cpl.title')} icon={LineChart}>
            <p>{t('strategy.cpl.desc')}</p>
          </StrategyCard>
        </div>
      </div>
    </div>
  </section>
  );
};