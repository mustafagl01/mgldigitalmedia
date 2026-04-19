import { useEffect, useRef } from 'react';

/**
 * HeroBackdrop — animated SVG sine wave behind the hero.
 * Breathes at 5s cycle. Shifts ~10px with mouse.
 * Pure SVG, ember-tinted, ~10% opacity.
 */
export function HeroBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 14;
      targetY = y * 8;
    };

    const tick = () => {
      tx += (targetX - tx) * 0.08;
      ty += (targetY - ty) * 0.08;
      el.style.setProperty('--hx', `${tx}px`);
      el.style.setProperty('--hy', `${ty}px`);
      raf = requestAnimationFrame(tick);
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      window.addEventListener('mousemove', onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        transform: 'translate(var(--hx, 0), var(--hy, 0))',
        transition: 'none',
      }}
    >
      <svg
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.11,
        }}
      >
        <defs>
          <linearGradient id="wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8481C" stopOpacity="0" />
            <stop offset="25%" stopColor="#E8481C" stopOpacity="1" />
            <stop offset="75%" stopColor="#E8481C" stopOpacity="1" />
            <stop offset="100%" stopColor="#E8481C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-fade-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E0E0C" stopOpacity="0" />
            <stop offset="40%" stopColor="#0E0E0C" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0E0E0C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0E0E0C" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary ember wave — strong */}
        <path
          d="M 0 400 Q 200 300, 400 400 T 800 400 T 1200 400 T 1600 400"
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="1.5"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M 0 400 Q 200 300, 400 400 T 800 400 T 1200 400 T 1600 400;
              M 0 400 Q 200 500, 400 400 T 800 400 T 1200 400 T 1600 400;
              M 0 400 Q 200 300, 400 400 T 800 400 T 1200 400 T 1600 400
            "
          />
        </path>

        {/* Secondary ink wave — offset phase, thinner */}
        <path
          d="M 0 420 Q 200 360, 400 420 T 800 420 T 1200 420 T 1600 420"
          fill="none"
          stroke="url(#wave-fade-2)"
          strokeWidth="1"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M 0 420 Q 200 360, 400 420 T 800 420 T 1200 420 T 1600 420;
              M 0 420 Q 200 480, 400 420 T 800 420 T 1200 420 T 1600 420;
              M 0 420 Q 200 360, 400 420 T 800 420 T 1200 420 T 1600 420
            "
          />
        </path>

        {/* Trailing thin wave — further offset */}
        <path
          d="M 0 380 Q 250 340, 500 380 T 1000 380 T 1600 380"
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="0.8"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M 0 380 Q 250 340, 500 380 T 1000 380 T 1600 380;
              M 0 380 Q 250 420, 500 380 T 1000 380 T 1600 380;
              M 0 380 Q 250 340, 500 380 T 1000 380 T 1600 380
            "
          />
        </path>
      </svg>
    </div>
  );
}
