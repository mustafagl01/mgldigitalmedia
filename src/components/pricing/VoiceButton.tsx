import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface VoiceButtonProps {
  sectorId: string;
  monthlyPrice: number;
  oldCost: number;
  savings: number;
}

export default function VoiceButton({ sectorId, monthlyPrice, oldCost, savings }: VoiceButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    // TODO: Integrate Retell AI here
    alert(`Voice AI Demo: "${monthlyPrice} TL ödediğinde ${oldCost} TL'den kurtulursun. ${savings} TL cebinde kalır!"`);
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-full shadow-2xl z-50 group"
      style={{
        boxShadow: isActive ? '0 0 50px rgba(168, 85, 247, 0.6)' : '0 10px 40px rgba(0,0,0,0.3)'
      }}
    >
      {/* Pulse animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 rounded-full bg-purple-600"
      />

      {/* Icon */}
      <div className="relative z-10">
        {isActive ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </motion.div>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        )}
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none"
      >
        🎤 Beni İkna Et
      </motion.div>
    </motion.button>
  );
}