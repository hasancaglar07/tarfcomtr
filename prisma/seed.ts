import { PrismaClient, ContentCategory, PostStatus, PostType } from '@prisma/client'

import { contentPageList } from '@/content/content-pages'

const prisma = new PrismaClient()

const toJson = (value: unknown) => JSON.parse(JSON.stringify(value))

async function seedContentPages() {
  for (const page of contentPageList) {
    await prisma.contentPage.upsert({
      where: { slug: page.slug },
      update: {
        category: page.category as ContentCategory,
        title: page.hero.title ?? page.slug,
        seoTitle: page.seo?.title,
        seoDescription: page.seo?.description,
        data: toJson(page),
        publishedAt: new Date(),
        status: 'published',
      },
      create: {
        slug: page.slug,
        category: page.category as ContentCategory,
        title: page.hero.title ?? page.slug,
        seoTitle: page.seo?.title,
        seoDescription: page.seo?.description,
        data: toJson(page),
        publishedAt: new Date(),
        status: 'published',
      },
    })
  }
}

async function seedCategories() {
  const categories = [
    { slug: 'genel', name: 'Genel', type: PostType.blog },
    { slug: 'egitim', name: 'Eğitim Programları', type: PostType.service },
    { slug: 'etkinlik', name: 'Etkinlikler', type: PostType.event },
    { slug: 'video-kutuphanesi', name: 'Video Kütüphanesi', type: PostType.video },
    { slug: 'podcast', name: 'Podcastler', type: PostType.podcast },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, type: cat.type },
      create: { ...cat },
    })
  }
}

type SeedPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  seoTitle?: string | null
  seoDescription?: string | null
  type: PostType
  categoryId?: string | null
  eventDate?: Date
  eventTime?: string | null
  location?: string | null
  youtubeUrl?: string | null
  audioUrl?: string | null
  featuredImage?: string | null
}

async function seedPosts() {
  const blogCat = await prisma.category.findUnique({ where: { slug: 'genel' } })
  const eventCat = await prisma.category.findUnique({ where: { slug: 'etkinlik' } })
  const videoCat = await prisma.category.findUnique({ where: { slug: 'video-kutuphanesi' } })
  const podcastCat = await prisma.category.findUnique({ where: { slug: 'podcast' } })
  const serviceCat = await prisma.category.findUnique({ where: { slug: 'egitim' } })

  const posts: SeedPost[] = [
    {
      slug: 'yapay-zeka-ve-gelecek',
      title: 'Yapay Zeka ve Gelecek',
      excerpt: 'Yapay zekanın eğitim ve üretim süreçlerine etkisi.',
      content: 'Detaylı blog içeriği burada yer alacak.',
      seoTitle: 'Yapay Zeka ve Gelecek',
      seoDescription: 'Yapay zekanın eğitim ve üretim süreçlerine etkisi.',
      type: PostType.blog,
      categoryId: blogCat?.id,
    },
    {
      slug: 'kultur-kampi-2025',
      title: 'Kültür Kampı 2025',
      excerpt: 'Gençlere yönelik 3 günlük üretim ve atölye kampı.',
      content: 'Etkinlik detayları ve program akışı.',
      seoTitle: 'Kültür Kampı 2025',
      seoDescription: 'Gençlere yönelik 3 günlük üretim ve atölye kampı.',
      type: PostType.event,
      categoryId: eventCat?.id,
      eventDate: new Date(),
      location: 'İstanbul',
    },
    {
      slug: 'nextjs-performans-ipuclari',
      title: 'Next.js Performans İpuçları',
      excerpt: 'Öğrenme serisi video kaydı.',
      content: 'Video açıklaması.',
      seoTitle: 'Next.js Performans İpuçları',
      seoDescription: 'Öğrenme serisi video kaydı.',
      type: PostType.video,
      categoryId: videoCat?.id,
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      slug: 'teknoloji-ve-deger',
      title: 'Teknoloji ve Değer Üretimi',
      excerpt: 'Podcast bölümü: teknoloji, eğitim, toplumsal etki.',
      content: 'Podcast notları.',
      seoTitle: 'Teknoloji ve Değer Üretimi',
      seoDescription: 'Podcast bölümü: teknoloji, eğitim, toplumsal etki.',
      type: PostType.podcast,
      categoryId: podcastCat?.id,
      audioUrl: 'https://example.com/audio.mp3',
    },
    {
      slug: 'fullstack-bootcamp',
      title: 'Fullstack Bootcamp',
      excerpt: '8 haftalık yoğun eğitim programı.',
      content: 'Program müfredatı ve başvuru koşulları.',
      seoTitle: 'Fullstack Bootcamp',
      seoDescription: '8 haftalık yoğun eğitim programı.',
      type: PostType.service,
      categoryId: serviceCat?.id,
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: {
        slug_type_locale: {
          slug: post.slug,
          type: post.type,
          locale: 'tr',
        },
      },
      update: {
        ...post,
        status: PostStatus.published,
        locale: 'tr',
        publishedAt: new Date(),
        seoTitle: post.seoTitle || null,
        seoDescription: post.seoDescription || null,
        ogImage: post.featuredImage || null,
      },
      create: {
        ...post,
        status: PostStatus.published,
        locale: 'tr',
        publishedAt: new Date(),
        seoTitle: post.seoTitle || null,
        seoDescription: post.seoDescription || null,
        ogImage: post.featuredImage || null,
      },
    })
  }
}

async function seedFaq() {
  const faqs = [
    {
      question: 'Programlara nasıl başvurabilirim?',
      answer: 'İletişim formu veya başvuru sayfası üzerinden başvuru yapabilirsiniz.',
      order: 1,
      locale: 'tr',
    },
    {
      question: 'Eğitimler ücretli mi?',
      answer: 'Bazı programlar ücretsiz, bazıları burs/ücretli; detaylar program sayfasında.',
      order: 2,
      locale: 'tr',
    },
  ]
  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${faq.order}-${faq.locale}` },
      update: faq,
      create: { ...faq, id: `faq-${faq.order}-${faq.locale}` },
    })
  }
}

async function seedHero() {
  await prisma.hero.upsert({
    where: { id: 'hero-tr' },
    update: {
      title: 'Bilim, teknoloji ve irfan ile geleceği inşa ediyoruz',
      subtitle: 'Eğitim, üretim ve topluluk programlarıyla ekosistem kuruyoruz.',
      description: 'Gençlere yönelik eğitim, atölye, etkinlik ve teknoloji takımları.',
      headlineSlides: [
        {
          "title": "Hikmetle Derinleşen, Teknolojiyle Yön Veren Düşünce",
          "subtitle": "<p><strong>Düşünce Enstitüsü</strong>; kadim irfan geleneğinden beslenen insan merkezli yaklaşımları, çağdaş teknoloji ve bilimle birleştirerek geleceğe dair düşünceler üretir.</p>",
          "titleSize": "42px"
        },
        {
          "title": "Gençlerle birlikte yeni bir öğrenme kültürü kuruyoruz",
          "subtitle": "<p><strong>Araştırma,</strong> atölye ve teknoloji takımlarıyla sahadayız.</p>",
          "titleSize": "58px"
        },
        {
          "title": "Akademi ve Eğitimle Derinleşen Bilgi",
          "subtitle": "<p>Eğitim programları, seminerler ve akademik çalışmalar yoluyla nitelikli bilgi üretimini hedefler. İnsan merkezli ve değer odaklı yaklaşımıyla, akademik disiplini çağdaş bilim ve teknolojik imkânlarla birleştirerek sürdürülebilir bir öğrenme ortamı sunar.</p>",
          "titleSize": "48px"
        },
        {
          "title": "Güçlü Mimari, Sürdürülebilir Yazılım",
          "subtitle": "<p><strong>Modern yazılım </strong>mimarileri ve güncel teknolojilerle, güvenli, performanslı ve uzun ömürlü yazılım çözümleri sunuyoruz.</p><p>Uzun vadede yönetilebilir ve performanslı yazılım sistemleri.</p>",
          "titleSize": "52px"
        },
        {
          "title": "KYP                                                                                          (Kurumsal Yönetim Platformu)",
          "subtitle": "<p><strong>KYP (Kurumsal Yönetim Platformu)</strong>, kurumların tüm iş süreçlerini tek bir merkezden yönetmelerini sağlayan entegre bir yazılım platformudur. Operasyonel verimliliği artırmak, süreçleri standartlaştırmak ve dijital yönetim kültürünü güçlendirmek amacıyla geliştirilmiştir.</p>",
          "titleSize": "42px"
        }
      ],
      buttonText: 'Başvuru Yap',
      buttonUrl: '/tr/contact',
      backgroundImage: '',
      videoUrl: 'https://www.youtube.com/watch?v=1Q7_ZfecC7o',
      videoCover: '',
      videoUrl2: 'https://www.youtube.com/watch?v=Dn0_mblycJw&t=812s',
      videoCover2: '',
    },
    create: {
      id: 'hero-tr',
      locale: 'tr',
      title: 'Bilim, teknoloji ve irfan ile geleceği inşa ediyoruz',
      subtitle: 'Eğitim, üretim ve topluluk programlarıyla ekosistem kuruyoruz.',
      description: 'Gençlere yönelik eğitim, atölye, etkinlik ve teknoloji takımları.',
      headlineSlides: [
        {
          "title": "Hikmetle Derinleşen, Teknolojiyle Yön Veren Düşünce",
          "subtitle": "<p><strong>Düşünce Enstitüsü</strong>; kadim irfan geleneğinden beslenen insan merkezli yaklaşımları, çağdaş teknoloji ve bilimle birleştirerek geleceğe dair düşünceler üretir.</p>",
          "titleSize": "42px"
        },
        {
          "title": "Gençlerle birlikte yeni bir öğrenme kültürü kuruyoruz",
          "subtitle": "<p><strong>Araştırma,</strong> atölye ve teknoloji takımlarıyla sahadayız.</p>",
          "titleSize": "58px"
        },
        {
          "title": "Akademi ve Eğitimle Derinleşen Bilgi",
          "subtitle": "<p>Eğitim programları, seminerler ve akademik çalışmalar yoluyla nitelikli bilgi üretimini hedefler. İnsan merkezli ve değer odaklı yaklaşımıyla, akademik disiplini çağdaş bilim ve teknolojik imkânlarla birleştirerek sürdürülebilir bir öğrenme ortamı sunar.</p>",
          "titleSize": "48px"
        },
        {
          "title": "Güçlü Mimari, Sürdürülebilir Yazılım",
          "subtitle": "<p><strong>Modern yazılım </strong>mimarileri ve güncel teknolojilerle, güvenli, performanslı ve uzun ömürlü yazılım çözümleri sunuyoruz.</p><p>Uzun vadede yönetilebilir ve performanslı yazılım sistemleri.</p>",
          "titleSize": "52px"
        },
        {
          "title": "KYP                                                                                          (Kurumsal Yönetim Platformu)",
          "subtitle": "<p><strong>KYP (Kurumsal Yönetim Platformu)</strong>, kurumların tüm iş süreçlerini tek bir merkezden yönetmelerini sağlayan entegre bir yazılım platformudur. Operasyonel verimliliği artırmak, süreçleri standartlaştırmak ve dijital yönetim kültürünü güçlendirmek amacıyla geliştirilmiştir.</p>",
          "titleSize": "42px"
        }
      ],
      buttonText: 'Başvuru Yap',
      buttonUrl: '/tr/contact',
      backgroundImage: '',
      videoUrl: 'https://www.youtube.com/watch?v=1Q7_ZfecC7o',
      videoCover: '',
      videoUrl2: 'https://www.youtube.com/watch?v=Dn0_mblycJw&t=812s',
      videoCover2: '',
    },
  })
}

async function seedSettings() {
  await prisma.setting.upsert({
    where: { locale: 'tr' },
    update: {
      siteName: 'TARF Akademi',
      siteDescription: 'Bilim, teknoloji ve irfanı birleştiren üretim ekosistemi.',
      contactEmail: 'info@tarf.com.tr',
      contactPhone: '+90 (501) 427 83 65',
      contactAddress: 'Aşağı Öveçler Mah., 1324. Cad., 63 Çankaya / ANKARA',
      social: {
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
      },
      contactContent: {
        tr: {
          cta: {
            title: 'Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.',
            description: 'Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.',
            primaryAction: {
              href: '',
              label: 'Test Button'
            }
          },
          heroBody: 'Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.',
          formTitle: 'Başvuru formu',
          heroTitle: 'Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın',
          heroEyebrow: 'TARF Akademi',
          formSubtitle: 'Ekibimiz 24 saat içinde dönüş yapar.',
          heroSubtitle: 'Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın.'
        }
      },
    },
    create: {
      locale: 'tr',
      siteName: 'TARF Akademi',
      siteDescription: 'Bilim, teknoloji ve irfanı birleştiren üretim ekosistemi.',
      contactEmail: 'info@tarf.com.tr',
      contactPhone: '+90 (501) 427 83 65',
      contactAddress: 'Aşağı Öveçler Mah., 1324. Cad., 63 Çankaya / ANKARA',
      social: {
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
      },
      contactContent: {
        tr: {
          cta: {
            title: 'Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.',
            description: 'Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.',
            primaryAction: {
              href: '',
              label: 'Test Button'
            }
          },
          heroBody: 'Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.',
          formTitle: 'Başvuru formu',
          heroTitle: 'Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın',
          heroEyebrow: 'TARF Akademi',
          formSubtitle: 'Ekibimiz 24 saat içinde dönüş yapar.',
          heroSubtitle: 'Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın.'
        }
      },
    },
  })
}

async function main() {
  await seedContentPages()
  await seedCategories()
  await seedPosts()
  await seedFaq()
  await seedHero()
  await seedSettings()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
