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
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.1, once: true }} 
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t(benefit.titleKey)}</h3>
              <p className="text-gray-300">{t(benefit.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};