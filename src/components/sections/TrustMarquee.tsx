import React from 'react';
import { motion } from 'framer-motion';

const techs = [
    { name: 'n8n', color: 'bg-orange-500/10 text-orange-400' },
    { name: 'OpenAI', color: 'bg-emerald-500/10 text-emerald-400' },
    { name: 'Google Gemini', color: 'bg-blue-500/10 text-blue-400' },
    { name: 'Stripe', color: 'bg-indigo-500/10 text-indigo-400' },
    { name: 'Make.com', color: 'bg-purple-500/10 text-purple-400' },
    { name: 'WhatsApp', color: 'bg-green-500/10 text-green-400' },
    { name: 'Instagram', color: 'bg-pink-500/10 text-pink-400' },
    { name: 'Shopify', color: 'bg-lime-500/10 text-lime-400' }
];

export const TrustMarquee: React.FC = () => {
    return (
        <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-bold tracking-widest uppercase text-slate-500">
                    Technologies We Master
                </p>
            </div>
            <div className="relative flex overflow-x-hidden">
                <motion.div
                    className="flex whitespace-nowrap gap-8"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {[...techs, ...techs, ...techs].map((tech, index) => (
                        <div
                            key={index}
                            className={`px-8 py-3 rounded-2xl border border-white/10 glass-card font-bold text-lg flex items-center gap-3`}
                        >
                            <div className={`w-2 h-2 rounded-full ${tech.color.split(' ')[0]}`} />
                            <span className="text-slate-300">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
