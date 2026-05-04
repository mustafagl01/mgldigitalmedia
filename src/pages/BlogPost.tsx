import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Seo, breadcrumbSchema, faqSchema } from '../components/seo/Seo';
import { useLanguage } from '../contexts/LanguageContext';
import { getPostBySlug } from '../lib/blog';

const SITE_URL = 'https://mgl-ai.uk';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
  onPost: (slug: string) => void;
}

export default function BlogPost({ slug, onBack, onPost: _onPost }: BlogPostProps) {
  const { language } = useLanguage();
  const isEN = language === 'en';
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section style={{ maxWidth: 720, margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--ink)' }}>{isEN ? 'Post not found' : 'Yazı bulunamadı'}</h1>
        <button
          onClick={onBack}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.5rem',
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {isEN ? '← Back to Blog' : '← Bloga Dön'}
        </button>
      </section>
    );
  }

  const breadcrumb = breadcrumbSchema([
    { name: isEN ? 'Home' : 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: post.language === 'tr' ? 'tr-TR' : 'en-GB',
    author: {
      '@type': 'Person',
      name: 'Mustafa Gul',
      url: `${SITE_URL}/#founder`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.cover ? { image: post.cover.startsWith('http') ? post.cover : `${SITE_URL}${post.cover}` } : {}),
  };

  const jsonLdArray: object[] = [articleSchema, breadcrumb];
  if (post.faqs && post.faqs.length > 0) {
    jsonLdArray.push(faqSchema(post.faqs));
  }

  return (
    <>
      <Seo
        title={`${post.title} · MGL AI Blog`}
        description={post.description}
        path={`/blog/${post.slug}`}
        locale={post.language === 'en' ? 'en_GB' : 'tr_TR'}
        keywords={post.tags}
        jsonLd={jsonLdArray}
        ogImage={post.cover || undefined}
      />

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '0.4rem 0.9rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: 'var(--muted)',
            marginBottom: '2rem',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--ink)';
            el.style.color = 'var(--ink)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border)';
            el.style.color = 'var(--muted)';
          }}
        >
          ← {isEN ? 'Back to Blog' : 'Bloga Dön'}
        </button>

        {/* Header */}
        <header style={{ marginBottom: '2.5rem' }}>
          {/* Language + Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '0.25rem 0.6rem',
                borderRadius: 4,
                background: 'var(--ink)',
                color: 'var(--paper)',
              }}
            >
              {post.language.toUpperCase()}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 4,
                  background: 'var(--border)',
                  color: 'var(--muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span>
              {isEN ? 'By' : 'Yazar:'} <strong style={{ color: 'var(--ink)' }}>Mustafa Gul</strong>
            </span>
            <span>{post.date}</span>
            <span>
              {post.readingTime} {isEN ? 'min read' : 'dk okuma'}
            </span>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
            {post.description}
          </p>
        </header>

        {/* Content */}
        <div className="blog-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '0.75rem', color: 'var(--ink)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.75rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p style={{ lineHeight: 1.75, marginBottom: '1rem', color: 'var(--body)', fontSize: '1rem' }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: 1.7, color: 'var(--body)' }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: 1.7, color: 'var(--body)' }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => <li style={{ marginBottom: '0.4rem' }}>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: '4px solid var(--ink)',
                    margin: '1.5rem 0',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--surface)',
                    borderRadius: '0 8px 8px 0',
                    color: 'var(--body)',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th style={{ padding: '0.6rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', fontWeight: 700, textAlign: 'left', color: 'var(--ink)' }}>
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td style={{ padding: '0.6rem 1rem', border: '1px solid var(--border)', color: 'var(--body)' }}>
                  {children}
                </td>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code
                    style={{
                      background: 'var(--surface)',
                      padding: '0.15em 0.4em',
                      borderRadius: 4,
                      fontSize: '0.875em',
                      color: 'var(--ink)',
                      border: '1px solid var(--border)',
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre
                  style={{
                    background: '#1a1a2e',
                    color: '#e8e8e8',
                    padding: '1.25rem',
                    borderRadius: 10,
                    overflowX: 'auto',
                    marginBottom: '1.5rem',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  }}
                >
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 }}
                  {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {children}
                </a>
              ),
              hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section style={{ marginTop: '3rem' }}>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '1.25rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
              }}
            >
              {isEN ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {post.faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '0.875rem 1.25rem',
                    background: 'var(--surface)',
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: 'var(--ink)',
                      fontSize: '0.975rem',
                      lineHeight: 1.45,
                    }}
                  >
                    {faq.question}
                  </summary>
                  <p
                    style={{
                      marginTop: '0.75rem',
                      color: 'var(--muted)',
                      lineHeight: 1.65,
                      fontSize: '0.9rem',
                    }}
                  >
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            background: 'var(--surface)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
            {isEN ? 'Ready to automate your business?' : 'İşletmenizi otomatize etmeye hazır mısınız?'}
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            {isEN
              ? 'Book a free 15-minute audit. No commitment, just clarity.'
              : 'Ücretsiz 15 dakikalık analiz randevusu alın. Taahhüt yok, sadece netlik.'}
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
      </article>
    </>
  );
}
