# MGL — Yeniden Konumlandırma ve Site Yenileme Planı

**Proje:** mgl-ai.com sıfırdan tasarım + fiyat mimarisi + şirket doktorluğu hizmeti
**Repo:** `mustafagl01/mgldigitalmedia` — yerel kopya `C:\Users\Pc\Desktop\mgl-ai-site`
*(2026-09-02: `Desktop\[ARŞİV]\mgldigitalmedia`'dan taşındı)*
**Durum:** Tasarım ve fiyat kararları onaylandı, uygulama bekliyor

---

## 1. KONUMLANDIRMA

### Ana fikir

> **Teşhis değerli. Tedavi ucuz.**

Otorite teşhiste, rekabet gücü fiyatta. Ucuzluk zayıflık değil — teşhisin sonucunu
erişilebilir kılan şey.

### Neden değişiyoruz

- Mevcut site hizmet listeleyen bir ajans sitesi. Ziyaretçi ne alacağını bilmiyor.
- Fiyatlar konumlandırmayla çelişiyor (sesli asistan mgl-ai.com'da £750+£249, aynı ürün
  mglsystems.uk'te £0+£9,90).
- **Müşteri durumu (2026-09-02 teyit):** İlk ve tek gerçek müşteri
  **Elm's Coffee Shop** — [elmscoffeeshop.com](https://elmscoffeeshop.com), canlıda.
  Önceki UK takeaway sesli asistanlarının **hepsi demoydu**; eski kayıtlardaki
  "6 aktif müşteri" bilgisi yanlıştı.
- Tek müşteri olduğu için kanıt bölümü referans listesiyle değil **canlı demolar +
  Elm's** üzerine kurulur (bkz. bölüm 6, kompozisyon bölümü 8).
- Kendi ajans sitesi, satılan müşteri siteleriyle aynı tasarım reçetesini kullanıyor.

### Yeni giriş kapısı: Şirket doktorluğu (ücretsiz röntgen)

Üç aşama:

1. **Dijital röntgen (otomatik)** — mevcut ajanlarla üretilir: `seo-audit`, `seo-local`,
   `seo-maps`, `competitive-ads-extractor`. Çıktı: site hızı/SEO, Google işletme profili
   ve yorumlar, rakiplerin yayındaki reklamları (Meta Ad Library), yerel arama sırası.
2. **Gizli müşteri testi** — işletme aranır ve WhatsApp'tan yazılır. Kaç saniyede açıldı,
   açıldı mı, ne kadar sonra dönüldü — kaydedilir.
3. **Rapor + reçete** — öncelikli acı noktaları, her birinin tahmini kaybı, karşısında
   çözüm ve fiyat.

**Kritik kural:** rapor boru hattı olarak kurulur. Elle yazılmaya başlanırsa model çöker.

**Yan fayda:** aynı rapor cold outreach'in açılış cümlesi olur ("Salı 13:40'ta aradık,
6 kez çaldı, açılmadı").

---

## 2. FİYAT MİMARİSİ

Kur: **£1 = 65 ₺**

### Kurulum (tek seferlik)

| Ürün | GBP | TRY |
|---|---|---|
| Tek sayfa / landing site | £200 | 12.999 ₺ |
| 5 sayfalık site | £400 | 25.999 ₺ |
| Entegrasyonlu site (ödeme altyapısı, AI asistan) | £500 | 32.499 ₺ |
| Lead + mail sistemi | £200 | 12.999 ₺ |
| Otomasyon sistemi | £400 | 25.999 ₺ |
| Sesli asistan | £0 | 0 ₺ |
| WhatsApp asistanı | £0 | 0 ₺ |

Kurulum merdiveninin anlamı: **£200 = tek bir şey · £400 = işletmenin bütünü ·
£500 = entegrasyonlu · £0 = hazır ürün (kontörle çalışır).**

### Aylık

| Kalem | GBP | TRY |
|---|---|---|
| Asistan sistem bedeli (sesli / WhatsApp / ikisi → **tek** ödenir) | £9,90 | 649 ₺ |
| Kurulmuş sistem bakımı (otomasyon veya lead+mail) | £29 | 1.899 ₺ |
| Web hosting (yıllık) | £100 | 6.499 ₺ |
| Meta reklam yönetimi | £99 | 6.499 ₺ |
| Google reklam yönetimi | £99 | 6.499 ₺ |
| Meta + Google birlikte | £169 | 10.999 ₺ |

Asistan aylığı ve sistem bakımı **ayrı kalemlerdir**, toplanır.

### Kullandığın kadar (kontör)

**Sesli asistan** — standart 25p/dk, hacimle düşer:

| Paket | Dakika | Fiyat | Birim |
|---|---|---|---|
| Başlangıç | 500 | £115 | 23p |
| Yoğun | 1.000 | £210 | 21p |
| Hacimli | 2.000 | £400 | 20p |

Kademeli tarife (paketsiz): 0-200 dk 25p · 201-500 23p · 501-1.000 21p · 1.001-2.000 20p

**WhatsApp asistanı** — birim: **AI yanıtı** (asistanın gönderdiği her mesaj).
Gelen mesaj, personelin elle yazdığı mesaj ve sistem bildirimi sayılmaz.
Standart 0,7p/mesaj:

| Paket | Mesaj | Fiyat | Birim |
|---|---|---|---|
| Başlangıç | 5.000 | £29 | 0,58p |
| Yoğun | 10.000 | £49 | 0,49p |
| Hacimli | 20.000 | £89 | 0,445p |

Kontör bitince asistan susmamalı: **otomatik yükleme varsayılan açık**, müşteri kapatabilir.
Bakiye 500 mesajın / 100 dakikanın altına inince otomatik yenilenir ve bildirim gider.

### Diğer

- Termal yazıcı **£199** — takeaway, opsiyonel (uyumlu yazıcı varsa gerekmez)
- Reklam bütçesi ve platform ücretleri **müşteriye ait**, kendi hesabından öder
- Lead+mail sisteminde domain, mailbox ve veri kredisi **müşteriye ait**
- Şirket doktorluğu teşhisi **ücretsiz**
- Yönetilen mail gönderimi ayrı ürün değil — reçetenin parçası olarak fiyatlanır
- Asgari reklam bütçesi şartı **yok** (müşteri tabanı oluşunca yeniden değerlendirilecek)

### Marj notu (doğrulanmış)

WhatsApp AI yanıtı maliyeti: GPT-5 mini ile ~0,033 peni, GPT-5 nano ile ~0,007 peni
(sistem promptu 2.500 token cache'li, geçmiş+mesaj 500 token, çıktı 120 token).
20.000 mesajlık en büyük pakette token maliyeti £6,60 → **marj %93.**
Sistem promptu prompt caching ile gönderilmezse maliyet ~3 katına çıkar — **caching zorunlu.**

---

## 3. DOMAIN PLANI

| Domain | Karar |
|---|---|
| **mgl-ai.com** | Merkez. Şirket doktorluğu + tüm hizmetler + fiyatlar. TR ve EN **ayrı URL'lerde**. |
| **mglsystems.uk** (AloSipariş) | Ayrı ürün markası olarak kalır. **`noindex` KALDIRILIR.** İki site karşılıklı bağlanır. |
| **mglautomation.uk** | Kapatılır, 18 sayfa mgl-ai.com'a **301 ile taşınır**. |

### Taşınacak içerik (mglautomation.uk)

**Problem sayfaları — mgl-ai.com'da yok, en değerli varlık:**
`mesai-disi-arama-cevaplama` · `randevu-hatirlatma-sistemi` · `tahsilat-otomasyonu` ·
`evrak-toplama-ve-takip` · `excelden-otomatik-mail-whatsapp`

**Sektör sayfaları — çakışanlar birleştirilecek** (klinik, emlak, e-ticaret, güzellik,
restoran ikisinde de var; ayrı bırakılırsa kendi kendine rakip olur):
muhasebe · klinik · danışmanlık · emlak · e-ticaret · restoran · güzellik salonu ·
hukuk bürosu · üretim KOBİ

### Çözülecek SEO sorunu

İngilizce içerik var (`LanguageContext.tsx`) ama **İngilizce URL yok** — dil değişimi
tarayıcıda `useState` ile oluyor. `sitemap.xml`'de 27 URL'nin hepsi Türkçe, `hreflang`
sadece `tr` + `x-default`. **Google İngilizce sürümü hiç görmüyor.** UK pazarı için
yapılan SEO emeğinin karşılık vermemesinin muhtemel sebebi bu.

Çözüm: `/en/...` gerçek route'ları + `hreflang` çiftleri + iki dilli sitemap.

---

## 4. SİTE YAPISI — teşhis merkezli

Ana sayfanın tek işi: **ücretsiz check-up talebi almak.** Diğer her sayfa ona besleme.

```
/                          Ana sayfa — check-up formu merkezde
/check-up                  Check-up nedir, ne çıkıyor, örnek röntgen, tam form
/sorunlar/[problem]        5 sayfa — mglautomation.uk'ten taşınır
/cozumler/[sektor]         9 sayfa — mevcut 5 + taşınan 9, çakışanlar birleştirilir
/hizmetler/[urun]          6 sayfa — sesli, whatsapp, otomasyon, web, reklam, lead+mail
/fiyatlar                  Tek sayfa, tüm fiyatlar açık
/blog + /blog/[slug]       Mevcut 5 yazı korunur
/karsilastirma/[x]         4 sayfa — n8n vs Zapier, Cloud API vs Baileys,
                           Voiceflow vs Retell, UK AI ajans karşılaştırması
/hakkinda  /iletisim  /legal
/en/...                    Hepsinin İngilizce karşılığı, gerçek URL olarak
```

Toplam ~35 sayfa; yaklaşık %70'i mevcut içeriğin taşınması.

---

## 5. TASARIM DİLİ (ATÖLYE protokolü çıktısı)

**Mod:** ATÖLYE

### Design Read

Enfield'de dükkânını kapatmış, saat 23:10, telefonuna bakan bir takeaway sahibi.
Ya da İstanbul'da bugün 12 çağrıyı kaçırmış bir klinik müdürü. **"AI otomasyon"
aramıyor** — yorgun ve bir yerden sızıntı olduğunu biliyor, ama nerede olduğunu
bilmiyor. Dil: teşhis koyan, kanıt gösteren, abartmayan.

### Metafor

> *"Bu site bir röntgen kutusu gibi olmalı."*

Karanlık oda, arkadan aydınlatılmış panel, üzerinde okunan ince çizgiler ve sayılar.
Doktor bir şey satmıyor; ışığı açıyor ve gösteriyor.

Her tasarım kararının hakemi: **"bu, karanlıkta bir şeyi görünür kılıyor mu?"**

### Farklılaşma taraması — neden mevcut palet gidiyor

| Site | Zemin | Display font |
|---|---|---|
| mgl-ai.com (mevcut) | sıcak kâğıt `#F5F1EA` | Fraunces |
| Beyaz Zambak | krem `#FAF7F2` | Fraunces |
| EsteLondon | sıcak kâğıt `#FAF7F1` | Lora (serif) |
| DentEuropa | lacivert | Fraunces |

Dördünün üçü sıcak kâğıt + serif display. **Ajansın kendi sitesi, sattığı müşteri
siteleriyle aynı reçeteyi kullanıyor** — markası görünmez oluyor.

### Ölçülen marka renkleri (logodan piksel örnekleme)

| Kaynak | Renk | Hex | Not |
|---|---|---|---|
| `logo.png` | baskın koyu | `#0E0E0E` | 454.680 piksel |
| `logo.png` | baskın açık | `#E6E6E6` | 196.702 piksel |
| `logo.png` | vurgu | `#C11619` | |
| `logo-yakin.png` | zemin | `#FFFDF8` | |
| `logo-yakin.png` | vurgu | **`#AD0110`** | derin kan kırmızısı |

Mevcut sitenin vurgusu `--ember: #BC3B15` — turuncuya kaçan kiremit.
**Site logosuyla aynı renkte bile değil.** Yeni palet logodan türetilecek.

### Seçilen palet — "Röntgen kutusu"

```css
--ink:      #0B0D0E;   /* ana zemin — düz derin mürekkep, gradient YOK */
--panel:    #14171A;   /* arkadan aydınlatılmış panel yüzeyi */
--line:     rgba(232,237,240,.10);  /* saç teli çizgiler */
--read:     #E8EDF0;   /* okunan metin — ışıklı */
--read-2:   #9BA6AD;   /* ikincil */
--read-3:   #5E686E;   /* üçüncül / metadata */
--signal:   #AD0110;   /* logo kırmızısı — bulgu, uyarı, CTA */
--light:    #FFFDF8;   /* fiyat bandı zemini — sayfanın tek aydınlık alanı */
```

**Reddedilen alternatifler:**
- *Yüksek kontrast baskı (beyaz/siyah + sinyal)* — güçlü ama soğuk; editöryel bir
  dergiye hizmet ediyor, teşhis metaforuna değil.
- *Koyu-sıcak terracotta (`#1A120B` + `#C4622D`)* — güzel ama röntgen fikrini
  taşımıyor; ayrıca sıcak paletle portföyde zaten fazla haşır neşir.

### Tipografi

| Rol | Font | Neden |
|---|---|---|
| Başlık | **Geist 600-700**, tracking `-0.03em` | Teknik, nötr, ölçü aleti dili |
| **Okuma değerleri / sayılar** | **Geist Mono** | Röntgen üzerindeki ölçüm yazıları — **imza taşıyıcı** |
| Gövde | Geist 400 | Türkçe karakter desteği tam |

**Tek aile + mono, üçüncü font yok.** Bir ölçüm cihazının paneli tek tipografiyle
yazılır; karakter fonttan değil **mono sayılardan, kompozisyondan ve paletten** gelir.
Yan fayda: Fraunces kalkınca bir font isteği düşüyor, ikisi de zaten yüklü.

**Serif yok.** Bu tek başına siteyi portföydeki üç siteden ayırıyor.

### Kelime sistemi — metafor tasarımda kalır, metinde değil

"Röntgenlemek" fiil olarak her cümleye oturmuyor (klinik ve biraz saldırgan duruyor).
Metafor doğru, kullanımı yanlıştı. Üç katman ayrılır:

| Katman | Kelime | Örnek |
|---|---|---|
| Görsel dil | röntgen kutusu | *(kimse okumaz — palet, tarama çizgisi, mono sayılar)* |
| Hizmet / eylem | **check-up** | "Ücretsiz işletme check-up'ı" · "check-up yapalım" |
| Teslim edilen belge | **İşletme Röntgeni** | "Sonunda işletmenizin röntgenini gönderiyorum" |

Röntgen **isim olarak** kalır, **fiil olarak kullanılmaz.** İngilizce karşılığı:
"Business Check-up" + "your business X-ray".

Yasak kalıplar: *"işletmenizi röntgenleyelim"*, *"röntgenliyoruz"*, *"röntgenlensin"*.

### İmza an — "Röntgen çekiliyor"

Ana sayfada işletme adı girilip gönderildiğinde ekran kararır, ince bir tarama çizgisi
yukarıdan aşağı geçer; geçtiği yerde bulgular tek tek belirir — kaçan çağrı, rakip
reklamları, arama sırası. **Veri gerçek, sadece sunumu sinematik.**

### Sapma tablosu

| Varsayılan | Karar | Gerekçe |
|---|---|---|
| Sıcak kâğıt + Fraunces (mevcut) | ❌ | Portföydeki üç siteyle aynı |
| Dark mode | ✅ | Metafor gerektiriyor — "AI dark" değil, röntgen karanlığı |
| Gradient / mesh / glow | ❌ | Röntgen kutusunda gradient yok; ışık düz ve arkadan gelir |
| Glassmorphism | ❌ | Yaygın AI klişesi, cam metaforu yok |
| Monospace sayılar | ✅ | Ölçüm dili — imza taşıyıcı |
| Parallax / magnetic imleç | ❌ | Yorgun dükkân sahibi etkilenmeye değil çözüm bulmaya geldi |
| Marquee güven şeridi | ❌ | DentEuropa'da kullanıldı |
| 3'lü eşit kart ızgarası | ❌ | En bilinen AI-slop işareti |
| Hareket seviyesi | **M2** | Ölçülü; reveal + sayaç + tarama çizgisi. Scroll-hijack yok. |
| Hareket karakteri | Kesin/teknik `cubic-bezier(.65,0,.35,1)` | Ölçüm aleti hissi |
| Gölge ailesi | **E — gölgesiz** | Derinlik saç teli çizgi + panel zemin farkıyla kurulur |

---

## 6. ANA SAYFA KOMPOZİSYONU

**İlk 3 saniye:** başlık + **giriş alanı**. Tek dönüşüm eylemi: işletme adını yaz,
röntgeni al. Hero'nun kendisi form.

**Hero katmanları (8):** derin mürekkep zemin → saç teli ızgara → arkadan aydınlatılmış
panel → eyebrow (`ÜCRETSİZ · 2 DAKİKA`) → H1 → tek cümlelik lede → giriş alanı + buton →
monospace durum satırı.

| # | Bölüm | Düzen | Ritim |
|---|---|---|---|
| 1 | Hero — check-up formu | asimetrik 60/40, koyu | — |
| 2 | "Bir röntgen böyle görünür" | **bento** ızgara, mono sayılar | yoğunluk ↑ |
| 3 | **"Bu raporu ben çıkarıyorum"** — portre | split, çerçeveli portre + künye | yoğunluk ↓, insan |
| 4 | Sızıntı hesabı | dar kolon 65ch, ortalı | sakinleşme |
| 5 | Nasıl işliyor | yatay numaralı akış | yön değişimi |
| 6 | Ne kuruyoruz | asimetrik 60/40 **dönüşümlü** satırlar | genişlik ↔ |
| 7 | Fiyatlar | tam genişlik **açık zemin** bandı | renk bloğu kırılması |
| 8 | "Anlatmayayım, göstereyim" | canlı demolar + Elm's | zemin koyuya döner |
| 9 | SSS | akordeon (`FAQPage` şeması) | sıkışma |
| 10 | CTA — check-up'a dön | tam genişlik, sinyal kırmızısı | kapanış |

**7. bölüm bilinçli olarak açık zeminde.** Fiyat artık en güçlü argüman — karanlıkta
saklanmaz, ışığa çıkar. Sayfanın tek aydınlık bandı fiyat.

### 3. bölüm — portre

**Hero'da portre YOK.** Gerekçe: Orhan Görgülü sitesinde ürün doğrudan kişinin kendisi
(randevu alan onu alıyor), o yüzden hero'da portre doğru. Burada ise ürün, sen uyurken
de çalışan bir sistem — hero'da büyük portre "bu adamın zamanını satın alıyorum" diye
okunur ve kurduğumuz her şeyin tersini söyler. Ayrıca hero'nun tek işi form; büyük bir
yüz formu ezer.

**Ama portre gerekli:** ucuz fiyat + isimsiz site = şüphe. Bir yüz, bir isim, bir şirket
numarası ve gerçek adres, ucuzluğu "acaba dolandırıcı mı"dan "bu adam gerçekten ucuza
yapıyor"a çevirir. Doktor metaforu da bunu gerektirir — teşhisi koyanın yüzü olur.

**Uygulama — Morden Café sitesindeki desen** (`m-pc-portre2.png` referans): sağda
çerçeveli portre kartı, altında künye şeridi; solda eyebrow + başlık + kısa metin.

- Künye şeridi: **Mustafa Gül · MGL Digital Media Ltd · Company No 16007414 · Enfield, London**
- Sol metin kısa ve iki soruya cevap verir: *neden bu kadar ucuz* ve *neden güvenilir*
- Konum: check-up çıktısının (bölüm 2) hemen ardından — "bu bulguları kim çıkardı"
  sorusu tam orada doğuyor

**8. bölüm — kanıt yerine deneme.** Portföy ve referans yok; yerine üç canlı demo:

Bölüm iki farklı türde kanıt taşır — **karıştırılmamalı:**

**(a) Üç canlı asistan demosu** — ziyaretçi üzerinde dener, müşteri işi değildir:

| Demo | Kaynak | Ne yapıyor |
|---|---|---|
| Sesli asistan | `src/components/modals/PhoneDemoModal.tsx` (429 satır) | Numaranı gir → asistan seni arar |
| Mail otomasyonu | `src/components/modals/EmailDemoModal.tsx` (448 satır) | Ad + mail gir → otomasyon maili gelir |
| AI asistan | `src/components/modals/IdeaAssistantModal.tsx` (261 satır) | Sohbet |

Üçünde de odak tuzağı, ESC ile kapanma ve doğrulama var — **yeniden yazılmaz, yeni
tasarıma taşınır.** Yanlarında sabit inbound hat: **+44 7414 605612** ("istersen sen ara").

**(b) Bir gerçek müşteri işi** — Elm's Coffee Shop, canlıda çalışıyor.
⚠️ **Elm's'te sesli asistan YOK.** Kapsamı: web sitesi + online sipariş → mutfak
yazıcısı + Telegram bildirimi. Metinlerde asistanla aynı cümlede anılmamalı.

### Elm's Coffee Shop — yerleşim kararı

İlk gerçek müşteri. 232 York Road, Battersea SW11. Online sipariş → mutfak yazıcısı +
Telegram bildirimi. Google: 4,7 / 177 yorum.

**Hero'da YER ALMAZ** — hero'nun tek işi check-up formu; tek bir müşteriyi oraya koymak
hem formu zayıflatır hem de abartılı durur. Üç yerde, her biri tek cümle + link:

| Bölüm | İçerik |
|---|---|
| 6 — Ne kuruyoruz, web satırı | *"Örnek: elmscoffeeshop.com — online sipariş, mutfak yazıcısına ve Telegram'a düşüyor."* |
| 7 — Fiyat bandı, £500 kademesi | *"£500'lük entegrasyonlu site ne demek? Bu."* → **soyut fiyatı somuta bağlayan en yüksek getirili yer** |
| 8 — Canlı demolar | Dördüncü kutu, tıklanabilir |

**Ton kuralı:** yüzde yok, "başarı hikayesi" dili yok. Ne olduğunu söyle, linki ver.

**Yapılacak:** (a) siparişin yazıcıdan çıktığı anın 10 sn'lik videosu — site ve Instagram
için yazılı referanstan güçlü; (b) Telegram kayıtlarından sipariş sayacı başlat, bir ay
sonra "N sipariş geçti" denebilsin (pazarlama cümlesi değil, ölçüm — röntgen diline uyar).

İkinci ve üçüncü müşteri geldiğinde ayrı `/isler` sayfası açılır; tek iş için erken.

**Mobil:** giriş alanı tam genişlik, tarama paneli hero'nun altına iner, sayfa boyunca
altta yapışkan tek buton (`Ücretsiz check-up`).

---

## 7. UYGULAMA SIRASI

Sıra bağımlılığa göre; süre tahmini yok.

**A · Repo hijyeni (ilk iş)**
Canlı sitenin kaynağı `Desktop\[ARŞİV]\` altında duruyor — silinme riski var.
Güvenli bir konuma taşı. `mgl-mail-platform\sites\mgldigitalmedia` (9 Ağustos'ta
kalmış eski kopya) karışıklık yaratmasın diye işaretlensin veya silinsin.

**B · Fiyat katmanı — ✅ TAMAM (2026-09-02)**
- `src/config/pricing.ts` **baştan yazıldı** — 11 kademe → 10 anahtar, dört kategori
  (`agents` / `systems` / `web` / `ads`). Kur 35 → **65**. Yeni yapılar: `CreditPack`,
  `UsageTier`, `voiceUsageCost()` (kademeli tarife hesabı), `creditPacksFor()`.
  Kullanılmayan alanlar atıldı (`voiceMinutes`, `chatConversations`, `overage*`).
- `src/pages/Packages.tsx` — `PLAN_CONTENT` (324 satır) yeni 10 ürün için baştan
  yazıldı; `systems` kategorisi ve SSS'i eklendi; eski tier adlarına atıf yapan
  reklam/asistan SSS'leri ve "aşım tarifesi" cevabı yeni modele göre düzeltildi.
- `src/pages/Pricing.tsx` — 9 sektörde sabit yazılı eski paket adı ve fiyatı
  güncellendi; `getRecommendedPackage()` kademe önerisi yerine tek modeli anlatıyor.
- Eski fiyat metinleri temizlendi: `config/solutions.ts` (12 yer), `Services.tsx`,
  `services/{WhatsappAiAsistan,SesliAi,N8nOtomasyon}.tsx`,
  `comparisons/UkAiAgenciesComparison.tsx`, 4 blog yazısı ve `public/llms.txt`.
  Yanlış `£119/ay` iddiası da düzeltildi.
- ✅ **`src/stripe-config.ts` yeniden yazıldı.** Stripe'ta AloSipariş kalemleri zaten
  doğru fiyatlarla duruyordu (£9,90 abonelik, £199 yazıcı, 500/1000/2000 dk kontör) —
  onlar korundu. Eksik **13 fiyat oluşturuldu** (web kurulumları, hosting, otomasyon
  ve lead kurulumu, sistem bakımı, 3 reklam paketi, 3 WhatsApp kontörü). Katalog artık
  17 gerçek `priceId` taşıyor; sitede yazan ile tahsil edilen aynı.
  ⚠️ `priceTry` yalnızca gösterimdir — checkout GBP üzerinden yapılıyor. TL ile
  tahsilat istenirse Stripe'ta ayrı TRY price nesneleri gerekir (açık konu).
- ✅ Ölü kod silindi: `src/components/pricing/*` (7 bileşen) ve
  `src/data/profit-engine-config.json`. Hiçbir yerden çağrılmıyorlardı ve içlerinde
  eski fiyatlar duruyordu.

**C · Tasarım sistemi — ✅ TAMAM (2026-09-02)**
- `src/styles/design-tokens.css` — röntgen paleti uygulandı. **Token adları korundu,
  rolleri takas edildi:** `--paper*` koyu zemin, `--ink*` açık metin, `--coal*` açık
  (fiyat bandı), `--bone*` koyu. Bileşenlerde 350+ ham token kullanımı var
  (233× `--ink`, 118× `--paper`, 99× `--ember`); rol takası sayesinde kontrast
  çiftleri tek tek dolaşılmadan doğru kaldı.
- Gölge ailesi **E (gölgesiz)** — koyu zeminde siyah gölge görünmez; derinlik saç teli
  iç kenarlıkla kuruluyor.
- `.on-coal` → `.on-light` olarak yeniden anlamlandırıldı (eski ad takma ad olarak
  duruyor). Aydınlık bantta vurgu, logonun gerçek kırmızısına (`--ember-print`) düşer.
- **Fraunces kaldırıldı** (`index.html` 2 yer + tokens `@import`). `--font-serif`
  silinmedi, `--font-sans`'a bağlandı — 68 kullanım tek satırla çevrildi.
- `.numeral` artık **mono** — imza taşıyıcı.
- `ember-*` adları korundu (99 kullanım); `signal-*` yeniden adlandırması D'ye bırakıldı.

**Doğrulama:** `npm run build` temiz — 18 route prerender, 0 hata. Fiyat ve tasarım
kaynaklı tip hatası yok (kalan `tsc` hataları ölü koddan ve değişiklikten öncesinden).

**D · Ana sayfa** *(C'ye bağlı)* — 9 bölüm, hero 8 katman, imza an (tarama çizgisi)

**E · Demo modalları** *(D'ye bağlı)* — üçü yeni tasarıma taşınır, mantık korunur

**F · Şirket doktorluğu** *(D'ye bağlı)* — `/check-up` sayfası + rapor boru hattı

**G · İçerik taşıma** *(D sonrası)* — mglautomation.uk 18 sayfa, 301'ler, sektör
sayfası birleştirmeleri

**H · İki dillilik** *(G ile birlikte)* — `/en/` route'ları, `hreflang` çiftleri,
iki dilli `sitemap.xml`

**I · llms.txt + meta** *(en son — fiyat ve yapı kesinleştikten sonra)*
⚠️ Mevcut `llms.txt`'in son satırında **yanlış fiyat** var: *"pricing starts from
£119/month (or 3,999 TRY/month)"* — listelenen hiçbir kademeyle uyuşmuyor. Bu satır
tam olarak AI motorlarının alıntıladığı yer. Yeni fiyatlarla düzeltilecek.

**J · mglsystems.uk** — `noindex` kaldırılır, mgl-ai.com ile çapraz bağlanır

**K · Doğrulama ve yayın**
- Kalite eşiği 17 madde (website-builder skill)
- Kontrast ölçümü (koyu zeminde `--read` ve `--signal` AA)
- 390px mobil, yatay taşma yok
- Animasyon sağlığı: kademeli scroll sonrası `opacity:0` kalan içerik olmamalı
- Tek production build → deploy

---

## 8. AÇIK KONULAR

**1. Röntgen raporu boru hattı.**
Hangi ajan hangi çıktıyı üretecek, rapor nasıl birleşecek, nasıl teslim edilecek
(PDF? sayfa? mail?), gizli müşteri araması nasıl kayıt altına alınacak — ayrı bir
tasarım turu gerektiriyor.

**2. Otomatik kontör yükleme.**
Kart saklama + eşik tetikleyici + bildirim gerekiyor. Stripe tarafı ayrı iş.

**3. Worker ve D1 deploy'u — Cloudflare yetkisi bekliyor.**
Güvenlik düzeltmeleri (parola hash'i, price_id allow-list, URL doğrulama, CORS)
`worker/src/auth-handler.ts` içinde yazıldı ve commit'lendi, **ama yayına çıkmadı** —
worker `main`'e push ile deploy olmuyor, `wrangler deploy` gerekiyor. Sıra önemlidir:
önce `migrations/0002_add_password_hash.sql`, sonra worker. Aksi halde `password_hash`
sütunu olmadığı için kayıt ve giriş kırılır.
Engel: wrangler oturumu yok; merkezi env'deki `CLOUDFLARE_API_KEY` çalışmıyor (global
key ve bearer token olarak denendi, ikisi de reddedildi). `CLOUDFLARE_API_TOKEN` veya
`npx wrangler login` gerekiyor.
Not: login/register/checkout uçları şu an canlıda hiç yok (Pages yalnızca
`functions/api/location.ts`'i sunuyor), bu yüzden bulgular şu an sömürülebilir değil.

**4. TL ile tahsilat.**
Stripe kataloğundaki tüm fiyatlar GBP. `priceTry` sadece gösterim; checkout GBP
üzerinden yapılıyor. Türkiye'de TL çekilecekse Stripe'ta ayrı TRY price nesneleri
oluşturulmalı ve `stripe-config.ts` bölgeye göre seçim yapmalı.

**5. Instagram / YouTube.**
Karar: **iki kanal ayrı yürüyecek** (IG kısa teşhis içeriği, YouTube derin teknik).
Detay site bittikten sonra konuşulacak. Hesap adı netleştirilmeli — `@mgl.ai.uk`
(sitede) ve `@mgl_digital_media` (llms.txt'te) olarak iki farklı ad geçiyor.

---

## 8b. FAZ 2 — GEO/SEO İÇERİK MİMARİSİ (henüz başlanmadı)

2026-09-04'te ChatGPT'den gelen öneri, ana sayfa işi bitince ayrı faz olarak
ele alınmak üzere kaydedildi. Özet:

**4 katmanlı içerik mimarisi:**
1. Para sayfaları — `/whatsapp-ai/`, `/sesli-ai/` vb. (problem→çözüm→sistem→proof→fiyat→CTA)
2. Problem sayfaları — `/whatsapp-mesajlarina-yetisemiyorum/` gibi, uzun kuyruklu arama ve AI sorguları için
3. Sektör sayfaları — mevcut `/solutions/*`'ün genişletilmiş hâli
4. Bilgi merkezi — "satın almadan önce sorulan sorular", jenerik blog değil

**Teknik iş listesi:** Organization/LocalBusiness/Service/BreadcrumbList schema,
robots.txt'te OAI-SearchBot kontrolü, IndexNow, GSC'de sitemap yeniden gönderimi
ve kritik sayfalarda URL Inspection → Request indexing.

**Sıra (kullanıcı onayladı):** önce tüm URL ağacını çıkar → ilk 30 problem/satın
alma sorgusunu belirle → sonra içerik üret. 100 işe yaramaz blog yazısı yerine
20 hedefli sayfa hedefleniyor.

**Başlamadan önce:** bu faza girişte yeniden brainstorming yapılmalı — URL
ağacı `/sorunlar/*` ve `/cozumler/*` için PLAN.md bölüm 4'te zaten bir taslak var
(mglautomation.uk'ten taşınacak 5 problem sayfası + 9 sektör sayfası), yeni öneri
onunla birleştirilmeli, çakışan yapı iki kez kurulmasın.

## 9. YAYIN GEÇMİŞİ

**2026-09-02 · `40418b8` — yeni fiyat modeli + röntgen paleti canlıya alındı.**
Cloudflare Pages `main`'e push ile otomatik derledi; 25 route 200 dönüyor,
`llms.txt` yeni fiyatlarla yayında.

⚠️ **Aynı gün yaşanan hata — tekrarlanmasın.** İş önce `Desktop\[ARŞİV]\mgldigitalmedia`
kopyasında yapıldı; o kopya "en yeni commit tarihi" ölçütüyle güncel sanılmıştı ama
`origin/main`'den **15 commit geride, 2 ay eskiydi** (ortak ata 3 Temmuz). Push
reddedildi, veri kaybı olmadı; iş `origin/main` üzerine yeniden uygulandı ve o sırada
uzaktaki kontrast düzeltmeleri, çok dilli web paketi ve yönetilen outreach sayfası
korundu. **Klasör seçerken commit tarihine değil `git fetch` + `git status -sb`
çıktısına bakılacak.** Fazla klon `mgl-mail-platform/sites/` altında
`ESKI-...-KULLANMA` adıyla işaretlendi; silinmesi bekliyor.

## 10. KARAR GEÇMİŞİ

Bu plan 2026-09-02 tarihli beyin fırtınası oturumunda madde madde onaylandı.
Değiştirilen her fiyat ve tasarım kararı yukarıda gerekçesiyle birlikte duruyor;
yeni bir karar alınırsa bu dosya güncellenir.
