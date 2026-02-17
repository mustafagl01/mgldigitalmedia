# 🚀 PROFIT ENGINE - Setup Instructions

## Quick Start

### 1. Pull Branch
```bash
git checkout feature/profit-engine
git pull origin feature/profit-engine
```

### 2. Install Dependencies
```bash
npm install
```

Yeni eklenen paketler:
- `react-countup` - Animasyonlu sayı sayaçları için
- `react-router-dom` - Routing için (zaten vardır)

### 3. Add Route to App.tsx

`src/App.tsx` dosyasını aç ve şunları ekle:

```typescript
import Pricing from './pages/Pricing';

// Router'da route ekle:
<Route path="/pricing" element={<Pricing />} />
```

### 4. Update Navigation (Optional)

Navbar component'inde "Pricing" linki ekle:

```typescript
<Link to="/pricing">
  Fiyatlandırma
</Link>
```

Veya eski "Otomasyon Satın Al" butonunu `/pricing`'e yönlendir.

### 5. Run Dev Server
```bash
npm run dev
```

Tarayıcıda aç: `http://localhost:5173/pricing`

---

## 📚 File Structure

```
src/
├── components/
│   └── pricing/
│       ├── SectorSelector.tsx       ✅ 4 sektör kartı
│       ├── BurnSimulator.tsx        ✅ Slider + hesaplama
│       ├── SavingsReveal.tsx        ✅ Yeşil ekran
│       ├── ComparisonCards.tsx      ✅ Personel vs AI
│       ├── PackageDetails.tsx       ✅ Paket detayları
│       ├── VoiceButton.tsx          ✅ Floating voice button
│       └── ProfitEngine.tsx         ✅ Ana component
├── data/
│   └── profit-engine-config.json  ✅ Tüm config
└── pages/
    └── Pricing.tsx               ✅ Route
```

---

## ⚙️ App.tsx Example

Eğer App.tsx'de routing yoksa şöyle ekle:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Home from './pages/Home'; // Mevcut ana sayfa

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* Diğer route'lar */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🐛 Troubleshooting

### Build Hatası: "eval is not defined"

`BurnSimulator.tsx`'de eval() kullanıyoruz. Eğer production build'de sorun çıkarsa:

```typescript
// eval yerine Function kullan:
const calculate = new Function('sliderValues', `
  const {${Object.keys(sliderValues).join(',')}} = sliderValues;
  return ${sectorConfig.calculation.formula};
`);
const monthlyBurn = calculate(sliderValues);
```

### TypeScript Hatası: "Cannot find module 'react-countup'"

```bash
npm install --save-dev @types/react-countup
```

### JSON Import Hatası

Eğer `profit-engine-config.json` import edemiyorsa, `tsconfig.json`'a ekle:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

---

## 🎨 Styling Notes

- Tüm componentler Tailwind CSS kullanıyor
- Dark mode colors: `bg-[#0A0E27]`, `bg-[#1A1F3A]`
- Accent color: `text-cyan-400`, `border-cyan-400`
- Framer Motion animations otomatik yüklü

---

## 📦 Deployment

### Netlify/Vercel

1. Branch'i merge et: `git merge feature/profit-engine`
2. Push to main: `git push origin main`
3. Otomatik deploy olur

### Cloudflare Pages

1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables:
   - (Eğer Supabase kullanıyorsan ekle)

---

## ✅ Test Checklist

- [ ] `/pricing` route'u çalışıyor
- [ ] 4 sektör kartı görünüyor
- [ ] Sektör seçince sliderlar geliyor
- [ ] Sliderlar hareket ettikçe rakam değişiyor
- [ ] "AI'ya Geç" butonu kırmızıdan yeşile geçiş yapıyor
- [ ] Karşılaştırma kartları görünüyor
- [ ] Paket detayları doğru
- [ ] Voice button sağ altta
- [ ] Mobile responsive

---

## 📞 Support

Sorun mu var? Issues aç veya:
- Email: info@mgldigitalmedia.com
- GitHub: [@mustafagl01](https://github.com/mustafagl01)

---

**HEMEN ŞİMDİ TEST ET!** 🚀

```bash
npm run dev
# http://localhost:5173/pricing
```