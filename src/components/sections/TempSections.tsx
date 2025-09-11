import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Bot, PenTool, Sparkles, ArrowRight, Mail, Phone, User,
  BrainCircuit, Search, Lightbulb, Target, Users, LineChart,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

// ServicesSection Component
const services = [
  {
    icon: Rocket,
    title: "AI Destekli Reklam Yönetimi",
    description: "Meta & Google reklam kampanyalarınızı, sürekli öğrenen yapay zeka algoritmalarıyla yöneterek bütçenizi en verimli şekilde kullanıyoruz.",
    integration: "Reklamdan gelen her potansiyel müşteriyi AI Chatbot veya Sesli Asistan ile anında karşılıyoruz."
  },
  {
    icon: Bot,
    title: "AI Agent & Otomasyon Kurulumu",
    description: "WhatsApp, E-posta, Telefon ve web siteniz için 7/24 çalışan, randevu alan, bilgi veren ve veri toplayan akıllı asistanlar tasarlıyoruz.",
    integration: "Kurduğumuz otomasyonları beslemek için en doğru müşteri adaylarını getiren reklam kampanyaları planlıyoruz."
  },
  {
    icon: PenTool,
    title: "Dönüşüm Odaklı Web Tasarımı",
    description: "Sadece güzel değil, aynı zamanda bir müşteri kazanma makinesi olarak çalışan modern ve hızlı web siteleri inşa ediyoruz.",
    integration: "Tasarladığımız her siteye, ziyaretçilerinizi müşteriye dönüştürecek interaktif Canlı Demo modülleri ve Chatbot'lar entegre ediyoruz."
  }
];

export const ServicesSection: React.FC = () => (
  <section id="services" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Tek Bir Merkez, Sınırsız Yetenek</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Stratejiden tasarıma, reklamdan otomasyona, tüm dijital ihtiyaçlarınız için buradayız.</p>
      </motion.div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: index * 0.1 }} 
            viewport={{ once: true }}
            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <service.icon className="w-10 h-10 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
            </div>
            <p className="text-slate-300 flex-grow">{service.description}</p>
            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-sm text-cyan-400 flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{service.integration}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// AutomationExamplesSection Component
const automationExamples = [
  { 
    id: 'email', 
    title: 'Otomatik E-posta Dizisi', 
    description: 'Web sitenizdeki formu dolduran herkese anında kişiselleştirilmiş bir e-posta gönderin.', 
    icon: Mail, 
    color: 'from-blue-500 to-cyan-600', 
    demo: true, 
    ctaLabel: 'Canlı Demo' 
  },
  { 
    id: 'phone', 
    title: 'AI Sizi Arasın', 
    description: 'Numaranızı bırakın, AI sesli asistanımız sizi arayarak yeteneklerini sergilesin.', 
    icon: Phone, 
    color: 'from-rose-500 to-red-600', 
    demo: true, 
    ctaLabel: 'Canlı Demo' 
  },
  { 
    id: 'whatsapp', 
    title: 'Birebir Strateji Görüşmesi', 
    description: 'Otomasyon fikirlerinizi doğrudan kurucumuz Mustafa Bey ile görüşmek için WhatsApp üzerinden anında iletişime geçin.', 
    icon: User, 
    color: 'from-green-500 to-emerald-600', 
    demo: true, 
    ctaLabel: 'İletişime Geç' 
  },
];

interface AutomationExamplesSectionProps {
  onDemoClick: (demoId: string) => void;
}

export const AutomationExamplesSection: React.FC<AutomationExamplesSectionProps> = ({ onDemoClick }) => {
  const handleAutomationClick = (automation: any) => {
    if (automation.id === 'whatsapp') {
      const phoneNumber = '905318299701';
      const message = encodeURIComponent('Merhaba Mustafa Bey, web siteniz üzerinden ulaşıyorum. Bir strateji görüşmesi planlamak istiyorum.');
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    } else if (automation.demo) {
      onDemoClick(automation.id);
    }
  };

  return (
    <section id="demos" className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Anlatmıyoruz, Gösteriyoruz.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Aşağıdaki demoları deneyin ve "acaba benim şu işim de otomatik olabilir mi?" diye düşünün:</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automationExamples.map((automation, index) => (
            <motion.div 
              key={automation.id} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.1 }} 
              viewport={{ once: true }}
              onClick={() => handleAutomationClick(automation)} 
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 flex flex-col cursor-pointer hover:border-purple-400/50 hover:transform hover:scale-105 group"
            >
              <div className={cn(`bg-gradient-to-r ${automation.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`)}>
                <automation.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 transition-colors group-hover:text-purple-300">{automation.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{automation.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 min-h-[36px]">
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", automation.ctaLabel === 'Canlı Demo' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400')}>
                  {automation.ctaLabel}
                </span>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AccordionItem Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 text-slate-300 prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// StrategySection Component
export const StrategySection: React.FC = () => (
  <section id="strategy" className="py-20">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Başarı Tesadüf Değildir.</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Her adımı ölçülebilir veriye dayanan, kanıtlanmış bir stratejiyle hareket ediyoruz.</p>
      </motion.div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-purple-300">Funnel Stratejimiz</h3>
          <AccordionItem title="Farkındalık (TOF)" icon={Search}>
            <p><strong>Psikoloji:</strong> Kullanıcı henüz sorununun farkında değil veya yeni fark etmiş. Amaç, dikkatini çekmek ve merak uyandırmak.</p>
            <p><strong>Yaklaşım:</strong> Markanızı/çözümünüzü tanıtan, soğuk kitleyi ısındıran, empati ve merak tetikleyici (Reels, Story gibi) içerikler üretiriz.</p>
          </AccordionItem>
          <AccordionItem title="Değerlendirme (MOF)" icon={Lightbulb}>
            <p><strong>Psikoloji:</strong> Artık sorunu kabul etti, çözüm alternatiflerini araştırıyor ve markaları kıyaslıyor.</p>
            <p><strong>Yaklaşım:</strong> Uzmanlığınızı ve güvenilirliğinizi gösteren, "Nasıl çalışıyoruz?" sorusunu yanıtlayan (Vaka çalışması, E-kitap gibi) şeffaf içerikler sunarız.</p>
          </AccordionItem>
          <AccordionItem title="Karar (BOF)" icon={Target}>
            <p><strong>Psikoloji:</strong> Satın almaya çok yakın; son itici güç ve "doğrulama" arıyor.</p>
            <p><strong>Yaklaşım:</strong> Aciliyet ve sosyal kanıt vurgusu yapan (Teklifler, Demo, Retargeting gibi) reklamlarla kullanıcıyı dönüşüme yönlendiririz.</p>
          </AccordionItem>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-cyan-300">KPI Takibimiz</h3>
          <AccordionItem title="CPM & Reach" icon={Users}>
            <p><strong>CPM (1000 Gösterim Maliyeti)</strong> ve <strong>Reach (Erişim)</strong> metrikleriyle hedefleme kalitemizi ve kitleye ne kadar etkin ulaştığımızı ölçeriz.</p>
          </AccordionItem>
          <AccordionItem title="CTR & CPC" icon={ArrowRight}>
            <p><strong>CTR (Tıklama Oranı)</strong> ile içeriğinizin ne kadar ilgi çekici olduğunu, <strong>CPC (Tıklama Başı Maliyet)</strong> ile de reklam verimliliğini anlık olarak takip ederiz.</p>
          </AccordionItem>
          <AccordionItem title="CPL & ROAS" icon={LineChart}>
            <p><strong>CPL (Lead Başı Maliyet)</strong> ile her bir potansiyel müşterinin size maliyetini hesaplarız. En önemlisi, <strong>ROAS (Reklam Harcaması Geri Dönüşü)</strong> ile harcadığınız her liranın size ne kadar kazandırdığını net bir şekilde raporlarız.</p>
          </AccordionItem>
        </div>
      </div>
    </div>
  </section>
);

// CtaSection Component
interface CtaSectionProps {
  onContactClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onContactClick }) => (
  <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
    <div className="container mx-auto px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Hazır mısınız? İşinizi Birlikte Dönüştürelim!</h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">Hangi manuel işlerinizin otomatikleştirilebileceğini ve reklam bütçenizi nasıl daha verimli kullanabileceğinizi öğrenmek için 2 dakikada size özel bir analiz sunalım.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onContactClick} 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <BrainCircuit className="w-6 h-6 mr-2" /> 
            Ücretsiz Otomasyon Analizi Al
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// Footer Component
export const Footer: React.FC = () => (
  <footer className="bg-black/40 pt-12 pb-8">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BrainCircuit className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold text-white">MGL Digital AI</span>
        </div>
        <p className="text-gray-400 mb-8">AI Otomasyon Ajansı - İşinizi Geleceğe Taşıyoruz</p>
      </div>
      <div className="border-t border-slate-700/50 pt-8 text-slate-400 text-sm">
        <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold text-white mb-2">MGL DIGITAL MEDIA LTD</h4>
            <p>Registered in England and Wales. Company Number: 16007414</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Registered Office</h4>
            <p>112 Bertram Road, Enfield, England, EN1 1LS</p>
          </div>
        </div>
      </div>
      <div className="text-center text-slate-500 text-xs mt-8 pt-8 border-t border-slate-700/50">
        <span>© 2024 MGL Digital Media LTD • Tüm Hakları Saklıdır</span>
      </div>
    </div>
  </footer>
);