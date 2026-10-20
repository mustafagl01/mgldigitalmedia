# mgl-ai.com yeniden tasarım — konsey kararı (19 Eki 2026)

3 tur yapıldı: Claude + Codex gpt-5.6-sol + Gemini 3.8 flash + GLM-5.2. Ham dosyalar `docs/konsey/2026-10-19-yeniden-tasarim/`. Kod yazılmadı; kullanıcı onayı bekleniyor.

## 1. Metafor (oybirliği)
**"İşi sistem yürütür, kararı siz verirsiniz."** İş bir hattan geçer: gelir, ayıklanır, hazırlanır ve görünür bir **insan onayı noktasında** durur. Onaydan sonra gönderilir veya kaydedilir.
- Metafor sitede bir içerik bileşenine dönüşür: **Onay simülatörü (imza etkileşimi).**
  - Ziyaretçi bir iş seçer: salon randevusu, ödeme takibi veya üreticiye gelen teklif talebi.
  - İşin adımlarını tek tek ilerletir.
  - Her adımda şunlar yazar: neyin otomatik olduğu, hangi verinin kullanıldığı, onayın nerede istendiği ve hangi pakete girdiği.
  - Ziyaretçi **"Onayla"ya kendisi basar**; kart maviden yeşile döner.
  - Simülatör gerçek HTML'dir, görsel değil. "Demonstrasyondur, canlı panel değildir" etiketi taşır.
- Hareket seviyesi: **sakin.** Çizgi izi, durum değişimi ve ölçülü geçişler; kaydırmaya bağlı gösteri yok.
- Gerekçe: rakipler "sihri" gösteriyor, biz kontrolü gösteriyoruz. Fabrika müdürünün ve esnafın ortak korkusu "sistem kendi kafasına göre bir şey yollar mı" sorusu.

## 2. Renk ve yazı (oybirliği; krem ve sıcak kâğıt tamamen gidiyor)
| Rol | Hex | Kural |
|---|---|---|
| Zemin | `#F4F6F8` | soğuk açık gri |
| Yüzey | `#FFFFFF` | kartlar |
| Karbon (metin) | `#171A1F` | |
| Soluk metin | `#667085` | |
| Çizgi | `#D9DEE7` | |
| Kobalt | `#3155D9` | hareket, rota, buton, aktif yol |
| Onay yeşili | `#197052` | **yalnızca onaylanmış durumda**; büyük yüzeyde kullanılmaz |
| Bekleyen amber | `#B7791F` | yalnızca küçük bir "onay bekliyor" noktası |

- Fontlar: **IBM Plex Sans** (başlık, gövde, buton, isim, fiyat) + **IBM Plex Mono** (yalnızca kısa durum etiketi, adım numarası, tarih). Mono asla değer, isim veya paragraf için kullanılmaz (Wize dersi). Türkçe karakterleri tam destekliyor.
- **Logo yeniden yapılır.** "mgl ai" adı korunur. Turuncu-kırmızı italik "ai" kaldırılır. Plex Sans ile yazılır, yanına küçük yeşil kare konur: "onay ışığı". Önerinin sahibi GLM; Codex "adı koru, turuncuyu kaldır" dedi.
- Reddedilenler:
  - Yeşil ağırlıklı palet: onay rengi sıradanlaşır, "kâğıt + lime" çizgisine kayar.
  - Saf Tailwind maviler (`#1D4ED8`).
  - Sora ve Plus Jakarta fontları: hazır startup şablonu görüntüsü.
  - Mevcut krem + kırmızı palet.

## 3. Ana sayfa yönlendirmesi (3. turda uzlaşıldı)
İki büyük kapı açılır. Kapının başlığı ölçeği söyler, alt satırı işin karmaşıklığını. İkisi de aynı simülatörü farklı başlangıç işiyle açar.
- TR:
  - **Küçük işletme:** Hazır bir otomasyonla bugün başlayın
  - **Üretici veya distribütör:** Süreçlerinizi bağlantılı bir sisteme dönüştürün
- EN:
  - **Small business:** Start today with a ready-made automation
  - **Manufacturer or distributor:** Turn your processes into a connected system
- Fiyat yine karmaşıklığa göre belirlenir; kapılar sadece ziyaretçinin kendini bulmasını sağlar.

## 4. Sayfa haritası (TR kökte, EN `/en/` altında aynısı)
| Rota | İçerik |
|---|---|
| `/` | Ana sayfa (7 bölüm, aşağıda) |
| `/otomasyon` | Paket merdiveni (Hazır → Bağlantılı → Kapsamlı → Özel) |
| `/otomasyon/talep-yakalama`, `/randevu-hatirlatma`, `/odeme-takibi`, `/evrak-toplama`, `/yorum-isteme` | Hazır otomasyon başına bir sayfa. Aynı şablon, ama örnek, çıktı ve sınırlar her sayfada kendine özgü |
| `/ureticiler` | Soğuk mail kampanyasının niyet sayfası: teklif talebi örnek çıktısı, Kapsamlı paket, nasıl çalışıldığı. `/surec-otomasyonu`'nun içeriği buraya taşınır |
| `/asistanlar` | AI telefon resepsiyonu + WhatsApp asistanı, kullanım paketleri |
| `/web-ve-reklam` | Web siteleri + Meta/Google reklam yönetimi |
| `/fiyatlandirma` | Tek fiyat merkezi. Bölgeye göre TL veya £ |
| `/isler` | Canlı müşteri sitesi (kafe, online sipariş) + "kavram demosu, müşteri işi değil" etiketli demolar + "Bugünkü kanıt" sayacı |
| `/hakkimizda` | Gerçek kurucu fotoğrafı, şirket numarası, Companies House bağlantısı, çalışma biçimi |
| `/iletisim` | Büyük WhatsApp / Ara / E-posta butonları, altında form, en altta adres ve sicil bilgisi |
| `/gizlilik-ve-guvenlik` | Verinin nerede tutulduğu, KVKK/GDPR, onay noktaları, iade şartları |
| `/blog` | Mevcut yazılar ve karşılaştırma makaleleri burada toplanır |

- **301 yönlendirmeleri:**
  - `/services`, `/solutions` → `/otomasyon`
  - `/sorunlar/*` → ilgili `/otomasyon/*` sayfası
  - n8n, WhatsApp AI ve sesli AI sayfaları → `/otomasyon` veya `/asistanlar`
  - `/pricing`, `/pricing/automation`, `/pricing/local`, `/packages` → `/fiyatlandirma`
  - `/surec-otomasyonu` → `/ureticiler`
  - Karşılaştırmalar → `/blog/...`
  - UK muhasebe sayfası → en yakın EN sayfa
  - Hiçbir sayfa topluca ana sayfaya yönlendirilmez.
- **Sektör sayfaları:** Sadece trafiği veya kendine özgü içeriği olanlar şablon olarak kalır (Search Console'a bakılarak). Diğerleri en yakın sayfaya 301 alır.

## 5. Ana sayfa (7 bölüm)
1. **Hero:**
   - Başlık: "İşi sistem yürütür, kararı siz verirsiniz."
   - Kısa açıklama: otomasyon, web, reklam ve AI asistan; UK ve Türkiye.
   - İki kapı + onay simülatörü.
   - Laptop görseli veya sahte panel yok.
2. **Bugünkü kanıt şeridi:**
   - UK'de kayıtlı şirket ve Companies House bağlantısı, kurucunun adı.
   - "1 ödeyen müşteri · 1 canlı site · 3 kavram demosu · güncelleme tarihi" (sayılar ve tarih elle güncellenir).
3. **Hazır otomasyonlar:** 5 kart, her biri kendi sayfasına gider.
4. **Bağlantılı ve kapsamlı sistemler:** üretici örneği, örnek çıktı, `/ureticiler` bağlantısı.
5. **Web, reklam ve asistan:** iki kart.
6. **Nasıl çalışıyoruz + fiyatların başlangıç noktaları:** keşif → yazılı kapsam → deneme veya demo → onay → bakım.
7. **Kurucu ve kapanış:** gerçek fotoğraf, cevap süresi, tek çağrı (WhatsApp).

## 6. Güven (oybirliği)
- Gerçek kimlik: Companies House bağlantısı, adres, kurucunun adı ve gerçek fotoğrafı. AI ile kurucu fotoğrafı üretilmez.
- Tek gerçek müşteri işi kafe sitesidir; kapsamı tam yazılır, performans iddiası eklenmez.
- Demolar "Kavram demosu, müşteri işi değil" etiketiyle gösterilir. **Saç ekimi demosu kaldırılır** (3/3; sağlık mevzuatı ve etik riski). Yerine araç servisi randevusu veya emlak gösterimi gibi bir demo konabilir.
- İndirilebilir örnek teslimatlar: iş akışı haritası, onay matrisi, devir belgesi.
- Yazılı sınırlar: sahiplik, iptal, kullanım ücretleri, destek, veri saklama.
- Tek kurucu olmak saklanmaz, satış argümanıdır: "işi kuran kişiyle konuşursunuz". Aynı anda alınan iş sayısının sınırlı olduğu açıkça yazılır.

## 7. Görseller (oybirliği)
- **Stil:** soğuk beyaz minyatür mimari, ince kobalt rota çizgileri, net yönlü ışık, hafif doku. Yeşil sadece her görseldeki tek "onaylandı" noktasında kullanılır. İnsan yok.
- Her görselde başlığın oturacağı **negatif alan** bırakılır. Geniş görsellerin mobil için ayrıca dikey versiyonu üretilir.

| # | Görsel | Masaüstü | Mobil |
|---|---|---|---|
| 1 | Hero arka planı: farklı yerlerden gelen işler tek bir yeşil ışıklı onay masasında birleşiyor | 16:9, solda boşluk | 4:5, üstte boşluk |
| 2 | Küçük işletme kapısı: dükkân veya salon ölçeğinde minyatür, tek görev istasyonu | 1:1 | 1:1 |
| 3 | Üretici kapısı: atölye/depo minyatürü, belgeden onay masasına giden yol | 1:1 | 1:1 |
| 4 | `/otomasyon` bandı: beyaz modüllerden dallanan kobalt raylar | 16:9 | 4:5 |
| 5 | `/ureticiler` başlığı: depo, ofis ve atölyeyi birleştiren tek sistem | 16:9 | 4:5 |
| 6 | `/asistanlar`: ses ve mesaj akışlarının tek bir insan kontrollü kuyrukta birleşmesi | 3:2 | 4:5 |
| 7 | `/web-ve-reklam`: arama sonucu → vitrin modülü → onay | 3:2 | 4:5 |
| 8 | 404: yolunu kaybetmiş tek kobalt rota | 16:9 | 4:5 |
| 9 | Paylaşım kartı (OG) 1200×630: yeni logo + "İşi sistem yürütür, kararı siz verirsiniz" + şirket numarası | — | — |

- **Gerçek olarak kullanılacaklar:** kurucu fotoğrafı (kullanıcıdan istenecek) ve kafe sitesinin ekran görüntüsü.
- **Yasak:** robot, parlayan beyin, neon devre, sahte panel ve uydurma rakam, gerçekmiş gibi gösterilen müşteri mekânı, stok gülümseyen insanlar, turuncu tonlar, AI ile üretilmiş insan portresi.

## 8. Başarısızlık riskleri
- Eski sayfaları "hepsi kalsın" diye tutmak. Telefondan yönetilen tek kişilik site 6 ay sonra bayatlamış görünür.
- Simülatörün canlı panel gibi görünmesi.
- Demoların kanıt gibi sunulması.
- Hero'nun hâlâ "küçük işletme sitesi" gibi okunması.
- Ajans büyüklüğünde görünmeye çalışmak: Companies House'a bakan kişi tek direktör görür.
- Ağır sinematik görseller: ziyaretçinin karar süresi 60 saniyenin altında (tahmin) ve çoğu mobilde.

## 9. Açık kalanlar (kullanıcıya)
- Kurucu fotoğrafı (gerçek) gerekiyor.
- Kafe sitesinin sahibinden "örnek olarak gösterme" izni.
- UK reklam müşterisinin adı kanıtta geçebilir mi?
- Logo önerisi ("mgl ai" + yeşil onay karesi) için son söz kullanıcıda.
