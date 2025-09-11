import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Target, Users, ArrowRight, LineChart } from 'lucide-react';

interface StrategyCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, children, icon: Icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setRotate({ x: -y * 10, y: x * 10 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div style={{ transform: 'translateZ(40px)' }}>
        <div className="flex items-center gap-4 mb-4">
          <Icon className="w-8 h-8 text-purple-400" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-slate-300 prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const StrategySection: React.FC = () => (
  <section id="strategy" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, once: true }} 
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Başarı Tesadüf Değildir.</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Her adımı ölçülebilir veriye dayanan, kanıtlanmış bir stratejiyle hareket ediyoruz.</p>
      </motion.div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-purple-300">Funnel Stratejimiz</h3>
          <StrategyCard title="Farkındalık (TOF)" icon={Search}>
            <p><strong>Psikoloji:</strong> Kullanıcı henüz sorununun farkında değil veya yeni fark etmiş. Amaç, dikkatini çekmek ve merak uyandırmak.</p>
            <p><strong>Yaklaşım:</strong> Markanızı/çözümünüzü tanıtan, soğuk kitleyi ısındıran, empati ve merak tetikleyici içerikler üretiriz.</p>
          </StrategyCard>
          <StrategyCard title="Değerlendirme (MOF)" icon={Lightbulb}>
            <p><strong>Psikoloji:</strong> Artık sorunu kabul etti, çözüm alternatiflerini araştırıyor ve markaları kıyaslıyor.</p>
            <p><strong>Yaklaşım:</strong> Uzmanlığınızı ve güvenilirliğinizi gösteren, şeffaf içerikler sunarız.</p>
          </StrategyCard>
          <StrategyCard title="Karar (BOF)" icon={Target}>
            <p><strong>Psikoloji:</strong> Satın almaya çok yakın; son itici güç ve "doğrulama" arıyor.</p>
            <p><strong>Yaklaşım:</strong> Aciliyet ve sosyal kanıt vurgusu yapan reklamlarla kullanıcıyı dönüşüme yönlendiririz.</p>
          </StrategyCard>
        </div>
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-cyan-300">KPI Takibimiz</h3>
          <StrategyCard title="CPM & Reach" icon={Users}>
            <p><strong>CPM (1000 Gösterim Maliyeti)</strong> ve <strong>Reach (Erişim)</strong> metrikleriyle hedefleme kalitemizi ve kitleye ne kadar etkin ulaştığımızı ölçeriz.</p>
          </StrategyCard>
          <StrategyCard title="CTR & CPC" icon={ArrowRight}>
            <p><strong>CTR (Tıklama Oranı)</strong> ile içeriğinizin ne kadar ilgi çekici olduğunu, <strong>CPC (Tıklama Başı Maliyet)</strong> ile de reklam verimliliğini anlık olarak takip ederiz.</p>
          </StrategyCard>
          <StrategyCard title="CPL & ROAS" icon={LineChart}>
            <p><strong>CPL (Lead Başı Maliyet)</strong> ile her bir potansiyel müşterinin size maliyetini hesaplarız. En önemlisi, <strong>ROAS (Reklam Harcaması Geri Dönüşü)</strong> ile harcadığınız her liranın size ne kadar kazandırdığını net bir şekilde raporlarız.</p>
          </StrategyCard>
        </div>
      </div>
    </div>
  </section>
);