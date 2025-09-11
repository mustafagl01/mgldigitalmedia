import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Bot, PenTool, Sparkles } from 'lucide-react';

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
        transition={{ duration: 0.6, once: true }} 
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
            transition={{ duration: 0.6, delay: index * 0.1, once: true }} 
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