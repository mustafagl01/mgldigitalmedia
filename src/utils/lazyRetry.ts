import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/* Yeni sürüm yayınlanınca eski dosya adları (hash'li parçalar) silinir. Eski sürümü açık/önbellekte
   tutan ziyaretçi bir linke tıklayınca "Failed to fetch dynamically imported module" alır ve sayfa
   BOŞ kalır; yenileyince düzelir (kullanıcı 2026-10-20: "ilk açışımda sayfa gelmiyor").
   Çözüm: parça yüklenemezse sayfayı BİR KEZ yeniden yükle (taze HTML = doğru dosya adları). */

const KEY = 'mgl_chunk_reload_at';
const WINDOW_MS = 30_000;

export function reloadOnceForFreshBuild(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < WINDOW_MS) return false; // sonsuz döngü koruması
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // sessionStorage kapalıysa yine de bir kez dene
  }
  window.location.reload();
  return true;
}

export function lazyRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      if (reloadOnceForFreshBuild()) {
        // Sayfa yenileniyor; çözülmeyen bir söz vererek kısa süre boş bekle.
        return new Promise<{ default: T }>(() => undefined);
      }
      throw err;
    }
  });
}

/** Vite, ön yükleme (modulepreload) başarısız olunca bu olayı yayınlar. */
export function installChunkErrorGuard() {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    reloadOnceForFreshBuild();
  });
}

if (typeof window !== 'undefined') installChunkErrorGuard();
