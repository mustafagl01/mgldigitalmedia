interface Props {
  size?: number;
  className?: string;
  /** Koyu zeminde açık renk yazı. */
  inverse?: boolean;
}

/* Logo v3 (konsey 2026-10-19): "mgl ai" IBM Plex Sans + yeşil "onay ışığı" karesi.
   Eski turuncu-kırmızı italik "ai" kaldırıldı. Yeşil sitede yalnız onay anlamı taşır. */
export function Wordmark({ size = 22, inverse = false }: Props) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: size,
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: inverse ? 'var(--bone)' : 'var(--ink)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.28,
        whiteSpace: 'nowrap',
      }}
    >
      <span>mgl ai</span>
      <span
        aria-hidden="true"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          background: 'var(--moss)',
          borderRadius: 2,
          display: 'inline-block',
          transform: 'translateY(0.05em)',
        }}
      />
    </span>
  );
}
