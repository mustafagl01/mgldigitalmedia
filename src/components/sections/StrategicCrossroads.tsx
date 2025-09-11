import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StrategicCrossroadsProps {
  onChoice: () => void;
  isVisible: boolean;
}

export const StrategicCrossroads: React.FC<StrategicCrossroadsProps> = ({ onChoice, isVisible }) => {
  const handleChoice = (targetId: string) => {
    onChoice(); // Hide the crossroads
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300); // Wait for fade out animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl w-full text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              İşletmenizi Bir Sonraki Seviyeye Nasıl Taşımak İstersiniz?
            </h1>
            <p className="text-lg text-slate-400 mb-12">
              Size en uygun çözümü bulmamız için lütfen mevcut önceliğinizi seçin.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Choice 1: Automation */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.05 }} 
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 cursor-pointer h-full flex flex-col" 
                onClick={() => handleChoice('demos')}
              >
                <h3 className="text-2xl font-bold text-white mb-3">Manuel İşleri Otomatikleştirin</h3>
                <p className="text-slate-400 flex-grow">
                  Tekrarlayan görevleri, raporlamayı ve veri girişini akıllı asistanlara devrederek 
                  ekibinizin gerçekten önemli işlere odaklanmasını sağlayın.
                </p>
                <span className="mt-6 text-purple-400 font-semibold flex items-center justify-center">
                  Verimliliği Seç <ArrowRight className="ml-2 w-5 h-5"/>
                </span>
              </motion.div>
              
              {/* Choice 2: Advertising */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.05 }} 
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 cursor-pointer h-full flex flex-col" 
                onClick={() => handleChoice('services')}
              >
                <h3 className="text-2xl font-bold text-white mb-3">Müşteri Akışını Hızlandırın</h3>
                <p className="text-slate-400 flex-grow">
                  Mevcut reklam kampanyalarınızdan daha iyi sonuçlar alın. Yapay zeka destekli stratejilerle 
                  reklam harcamanızın geri dönüşünü (ROAS) katlayın.
                </p>
                <span className="mt-6 text-purple-400 font-semibold flex items-center justify-center">
                  Daha Fazla Müşteri <ArrowRight className="ml-2 w-5 h-5"/>
                </span>
              </motion.div>
              
              {/* Choice 3: Full System */}
              <motion.div 
                whileHover={{ y: -10, scale: 1.05 }} 
                className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white p-8 rounded-2xl border border-purple-500 cursor-pointer h-full flex flex-col" 
                onClick={() => handleChoice('hero')}
              >
                <h3 className="text-2xl font-bold mb-3">Uçtan Uca Büyüme Motoru Kurun</h3>
                <p className="text-purple-200 flex-grow">
                  Reklamlarla getirdiğimiz potansiyel müşterileri, AI asistanlarla 7/24 takip edip 
                  satışa hazır hale getiren kusursuz bir sistem inşa edelim.
                </p>
                <span className="mt-6 font-semibold flex items-center justify-center">
                  Tüm Hikayeyi Gör <ArrowRight className="ml-2 w-5 h-5"/>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};