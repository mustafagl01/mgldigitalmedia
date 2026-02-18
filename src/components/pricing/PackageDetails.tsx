import React from 'react';
import { motion } from 'framer-motion';
import config from '../../data/profit-engine-config.json';

interface PackageDetailsProps {
  sectorId: string;
  onRequestDemo: () => void;
}

export default function PackageDetails({ sectorId, onRequestDemo }: PackageDetailsProps) {
  const sectorConfig = config.sectors[sectorId as keyof typeof config.sectors];
  const packageId = sectorConfig.recommended_package;
  const packageData = config.packages[packageId as keyof typeof config.packages];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-[#1A1F3A] to-[#0F1423] rounded-2xl p-8 border-2 border-cyan-400 shadow-2xl">
        {/* Badge */}
        <div className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
          ⭐ SİZİN İÇİN ÖNERİLEN
        </div>

        {/* Package Name & Price */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">
            {packageData.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-cyan-400 font-mono">
              {packageData.price_try ? packageData.price_try.toLocaleString('tr-TR') : packageData.price_usd?.toLocaleString('en-US')}
            </span>
            <span className="text-2xl text-gray-400">
              {packageData.price_try ? 'TL' : 'USD'} / ay
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {packageData.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-300 space-y-2">
          <p>
            <strong className="text-white">Dakika aşımı:</strong> Paket dakikası dolduğunda sistem durmaz. Ek kullanım dakika başına 5 TL olarak faturalandırılır.
          </p>
          <p>
            <strong className="text-white">WhatsApp notu:</strong> WhatsApp konuşma ücretleri (Meta tarafından alınan) müşteriye aittir.
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestDemo}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            🚀 HEMEN BAŞLA
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestDemo}
            className="w-full bg-[#1A1F3A] border-2 border-cyan-400 text-cyan-400 font-semibold text-lg py-4 rounded-xl hover:bg-cyan-400/10 transition-all duration-300"
          >
            📞 DEMO TALEP ET
          </motion.button>
        </div>

        {/* Guarantee */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-green-400 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>14 gün para iade garantisi</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
