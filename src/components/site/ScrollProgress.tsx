import { useEffect, useRef } from 'react';

/**
 * Thin ember progress bar pinned to the viewport top.
 * Transform-only, no reflow.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={ref}
        style={{
          height: '100%',
          background: 'var(--ember)',
          transformOrigin: '0 50%',
          transform: 'scaleX(0)',
          transition: 'transform 120ms linear',
        }}
      />
    </div>
  );
}
