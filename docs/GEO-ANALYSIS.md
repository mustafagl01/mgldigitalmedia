# GEO analizi — mgl-ai.com (16 Eki 2026)

Soru: ChatGPT / Perplexity / Google AI Overviews'a "teklif hazırlama otomasyonu", "distribütör için teklif otomasyonu",
"WhatsApp'tan gelen siparişleri otomatikleştirme" gibi sorular sorulunca MGL nasıl önerilir?

## GEO hazırlık puanı: ~40/100 (tahmin, ölçüm değil)
| Alan | Durum | Puan (tahmini) |
|---|---|---|
| AI tarayıcı erişimi (robots.txt) | ✅ GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended izinli | 18/20 |
| llms.txt | ⚠️ Var (174 satır) ama eski konumlandırma: WhatsApp asistanı, sesli AI, reklam. Ana işimiz olan teklif/süreç otomasyonu neredeyse yok (3 geçiş) | 8/15 |
| Sunucu tarafı içerik (JS'siz okunabilirlik) | ❌ En büyük açık. `/surec-otomasyonu/` ham HTML'inde sayfanın asıl içeriği YOK: başlık + genel İngilizce "ajans" metni var; adımlar, SSS, "ne yapmıyoruz", 14 gün deneme detayı yok. AI tarayıcıları JavaScript çalıştırmaz → sayfayı boş gibi görür | 4/20 |
| Alıntılanabilir pasajlar (134-167 kelimelik net cevap blokları, "X nedir" tanımları) | ⚠️ Blog yazılarında kısmen; hizmet sayfalarında yok | 6/25 |
| Yapısal veri | ⚠️ Organization, ProfessionalService, Service, Offer var; FAQPage/HowTo/Article+yazar yok | 4/10 |
| Marka anılmaları (LinkedIn, YouTube, Reddit, sektör siteleri) | ❌ Yok denecek kadar az. ChatGPT/Perplexity en çok buralardan alıntı yapıyor | 0/10 |

## Platform bazında
- **Google AI Overviews:** önce klasik sıralama gerekir (alıntıların büyük kısmı ilk 10 sonuçtan). Türkçe "teklif otomasyonu" araması rekabeti düşük → doğru sayfa + SSR ile şansı yüksek.
- **ChatGPT:** Bing dizini + güvenilir kaynaklar. Sayfa içeriği JS'siz görünmeli; LinkedIn/YouTube anılmaları güçlü sinyal.
- **Perplexity:** topluluk tartışmaları (Reddit, forumlar) ve net cevap pasajları.

## En etkili 5 değişiklik (sırayla)
1. **Ön-render (SSR) düzeltmesi:** `prerender.mjs` hizmet ve blog sayfalarının GERÇEK içeriğini statik HTML'e yazsın (şu an ortak bir yedek metin basıyor). Bu yapılmadan diğerleri yarım kalır.
2. **llms.txt'yi yeniden yaz:** ilk paragraf "üretici, toptancı ve distribütörler için teklif ve sipariş otomasyonu" olsun; /surec-otomasyonu, ilgili blog yazıları, 14 gün deneme, kim olduğumuz (şirket no, adres) en üstte.
3. **/surec-otomasyonu'na cevap blokları:** "Teklif hazırlama otomasyonu nedir?", "Distribütörler WhatsApp'tan gelen kod listelerini nasıl otomatik teklife çevirir?", "Ne kadar sürede kurulur, ne kadar tutar?" — her biri 130-170 kelime, ilk cümlede net cevap + FAQPage şeması.
4. **Blog kümesi (6-8 yazı, TR + EN):** teklif otomasyonu odaklı, gerçek süreç anlatan, uydurma rakamsız yazılar (konu önerileri aşağıda). Her yazıda yazar (Mustafa Gül), tarih, güncelleme tarihi, Person şeması.
5. **Marka anılmaları:** LinkedIn'de haftalık kısa yazı (blog özetleri), 1-2 dakikalık YouTube demo videosu (taslak teklifin nasıl çıktığı), sektör forumlarında/Reddit'te faydalı cevaplar (reklam değil).

## Blog konu önerileri (teklif otomasyonu kümesi)
1. Distribütörler için teklif hazırlama otomasyonu: WhatsApp kod listesinden taslak teklife (rehber)
2. Excel fiyat listesiyle müşteri talebini eşleştirme: elle mi, otomatik mi? (karşılaştırma tablosu)
3. Teklif takibi: cevapsız kalan teklifler nasıl hatırlatılır?
4. Muadil kod bulma: rulman/hidrolik distribütörleri için çözüm yolları
5. Sipariş girişini otomatikleştirmek: PDF/mail siparişlerinden ERP'ye
6. EN: How UK distributors automate RFQ-to-quote (without replacing staff)
7. EN: Internal sales teams and manual quoting — where the time goes
Kural: uydurma istatistik yok; "henüz referansımız yok" dürüstlüğü korunur; her yazı bir gerçek süreci adım adım anlatır.

## Ölçüm
Ayda bir, aynı 10 soru ChatGPT, Perplexity ve Google'da sorulur; MGL geçiyor mu, hangi kaynak alıntılanıyor → `docs/GEO-OLCUM.md`.
