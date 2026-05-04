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
  return Math.ceil(wordCount / 200);
}

/**
 * Minimal YAML frontmatter parser.
 * Handles: string, number, boolean, quoted string, inline array ([a, b, c]),
 * and block-sequence (- item) values.
 * Also handles nested block mappings for the `faqs` key.
 * gray-matter + js-yaml v4 uyumsuzluğunu bypass eder.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const FENCE = /^---[ \t]*$/m;
  const lines = raw.split('\n');

  // ilk --- satırını bul
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^---[ \t]*$/.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return { data: {}, content: raw };

  // kapanış --- satırını bul
  let end = -1;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^---[ \t]*$/.test(lines[i])) { end = i; break; }
  }
  if (end === -1) return { data: {}, content: raw };

  const fmLines = lines.slice(start + 1, end);
  const content = lines.slice(end + 1).join('\n').trimStart();
  const data: Record<string, unknown> = {};

  let i = 0;
  while (i < fmLines.length) {
    const line = fmLines[i];

    // boş satır veya yorum
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) { i++; continue; }

    // üst-seviye key: value
    const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)/);
    if (!kvMatch) { i++; continue; }

    const key = kvMatch[1];
    const valRaw = kvMatch[2].trim();

    // boş değer → block sequence veya nested mapping
    if (valRaw === '') {
      // sonraki satırlar indent'li mi?
      const blockLines: string[] = [];
      i++;
      while (i < fmLines.length && /^[ \t]/.test(fmLines[i])) {
        blockLines.push(fmLines[i]);
        i++;
      }

      // - item listesi mi?
      if (blockLines.length > 0 && /^[ \t]*-[ \t]/.test(blockLines[0])) {
        // faqs gibi nested mapping kontrolü: - question: / answer:
        const firstItem = blockLines[0].replace(/^[ \t]*-[ \t]*/, '').trim();
        if (firstItem === '' || firstItem.includes(':')) {
          // nested object listesi — faqs için
          const items: Record<string, string>[] = [];
          let j = 0;
          let current: Record<string, string> | null = null;
          while (j < blockLines.length) {
            const bl = blockLines[j];
            const bulletMatch = bl.match(/^[ \t]*-[ \t]*(.*)/);
            if (bulletMatch) {
              if (current) items.push(current);
              current = {};
              const firstKV = bulletMatch[1].trim();
              if (firstKV) {
                const fkv = firstKV.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)/);
                if (fkv) current[fkv[1]] = stripQuotes(fkv[2].trim());
              }
            } else {
              // continuation key: value
              const contKV = bl.match(/^[ \t]+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)/);
              if (contKV && current) {
                // multi-line value: collect until next key
                let val = stripQuotes(contKV[2].trim());
                // check if next line is a continuation (no colon at start)
                let k = j + 1;
                while (k < blockLines.length) {
                  const nextBl = blockLines[k];
                  if (/^[ \t]*-/.test(nextBl)) break;
                  const nextKV = nextBl.match(/^[ \t]+([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
                  if (nextKV) break;
                  // indented continuation
                  val += ' ' + blockLines[k].trim();
                  k++;
                }
                j = k - 1;
                current[contKV[1]] = val;
              }
            }
            j++;
          }
          if (current) items.push(current);
          data[key] = items;
        } else {
          // basit string listesi
          data[key] = blockLines
            .map(bl => bl.replace(/^[ \t]*-[ \t]*/, '').trim())
            .map(stripQuotes)
            .filter(Boolean);
        }
      } else {
        // nested key:value block (şimdilik string olarak sakla)
        data[key] = blockLines.map(bl => bl.trim()).join(' ');
      }
      continue;
    }

    // inline array: [a, b, c]
    if (valRaw.startsWith('[')) {
      const inner = valRaw.replace(/^\[/, '').replace(/\].*$/, '');
      data[key] = inner.split(',').map(s => stripQuotes(s.trim())).filter(Boolean);
      i++;
      continue;
    }

    // scalar
    data[key] = parseScalar(valRaw);
    i++;
  }

  return { data, content };
}

function stripQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parseScalar(s: string): string | number | boolean {
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return stripQuotes(s);
}

export function getAllPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw as string);
      const slug = path.split('/').pop()!.replace('.md', '');
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? '',
        date: (data.date as string) ?? '2026-01-01',
        language: (data.language as 'en' | 'tr') ?? 'tr',
        tags: (data.tags as string[]) ?? [],
        cover: (data.cover as string) ?? '',
        readingTime: estimateReadingTime(content),
        content,
        faqs: (data.faqs as Array<{ question: string; answer: string }>) ?? undefined,
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
