import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const BookingAnnouncementBar: React.FC = () => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 bg-[length:200%_auto] animate-gradient-x py-2 px-3 sm:px-4 text-white text-center cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2 z-[60] relative"
            onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
        >
            <Calendar className="w-4 h-4 animate-bounce hidden sm:block" />
            <span className="text-[11px] sm:text-sm font-black tracking-wide leading-tight sm:leading-normal">
                {language === 'tr'
                    ? 'Sınırlı Kontenjan: Ücretsiz Strateji Görüşmesi İçin Randevunuzu Alın'
                    : 'Limited Slots: Book Your Free Strategy Session'}
            </span>
            <Calendar className="w-4 h-4 animate-bounce" />
        </motion.div>
    );
};
