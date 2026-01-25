import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const BookingSection: React.FC = () => {
    const { language } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-[2.5rem] p-8 md:p-16 border border-purple-500/30 shadow-[0_0_100px_-20px_rgba(147,51,234,0.3)] max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
                >
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-8 text-purple-400 font-bold text-sm tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            {language === 'tr' ? 'Kontenjan Sınırlı' : 'Limited Slots'}
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                            {language === 'tr'
                                ? 'İşinizi Otomatiğe Bağlamaya Hazır Mısınız?'
                                : 'Ready to Put Your Business on Autopilot?'}
                        </h2>

                        <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
                            {language === 'tr'
                                ? 'Sizin için neler yapabileceğimizi konuşalım. 20 dakikalık ücretsiz strateji görüşmesi için yerinizi ayırtın.'
                                : 'Let\'s talk about what we can build for you. Reserve your spot for a 20-minute free strategy call.'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {[
                                { icon: ShieldCheck, text: language === 'tr' ? '%100 Ücretsiz' : '100% Free' },
                                { icon: Zap, text: language === 'tr' ? 'Anında Çözümler' : 'Instant Solutions' },
                                { icon: Users, text: language === 'tr' ? 'Birebir Danışmanlık' : '1-on-1 Consult' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 font-medium">
                                    <item.icon className="w-5 h-5 text-cyan-400" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => window.open('https://calendar.app.google/jgu53NFAy7BnYVui8', '_blank')}
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-12 py-8 text-xl font-black rounded-3xl shadow-[0_20px_50px_-15px_rgba(147,51,234,0.5)] transform hover:scale-105 transition-all duration-500 flex items-center justify-center group"
                        >
                            <Calendar className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform" />
                            {language === 'tr' ? 'Görüşme Planla' : 'Schedule a Call'}
                            <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </div>

                    <div className="flex-1 w-full max-w-md">
                        <div className="relative aspect-square">
                            {/* Abstract Visual Placeholder for Premium Look */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl animate-pulse"></div>
                            <div className="relative h-full w-full glass-card rounded-[3rem] border border-white/10 flex items-center justify-center p-12 overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                <div className="text-center relative z-10">
                                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-inner">
                                        <Calendar className="w-16 h-16 text-purple-400" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-2 w-32 bg-purple-500/30 rounded-full mx-auto animate-pulse"></div>
                                        <div className="h-2 w-24 bg-cyan-500/30 rounded-full mx-auto animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="h-2 w-40 bg-slate-500/30 rounded-full mx-auto animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
