# Blender ile ölçülü iç mekân render'ı

Bu klasör, ham ölçülerden (genişlik / derinlik / tavan) fotoğraf çıktısı üreten
Blender Python otomasyonunu tutar. Site build'ine dahil değildir; `npm run build`
buraya bakmaz.

## Hızlı kullanım

```bash
blender -b -P tools/blender/room_render.py -- \
  --w 3.6 --d 4.2 --h 2.8 \
  --counter-depth 0.6 --counter-height 0.9 \
  --win-width 1.4 --win-height 1.3 --win-sill 1.0 \
  --samples 64 --out mutfak.png --save-blend mutfak.blend
```

Tüm ölçüler **metre**. Betik her çalıştığında sahnedeki her parçanın gerçek
boyutunu `[olcu]` satırlarıyla yazdırır — render'a bakıp "yaklaşık doğru"
demek yerine sayıyı okursun.

## Bilinen tuzaklar (hepsi bizzat çarpıldı)

| Tuzak | Ne olur | Çözüm |
|---|---|---|
| **Ubuntu deposundaki Blender** | `Error: Build without OpenImageDenoiser` ile render **hiç** çıkmaz | Betik bunu yakalayıp denoise'u kapatır ve sample'ı 4×'e çıkarır. Kalıcı çözüm: blender.org'un resmî derlemesi (OIDN içinde gelir) |
| **Kameraya elle Euler açısı vermek** | Oda ölçüsü değişince kamera duvara bakar, render düz gri çıkar | `TRACK_TO` constraint ile odanın içindeki bir hedefe kilitlenir |
| **Pencere boşluğu için boolean** | Bozuk normal, delik kapanmaz | Duvar 4 parça (alt / üst / sol / sağ) örülür, boolean yok |
| **Bedava .obj/.gltf modeller** | Ölçek (cm/inch/birimsiz), pivot ve yön tutmaz; lisans sorunu | Mobilyayı parametrik kutulardan üret; hazır model **sadece** ölçeği doğrulanıp lisansı okunduktan sonra |

## MCP for Blender (`ahujasid/mcp-for-blender`) — nerede çalışır, nerede çalışmaz

Bu paket **headless bir sunucuda çalışmaz**. Mimarisi şu:

```
LLM istemcisi  ──stdio──>  uvx mcp-for-blender  ──TCP :9876──>  Blender ADDON
                                                                (çalışan GUI içinde)
```

Addon komutları `bpy.app.timers` ile **viewport olay döngüsünde** işler ve
sunucu `View3D > Sidebar > MCP for Blender > Start MCP Server` düğmesiyle
başlar. Yani ekranı olmayan bir konteynerde başlatılacak bir şey yoktur.
Orada doğru yol yukarıdaki `blender -b -P` çağrısıdır.

**Kendi makinende** (Blender GUI açıkken) kurulumu:

```bash
# 1) uv  (pip ile DEĞİL — resmî installer)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2) MCP sunucusunu istemciye tanit
claude mcp add blender uvx mcp-for-blender

# 3) Blender eklentisi
uvx mcp-for-blender install-addon
#    Blender: Edit > Preferences > Add-ons > "Interface: MCP for Blender" etkinlestir
#    Viewport'ta N > MCP for Blender sekmesi > Start MCP Server
```

Not: aynı anda **tek** MCP sunucusu örneği çalışmalı (hem Claude Desktop hem
Cursor'da açık olmasın).

## Hangisi ne zaman

- **`blender -b -P` (bu betik)** — toplu / tekrarlanabilir üretim. Aynı ölçüden
  10 varyant, CI'da render, versiyonlanabilir girdi. Ölçü onayı için doğru araç.
- **MCP for Blender** — interaktif tasarım. Blender açık, sen izlerken model
  değişiyor, "şu dolabı 10 cm sağa al" diyorsun. Keşif için doğru araç.

İkisi çelişmez: MCP'de keşfet, sonuçlandığında ölçüleri bu betiğe parametre
olarak geçir.
