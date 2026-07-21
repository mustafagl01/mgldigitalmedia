/**
 * prerender.mjs v2 - Static HTML pre-render for mgl-ai.com
 * Blog markdown content injected via noscript for GEO crawlers.
 * Perplexity/GPTBot/ClaudeBot can read real blog text without JS.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'blog');
const ACCOUNTING_CONTENT_FILE = join(ROOT, 'src', 'content', 'accounting-automation.json');
const SITE_URL = 'https://mgl-ai.com';
const DEFAULT_OG = `${SITE_URL}/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png`;

// Minimal markdown to HTML (zero deps)
function mdToHtml(md) {
  let html = md.replace(/^---[\s\S]*?---\n?/, '');
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  const blocks = html.split(/\n{2,}/);
  return blocks.map(b => {
    b = b.trim(); if (!b) return '';
    if (/^<(h[1-6]|pre|hr)/.test(b)) return b;
    if (b.includes('<li>')) return '<ul>' + b + '</ul>';
    return '<p>' + b.replace(/\n/g, ' ') + '</p>';
  }).filter(Boolean).join('\n');
}

function parseFrontmatter(raw) {
  const lines = raw.split('\n');
  let s = -1, e = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^---[ \t]*$/.test(lines[i])) { if (s === -1) s = i; else { e = i; break; } }
  }
  if (s === -1 || e === -1) return { data: {}, content: raw };
  const data = {};
  lines.slice(s+1, e).forEach(l => {
    const m = l.match(/^(\w+)\s*:\s*"?([^"\n]+)"?/);
    if (m) data[m[1]] = m[2].trim();
  });
  return { data, content: lines.slice(e+1).join('\n').trimStart() };
}

function loadBlogContent() {
  const map = {};
  if (!existsSync(CONTENT_DIR)) return map;
  readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md')).forEach(file => {
    const slug = file.replace('.md', '');
    try {
      const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
      const { data, content } = parseFrontmatter(raw);
      map[slug] = { title: data.title || '', description: data.description || '', date: data.date || '', content };
    } catch(e) { console.warn('[WARN] Cannot read:', file); }
  });
  return map;
}

const ROUTES = [
  { path: '/whatsapp-ai-asistan', lang: 'tr', title: 'WhatsApp AI Asistan | MGL Digital Media', description: 'WhatsApp AI asistan ile musteri sorularini 7/24 yanitlayin.', keywords: 'whatsapp ai asistan, whatsapp bot, evolution api, n8n' },
  { path: '/sesli-ai', lang: 'tr', title: 'Sesli AI Telefon Asistani | MGL Digital Media', description: 'Retell AI ile sesli AI telefon asistani. 7/24.', keywords: 'sesli ai, voice ai, retell ai, telefon asistani' },
  { path: '/n8n-otomasyon', lang: 'tr', title: 'n8n Otomasyon Ajansi | MGL Digital Media', description: 'n8n ile is akislarinizi otomatize edin.', keywords: 'n8n otomasyon, workflow, crm entegrasyon' },
  { path: '/lead-uretimi', lang: 'tr', title: 'AI ile Lead Uretimi | MGL Digital Media', description: 'Google Maps, Apollo tabanli lead uretim pipeline.', keywords: 'lead uretimi, lead generation, apollo, google maps' },
  { path: '/accounting-automation-uk', lang: 'en', title: 'AI Automation for Accounting and Tax Firms UK | MGL AI', description: 'Custom AI automation for UK accounting and tax firms: Companies House deadline monitoring, document collection, client reminders, receivables follow-up and CRM reporting.', keywords: 'AI automation for accounting firms UK, accounting deadline reminder system, Companies House deadline automation, accountant document collection automation' },
  { path: '/n8n-vs-zapier', lang: 'tr', title: 'N8N vs Zapier: 2026 | MGL', description: 'N8N ve Zapier karsilastirmasi.', keywords: 'n8n vs zapier, otomasyon karsilastirma, kobi' },
  { path: '/whatsapp-cloud-api-vs-baileys', lang: 'en', title: 'WhatsApp Cloud API vs Baileys/Evolution API | MGL', description: 'Comparison of WhatsApp Cloud API vs Baileys.', keywords: 'whatsapp cloud api, baileys, evolution api' },
  { path: '/voiceflow-vs-retell-ai', lang: 'en', title: 'Voiceflow vs Retell AI: 2026 | MGL', description: 'Comparison of Voiceflow and Retell AI.', keywords: 'voiceflow vs retell ai, voice agent platform' },
  { path: '/uk-ai-agencies-comparison', lang: 'en', title: 'UK AI Agencies Comparison 2026 | MGL', description: 'Comparison of UK AI automation agencies.', keywords: 'uk ai agency, ai automation agency london' },
  { path: '/services', lang: 'tr', title: 'Hizmetler | MGL Digital Media', description: 'WhatsApp AI, sesli asistan, n8n otomasyon, lead uretimi.', keywords: 'ai hizmetleri, otomasyon, whatsapp bot' },
  { path: '/pricing', lang: 'en', title: 'Pricing | MGL Digital Media', description: 'Transparent fixed pricing for AI automation.', keywords: 'ai agency pricing, automation pricing' },
  { path: '/packages', lang: 'en', title: 'Packages | MGL Digital Media', description: 'AI Automation packages for UK and Turkish SMBs.', keywords: 'ai automation packages, agency packages' },
  { path: '/solutions', lang: 'tr', title: 'Sektore Ozel AI Cozumleri | MGL Digital Media', description: 'Klinik, emlak, e-ticaret icin AI otomasyon.', keywords: 'sektore ozel ai, klinik otomasyonu' },
  { path: '/solutions/klinik', lang: 'tr', title: 'Klinik Cagri Otomasyonu ve AI Resepsiyonist | MGL AI', description: 'Klinikler icin mesai disi cagri, WhatsApp, randevu, hatirlatma ve insan ekibe aktarim otomasyonu.', keywords: 'klinik otomasyonu, mesai disi cagri cevaplama, AI resepsiyonist, randevu asistani' },
  { path: '/solutions/emlak', lang: 'tr', title: 'Emlak Lead ve Musteri Takip Otomasyonu | MGL AI', description: 'Emlak ofisleri icin cevapsiz cagri, ilan sorusu, musteri kriteri, randevu ve CRM takip otomasyonu.', keywords: 'emlak otomasyonu, emlak musteri takip sistemi, cevapsiz cagri WhatsApp, emlak AI asistani' },
  { path: '/solutions/eticaret', lang: 'tr', title: 'E-ticaret Musteri Hizmetleri ve Sepet Otomasyonu | MGL AI', description: 'E-ticaret firmalari icin WhatsApp destek, siparis sorulari, sepet kurtarma ve CRM otomasyonu.', keywords: 'eticaret otomasyonu, sepet terk otomasyonu, WhatsApp musteri hizmetleri, siparis takip botu' },
  { path: '/solutions/guzellik', lang: 'tr', title: 'Guzellik Salonu Randevu ve Hatirlatma Otomasyonu | MGL AI', description: 'Guzellik salonlari icin 7/24 randevu, WhatsApp yaniti, hatirlatma, yorum ve musteri takip otomasyonu.', keywords: 'guzellik salonu otomasyonu, randevu asistani, WhatsApp randevu botu' },
  { path: '/solutions/restoran', lang: 'tr', title: 'Restoran WhatsApp Rezervasyon Otomasyonu | MGL AI', description: 'Restoran ve kafeler icin rezervasyon, telefon ve WhatsApp yaniti, hatirlatma ve yorum otomasyonu.', keywords: 'restoran rezervasyon otomasyonu, WhatsApp rezervasyon, restoran AI asistani' },
  { path: '/blog', lang: 'tr', title: 'Blog - AI Otomasyon | MGL Digital Media', description: 'AI otomasyon ve dijital pazarlama rehberleri.', keywords: 'ai blog, otomasyon blog, n8n rehber' },
  { path: '/blog/whatsapp-ai-asistan-isletme-otomasyonu-2026', lang: 'tr', title: 'WhatsApp AI Asistan ile Isletme Otomasyonu: 2026 | MGL', description: 'WhatsApp AI asistan nedir, nasil kurulur?', keywords: 'whatsapp ai asistan, evolution api, n8n', ogType: 'article', blogSlug: 'whatsapp-ai-asistan-isletme-otomasyonu-2026' },
  { path: '/blog/n8n-vs-zapier-turkce-rehber', lang: 'tr', title: 'N8N vs Zapier: 2026 Turkce Rehber | MGL', description: 'N8N ve Zapier Turkce karsilastirmasi.', keywords: 'n8n vs zapier, n8n turkce', ogType: 'article', blogSlug: 'n8n-vs-zapier-turkce-rehber' },
  { path: '/blog/sesli-ai-telefon-asistani-rehberi', lang: 'tr', title: 'Sesli AI Telefon Asistani: Tam Rehber (2026) | MGL', description: 'Sesli AI asistan nedir?', keywords: 'sesli ai asistan, retell ai, voice ai', ogType: 'article', blogSlug: 'sesli-ai-telefon-asistani-rehberi' },
  { path: '/blog/kobi-icin-ai-otomasyon-2026', lang: 'tr', title: 'KOBIler icin AI Otomasyon: 2026 Yol Haritasi | MGL', description: 'KOBIler icin AI otomasyona nasil baslanir?', keywords: 'kobi ai otomasyon, yapay zeka kobi', ogType: 'article', blogSlug: 'kobi-icin-ai-otomasyon-2026' },
  { path: '/blog/how-to-set-up-whatsapp-ai-agent-uk', lang: 'en', title: 'How to Set Up a WhatsApp AI Agent for UK Business | MGL', description: 'WhatsApp AI chatbot for UK SMBs using Evolution API and n8n.', keywords: 'whatsapp ai agent uk, evolution api, n8n uk', ogType: 'article', blogSlug: 'how-to-set-up-whatsapp-ai-agent-uk' },
];

const STATIC_ROUTE_CONTENT = {
  '/whatsapp-ai-asistan': {
    heading: 'Müşterilere WhatsApp üzerinden otomatik cevap veren yapay zeka asistanı',
    answer: 'MGL AI; işletmenin ürün, hizmet, çalışma saati ve kurallarına göre WhatsApp mesajlarını yanıtlayan, müşteri bilgisini alan, randevu oluşturabilen ve gerektiğinde konuşmayı personele aktaran asistanlar kurar.',
    bullets: ['7/24 sık sorulan sorulara yanıt', 'Randevu ve lead toplama', 'CRM, takvim ve ekip bildirimi', 'Belirsiz konuşmalarda insan devri'],
  },
  '/sesli-ai': {
    heading: 'Mesai dışında telefona cevap veren yapay zeka asistanı',
    answer: 'Sesli AI asistan gelen çağrıyı karşılayabilir, arama sebebini öğrenebilir, uygun saatleri kontrol edebilir, randevu talebi oluşturabilir ve görüşme özetini ekibe gönderebilir. Hassas veya kapsam dışı konular personele aktarılır.',
    bullets: ['Gelen çağrı karşılama', 'Randevu ve geri arama talebi', 'Görüşme özeti', 'İnsan ekibe yönlendirme'],
  },
  '/n8n-otomasyon': {
    heading: 'İşletmedeki tekrar eden işleri birbirine bağlayan n8n otomasyonu',
    answer: 'MGL AI; e-posta, CRM, Excel, Google Sheets, takvim, ödeme ve mesajlaşma araçları arasında çalışan n8n iş akışları kurar. Amaç elle veri taşımayı, unutulan takibi ve tekrar eden bildirim işini azaltmaktır.',
    bullets: ['Excel ve Google Sheets akışları', 'CRM ve e-posta senkronizasyonu', 'Zamanlanmış bildirim ve raporlar', 'API bağlantıları ve insan onayı'],
  },
  '/lead-uretimi': {
    heading: 'İşletmeler için hedef müşteri listesi ve takip sistemi',
    answer: 'MGL AI; hedef sektör ve bölgeye göre kamuya açık işletme kaynaklarından aday listesi oluşturma, tekrarları temizleme, iletişim bilgisini doğrulama ve sonucu CRM ya da tabloya aktarma akışları geliştirir.',
    bullets: ['Sektör ve bölge bazlı arama', 'Tekrar temizleme', 'Kaynak ve iletişim doğrulama', 'CRM veya tablo çıktısı'],
  },
  '/solutions': {
    heading: 'Sektöre göre değil, işletmenin gerçek sorununa göre AI otomasyon',
    answer: 'MGL AI klinik, muhasebe, emlak, e-ticaret, güzellik ve restoran işletmelerinin müşteri iletişimi, randevu, belge, tahsilat, takip ve raporlama süreçlerini mevcut araçlarına bağlanan otomasyonlarla düzenler.',
    bullets: ['Klinik ve randevu otomasyonu', 'Muhasebe ve evrak takibi', 'Emlak lead takibi', 'E-ticaret ve müşteri desteği', 'Restoran rezervasyonu'],
  },
  '/solutions/klinik': {
    heading: 'Klinikler için mesai dışı çağrı ve randevu otomasyonu',
    answer: 'Sistem telefon, WhatsApp veya web üzerinden gelen hasta adayını karşılar; klinik bilgi sınırları içinde soruları yanıtlar, ilgilendiği hizmeti ve uygun zamanı alır, randevu oluşturur veya personele aktarır. Tıbbi tavsiye vermez.',
    bullets: ['Mesai dışı çağrı ve mesaj yanıtı', 'Takvimden randevu oluşturma', 'Hatırlatma ve yeniden planlama', 'Klinik sorularda insan devri'],
  },
  '/solutions/emlak': {
    heading: 'Emlak ofisleri için cevapsız çağrı ve müşteri takip otomasyonu',
    answer: 'Sistem ilan sorularına yanıt verir, müşterinin bütçe ve bölge kriterlerini toplar, görüşme veya gösterim talebini kaydeder ve emlak danışmanına CRM özeti gönderir.',
    bullets: ['Cevapsız çağrı sonrası otomatik dönüş', 'İlan ve kriter toplama', 'Gösterim randevusu', 'CRM ve danışman bildirimi'],
  },
  '/solutions/eticaret': {
    heading: 'E-ticaret için sipariş sorusu, WhatsApp destek ve sepet takibi',
    answer: 'MGL AI e-ticaret işletmeleri için sipariş durumu, ürün soruları, iade yönlendirmesi ve izinli sepet hatırlatmalarını mağaza, CRM ve mesajlaşma kanallarına bağlayan sistemler kurar.',
    bullets: ['Sipariş ve ürün sorularına yanıt', 'İade süreci yönlendirmesi', 'İzinli sepet hatırlatması', 'İnsan destek ekibine aktarım'],
  },
  '/solutions/guzellik': {
    heading: 'Güzellik salonları için WhatsApp randevu ve müşteri hatırlatma sistemi',
    answer: 'Sistem hizmet, uzman ve saat bilgisini kullanarak randevu talebi alır, takvime işler, müşteriye hatırlatma gönderir ve iptal ya da değişiklikleri ekibe bildirir.',
    bullets: ['WhatsApp randevu alma', 'Otomatik hatırlatma', 'İptal ve değişiklik yönetimi', 'Hizmet sonrası yorum talebi'],
  },
  '/solutions/restoran': {
    heading: 'Restoranlar için telefon ve WhatsApp rezervasyon asistanı',
    answer: 'Sistem müsaitlik kurallarına göre rezervasyon talebi alabilir, kişi sayısı ve saati kaydedebilir, onay ve hatırlatma gönderebilir, özel talepleri personele iletebilir.',
    bullets: ['Telefon ve WhatsApp rezervasyonu', 'Onay ve hatırlatma', 'Özel talepleri personele iletme', 'Çalışma saati dışı yanıt'],
  },
};

function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function replaceMetaContent(html, attrType, attrValue, newContent) {
  const re = new RegExp(`(<meta\\s+${escRegex(attrType)}="${escRegex(attrValue)}"\\s+content=")[^"]*("\\s*/?>)`, 'g');
  const re2 = new RegExp(`(<meta\\s+content="[^"]*"\\s+${escRegex(attrType)}="${escRegex(attrValue)}"\\s*/?>)`, 'g');
  if (re.test(html)) return html.replace(re, `$1${escHtml(newContent)}$2`);
  if (re2.test(html)) return html.replace(re2, m => m.replace(/content="[^"]*"/, `content="${escHtml(newContent)}"`));
  return html;
}

function injectMeta(html, route) {
  const { path, lang = 'tr', title, description, keywords = '', ogType = 'website' } = route;
  const locale = lang === 'en' ? 'en_GB' : 'tr_TR';
  const canonicalUrl = `${SITE_URL}${path}`;
  let out = html;
  out = out.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${lang}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);
  out = replaceMetaContent(out, 'name', 'description', description);
  if (keywords) out = replaceMetaContent(out, 'name', 'keywords', keywords);
  out = out.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  out = out.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"[^>]*>/g, m => {
    if (m.includes('x-default')) return `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`;
    return `<link rel="alternate" hreflang="${lang === 'en' ? 'en' : 'tr'}" href="${canonicalUrl}" />`;
  });
  out = replaceMetaContent(out, 'property', 'og:type', ogType);
  out = replaceMetaContent(out, 'property', 'og:locale', locale);
  out = replaceMetaContent(out, 'property', 'og:locale:alternate', lang === 'en' ? 'tr_TR' : 'en_GB');
  out = replaceMetaContent(out, 'property', 'og:url', canonicalUrl);
  out = replaceMetaContent(out, 'property', 'og:title', title);
  out = replaceMetaContent(out, 'property', 'og:description', description);
  out = replaceMetaContent(out, 'property', 'og:image', DEFAULT_OG);
  out = replaceMetaContent(out, 'property', 'og:image:alt', title);
  out = replaceMetaContent(out, 'name', 'twitter:title', title);
  out = replaceMetaContent(out, 'name', 'twitter:description', description);
  out = replaceMetaContent(out, 'name', 'twitter:image', DEFAULT_OG);
  return out;
}

function injectBlogContent(html, route, blogMap) {
  if (!route.blogSlug) return html;
  const post = blogMap[route.blogSlug];
  if (!post || !post.content) return html;
  const articleHtml = mdToHtml(post.content);
  const dateStr = post.date ? `<time datetime="${post.date}">${post.date}</time>` : '';
  const noscriptBlock = `<noscript id="ssr-blog-content">
<article style="font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:2rem 1.5rem;line-height:1.7;color:#1a1a1a;">
<h1 style="font-size:1.75rem;font-weight:700;margin-bottom:0.5rem;">${escHtml(post.title || route.title)}</h1>
${dateStr ? `<p style="color:#666;margin-bottom:2rem;">${dateStr}</p>` : ''}
${articleHtml}
</article>
</noscript>`;
  const withoutHome = html.replace(/\s*<noscript id="ssr-home-content">[\s\S]*?<\/noscript>/, '');
  return withoutHome.replace(/(<body[^>]*>)/, `$1\n${noscriptBlock}`);
}

function accountingStaticContent() {
  const data = JSON.parse(readFileSync(ACCOUNTING_CONTENT_FILE, 'utf-8'));
  return {
    heading: data.heading,
    answer: `${data.answer} ${data.fit}`,
    bullets: data.capabilities.map((item) => `${item.title}: ${item.body}`),
    sections: [
      { heading: 'Example workflow', items: data.workflow },
      { heading: 'Supported connections', items: data.integrations },
      { heading: 'Control and safeguards', items: data.safeguards },
    ],
    faqs: data.faqs,
    sources: data.sources,
    updated: data.updated,
  };
}

function injectStaticRouteContent(html, route) {
  const content = route.path === '/accounting-automation-uk'
    ? accountingStaticContent()
    : STATIC_ROUTE_CONTENT[route.path];
  if (!content) return html;

  const bullets = (content.bullets || []).map((item) => `<li>${escHtml(item)}</li>`).join('');
  const sections = (content.sections || []).map((section) => (
    `<section><h2>${escHtml(section.heading)}</h2><ul>${section.items.map((item) => `<li>${escHtml(item)}</li>`).join('')}</ul></section>`
  )).join('');
  const faqs = (content.faqs || []).map((item) => (
    `<section><h3>${escHtml(item.question)}</h3><p>${escHtml(item.answer)}</p></section>`
  )).join('');
  const sources = (content.sources || []).map((source) => (
    `<li><a href="${escHtml(source.url)}">${escHtml(source.label)}</a></li>`
  )).join('');
  const sourceBlock = sources ? `<section><h2>Primary references</h2><ul>${sources}</ul></section>` : '';
  const updated = content.updated ? `<p>Reviewed ${escHtml(content.updated)} by Mustafa Gul, MGL Digital Media Ltd.</p>` : '';
  const noscriptBlock = `<noscript id="ssr-route-content"><article style="font-family:system-ui,sans-serif;max-width:900px;margin:0 auto;padding:2rem 1.5rem;line-height:1.7;color:#1a1a1a"><h1>${escHtml(content.heading)}</h1><p>${escHtml(content.answer)}</p>${updated}<h2>Capabilities</h2><ul>${bullets}</ul>${sections}${faqs}${sourceBlock}<p>Provider: MGL Digital Media Ltd, UK Company No. 16007414. <a href="https://mgl-ai.com/">mgl-ai.com</a></p></article></noscript>`;

  let out = html.replace(/\s*<noscript id="ssr-home-content">[\s\S]*?<\/noscript>/, '');
  out = out.replace(/(<body[^>]*>)/, `$1\n${noscriptBlock}`);

  if (route.path === '/accounting-automation-uk') {
    const data = JSON.parse(readFileSync(ACCOUNTING_CONTENT_FILE, 'utf-8'));
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'AI automation for accounting and tax firms',
          description: data.answer,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'United Kingdom' },
          url: `${SITE_URL}${route.path}`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: data.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    };
    out = out.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`);
  }
  return out;
}

const indexPath = join(DIST, 'index.html');
if (!existsSync(indexPath)) { console.error('ERROR: dist/index.html not found.'); process.exit(1); }

const baseHtml = readFileSync(indexPath, 'utf-8');
const blogMap = loadBlogContent();
console.log(`\nPrerender starting - ${ROUTES.length} routes | Blog posts: ${Object.keys(blogMap).length}\n`);

let ok = 0, fail = 0;
for (const route of ROUTES) {
  try {
    let injected = injectMeta(baseHtml, route);
    injected = injectBlogContent(injected, route, blogMap);
    injected = injectStaticRouteContent(injected, route);
    const routeDir = join(DIST, route.path);
    mkdirSync(routeDir, { recursive: true });
    writeFileSync(join(routeDir, 'index.html'), injected, 'utf-8');
    const hasBlog = route.blogSlug && injected.includes('ssr-blog-content');
    console.log(`  [OK] ${route.path}${hasBlog ? ' +blog-content' : ''}`);
    ok++;
  } catch (err) {
    console.error(`  [FAIL] ${route.path} - ${err.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} OK, ${fail} FAIL\n`);
if (fail > 0) process.exit(1);
