-- 2026-09-02 — Parola özeti sütunu
--
-- Neden: register parolayı hiç saklamıyordu ve login yalnızca kod içine gömülü
-- sabit bir demo parolasıyla çalışıyordu. Yani kayıt olan herkes doğrulama
-- olmadan geçerli oturum alıyordu. Güvenlik kontrolünde kritik olarak işaretlendi.
--
-- Biçim: pbkdf2$<iterations>$<salt_hex>$<hash_hex>  (PBKDF2-SHA256, 100.000 tur)
-- NULL kalan kayıtlar giriş yapamaz — parola sıfırlama akışından geçmeleri gerekir.

ALTER TABLE user ADD COLUMN password_hash TEXT;
