# MGL Digital Media — Proje Durumu

**Son güncelleme:** 2026-08-16
**Canlı:** https://mgldigitalmedia.com · **Repo:** github.com/mustafagl01/mgldigitalmedia
**Durum:** 🟡 Değişiklikler yerelde hazır, **yayına alınmadı** (onay bekliyor)

---

## Bu oturumda yapılanlar

### 1. Depo senkronu
Yerel klasör 200 commit gerideydi (25 Ocak vs 9 Ağustos). Commit edilmemiş
eski Meta Pixel değişikliği `../_yerel_yedek/` altına yedeklendi + stash'lendi,
sonra `git pull --ff-only` yapıldı. **Yayın = GitHub = yerel**, üçü senkron.

### 2. Performans — en büyük kazanç

| | Önce | Sonra |
|---|---|---|
| **Total Blocking Time** | **4.530 ms** | **330 ms** |
| Performans skoru | 31 | 55 |
| Ana iş parçacığı | 8,8 sn | 4,0 sn |

**Sorun:** Google Analytics (2.113 ms) + Meta Pixel (826 ms) ana iş parçacığını
kilitliyordu. Sayfa görünüyor ama kullanıcı 4,5 saniye hiçbir butona basamıyordu.
Yani reklamı ölçen kodlar, reklamla gelen müşteriyi kaçırıyordu.

**Çözüm:** İkisi de ilk etkileşime (scroll/tıklama/tuş) kadar ertelendi; etkileşim
gelmezse 4 sn sonra yine yükleniyor. Ölçüm kaybı yok — PageView yine gidiyor.

### 3. Hero yeniden yazıldı — Seval'in eleştirisine cevap

**Eleştiri:** *"dili çok ağır"*, *"`agent.n8n.webhook → 14:02:08` bilmeyene ne
ifade eder?"*, *"ne sattığın ilk banner'da yok"*, *"tekniker/tamirci gibi duruyor"*

**Neden "tamirci" hissi veriyordu** (analiz):
1. Hero'nun sağında terminal log kutusu vardı — log, sistemi *tamir eden* kişinin baktığı şeydir
2. Fiiller kurulum/bakım fiiliydi: "otomatize ederiz", "kurarız", "sistem çalıştırır"
3. Ürün değil alet satılıyordu: n8n, webhook, AI agent — müşteri n8n istemiyor, müşteri istiyor
4. "7/24 · ~3 sn yanıt" gibi SLA metrikleri — teknik servis vaadi

**Yapılan:**

| | Önce | Sonra |
|---|---|---|
| H1 | "Operasyonel yüklerinizi otomatize ederiz." | **"Müşteriniz gece yazıyor. Sabaha randevusu hazır."** |
| Hero sağ | `agent.n8n.webhook → 14:02:08` terminal kutusu | **3 iş görseli (bento duvar)** |
| Paragraf | "AI asistanlardan… n8n otomasyonundan… SEO'ya" | "WhatsApp'a gelen mesajı, telefona gelen aramayı… karşılayan sistem" |
| **Hero'da jargon** | — | **0** (sayfa geneli 12 → 5) |

### 4. Portföy eklendi (ilk kez)

Hero'da 3 iş kartı, tıklanınca demo açılıyor:

| Kart | Ne yazıyor | Link |
|---|---|---|
| Saç ekimi kliniği | Hasta kendi dilinde konuşuyor, fotoğrafını yolluyor | estelondon.vercel.app |
| Diş kliniği | Gece gelen soruya da cevap veriyor, randevu alıyor | denteuropa.vercel.app |
| Anaokulu | Veli sorularını karşılıyor, kayıt formunu dolduruyor | beyaz-zambak-kurttepe.vercel.app |

**MARKASIZ SUNUM — bilinçli karar.** Bu siteler demo; ilgili işletmeler müşteri
olmadı. Başkasının marka adını/logosunu portföyde göstermek izinsiz kullanım olur.
Bu yüzden görsellerde logo/isim kırpıldı (`scripts/build_portfolio_images.py`),
metinde sektör + **müşterinin ne kazandığı** yazılıyor.

**Mali müşavir bilerek konmadı** — yeni başlanmış iş. Yarım işi vitrine koymak,
iyi işlerin değerini de düşürür. Bitince eklenecek.

### 5. Meta/SEO düzeltmeleri
- `<title>` HTML'de İngilizceydi ama sayfa Türkçe → Türkçeleştirildi
- `meta description` tamamen İngilizceydi (`lang="tr"` sayfada) → Türkçe + jargonsuz
- Aynı düzeltme og:description ve twitter:description'a da uygulandı

---

## ⚠️ Çözülmemiş — senin yapman/karar vermen gereken

### 1. `www.mgldigitalmedia.com` → HTTP 522
Cloudflare'de `www` kaydı var ama arkasında çalışan sunucu yok. `www` yazan
ziyaretçi hata sayfası görüyor. **Cloudflare API anahtarı çalışmıyor**
(`Unknown X-Auth-Key`) — panelden senin düzeltmen gerekiyor:
`www` için CNAME → köke yönlendirme (2 dakikalık iş).

### 2. `<div id="root">` tamamen boş — LCP 9,5 sn
`scripts/prerender.mjs` sadece meta etiket + `<noscript>` üretiyor, gerçek HTML
render etmiyor. Ziyaretçi ve Google, JS yüklenene kadar boş sayfa görüyor.
LCP'nin 9,5 sn olmasının asıl sebebi bu.
**Çözümü React SSR gerektirir — ayrı ve büyük bir iş.** Konuşmadan girilmedi.

### 3. Vercel'de 100 proje, hiçbirinde gerçek domain yok
Portföy için alt alan önerildi (`dis-klinigi.mgldigitalmedia.com` gibi) —
DNS Cloudflare'de olduğu için ücretsiz ve anında. Karar bekliyor.

---

## Sırada

- [ ] Değişiklikleri commit + yayına al
- [ ] `www` 522 düzeltmesi (Cloudflare paneli — Mustafa)
- [ ] Alt sayfalardaki jargon taraması (ana sayfa temizlendi, diğerleri değil)
- [ ] Ayrı portföy sayfası (hero'da 3 var; tam liste ayrı sayfada olabilir)
- [ ] EsteLondon'daki sesli asistan + chatbot'u anlatan özel bölüm
      (*"gece 2'de kendi dilinde konuşup fotoğraf gönderiyor"* — güçlü hikâye)
- [ ] Google Ads incelemesi — **site düzelince** (karar: önce site)
- [ ] Prerender/SSR kararı

---

## Dosyalar

```
mgldigitalmedia.com/
├── PROJECT_PROGRESS.md              bu dosya
├── index.html                       takip kodları ertelendi, meta Türkçeleşti
├── src/components/sections/v2/HeroV2.tsx   hero yeniden yazıldı + iş duvarı
├── src/index.css                    .hero-work stilleri
├── public/portfolio/*.webp          markasızlaştırılmış iş görselleri (3)
├── scripts/build_portfolio_images.py  görsel işleme + kontak sayfası
└── project_logs/
    ├── baseline-2026-08-16.md       ölçüm temeli (önce)
    ├── portfolio-contact-sheet.png  görselleri gözle kontrol
    ├── lighthouse-mobile.report.html
    └── screens/current/
```

**Not:** Portföy görselleri `scripts/build_portfolio_images.py` ile üretiliyor.
Görsel değişirse script düzeltilir ve yeniden çalıştırılır; kontak sayfasına
**gözle bakılır** (marka adı sızmasın).
