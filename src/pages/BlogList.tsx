import React, { useState } from 'react';
import { Seo, breadcrumbSchema, faqSchema } from '../components/seo/Seo';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllPosts, type BlogPost } from '../lib/blog';

const SITE_URL = 'https://mgl-ai.uk';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

interface BlogListProps {
  onPost: (slug: string) => void;
}

export default function BlogList({ onPost }: BlogListProps) {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const [filter, setFilter] = useState<'all' | 'tr' | 'en'>('all');

  const allPosts = getAllPosts();
  const posts = filter === 'all' ? allPosts : allPosts.filter((p) => p.language === filter);

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: isEN ? 'Blog' : 'Blog', path: '/blog' },
  ]);

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: isEN ? 'MGL AI Blog' : 'MGL AI Blog',
    description: isEN
      ? 'Practical guides on AI automation, WhatsApp agents, voice AI and n8n for UK and Turkish businesses.'
      : 'Türkiye ve UK işletmeleri için AI otomasyon, WhatsApp asistanı, sesli AI ve n8n rehberleri.',
    url: `${SITE_URL}/blog`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['tr-TR', 'en-GB'],
  };

  const listFaqs = isEN
    ? [
        {
          question: 'What topics does the MGL AI blog cover?',
          answer:
            'WhatsApp AI agents, n8n automation, voice AI phone assistants, lead generation, and AI automation for UK and Turkish SMBs.',
        },
        {
          question: 'Are articles available in Turkish?',
          answer: 'Yes. Most articles are published in Turkish (TR priority market) with key guides also in English.',
        },
      ]
    : [
        {
          question: 'MGL AI Blog ne hakkında yazıyor?',
          answer:
            'WhatsApp AI asistanlar, n8n otomasyon, sesli AI telefon asistanları, lead üretimi ve KOBİ için yapay zeka otomasyonu konularında pratik rehberler.',
        },
        {
          question: 'Yazılar Türkçe mi?',
          answer: 'Evet. Blog yazılarının çoğunluğu Türkçe, temel rehberler İngilizce olarak da yayınlanmaktadır.',
        },
      ];

  return (
    <>
      <Seo
        title={isEN ? 'Blog · MGL AI — AI Automation Guides' : 'Blog · MGL AI — AI Otomasyon Rehberleri'}
        description={
          isEN
            ? 'Practical AI automation guides for UK and Turkish businesses. WhatsApp agents, n8n, voice AI, lead generation.'
            : 'Türkiye ve UK işletmeleri için AI otomasyon rehberleri. WhatsApp asistanları, n8n, sesli AI, lead üretimi.'
        }
        path="/blog"
        locale={isEN ? 'en_GB' : 'tr_TR'}
        keywords={
          isEN
            ? ['ai automation blog', 'whatsapp ai agent', 'n8n guide', 'voice ai uk']
            : ['ai otomasyon blog', 'whatsapp ai asistan', 'n8n rehber', 'sesli ai türkiye']
        }
        jsonLd={[blogListSchema, breadcrumb, faqSchema(listFaqs)]}
      />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
            }}
          >
            {isEN ? 'AI Automation Guides & Insights' : 'AI Otomasyon Rehberleri'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 600 }}>
            {isEN
              ? 'Practical, no-fluff guides on WhatsApp AI, n8n automation, voice agents and more — for UK and Turkish SMBs.'
              : 'WhatsApp AI, n8n otomasyon, sesli AI ve daha fazlası hakkında pratik, doğrudan rehberler — Türkiye ve UK KOBİ\'leri için.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['all', 'tr', 'en'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 6,
                border: '1.5px solid',
                borderColor: filter === f ? 'var(--ink)' : 'var(--border)',
                background: filter === f ? 'var(--ink)' : 'transparent',
                color: filter === f ? 'var(--paper)' : 'var(--ink)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? (isEN ? 'All' : 'Tümü') : f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        {posts.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>
            {isEN ? 'No posts found.' : 'Yazı bulunamadı.'}
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} onPost={onPost} isEN={isEN} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'var(--surface)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ink)' }}>
            {isEN ? 'Want a personalised AI audit?' : 'İşletmeniz için ücretsiz AI analizi mi istiyorsunuz?'}
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            {isEN
              ? "15-minute call. We'll map out your highest-ROI automation opportunities."
              : '15 dakikalık görüşme. En yüksek ROI sağlayacak otomasyon fırsatlarını belirliyoruz.'}
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'var(--ink)',
              color: 'var(--paper)',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            {isEN ? 'Book Free Audit' : 'Ücretsiz Analiz Al'}
          </a>
        </div>
      </section>
    </>
  );
}

function BlogCard({
  post,
  onPost,
  isEN,
}: {
  post: BlogPost;
  onPost: (slug: string) => void;
  isEN: boolean;
}) {
  return (
    <article
      onClick={() => onPost(post.slug)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Language badge */}
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '0.2rem 0.5rem',
            borderRadius: 4,
            background: post.language === 'en' ? '#1a1a2e' : '#16213e',
            color: '#fff',
          }}
        >
          {post.language.toUpperCase()}
        </span>
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 4,
              background: 'var(--border)',
              color: 'var(--muted)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, margin: 0 }}>
        {post.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--muted)',
          lineHeight: 1.55,
          margin: 0,
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--muted)',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.75rem',
          marginTop: 'auto',
        }}
      >
        <span>{post.date}</span>
        <span>
          {post.readingTime} {isEN ? 'min read' : 'dk okuma'}
        </span>
      </div>
    </article>
  );
}
