"""Sitenin görünen metnini sayfa sayfa dışa aktarır (konsey metin incelemesi için).
Kullanım: python scripts/v3_metin_disa.py <base-url> <cikti-klasoru>
Çıktı: site_metni_tr.md, site_metni_en.md
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
BASE, OUT = sys.argv[1].rstrip("/"), Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
PAGES = ["/", "/otomasyon", "/otomasyon/talep-yakalama", "/otomasyon/randevu-hatirlatma", "/otomasyon/odeme-takibi", "/otomasyon/evrak-toplama",
         "/otomasyon/yorum-isteme", "/ureticiler", "/asistanlar", "/web-ve-reklam", "/fiyatlandirma", "/isler", "/hakkimizda", "/iletisim", "/gizlilik-ve-guvenlik"]

with sync_playwright() as p:
    b = p.chromium.launch()
    for lang in ["tr", "en"]:
        pg = b.new_page(viewport={"width": 1280, "height": 900})
        chunks = []
        for path in PAGES:
            url = BASE + (path if lang == "tr" else ("/en" + path if path != "/" else "/en/"))
            pg.goto(url, wait_until="networkidle", timeout=60000)
            pg.wait_for_timeout(400)
            txt = pg.evaluate("() => { const m = document.querySelector('main'); m.querySelectorAll('details').forEach(d => d.open = true); return m.innerText; }")
            lines = [l.strip() for l in txt.splitlines() if l.strip()]
            chunks.append(f"\n\n=== PAGE {path} ===\n" + "\n".join(lines))
        (OUT / f"site_metni_{lang}.md").write_text("".join(chunks), encoding="utf-8")
        print(lang, sum(len(c) for c in chunks), "karakter")
        pg.close()
    b.close()
