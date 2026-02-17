import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import config from '../../data/profit-engine-config.json';

interface SavingsRevealProps {
  sectorId: string;
  burnAmount: number;
  onContinue: () => void;
}

export default function SavingsReveal({ sectorId, burnAmount, onContinue }: SavingsRevealProps) {
  const sectorConfig = config.sectors[sectorId as keyof typeof config.sectors];
  const packagePrice = sectorConfig.package_price;
  const yearlyPackageCost = packagePrice * 12;
  const savings = burnAmount - yearlyPackageCost;

  return (
    <motion.div
      initial={{ backgroundColor: '#0A0E27' }}
      animate={{ backgroundColor: '#0A1E1A' }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="max-w-4xl w-full text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl">🎉</div>
        </motion.div>

        {/* Savings Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-2xl p-12 mb-8"
        >
          <div className="text-green-400 text-2xl font-semibold mb-4">
            {sectorConfig.calculation.solution_label}
          </div>
          
          <div className="text-7xl md:text-8xl font-bold text-white font-mono mb-2">
            <CountUp
              end={savings}
              duration={2}
              separator="."
              decimals={0}
            />
            <span className="text-4xl ml-2">
              {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
            </span>
          </div>

          <div className="text-xl text-gray-300 mt-4">
            Her yıl cebinizde kalacak!
          </div>
        </motion.div>

        {/* Package Cost Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1A1F3A] rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Yıllık Yakılan Para</div>
              <div className="text-red-400 font-bold text-2xl font-mono">
                {burnAmount.toLocaleString('tr-TR')} {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
              </div>
            </div>
            
            <div className="text-4xl text-gray-600">−</div>
            
            <div>
              <div className="text-gray-400 text-sm mb-1">MGL AI Maliyeti</div>
              <div className="text-cyan-400 font-bold text-2xl font-mono">
                {yearlyPackageCost.toLocaleString('tr-TR')} {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
              </div>
              <div className="text-xs text-gray-500">
                ({packagePrice.toLocaleString('tr-TR')}/ay × 12)
              </div>
            </div>
            
            <div className="text-4xl text-gray-600">=</div>
            
            <div>
              <div className="text-gray-400 text-sm mb-1">Net Tasarruf</div>
              <div className="text-green-400 font-bold text-3xl font-mono">
                {savings.toLocaleString('tr-TR')} {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Killer Argument */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8"
        >
          <div className="text-cyan-400 font-semibold text-lg">
            💡 {sectorConfig.killer_argument}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-2xl py-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
        >
          🚀 PAKET DETAYLARINI GÖR
        </motion.button>
      </div>
    </motion.div>
  );
}