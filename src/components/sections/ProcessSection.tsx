import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Rocket, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const ProcessSection: React.FC = () => {
    const { language } = useLanguage();

    const steps = [
        {
            icon: Search,
            title: language === 'tr' ? '1. Analiz & Keşif' : '1. Audit & Discovery',
            desc: language === 'tr'
                ? 'İş süreçlerinizi derinlemesine inceliyor, en yüksek verim alacağınız otomasyon noktalarını belirliyoruz.'
                : 'We deep-dive into your business processes to identify high-impact automation opportunities.',
            color: 'from-blue-500 to-cyan-400'
        },
        {
            icon: Settings,
            title: language === 'tr' ? '2. Akıllı Entegrasyon' : '2. Smart Integration',
            desc: language === 'tr'
                ? 'AI ajanlarını ve sistemleri işinize özel olarak tasarlayıp, mevcut araçlarınıza pürüzsüzce bağlıyoruz.'
                : 'We design custom AI agents and connect them seamlessly to your current tools and stacks.',
            color: 'from-purple-500 to-pink-400'
        },
        {
            icon: Rocket,
            title: language === 'tr' ? '3. Ölçeklenebilir Büyüme' : '3. Scallable Growth',
            desc: language === 'tr'
                ? 'Sistemler canlıya alınır; siz kahvenizi yudumlarken AI işinizi %100 doğrulukla büyütür.'
                : 'Systems go live; while you sip your coffee, AI grows your business with 100% accuracy.',
            color: 'from-cyan-500 to-emerald-400'
        }
    ];

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        {language === 'tr' ? 'Nasıl Çalışıyoruz?' : 'How We Work?'}
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {language === 'tr'
                            ? 'Kaostan kurtulup otomatiğe geçmeniz için izlediğimiz 3 kritik adım.'
                            : 'The 3 critical steps we follow to help you move from chaos to automation.'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center"
                        >
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5 mb-8 shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]`}>
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed px-4">{step.desc}</p>

                            {index < steps.length - 1 && (
                                <div className="md:hidden mt-8 text-white/20 animate-bounce">
                                    <ArrowRight className="w-8 h-8 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
