# 🚀 MGL Digital AI - Deployment Guide

## 📋 **Production Deployment Checklist**

### **1. 🔧 Google Cloud Console Ayarları**

**OAuth Client ID Güncellemeleri:**
- **Authorized JavaScript origins**:
  ```
  https://mgldigitalmedia.com
  https://www.mgldigitalmedia.com
  ```
  
- **Authorized redirect URIs**:
  ```
  https://mpobhyzqjrgdrsmretyi.supabase.co/auth/v1/callback
  ```

### **2. 🗄️ Supabase Dashboard Ayarları**

1. **Settings → General**:
   - **Site URL**: `https://mgldigitalmedia.com`
   
2. **Authentication → URL Configuration**:
   - **Additional redirect URLs**:
     ```
     https://mgldigitalmedia.com/auth/callback
     https://www.mgldigitalmedia.com/auth/callback
     ```

### **3. 💻 Environment Dosyası (.env.production)**

```env
VITE_SUPABASE_URL=https://mpobhyzqjrgdrsmretyi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wb2JoeXpxanJnZHJzbXJldHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAyMDUsImV4cCI6MjA3MjE0NjIwNX0.cHEWdDo60JwUJoOwYc21MF4EJ2lt2rMMH7kfFVgNQuM
VITE_DEV_MODE=false
VITE_PRODUCTION_DOMAIN=https://mgldigitalmedia.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RFLxcDsBtMM0UXXQDu7lS0WJ9ueFL2yXhbgxs0Co4zJclWVhUKKjK1fX39Wit4RPzHQptjGiJGPjC5VeQTvGagq002puDyqkL
```

### **4. 🏗️ Build Commands**

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build (optional)
npm run preview
```

### **5. 📂 Deployment Files**

**Deploy edilecek dosyalar**: `dist/` klasörü

### **6. 🌐 Domain DNS Ayarları**

**mgldigitalmedia.com** için:
- **A Record**: Hosting provider IP'si
- **CNAME Record**: `www` → `mgldigitalmedia.com`

### **7. 🔒 SSL Certificate**

Production'da HTTPS zorunlu (Google OAuth gereksinimi).

---

## ✅ **Test Checklist**

Production'da test edilecekler:
- [ ] Ana sayfa yükleniyor
- [ ] Türkçe/İngilizce dil değiştirme
- [ ] Email/password giriş sistemi
- [ ] **Google OAuth giriş sistemi**
- [ ] Logout fonksiyonu
- [ ] Ürünler sayfası
- [ ] Stripe ödeme sistemi
- [ ] Lead capture (Fırsatları Keşfet)
- [ ] Responsive design (mobil/tablet)

---

## 🆘 **Troubleshooting**

**Google OAuth Sorunları:**
1. Redirect URI'ları kontrol et
2. OAuth Consent Screen ayarlarını doğrula
3. Browser cache temizle
4. HTTPS kullanıldığından emin ol

**Supabase Bağlantı Sorunları:**
1. Site URL ayarlarını kontrol et
2. CORS policy ayarlarını doğrula
3. Environment variables'ı kontrol et

---

## 📞 **Support**

Deployment sırasında sorun yaşarsan:
- GitHub Issues açabilirsin
- Environment variables'ı kontrol et
- Browser developer console'u incele