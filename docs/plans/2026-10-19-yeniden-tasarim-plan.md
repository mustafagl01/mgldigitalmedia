# Yeniden tasarım planı v3 — "İşi sistem yürütür, kararı siz verirsiniz" (19 Eki 2026)

Karar: `docs/konsey/2026-10-19-site-konsey-karar.md` (3 tur konsey). Kullanıcı: "Cloudflare'de yayınlanacak şekilde yeniden yap, beğenirsem geçeriz."
Dal: `yeni-tasarim` → Cloudflare Pages önizlemesi `yeni-tasarim.mgldigitalmedia.pages.dev`. `main`'e birleştirme yalnız kullanıcı onayıyla.

## Kullanıcı ekleri (konsey sonrası)
- Gerçek işler: özel alan adıyla yayında 12 site + Unique Building reklam yönetimi. Hero'da büyük gösterilmez; ana sayfada küçük şerit, tamamı /isler.
- Liste: Elms Coffee Shop, Nightingale Cafe, Selcem Mobile Chef, ERCO Home Improvements, Ryhn Consultancy, Little Lily Preschool, Beyaz Zambak Anaokulu, Rhyl Education & Community Centre, Real Quick Handyman, Çamlıca Nehari Merkezi (basarirotasi.org), Limkolin London Education, Clean Blue Water. pages.dev'deki alan adsız projeler (Wize, LED Sign, Northern Pipers, Unique site) eklenmez.

## Sıra (bağımlılıkla)
1. Görseller (Codex, arka planda) → `assets-src/v3/*.png` → sharp ile WebP masaüstü/mobil setleri `public/v3/`.
2. Tasarım token'ları: zemin #F4F6F8, yüzey #FFF, karbon #171A1F, kobalt #3155D9, onay yeşili #197052, amber #B7791F; IBM Plex Sans + Mono. Eski sayfalar token'lardan beslendiği için palete otomatik geçer.
3. Logo: "mgl ai" Plex Sans + yeşil onay karesi (SVG bileşeni + favicon).
4. Ortak bileşenler: yeni Header (Otomasyon · Üreticiler · Asistanlar · Web ve Reklam · İşler · Fiyatlar · Hakkımızda + WhatsApp), Footer (yapımcı şeridi yok — kendi sitemiz), OnaySimulatoru, KanitSeridi, IsKarti.
5. Sayfalar (TR kök, EN /en/): `/`, `/otomasyon`, 5 × `/otomasyon/<slug>`, `/ureticiler`, `/asistanlar`, `/web-ve-reklam`, `/fiyatlandirma` (mevcut iki fiyat sayfası içerik olarak burada), `/isler`, `/hakkimizda`, `/iletisim`, `/gizlilik-ve-guvenlik`. Blog/karşılaştırma/sektör sayfaları yeni token'larla kalır.
6. Yönlendirmeler: `_redirects` (301) — /services, /solutions → /otomasyon; /sorunlar/* → /otomasyon/*; /pricing* , /packages → /fiyatlandirma; /surec-otomasyonu → /ureticiler; /sesli-ai, /whatsapp-ai-asistan → /asistanlar; /n8n-otomasyon → /otomasyon. Sektör sayfaları Search Console verisi gelene kadar korunur.
7. Prerender rota listesi, sitemap, llms.txt güncellenir.
8. tsc + build → dal push → önizleme URL'si kullanıcıya.
9. Kullanıcı onayı → main'e birleştir (canlı).

## Kapsam dışı (bu tur)
- Kurucu fotoğrafı (kullanıcıdan gelecek; yer tutucu kart: baş harfler, AI portre YOK).
- Blog yazılarının yeniden yazımı.
