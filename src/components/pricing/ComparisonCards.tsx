import React from 'react';
import { motion } from 'framer-motion';
import config from '../../data/profit-engine-config.json';

interface ComparisonCardsProps {
  sectorId: string;
}

export default function ComparisonCards({ sectorId }: ComparisonCardsProps) {
  const sectorConfig = config.sectors[sectorId as keyof typeof config.sectors];
  const comparison = sectorConfig.comparison;

  const oldWay = config.comparison_cards.old_way;
  const aiWay = config.comparison_cards.ai_way;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
      {/* Old Way Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#1A1F3A] rounded-2xl p-8 border-2 border-gray-700"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">😩</div>
          <h3 className="text-2xl font-bold text-gray-300">
            {oldWay.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <div className="text-gray-400 text-sm">Çalışma Saati</div>
              <div className="text-white font-semibold">{oldWay.specs.hours}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🗣️</span>
            <div>
              <div className="text-gray-400 text-sm">Dil Desteği</div>
              <div className="text-white font-semibold">{oldWay.specs.languages}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="text-gray-400 text-sm">Hata Oranı</div>
              <div className="text-white font-semibold">{oldWay.specs.error_rate}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🔴</span>
            <div>
              <div className="text-gray-400 text-sm">Durum</div>
              <div className="text-white font-semibold">{oldWay.specs.availability}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🏖️</span>
            <div>
              <div className="text-gray-400 text-sm">İzin/Tatil</div>
              <div className="text-white font-semibold">{oldWay.specs.vacation}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="text-gray-400 text-sm mb-1">{comparison.old_way_label}</div>
            <div className="text-red-400 font-bold text-3xl font-mono">
              {comparison.old_way_cost.toLocaleString('tr-TR')} {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Way Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 border-2 border-cyan-400 relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 animate-pulse" />

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🤖</div>
            <h3 className="text-2xl font-bold text-white">
              {aiWay.title}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-cyan-300 text-sm">Çalışma Saati</div>
                <div className="text-white font-semibold">{aiWay.specs.hours}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <div className="text-cyan-300 text-sm">Dil Desteği</div>
                <div className="text-white font-semibold">{aiWay.specs.languages}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="text-cyan-300 text-sm">Hata Oranı</div>
                <div className="text-white font-semibold">{aiWay.specs.error_rate}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🟢</span>
              <div>
                <div className="text-cyan-300 text-sm">Durum</div>
                <div className="text-white font-semibold">{aiWay.specs.availability}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🚫</span>
              <div>
                <div className="text-cyan-300 text-sm">İzin/Tatil</div>
                <div className="text-white font-semibold">{aiWay.specs.vacation}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/30">
              <div className="text-cyan-300 text-sm mb-1">Aylık Maliyet</div>
              <div className="text-green-400 font-bold text-3xl font-mono">
                {sectorConfig.package_price.toLocaleString('tr-TR')} {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}