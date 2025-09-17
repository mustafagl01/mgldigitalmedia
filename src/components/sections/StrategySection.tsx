import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const StrategySection: React.FC = () => {
  const { t } = useLanguage();

  const strategies = [
    {
      phase: 'TOF',
      title: t('strategy.awareness.title'),
      icon: Users,
      psychology: t('strategy.awareness.psychology.desc'),
      approach: t('strategy.awareness.approach.desc')
    },
    {
      phase: 'MOF', 
      title: t('strategy.consideration.title'),
      icon: Target,
      psychology: t('strategy.consideration.psychology.desc'),
      approach: t('strategy.consideration.approach.desc')
    },
    {
      phase: 'BOF',
      title: t('strategy.decision.title'), 
      icon: TrendingUp,
      psychology: t('strategy.decision.psychology.desc'),
      approach: t('strategy.decision.approach.desc')
    }
  ];

  const kpis = [
    {
      title: t('strategy.cpm.title'),
      description: t('strategy.cpm.desc'),
      icon: BarChart3
    },
    {
      title: t('strategy.ctr.title'), 
      description: t('strategy.ctr.desc'),
      icon: Target
    },
    {
      title: t('strategy.cpl.title'),
      description: t('strategy.cpl.desc'),
      icon: TrendingUp
    }
  ];

  return (
    <section id="strategy" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('strategy.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('strategy.subtitle')}
          </p>
        </motion.div>

        {/* Funnel Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            {t('strategy.funnel')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <motion.div
                  key={strategy.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-slate-700/50 p-8 rounded-2xl border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-6 mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium mb-4">
                      {strategy.phase}
                    </span>
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {strategy.title}
                    </h4>
                    <div className="text-left space-y-4">
                      <div>
                        <span className="font-semibold text-purple-300">
                          {t('strategy.awareness.psychology')}
                        </span>
                        <p className="text-gray-300 mt-1">
                          {strategy.psychology}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-cyan-300">
                          {t('strategy.awareness.approach')}
                        </span>
                        <p className="text-gray-300 mt-1">
                          {strategy.approach}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* KPI Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            {t('strategy.kpi')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kpis.map((kpi, index) => {
              const IconComponent = kpi.icon;
              return (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-8 rounded-2xl border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full mb-6 mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">
                      {kpi.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {kpi.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};