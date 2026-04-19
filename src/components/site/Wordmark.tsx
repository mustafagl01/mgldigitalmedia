interface Props {
  size?: number;
  className?: string;
}

export function Wordmark({ size = 22 }: Props) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: size,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        color: 'var(--ink)',
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 4,
      }}
    >
      <span>mgl</span>
      <span style={{ color: 'var(--ember)', fontStyle: 'italic', fontWeight: 500 }}>ai</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', fontWeight: 500, letterSpacing: '0.14em', marginLeft: 8 }}>
        / systems
      </span>
    </span>
  );
}
