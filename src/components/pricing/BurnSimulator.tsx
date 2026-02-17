import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../../data/profit-engine-config.json';

interface BurnSimulatorProps {
  sectorId: string;
  onContinue: (burnAmount: number, sliderValues: Record<string, number>) => void;
  onBack: () => void;
}

export default function BurnSimulator({ sectorId, onContinue, onBack }: BurnSimulatorProps) {
  const sectorConfig = config.sectors[sectorId as keyof typeof config.sectors];
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [burnAmount, setBurnAmount] = useState(0);

  // Initialize slider values with defaults
  useEffect(() => {
    const initialValues: Record<string, number> = {};
    sectorConfig.inputs.forEach(input => {
      initialValues[input.id] = input.default;
    });
    setSliderValues(initialValues);
  }, [sectorConfig]);

  // Calculate burn amount
  useEffect(() => {
    if (Object.keys(sliderValues).length === 0) return;

    try {
      // Safe calculation without eval()
      const formula = sectorConfig.calculation.formula;
      const keys = Object.keys(sliderValues);
      const values = keys.map(k => sliderValues[k]);
      
      // Create safe function from formula
      const calculateFunc = new Function(...keys, `"use strict"; return (${formula});`);
      const monthlyBurn = calculateFunc(...values);
      const yearlyBurn = monthlyBurn * sectorConfig.calculation.yearly_multiplier;
      setBurnAmount(Math.round(yearlyBurn));
    } catch (e) {
      console.error('Calculation error:', e);
      setBurnAmount(0);
    }
  }, [sliderValues, sectorConfig]);

  const handleSliderChange = (inputId: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [inputId]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center px-4 py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Geri
      </button>

      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {sectorConfig.name}
          </h2>
          <p className="text-gray-400 text-lg">
            Mevcut durumunuzu girin, ne kadar para yaktiğinizi görelim
          </p>
        </motion.div>

        {/* Sliders */}
        <div className="space-y-8 mb-12">
          {sectorConfig.inputs.map((input, index) => (
            <motion.div
              key={input.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1F3A] rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <label className="text-white font-semibold">
                  {input.label}
                </label>
                <span className="text-cyan-400 font-mono text-xl font-bold">
                  {sliderValues[input.id] || input.default} {input.unit}
                </span>
              </div>
              
              <input
                type="range"
                min={input.min}
                max={input.max}
                value={sliderValues[input.id] || input.default}
                onChange={(e) => handleSliderChange(input.id, Number(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00F5FF 0%, #00F5FF ${((sliderValues[input.id] || input.default) - input.min) / (input.max - input.min) * 100}%, #374151 ${((sliderValues[input.id] || input.default) - input.min) / (input.max - input.min) * 100}%, #374151 100%)`
                }}
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{input.min} {input.unit}</span>
                <span>{input.max} {input.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Burn Amount Display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-2xl p-8 text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-red-400 text-xl font-semibold mb-2">
              {sectorConfig.calculation.pain_label}
            </div>
            <div className="text-6xl md:text-7xl font-bold text-white font-mono mb-2">
              {burnAmount.toLocaleString('tr-TR')}
              <span className="text-3xl ml-2">
                {sectorConfig.package_price_currency === 'USD' ? 'USD' : 'TL'}
              </span>
            </div>
            <div className="text-gray-400">
              Her yıl cebinizden gidiyor...
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onContinue(burnAmount, sliderValues)}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-2xl py-6 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
        >
          ⚡ AI'YA GEÇ VE KURTAR
        </motion.button>
      </div>
    </div>
  );
}