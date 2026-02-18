import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Clock, titleKey: 'benefits.time.title', descKey: 'benefits.time.desc' },
    { icon: TrendingUp, titleKey: 'benefits.sales.title', descKey: 'benefits.sales.desc' },
    { icon: Shield, titleKey: 'benefits.error.title', descKey: 'benefits.error.desc' },
    { icon: Heart, titleKey: 'benefits.satisfaction.title', descKey: 'benefits.satisfaction.desc' }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-slate-200 shadow-sm hover:shadow-lg p-8 rounded-3xl h-full flex flex-col group transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <benefit.icon className="w-7 h-7 text-purple-400 group-hover:text-cyan-400 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t(benefit.titleKey)}</h3>
              <p className="text-slate-700 leading-relaxed">{t(benefit.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
