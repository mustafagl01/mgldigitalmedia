import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const FloatingBookingButton: React.FC = () => {
    const { language } = useLanguage();

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
            className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-5 rounded-full shadow-[0_10px_30px_rgba(147,51,234,0.5)] border border-white/20 flex items-center gap-3 overflow-hidden group"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Calendar className="w-6 h-6 relative z-10" />
            <span className="font-black text-sm relative z-10 hidden md:block">
                {language === 'tr' ? 'Randevu Al' : 'Book a Call'}
            </span>
        </motion.button>
    );
};
