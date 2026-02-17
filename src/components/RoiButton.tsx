import { useEffect, useState } from 'react';
import type { MouseEventHandler } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CirclePlay, TrendingDown, TrendingUp } from 'lucide-react';

const slides = [
  { id: 'loss', text: '💸 Kaybını Hesapla', Icon: TrendingDown, iconClass: 'text-rose-400' },
  { id: 'gain', text: '🚀 Kazancını Gör', Icon: TrendingUp, iconClass: 'text-emerald-400' },
  { id: 'start', text: 'Simülasyonu Başlat', Icon: CirclePlay, iconClass: 'text-lime-300' },
] as const;

type RoiButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function RoiButton({ onClick }: RoiButtonProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-green-500/80 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_24px_rgba(74,222,128,0.45)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/10 to-cyan-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex h-6 items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSlide.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            <activeSlide.Icon size={16} className={activeSlide.iconClass} />
            <span className="hidden sm:inline">{activeSlide.text}</span>
            <span className="sm:hidden">ROI</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
