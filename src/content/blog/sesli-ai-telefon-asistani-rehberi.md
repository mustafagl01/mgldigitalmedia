---
title: "Sesli AI Telefon Asistanı: KOBİ'ler için Tam Rehber (2026)"
description: "Sesli AI asistan nedir, nasıl çalışır, Retell AI ile nasıl kurulur? Türkiye ve UK'deki işletmeler için maliyet, özellik ve kurulum rehberi."
date: "2026-05-01"
language: "tr"
tags: ["sesli-ai", "voice-ai", "retell-ai", "telefon-asistani", "otomasyon"]
cover: ""
faqs:
  - question: "Sesli AI Türkçe konuşabiliyor mu?"
    answer: "Evet. Retell AI, Türkçe konuşma tanıma ve sentezi destekler. 2026 itibarıyla Türkçe için ElevenLabs sesi ile birlikte kullanıldığında doğal ve akıcı konuşma kalitesi elde edilir."
  - question: "Sesli AI asistan kaç saniyede yanıt veriyor?"
    answer: "İyi yapılandırılmış bir Retell AI kurulumunda ilk yanıt süresi 0.8-1.5 saniyedir. Bu, insan operatörün 'Merhaba, nasıl yardımcı olabilirim?' demesinden daha hızlıdır."
  - question: "Müşteriler sesi robot olarak algılıyor mu?"
    answer: "ElevenLabs ve Eleven Turbo v2 sesi ile üretilen konuşma oldukça doğaldır; müşterilerin %60-70'i arama sonrasında robot olduğunu fark etmediklerini belirtiyor. Ancak yasal ve etik açıdan 'bu bir AI asistanıdır' bilgisini aramanın başında vermek önerilir."
  - question: "Sesli AI randevu alabilir mi?"
    answer: "Evet. Retell AI, n8n veya Zapier üzerinden Google Calendar, Calendly veya özel takvim sistemlerine bağlanabilir. Müşteri uygun saati söylediğinde sistem anında takvimde kontrol eder ve randevuyu oluşturur."
  - question: "Kaçırdığım aramaları karşılayabilir mi?"
    answer: "Evet. Çalışma saatleri dışındaki aramaları sesli AI asistan karşılar; randevu alır, bilgi verir veya acil durum mesajı bırakır. Bu sayede hiçbir müşteri teması kaçırılmaz."
  - question: "Kurulum maliyeti ne kadar?"
    answer: "Retell AI'ın temel planı $29/ay'dan başlar. MGL ile kurulum dahil paketlerimiz 3.999 TRY/£119'dan başlamaktadır. Detaylar için /sesli-ai sayfasını ziyaret edin."
---

**TL;DR:** Sesli AI telefon asistanı, işletmenizin gelen (ve giden) aramalarını yapay zeka kullanarak karşılayan, anlayan ve yanıtlayan bir sistemdir. Retell AI + ElevenLabs sesi + n8n kombinasyonuyla kurulur; kaçan aramaları sıfıra indirir, randevu alır ve 7/24 müşteri desteği sağlar.

---

## Sesli AI Asistan Nedir?

Sesli AI asistan, telefonunuza gelen aramaları gerçek zamanlı olarak algılayan, içeriği anlayan ve doğal sesle yanıtlayan yapay zeka tabanlı bir sistemdir. 2026'da bu teknoloji, birkaç yıl önce hayal bile edilemeyecek bir doğallık seviyesine ulaşmıştır.

Eski IVR sistemlerini ("Randevu için 1'e, bilgi için 2'ye basın") unutun. Modern sesli AI asistanlar gerçek konuşma yapar: "Doktorumu Cumartesi için değiştirmem gerekiyor, Mehmet Bey hafta sonu müsait mi?" gibi karmaşık soruları anlayıp yanıtlayabilir.

## Retell AI: Sesli AI'ın Mimarisi

MGL Digital Media olarak sesli AI projelerinde **Retell AI** platformunu kullanıyoruz. İşte sebebi:

- **Düşük gecikme:** Ortalama 0.8-1.2 sn yanıt süresi (WebSocket tabanlı gerçek zamanlı işleme)
- **Türkçe desteği:** Türkçe konuşma tanıma ve sentezi
- **Özelleştirilebilir:** Kendi ses modelinizi ekleyebilirsiniz
- **Webhook entegrasyonu:** n8n ile tam entegrasyon
- **Araç çağrıları (tool calls):** Asistan konuşma sırasında takvim sorgusu, CRM kaydı gibi işlemleri çağırabilir

### Retell AI Mimarisi Nasıl Çalışır?

```
Müşteri arar
     ↓
Retell AI hattı devreye girer (1-2 sn)
     ↓
ASR (Konuşma Tanıma) — OpenAI Whisper veya Deepgram
     ↓
LLM (Anlama) — GPT-4o ile konuşma mantığı
     ↓
TTS (Ses Sentezi) — ElevenLabs doğal ses
     ↓
Müşteri yanıtı duyar
     ↓
Gerektiğinde: n8n webhook → Takvim/CRM işlemi
```

## Kullanım Alanları

### Diş Kliniği ve Sağlık Merkezi

Türkiye'deki bir diş kliniğinin günde ortalama 40-60 arama aldığını düşünün. Bu aramaların %60'ı randevu alma, %25'i bilgi sorgulama, %15'i iptal/değişiklik. Bir asistanın tüm bu aramaları karşılaması yerine, AI asistan bu aramaların %80'ini tamamıyla çözebilir.

**Asistanın yapabilecekleri:**
- Müsait randevu slotlarını sorgulamak ve ayırtmak
- Doktor bilgisi vermek
- Sigorta kabul edilip edilmediğini söylemek
- Çalışma saatlerini bildirmek
- Acil durum için nöbetçi numarasına yönlendirmek

### Hukuk Bürosu

Avukatlar telefonda geçirdikleri zamanı minimalize etmek ister. Sesli AI asistan:
- Ön bilgi alır ("Hangi konuda danışmak istiyorsunuz?")
- Randevu ayarlar
- Temel belgeler ve süreçler hakkında bilgi verir
- Acil durumları önceliklendirip yönlendirir

### Emlak Ofisi

Hafta sonu gelen aramaları kaçırmak müşteri kaybetmek demektir. Sesli AI:
- Arayan müşteriyi karşılar
- İlgilenilen konut tipini ve bütçeyi sorar
- Uygun ilanlar hakkında bilgi verir
- Gezi randevusu ayarlar
- Broker'a lead özeti e-posta/WhatsApp olarak iletir

## Kurulum Süreci (Retell AI + n8n)

### Adım 1: Retell AI Hesabı ve Agent Oluşturma
Retell AI dashboard'undan yeni bir voice agent oluşturulur. Sistem prompt yazılır: asistanın kim olduğu, ne yapabileceği, konuşma tonu ve kurallar.

**Örnek system prompt başlangıcı:**
> "Sen Nisa Klinik'in dijital asistanısın. Adın Nisa. Türkçe konuşursun, nazik ve profesyonelsin. Amacın müşteri aramalarını karşılamak, randevu almak ve sorulara cevap vermek..."

### Adım 2: Telefon Numarası Bağlama
Türkiye için +90 numara (Twilio veya benzeri sağlayıcıdan), UK için +44 numara Retell AI'a bağlanır. Artık bu numarayı arayanlar AI asistanı ile konuşur.

### Adım 3: Tool (Araç) Entegrasyonu
Asistanın randevu alabilmesi için n8n üzerinde araç tanımlanır:
- `check_availability(date, time)` → takvim sorgular
- `create_appointment(name, phone, date, time, service)` → randevu oluşturur
- `get_info(topic)` → SSS bilgi tabanından yanıt getirir

### Adım 4: Test ve Kalibrasyon
Farklı senaryolar test edilir:
- Türkçe aksanlı konuşma tanıma kontrolü
- Bağlam takibi ("Az önce bahsettiğim Perşembe...")
- Belirsiz isteklere yanıt ("Yarın uygun değil misiniz?")
- Hata durumları ve geri dönüş mantığı

### Adım 5: Canlıya Alma
Gerçek telefon numarasına yönlendirme yapılır. İlk 1-2 hafta konuşma logları yakından izlenir, yanlış anlamalar düzeltilir.

## Maliyet Karşılaştırması

| Seçenek | Aylık Maliyet | Kapasite |
|---------|--------------|---------|
| Tam zamanlı asistan (asgari ücret) | ~11.000 TRY | Mesai saati, 1 hat |
| Yarı zamanlı asistan | ~5.500 TRY | Sınırlı saatler |
| Sesli AI (MGL WhatsApp Asistan) | 3.999 TRY | 7/24, sınırsız eşzamanlı hat |

**ROI hesabı:** Aylık 500 arayan, her aramanın 3 dakika sürdüğünü varsayalım. Bir asistanın aynı anda 1 arama karşılayabildiğini düşünürsek, en yoğun saatlerde %20-30 arama kaçırılır. Ortalama bilet değeri 1.500 TRY olan bir klinikte bu, aylık 15.000-20.000 TRY kayıp anlamına gelir.

## Dikkat Edilmesi Gereken Noktalar

### Türkçe Aksanlar ve Lehçeler
Konuşma tanıma, standart İstanbul Türkçesinde %95+ doğrulukla çalışır. Yöresel aksanlar ve hızlı konuşma tarzı bazen sorun yaratabilir. Başlangıçta test edilmesi önemlidir.

### Gürültülü Ortamlar
Arka planda müzik veya gürültü olan aramalar (kafe, dış ortam) konuşma tanımayı olumsuz etkiler. Noise cancellation filtreleri bunu minimize eder ancak mükemmel değildir.

### Çok Karmaşık Sorular
Asistan biliyor olduğu şeyleri son derece iyi yapar. Ancak beklenmedik sorular için "Bu konuyu daha ayrıntılı değerlendirmek için sizi uzmanımıza bağlayabilirim" gibi fallback mekanizması mutlaka kurulmalıdır.

## Sonuç

Sesli AI asistan, 2026'da artık laboratuvar projesi değil, gerçek iş çözümüdür. Türkiye'deki KOBİ'ler için aylık 4.000-10.000 TRY bandında 7/24 çalışan, hiç mola vermeyen, aksansız konuşan bir telefon elemanı artık mümkün.

[Sesli AI asistan hizmetleri hakkında detaylı bilgi için → /sesli-ai](/sesli-ai)

[WhatsApp AI asistan ile kombinlemek ister misiniz? → /whatsapp-ai-asistan](/whatsapp-ai-asistan)

---

*Yazar: Mustafa Gul · MGL Digital Media, Londra*  
*Güncelleme: Mayıs 2026*
