import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const BookingAnnouncementBar: React.FC = () => {
    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 bg-[length:200%_auto] animate-gradient-x py-2 px-4 text-white text-center cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2 z-[60] relative"
            onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
        >
            <Calendar className="w-4 h-4 animate-bounce" />
            <span className="text-sm font-black tracking-wide uppercase">
                Sınırlı Kontenjan: Ücretsiz Strateji Görüşmesi İçin Randevunuzu Alın
            </span>
            <Calendar className="w-4 h-4 animate-bounce" />
        </motion.div>
    );
};
