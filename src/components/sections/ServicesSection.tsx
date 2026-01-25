import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Bot, PenTool, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Rocket,
      titleKey: "services.ads.title",
      descKey: "services.ads.desc",
      integrationKey: "services.ads.integration"
    },
    {
      icon: Bot,
      titleKey: "services.automation.title",
      descKey: "services.automation.desc",
      integrationKey: "services.automation.integration"
    },
    {
      icon: PenTool,
      titleKey: "services.web.title",
      descKey: "services.web.desc",
      integrationKey: "services.web.integration"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('services.title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('services.subtitle')}</p>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card glass-card-hover p-8 rounded-3xl h-full flex flex-col group"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <service.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                {t(service.titleKey)}
              </h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                {t(service.descKey)}
              </p>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-sm font-medium text-cyan-400 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 mt-1 flex-shrink-0 animate-pulse" />
                  <span>{t(service.integrationKey)}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};