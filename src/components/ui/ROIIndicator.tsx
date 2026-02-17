import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ROIIndicatorProps {
  onClick: () => void;
}

export function ROIIndicator({ onClick }: ROIIndicatorProps) {
  const [currentValue, setCurrentValue] = useState(42500);
  const [isHovered, setIsHovered] = useState(false);

  // Animate the number going up
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const increment = Math.floor(Math.random() * 500) + 100;
        const newValue = prev + increment;
        // Reset if too high
        return newValue > 150000 ? 42500 : newValue;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative px-4 py-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 border border-green-500/50 shadow-lg shadow-green-500/20 overflow-hidden group"
    >
      {/* Animated glow effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-sm"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {!isHovered ? (
          <>
            {/* Live ticker display */}
            <motion.div
              key={currentValue}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-gray-400 text-xs font-medium whitespace-nowrap">
                Ortalama Müşteri Kazanç:
              </span>
              <motion.span 
                className="text-green-400 font-bold text-sm font-mono"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                ₺{currentValue.toLocaleString('tr-TR')}/Ay
              </motion.span>
              <motion.span
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-green-400"
              >
                ⬆
              </motion.span>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-white font-bold text-sm whitespace-nowrap">
              Sıra Sende
            </span>
            <span className="text-xl">🚀</span>
          </motion.div>
        )}
      </div>

      {/* Hover glow pulse */}
      <motion.div
        animate={isHovered ? {
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.2, 0.8],
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
      />
    </motion.button>
  );
}