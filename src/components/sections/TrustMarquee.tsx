import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const techs = [
  { name: 'n8n', color: '#ea580c' },
  { name: 'OpenAI', color: '#10b981' },
  { name: 'Google Gemini', color: '#3b82f6' },
  { name: 'Stripe', color: '#6366f1' },
  { name: 'Make.com', color: '#a855f7' },
  { name: 'WhatsApp', color: '#22c55e' },
  { name: 'Instagram', color: '#ec4899' },
  { name: 'Shopify', color: '#84cc16' },
  { name: 'Vapi AI', color: '#06b6d4' },
  { name: 'Retell AI', color: '#f59e0b' },
];

export const TrustMarquee: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-400">
          {language === 'tr' ? 'Uzmanlaştığımız Teknolojiler' : 'Technologies We Master'}
        </p>
      </div>
      <div className="relative flex overflow-x-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap gap-6 animate-marquee">
          {[...techs, ...techs, ...techs].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tech.color }} />
              <span className="text-sm font-semibold text-slate-700">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
