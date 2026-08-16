#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Portfoy gorsellerini markasizlastirir ve siteye hazirlar.

NEDEN MARKASIZ: Bu siteler demo — ilgili isletmeler musteri olmadi.
Baskasinin marka adini/logosunu portfoyde "isim" diye gostermek izinsiz
kullanim olur. Bu yuzden logo/isim goruneni kirpiyoruz; sektor + yetenek
metin olarak yaziliyor.

Her gorsel icin AYRI kirpma kutusu — oransal genel kural YOK (her sitenin
navbar yuksekligi farkli).

Cikti: public/portfolio/{slug}.webp
Kontrol: project_logs/portfolio-contact-sheet.png (gozle bakilacak)
"""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "project_logs" / "screens" / "current"
OUT = ROOT / "public" / "portfolio"
LOGS = ROOT / "project_logs"
OUT.mkdir(parents=True, exist_ok=True)

# crop: (sol, ust, sag, alt) 0-1 oraninda.
# ust degeri navbar'i (logo + isim) disarida birakacak sekilde secildi.
WORKS = [
    {
        "slug": "dis-klinigi",
        "file": "raw-denteuropa.png",
        # ust bar + navbar'da logo ve isim var -> kes
        "crop": (0.0, 0.13, 1.0, 0.95),
    },
    {
        "slug": "sac-ekimi",
        "file": "raw-estelondon.png",
        # navbar'da logo var -> ustten kes.
        # Sag alt chatbot balonunda "Ben Erkan'in AI ikiziyim" yaziyor -> alttan da kes.
        # "Sesli konus" butonu ve ust balon kalsin, asil anlatilan o.
        "crop": (0.0, 0.09, 1.0, 0.84),
    },
    {
        "slug": "anaokulu",
        "file": "raw-zambak.png",
        "crop": (0.0, 0.10, 1.0, 0.96),
    },
    # Mali musavir (musavir.vercel.app) BILEREK cikarildi — yeni baslanmis
    # bir is. Yarim isi vitrine koymak iyi islerin degerini de dusurur.
    # Bitince buraya ve HeroV2.tsx icindeki HERO_WORKS'e eklenir.
]

WIDTH = 900  # kart ~420px gosterilecek -> 2x uzeri


def process(w):
    src = SRC / w["file"]
    if not src.exists():
        print(f"  !! yok: {src.name}")
        return None
    im = Image.open(src).convert("RGB")
    W, H = im.size
    c = w["crop"]
    im = im.crop((int(c[0]*W), int(c[1]*H), int(c[2]*W), int(c[3]*H)))
    if im.width > WIDTH:
        r = WIDTH / im.width
        im = im.resize((WIDTH, int(im.height*r)), Image.LANCZOS)
    dest = OUT / f"{w['slug']}.webp"
    im.save(dest, "WEBP", quality=86, method=6)
    print(f"  ok {w['slug']:<16} {W}x{H} -> {im.width}x{im.height}  ({dest.stat().st_size//1024} KB)")
    return im


def contact_sheet(imgs, labels):
    if not imgs:
        return
    tw, cols = 460, 2
    thumbs = [i.resize((tw, int(i.height * tw / i.width)), Image.LANCZOS) for i in imgs]
    rows = (len(thumbs)+cols-1)//cols
    row_h = [max(t.height for t in thumbs[r*cols:(r+1)*cols]) for r in range(rows)]
    sheet = Image.new("RGB", (cols*tw+(cols+1)*12, sum(row_h)+(rows+1)*30), (245,241,234))
    d = ImageDraw.Draw(sheet)
    y = 10
    for r in range(rows):
        x = 12
        for i in range(cols):
            k = r*cols+i
            if k >= len(thumbs): break
            d.text((x, y), labels[k], fill=(30,25,20))
            sheet.paste(thumbs[k], (x, y+16))
            x += tw+12
        y += row_h[r]+30
    p = LOGS / "portfolio-contact-sheet.png"
    sheet.save(p)
    print(f"\nkontak sayfasi: {p}")


def main():
    print("portfoy gorselleri markasizlastiriliyor...\n")
    imgs, labels = [], []
    for w in WORKS:
        im = process(w)
        if im:
            imgs.append(im); labels.append(w["slug"])
    contact_sheet(imgs, labels)
    print(f"\n{len(imgs)} gorsel -> {OUT}")


if __name__ == "__main__":
    main()
