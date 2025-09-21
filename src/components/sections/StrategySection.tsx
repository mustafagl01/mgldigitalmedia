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
    <div className="border border-white/20 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left transition-all duration-300 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-4">
          <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 bg-blue-500/20 p-3 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-300 group-hover:text-white transition-all duration-300 ${
            isOpen ? 'transform rotate-180 text-blue-400' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 border-t border-white/20 bg-black/30">
              <p className="text-gray-200 leading-relaxed text-base">
                {content}
              </p>
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
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            {t('strategy.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('strategy.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
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