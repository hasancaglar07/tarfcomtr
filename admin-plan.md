# Admin Panel Geliştirme Planı (Profesyonel & Tam Yönetilebilir)

## Mevcut Durum (kısa)
- NextAuth + Credentials ile tek admin oturumu.
- İçerik modelleri: ContentPage, Category, Post (blog/event/video/podcast/service), FAQ, Hero, Setting, Media (model var, UI henüz kısıtlı).
- Admin UI: ContentPage CRUD (JSON form), Post CRUD (alan bazlı form, galeri/YouTube/audio/event tarih-saat-konum), listeleme. Blob upload bileşeni var, ancak form entegrasyonu temel.
- Frontend: Liste/detaylar Prisma’dan okunuyor; content pages yayın kontrolü var.

## Eksikler / İyileştirme Alanları
- **Form UX**: Rich text yok (şu an plain textarea); slug otomatik üretme yok; otomatik kaydetme yok; alan açıklamaları minimal.
- **Medya**: Görsel seçici yok; sadece URL giriliyor. Galeri/kapak için dosya seçip URL’yi otomatik yazma yok.
- **Önizleme**: Taslak önizleme akışı yok (preview token/query); canlı önizleme paneli yok.
- **Listeleme**: Arama, filtre (durum/kategori/locale), sıralama, sayfalama yok. Toplu silme/çevirme yok.
- **Roller/Güvenlik**: Tek admin; brute-force/CSRF/ratelimit ele alınmadı; audit log yok.
- **Yerelleştirme**: Locale bazlı içerik yönetimi sınırlı; kopyala/çevir akışı yok.
- **SEO/Meta**: Post/ContentPage formlarında SEO alanları (meta title/description/OG image) yok.
- **Ayarlar**: Settings/Hero/FAQ için admin UI yok (model var).
- **Kategoriler**: Kategori CRUD UI yok; type bazlı kategori seçimi sabit liste.
- **Medya Kütüphanesi**: Blob listesi, alt metin, kopyala butonu yok; sadece upload bileşeni var.
- **Görsel Optimizasyon**: `images.unoptimized: true`; istenirse sharp eklenebilir.
- **Kalite**: Test/validation minimal; zod kuralları basit; hata mesajları düz.
- **Kullanıcı dostu**: “Tek tıkla yeni içerik” şablonları yok; onboarding/help metinleri yok.

## Hızlı Kazanımlar (Kısa Vadede Yapılabilir)
1) **Rich text & slug otomasyonu**: TipTap/React-Quill entegrasyonu; slug’ı başlıktan otomatik doldur, düzenlenebilir bırak.
2) **Medya seçici**: Blob upload + son yüklenenler listesinden kapak/galeri alanlarını tek tıkla doldur; alt metin alanı ekle.
3) **SEO alanları**: Post ve ContentPage formlarına meta title/description + OG image (URL/medya seçici) ekle.
4) **Filtre/arama**: Post listesinde durum/kategori/locale filtreleri + arama + basit sayfalama.
5) **Önizleme**: Taslak önizleme linki (query param + session kontrol); form sayfasında “Önizleme” butonu.
6) **Settings/Hero/FAQ/Kategori UI**: CRUD ekranları ekle; home/iletişim bilgisi/CTA hızlı güncellenebilir olsun.
7) **Event-specific alanlar**: Kayıt linki, bilet linki, konuşmacı/sponsor alanları; galeri ve video alanı zaten var.
8) **Yardım metinleri**: Form alanları altına kısa açıklamalar; hata mesajlarını özelleştir.

## Orta Vadeli İyileştirmeler
- **Roller**: Basit AdminUser tablosu + parola reset (token e-posta, manual reset endpoint).
- **Audit/Log**: Kim ne zaman neyi güncelledi; son değişiklik kaydı.
- **Versioning**: Post revizyonu (taslak kopyalama), “kopyala ve düzenle” butonu.
- **Medya kütüphanesi**: Listele/ara/filtre; alt metin ve tip bilgisi; kopyala butonu; thumbnail gösterimi.
- **Preview Deploy**: Taslakları önizleme subdomain’inde göstermek (Vercel preview).
- **Validation**: Zod şemalarını genişlet (URL, tarih, minimum uzunluk); kullanıcıya anlamlı hata döndür.
- **Performans**: Liste sayfalarında pagination + server-side filtre; admin sayfalarında loading state.

## Önerilen Uygulama Sırası (Sprint Plan)
### Sprint A: Kullanılabilirlik ve içerik üretim hızı
- Rich text editor (TipTap/Quill) blog/event/service/podcast için.
- Slug otomatik üretme + düzenlenebilir alan.
- SEO alanları (meta title/description, OG image) Post + ContentPage formlarına.
- Form yardımcı metinleri ve hata mesajlarını iyileştir.

### Sprint B: Medya ve görsel yönetimi
- Medya kütüphanesi: liste/ara/kopyala; alt metin ve tip gösterimi.
- Formlara medya seçici (kapak + galeri).
- Event için ek alanlar: kayıt linki, konuşmacı/sponsor metni (meta JSON’da tutulabilir), kapak/görsel seçimi.

### Sprint C: Liste/filtre/önizleme
- Post listelerinde arama + filtre (status, kategori, locale) + sayfalama.
- Taslak önizleme linki (preview param + admin session).
- ContentPage formunu alan bazlı bileşenlere böl (hero/sections/CTA/SEO).

### Sprint D: Settings/Hero/FAQ/Kategori UI
- Settings CRUD: site adı/açıklama, iletişim, sosyal linkler, logo/favikon URL.
- Hero CRUD: locale bazlı hero kartları.
- FAQ CRUD: sıralama + locale.
- Kategori CRUD: type bazlı kategori ekleme/düzenleme.

### Sprint E: Güvenlik/roller/ince ayar
- Basit AdminUser tablosu + login.
- Upload endpoint rate limit ve dosya tip kontrolü.
- Audit log (kimin neyi ne zaman değiştirdiği).

## Notlar
- Görsel optimizasyon istenirse `npm i sharp` + `images.unoptimized=false`.
- Locale yönetimi: formda locale seçimi var; kopyala/çevir akışı eklenebilir.
- Galeri: CSV string yerine ileride JSON ve medya picker ile çoklu seçim yapılabilir.
