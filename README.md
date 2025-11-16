# Tarf Akademi - Next.js Frontend

Bu proje, Tarf Akademi web sitesinin Next.js tabanlı frontend uygulamasıdır. Laravel backend API'si ile çalışır.

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
```

### 2. Environment Dosyasını Oluşturun

`.env.local.example` dosyasını kopyalayıp `.env.local` olarak kaydedin:

```bash
cp .env.local.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Development Server'ı Başlatın

```bash
npm run dev
# veya
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
frontend/
├── app/
│   ├── [locale]/           # Dil bazlı routing
│   │   ├── page.tsx        # Ana sayfa
│   │   ├── blog/           # Blog sayfaları
│   │   │   ├── page.tsx    # Blog listesi
│   │   │   └── [slug]/     # Blog detay
│   │   ├── events/         # Etkinlik sayfaları
│   │   ├── services/       # Hizmet sayfaları
│   │   └── ...
│   ├── globals.css         # Global stiller
│   └── layout.tsx          # Root layout
├── lib/
│   └── api.ts              # Laravel API client
├── components/             # React bileşenleri
├── public/                 # Static dosyalar
└── ...
```

## 🌐 Çoklu Dil Desteği

Uygulama 3 dili destekler:
- Türkçe (tr) - Varsayılan
- İngilizce (en)
- Arapça (ar)

URL yapısı: `/{locale}/...`
- Örnek: `/tr/blog`, `/en/blog`, `/ar/blog`

## 🔌 Laravel API Entegrasyonu

### API Endpoint'leri

Tüm API istekleri `lib/api.ts` dosyasında tanımlıdır:

- **Ana Sayfa**: `GET /api/v1/home/{locale}`
- **Blog**: `GET /api/v1/posts?locale={locale}`
- **Blog Detay**: `GET /api/v1/posts/{locale}/{slug}`
- **Etkinlikler**: `GET /api/v1/events?locale={locale}`
- **Hizmetler**: `GET /api/v1/services?locale={locale}`
- **FAQ**: `GET /api/v1/faqs?locale={locale}`
- **Hero Slider**: `GET /api/v1/heroes?locale={locale}`
- **Form**: `POST /api/v1/forms/{slug}/submit`
- **Arama**: `GET /api/v1/search?q={query}&locale={locale}`

### Kullanım Örneği

```typescript
import { getPosts, getPost } from '@/lib/api'

// Blog listesini getir
const posts = await getPosts('tr', 1)

// Tek bir blog yazısını getir
const post = await getPost('tr', 'blog-yazisi-slug')
```

## 🎨 Tailwind CSS

Proje Tailwind CSS kullanır. Özel renkler `tailwind.config.ts` dosyasında tanımlıdır:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    // ...
    900: '#0c4a6e',
  },
}
```

## 📦 Build

Production build oluşturmak için:

```bash
npm run build
# veya
yarn build
```

Build edilen uygulamayı çalıştırmak için:

```bash
npm start
# veya
yarn start
```

## 🔧 Backend (Laravel) Kurulumu

### 1. Laravel Backend'i Çalıştırın

```bash
cd ../tarfakademi-main
php artisan serve
```

Backend [http://localhost:8000](http://localhost:8000) adresinde çalışacaktır.

### 2. CORS Ayarları

Laravel backend'de CORS zaten yapılandırılmıştır (`config/cors.php`). 
Eğer farklı bir port kullanıyorsanız, `.env` dosyasına ekleyin:

```env
FRONTEND_URL=http://localhost:3000
```

## 🚀 Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com)'e gidin
3. Projeyi import edin
4. Environment variables ekleyin:
   - `NEXT_PUBLIC_API_URL`: Laravel API URL'iniz
   - `NEXT_PUBLIC_SITE_URL`: Next.js site URL'iniz

### Diğer Platformlar

- **Netlify**: Next.js desteği var
- **Custom Server**: `npm run build && npm start`

## 📝 Notlar

- TypeScript hataları npm install sonrasında düzelecektir
- Laravel backend çalışır durumda olmalıdır
- API endpoint'leri değişirse `lib/api.ts` güncellenmelidir
- Filament admin panel değişmeden çalışmaya devam eder

## 🔗 Bağlantılar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Laravel Dokümantasyonu](https://laravel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Destek

Herhangi bir sorun için issue açabilirsiniz.