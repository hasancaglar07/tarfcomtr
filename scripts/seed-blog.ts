
import { PrismaClient, PostType, PostStatus } from '@prisma/client'

const prisma = new PrismaClient()

const blogPosts = [
    {
        title: 'Yapay Zeka ve Geleceğin Meslekleri: Neler Değişiyor?',
        slug: 'yapay-zeka-ve-gelecegin-meslekleri',
        excerpt: 'Yapay zeka teknolojilerinin gelişimiyle birlikte iş dünyası hızla dönüşüyor. Hangi meslekler kaybolacak, hangileri öne çıkacak? İşte geleceğin iş dünyasına dair kapsamlı bir bakış.',
        content: `
      <h2>İş Dünyasında Yapay Zeka Devrimi</h2>
      <p>Son yıllarda yapay zeka (AI) teknolojilerindeki hızlı ilerleme, iş dünyasında köklü değişikliklere yol açıyor. Otomasyon, veri analizi ve makine öğrenimi, geleneksel iş yapış biçimlerini dönüştürürken, yeni fırsatlar ve tehditler de ortaya çıkarıyor.</p>
      
      <h3>Risk Altındaki Meslekler</h3>
      <p>Tekrarlayan ve rutin görevlere dayalı meslekler, otomasyon riski altında. Veri girişi, basit müşteri hizmetleri ve bazı üretim rolleri, yapay zeka sistemleri tarafından daha hızlı ve hatasız bir şekilde yerine getirilebiliyor. Ancak bu, insanların tamamen işsiz kalacağı anlamına gelmiyor; daha çok rollerin evrildiğine şahit oluyoruz.</p>
      
      <h3>Yükselen Yıldızlar: Geleceğin Meslekleri</h3>
      <p>Yapay zeka, yeni mesleklerin doğmasına da öncülük ediyor. AI etiği uzmanları, veri bilimciler, robotik süreç otomasyonu (RPA) geliştiricileri ve dijital dönüşüm danışmanları gibi roller, geleceğin en çok aranan meslekleri arasında yer alacak.</p>
      
      <h3>İnsan Faktörü: Yaratıcılık ve Duygusal Zeka</h3>
      <p>Makinelerin henüz taklit edemediği en önemli yetenekler; yaratıcılık, empati ve stratejik düşünmedir. Gelecekte, teknolojik yetkinliklerin yanı sıra bu "soft skill"lere sahip bireyler, iş dünyasında fark yaratacak.</p>
    `,
        category: 'Teknoloji',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop', // AI/Robot hand
    },
    {
        title: 'Eğitimde Dijital Dönüşüm: Hibrit Öğrenme Modelleri',
        slug: 'egitimde-dijital-donusum-hibrit-ogrenme',
        excerpt: 'Pandemi sonrası eğitim dünyası, dijital araçlarla harmanlanmış hibrit modellere yöneliyor. Öğrenciler ve eğitimciler için bu yeni dönem ne ifade ediyor?',
        content: `
      <h2>Sınıfın Ötesinde Bir Eğitim</h2>
      <p>Dijital dönüşüm, eğitimi dört duvar arasından çıkarıp her an, her yerden erişilebilir bir hale getirdi. Hibrit öğrenme modelleri, yüz yüze eğitimin sosyalleşme avantajlarını, çevrimiçi eğitimin esnekliği ile birleştiriyor.</p>
      
      <h3>Kişiselleştirilmiş Öğrenme Deneyimi</h3>
      <p>Dijital platformlar sayesinde, her öğrencinin öğrenme hızı ve stiline uygun içerikler sunulabiliyor. Yapay zeka destekli eğitim araçları, öğrencilerin eksiklerini tespit edip onlara özel çalışma programları hazırlayabiliyor.</p>
      
      <h3>Eğitimcilerin Yeni Rolü</h3>
      <p>Bu yeni düzende öğretmenler, sadece bilgi aktarıcı değil, aynı zamanda birer rehber ve mentör konumunda. Teknolojiyi etkin kullanan eğitimciler, öğrencilerin potansiyellerini açığa çıkarmalarında kritik bir rol oynuyor.</p>
    `,
        category: 'Eğitim',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1600&auto=format&fit=crop', // Classroom/Online learning
    },
    {
        title: 'Sürdürülebilir Bir Gelecek İçin Yeşil Teknoloji',
        slug: 'surdurulebilir-gelecek-icin-yesil-teknoloji',
        excerpt: 'İklim kriziyle mücadelede teknolojinin rolü giderek artıyor. Yenilenebilir enerji, akıllı şehirler ve çevre dostu inovasyonlar dünyamızı nasıl kurtarabilir?',
        content: `
      <h2>Teknoloji ve Doğa İşbirliği</h2>
      <p>Sürdürülebilirlik, artık bir tercih değil, bir zorunluluk. Yeşil teknolojiler (GreenTech), çevresel ayak izimizi azaltmak ve doğal kaynakları korumak için inovatif çözümler sunuyor.</p>
      
      <h3>Yenilenebilir Enerji Devrimi</h3>
      <p>Güneş ve rüzgar enerjisi maliyetlerinin düşmesi, fosil yakıtlara olan bağımlılığı azaltıyor. Akıllı şebekeler ve enerji depolama sistemleri, temiz enerjinin verimli kullanılmasını sağlıyor.</p>
      
      <h3>Akıllı Şehirler</h3>
      <p>IoT (Nesnelerin İnterneti) cihazlarıyla donatılmış akıllı şehirler, enerji tüketimini optimize ediyor, trafik sıkışıklığını azaltıyor ve atık yönetimini iyileştiriyor. Daha yaşanabilir ve çevre dostu şehirler, teknolojinin gücüyle inşa ediliyor.</p>
    `,
        category: 'Gelecek',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop', // Nature/Tech
    },
    {
        title: 'Girişimcilikte Başarının Sırrı: Dayanıklılık ve Adaptasyon',
        slug: 'girisimcilikte-basarinin-sirri',
        excerpt: 'Girişimcilik dünyasında başarılı olmanın yolu sadece iyi bir fikirden geçmiyor. Zorluklar karşısında yılmamak ve değişime ayak uydurmak neden bu kadar önemli?',
        content: `
      <h2>Yola Çıkmak ve Yolda Kalmak</h2>
      <p>Girişimcilik, belirsizliklerle dolu uzun bir yolculuktur. Başarılı girişimcilerin ortak özelliği, karşılaştıkları engeller ne olursa olsun pes etmemeleri ve sürekli öğrenme isteğidir.</p>
      
      <h3>Fail Fast, Learn Faster</h3>
      <p>"Hızlı hata yap, daha hızlı öğren" felsefesi, modern girişimciliğin temel taşlarından biridir. Hatalar, birer başarısızlık değil, paha biçilemez birer öğrenme fırsatıdır.</p>
      
      <h3>Pazar Dinamiklerine Uyum</h3>
      <p>Pazar koşulları sürekli değişiyor. Müşteri ihtiyaçlarını doğru analiz eden ve iş modelini buna göre esnetebilen girişimler (pivot), hayatta kalmayı ve büyümeyi başarıyor.</p>
    `,
        category: 'İş Dünyası',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop', // Business meeting
    },
    {
        title: 'Metaverse: İnternetin Yeni Evreni mi?',
        slug: 'metaverse-internetin-yeni-evreni',
        excerpt: 'Sanal gerçeklik ve artırılmış gerçeklik teknolojilerinin birleştiği Metaverse, dijital etkileşimlerimizi nasıl değiştirecek? Bir balon mu yoksa devrim mi?',
        content: `
      <h2>Dijitalın Fizikselleşmesi</h2>
      <p>Metaverse, interneti iki boyutlu ekranlardan çıkarıp, içine girebildiğimiz üç boyutlu bir deneyime dönüştürmeyi vaat ediyor. Toplantılar, konserler, alışveriş ve sosyalleşme, artık sanal evrenlerde gerçekleşiyor.</p>
      
      <h3>Ekonomik Fırsatlar</h3>
      <p>Sanal araziler, NFT'ler ve dijital varlıklar, yeni bir ekonominin kapılarını aralıyor. Markalar, Metaverse'te yerini alarak müşterilerine benzersiz deneyimler sunuyor.</p>
      
      <h3>Henüz Yolun Başındayız</h3>
      <p>Metaverse kavramı heyecan verici olsa da, teknolojik altyapı ve donanım maliyetleri gibi aşılması gereken engeller var. Ancak internetin geleceğinin bu yöne evrildiği aşikar.</p>
    `,
        category: 'Teknoloji',
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1600&auto=format&fit=crop', // VR/Metaverse
    }
]

async function main() {
    console.log('🌱 Seeding blog posts...')

    for (const post of blogPosts) {
        // 1. Create or connect Category
        // We use 'connectOrCreate' to duplicate handling logic
        // The schema says Category has a unique slug and composite index on [type, locale]
        // But name is just a string. To keep it simple, we'll upsert by slug roughly based on name.

        const categorySlug = post.category.toLowerCase().replace(/ /g, '-').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o')

        const category = await prisma.category.upsert({
            where: { slug: categorySlug },
            update: {},
            create: {
                name: post.category,
                slug: categorySlug,
                type: PostType.blog,
                locale: 'tr'
            }
        })

        // 2. Create Post
        await prisma.post.upsert({
            where: {
                slug_type_locale: {
                    slug: post.slug,
                    type: PostType.blog,
                    locale: 'tr'
                }
            },
            update: {
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                featuredImage: post.image,
                categoryId: category.id,
                status: PostStatus.published,
                publishedAt: new Date(),
            },
            create: {
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                type: PostType.blog,
                status: PostStatus.published,
                locale: 'tr',
                featuredImage: post.image,
                categoryId: category.id,
                publishedAt: new Date(),
            }
        })

        console.log(`✅ Created/Updated post: ${post.title}`)
    }

    console.log('✨ All blog posts seeded successfully!')
}


main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
