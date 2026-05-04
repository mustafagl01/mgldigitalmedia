import matter from 'gray-matter';

// Vite import.meta.glob ile tüm .md dosyalarını raw string olarak yükle
const modules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  language: 'en' | 'tr';
  tags: string[];
  cover: string;
  readingTime: number;
  content: string;
  faqs?: Array<{ question: string; answer: string }>;
}

function estimateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200); // 200 kelime/dakika
}

export function getAllPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = matter(raw as string);
      const slug = path.split('/').pop()!.replace('.md', '');
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date ?? '2026-01-01',
        language: data.language ?? 'tr',
        tags: data.tags ?? [],
        cover: data.cover ?? '',
        readingTime: estimateReadingTime(content),
        content,
        faqs: data.faqs ?? undefined,
      } as BlogPost;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByLanguage(lang: 'tr' | 'en'): BlogPost[] {
  return getAllPosts().filter((p) => p.language === lang);
}
