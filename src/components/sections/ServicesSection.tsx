import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Bot, PenTool, Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Rocket,
      titleKey: "services.ads.title",
      descKey: "services.ads.desc",
      integrationKey: "services.ads.integration",
      accent: 'from-orange-500 to-amber-400',
      number: '01',
    },
    {
      icon: Bot,
      titleKey: "services.automation.title",
      descKey: "services.automation.desc",
      integrationKey: "services.automation.integration",
      accent: 'from-violet-500 to-purple-400',
      number: '02',
    },
    {
      icon: PenTool,
      titleKey: "services.web.title",
      descKey: "services.web.desc",
      integrationKey: "services.web.integration",
      accent: 'from-cyan-500 to-blue-400',
      number: '03',
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="card-glow bg-white border border-slate-200 p-8 rounded-3xl h-full flex flex-col group cursor-default"
            >
              {/* Service Number */}
              <span className={`text-6xl font-black bg-gradient-to-br ${service.accent} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500 leading-none mb-4`}>
                {service.number}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 group-hover:text-slate-800 transition-colors">
                {t(service.titleKey)}
                <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </h3>
              
              <p className="text-slate-600 leading-relaxed flex-grow">
                {t(service.descKey)}
              </p>

              {/* Integration Note */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
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