import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AccordionItemProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, icon, isOpen, onToggle }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden mb-4">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 text-left flex items-center justify-between group transition-all duration-300"
      >
        <div className="flex items-center space-x-6">
          <div className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300 bg-purple-500/10 p-4 rounded-xl group-hover:bg-purple-500/20">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-slate-500 group-hover:text-white transition-all duration-500 ${isOpen ? 'transform rotate-180 text-purple-400' : ''
            }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <div className="px-8 pb-8 pt-2">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {content}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StrategySection: React.FC = () => {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<number | null>(0);

  const strategies = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('strategy.automation.title'),
      content: t('strategy.automation.content')
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('strategy.optimization.title'),
      content: t('strategy.optimization.content')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('strategy.engagement.title'),
      content: t('strategy.engagement.content')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('strategy.innovation.title'),
      content: t('strategy.innovation.content')
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 text-gradient tracking-tight">
            {t('strategy.title')}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed italic border-l-4 border-purple-500/30 pl-8 ml-auto mr-auto lg:mr-0">
            {t('strategy.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                title={strategy.title}
                content={strategy.content}
                icon={strategy.icon}
                isOpen={openItem === index}
                onToggle={() => setOpenItem(openItem === index ? null : index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StrategySection;