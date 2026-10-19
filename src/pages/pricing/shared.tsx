import React from 'react';
import type { PricingRegionCode } from '../../config/pricing';

/* Fiyat sayfaları ortak parçaları (konsey 2026-10-19, KARAR.md):
   /pricing = seçici, /pricing/automation = otomasyon, /pricing/local = web, reklam, AI asistan (ikisi de her ölçek için).
   Ayrım hizmete göredir, kitleye/büyüklüğe göre değil (kullanıcı düzeltmesi 2026-10-19). */

export const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const WHATSAPP_TR = '905318299701';
const WHATSAPP_UK = '447482670606';

export function whatsappLink(region: PricingRegionCode, text: string): string {
  const number = region === 'TR' ? WHATSAPP_TR : WHATSAPP_UK;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function localPath(path: string, isEN: boolean): string {
  return isEN ? `/en${path}` : path;
}

export const card = {
  padding: '1.5rem',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
} as const;

export const h2 = {
  fontSize: 'clamp(1.35rem,3vw,1.9rem)',
  fontWeight: 800,
  color: 'var(--ink)',
  margin: '0 0 0.6rem',
  lineHeight: 1.2,
} as const;

export const lede = { color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 1.75rem', maxWidth: 680 } as const;

export const sectionPad = { padding: 'clamp(2.25rem,5vw,3.5rem) 0' } as const;

export const eyebrow = {
  fontSize: '0.75rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: 'var(--muted)',
  marginBottom: '0.6rem',
} as const;

export function CheckList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.45rem' }}>
      {items.map((t) => (
        <li key={t} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: muted ? 'var(--muted)' : 'var(--ink)' }}>
          <span aria-hidden="true" style={{ flex: '0 0 auto', fontWeight: 700 }}>{muted ? '–' : '✓'}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((faq) => (
        <details key={faq.question} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '0.875rem 1.25rem', background: 'var(--surface)' }}>
          <summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--ink)', fontSize: '0.975rem' }}>{faq.question}</summary>
          <p style={{ marginTop: '0.75rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function PrimaryButton({ href, children, inverted }: { href: string; children: React.ReactNode; inverted?: boolean }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        display: 'inline-block',
        padding: '0.85rem 1.9rem',
        background: inverted ? 'var(--paper)' : 'var(--ink)',
        color: inverted ? 'var(--ink)' : 'var(--paper)',
        borderRadius: 8,
        textDecoration: 'none',
        fontWeight: 700,
      }}
    >
      {children}
    </a>
  );
}

export function GhostButton({ href, children, onDark }: { href: string; children: React.ReactNode; onDark?: boolean }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        display: 'inline-block',
        padding: '0.85rem 1.9rem',
        border: onDark ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--border)',
        color: onDark ? 'var(--paper)' : 'var(--ink)',
        borderRadius: 8,
        textDecoration: 'none',
        fontWeight: 600,
      }}
    >
      {children}
    </a>
  );
}

/** Kurucu + şirket bilgisi — iki fiyat sayfasında aynı metin (çelişmesin). */
export function CompanyBlock({ isEN }: { isEN: boolean }) {
  return (
    <div style={card}>
      <h3 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 0, fontSize: '1.05rem' }}>
        {isEN ? 'Who you work with' : 'Kiminle çalışıyorsunuz'}
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
        {isEN
          ? 'Directly with the founder, Mustafa Gül. No sales layer: you talk to the person who builds and runs your system.'
          : 'Doğrudan kurucu Mustafa Gül ile. Arada satış ekibi yok; sistemi kuran ve işleten kişiyle konuşursunuz.'}
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7, margin: '0.75rem 0 0' }}>
        MGL Digital Media Ltd · {isEN ? 'Company no' : 'Şirket no'}: 16007414 ({isEN ? 'England and Wales' : 'İngiltere ve Galler'})<br />
        112 Bertram Road, Enfield, EN1 1LS, {isEN ? 'United Kingdom' : 'Birleşik Krallık'}<br />
        TR: +90 531 829 97 01 · UK: +44 7482 670606
      </p>
    </div>
  );
}
