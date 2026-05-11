---
title: "WhatsApp AI Asistan ile İşletme Otomasyonu: 2026 Tam Rehberi"
description: "WhatsApp AI asistan nedir, nasıl kurulur, hangi işletmelere uygun? Evolution API + n8n tabanlı gerçek kurulum rehberi ve 2026 maliyet analizi."
date: "2026-05-03"
language: "tr"
tags: ["whatsapp", "ai-asistan", "otomasyon", "n8n", "evolution-api"]
cover: ""
faqs:
  - question: "WhatsApp AI asistan kurmak ne kadar sürer?"
    answer: "Evolution API + n8n altyapısıyla temel bir WhatsApp AI asistan 3-7 iş günü içinde devreye alınabilir. Sektöre özel bilgi tabanı ve CRM entegrasyonu eklenirse süre 2-3 haftaya uzayabilir."
  - question: "WhatsApp Business API ile Evolution API arasındaki fark nedir?"
    answer: "WhatsApp Business API, Meta'nın resmi bulut çözümüdür; mesaj başına ücret alır ve onay süreci gerektirir. Evolution API ise açık kaynaklı, self-hosted bir Baileys uygulamasıdır; sabit maliyetle sınırsız mesaj gönderir ve kurulum süreciniz daha hızlıdır."
  - question: "AI asistan gerçekten doğal konuşma yapabiliyor mu?"
    answer: "Evet. n8n workflow'ları ile GPT-4o veya benzeri LLM'lere bağlanıldığında asistan; soru anlama, bağlam tutma, çok adımlı konuşma ve Türkçe/İngilizce geçişleri yapabilir. Belirli sorular için önceden hazırlanmış yanıtlar da eklenebilir."
  - question: "Müşteriler bot olduğunu anlıyor mu?"
    answer: "İyi tasarlanmış bir bot, müşterilerin büyük çoğunluğu tarafından fark edilmez. Ancak 'insan mısın?' sorusuna dürüst yanıt vermek etik açıdan doğru yol olduğu için bunu sisteminize dahil etmenizi öneririz."
  - question: "Mevcut CRM'imle entegre olabilir mi?"
    answer: "n8n; HubSpot, Pipedrive, Zoho, Salesforce ve 400+ uygulamaya resmi entegrasyon sunar. Özel REST API olan herhangi bir yazılıma da HTTP node ile bağlanılabilir."
  - question: "Aylık maliyeti ne kadar?"
    answer: "Temel kurulum: sunucu maliyeti ~€15-30/ay + n8n cloud veya self-hosted. MGL olarak kurulum dahil aylık 3.999 TRY/£119'dan başlayan paketler sunuyoruz. Detaylar için /whatsapp-ai-asistan sayfasını ziyaret edin."
---

**TL;DR:** WhatsApp AI asistan, işletmenizin gelen WhatsApp mesajlarını 7/24 otomatik olarak karşılayan, yanıtlayan ve yönlendiren bir yazılım sistemidir. Evolution API + n8n + LLM üçlüsüyle kurulur; aylık sabit maliyetle sınırsız mesaj işler. Randevu alma, SSS yanıtlama, lead kalifikasyonu ve CRM entegrasyonu tek sistemde çalışır.

---

## WhatsApp AI Asistan Nedir?

WhatsApp AI asistan, işletmenizin WhatsApp hattına gelen müşteri mesajlarını yapay zeka destekli bir yazılım sistemi aracılığıyla otomatik olarak karşılayan, anlayan ve yanıtlayan bir çözümdür. 2026 itibarıyla Türkiye ve Birleşik Krallık'taki küçük ve orta ölçekli işletmelerin en hızlı büyüyen dijital yatırımı haline gelmiştir.

Geleneksel bir WhatsApp Business hesabında müşteri mesajını bir çalışanın okuması ve yanıtlaması gerekir. Bu, mesai saatleri dışında cevapsız kalan yüzlerce mesaj, kaçan randevu ve mutsuz müşteri anlamına gelir. WhatsApp AI asistan bu sorunun kalıcı çözümüdür.

### Nasıl Çalışır?

1. **Mesaj gelir:** Müşteri işletmenizin WhatsApp numarasına yazar
2. **Sistem yakalar:** Evolution API mesajı alır ve n8n workflow'una iletir
3. **AI anlar:** n8n, mesajı LLM (GPT-4o veya benzeri) ile işler
4. **Yanıt üretilir:** Bilgi tabanınıza dayalı, doğal dilde yanıt oluşturulur
5. **Gönderilir:** Yanıt saniyeler içinde müşteriye ulaşır
6. **Kayıt tutulur:** Konuşma CRM'inize veya Google Sheets'e işlenir

## Hangi İşletmeler Kullanıyor?

WhatsApp AI asistan, yüksek mesaj hacmi ve tekrarlayan sorularla karşılaşan her işletme için uygundur:

- **Diş klinikleri ve estetik merkezler:** Randevu alma, fiyat bilgisi, doktor müsaitliği sorgulamaları
- **Kuaför ve güzellik salonları:** Seans rezervasyonu, fiyat listesi, iptal-değişiklik
- **Emlakçılar:** İlan bilgisi, gezme randevusu, kredi hesaplama yönlendirmesi
- **E-ticaret işletmeleri:** Sipariş takibi, iade süreçleri, ürün soruları
- **Restoranlar:** Rezervasyon, menü bilgisi, özel gün organizasyonu
- **Eğitim kurumları:** Kayıt süreci, ders programı, ücret bilgisi
- **Profesyonel hizmet şirketleri:** Danışmanlık randevusu, ön bilgi toplama

## Evolution API vs WhatsApp Business API

Bu iki çözüm arasındaki farkı anlamak önemlidir çünkü maliyet ve özellik yapısı temelden farklıdır.

| Özellik | Evolution API | WhatsApp Business API |
|---------|--------------|----------------------|
| Altyapı | Self-hosted (açık kaynak) | Meta Cloud |
| Mesaj ücreti | Yok (sabit sunucu maliyeti) | Konuşma başına ~$0.05-0.15 |
| Onay süreci | Gerekmez | Meta onayı gerekir (2-4 hafta) |
| Kurulum süresi | 1-3 gün | 2-4 hafta |
| Özelleştirme | Tam kontrol | Meta sınırlamaları |
| Ölçekleme | Sınırsız | Ücret artışı ile ölçeklenir |
| Uygun kime | KOBİ'ler, ajanslar | Büyük kurumsal şirketler |

MGL Digital Media olarak biz **Evolution API + n8n** kombinasyonunu tercih ediyoruz. Bu yaklaşım KOBİ bütçelerine uygun, özelleştirmeye açık ve kurulumu hızlıdır.

## N8N ile WhatsApp Otomasyonu Nasıl Kurulur?

n8n, görsel arayüzü ile karmaşık otomasyonları kolayca oluşturmanıza olanak tanıyan açık kaynaklı bir workflow aracıdır. Evolution API ile birleştiğinde güçlü bir WhatsApp otomasyonu platformu oluşturur.

### Temel Kurulum Adımları

**Adım 1 — Altyapı Kurulumu**
- VPS sunucu (DigitalOcean, Hetzner veya benzeri, min. 2GB RAM)
- Docker ile Evolution API deployment
- n8n kurulumu (cloud veya self-hosted)

**Adım 2 — WhatsApp Bağlantısı**
- Evolution API üzerinden yeni instance oluştur
- QR kodu tara, WhatsApp hesabını bağla
- Webhook URL'ini n8n'e yönlendir

**Adım 3 — Workflow Tasarımı**
n8n'de şu node'lar ile temel bir flow kurulur:
- Webhook node (Evolution'dan gelen mesajları yakala)
- IF node (mesaj tipi kontrolü: metin, ses, görsel)
- OpenAI/Anthropic node (AI yanıt üretimi)
- HTTP node (Evolution API ile yanıt gönderimi)
- CRM node (kayıt tutma)

**Adım 4 — Bilgi Tabanı Entegrasyonu**
Sektöre özel bilgileri (fiyat listesi, SSS, çalışma saatleri) sisteme dahil etmek için:
- Google Sheets veya Airtable bağlantısı
- Pinecone/Supabase pgvector ile vektör arama (RAG)
- Belirli anahtar kelimelere özel yanıt kuralları

**Adım 5 — Test ve Canlıya Alma**
- Farklı soru senaryolarıyla test et
- Hatalı yanıtları düzelt, bilgi tabanını güncelle
- Canlıya al, ilk hafta yakın takip et

## Gerçek Kullanım Senaryoları

### Senaryo 1: Diş Kliniği

Sabah 07:30'da bir hasta "Bu hafta pazar çekimi için ne zaman boş yeriniz var?" diye yazar. Asistan, takvim entegrasyonu sayesinde müsait slotları listeler, hasta randevu alır ve otomatik SMS/WhatsApp hatırlatıcı sistemine eklenir. Kliniğin ilk çalışanı 09:00'da geldiğinde randevu zaten alınmış ve CRM'e işlenmiştir.

### Senaryo 2: E-Ticaret

Müşteri gece 23:00'de "Siparişim ne zaman gelecek?" diye sorar. Asistan, sipariş numarasını alır, kargo API'sinden durum sorgular ve "Siparişiniz 14 Mayıs'ta saat 14:00-18:00 arasında teslim edilecek" yanıtını verir. Müşteri hizmetleri ekibine hiçbir yük binmez.

### Senaryo 3: Emlak Ofisi

Potansiyel alıcı Avrupa'dan "Beşiktaş'ta 2+1 daireniz var mı?" diye sorar. Asistan, portföydeki uygun ilanları listeler, fotoğrafları paylaşır ve gezi randevusu ayarlar. Broker sabah geldiğinde randevu takviminde hazır bulur.

## Maliyet Analizi (2026)

### Kendiniz Kurarsanız
- VPS sunucu: ~€20-40/ay
- n8n cloud (Starter): $24/ay
- LLM API (GPT-4o, ~500K token/ay): ~$15-25/ay
- **Toplam: ~€60-90/ay** + kurulum emeği

### MGL Digital Media ile
- WhatsApp Asistan Paketi: 3.999 TRY/ay (£119)
- Çok Kanal Asistan Paketi: 9.999 TRY/ay (£299)
- Kurulum dahil, teknik bakım dahil, destek dahil

[Fiyat detayları için → /whatsapp-ai-asistan](/whatsapp-ai-asistan)

## Dikkat Edilmesi Gerekenler

**KVKK Uyumu:** Müşteri konuşmalarını kaydedip saklıyorsanız KVKK gereklilikleri uygulanır. Açık rıza metni, veri saklama politikası ve silme süreçlerini baştan planlayın.

**Ses Mesajları:** Sesli mesaj gönderen müşteriler için Whisper API entegrasyonu ekleyin; transkripsiyon ile asistan ses mesajlarını da anlayabilir.

**Görsel İşleme:** Müşteri ürün fotoğrafı gönderirse ne olacak? GPT-4o Vision ile görüntü analizi yapılabilir; bu özelliği planlıyorsanız workflow'a ekleyin.

**İnsan Devri:** "Müdür ile konuşmak istiyorum" gibi durumlarda asistanın görüşmeyi canlı bir çalışana aktarması için net bir devir protokolü tasarlayın.

## Sonuç

WhatsApp AI asistan, 2026'da Türkiye ve UK'deki KOBİ'ler için en yüksek ROI sağlayan dijital yatırım kategorisindedir. Sabit altyapı maliyetiyle 7/24 çalışan bir sisteme sahip olmak; hem müşteri memnuniyetini artırır hem personel yükünü azaltır hem de kaçan fırsatları sıfıra indirir.

Evolution API + n8n kombinasyonu, Meta'nın Business API'sinden 5-10x daha uygun maliyetle aynı işlevselliği sunar ve KOBİ'ler için tercih edilen standart haline gelmiştir.

Kendi işletmeniz için ne tür bir asistan kurabileceğinizi öğrenmek isterseniz: [ücretsiz 15 dakikalık analiz randevusu alın](/whatsapp-ai-asistan).

---

*Yazar: Mustafa Gul · MGL Digital Media, Londra · info@mgldigitalmedia.com*
