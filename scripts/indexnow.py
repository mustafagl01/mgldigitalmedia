"""IndexNow: sitedeki tüm URL'leri Bing (ve IndexNow'u kullanan Yandex, Seznam, Naver) için bildirir.
Anahtar dosyası sitede https://mgl-ai.com/<anahtar>.txt olarak yayında olmalı (public/ altında).
Kullanım: python scripts/indexnow.py            (sitemap'ten tüm URL'ler)
          python scripts/indexnow.py --test      (yalnız ana sayfa)
IndexNow ücretsizdir ve günlük 10.000 URL'e kadar kabul eder; bu site ~64 URL.
"""
import json, re, sys, urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
HOST = "mgl-ai.com"
KEY = "e65571e742397101b51b89dc565e786b"  # public/e65571e742397101b51b89dc565e786b.txt (canlıda doğrulandı)

UA = {"User-Agent": "Mozilla/5.0 (compatible; MGL-IndexNow/1.0; +https://mgl-ai.com)"}

def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read().decode("utf-8")

xml = get(f"https://{HOST}/sitemap.xml")
urls = sorted(set(re.findall(r"<loc>([^<]+)</loc>", xml)))
if "--test" in sys.argv:
    urls = [f"https://{HOST}/"]
print(len(urls), "URL")

# Anahtar dosyası gerçekten yayında mı
body = get(f"https://{HOST}/{KEY}.txt").strip()
assert body == KEY, f"anahtar dosyası uyuşmuyor: {body[:40]}"

payload = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode("utf-8")
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=payload, headers={"Content-Type": "application/json; charset=utf-8", **UA}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=60) as r:
        print("IndexNow yanıtı:", r.status, r.reason)
except urllib.error.HTTPError as e:
    print("IndexNow HTTP", e.code, e.reason, e.read()[:200])
