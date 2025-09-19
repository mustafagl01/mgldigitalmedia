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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="text-blue-600">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{content}</p>
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('strategy.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('strategy.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {strategies.map((strategy, index) => (
            <AccordionItem
              key={index}
              title={strategy.title}
              content={strategy.content}
              icon={strategy.icon}
              isOpen={openItem === index}
              onToggle={() => setOpenItem(openItem === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;