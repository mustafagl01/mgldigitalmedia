# MGL Digital Media — Proje Durumu

**Son güncelleme:** 2026-08-16
**Canlı:** https://mgl-ai.com (asıl domain) · mgldigitalmedia.com (eski ad, yönlendirilecek)
**Repo:** github.com/mustafagl01/mgldigitalmedia
**Durum:** 🟢 **YAYINDA** — son commit `df74fd1`

## Canlı ölçüm — başlangıç → şimdi

| | Başlangıç | Şimdi |
|---|---|---|
| Performans (mobil) | 31 | **54** |
| **Erişilebilirlik** | 90 | **100** ✅ |
| En iyi uygulamalar | 77 | 77 |
| SEO | 100 | 100 |
| **Donma (TBT)** | **4.530 ms** | **400 ms** |
| LCP | 9,5 sn | 8,3 sn |
| Ağırlık | 1.500 KB | 1.247 KB |
| Hero'da jargon | 12 | **0** |

---

## ⚠️ SENİN YAPMAN GEREKEN TEK ŞEY

**`www.mgldigitalmedia.com` → 522 hatası.**

DNS kaydı **doğru** (CNAME → `mgldigitalmedia.pages.dev`, Proxied). Sorun
Cloudflare **Pages** tarafında: proje `www` alt alanını tanımıyor.

Çözüm:
1. Cloudflare → **Compute (Workers & Pages)** → **mgldigitalmedia** projesi
2. **Custom domains** sekmesi
3. **Set up a custom domain** → `www.mgldigitalmedia.com` → Activate

**Alternatif (önerim):** `mgldigitalmedia.com` artık eski adın. Tamamını
`mgl-ai.com`'a yönlendirmek daha temiz — Google iki ayrı site görmez, SEO gücü
tek adreste toplanır. Cloudflare → `mgldigitalmedia.com` → **Rules** →
**Redirect Rules** → Hostname contains `mgldigitalmedia.com` →
`concat("https://mgl-ai.com", http.request.uri.path)` → 301.
Bu yapılırsa `www` sorunu da kendiliğinden biter.

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

## Bu oturumda ayrıca yapılanlar (2. tur)

### Satış sayfalarında dil sadeleştirme
`Packages.tsx`, `Solutions.tsx`, `Services.tsx` — CRM / workflow / entegrasyon
gibi terimler müşterinin anlayacağı karşılıklarla değiştirildi.

**Bilerek dokunulmayanlar:** `N8nVsZapier`, `WhatsappCloudApiVsBaileys`,
`VoiceflowVsRetellAi` gibi **karşılaştırma sayfaları**. Bunları arayan kişi
zaten terimleri biliyor; sadeleştirmek SEO'yu öldürürdü.

### Saç ekimi hikâyesi eklendi (demo bölümü)
> *"Hastaların çoğu yurt dışından geliyor ve İngilizcesi yetmiyor. Sitedeki
> asistan onlarla kendi dillerinde konuşuyor: fotoğrafını gönderiyor, ne
> yapılabileceğini soruyor, cevabını gece yarısı bile alıyor."*

En güçlü iş bu ve sitede hiç anlatılmıyordu.

### Randevu iddiası kaldırıldı
Hero ve demo kartları "randevu alır" diyordu — o üç demoda takvim entegrasyonu
**yok**, müşteriler istememişti. Kanıt gösterilen yerde olmayan özellik
yazılmaz. Hizmet bölümünde "isteğe bağlı" olarak duruyor (yapılabiliyor).

### Erişilebilirlik 90 → 100
- Koyu bloklarda vurgu rengi 3.3:1'di → `--ember-on-dark` eklendi
- Footer metni 10px + %70 opaklık (3.16:1) → opaklık kaldırıldı, punto büyüdü
- Footer başlıkları `<h4>` iken hiyerarşi bozuktu → `<p>` oldu
- Sohbet ve WhatsApp butonları üst üste biniyordu → 12px boşlukla ayrıldı
- Logo butonunun `aria-label`'ı görünen metinle ("mglai") uyuşmuyordu → kaldırıldı

---

## Sırada

- [ ] **`www` düzeltmesi** — yukarıdaki kutu (Cloudflare paneli, Mustafa)
- [ ] Ayrı portföy sayfası (hero'da 3 iş var; tam liste ayrı sayfada olabilir)
- [ ] Mali müşavir bitince portföye ekle (`build_portfolio_images.py` + `HERO_WORKS`)
- [ ] **Google Ads incelemesi** — Mustafa "sonra konuşuruz" dedi, dokunulmadı
- [ ] **Prerender/SSR kararı** — LCP 8,3 sn'nin asıl sebebi `<div id="root">`
      boş olması. React SSR gerektirir, ayrı ve büyük iş.
- [ ] `best-practices` 77 — üçüncü taraf çerezleri (GA + Meta Pixel). Bunlar
      reklam ölçümü için gerekli, skoru yükseltmek için silinmesi mantıklı değil.

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
