import React from 'react';
import { motion } from 'framer-motion';

interface SectorSelectorProps {
  onSelectSector: (sectorId: string) => void;
}

const sectors = [
  {
    id: 'restaurant',
    icon: '🍕',
    name: 'Restoran & Cafe',
    color: '#FF6B6B',
    description: 'Yemeksepeti komisyonlarından kurtulun'
  },
  {
    id: 'health',
    icon: '🏥',
    name: 'Sağlık Turizmi',
    color: '#4ECDC4',
    description: 'Kaçırdığınız hastaları yakalayın'
  },
  {
    id: 'corporate',
    icon: '🏢',
    name: 'Kurumsal & Ofis',
    color: '#95E1D3',
    description: '7/24 çalışan AI sistemi'
  },
  {
    id: 'export',
    icon: '🌍',
    name: 'İhracat & E-ticaret',
    color: '#F38181',
    description: 'Saat farkı yok, çok dilli destek'
  }
];

export default function SectorSelector({ onSelectSector }: SectorSelectorProps) {
  return (
    <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Hangi Operasyonu{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Otomatize Ediyoruz?
          </span>
        </h1>
        <p className="text-gray-400 text-xl">
          Sektörünüzü seçin, kaç para kaybettiğinizi görelim
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {sectors.map((sector, index) => (
          <motion.button
            key={sector.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${sector.color}50` }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectSector(sector.id)}
            className="relative bg-[#1A1F3A] rounded-2xl p-8 text-left overflow-hidden group cursor-pointer border-2 border-transparent hover:border-cyan-400 transition-all duration-300"
            style={{
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ background: `linear-gradient(135deg, ${sector.color}, transparent)` }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-6xl mb-4">{sector.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {sector.name}
              </h3>
              <p className="text-gray-400">
                {sector.description}
              </p>
              
              <div className="mt-6 flex items-center text-cyan-400 font-semibold">
                <span>Hesapla</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}