/**
 * prerender.mjs — Static HTML pre-render for mgl-ai.uk
 *
 * Her route için dist/index.html'i kopyalar ve route-spesifik
 * <title>, <meta description>, <link rel="canonical">, OG tag'lerini inject eder.
 * react-snap veya Puppeteer gerektirmez — saf Node.js.
 *
 * Kullanım:
 *   node scripts/prerender.mjs
 *
 * package.json postbuild hook'una ekle:
 *   "postbuild": "node scripts/prerender.mjs"
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://mgl-ai.uk';
const DEFAULT_OG = `${SITE_URL}/00bc7320-6f8f-42ae-a0b7-0c24b609e70f.png`;

// ─── Route tanımları ────────────────────────────────────────────────────────
const ROUTES = [
  // ── Servis sayfaları
  {
    path: '/whatsapp-ai-asistan',
    lang: 'tr',
    title: 'WhatsApp AI Asistan | MGL Digital Media',
    description:
      'WhatsApp AI asistan ile müşteri sorularını 7/24 yanıtlayın, randevu alın, sipariş yönetin. Evolution API + n8n tabanlı gerçek kurulum. Ücretsiz demo.',
    keywords: 'whatsapp ai asistan, whatsapp bot, evolution api, n8n, otomasyon, chatbot',
  },
  {
    path: '/sesli-ai',
    lang: 'tr',
    title: 'Sesli AI Telefon Asistanı | MGL Digital Media',
    description:
      'Retell AI ile sesli AI telefon asistanı kurun. Çağrı karşılama, randevu alma, FAQ yanıtlama — 7/24 insan gibi. UK ve Türkiye işletmeleri için.',
    keywords: 'sesli ai, voice ai, retell ai, telefon asistanı, çağrı merkezi otomasyonu',
  },
  {
    path: '/n8n-otomasyon',
    lang: 'tr',
    title: 'n8n Otomasyon Ajansı | MGL Digital Media',
    description:
      'n8n ile iş akışlarınızı otomatize edin. CRM entegrasyonu, lead yönetimi, bildirim sistemleri. UK merkezli n8n uzmanı ekip.',
    keywords: 'n8n otomasyon, workflow otomasyon, iş akışı, crm entegrasyon, n8n ajansı',
  },
  {
    path: '/lead-uretimi',
    lang: 'tr',
    title: 'AI ile Lead Üretimi | MGL Digital Media',
    description:
      'Google Maps, Apollo ve AI tabanlı lead üretim pipeline. Enrichment, dedupe, cold outreach otomasyonu. UK ve TR pazarları için.',
    keywords: 'lead üretimi, lead generation, apollo, google maps, cold email, outreach',
  },

  // ── Karşılaştırma sayfaları
  {
    path: '/n8n-vs-zapier',
    lang: 'tr',
    title: "N8N vs Zapier: 2026'da KOBİ'ler için Hangisi Daha İyi? | MGL",
    description:
      "N8N ve Zapier'ı fiyat, özellik, Türkçe destek ve KOBİ uyumu açısından karşılaştırdık. Hangi otomasyon aracı sizin için doğru?",
    keywords: 'n8n vs zapier, n8n karşılaştırma, zapier alternatif, otomasyon araçları, kobi',
  },
  {
    path: '/whatsapp-cloud-api-vs-baileys',
    lang: 'en',
    title: 'WhatsApp Cloud API vs Baileys/Evolution API: Which is Right for Your Business? | MGL',
    description:
      'Complete comparison of WhatsApp Cloud API (Meta) vs Baileys/Evolution API. Cost, compliance, features, and which to choose for your SMB.',
    keywords: 'whatsapp cloud api, baileys, evolution api, whatsapp business, comparison',
  },
  {
    path: '/voiceflow-vs-retell-ai',
    lang: 'en',
    title: 'Voiceflow vs Retell AI: Voice Agent Platform Comparison 2026 | MGL',
    description:
      'In-depth comparison of Voiceflow and Retell AI for building voice agents. Features, pricing, latency, and which platform suits UK SMBs.',
    keywords: 'voiceflow vs retell ai, voice agent platform, voice ai comparison, retell ai',
  },
  {
    path: '/uk-ai-agencies-comparison',
    lang: 'en',
    title: 'UK AI Agencies Comparison 2026: Who Actually Delivers? | MGL',
    description:
      'Honest comparison of UK AI automation agencies — pricing, services, transparency and results. See how MGL stacks up against the competition.',
    keywords: 'uk ai agency, ai automation agency london, ai agency comparison, mgl digital media',
  },

  // ── Genel sayfalar
  {
    path: '/services',
    lang: 'tr',
    title: 'Hizmetler | MGL Digital Media',
    description:
      'WhatsApp AI, sesli asistan, n8n otomasyon, lead üretimi, Meta & Google reklam, dönüşüm odaklı web tasarımı. Tek sistem, tam otomasyon.',
    keywords: 'ai hizmetleri, otomasyon hizmetleri, whatsapp bot, sesli asistan, reklam yönetimi',
  },
  {
    path: '/pricing',
    lang: 'en',
    title: 'Pricing | MGL Digital Media — Fixed Price AI Automation',
    description:
      'Transparent fixed pricing for AI automation services. WhatsApp agents, voice AI, n8n workflows, web design and ads. No hidden fees.',
    keywords: 'ai agency pricing, automation pricing, whatsapp ai price, n8n pricing, uk ai agency',
  },
  {
    path: '/packages',
    lang: 'en',
    title: 'Packages | MGL Digital Media — AI Automation Bundles',
    description:
      'Choose from our AI Automation, Ads, and Web packages. Fixed price bundles for UK and Turkish SMBs. No lock-in, results guaranteed.',
    keywords: 'ai automation packages, agency packages, ads management, web design package',
  },
  {
    path: '/solutions',
    lang: 'tr',
    title: 'Sektöre Özel AI Çözümleri | MGL Digital Media',
    description:
      'Klinik, emlak, e-ticaret, güzellik merkezi ve restoran için özelleştirilmiş AI otomasyon çözümleri. Sektörünüze özel demo.',
    keywords: 'sektöre özel ai, klinik otomasyonu, emlak ai, e-ticaret otomasyon, restoran bot',
  },

  // ── Blog listesi
  {
    path: '/blog',
    lang: 'tr',
    title: 'Blog — AI Otomasyon & Dijital Pazarlama | MGL Digital Media',
    description:
      'WhatsApp AI, sesli asistanlar, n8n otomasyon ve dijital pazarlama üzerine uzman rehberleri. UK ve Türkiye işletmeleri için pratik içerikler.',
    keywords: 'ai blog, otomasyon blog, whatsapp ai, n8n rehber, dijital pazarlama',
  },

  // ── Blog yazıları
  {
    path: '/blog/whatsapp-ai-asistan-isletme-otomasyonu-2026',
    lang: 'tr',
    title: 'WhatsApp AI Asistan ile İşletme Otomasyonu: 2026 Tam Rehberi | MGL',
    description:
      'WhatsApp AI asistan nedir, nasıl kurulur, hangi işletmelere uygun? Evolution API + n8n tabanlı gerçek kurulum rehberi ve 2026 maliyet analizi.',
    keywords: 'whatsapp ai asistan, evolution api, n8n, işletme otomasyonu, whatsapp bot kurulum',
    ogType: 'article',
  },
  {
    path: '/blog/n8n-vs-zapier-turkce-rehber',
    lang: 'tr',
    title: "N8N vs Zapier: 2026'da Türkiye'de KOBİ'ler için Hangisi Daha İyi? | MGL",
    description:
      "N8N ve Zapier'ı fiyat, özellik, Türkçe destek ve KOBİ uyumu açısından karşılaştırdık. Hangi otomasyon aracı sizin için doğru?",
    keywords: 'n8n vs zapier, n8n türkçe, zapier alternatif, otomasyon karşılaştırma',
    ogType: 'article',
  },
  {
    path: '/blog/sesli-ai-telefon-asistani-rehberi',
    lang: 'tr',
    title: "Sesli AI Telefon Asistanı: KOBİ'ler için Tam Rehber (2026) | MGL",
    description:
      'Sesli AI asistan nedir, nasıl çalışır, Retell AI ile nasıl kurulur? Türkiye ve UK işletmeleri için maliyet, özellik ve kurulum rehberi.',
    keywords: 'sesli ai asistan, retell ai, voice ai, telefon asistanı, çağrı otomasyonu',
    ogType: 'article',
  },
  {
    path: '/blog/kobi-icin-ai-otomasyon-2026',
    lang: 'tr',
    title: "KOBİ'ler için AI Otomasyon: 2026 Pratik Yol Haritası | MGL",
    description:
      'Küçük ve orta ölçekli işletmeler için yapay zeka otomasyona nereden başlanır, hangi araçlar seçilir ve ROI nasıl hesaplanır? Adım adım 2026 rehberi.',
    keywords: 'kobi ai otomasyon, yapay zeka kobi, ai yol haritası, dijital dönüşüm',
    ogType: 'article',
  },
  {
    path: '/blog/how-to-set-up-whatsapp-ai-agent-uk',
    lang: 'en',
    title: 'How to Set Up a WhatsApp AI Agent for Your UK Business in 30 Minutes | MGL',
    description:
      'Step-by-step guide to deploying a WhatsApp AI chatbot for UK SMBs using Evolution API and n8n. No coding required.',
    keywords: 'whatsapp ai agent uk, whatsapp chatbot setup, evolution api, n8n uk, sme automation',
    ogType: 'article',
  },
];

// ─── Yardımcı: meta tag replacement ─────────────────────────────────────────
function injectMeta(html, route) {
  const {
    path,
    lang = 'tr',
    title,
    description,
    keywords = '',
    ogType = 'website',
  } = route;

  const locale = lang === 'en' ? 'en_GB' : 'tr_TR';
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImageUrl = DEFAULT_OG;

  let out = html;

  // <html lang>
  out = out.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${lang}"`);

  // <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  // description
  out = replaceMetaContent(out, 'name', 'description', description);

  // keywords
  if (keywords) {
    out = replaceMetaContent(out, 'name', 'keywords', keywords);
  }

  // canonical
  out = out.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );

  // hreflang — güncelle veya ekle (mevcut href'i değiştir)
  const hreflangHref = lang === 'en' ? canonicalUrl : canonicalUrl;
  out = out.replace(
    /<link rel="alternate" hreflang="[^"]*" href="[^"]*"[^>]*>/g,
    (match) => {
      if (match.includes('x-default')) {
        return `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`;
      }
      return `<link rel="alternate" hreflang="${lang === 'en' ? 'en' : 'tr'}" href="${canonicalUrl}" />`;
    },
  );

  // OG tags
  const localeAlternate = lang === 'en' ? 'tr_TR' : 'en_GB';
  out = replaceMetaContent(out, 'property', 'og:type', ogType);
  out = replaceMetaContent(out, 'property', 'og:locale', locale);
  out = replaceMetaContent(out, 'property', 'og:locale:alternate', localeAlternate);
  out = replaceMetaContent(out, 'property', 'og:url', canonicalUrl);
  out = replaceMetaContent(out, 'property', 'og:title', title);
  out = replaceMetaContent(out, 'property', 'og:description', description);
  out = replaceMetaContent(out, 'property', 'og:image', ogImageUrl);
  out = replaceMetaContent(out, 'property', 'og:image:alt', title);

  // Twitter tags
  out = replaceMetaContent(out, 'name', 'twitter:title', title);
  out = replaceMetaContent(out, 'name', 'twitter:description', description);
  out = replaceMetaContent(out, 'name', 'twitter:image', ogImageUrl);

  return out;
}

function replaceMetaContent(html, attrType, attrValue, newContent) {
  // <meta name="X" content="Y"> veya <meta property="X" content="Y">
  const re = new RegExp(
    `(<meta\\s+${attrType}="${escRegex(attrValue)}"\\s+content=")[^"]*("\\s*/?>)`,
    'g',
  );
  const re2 = new RegExp(
    `(<meta\\s+content="[^"]*"\\s+${attrType}="${escRegex(attrValue)}"\\s*/?>)`,
    'g',
  );

  let out = html;
  if (re.test(html)) {
    out = out.replace(re, `$1${escHtml(newContent)}$2`);
  } else if (re2.test(html)) {
    // content-first attribute order — daha az yaygın ama güvenli taraf
    out = out.replace(re2, (m) =>
      m.replace(/content="[^"]*"/, `content="${escHtml(newContent)}"`),
    );
  }
  return out;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Ana akış ────────────────────────────────────────────────────────────────
const indexPath = join(DIST, 'index.html');
if (!existsSync(indexPath)) {
  console.error('HATA: dist/index.html bulunamadı. Önce `npm run build` çalıştırın.');
  process.exit(1);
}

const baseHtml = readFileSync(indexPath, 'utf-8');
console.log(`\nPrerender başlıyor — ${ROUTES.length} route\n`);

let ok = 0;
let fail = 0;

for (const route of ROUTES) {
  try {
    const injected = injectMeta(baseHtml, route);

    // dist/{route}/index.html yolunu oluştur
    const routeDir = join(DIST, route.path);
    mkdirSync(routeDir, { recursive: true });
    const outPath = join(routeDir, 'index.html');
    writeFileSync(outPath, injected, 'utf-8');

    // Hızlı kontrol: canonical doğru inject edildi mi?
    const expectedCanonical = `href="${SITE_URL}${route.path}"`;
    if (!injected.includes(expectedCanonical)) {
      console.warn(`  [UYARI] Canonical inject edilemedi: ${route.path}`);
    }

    console.log(`  [OK] ${route.path}`);
    ok++;
  } catch (err) {
    console.error(`  [FAIL] ${route.path} — ${err.message}`);
    fail++;
  }
}

console.log(`\nTamamlandı: ${ok} OK, ${fail} FAIL\n`);
if (fail > 0) process.exit(1);
