"""Okunabilirlik denetimi: her sayfadaki görünür metnin kendi zeminine karşı WCAG kontrastı.
Eşik: normal metin 4.5:1, büyük metin (>=24px ya da >=18.66px kalın) 3:1.
Zemin: elemandan yukarı doğru ilk opak arka plan rengi (görsel üstündeki metin "görsel" diye ayrı raporlanır).
Kullanım: python scripts/v3_kontrast_denetim.py <base-url> [yol1,yol2,...]
Çıktı: project_logs/kontrast_denetim.json + özet.
"""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
BASE = sys.argv[1].rstrip("/")
ROOT = Path(__file__).resolve().parent.parent
DEFAULT = ["/", "/otomasyon", "/otomasyon/talep-yakalama", "/otomasyon/randevu-hatirlatma", "/otomasyon/odeme-takibi", "/otomasyon/evrak-toplama",
           "/otomasyon/yorum-isteme", "/ureticiler", "/asistanlar", "/web-ve-reklam", "/fiyatlandirma", "/isler", "/hakkimizda", "/iletisim",
           "/gizlilik-ve-guvenlik", "/blog", "/legal", "/solutions/klinik", "/lead-uretimi", "/ai-musteri-bulma-mail-takip", "/n8n-vs-zapier"]
PATHS = sys.argv[2].split(",") if len(sys.argv) > 2 else DEFAULT
PATHS = PATHS + ["/en" + p if p != "/" else "/en/" for p in PATHS]

JS = r"""
() => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(Number); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lum = ({r,g,b}) => { const f = v => { v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
  const blend = (top, bot) => ({ r: top.r*top.a + bot.r*(1-top.a), g: top.g*top.a + bot.g*(1-top.a), b: top.b*top.a + bot.b*(1-top.a), a: 1 });
  const bgOf = (el) => {
    let layers = []; let n = el; let overImage = false;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !cs.backgroundImage.startsWith('linear-gradient')) overImage = true;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 0.99) break; }
      n = n.parentElement;
    }
    let bg = {r:255,g:255,b:255,a:1};
    for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return { bg, overImage };
  };
  const out = []; const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const t = walker.currentNode; const txt = t.textContent.trim(); if (txt.length < 2) continue;
    const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    if (el.closest('[aria-hidden="true"], .v3-hero__bg, script, style, noscript')) continue;
    let fg = parse(cs.color); if (!fg) continue;
    let op = 1; let n = el; while (n && n !== document.body) { op *= parseFloat(getComputedStyle(n).opacity || '1'); n = n.parentElement; }
    const { bg, overImage } = bgOf(el);
    fg = blend({...fg, a: fg.a * op}, bg);
    const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const size = parseFloat(cs.fontSize); const bold = parseInt(cs.fontWeight) >= 600;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (ratio < need) out.push({ text: txt.slice(0, 70), ratio: Math.round(ratio*100)/100, need, size, overImage,
      fg: `rgb(${Math.round(fg.r)},${Math.round(fg.g)},${Math.round(fg.b)})`, bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})` });
  }
  return out;
}
"""

report = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844})
    for path in PATHS:
        pg = ctx.new_page()
        try:
            pg.goto(BASE + path, wait_until="networkidle", timeout=60000)
        except Exception as e:
            report[path] = {"error": str(e)[:120]}; pg.close(); continue
        pg.add_style_tag(content="*{animation:none!important;transition:none!important}")
        for y in range(0, 25000, 900):
            pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(40)
        pg.wait_for_timeout(300)
        bad = pg.evaluate(JS)
        report[path] = bad
        print(f"{path:45s} {len(bad):3d} sorun" + ("" if not bad else "  örn: " + "; ".join(f"'{x['text'][:30]}' {x['ratio']}" for x in bad[:3])))
        pg.close()
    b.close()

out = ROOT / "project_logs"; out.mkdir(exist_ok=True)
(out / "kontrast_denetim.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
print("toplam:", sum(len(v) for v in report.values() if isinstance(v, list)))
