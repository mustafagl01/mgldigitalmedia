"""assets-src/v3/*.png (Codex üretimi) → public/v3/*.webp.
<ad>-yatay.png → <ad>-d.webp (masaüstü), <ad>-dikey.png → <ad>-m.webp (mobil).
Prompt'lar: assets-src/v3/PROMPT.md. Kullanım: python scripts/v3_gorseller.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "assets-src" / "v3", ROOT / "public" / "v3"
OUT.mkdir(parents=True, exist_ok=True)


def save(src: Path, dst: Path, width: int, q: int = 78):
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=q, method=6)
    print(dst.name, im.size, dst.stat().st_size // 1024, "KB")


for name in ["hero", "hero2", "otomasyon", "ureticiler", "asistanlar", "webreklam"]:
    save(SRC / f"{name}-yatay.png", OUT / f"{name}-d.webp", 1600)
    save(SRC / f"{name}-dikey.png", OUT / f"{name}-m.webp", 900)

save(SRC / "kayip-rota.png", OUT / "kayip-rota-d.webp", 1600)
# mobil: ortadan kare kırpım
im = Image.open(SRC / "kayip-rota.png").convert("RGB")
s = im.height
im.crop(((im.width - s) // 2, 0, (im.width + s) // 2, s)).resize((900, 900), Image.LANCZOS).save(OUT / "kayip-rota-m.webp", "WEBP", quality=78, method=6)

for name in ["kapi-kucuk", "kapi-uretici"]:
    save(SRC / f"{name}.png", OUT / f"{name}.webp", 192, 82)
    save(SRC / f"{name}.png", OUT / f"{name}-l.webp", 900)
