import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, User, ArrowRightLeft, BarChart3, Users, ArrowRight 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

interface AutomationExamplesSectionProps {
  onDemoClick: (demoId: string) => void;
}

export const AutomationExamplesSection: React.FC<AutomationExamplesSectionProps> = ({ onDemoClick }) => {
  const { t } = useLanguage();

  const automationExamples = [
    { 
      id: 'whatsapp', 
      titleKey: 'demos.whatsapp.title',
      descKey: 'demos.whatsapp.desc',
      icon: User, 
      color: 'from-green-500 to-emerald-600', 
      demo: true, 
      ctaLabelKey: 'demos.contact'
    },
    { 
      id: 'email', 
      titleKey: 'demos.email.title',
      descKey: 'demos.email.desc',
      icon: Mail, 
      color: 'from-blue-500 to-cyan-600', 
      demo: true, 
      ctaLabelKey: 'demos.live'
    },
    { 
      id: 'phone', 
      titleKey: 'demos.phone.title',
      descKey: 'demos.phone.desc',
      icon: Phone, 
      color: 'from-rose-500 to-red-600', 
      demo: true, 
      ctaLabelKey: 'demos.live'
    },
    { 
      id: 'data-transfer', 
      titleKey: 'demos.data.title',
      descKey: 'demos.data.desc',
      icon: ArrowRightLeft, 
      color: 'from-yellow-500 to-amber-600', 
      demo: false 
    },
    { 
      id: 'reports', 
      titleKey: 'demos.reports.title',
      descKey: 'demos.reports.desc',
      icon: BarChart3, 
      color: 'from-indigo-500 to-purple-600', 
      demo: false 
    },
    { 
      id: 'onboarding', 
      titleKey: 'demos.onboarding.title',
      descKey: 'demos.onboarding.desc',
      icon: Users, 
      color: 'from-purple-500 to-violet-600', 
      demo: false 
    }
  ];

  const handleAutomationClick = (automation: any) => {
    if (automation.id === 'whatsapp') {
      const phoneNumber = '905318299701';
      const message = encodeURIComponent('Merhaba Mustafa Bey, web siteniz üzerinden ulaşıyorum. Bir strateji görüşmesi planlamak istiyorum.');
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    } else if (automation.demo) {
      onDemoClick(automation.id);
    }
  };

  return (
    <section id="demos" className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('demos.title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('demos.subtitle')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automationExamples.map((automation, index) => (
            <motion.div 
              key={automation.id} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.1, once: true }} 
              onClick={() => automation.demo && handleAutomationClick(automation)} 
              className={cn(
                "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 flex flex-col", 
                automation.demo ? "cursor-pointer hover:border-purple-400/50 hover:transform hover:scale-105 group" : "cursor-default"
              )}
            >
              <div className={cn(
                `bg-gradient-to-r ${automation.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300`, 
                automation.demo && "group-hover:scale-110"
              )}>
                <automation.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={cn(
                "text-xl font-semibold text-white mb-3 transition-colors", 
                automation.demo && "group-hover:text-purple-300"
              )}>
                {t(automation.titleKey)}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{t(automation.descKey)}</p>
              <div className="flex items-center justify-between mt-auto pt-4 min-h-[36px]">
                {automation.ctaLabelKey ? (
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium", 
                    automation.ctaLabelKey === 'demos.live' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'
                  )}>
                    {t(automation.ctaLabelKey)}
                  </span>
                ) : <span />}
                {automation.demo && <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};