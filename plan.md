# Next.js Full-Stack & Admin Plan (Genişletilmiş)

## Amaçlar
- Tek Next.js (app router) ile frontend + admin + API. Laravel yok.
- Veriler: Vercel Postgres + Prisma. Dosyalar: Vercel Blob.
- Yönetim: `/admin` altında A-Z içerik kontrolü (statik sayfalar, blog, etkinlik, video, podcast, hizmet/eğitim, SSS, hero, site ayarları, medya).
- Deploy: Tek Vercel proje, env ile yönetim, `output: standalone` çalıştırma.

## Hızlı Akış (ne yapılacak)
1) **Model & migrasyon**: Blog/Etkinlik/Video/Podcast/Hizmet, Kategori, SSS, Hero, Settings, Media eklenir. Mevcut ContentPage kalır.
2) **Admin CRUD**: Liste/filtre/arama + form (alan bazlı) + taslak/yayın + kopyala + önizleme linki. Medya upload/seçici.
3) **Frontend veri kaynağı**: API yerine Prisma sorguları; Home + listeler + detaylar + statik sayfalar DB’den.
4) **Publish/preview**: status/publishedAt ile yayın kontrolü; taslak önizleme (admin session) + revalidatePath.
5) **Temizlik/çalıştırma**: SWC/sharp uyarıları, env tamamlama, build/test.

## Prisma Model Tasarımı (öneri)
- `ContentPage`: id, slug, category (enum), title, seoTitle, seoDescription, data Json, status (draft/published), publishedAt, locale?, createdAt, updatedAt.
- `Category`: id, slug, name, type (blog|event|video|podcast|service), locale?.
- `Post`: id, slug, title, excerpt, content (rich text), type (blog|event|video|podcast|service), status (draft/published), locale, featuredImage, youtubeUrl, audioUrl, eventDate, eventTime, location, meta Json, publishedAt, createdAt, updatedAt, categoryId?.
- `FAQ`: id, question, answer, order, locale.
- `Hero`: id, locale, title, subtitle, description, buttonText, buttonUrl, backgroundImage, videoUrl?.
- `Setting`: id, locale, siteName, siteDescription, contactEmail, contactPhone, contactAddress, social Json.
- `Media`: id, url, type, altText, uploadedBy.
- (Opsiyonel) `AdminUser`: ileride çoklu admin için.

## Admin Modülü (sayfalar/özellikler)
- Dashboard: hızlı özet (taslak/yayında sayıları, son içerikler).
- Content Pages: mevcut CRUD (hero/sections/CTA/SEO alan bazlı forma genişlet).
- Blog/Etkinlik/Video/Podcast/Hizmet:
  - Liste: arama, kategori/type filtre, status filtre, sort (tarih).
  - Form: title, slug, excerpt, content (rich text), kategori, tür, locale, medya seçici (thumbnail), SEO meta, event-specific alanlar (date/time/location), video/audio URL.
  - Aksiyon: taslak/yayın toggle, kopyala, sil, önizleme.
- FAQ: soru/cevap, sıralama; locale filtresi.
- Hero: locale bazlı hero kartları (title/subtitle/CTA/bg image/video).
- Settings: siteName/description, iletişim bilgileri, sosyal linkler, logo/favikon URL.
- Media: Blob upload + liste + URL kopyalama (altText opsiyonel).
- UX: Rich text editor (TipTap/Quill), canlı önizleme (ContentPageView veya PostView), toast/feedback.

## Frontend Değişiklikleri
- `lib/api.ts` yerine Prisma tabanlı fetch: Home (heroes, services, events, blog, videos, podcasts, faq, settings), listeler, detaylar, statik ContentPage.
- Locale filtresi: modellerde `locale` alanı ile `tr/en/ar` desteği.
- Publish kontrolü: sadece status=published + publishedAt varsa public; taslaklar 404 veya önizleme modunda.
- Revalidate: server actions sonrası home, listeler, slug path’leri.

## Fazlar (detay)
### Faz 1: Model & Migrate & Seed
- Prisma şemasını genişlet (yukarıdaki model).
- `prisma migrate dev` + seed script: demo kategoriler, örnek post/event/video/podcast/service, FAQ, hero, settings, content pages.
- Medya: şimdilik URL alanı; upload admin’de yapılacak.

### Faz 2: Admin CRUD (alan bazlı)
- Server actions: Post (type parametreli) CRUD + publish toggle; FAQ/Hero/Setting/Category CRUD; Media upload endpoint (Blob).
- Formlar: react-hook-form + zod; rich text; medya seçici; slug auto-generate; status toggle.
- Liste: arama, filtre, sort; pagination (basit limit/offset).
- Önizleme: slug link + taslak mod (session kontrolü veya query param).

### Faz 3: Frontend Veri Kaynağı
- Home sayfası: Prisma sorguları; boş veri fallback kalkar.
- Liste/detay sayfaları: type+locale filtreli sorgular; ilgili içerik önerileri (aynı kategori).
- Statik içerik: ContentPage DB’den; status kontrolü.

### Faz 4: Temizlik & Deploy
- `lib/api.ts` eski API bağımlılıklarını kaldır veya mock.
- Env: NEXTAUTH_SECRET/URL, AUTH_TRUST_HOST, ADMIN_EMAIL + (ADMIN_PASSWORD veya HASH), DATABASE_URL, BLOB token, API_URL (dummy).
- Build/test: `npm run lint`, `npm run build`.
- Deploy: Vercel env girişleri, Postgres/Blob bağlama; çalıştırma `node .next/standalone/server.js`.

## Notlar / UX İpuçları
- Admin UX: filtre/arama şart; taslak-yayın rozetleri; kopyala/duble; medya seçici; autosave henüz yok.
- Seed: boş ekran olmasın diye örnek içerikler ekle.
- Medya: unoptimized image (sharp yok) şu an; istersek `npm i sharp` + config düzeltilebilir.
- Güvenlik: tek admin env; ileride AdminUser tablosu + parola reset eklenebilir; upload endpoint auth kontrollü.
