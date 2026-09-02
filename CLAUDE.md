# mgl-ai.com — MGL Digital Media ajans sitesi

Bu klasör **mgl-ai.com**'un tek geçerli kaynağıdır. Kararlar ve gerekçeleri
`PLAN.md` içinde; oradan başla.

## Ne, nerede

| | |
|---|---|
| Repo | `github.com/mustafagl01/mgldigitalmedia` (**public** — sır yazma) |
| Barındırma | Cloudflare **Pages** — `main`'e push = otomatik deploy |
| Stack | Vite + React + TypeScript, statik prerender (`scripts/prerender.mjs`) |
| Fiyat modeli | `src/config/pricing.ts` — **tek kaynak** |
| Stripe kataloğu | `src/stripe-config.ts` — gerçek `priceId`'ler |
| Dil | `src/contexts/LanguageContext.tsx` (TR/EN, istemci tarafı) |
| Bölge | `src/contexts/LocationContext.tsx` (TR/GB fiyat seçimi) |

## ⚠️ Deploy: iki ayrı artefakt

`main`'e push **yalnızca Pages sitesini** yayınlar.

| Artefakt | Nasıl çıkar |
|---|---|
| Site (Pages) | `git push origin main` → otomatik |
| `worker/` (Cloudflare Worker) | **`wrangler deploy` — push ile ÇIKMAZ** |
| D1 şeması | **`wrangler d1 migrations apply` — push ile ÇIKMAZ** |

Worker'a dokunulduysa sıra: **önce migration, sonra worker.** Ters yaparsan
sütun bulunamadığı için kayıt/giriş kırılır.

Worker şu an `mgl-digital-media-auth.mustafagl01.workers.dev` üzerinde eski kodla
duruyor ve mgl-ai.com'a route edilmemiş; bu yüzden sitedeki ödeme akışı çalışmıyor.
Ayrıntı ve sıra: `PLAN.md` açık konu 3.

## ⚠️ `npm run build` TİP KONTROLÜ YAPMAZ

`build` = `vite build && prerender`. Vite tipleri kontrol etmez. Sadece build'e
güvenmek 2026-09-02'de canlıda `ReferenceError: tier is not defined` ile paketler
sayfasını komple çökertti — build tertemiz geçmişti.

**Push etmeden önce her zaman:**

```bash
npx tsc --noEmit -p tsconfig.app.json   # kendi dokunduğun dosyalarda hata olmamalı
npm run build
```

Depoda önceden gelen `TS6133` (kullanılmayan React importu) uyarıları var; onlar
normal. Kendi değiştirdiğin dosyada çıkan her hata gerçektir.

## Metin yazarken

- **Fiyatı metne gömme.** Fiyat `pricing.ts`'den okunur (`formatPrice`,
  `pricing.packages.*`). Sayfa metnine elle rakam yazılırsa model değişince
  site kendi kendisiyle çelişir — 2026-09-02'de 26 satır böyle temizlendi.
- **Türkçe apostrof tuzağı:** tek tırnaklı TS string içinde `649 TRY'dir` yazma;
  string'i kapatır ve build kırılır. Ya `\'` ile kaçır ya da ekten kaçın
  ("649 TRY olur").
- Yeni Stripe fiyatı eklenirse **iki yere** yazılır: `src/stripe-config.ts` ve
  `worker/src/auth-handler.ts` içindeki `ALLOWED_PRICE_IDS`. Worker ayrı deploy
  artefaktı olduğu için import edemiyor.

## Klasör tuzağı

Bu reponun diskte birden fazla klonu olmuştu ve "en yeni commit tarihi" ölçütüyle
**2 ay eski** bir kopya güncel sanıldı. Klasör seçerken commit tarihine değil şuna bak:

```bash
git fetch && git status -sb        # "behind" varsa o kopya eskidir
```
