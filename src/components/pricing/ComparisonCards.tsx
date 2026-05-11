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

  const channelMatrix = [
    { label: 'WhatsApp', basic: 'yes', growth: 'yes', advanced: 'yes' },
    { label: 'Instagram DM', basic: 'no', growth: 'yes', advanced: 'yes' },
    { label: 'Sesli arama', basic: 'no', growth: 'addon', advanced: 'yes' },
    { label: 'CRM', basic: 'no', growth: 'yes', advanced: 'yes' },
    { label: 'n8n Otomasyon', basic: 'no', growth: 'yes', advanced: 'yes' },
    { label: 'Randevu', basic: 'yes', growth: 'yes', advanced: 'yes' },
    { label: 'Ödeme', basic: 'no', growth: 'no', advanced: 'optional' },
  ];

  const renderCell = (val: string) => {
    if (val === 'yes') return <span className="text-green-400 font-bold">✓</span>;
    if (val === 'addon') return <span className="text-amber-300 text-[10px] sm:text-xs">Add-on</span>;
    if (val === 'optional') return <span className="text-amber-300 text-[10px] sm:text-xs">Opsiyonel</span>;
    return <span className="text-gray-500">—</span>;
  };

  return (
    <>
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

    {/* Paket Kanal Matrisi */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto mb-12"
    >
      <h3 className="text-2xl font-bold text-white mb-4 text-center">Paketler Hangi Kanalları Kapsıyor?</h3>
      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-[#1A1F3A]">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900/50">
              <th className="text-left text-gray-400 font-medium px-3 sm:px-4 py-3">Yetenek</th>
              <th className="text-center text-gray-200 font-semibold px-2 sm:px-4 py-3">WhatsApp Asistan</th>
              <th className="text-center text-gray-200 font-semibold px-2 sm:px-4 py-3">Çok Kanal Asistan</th>
              <th className="text-center text-cyan-300 font-semibold px-2 sm:px-4 py-3">AI Resepsiyon</th>
            </tr>
          </thead>
          <tbody>
            {channelMatrix.map((row) => (
              <tr key={row.label} className="border-b border-slate-800 last:border-b-0">
                <td className="text-gray-300 px-3 sm:px-4 py-3 font-medium">{row.label}</td>
                <td className="text-center px-2 sm:px-4 py-3">{renderCell(row.basic)}</td>
                <td className="text-center px-2 sm:px-4 py-3">{renderCell(row.growth)}</td>
                <td className="text-center px-2 sm:px-4 py-3">{renderCell(row.advanced)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
    </>
  );
}