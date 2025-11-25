# 🚀 TARF Akademi - Deployment Guide

## Frontend (Vercel) ✅ TAMAMLANDI
- **URL:** https://tarfakademi-main.vercel.app
- **Platform:** Vercel
- **Status:** ✅ Aktif

### Vercel Environment Variables (Şu an ayarlı olması gerekenler):
```bash
NEXT_PUBLIC_SITE_URL=https://tarfakademi-main.vercel.app
```

### Backend hazır olunca eklenecek:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
```

---

## Backend (Laravel) ⏳ BEKLEMEDE

### Önerilen Platformlar:

#### Option 1: Railway.app (Önerilen - Kolay)
1. https://railway.app/ → GitHub ile giriş yap
2. "New Project" → "Deploy from GitHub repo" → `hasancaglar07/tarfakademi-main` seçin
3. Root Directory: `/` (veya laravel klasörü varsa onu seç)
4. Environment Variables ekle:
   ```bash
   APP_NAME="TARF Akademi"
   APP_ENV=production
   APP_KEY=base64:XXXX  # php artisan key:generate ile üret
   APP_DEBUG=false
   APP_URL=https://your-app.railway.app
   
   DB_CONNECTION=mysql
   DB_HOST=containers-us-west-xxx.railway.app
   DB_PORT=3306
   DB_DATABASE=railway
   DB_USERNAME=root
   DB_PASSWORD=XXXX  # Railway otomatik verir
   
   # CORS ayarları
   FRONTEND_URL=https://tarfakademi-main.vercel.app
   SANCTUM_STATEFUL_DOMAINS=tarfakademi-main.vercel.app
   SESSION_DOMAIN=.railway.app
   ```

5. Build & Deploy komutları:
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan migrate --force
   ```

#### Option 2: DigitalOcean App Platform
1. https://cloud.digitalocean.com/apps
2. "Create App" → GitHub repo seçin
3. "Build Command":
   ```bash
   composer install && php artisan migrate --force
   ```
4. Environment Variables yukarıdaki gibi ekle

#### Option 3: Kendi VPS (Advanced)
- Ubuntu 22.04 + Nginx + PHP 8.2 + MySQL
- SSL Certificate (Let's Encrypt)
- Supervisor for queues

---

## Backend Deploy Edildikten Sonra Yapılacaklar:

### 1. Backend URL'ini Vercel'e Ekle:
```bash
# Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
```

### 2. Laravel'de CORS Ayarlarını Güncelle:
`config/cors.php`:
```php
'allowed_origins' => [
    'https://tarfakademi-main.vercel.app',
    'http://localhost:3000', // development için
],
```

### 3. next.config.js'i Güncelle:
Backend domain'ini image patterns'e ekle:
```javascript
{
  protocol: 'https',
  hostname: 'your-backend-domain.com',
  pathname: '/storage/**',
}
```

### 4. Test Et:
- https://tarfakademi-main.vercel.app/api/v1/home
- Ana sayfa yükleniyor mu?
- Görseller görünüyor mu?

---

## 🔧 Debugging

### Frontend Logları:
```bash
# Vercel Dashboard → Deployments → Latest → View Function Logs
```

### Backend Logları:
```bash
# Railway: Dashboard → Logs sekmesi
# DigitalOcean: App → Runtime Logs
```

### API Test:
```bash
# Backend health check
curl https://your-backend-url/api/v1/home

# Response örneği:
{
  "success": true,
  "data": {
    "heroes": [...],
    "blog_posts": [...]
  }
}
```

---

## 📞 Sorun mu Var?

1. **API yanıt vermiyor:**
   - Backend logs kontrol et
   - CORS ayarları doğru mu?
   - Environment variables doğru mu?

2. **Görseller yüklenmiyor:**
   - `storage:link` çalıştırıldı mı?
   - next.config.js'de domain eklendi mi?

3. **500 Hatası:**
   - Laravel logs: `storage/logs/laravel.log`
   - `.env` dosyası doğru mu?
   - Migration çalıştırıldı mı?

---

## 🎯 Öncelikli Görevler:

- [ ] Laravel backend'i Railway/DigitalOcean'a deploy et
- [ ] Backend URL'ini Vercel environment variables'a ekle  
- [ ] CORS ayarlarını güncelle
- [ ] Test et: Ana sayfa, blog, görseller
- [ ] Production domain'e geç (tarfakademi.com)