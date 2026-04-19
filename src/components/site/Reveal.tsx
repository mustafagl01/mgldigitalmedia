import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'header';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveal — one-shot fade-up when element enters viewport.
 * Honors prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, as = 'div', className, style }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, delay);
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(12px)',
        transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
