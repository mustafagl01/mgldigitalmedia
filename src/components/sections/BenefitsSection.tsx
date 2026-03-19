import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, TrendingUp, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Clock,
      titleKey: 'benefits.time.title',
      descKey: 'benefits.time.desc',
      stat: 4,
      statSuffix: 'h+',
      statLabel: 'daily savings',
      gradient: 'from-blue-500 to-cyan-400',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      icon: TrendingUp,
      titleKey: 'benefits.sales.title',
      descKey: 'benefits.sales.desc',
      stat: 67,
      statSuffix: '%',
      statLabel: 'more leads',
      gradient: 'from-emerald-500 to-teal-400',
      glowColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      icon: Shield,
      titleKey: 'benefits.error.title',
      descKey: 'benefits.error.desc',
      stat: 95,
      statSuffix: '%',
      statLabel: 'accuracy',
      gradient: 'from-violet-500 to-purple-400',
      glowColor: 'rgba(139, 92, 246, 0.3)',
    },
    {
      icon: Heart,
      titleKey: 'benefits.satisfaction.title',
      descKey: 'benefits.satisfaction.desc',
      stat: 98,
      statSuffix: '%',
      statLabel: 'satisfaction',
      gradient: 'from-rose-500 to-pink-400',
      glowColor: 'rgba(244, 63, 94, 0.3)',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Section background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-slate-300 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px -15px ${benefit.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              {/* Animated Background Gradient on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${benefit.glowColor.replace('0.3', '0.06')}, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Big Animated Number */}
                <div className={`text-5xl font-black bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent mb-1`}>
                  <AnimatedCounter target={benefit.stat} suffix={benefit.statSuffix} />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">{benefit.statLabel}</p>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${benefit.gradient} bg-opacity-10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}
                  style={{ backgroundColor: benefit.glowColor.replace('0.3', '0.1') }}
                >
                  <benefit.icon className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors duration-500" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{t(benefit.titleKey)}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{t(benefit.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
