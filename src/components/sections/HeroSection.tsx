import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-16 pb-20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10"></div>
      <div className="relative container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, once: true }} 
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight md:leading-tight">
            Stratejiyle Dönüşüm Sağlıyoruz.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Reklam ve İş Süreçlerinizi <span className="text-purple-400 font-semibold">AI Agent</span> ile 
            Otomatikleştirerek. Sadece "tıklama\" değil, gerçek \"sonuç\" getiriyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onContactClick} 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <BrainCircuit className="w-6 h-6 mr-2" /> 
              AI ile Fırsatları Keşfet
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })} 
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg rounded-full"
            >
              <Sparkles className="w-5 h-5 mr-2" /> 
              Canlı Demoları Gör
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};