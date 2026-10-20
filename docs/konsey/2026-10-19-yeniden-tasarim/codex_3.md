## Nihai karar

**C. Rotalar**

1. **`/ureticiler`: Evet.** Canlı kampanya nedeniyle ayrı ve güçlü bir niyet sayfası gerekli. E-postalar kök domaine gitmeye devam etsin; ana sayfada `/ureticiler` için görünür bir geçiş bulunsun. E-postaya fiyat linki eklenmesin.

2. **Katalog otomasyonları: Evet.** Beş otomasyon için ayrı sayfa açın:

   `/otomasyon/lead-toplama`, `/randevu-hatirlatma`, `/odeme-takibi`, `/belge-toplama`, `/yorum-istekleri`.

   Mevcut `/sorunlar/*` sayfaları karşılıklarına 301 yönlendirilsin. Sayfalar aynı şablonu kullanabilir fakat örnek, çıktı ve sınırlamaları özgün olmalı.

3. **Ayrı tutun:** `/asistanlar` ve `/web-ve-reklam`. Satın alma niyetleri ve teslimat kapsamları farklı; tek “yerel işletme” sayfası teklifleri bulanıklaştırır.

4. **Seçici koruma:** Gerçek arama niyeti ve özgün içeriği bulunan sektör/GEO sayfaları şablon altında kalsın. Karşılaştırmalar `/blog` içine taşınsın. İnce, tekrarlı veya artık teklifle uyuşmayan sayfalar en yakın ilgili sayfaya 301 alsın. Blanket yönlendirme veya blanket koruma yapmayın.

**D. Ana sayfa fork’u**

Fiyatlandırmayla uyumlu olduğu için **karmaşıklık fork’u** kullanılmalı; büyüklük, alt metinde açıkça gösterilmeli. İki seçenek aynı simülatörü farklı başlangıç göreviyle açmalı.

**TR**

- **Hazır bir otomasyonla başlayın**  
  Küçük işletmeler ve tek bir darboğazı hızla çözmek isteyen ekipler için.
- **Bağlantılı bir sistem kurun**  
  Üreticiler, distribütörler ve birden fazla süreci birlikte yönetmek isteyen şirketler için.

**EN**

- **Start with a ready-made automation**  
  For small businesses and teams that want to remove one bottleneck quickly.
- **Build a connected system**  
  For manufacturers, distributors, and companies coordinating multiple processes.

**Görüş değişikliği:** Evet—canlı cold-email kampanyası nedeniyle `/ureticiler` konusunda “hayır”dan “evet”e geçtim.