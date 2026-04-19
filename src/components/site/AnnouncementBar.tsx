import { useLanguage } from '../../contexts/LanguageContext';

interface Props {
  onClaim?: () => void;
}

export function AnnouncementBar({ onClaim }: Props) {
  const { language } = useLanguage();

  return (
    <div
      className="on-coal"
      style={{
        background: 'var(--coal)',
        color: 'var(--bone-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '10px 16px',
        textAlign: 'center',
        borderBottom: '1px solid var(--coal-3)',
      }}
    >
      <span style={{ color: 'var(--ember)', marginRight: 10 }}>●</span>
      {language === 'tr'
        ? 'Yeni proje alıyoruz · 15 dk ücretsiz analiz'
        : 'Taking on new work · free 15-min audit'}
      <button
        onClick={onClaim}
        style={{
          color: 'var(--bone)',
          marginLeft: 14,
          borderBottom: '1px solid var(--bone-3)',
          paddingBottom: 1,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'inherit',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        {language === 'tr' ? 'Randevu al →' : 'Book now →'}
      </button>
    </div>
  );
}
