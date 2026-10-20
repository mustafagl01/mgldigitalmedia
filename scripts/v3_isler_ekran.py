"""Yayındaki müşteri sitelerinin ana sayfa ekran görüntüsünü alır (portföy, /isler).
Gerçek iş = gerçek ekran görüntüsü; AI görseli kullanılmaz.
Çıktı: public/v3/isler/<slug>.webp (1280x800 görünüm, 1200 px genişlik WebP).
Kullanım: python scripts/v3_isler_ekran.py
"""
import io, sys
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
OUT = Path(__file__).resolve().parent.parent / "public" / "v3" / "isler"
OUT.mkdir(parents=True, exist_ok=True)

SITES = {
    "elms-coffee-shop": "https://elmscoffeeshop.com",
    "nightingale-cafe": "https://nightingale-cafe.com",
    "selcem-mobile-chef": "https://selcemmobilechef.co.uk",
    "erco-home-improvements": "https://www.ercohomeimprovements.co.uk",
    "ryhn-consultancy": "https://ryhnconsultancy.co.uk",
    "little-lily-preschool": "https://www.littlelilypreschool.com",
    "beyaz-zambak": "https://kurttepebeyazzambakanaokulu.com",
    "rhyl-ecc": "https://rhylecc.org.uk",
    "real-quick-handyman": "https://kamshandyman.co.uk",
    "camlica-nehari": "https://basarirotasi.org",
    "limkolin-london": "https://limkolinlondon.co.uk",
    "clean-blue-water": "https://cleanbluewater.uk",
}

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 800}, device_scale_factor=1)
    for slug, url in SITES.items():
        page = ctx.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=45000)
        except Exception:
            pass
        page.wait_for_timeout(2500)
        # cerez bandi / sabit sohbet balonlari goruntuyu kapatmasin
        page.add_style_tag(content="[class*=cookie],[id*=cookie],[class*=consent],[id*=consent]{display:none!important}*{animation:none!important;transition:none!important}")
        png = page.screenshot(type="png")
        img = Image.open(io.BytesIO(png)).convert("RGB").resize((1200, 750), Image.LANCZOS)
        img.save(OUT / f"{slug}.webp", "WEBP", quality=80, method=6)
        print("ok", slug, (OUT / f"{slug}.webp").stat().st_size // 1024, "KB")
        page.close()
    b.close()
