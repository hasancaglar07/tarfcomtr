import { LucideIcon } from 'lucide-react'

export type SectionLayout = 'grid' | 'list' | 'stats' | 'timeline' | 'table' | 'split'

export interface StatBlock {
  label: string
  value: string
  helper?: string
}

export interface SectionItem {
  title: string
  description?: string
  badge?: string
  meta?: string
  highlight?: string
  bullets?: string[]
  stats?: StatBlock[]
  icon?: LucideIcon
  cta?: {
    label: string
    href: string
  }
}

export interface ContentSection {
  id: string
  eyebrow?: string
  title: string
  description?: string
  layout?: SectionLayout
  ordered?: boolean
  columns?: number
  items?: SectionItem[]
  stats?: StatBlock[]
  table?: {
    columns: string[]
    rows: Array<Record<string, string>>
  }
  callout?: {
    title: string
    description: string
  }
}

export interface ContentPageHero {
  eyebrow?: string
  title: string
  subtitle: string
  description?: string
  highlight?: string
  badge?: string
  stats?: StatBlock[]
  actions?: Array<{
    label: string
    href: string
    variant?: 'primary' | 'secondary'
  }>
}

export interface ContentPageCTA {
  title: string
  description: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export type ContentPageCategory =
  | 'kurumsal'
  | 'dusunce'
  | 'akademi'
  | 'yazilim'
  | 'kulupler'
  | 'yayinlar'
  | 'yasal'

export interface ContentPageDefinition {
  slug: string
  category: ContentPageCategory
  hero: ContentPageHero
  intro?: string
  sections: ContentSection[]
  stats?: StatBlock[]
  cta: ContentPageCTA
  seo: {
    title: string
    description: string
  }
}

export const categoryLabels: Record<
  ContentPageCategory,
  { label: string; description: string }
> = {
  kurumsal: {
    label: 'Kurumsal',
    description: 'Kim olduğumuzu, vizyonumuzu ve yönetişim yaklaşımımızı anlatan temel içerikler',
  },
  dusunce: {
    label: 'Düşünce Enstitüsü',
    description: 'Araştırma, fikir geliştirme ve toplumsal dönüşüm projeleri',
  },
  akademi: {
    label: 'Akademi',
    description: 'Eğitim programlarımız, seminerler ve sertifika yolculukları',
  },
  yazilim: {
    label: 'Yazılım Teknolojileri',
    description: 'Teknoloji üretimi, danışmanlık ve güvenlik çözümlerimiz',
  },
  kulupler: {
    label: 'Kulüpler & Takımlar',
    description: 'Topluluklarımız, üretim takımları ve öğrenci kulüpleri',
  },
  yayinlar: {
    label: 'Yayınlar',
    description: 'TARF Dergi ve derinlemesine içerik serilerimiz',
  },
  yasal: {
    label: 'Yasal',
    description: 'Sorumlu ve şeffaf bir deneyim için politika ve beyanlarımız',
  },
}

const kurumsalPages: ContentPageDefinition[] = [
  {
    slug: 'hakkimizda',
    category: 'kurumsal',
    hero: {
      eyebrow: 'Kurumsal Profil',
      title: 'TARF Akademi: Bilim, teknoloji ve irfanı aynı masada toplamayı başaran ekosistem',
      subtitle: 'Geleceği şekillendiren, değer üreten ve topluma katkı sağlayan üretim hareketi',
      description:
        'TARF Akademi; bilimsel araştırmalardan yazılım teknolojilerine, teknoloji takımlarından sertifika programlarına uzanan geniş bir öğrenme ve üretim ağıdır. Merak eden, araştıran ve çözüm geliştiren gençlerin yolculuğunu uçtan uca destekliyoruz.',
      highlight: '2008’den bu yana binlerce gençle üretim yolculuğu',
      actions: [
        { label: 'Başvuru Formu', href: 'contact' },
        { label: 'Programlarımız', href: 'services', variant: 'secondary' },
      ],
      stats: [
        { label: 'Öğrenci & Mezun', value: '12.500+', helper: 'Akademi ve topluluk programları' },
        { label: 'Araştırma & Proje', value: '380+', helper: 'Bilim, teknoloji ve kültür' },
        { label: 'Konferans & Etkinlik', value: '210+', helper: 'Ulusal ve uluslararası buluşmalar' },
      ],
    },
    sections: [
      {
        id: 'timeline',
        eyebrow: 'Kuruluş hikayemiz',
        title: 'Bilimle irfanı buluşturan kuruluş hikayemiz',
        layout: 'list',
        items: [
          {
            title: 'Kuruluş metni',
            description:
              'TARF Düşünce Enstitüsü, bilimle irfanı aynı potada eriten, düşünceyi gençliğin dinamizmiyle buluşturan bir merkez fikrinden doğdu. Bu toprakların birikimini, köklü medeniyet mirasını ve çağın ihtiyaçlarını bir araya getirerek yeni bir düşünce ekolü oluşturma idealine sahip bir grup akademisyen, araştırmacı ve gençlik öncüsünün uzun yıllara yayılan gayretlerinin neticesi olarak kuruldu.',
          },
          {
            title: 'Varlık sebebi',
            description:
              'Enstitünün temel hedefi; gençlerin fikir üretme kabiliyetlerini güçlendirmek, akademik çalışmaları sahadaki karşılığıyla buluşturmak ve Türkiye’nin düşünce dünyasına nitelikli katkılar sunmaktı. TARF, yalnızca bilgi aktaran bir kurum değil; hakikati araştıran, analiz eden, çözüm üreten ve gençliğe yol açan bir fikir atölyesi olma iddiasıyla yola çıktı.',
          },
        ],
      },
      {
        id: 'mission',
        eyebrow: 'Varlık sebebimiz',
        title: 'Misyon ve vizyon',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Misyon',
            description:
              'Bilgi, teknoloji ve değer temelli eğitimi birleştirerek gençleri zihinsel, kültürel ve teknolojik açıdan geleceğe hazırlamak.',
            bullets: [
              'Bilimsel araştırma kültürü kazandırmak',
              'Yazılım üretim kabiliyetini güçlendirmek',
              'Toplumsal faydayı önceleyen projeler üretmek',
            ],
          },
          {
            title: 'Vizyon',
            description:
              'Türkiye’nin ve bölgenin en yenilikçi, en üretken ve en güvenilir teknoloji–akademi ekosistemi olmak.',
            bullets: [
              'Ar-Ge ve inovasyon yatırımları',
              'Ulusal ve uluslararası ağlarla iş birlikleri',
              'Gençleri dünya standartlarına taşıyan programlar',
            ],
          },
        ],
      },
      {
        id: 'values',
        eyebrow: 'Değerlerimiz',
        title: 'Güven veren ilkeler',
        layout: 'grid',
        columns: 3,
        items: [
          { title: 'Yenilikçilik', description: 'Geleceğin teknolojilerine uyum sağlayan eğitim modelleri geliştiririz.' },
          { title: 'Üretkenlik', description: 'Bilgiyi pratiğe dönüştüren proje tabanlı öğrenmeyi merkezde tutarız.' },
          { title: 'Etik ve Değerler', description: 'Bilginin sorumluluğunu taşıyan ahlaklı teknoloji kültürü yayarız.' },
          { title: 'Toplumsal Fayda', description: 'Üreten bireylerin toplumun dönüşümünde aktif rol almasını destekleriz.' },
          { title: 'İşbirliği', description: 'Takım çalışması, paylaşım ve ortak proje kültürüyle ilerleriz.' },
          { title: 'Sürekli Öğrenme', description: 'Bilim, teknoloji ve yazılımda kesintisiz gelişim ortamı sunarız.' },
          { title: 'Güven', description: 'Gençlerin gelişimini önceleyen şeffaf bir yapı kurarız.' },
        ],
      },
      {
        id: 'services',
        eyebrow: 'Ekosistemimiz',
        title: 'Ne yapıyoruz?',
        description:
          'TARF Akademi çatısında yer alan her yapı, gençlerin farklı ihtiyaçlarına cevap veren üretim alanları oluşturur.',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Akademi',
            description:
              'Bilimsel içerikler, okuma listeleri, araştırma görevleri ve proje tabanlı eğitim modeli.',
          },
          {
            title: 'TARF Dergi',
            description:
              'Teknoloji ve akademik düşünceyi bir araya getiren dijital yayın platformu.',
          },
          {
            title: 'Yazılım Teknolojileri',
            description:
              'Mobil uygulamadan yapay zekâya uzanan yazılım eğitimleri ve üretim projeleri.',
          },
          {
            title: 'Teknoloji Takımları',
            description:
              'Robotik, oyun geliştirme, AR/VR ve araştırma takımlarıyla gerçek üretim deneyimi.',
          },
          {
            title: 'Konferanslar',
            description:
              'Teknoloji, bilim, kültür ve yapay zekâ odağında düzenlenen geniş kapsamlı buluşmalar.',
          },
          {
            title: 'Teknoloji Kafe',
            description:
              'Öğrencilerin buluştuğu, projelerini tartıştığı ve mentorlarla görüştüğü sosyal alan.',
          },
          {
            title: 'Sertifika Programları',
            description:
              'Uluslararası geçerliliği olan ve kariyer yolculuğunu güçlendiren sertifika serileri.',
          },
        ],
      },
      {
        id: 'team',
        eyebrow: 'İnsan odaklı yapı',
        title: 'Ekibimiz ve danışmanlarımız',
        description:
          'Farklı disiplinlerden uzmanlar aynı amaç doğrultusunda çalışır: gençlere üretim gücü kazandırmak.',
        layout: 'grid',
        columns: 3,
        items: [
          {
            title: 'Yönetim Kadrosu',
            description:
              'Strateji, finans, insan kaynağı ve operasyon ekipleri TARF Akademi’nin sürdürülebilirliğini garanti eder.',
          },
          {
            title: 'Akademik Kadro',
            description:
              'Bilim insanları, araştırmacılar ve eğitim tasarımcıları program içeriklerini yönetir.',
          },
          {
            title: 'Danışmanlar',
            description:
              'Sektör uzmanları ve teknoloji liderleri, öğrencilerin kariyer yolculuklarına mentorluk sağlar.',
          },
        ],
      },
      {
        id: 'impact',
        eyebrow: 'Sayılarla TARF',
        title: 'Güvene dayalı etki',
        layout: 'stats',
        stats: [
          { label: 'Aktif program', value: '48', helper: 'Akademi, düşünce, yazılım ve topluluk' },
          { label: 'Topluluk üyesi', value: '6.800', helper: 'Kulüpler ve teknoloji takımları' },
          { label: 'Yayınlanan içerik', value: '1.200+', helper: 'Makale, rapor ve multimedya' },
          { label: 'Mentor havuzu', value: '95', helper: 'Akademisyen, mühendis, girişimci' },
        ],
      },
    ],
    cta: {
      title: 'Projelerimize katılın',
      description:
        'İster öğrenci ister mentor olun, TARF Akademi ekosisteminde herkese uygun bir üretim alanı var. Hemen iletişime geçin ve size uygun programı birlikte planlayalım.',
      primaryAction: { label: 'İletişim Kur', href: 'contact' },
      secondaryAction: { label: 'Program Kataloğu', href: 'services' },
    },
    seo: {
      title: 'TARF Akademi Hakkında | Bilim, Teknoloji ve İrfan Platformu',
      description:
        'TARF Akademi’nin kuruluş hikayesini, misyonunu, değerlerini ve üretim alanlarını keşfedin. Gençleri geleceğe hazırlayan çok katmanlı eğitim ekosistemi.',
    },
  },
  {
    slug: 'vizyon-degerler',
    category: 'kurumsal',
    hero: {
      eyebrow: 'Vizyonumuz',
      title: 'Geleceği inşa eden değerler',
      subtitle: 'Bilgi, teknoloji ve ahlak temelli gelecek vizyonu',
      description:
        'Türkiye’den dünyaya açılan üretim hareketimiz, yalnızca programlardan ibaret değil; tüm adımlarımızı yöneten güçlü bir vizyon ve değer seti var.',
      highlight: '2030 ve 2040 hedef haritası',
      actions: [
        { label: 'Vizyon Belgesi', href: 'vizyon-degerler' },
        { label: 'Değerler Atölyesi', href: 'events', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'vision',
        eyebrow: 'Uzun vadeli perspektif',
        title: '2030 ve 2040 vizyonu',
        layout: 'split',
        items: [
          {
            title: '2030 hedefleri',
            description:
              'Her şehirde üretim yapan gençlik toplulukları, dijitalleşmiş akademi içerikleri ve global sertifika ağları oluşturmak.',
            bullets: [
              'Türkiye genelinde 20 teknoloji takımı',
              'TARF Dergi’nin uluslararası edisyonu',
              'Karma öğrenme platformunda 50.000 kullanıcı',
            ],
          },
          {
            title: '2040 vizyonu',
            description:
              'Bölgesel ölçekte teknoloji–akademi ekosistemi kurarak etik teknoloji üretimi konusunda referans kurum olmak.',
            bullets: [
              'Küresel konferans serisi',
              'İleri araştırma merkezleri ve laboratuvarlar',
              'Sosyal etki fonlarıyla desteklenen girişimler',
            ],
          },
        ],
      },
      {
        id: 'mission',
        eyebrow: 'Misyon maddeleri',
        title: 'Günlük kararlarımızı yönlendiren görev tanımı',
        layout: 'grid',
        columns: 3,
        description:
          'tarf.md’deki altı ana misyon maddesini genişletilmiş açıklamalarla kurum kültürüne taşıyoruz.',
        items: [
          {
            title: 'Güçlü eğitim altyapısı',
            description: 'Teknoloji ve bilim alanlarında örnek gösterilen müfredat ve içerik üretimi',
          },
          {
            title: 'Yazılım üretimi',
            description: 'Teknik becerileri geliştiren, gerçek uygulamalarla güçlenen yazılım programları',
          },
          {
            title: 'Araştırma kültürü',
            description: 'Gençleri akademik disiplin ve bilimsel meraka teşvik eden görevler',
          },
          {
            title: 'Ekosistem oluşturmak',
            description: 'Konferanslar, teknoloji kafeleri ve takımlar arasında akışkan iş birlikleri',
          },
          {
            title: 'Teknoloji dönüşümü',
            description: 'Türkiye’nin dijital dönüşümüne katkı sağlayacak nitelikli insan gücü yetiştirmek',
          },
          {
            title: 'Etik ve değerler',
            description: 'Dijitalleşen dünyada kültürel ve etik değerlere bağlı bir nesil yetiştirmek',
          },
        ],
      },
      {
        id: 'values',
        eyebrow: 'Değerlerimiz',
        title: 'Kurumsal davranış kodumuz',
        description:
          'Yedi temel değer, tüm programlarımızda ölçtüğümüz ve görünür kıldığımız davranış göstergelerine dönüştürüldü.',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Yenilikçilik',
            description: 'Trendleri takip eden değil, yeni modeller üreten eğitim ve teknoloji yaklaşımı.',
            bullets: ['Ar-Ge sprintleri', 'Hızlı prototipleme'],
          },
          {
            title: 'Üretkenlik',
            description: 'Bilgiyi pratiğe dönüştüren workshop ve proje tabanlı öğrenmeler.',
            bullets: ['Proje kuluçkası', 'Atölye zinciri'],
          },
          {
            title: 'Etik ve Değerler',
            description: 'Teknolojinin insana hizmet ettiği perspektifi korumak.',
            bullets: ['Etik kurul', 'İlkeler kodu'],
          },
          {
            title: 'Toplumsal Fayda',
            description: 'Üretilen her projenin toplumsal iyileşme sağlamasına dikkat etmek.',
            bullets: ['Sosyal etki ölçümü', 'Açık kaynak projeler'],
          },
          {
            title: 'İşbirliği',
            description: 'Takımlar arasında bilgi paylaşımı ve ortak hedef oluşturmak.',
            bullets: ['Çapraz mentor havuzu', 'Eş zamanlı kamplar'],
          },
          {
            title: 'Sürekli Öğrenme',
            description: 'Eğitmenler ve öğrenciler için düzenli değerlendirme döngüleri.',
            bullets: ['Geri bildirim panelleri', 'Öğrenme analitiği'],
          },
          {
            title: 'Güven',
            description: 'Şeffaf iletişim ve sağlam yönetişim prosedürleri ile güven tesis etmek.',
            bullets: ['Politika şeffaflığı', 'Yetkinlik bazlı atamalar'],
          },
        ],
      },
      {
        id: 'themes',
        eyebrow: 'Stratejik temalar',
        title: 'Vizyonu hayata geçiren öncelikler',
        layout: 'grid',
        columns: 3,
        items: [
          {
            title: 'Innovation Labs',
            description: 'Yazılım teknolojileri ile düşünce enstitüsünü aynı masada buluşturuyoruz.',
          },
          {
            title: 'Küresel ağ',
            description: 'Uluslararası iş birlikleri ile konferans ve içerik ağımızı genişletiyoruz.',
          },
          {
            title: 'Veri odaklı karar',
            description: 'Akademi performansını veri ile ölçüyor, öğrenme deneyimini optimize ediyoruz.',
          },
          {
            title: 'İnsan odaklı liderlik',
            description: 'Mentorluk sistemleri ile genç liderler yetiştiriyor, yönetişimimizi güçlendiriyoruz.',
          },
          {
            title: 'Sürdürülebilir altyapı',
            description: 'Mekan, dijital platform ve finans yapımızı uzun vadeli planlıyoruz.',
          },
          {
            title: 'Erişilebilirlik',
            description: 'Programlarımızı farklı sosyo-ekonomik gruplar için erişilebilir kılıyoruz.',
          },
        ],
      },
    ],
    cta: {
      title: 'Değerlerimizi hayata geçiren programlara katılın',
      description:
        'Akademi modüllerinden teknoloji takımlarına kadar tüm içeriklerimizde aynı vizyonu taşıyoruz. Size uygun modülü seçin.',
      primaryAction: { label: 'Programları Keşfet', href: 'services' },
      secondaryAction: { label: 'Vizyon Dokümanı', href: 'vizyon-degerler' },
    },
    seo: {
      title: 'TARF Vizyonu ve Değerleri | Geleceği İnşa Eden İlkeler',
      description:
        'Yenilikçilik, üretkenlik ve etik değerler etrafında şekillenen TARF Akademi vizyonunu keşfedin. 2030 ve 2040 hedeflerimizi inceleyin.',
    },
  },
  {
    slug: 'yonetim-ilkeleri',
    category: 'kurumsal',
    hero: {
      eyebrow: 'Yönetişim',
      title: 'Sorumlu ve şeffaf yönetim ilkeleri',
      subtitle: 'Akademik özgürlük, etik üretim ve hesap verebilir bir yapı',
      description:
        'Programlarımızın başarısı kadar onları yöneten sistemlerin güvenilir olması gerektiğine inanıyoruz. Yönetişim ilkelerimiz karar alma süreçlerinden kaynak tahsisine kadar tüm süreçleri düzenler.',
      actions: [
        { label: 'Yönetim Modeli', href: 'yonetim-ilkeleri' },
        { label: 'Etik Beyan', href: 'etik-beyan', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'principles',
        eyebrow: 'Çerçeve',
        title: 'Yönetim ilkelerimiz',
        description:
          'Kurumsal hafızayı koruyan ve büyümeyi sürdürülebilir kılan temel ilkeleri şeffaf şekilde paylaşıyoruz.',
        layout: 'grid',
        columns: 3,
        items: [
          {
            title: 'Şeffaflık',
            description: 'Plan, bütçe ve performans raporlarını toplulukla paylaşır, açık veri kültürü oluştururuz.',
          },
          {
            title: 'Hesap verebilirlik',
            description: 'Her programın hedefi, sorumlusu ve ölçüm metrikleri kamuya açıktır.',
          },
          {
            title: 'Katılımcılık',
            description: 'Öğrencilerin, mentorların ve paydaşların kararlara dahil olduğu mekanizmalar kurarız.',
          },
          {
            title: 'Etik yönetişim',
            description: 'Tüm kararlar TARF Etik Beyanı ve değerler setine göre değerlendirilir.',
          },
          {
            title: 'Veri odaklılık',
            description: 'Kararlar ölçülebilir verilere dayanır, öğrenme analitiği ile doğrulanır.',
          },
          {
            title: 'Sürdürülebilirlik',
            description: 'Finansal, çevresel ve sosyal etkileri gözeterek yatırım planları hazırlarız.',
          },
        ],
      },
      {
        id: 'decision',
        eyebrow: 'Karar alma',
        title: 'Yetki ve sorumluluk dağılımı',
        layout: 'list',
        items: [
          {
            title: 'Stratejik Kurul',
            description:
              'Akademi, yazılım, düşünce enstitüsü ve topluluk yöneticilerinden oluşur. Yıllık hedefleri belirler.',
          },
          {
            title: 'Program Konseyleri',
            description:
              'Her ana faaliyet alanı için ayrı konseyler; içerik, bütçe ve performans kararlarını alır.',
          },
          {
            title: 'Öğrenci Danışma Meclisi',
            description:
              'Programların katılımcıları geri bildirim toplar, karar döngülerine öneri gönderir.',
          },
          {
            title: 'Bağımsız Denetim',
            description:
              'Finansal ve operasyonel süreçler yılda iki kez bağımsız denetime tabi tutulur.',
          },
        ],
      },
      {
        id: 'transparency',
        eyebrow: 'Uygulama',
        title: 'Şeffaf raporlama araçlarımız',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Performans panosu',
            description:
              'Program katılımı, memnuniyet ve çıktı metriklerini gösteren dijital gösterge paneli.',
          },
          {
            title: 'Politika kitaplığı',
            description:
              'Tüm yönergeler, süreç dokümanları ve prosedürler tek bir dijital kitaplıkta yayımlanır.',
          },
          {
            title: 'Geri bildirim kanalları',
            description:
              'Anonim bildirim formları, mentor görüşmeleri ve topluluk loncaları ile sürekli iletişim.',
          },
          {
            title: 'Yıllık etki raporu',
            description:
              'Eğitim, yazılım, topluluk ve finansal performans rakamları herkesle paylaşılır.',
          },
        ],
      },
      {
        id: 'compliance',
        eyebrow: 'Uyum',
        title: 'Risk yönetimi ve iç kontrol',
        description:
          'Hızlı büyürken riskleri doğru yönetebilmek için kurumsal uyum mekanizmaları kurduk.',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Risk matrisi', description: 'Eğitim, teknoloji ve finansal riskleri düzenli olarak güncelliyoruz.' },
          { title: 'İç kontrol listeleri', description: 'Program döngülerinin her aşamasında kontrol noktaları tanımlandı.' },
          { title: 'KVKK & GDPR uyumu', description: 'Veri işleme süreçleri yasal standartlara göre denetleniyor.' },
          { title: 'İş sürekliliği planları', description: 'Dijital altyapılar ve fiziksel mekan için olağanüstü durum senaryoları hazır.' },
        ],
      },
    ],
    cta: {
      title: 'Yönetim süreçlerine dahil olun',
      description:
        'Topluluk meclisleri, danışma kurulları ve gönüllü çalışma gruplarına katılarak yönetişim süreçlerini birlikte iyileştirelim.',
      primaryAction: { label: 'Katılım Formu', href: 'contact' },
      secondaryAction: { label: 'Etik Komite', href: 'etik-beyan' },
    },
    seo: {
      title: 'TARF Yönetim İlkeleri | Şeffaf ve Katılımcı Yapı',
      description:
        'Karar alma süreçleri, hesap verebilirlik mekanizmaları ve risk yönetimi yaklaşımlarımız hakkında bilgi edinin.',
    },
  },
  {
    slug: 'etik-beyan',
    category: 'kurumsal',
    hero: {
      eyebrow: 'Etik Beyan',
      title: 'Bilginin sorumluluğunu taşıyoruz',
      subtitle: 'Akademik dürüstlük, veri güvenliği ve toplumsal fayda için etik manifestomuz',
      description:
        'Her öğrencimizin ve ekip arkadaşımızın bağlı olduğu etik ilkeler, TARF Akademi’nin güvenilirliğinin temeli.',
      actions: [
        { label: 'Etik İlkeler', href: 'etik-beyan' },
        { label: 'İhlal Bildir', href: 'contact', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'foundation',
        eyebrow: 'Temel ilkeler',
        title: 'Etik yaklaşımımızın dayanakları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'İnsan onuru', description: 'Tüm faaliyetlerde insan haklarına saygı ve kapsayıcılık.' },
          { title: 'Bilimsel dürüstlük', description: 'Araştırmalarda kaynak, veri ve yöntem şeffaflığı.' },
          { title: 'Çıkar çatışması', description: 'Karar süreçlerinde çıkar çatışmalarını beyan etme zorunluluğu.' },
          { title: 'Sorumlu teknoloji', description: 'Topluma zarar vermeyen, faydayı önceleyen üretim' },
        ],
      },
      {
        id: 'code',
        eyebrow: 'Davranış kodu',
        title: 'Programlarda beklenen davranış modeli',
        description:
          'Öğrenciler, mentorlar, çalışanlar ve iş ortaklarının uyması gereken kurallar açıkça tanımlanmıştır.',
        layout: 'list',
        items: [
          { title: 'Eşitlik ve kapsayıcılık', description: 'Hiçbir kişi cinsiyet, dil, din veya görüş nedeniyle ayrımcılığa uğramaz.' },
          { title: 'Akademik dürüstlük', description: 'Plagiarism, veri manipülasyonu ve yanlış beyanda sıfır tolerans.' },
          { title: 'Profesyonel iletişim', description: 'Her durumda saygılı dil kullanımı ve tarafsız moderasyon.' },
          { title: 'Kaynak paylaşımı', description: 'Yazılım lisansları ve kaynak kodlarının sorumlu kullanımı.' },
        ],
      },
      {
        id: 'data',
        eyebrow: 'Veri etiği',
        title: 'Veri toplama ve kullanma prensipleri',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Şeffaf izin süreci',
            description: 'KVKK uyumlu açık rıza formları ve seçenek sunan süreçler.',
          },
          {
            title: 'Minimum veri',
            description: 'İhtiyaç olmayan kişisel veri toplanmaz, anonimleştirme tercih edilir.',
          },
          {
            title: 'Erişim kontrolleri',
            description: 'Veri tabanlarına rol bazlı erişim, düzenli penetrasyon testleri.',
          },
          {
            title: 'Veri ihlali protokolü',
            description: '24 saat içinde bildirim, iyileştirme planı ve paydaş bilgilendirmesi.',
          },
        ],
      },
      {
        id: 'academic',
        eyebrow: 'Bilimsel sorumluluk',
        title: 'Araştırma süreçlerinde etik uygulamalar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Etik kurul', description: 'Araştırma projeleri etik kurula sunulur, onaylanmadan yayınlanmaz.' },
          { title: 'Veri paylaşımı', description: 'Paylaşılan her veri seti anonimleştirilir ve lisans bilgisi içerecek şekilde arşivlenir.' },
          { title: 'Mentor gözetimi', description: 'Öğrenci projelerinde deneyimli mentorlar süreçleri raporlar.' },
          { title: 'Açık erişim', description: 'Üretilen bilgi mümkün olduğunca açık aksesuar ile paylaşılır.' },
        ],
      },
      {
        id: 'reporting',
        eyebrow: 'Bildir ve takip et',
        title: 'Etik ihlal bildirim süreçleri',
        description:
          'İhlal şüphesi varsa anonim olarak bildirim yapılabilir. Soruşturmalar bağımsız kurul tarafından yürütülür.',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Anonim form', description: 'web ve fiziksel kutular aracılığıyla 7/24 açık.' },
          { title: 'Ön değerlendirme', description: 'Etik komitesi ilk 48 saat içinde yanıt verir.' },
          { title: 'Soruşturma', description: 'Tarafsız ekip, ilgili tarafları dinler ve kanıt toplar.' },
          { title: 'Sonuç & iyileştirme', description: 'Kararlar yazılı olarak bildirilir, gerekirse programlar güncellenir.' },
        ],
      },
    ],
    cta: {
      title: 'Etik süreçlerle ilgili sorularınız mı var?',
      description:
        'Etik kurulumuza ulaşarak süreçler hakkında ayrıntılı bilgi alabilir, ihtiyaç duyarsanız danışmanlık talep edebilirsiniz.',
      primaryAction: { label: 'Etik Kurula Yaz', href: 'contact' },
      secondaryAction: { label: 'Politika Kitaplığı', href: 'yonetim-ilkeleri' },
    },
    seo: {
      title: 'TARF Etik Beyanı | Sorumlu Teknoloji ve Eğitim',
      description:
        'İnsan onuru, bilimsel dürüstlük ve veri güvenliği üzerine inşa edilen etik ilkelerimizi inceleyin.',
    },
  },
  {
    slug: 'basin-kiti',
    category: 'kurumsal',
    hero: {
      eyebrow: 'Basın Kiti',
      title: 'TARF Akademi basın ve medya merkezi',
      subtitle: 'Marka dosyaları, görseller, basın bültenleri ve medya ilişkileri',
      description:
        'Medya profesyonellerinin hızlıca erişebileceği tüm kaynakları tek bir yerde topladık. Hikayemizi doğru anlatmanız için ihtiyaç duyduğunuz görseller, veriler ve açıklamalar burada.',
      actions: [
        { label: 'Kit İndir', href: 'basin-kiti' },
        { label: 'Medya İletişimi', href: 'contact', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'content',
        eyebrow: 'Paket içeriği',
        title: 'Basın kitinde neler var?',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kurumsal özet', description: 'TARF Akademi’nin kısa hikayesi, misyonu ve etkisini anlatan doküman' },
          { title: 'Logo & görseller', description: 'Farklı formatlarda logo dosyaları, tipografi setleri ve renk kodları' },
          { title: 'Etkinlik görselleri', description: 'Konferans, teknoloji kafe ve takım çalışmalarından yüksek çözünürlüklü fotoğraflar' },
          { title: 'Basın bültenleri', description: 'Son konferans, sertifika programı ve yayın lansmanlarına ait bültenler' },
          { title: 'İstatistik kartları', description: 'Öğrenci sayıları, program verileri ve etki metrikleri infografikleri' },
          { title: 'Sık sorulanlar', description: 'Medya röportajlarında en çok gelen sorulara hazır yanıtlar' },
        ],
      },
      {
        id: 'brand',
        eyebrow: 'Marka kullanım rehberi',
        title: 'Logoyu kullanırken dikkat edilmesi gerekenler',
        description:
          'Tüm görsel varlıklarımız için kullanım kurallarını paylaşıyoruz. Böylece marka bütünlüğünü koruyoruz.',
        layout: 'list',
        items: [
          { title: 'Boşluk kuralları', description: 'Logo etrafında minimum boşluk oranları belirtilmiştir.' },
          { title: 'Renk varyasyonları', description: 'Açık ve koyu zeminlerde kullanılacak alternatifler sunulmuştur.' },
          { title: 'Tipografi', description: 'Kurumsal font ailesi ve uygulama örnekleri.' },
          { title: 'Yanlış kullanım', description: 'Örnekler üzerinden hangi kombinasyonlardan kaçınmanız gerektiğini gösteriyoruz.' },
        ],
      },
      {
        id: 'stories',
        eyebrow: 'Hikaye fikirleri',
        title: 'Basında öne çıkan temalar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Gençlerin teknoloji üretimi', description: 'Teknoloji takımları ve yarışma başarıları' },
          { title: 'Yapay zekâ ve etik', description: 'Etik teknolojiyi odağa alan konferans serisi' },
          { title: 'Akademi dönüşümü', description: 'Proje tabanlı öğrenme ve sertifika programlarının etkisi' },
          { title: 'Topluluk deneyimi', description: 'Teknoloji kafe ve mentor buluşmaları' },
        ],
      },
      {
        id: 'media',
        eyebrow: 'Basın iletişimi',
        title: 'Doğru kişilere ulaşın',
        layout: 'list',
        items: [
          { title: 'Basın sözcüsü', description: 'Kurucu temsilcilerimizin iletişim bilgileri ve uygunluk takvimi' },
          { title: 'Medya ilişkileri', description: 'Basın toplantıları, medya ziyaretleri ve saha çekim organizasyonları' },
          { title: 'Röportaj talebi', description: 'Form doldurarak hedeflediğiniz yayın tarihini iletebilirsiniz' },
          { title: 'Basında TARF', description: 'Son haberler, video yayınları ve makalelerin bağlantıları' },
        ],
      },
    ],
    cta: {
      title: 'Basın materyallerine hemen erişin',
      description:
        'Basın kiti bağlantısını talep edin veya medya ilişkileri ekibimizle canlı görüşme planlayın.',
      primaryAction: { label: 'Basın Kiti Talep Et', href: 'contact' },
      secondaryAction: { label: 'Son Haberler', href: 'blog' },
    },
    seo: {
      title: 'TARF Basın Kiti | Medya Kaynakları ve Görseller',
      description:
        'Logo dosyaları, basın bültenleri, istatistikler ve medya iletişim bilgilerini içeren TARF Akademi basın kiti.',
    },
  },
  {
    slug: 'tarf-mekan',
    category: 'kurumsal',
    hero: {
      eyebrow: 'TARF Mekan',
      title: 'Üretim ve işbirliği merkezi',
      subtitle: 'Teknoloji, bilim ve sosyal etkileşim için tasarlanmış modern mekan',
      description:
        'Karma çalışma alanı, laboratuvarlar, teknoloji kafe ve etkinlik salonlarından oluşan TARF Mekan, gençlerin üretim üssü.',
      actions: [
        { label: 'Rezervasyon Yap', href: 'contact' },
        { label: 'Mekanı Ziyaret Et', href: 'events', variant: 'secondary' },
      ],
      stats: [
        { label: 'Toplam alan', value: '3.400 m²', helper: 'Açık ve kapalı alanlar' },
        { label: 'Eş zamanlı kapasite', value: '420 kişi', helper: 'Eğitim + etkinlik' },
        { label: 'Toplantı odası', value: '12', helper: 'Farklı büyüklüklerde' },
      ],
    },
    sections: [
      {
        id: 'about',
        eyebrow: 'Mekan tanıtımı',
        title: 'Şehrin merkezinde üretim ekosistemi',
        description:
          'Ulaşımı kolay, dijital altyapısı güçlü ve gençlerin vakit geçirmek istediği sıcak bir mekan tasarladık.',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Konum', description: 'Metro ve toplu taşımaya yürüme mesafesinde, merkezî lokasyon' },
          { title: 'Çalışma saatleri', description: 'Hafta içi 09:00-22:00, hafta sonu etkinliklere göre 10:00-20:00' },
          { title: 'Üyelik', description: 'Akademi öğrencileri ücretsiz, topluluk üyelerine avantajlı paketler' },
          { title: 'Erişilebilirlik', description: 'Engelli erişimine uygun rampalar ve asansörler' },
        ],
      },
      {
        id: 'spaces',
        eyebrow: 'Alanlar ve olanaklar',
        title: 'Çok amaçlı üretim alanları',
        layout: 'grid',
        columns: 3,
        items: [
          { title: 'Coworking alanı', description: 'Açık masa sistemi, hızlı internet, toplantı pod’ları' },
          { title: 'Toplantı odaları', description: 'Ses izolasyonlu, 6-20 kişilik teknolojik odalar' },
          { title: 'Eğitim sınıfları', description: 'Akıllı tahtalar, kayıt sistemleri ve modüler oturma' },
          { title: 'Maker space', description: '3D printer, elektronik atölye, robotik kitler' },
          { title: 'Teknoloji kafe', description: 'Mentor görüşmeleri ve topluluk buluşmaları için cafe alanı' },
          { title: 'Etkinlik salonu', description: 'Konferans ve demo günü için 350 kişilik salon' },
        ],
      },
      {
        id: 'tech',
        eyebrow: 'Teknolojik altyapı',
        title: 'İleri seviye teknik donanım',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Gigabit internet', description: 'Tüm alanlarda yüksek hızlı kablosuz ve kablolu ağ' },
          { title: 'Yayın stüdyosu', description: 'Podcast, video ve canlı yayın için ses yalıtımlı stüdyo' },
          { title: 'Sunucu odası', description: 'Özel projeler ve hackathon’lar için ayrılmış cloud altyapısı' },
          { title: 'AV sistemleri', description: 'Konferans salonu için LED ekran, profesyonel ses ve ışık' },
        ],
      },
      {
        id: 'reservation',
        eyebrow: 'Rezervasyon süreçleri',
        title: 'Kimler kullanabilir?',
        layout: 'list',
        items: [
          { title: 'Akademi öğrencileri', description: 'Program boyunca ücretsiz erişim ve masa rezervasyonu' },
          { title: 'Topluluk üyeleri', description: 'Kulüpler ve teknoloji takımları için öncelikli slotlar' },
          { title: 'İş ortakları', description: 'Özel etkinlik ve lansmanlar için günlük kiralama' },
          { title: 'Kurumsal ziyaretler', description: 'Teknoloji kafe deneyimleri ve demo turları' },
        ],
      },
    ],
    cta: {
      title: 'Mekan turu planlayın',
      description:
        'Rezervasyon ekibimizden destek alarak mekanda etkinlik veya buluşma organize edebilirsiniz.',
      primaryAction: { label: 'Rezervasyon Talebi', href: 'contact' },
      secondaryAction: { label: 'Etkinlik Takvimi', href: 'events' },
    },
    seo: {
      title: 'TARF Mekan | Teknoloji ve İşbirliği Alanı',
      description:
        'Coworking alanları, maker lab ve etkinlik salonlarıyla TARF Mekan’ı yakından tanıyın. Rezervasyon süreçlerini öğrenin.',
    },
  },
]

const dusuncePages: ContentPageDefinition[] = [
  {
    slug: 'dusunce-enstitusu',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Fikir üretimi, araştırma ve toplumsal dönüşüm merkezi',
      subtitle: 'Bilimsel metotla düşünen, veriyle konuşan ve çözüm üreten bir ekip',
      description:
        'Eğitim, gençlik, aile ve kültür alanlarında derinlemesine araştırmalar yapıyor; sonuçları yayın, program ve politika önerilerine dönüştürüyoruz.',
      actions: [
        { label: 'Araştırmalarımız', href: 'dusunce-enstitusu' },
        { label: 'Rapor Talep Et', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Araştırma alanı', value: '4', helper: 'Eğitim, gençlik, aile, kültür' },
        { label: 'Yıllık yayın', value: '45+', helper: 'Rapor, makale ve analizler' },
        { label: 'Uzman ağı', value: '30+', helper: 'Akademisyen ve saha uzmanı' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Ana odak alanları',
        title: 'Toplumsal dönüşüme yön veren çalışmalar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Eğitim Araştırmaları', description: 'Modern öğrenme modelleri, müfredat dönüşümü ve öğretmen gelişimi.' },
          { title: 'Aile Araştırmaları', description: 'Modern aile dinamikleri, ebeveynlik ve aile destek programları.' },
          { title: 'Kültür & Sanat', description: 'Kültürel miras, çağdaş sanat ve kültürel diplomasi projeleri.' },
          { title: 'Gençlik Çalışmaları', description: 'Gençlik ve teknoloji, girişimcilik ve kariyer yolları üzerine araştırmalar.' },
          { title: 'Uluslararası İlişkiler', description: 'Küresel trendler, diplomasi ve bölgesel işbirliklerine odaklanan araştırmalar.' },
          { title: 'Çevre-İklim-Doğa', description: 'İklim krizi, sürdürülebilirlik ve doğa temelli çözümler üzerine çalışmalar.' },
          { title: 'Bilim ve Teknoloji', description: 'Bilimsel gelişmelerin toplum ve ekonomi üzerindeki etkilerine dair analizler.' },
        ],
      },
      {
        id: 'approach',
        eyebrow: 'Yaklaşımımız',
        title: 'Bilimsel metot + veri odaklı içgörü',
        layout: 'grid',
        columns: 3,
        items: [
          { title: 'Saha araştırmaları', description: 'Yerel ihtiyaçları anlamak için saha görüşmeleri ve odak grup çalışmaları.' },
          { title: 'Veri analitiği', description: 'Nitel ve nicel verileri birleştiren, etki ölçümüne dayalı analizler.' },
          { title: 'Çözüm tasarımı', description: 'Araştırma çıktılarından politika önerileri ve program tasarımları üretmek.' },
        ],
      },
      {
        id: 'publications',
        eyebrow: 'Yayınlar',
        title: 'Yayın ve rapor serileri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'TARF Rapor Serisi', description: 'Yıllık olarak yayımlanan kapsamlı sektör analizleri.' },
          { title: 'Politika Notları', description: 'Karar vericilere yönelik kısa ve uygulamaya dönük içerikler.' },
          { title: 'Veri setleri', description: 'Açık veri formatında paylaşılan araştırma çıktıları.' },
          { title: 'Etki öyküleri', description: 'Programlardan çıkan gerçek dönüşüm hikayeleri.' },
        ],
      },
      {
        id: 'events',
        eyebrow: 'Etkinlikler',
        title: 'Konferans, panel ve çalıştaylar',
        description:
          'Araştırmalarımızı paylaşırken aynı zamanda yeni fikirlerin filizlenmesi için alan açıyoruz.',
        layout: 'list',
        items: [
          { title: 'Yıllık Düşünce Forumu', description: 'Türkiye’nin fikir liderlerini bir araya getiren ana etkinlik' },
          { title: 'Politika atölyeleri', description: 'Karar vericiler ve gençler için ortak çalışma oturumları' },
          { title: 'Yayın lansmanları', description: 'Yeni raporların tartışıldığı interaktif buluşmalar' },
          { title: 'Kültür-sanat söyleşileri', description: 'Sanatçı ve akademisyenlerin katıldığı seri' },
        ],
      },
      {
        id: 'team',
        eyebrow: 'Ekip',
        title: 'Uzmanlar ve araştırmacılar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Araştırmacılar', description: 'Sosyoloji, psikoloji, eğitim bilimleri ve veri bilimi uzmanları' },
          { title: 'Program tasarımcıları', description: 'Araştırma bulgularını uygulanabilir programlara dönüştüren ekip' },
          { title: 'Mentorlar', description: 'Saha deneyimi yüksek, topluluklarla yakın çalışan gönüllüler' },
          { title: 'Akademik kurul', description: 'Üniversite iş birlikleriyle kurulan danışma kurulu' },
        ],
      },
    ],
    cta: {
      title: 'Rapor talep edin veya işbirliği başlatın',
      description:
        'Araştırmalarımızı yakından takip etmek ya da proje ortaklığı kurmak için uzman ekibimizle iletişime geçin.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Yayın Arşivi', href: 'blog' },
    },
    seo: {
      title: 'TARF Düşünce Enstitüsü | Araştırma ve Politika Merkezi',
      description:
        'Eğitim, gençlik, aile ve kültür alanlarında yürütülen araştırmaları, raporları ve etkinlikleri keşfedin.',
    },
  },
  {
    slug: 'dusunce-enstitusu/egitim',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Eğitim Araştırmaları ve Programları',
      subtitle: 'Modern eğitim sistemleri, öğretim metodolojileri ve eğitimde dönüşüm',
      description:
        'Okulları, üniversiteleri ve alternatif öğrenme modellerini kapsayan bütüncül bir perspektifle çalışıyoruz.',
      actions: [
        { label: 'Araştırma Dosyası', href: 'dusunce-enstitusu/egitim' },
        { label: 'Program Talep Et', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Okul işbirliği', value: '65', helper: 'Pilot uygulama' },
        { label: 'Öğretmen', value: '1.200+', helper: 'Gelişim programı' },
        { label: 'Öğrenci verisi', value: '45.000', helper: 'Analiz edilen kayıt' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Eğitimi yeniden tasarlayan başlıklar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Modern metodolojiler', description: 'Aktif öğrenme, proje tabanlı yaklaşım ve karma modeller.' },
          { title: 'Dijital dönüşüm', description: 'E-öğrenme platformları, öğrenme analitiği ve içerik standartları.' },
          { title: 'Öğretmen gelişimi', description: 'Mentörlük programları ve mesleki gelişim kampüsleri.' },
          { title: 'Müfredat geliştirme', description: '21. yüzyıl becerilerini kapsayan esnek müfredat modelleri.' },
          { title: 'Kalite standartları', description: 'Akredite sistemler ve değerlendirme araçları.' },
          { title: 'Politika önerileri', description: 'Karar vericilere yönelik analitik raporlar.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Uygulama alanları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Eğitim laboratuvarı', description: 'Öğretmen ve yöneticiler için prototip müfredatlar.' },
          { title: 'Dijital okul modeli', description: 'Uzaktan eğitimde kaliteyi artıran hibrit yapılar.' },
          { title: 'Mentor akademi', description: 'Öğretmenler için rehberlik ve liderlik modülleri.' },
          { title: 'STEM & değerler', description: 'Teknoloji ve etik değerleri birleştiren programlar.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkanlar',
        title: 'Proje ve raporlar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Türkiye Eğitim Panorama Raporu', description: 'Öğrenci memnuniyeti, öğretmen ihtiyaçları ve altyapı verileri.' },
          { title: 'Dünya trendleri dosyası', description: 'OECD ve UNESCO verileri üzerinden karşılaştırmalar.' },
          { title: 'Başarı hikayeleri', description: 'STEM programı mezunlarının kariyer yolculukları.' },
          { title: 'Politika diyalogları', description: 'Bakanlıklar ve yerel yönetimlerle düzenlenen çözüm atölyeleri.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Programları kurumunuza taşıyın',
        layout: 'list',
        items: [
          { title: 'Araştırma ortağı olun', description: 'Veri paylaşın, saha çalışmasına destek verin.' },
          { title: 'Programları uyarlayın', description: 'Eğitim içeriklerini kurumunuza adapte edin.' },
          { title: 'Mentor ağına katılın', description: 'Öğretmen gelişiminde rol alın.' },
        ],
      },
    ],
    cta: {
      title: 'Eğitim çözümü tasarlayalım',
      description:
        'Okulunuz, belediyeniz veya kurumunuz için eğitim dönüşümü projesini birlikte kurgulayalım.',
      primaryAction: { label: 'İletişim Kur', href: 'contact' },
      secondaryAction: { label: 'Raporu İndir', href: 'dusunce-enstitusu' },
    },
    seo: {
      title: 'Eğitim Araştırmaları | TARF Düşünce Enstitüsü',
      description:
        'Modern eğitim metodolojileri, dijital dönüşüm ve öğretmen gelişimi üzerine araştırmalar ve programlar.',
    },
  },
  {
    slug: 'dusunce-enstitusu/genclik',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Gençlik Araştırmaları ve Programları',
      subtitle: 'Gençlerin potansiyelini ortaya çıkaran, gelişimini destekleyen programlar',
      description:
        'Z kuşağı araştırmaları, dijital kültür, girişimcilik ve liderlik üzerine geliştirilen kapsamlı projeler.',
      actions: [
        { label: 'Programları Gör', href: 'dusunce-enstitusu/genclik' },
        { label: 'Mentor Ol', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aktif program', value: '18', helper: 'Gençlik eksenli' },
        { label: 'Katılımcı', value: '3.200', helper: 'Yıllık' },
        { label: 'Mentor', value: '75', helper: 'Profesyonel destek' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Gençlerin dünyasını anlamak',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Gençlik & teknoloji', description: 'Dijital yerlilerin alışkanlıkları ve riskleri.' },
          { title: 'Girişimcilik & kariyer', description: 'Yeni iş modelleri ve yetkinlik haritaları.' },
          { title: 'Sosyal sorumluluk', description: 'Gönüllülük hareketleri ve sosyal girişimler.' },
          { title: 'Liderlik gelişimi', description: 'Genç liderler için uygulamalı içerikler.' },
          { title: 'Gençlik kültürü', description: 'Müzik, sanat, oyun dünyası ve trend analizleri.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Uygulama alanları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Gençlik laboratuvarı', description: 'Proje geliştirme ve mentor eşleşmesi.' },
          { title: 'Start-up kampı', description: 'İş modeli geliştirme ve yatırımcı buluşmaları.' },
          { title: 'Sosyal inovasyon atölyesi', description: 'Toplumsal sorunlara çözüm arayan ekipler.' },
          { title: 'Kariyer atölyeleri', description: 'CV, portfolyo ve mülakat hazırlıkları.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan hikayeler',
        title: 'Proje ve araştırmalar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Z Kuşağı Raporları', description: 'Gençlerin yaşam tarzı ve beklentilerine dair trend analizi.' },
          { title: 'Başarı hikayeleri', description: 'Mentor destekli girişimlerin yatırım alması.' },
          { title: 'Gençlik zirvesi', description: 'Yıllık liderlik buluşmaları ve ödül törenleri.' },
          { title: 'Dijital sağlık programı', description: 'Dijital detoks ve bilinçli kullanım modülleri.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Gençler için alan açın',
        layout: 'list',
        items: [
          { title: 'Mentor olun', description: 'Genç girişimlere deneyiminizi aktarın.' },
          { title: 'Programı kurumunuza taşıyın', description: 'Gençlik ofisleri ve belediyelerle iş birliği.' },
          { title: 'Araştırmaya destek verin', description: 'Veri paylaşımı ve saha çalışmaları.' },
        ],
      },
    ],
    cta: {
      title: 'Gençlik projeleri için işbirliği yapalım',
      description:
        'Staj, mentorluk veya ortak kamp organizasyonu için bizimle iletişime geçin.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Etkinlik Takvimi', href: 'events' },
    },
    seo: {
      title: 'Gençlik Programları | TARF Düşünce Enstitüsü',
      description:
        'Gençlik ve teknoloji, girişimcilik, liderlik ve sosyal sorumluluk üzerine araştırma ve uygulama programları.',
    },
  },
  {
    slug: 'dusunce-enstitusu/aile',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Aile Araştırmaları ve Destek Programları',
      subtitle: 'Güçlü aileler, güçlü toplum',
      description:
        'Modern aile dinamiklerini analiz ediyor, ebeveynlik becerilerini destekleyen eğitim içerikleri geliştiriyoruz.',
      actions: [
        { label: 'Programları İncele', href: 'dusunce-enstitusu/aile' },
        { label: 'Uzmanla Görüş', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aile atölyesi', value: '120', helper: 'Yıllık' },
        { label: 'Danışman uzman', value: '28', helper: 'Psikolog & sosyolog' },
        { label: 'Memnuniyet', value: '%94', helper: 'Program değerlendirme' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Aile kurumuna dair içgörüler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Aile dinamikleri', description: 'Sosyo-kültürel değişimlerin aile yapısına etkisi.' },
          { title: 'Ebeveyn-çocuk iletişimi', description: 'Etkili iletişim teknikleri ve eğitimler.' },
          { title: 'Aile danışmanlığı', description: 'Evlilik, ilişki ve kriz yönetimi protokolleri.' },
          { title: 'Nesiller arası etkileşim', description: 'Kültürel aktarım ve birlikte öğrenme.' },
          { title: 'Dijital ebeveynlik', description: 'Teknoloji kullanımında rehberlik.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Destek programları',
        title: 'Aileler için uygulamalar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Ebeveyn okulu', description: 'Atölyeler, seminerler ve mentorluk oturumları.' },
          { title: 'Aile danışma hattı', description: 'Uzman psikolog ve danışman desteği.' },
          { title: 'Aile atölyeleri', description: 'Ortak etkinlikler ve deneyim paylaşımı.' },
          { title: 'Evlilik öncesi program', description: 'İlişki becerileri ve çatışma yönetimi modülleri.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan içerikler',
        title: 'Raporlar ve hikayeler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Aile İklimi Raporu', description: 'Türkiye’de aile yapısının güncel durumu.' },
          { title: 'Uzman yazıları', description: 'Psikolog ve akademisyenlerden düzenli makaleler.' },
          { title: 'Destek platformu', description: 'Online içerikler ve kaynak bankası.' },
          { title: 'Topluluk buluşmaları', description: 'Aileler arası deneyim paylaşımı.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Ailelere destek verin',
        layout: 'list',
        items: [
          { title: 'Program sponsoru olun', description: 'Atölye ve seminerleri destekleyin.' },
          { title: 'Veri paylaşımı yapın', description: 'Saha gözlemlerinizi araştırma ekibiyle paylaşın.' },
          { title: 'Uzman ağımıza katılın', description: 'Psikolog ve danışman olarak gönüllü olun.' },
        ],
      },
    ],
    cta: {
      title: 'Aile programlarında işbirliği yapalım',
      description:
        'Belediyeler, STK’lar ve özel kurumlarla birlikte aile destek programları tasarlayalım.',
      primaryAction: { label: 'İletişim Kur', href: 'contact' },
      secondaryAction: { label: 'Kaynakları Gör', href: 'blog' },
    },
    seo: {
      title: 'Aile Araştırmaları | TARF Düşünce Enstitüsü',
      description:
        'Ebeveynlik, aile iletişimi ve danışmanlık programları hakkında detaylı bilgi alın.',
    },
  },
  {
    slug: 'dusunce-enstitusu/kultur-sanat',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Kültür & Sanat Araştırmaları',
      subtitle: 'Kültürel miras, çağdaş sanat ve dijital kültür',
      description:
        'Kültürel kimlik, sanat üretimi ve dijital kültür üzerine araştırmalar yapıyor; sanatçılarla ortak projeler geliştiriyoruz.',
      actions: [
        { label: 'Programları Keşfet', href: 'dusunce-enstitusu/kultur-sanat' },
        { label: 'Sanatçı İşbirliği', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Sergi & etkinlik', value: '35', helper: 'Yıllık ortalama' },
        { label: 'Sanatçı', value: '80+', helper: 'İş birliği yapılan' },
        { label: 'Kitle erişimi', value: '150K', helper: 'Dijital & fiziksel' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Kültürel üretime bakış',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kültürel kimlik', description: 'Yerel değerlerin korunması ve aktarımı.' },
          { title: 'Çağdaş sanat', description: 'Sanat üretiminde yeni anlatılar ve medya.' },
          { title: 'Dijital kültür', description: 'Metaverse, oyun ve yeni medya trendleri.' },
          { title: 'Sanat eğitimi', description: 'Okullar ve topluluklar için programlar.' },
          { title: 'Kültürel diplomasi', description: 'Uluslararası iş birlikleri ve sanatçı değişimleri.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Sanatla üretim',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Sanatçı rezidansları', description: 'Genç sanatçılara mekân, mentorluk ve görünürlük.' },
          { title: 'Kültür turları', description: 'Şehir içi/şehir dışı deneyim odaklı geziler.' },
          { title: 'Sanat atölyeleri', description: 'Çocuklar ve gençler için disiplinler arası atölyeler.' },
          { title: 'Dijital sergiler', description: 'NFT ve dijital sanat platformları.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan içerikler',
        title: 'Program ve yayınlar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kültür atlası', description: 'Türkiye’de kültürel üretim haritası.' },
          { title: 'Sergiler', description: 'Tematik sergiler ve sanatçı söyleşileri.' },
          { title: 'Kültür-sanat yazıları', description: 'Eleştiri, analiz ve rehber içerikleri.' },
          { title: 'Sanatçı ağı', description: 'Mentorlar ve iş birliği yapılan sanatçılar.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Sanat projelerine destek olun',
        layout: 'list',
        items: [
          { title: 'Sergi sponsoru olun', description: 'Genç sanatçıların işlerini görünür kılın.' },
          { title: 'Program ortaklığı', description: 'Kurumlara özel sanat içerikleri tasarlayın.' },
          { title: 'Yayın katkısı', description: 'Kültür-sanat yazılarıyla bilgi paylaşın.' },
        ],
      },
    ],
    cta: {
      title: 'Kültür & sanat projeleri için iletişime geçin',
      description:
        'Sanatçı rezidansları, sergiler ve araştırma yayınları için işbirliği fırsatlarını konuşalım.',
      primaryAction: { label: 'İletişim Kur', href: 'contact' },
      secondaryAction: { label: 'Yayınları Gör', href: 'blog' },
    },
    seo: {
      title: 'Kültür ve Sanat Programları | TARF Düşünce Enstitüsü',
      description:
        'Kültürel kimlik, sanat eğitimi ve dijital kültür üzerine araştırmalar ve sanatçı programları.',
    },
  },
  {
    slug: 'dusunce-enstitusu/uluslararasi-iliskiler',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Uluslararası İlişkiler ve Politika Araştırmaları',
      subtitle: 'Diplomasi, güvenlik ve küresel trendler odağında çalışmalar',
      description:
        'Küresel güç dengeleri, bölgesel işbirlikleri ve insani diplomasi başlıklarında veri temelli araştırmalar yürütüyor; politika notları ve eğitim programları üretiyoruz.',
      actions: [
        { label: 'Programları İncele', href: 'dusunce-enstitusu/uluslararasi-iliskiler' },
        { label: 'İşbirliği Başlat', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Politika notu', value: '40+', helper: 'Yıllık' },
        { label: 'Bölge dosyası', value: '12', helper: 'Orta Doğu, Afrika, Asya' },
        { label: 'Paydaş', value: '50+', helper: 'Kamu, STK, akademi' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Dış politika ve strateji',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Diplomasi & diyalog', description: 'Barış inşası ve arabuluculuk süreçleri.' },
          { title: 'Güvenlik çalışmaları', description: 'Savunma, hibrit tehditler ve siber güvenlik.' },
          { title: 'Ekonomik ilişkiler', description: 'Ticaret, yatırım ve tedarik zinciri analizleri.' },
          { title: 'Bölgesel entegrasyon', description: 'Bölgesel örgütler ve ortaklık modelleri.' },
          { title: 'İnsani diplomasi', description: 'Göç, mülteci hareketleri ve insani yardım politikaları.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Uygulama ve eğitim hatları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Diplomasi atölyeleri', description: 'Müzakere, protokol ve senaryo çalışmaları.' },
          { title: 'Simülasyonlar', description: 'Model NATO, BM ve bölgesel örgüt simülasyonları.' },
          { title: 'Politika brifingleri', description: 'Karar vericilere yönelik kısa ve uygulanabilir içerikler.' },
          { title: 'Saha raporları', description: 'Bölge uzmanlarıyla yerinde gözlem ve veri toplama.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan içerikler',
        title: 'Rapor ve yayınlar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Bölge analizleri', description: 'Orta Doğu, Afrika ve Asya odaklı stratejik raporlar.' },
          { title: 'Güvenlik bülteni', description: 'Aylık tehdit analizi ve risk değerlendirmeleri.' },
          { title: 'Ekonomi & ticaret dosyası', description: 'Tedarik zinciri, yatırım ve ticaret trendleri.' },
          { title: 'Politika notları', description: 'Hızlı okunur, uygulanabilir öneriler.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Ortak çalışmalar başlatın',
        layout: 'list',
        items: [
          { title: 'Araştırma ortağı olun', description: 'Veri paylaşımı ve ortak saha çalışması.' },
          { title: 'Eğitim talep edin', description: 'Diplomasi ve kriz yönetimi eğitimlerini kurumunuza taşıyın.' },
          { title: 'Politika brifingi alın', description: 'Karar süreçleriniz için hızlı analiz talep edin.' },
        ],
      },
    ],
    cta: {
      title: 'Politika analizi veya eğitim için iletişime geçin',
      description:
        'Uluslararası ilişkiler projeleri, brifingler ve saha araştırmaları için ekibimizle çalışın.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Yayınları Gör', href: 'blog' },
    },
    seo: {
      title: 'Uluslararası İlişkiler | TARF Düşünce Enstitüsü',
      description:
        'Diplomasi, güvenlik, ekonomi ve insani diplomasi alanlarında araştırmalar, politika notları ve eğitim programları.',
    },
  },
  {
    slug: 'dusunce-enstitusu/cevre-iklim-doga',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Çevre, İklim ve Doğa Araştırmaları',
      subtitle: 'Sürdürülebilir gelecek için veri ve çözüm üretiyoruz',
      description:
        'İklim krizi, enerji dönüşümü, biyolojik çeşitlilik ve doğa temelli çözümler üzerine araştırmalar yürütüyor; kurumlara uyarlanabilir programlar tasarlıyoruz.',
      actions: [
        { label: 'Programları İncele', href: 'dusunce-enstitusu/cevre-iklim-doga' },
        { label: 'Ortak Proje Başlat', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'İklim projesi', value: '25', helper: 'Pilot & saha' },
        { label: 'Veri seti', value: '60+', helper: 'Açık ve şeffaf' },
        { label: 'Paydaş', value: '40+', helper: 'Belediye, STK, özel sektör' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Sürdürülebilirlik eksenli başlıklar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'İklim politikaları', description: 'Emisyon azaltımı, uyum ve finansman modelleri.' },
          { title: 'Enerji dönüşümü', description: 'Yenilenebilir enerji ve verimlilik çözümleri.' },
          { title: 'Biyoçeşitlilik', description: 'Ekosistem hizmetleri ve koruma stratejileri.' },
          { title: 'Şehircilik & mobilite', description: 'Yeşil altyapı, ulaşım ve döngüsel ekonomi.' },
          { title: 'Doğa temelli çözümler', description: 'İklim uyumu için ekolojik tasarımlar.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Uygulama ve eğitimler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'İklim aksiyon planı', description: 'Yerel yönetimler için yol haritaları ve eğitimler.' },
          { title: 'Yeşil kampüs programı', description: 'Üniversitelerde sürdürülebilirlik uygulamaları.' },
          { title: 'Enerji verimliliği atölyeleri', description: 'KOBİ ve kurumlar için uygulamalı içerikler.' },
          { title: 'Vatandaş bilimi', description: 'Topluluklarla veri toplama ve izleme projeleri.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan içerikler',
        title: 'Rapor ve veri setleri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'İklim risk haritası', description: 'Bölgesel risk analizi ve önceliklendirme.' },
          { title: 'Enerji dönüşüm raporu', description: 'Sektörel dönüşüm ve yatırım trendleri.' },
          { title: 'Doğa temelli çözümler kataloğu', description: 'Belediyeler için örnek uygulamalar.' },
          { title: 'Karbon ayak izi kılavuzu', description: 'Kurumlar için ölçüm ve azaltım rehberi.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Projelerinize destek alın',
        layout: 'list',
        items: [
          { title: 'Saha araştırması talep edin', description: 'Veri toplama ve analiz süreçlerini bize devredin.' },
          { title: 'Eğitim ve atölye düzenleyin', description: 'Çalışanlar veya öğrenciler için uyarlanmış içerikler.' },
          { title: 'Ortak yayın üretin', description: 'Rapor ve politika notlarını birlikte hazırlayalım.' },
        ],
      },
    ],
    cta: {
      title: 'Sürdürülebilirlik projeleri için iletişime geçin',
      description:
        'İklim, enerji ve doğa projelerinizde araştırma ve uygulama desteği sunabiliriz.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Yayınları Gör', href: 'blog' },
    },
    seo: {
      title: 'Çevre, İklim ve Doğa | TARF Düşünce Enstitüsü',
      description:
        'İklim politikaları, enerji dönüşümü, biyoçeşitlilik ve doğa temelli çözümler üzerine araştırmalar ve programlar.',
    },
  },
  {
    slug: 'dusunce-enstitusu/bilim-teknoloji',
    category: 'dusunce',
    hero: {
      eyebrow: 'Düşünce Enstitüsü',
      title: 'Bilim ve Teknoloji Araştırmaları',
      subtitle: 'Bilimsel gelişmeleri toplum ve ekonomiyle buluşturuyoruz',
      description:
        'Yapay zekâ, veri bilimi, biyoteknoloji ve derin teknoloji alanlarında stratejik analizler yapıyor; teknoloji politikası ve etik çerçeveler geliştiriyoruz.',
      actions: [
        { label: 'Programları İncele', href: 'dusunce-enstitusu/bilim-teknoloji' },
        { label: 'Danışmanlık Talep Et', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Araştırma dosyası', value: '30+', helper: 'Yıllık' },
        { label: 'Teknoloji takımı', value: '10', helper: 'Pilot ve prototip' },
        { label: 'Çalıştay', value: '70+', helper: 'Teknik & etik' },
      ],
    },
    sections: [
      {
        id: 'focus',
        eyebrow: 'Araştırma alanları',
        title: 'Teknoloji ve etik kesişimi',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Yapay zekâ & veri', description: 'Model güvenliği, etik AI ve veri yönetişimi.' },
          { title: 'Siber güvenlik', description: 'Tehdit analizi, koruma ve farkındalık programları.' },
          { title: 'Biyoteknoloji', description: 'Sağlık teknolojileri ve etik değerlendirmeler.' },
          { title: 'Endüstri 4.0', description: 'IoT, otomasyon ve akıllı üretim.' },
          { title: 'Teknoloji politikası', description: 'Regülasyon, standartlar ve toplumsal etki analizleri.' },
        ],
      },
      {
        id: 'programs',
        eyebrow: 'Programlar',
        title: 'Eğitim ve uygulama',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Teknoloji politikası atölyesi', description: 'Regülasyon ve etik çerçeveler üzerine senaryolar.' },
          { title: 'AI güvenliği modülleri', description: 'Model güvenliği ve risk yönetimi eğitimleri.' },
          { title: 'Siber güvenlik kampı', description: 'Uygulamalı kırmızı/mavi takım çalışmaları.' },
          { title: 'Derin teknoloji demo day', description: 'Prototip sunumları ve yatırımcı buluşmaları.' },
        ],
      },
      {
        id: 'highlights',
        eyebrow: 'Öne çıkan içerikler',
        title: 'Rapor ve ürünler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'AI etik kılavuzu', description: 'Kurumlar için uygulanabilir prensipler.' },
          { title: 'Siber tehdit görünümü', description: 'Güncel tehdit haritası ve korunma önerileri.' },
          { title: 'Biyoteknoloji dosyası', description: 'Sağlık teknolojilerinde etik ve güvenlik.' },
          { title: 'Teknoloji radar', description: 'Yükselen teknolojiler için kısa özetler.' },
        ],
      },
      {
        id: 'engagement',
        eyebrow: 'Katılım yolları',
        title: 'Teknoloji projelerinizi güçlendirin',
        layout: 'list',
        items: [
          { title: 'Danışmanlık alın', description: 'Teknoloji stratejisi ve etik çerçeve desteği.' },
          { title: 'Eğitim talep edin', description: 'AI güvenliği, siber güvenlik ve veri yönetişimi eğitimleri.' },
          { title: 'Araştırma ortaklığı kurun', description: 'Pilot projeler ve test ortamları oluşturun.' },
        ],
      },
    ],
    cta: {
      title: 'Teknoloji stratejiniz için birlikte çalışalım',
      description:
        'Araştırma, ürünleştirme ve politika tasarımı süreçlerinde uzman ekibimizle yanınızdayız.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Programları Gör', href: 'akademi' },
    },
    seo: {
      title: 'Bilim ve Teknoloji | TARF Düşünce Enstitüsü',
      description:
        'Yapay zekâ, siber güvenlik, biyoteknoloji ve teknoloji politikası alanlarında araştırmalar, eğitimler ve danışmanlık.',
    },
  },
]

const akademiPages: ContentPageDefinition[] = [
  {
    slug: 'akademi',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'Bilimsel düşünmeyi ve üretimi besleyen akademi',
      subtitle: 'Merak eden, araştıran ve çözüm üreten gençlik yetiştiriyoruz',
      description:
        'Bilimsel içerikler, okuma listeleri, araştırma görevleri, ders videoları ve proje tabanlı eğitim modeli ile öğrencileri geleceğin becerileriyle donatıyoruz.',
      actions: [
        { label: 'Programları Keşfet', href: 'akademi' },
        { label: 'Başvuru Yap', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aktif modül', value: '32', helper: 'Bilim & teknoloji' },
        { label: 'Mentor', value: '110', helper: 'Akademisyen ve mühendis' },
        { label: 'Mezun', value: '5.400', helper: 'Program mezunu' },
      ],
    },
    sections: [
      {
        id: 'purpose',
        eyebrow: 'Varlık sebebi',
        title: 'Misyon, vizyon ve amaçlarımız',
        layout: 'grid',
        columns: 2,
        items: [
          {
            title: 'Misyon',
            description:
              'TARF Akademi; lisans öğrencilerinin akademik bilgi birikimlerini güçlendirmeyi, alanlarının etik ve ahlaki ilkeleriyle donatılmış, kişisel gelişimini önemseyen, toplumsal sorumluluk bilinci yüksek bireyler yetiştirmeyi amaçlayan bir eğitim ve gelişim platformudur.',
          },
          {
            title: 'Vizyon',
            description:
              'Bilimsel yetkinliği güçlü, karakteri sağlam, değer odaklı ve profesyonel dünyada etkili bir duruş sergileyen gençler yetiştirerek Türkiye’nin akademik, entelektüel ve toplumsal gelişimine öncülük eden örnek bir akademi modeli oluşturmak.',
          },
          {
            title: 'Amaçlar',
            bullets: [
              'Öğrencilerin alanlarının etik ve ahlaki ilkelerini güçlü bir şekilde öğrenmelerini sağlamak.',
              'Gençlere geleceğe yönelik sağlam bir kariyer yapılanması kazandırmak.',
              'Öğrencilerin profesyonel dünyada ihtiyaç duyacağı güçlü bir network ağı oluşturmak.',
              'Akademik becerileri destekleyen kişisel gelişim eğitimleri sunmak.',
              'Disiplinler arası bakış açısı kazandırarak farkındalığı yüksek bir akademik kimlik geliştirmek.',
              'Gençlerin toplumsal sorumluluk bilinciyle hareket eden değer odaklı bireyler olarak yetişmesine katkı sağlamak.',
            ],
          },
        ],
      },
      {
        id: 'modules',
        eyebrow: 'Akademi modülleri',
        title: 'Öğrenme yolculuğunu oluşturan içerikler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Bilimsel içerikler', description: 'Özel hazırlanmış ders notları, okuma listeleri ve vaka analizleri.' },
          { title: 'Araştırma görevleri', description: 'Saha gözlemleri, veri toplama ve rapor yazma ödevleri.' },
          { title: 'Ders videoları', description: 'Stüdyo kalitesinde kayıtlarla desteklenen on-demand içerikler.' },
          { title: 'Proje tabanlı eğitim', description: 'Her modül sonunda ekiplerce geliştirilen gerçek projeler.' },
        ],
      },
      {
        id: 'tracks',
        eyebrow: 'Program türleri',
        title: 'Beş ana program hattı',
        description: 'Her hat için detaylı sayfalar oluşturarak öğrencilerin doğru yolculuğu seçmesini kolaylaştırdık.',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Eğitimler (Lisans)', description: 'Üniversite eğitimini destekleyen teknik ve sosyal modüller.' },
          { title: 'Seminerler', description: 'Alanında uzman isimlerle düzenli buluşmalar.' },
          { title: 'Konferanslar', description: 'Ulusal ve uluslararası çapta düzenlenen büyük buluşmalar.' },
          { title: 'Çalıştaylar', description: 'Uygulamalı ve kısa süreli beceri geliştirme oturumları.' },
          { title: 'Sertifika Programları', description: 'Uluslararası akreditasyonlu kapsamlı eğitim serileri.' },
        ],
      },
      {
        id: 'approach',
        eyebrow: 'Eğitim yaklaşımı',
        title: 'Sınıfın ötesine geçen öğrenme',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Proje tabanlı öğrenme', description: 'Her öğrenci gelişim sürecini gerçek ürünlerle kanıtlar.' },
          { title: 'Mentorluk sistemi', description: 'Sektör profesyonelleri ile birebir eşleşmeler.' },
          { title: 'Online + offline', description: 'Karma öğrenme modeli ile erişilebilirlik.' },
          { title: 'Kariyer desteği', description: 'CV, portfolyo, demo day ve işe yerleşme koçluğu.' },
        ],
      },
      {
        id: 'stories',
        eyebrow: 'Başarı hikayeleri',
        title: 'Öğrencilerimizin dönüşümü',
        layout: 'list',
        items: [
          { title: 'Teknoloji girişimleri', description: 'Akademi projelerinden doğan start-up hikayeleri.' },
          { title: 'Uluslararası yarışmalar', description: 'Konferans ve takımlarda kazanılan ödüller.' },
          { title: 'Toplumsal etki', description: 'Sosyal fayda projelerinin sahadaki sonuçları.' },
        ],
      },
    ],
    cta: {
      title: 'Akademi yolculuğuna katıl',
      description:
        'Seviyenize uygun programı seçin, danışmanlarımızla görüşerek kişisel öğrenme planınızı oluşturun.',
      primaryAction: { label: 'Başvuruyu Başlat', href: 'contact' },
      secondaryAction: { label: 'Program Kataloğu', href: 'services' },
    },
    seo: {
      title: 'TARF Akademi | Bilimsel Düşünme ve Üretim Programları',
      description:
        'Bilimsel içerikler, seminerler, konferanslar ve sertifika programlarıyla TARF Akademi hakkında detaylı bilgi alın.',
    },
  },
  {
    slug: 'akademi/egitimler',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'Lisans Düzeyi Eğitim Programları',
      subtitle: 'Üniversite eğitiminizi destekleyen derinlikli programlar',
      description:
        'Teknoloji, bilim ve sosyal bilimler alanlarında yapılandırılmış dersler, yoğun mentor desteği ve proje teslimleri sunuyoruz.',
      actions: [
        { label: 'Program Listesi', href: 'akademi/egitimler' },
        { label: 'Danışmanla Görüş', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Program süresi', value: '8-20 hafta', helper: 'Modüler yapılar' },
        { label: 'Katılımcı', value: '1.800+', helper: 'Lisans öğrencisi' },
        { label: 'İşe yerleşme', value: '%78', helper: 'Program sonrası' },
      ],
    },
    sections: [
      {
        id: 'tracks',
        eyebrow: 'Program listesi',
        title: 'Teknoloji, bilim ve sosyal bilimler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Yazılım Geliştirme Fundamentals', description: 'HTML, CSS, JS temelleri + modern frameworkler.' },
          { title: 'Web Teknolojileri', description: 'Front-end mimarileri, performans optimizasyonu.' },
          { title: 'Mobil Uygulama', description: 'React Native ve Flutter ile proje geliştirme.' },
          { title: 'Veri Bilimi & Analitik', description: 'Python, veri temizleme, görselleştirme, ML temelleri.' },
          { title: 'Yapay Zeka Temelleri', description: 'Model mantığı, etik yaklaşımlar ve uygulamalar.' },
          { title: 'Araştırma Metodolojisi', description: 'Bilimsel yazım, istatistik ve veri doğrulama.' },
          { title: 'Sosyoloji & Psikoloji', description: 'Toplumsal analiz ve insan davranışı.' },
          { title: 'Felsefe & Düşünce Tarihi', description: 'İrfan perspektifi ile düşünsel derinlik.' },
        ],
      },
      {
        id: 'format',
        eyebrow: 'Öğrenme formatı',
        title: 'Hibrit deneyim',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Canlı dersler', description: 'Uzman eğitmenlerle interaktif oturumlar.' },
          { title: 'Video içerikler', description: 'Dilediğiniz zaman erişebileceğiniz kayıtlar.' },
          { title: 'Ödev & projeler', description: 'Gerçek ürünler ve kod incelemeleri.' },
          { title: 'Mentor saatleri', description: 'Kişisel geri bildirimler ve kariyer yönlendirmesi.' },
        ],
      },
      {
        id: 'pricing',
        eyebrow: 'Ücretlendirme & kayıt',
        title: 'Erişilebilir paketler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Burs olanakları', description: 'Başarı ve ihtiyaç temelli burs kontenjanları.' },
          { title: 'Taksit seçenekleri', description: 'Ödeme kolaylığı sunan finans planları.' },
          { title: 'Kurumsal paket', description: 'Şirketler için toplu kayıt ve özel raporlama.' },
          { title: 'Kayıt süreci', description: 'Başvuru formu, seviye analizi ve oryantasyon.' },
        ],
      },
    ],
    cta: {
      title: 'Program danışmanından randevu al',
      description:
        'Seviyenizi belirlemek ve doğru modülü seçmek için akademi danışmanlarımızla görüşün.',
      primaryAction: { label: 'Randevu Planla', href: 'contact' },
      secondaryAction: { label: 'Müfredatı Gör', href: 'akademi' },
    },
    seo: {
      title: 'Lisans Düzeyi Eğitimler | TARF Akademi',
      description:
        'Yazılım, bilim ve sosyal bilimlerde lisans seviyesinde derinlikli eğitim programları.',
    },
  },
  {
    slug: 'akademi/seminerler',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'Uzman Seminerleri',
      subtitle: 'Alanında uzman isimlerden öğrenin',
      description:
        'Teknoloji, bilim, girişimcilik ve değerler ekseninde düzenli seminer serileriyle öğrencilerimizi ilham veren isimlerle buluşturuyoruz.',
      actions: [
        { label: 'Yaklaşan Seminerler', href: 'akademi/seminerler' },
        { label: 'Bildirim Al', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Yıllık seminer', value: '60+', helper: 'Çevrimiçi + fiziksel' },
        { label: 'Konuşmacı', value: '120', helper: 'Akademi & sektör' },
        { label: 'Katılımcı', value: '8.500', helper: 'Toplam' },
      ],
    },
    sections: [
      {
        id: 'upcoming',
        eyebrow: 'Takvim',
        title: 'Yaklaşan seminerler',
        layout: 'list',
        items: [
          { title: 'Teknoloji ve Yazılım', description: 'Yeni nesil frameworkler, mimariler ve trendler.' },
          { title: 'Bilim ve Araştırma', description: 'Veri bilimi, yapay zekâ ve bilimsel yöntem seminerleri.' },
          { title: 'Kariyer ve Girişimcilik', description: 'İşe alım süreçleri, girişim hikayeleri ve yatırım tüyoları.' },
          { title: 'Kişisel Gelişim', description: 'İletişim, liderlik ve üretkenlik içerikleri.' },
        ],
      },
      {
        id: 'archive',
        eyebrow: 'Arşiv',
        title: 'Geçmiş seminer kayıtları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Video arşivi', description: 'Kayıttan izleme imkanı ile tüm seminerler.' },
          { title: 'Okuma paketleri', description: 'Seminerlerde paylaşılan makale ve sunumlar.' },
          { title: 'Podcast özetleri', description: 'Konuşmacılarla yapılan kısa podcast serileri.' },
          { title: 'Topluluk forumu', description: 'Seminer sonrası tartışma ve soru-cevap.' },
        ],
      },
      {
        id: 'speakers',
        eyebrow: 'Konuşmacılar',
        title: 'Uzman profilleri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Akademisyenler', description: 'Üniversitelerden güçlü araştırmacılar.' },
          { title: 'Sektör liderleri', description: 'Teknoloji şirketlerinden C-level yöneticiler.' },
          { title: 'Girişimciler', description: 'Başarılı start-up kurucuları.' },
          { title: 'Mentorlar', description: 'Topluluk içinden yetişmiş uzmanlar.' },
        ],
      },
    ],
    cta: {
      title: 'Seminer bültenine kaydol',
      description:
        'Yeni seminer ve konuşmacılardan haberdar olmak için e-posta listemize katılın.',
      primaryAction: { label: 'Bültene Katıl', href: 'contact' },
      secondaryAction: { label: 'Geçmiş Kayıtlar', href: 'videos' },
    },
    seo: {
      title: 'TARF Seminerleri | Teknoloji ve Bilim Konuşmaları',
      description:
        'Teknoloji, bilim, kariyer ve girişimcilik seminerleri takvimi ve arşiv kayıtları.',
    },
  },
  {
    slug: 'akademi/konferanslar',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'TARF Konferansları',
      subtitle: 'Teknoloji, bilim, kültür, yapay zekâ ve dijitalleşme buluşmaları',
      description:
        'Türkiye’nin önde gelen isimlerini konuşmacı olarak ağırladığımız konferanslarda öğrenciler projelerini sunuyor, yeni fikirler doğuyor.',
      actions: [
        { label: 'Konferans Takvimi', href: 'akademi/konferanslar' },
        { label: 'Konuşmacı Ol', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Yıllık konferans', value: '4', helper: 'Ana etkinlik' },
        { label: 'Katılımcı', value: '6.000+', helper: 'Yerinde + online' },
        { label: 'Projeler', value: '120', helper: 'Öğrenci sunumu' },
      ],
    },
    sections: [
      {
        id: 'features',
        eyebrow: 'Öne çıkan özellikler',
        title: 'Konferans deneyimi',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Türkiye’nin önde gelen isimleri', description: 'Bilim insanları, girişimciler, sanatçılar.' },
          { title: 'Öğrenci sunumları', description: 'Gençlerin projelerini sahnede anlattığı oturumlar.' },
          { title: 'İlham veren oturumlar', description: 'Panel, keynote ve fireside gibi farklı formatlar.' },
          { title: 'Akademi-sanayi işbirliği', description: 'Kurumsal ortaklarla eşleştirme oturumları.' },
        ],
      },
      {
        id: 'program',
        eyebrow: 'Program',
        title: 'Oturum akışı',
        layout: 'timeline',
        items: [
          { title: 'Açılış & vizyon konuşması', description: 'Kurucu ekip ve özel konuklar yılın temasını anlatır.' },
          { title: 'Panel serileri', description: 'Teknoloji, bilim, kültür ve girişimcilik panelleri.' },
          { title: 'Workshop alanı', description: 'Katılımcılar kısa uygulamalı oturumlara katılır.' },
          { title: 'Ödül ve kapanış', description: 'Projeler ödüllendirilir, işbirliği çağrıları yapılır.' },
        ],
      },
      {
        id: 'partners',
        eyebrow: 'İş ortakları',
        title: 'Sponsor ve destekçiler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Teknoloji firmaları', description: 'Yeni ürün lansmanları ve demo alanları.' },
          { title: 'Üniversiteler', description: 'Akademik tanıtım alanları ve öğrenci kabul desteği.' },
          { title: 'STK ve kamu', description: 'Toplumsal fayda projeleri için işbirlikleri.' },
          { title: 'Medya partnerleri', description: 'Canlı yayın ve basın görünürlüğü.' },
        ],
      },
    ],
    cta: {
      title: 'Konferans sponsorluğu veya konuşmacı başvurusu yapın',
      description:
        'Konferanslarımızda sahne almak veya sponsorluk seçeneklerini konuşmak için bize ulaşın.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Geçmiş Konferanslar', href: 'videos' },
    },
    seo: {
      title: 'TARF Konferansları | Teknoloji ve Bilim Etkinlikleri',
      description:
        'Konferans programı, konuşmacılar, sponsorlar ve öğrenci projeleri hakkında bilgi alın.',
    },
  },
  {
    slug: 'akademi/calistaylar',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'Uygulamalı Çalıştaylar',
      subtitle: 'Öğrendiğinizi pratik yapın',
      description:
        'Kodlama, tasarım, inovasyon ve kişisel gelişim odaklı kısa süreli yoğun workshop serileri sunuyoruz.',
      actions: [
        { label: 'Takvimi Gör', href: 'akademi/calistaylar' },
        { label: 'Çalıştay Düzenle', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Yıllık çalıştay', value: '90', helper: 'Teknik + yaratıcı' },
        { label: 'Katılımcı', value: '2.700', helper: 'Mikro öğrenme' },
        { label: 'Mentor', value: '65', helper: 'Usta eğitmen' },
      ],
    },
    sections: [
      {
        id: 'types',
        eyebrow: 'Çalıştay türleri',
        title: 'Teknik, yaratıcı ve kişisel gelişim',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kod atölyeleri', description: 'Hackathon hazırlığı, API geliştirme, test otomasyonu.' },
          { title: 'Maker workshop', description: 'Arduino, robotik, 3D baskı uygulamaları.' },
          { title: 'Design thinking', description: 'Problem çözme ve prototip sprintleri.' },
          { title: 'İnovasyon atölyeleri', description: 'Ürün fikirlerini tasarlama ve test etme.' },
          { title: 'Sunum & iletişim', description: 'Pitch hazırlığı, hikaye anlatıcılığı.' },
          { title: 'Takım çalışması', description: 'Agile ritüeller, iş bölümü ve liderlik.' },
        ],
      },
      {
        id: 'workflow',
        eyebrow: 'Katılım süreci',
        title: 'Kayıt ve seçim',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Başvuru formu', description: 'İlgi alanı ve hedef belirten kısa form.' },
          { title: 'Seviye değerlendirmesi', description: 'Temel bilgi ve motivasyon testi.' },
          { title: 'Oturum planı', description: 'Katılımcılara özel program gönderilir.' },
          { title: 'Demo day', description: 'Üretimler ortak sunumla paylaşılır.' },
        ],
      },
      {
        id: 'gallery',
        eyebrow: 'Deneyim',
        title: 'Çalıştaydan kareler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Foto & video', description: 'Geçmiş etkinliklerden ilham verici görüntüler.' },
          { title: 'Katılımcı hikayeleri', description: 'Yorumlar, reels videoları ve sosyal medya paylaşımları.' },
          { title: 'Araç setleri', description: 'Çalıştay sonrası verilen template ve araç listeleri.' },
          { title: 'Takip programları', description: 'Çalıştay sonrası mentorluk seçenekleri.' },
        ],
      },
    ],
    cta: {
      title: 'Çalıştay düzenlemek veya katılmak için bize yazın',
      description:
        'Teknik veya yaratıcı çalıştay taleplerinizi paylaşın, birlikte planlayalım.',
      primaryAction: { label: 'Talepleri İlet', href: 'contact' },
      secondaryAction: { label: 'Geçmiş Projeler', href: 'events' },
    },
    seo: {
      title: 'Çalıştay Programları | TARF Akademi',
      description:
        'Kod, inovasyon ve kişisel gelişim çalıştayları hakkında detaylar ve kayıt süreci.',
    },
  },
  {
    slug: 'akademi/sertifika-programlari',
    category: 'akademi',
    hero: {
      eyebrow: 'Akademi',
      title: 'Sertifika Programları',
      subtitle: 'Uluslararası geçerliliği olan sertifikalar',
      description:
        'Yazılım, yapay zekâ, veri bilimi ve teknoloji temelli kişisel gelişim alanlarında kariyerinizi güçlendiren sertifika serileri sunuyoruz.',
      actions: [
        { label: 'Programları Gör', href: 'akademi/sertifika-programlari' },
        { label: 'Danışmanla Konuş', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Program sayısı', value: '14', helper: 'Yetkinlik odaklı' },
        { label: 'Uluslararası onay', value: '6', helper: 'Akreditasyon' },
        { label: 'Dijital rozet', value: '100%', helper: 'Paylaşılabilir sertifika' },
      ],
    },
    sections: [
      {
        id: 'programs',
        eyebrow: 'Program listesi',
        title: 'Sertifika başlıkları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Yazılım sertifikaları', description: 'Full-stack, front-end ve backend odaklı izler.' },
          { title: 'Yapay zekâ', description: 'ML ops, veri hazırlama ve etik yapay zekâ.' },
          { title: 'Veri bilimi', description: 'Python, SQL ve görselleştirme modülleri.' },
          { title: 'Kişisel gelişim', description: 'Teknoloji temelli liderlik ve iletişim.' },
          { title: 'Proje tamamlama', description: 'Capstone projeleri ve jüri sunumları.' },
        ],
      },
      {
        id: 'features',
        eyebrow: 'Program özellikleri',
        title: 'Sertifika deneyimi',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Uluslararası geçerlilik', description: 'Akredite kurumlarla yapılan anlaşmalar.' },
          { title: 'Dijital doğrulama', description: 'Blockchain tabanlı sertifika doğrulama linkleri.' },
          { title: 'LinkedIn entegrasyonu', description: 'Tek tıkla profilinize eklenir.' },
          { title: 'Portfolio değeri', description: 'Sertifika ile ilişkili proje ve case study gerekliliği.' },
        ],
      },
      {
        id: 'apply',
        eyebrow: 'Başvuru süreci',
        title: 'Kayıt adımları',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Ön başvuru', description: 'Kısa motivasyon formu ve CV yükleme.' },
          { title: 'Teknik değerlendirme', description: 'Gerekli ise seviye testi.' },
          { title: 'Mentor görüşmesi', description: 'Program uyumunu birlikte değerlendiririz.' },
          { title: 'Ödeme & başlangıç', description: 'Taksit veya sponsorluk seçenekleri.' },
        ],
      },
    ],
    cta: {
      title: 'Sertifika yolculuğunuzu planlayalım',
      description:
        'Kariyer hedeflerinize uygun sertifika paketini oluşturmak için danışmanlarımızla görüşün.',
      primaryAction: { label: 'Planlama Çağrısı', href: 'contact' },
      secondaryAction: { label: 'Referans Hikayeleri', href: 'blog' },
    },
    seo: {
      title: 'Sertifika Programları | TARF Akademi',
      description:
        'Yazılım ve teknoloji odaklı uluslararası sertifika programları hakkında bilgi alın.',
    },
  },
]

const yazilimPages: ContentPageDefinition[] = [
  {
    slug: 'yazilim',
    category: 'yazilim',
    hero: {
      eyebrow: 'Yazılım Teknolojileri',
      title: 'TARF Yazılım Teknolojileri',
      subtitle: 'Dünya standartlarında teknik beceriler ve üretim yapan yazılım kültürü',
      description:
        'Mobil uygulamalardan yapay zekâya uzanan yazılım eğitimleri, danışmanlık projeleri ve teknoloji stack’leri ile gençleri üretime hazırlıyoruz.',
      actions: [
        { label: 'Programlara Göz At', href: 'yazilim' },
        { label: 'Danışmanlık Talep Et', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aktif proje', value: '55', helper: 'Öğrenci + kurumsal' },
        { label: 'Stack', value: '25+', helper: 'Teknoloji' },
        { label: 'Mentor', value: '70', helper: 'Kıdemli geliştirici' },
      ],
    },
    sections: [
      {
        id: 'domains',
        eyebrow: 'Teknoloji alanları',
        title: 'Uzmanlık başlıklarımız',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Mobil geliştirme', description: 'React Native, Flutter, SwiftUI projeleri.' },
          { title: 'Web teknolojileri', description: 'Next.js, Vue, Remix ve performans optimizasyonu.' },
          { title: 'Yapay zekâ', description: 'ML pipeline, veri hazırlama ve etik yapay zekâ.' },
          { title: 'Oyun geliştirme', description: 'Unity, Unreal ve indie oyun stüdyoları.' },
          { title: 'Veri bilimi', description: 'ETL süreçleri, veri ambarı ve BI araçları.' },
          { title: 'Siber güvenlik', description: 'UYUMLU kodlama, saldırı simülasyonları ve audit.' },
        ],
      },
      {
        id: 'services',
        eyebrow: 'Ana hizmetler',
        title: 'Eğitim + danışmanlık + üretim',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Yazılım Geliştirme', description: 'Öğrenci ve profesyonel ekiplerle proje geliştirme.' },
          { title: 'Teknoloji Danışmanlığı', description: 'Strateji, mimari ve süreç tasarımı.' },
          { title: 'Siber Güvenlik', description: 'Sızma testi, güvenlik eğitimleri ve DevSecOps programları.' },
        ],
      },
      {
        id: 'stack',
        eyebrow: 'Teknoloji stack',
        title: 'Kullandığımız araçlar',
        layout: 'grid',
        columns: 3,
        items: [
          { title: 'Frontend', description: 'React, Next.js, Vue, Tailwind, Radix.' },
          { title: 'Backend', description: 'Node.js, NestJS, Laravel, Python FastAPI.' },
          { title: 'Mobil', description: 'React Native, Flutter, Swift, Kotlin.' },
          { title: 'AI/ML', description: 'TensorFlow, PyTorch, HuggingFace.' },
          { title: 'Cloud', description: 'AWS, Azure, GCP, Terraform.' },
          { title: 'DevOps', description: 'Docker, Kubernetes, GitHub Actions.' },
        ],
      },
      {
        id: 'education',
        eyebrow: 'Eğitim programları',
        title: 'Bootcamp ve mentorluk',
        layout: 'list',
        items: [
          { title: 'Bootcamp serileri', description: '8-12 haftalık yoğun eğitimler.' },
          { title: 'Online kurslar', description: 'Kendi hızınızda tamamlanabilir modüller.' },
          { title: 'Mentor eşleşmesi', description: 'Gerçek projelerde eşlik eden senior developerlar.' },
        ],
      },
    ],
    cta: {
      title: 'Yazılım üretim yolculuğuna başla',
      description:
        'Teknik kariyer hedeflerinizi bizimle paylaşın, size özel program veya danışmanlık paketini planlayalım.',
      primaryAction: { label: 'İletişim Kur', href: 'contact' },
      secondaryAction: { label: 'Projeleri Gör', href: 'events' },
    },
    seo: {
      title: 'TARF Yazılım Teknolojileri | Eğitim ve Projeler',
      description:
        'Mobil, web, yapay zekâ ve siber güvenlik alanlarındaki yazılım programları ve projeleri inceleyin.',
    },
  },
  {
    slug: 'yazilim/gelistirme',
    category: 'yazilim',
    hero: {
      eyebrow: 'Yazılım Teknolojileri',
      title: 'Yazılım Geliştirme Eğitimleri',
      subtitle: 'Sıfırdan profesyonel developer’a uzanan yolculuk',
      description:
        'Frontend, backend, full stack ve mobil geliştirme izleriyle öğrencileri gerçek projeler ve kod incelemeleriyle yetiştiriyoruz.',
      actions: [
        { label: 'Programları Keşfet', href: 'yazilim/gelistirme' },
        { label: 'GitHub İncelemesi', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Yıllık bootcamp', value: '10', helper: 'Özel cohort' },
        { label: 'Proje sayısı', value: '140+', helper: 'Capstone' },
        { label: 'Yerleştirme', value: '%82', helper: 'İşe giriş' },
      ],
    },
    sections: [
      {
        id: 'tracks',
        eyebrow: 'Eğitim izleri',
        title: 'Frontend, backend, full stack, mobil',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Frontend Development', description: 'React/Vue, Next.js/Nuxt, responsive design.' },
          { title: 'Backend Development', description: 'Node.js, Laravel, REST & GraphQL, database tasarımı.' },
          { title: 'Full Stack', description: 'Frontend + backend + DevOps temelleri.' },
          { title: 'Mobile Development', description: 'React Native, Flutter, native modüller.' },
        ],
      },
      {
        id: 'method',
        eyebrow: 'Öğrenme yöntemi',
        title: 'Hands-on üretim',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Proje bazlı sprint', description: 'Her sprintte deploy edilen ürünler.' },
          { title: 'Code review', description: 'Senior mentorlar düzenli kod incelemesi yapar.' },
          { title: 'Pair programming', description: 'Ekip çalışması kültürü kazandırır.' },
          { title: 'Git workflow', description: 'Branch stratejileri, CI/CD entegrasyonu.' },
        ],
      },
      {
        id: 'projects',
        eyebrow: 'Örnek projeler',
        title: 'Gerçek ürün deneyimi',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'E-ticaret platformu', description: 'Ödeme entegrasyonu, stok yönetimi.' },
          { title: 'Sosyal medya uygulaması', description: 'Gerçek zamanlı akış ve bildirimler.' },
          { title: 'Görev yönetim sistemi', description: 'Kanban, izinler ve entegrasyonlar.' },
          { title: 'Portfolio showcase', description: 'Kişisel site + case study hazırlığı.' },
        ],
      },
      {
        id: 'career',
        eyebrow: 'Kariyer desteği',
        title: 'İşe yerleşme yolculuğu',
        layout: 'list',
        items: [
          { title: 'CV & LinkedIn', description: 'Teknik CV düzenlemeleri ve profil optimizasyonu.' },
          { title: 'Mock interview', description: 'Teknik ve davranışsal mülakat provaları.' },
          { title: 'Staj & iş ortakları', description: 'Partner şirketlerde staj ve junior pozisyonlar.' },
        ],
      },
    ],
    cta: {
      title: 'Bootcamp’e katılmak için hemen başvur',
      description:
        'Seviyenize göre uygun cohort’u seçelim, kayıt sürecini başlatalım.',
      primaryAction: { label: 'Başvuru Yap', href: 'contact' },
      secondaryAction: { label: 'Müfredat PDF', href: 'yazilim' },
    },
    seo: {
      title: 'Yazılım Geliştirme Bootcamp | TARF Yazılım',
      description:
        'Frontend, backend ve mobil geliştirme eğitimleriyle kariyerinizi hızlandırın.',
    },
  },
  {
    slug: 'yazilim/danismanlik',
    category: 'yazilim',
    hero: {
      eyebrow: 'Yazılım Teknolojileri',
      title: 'Teknoloji Danışmanlığı',
      subtitle: 'Strateji, mimari ve dönüşüm yolculukları',
      description:
        'Kurumsal ekipler için teknoloji yol haritası, mimari tasarım, DevOps ve kapasite geliştirme danışmanlığı sunuyoruz.',
      actions: [
        { label: 'Danışmanlık Paketleri', href: 'yazilim/danismanlik' },
        { label: 'Ücretsiz Görüşme', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Kurumsal müşteri', value: '24', helper: 'Sürdürülen proje' },
        { label: 'Danışman', value: '18', helper: 'Kıdemli uzman' },
        { label: 'ROI artışı', value: '%32', helper: 'Ortalama iyileşme' },
      ],
    },
    sections: [
      {
        id: 'services',
        eyebrow: 'Hizmet başlıkları',
        title: 'Analizden uygulamaya',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Dijital dönüşüm stratejisi', description: 'BT yol haritası, süreç dijitalizasyonu.' },
          { title: 'Mimari tasarım', description: 'Mikro servis, event-driven ve güvenlik mimarileri.' },
          { title: 'DevOps & cloud', description: 'CI/CD kurulumları, cloud migration, IaC.' },
          { title: 'Teknoloji eğitimleri', description: 'Kurumsal eğitim programları, teknoloji sohbetleri.' },
        ],
      },
      {
        id: 'process',
        eyebrow: 'Çalışma süreci',
        title: 'Şeffaf danışmanlık modeli',
        layout: 'timeline',
        items: [
          { title: 'Keşif ve analiz', description: 'İhtiyaç analizi, mevcut durum fotoğrafı.' },
          { title: 'Strateji geliştirme', description: 'Hedef mimari ve yol haritası.' },
          { title: 'Uygulama planı', description: 'Sprint tabanlı uygulama ve ölçüm KPI’ları.' },
          { title: 'Sürekli optimizasyon', description: 'Periyodik değerlendirme ve destek.' },
        ],
      },
      {
        id: 'sectors',
        eyebrow: 'Deneyim alanları',
        title: 'Çalıştığımız sektörler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Eğitim & EdTech', description: 'Öğrenme platformları ve içerik yönetimi.' },
          { title: 'E-ticaret', description: 'Çok kanallı satış, envanter ve lojistik.' },
          { title: 'Fintech', description: 'Ödeme sistemleri, regülasyon uyumu.' },
          { title: 'Sağlık', description: 'Tele sağlık, veri güvenliği.' },
          { title: 'Start-up ekosistemi', description: 'MVP geliştirme, ölçekleme.' },
        ],
      },
    ],
    cta: {
      title: 'Ücretsiz danışmanlık görüşmesi planlayın',
      description:
        'Teknoloji dönüşümünüz için birlikte değerlendirme yapalım, yol haritanızı çıkaralım.',
      primaryAction: { label: 'Görüşme Planla', href: 'contact' },
      secondaryAction: { label: 'Başarı Hikayeleri', href: 'blog' },
    },
    seo: {
      title: 'Teknoloji Danışmanlığı | TARF Yazılım',
      description:
        'Strateji, mimari ve DevOps alanlarında danışmanlık hizmetleri.',
    },
  },
  {
    slug: 'yazilim/siber-guvenlik',
    category: 'yazilim',
    hero: {
      eyebrow: 'Yazılım Teknolojileri',
      title: 'Siber Güvenlik Eğitimi ve Hizmetleri',
      subtitle: 'Dijital varlıklarınızı koruyun',
      description:
        'Siber güvenlik temellerinden etik hacking’e, güvenli yazılımdan olay müdahalesine kadar kapsamlı eğitim ve danışmanlık sunuyoruz.',
      actions: [
        { label: 'Eğitim Kataloğu', href: 'yazilim/siber-guvenlik' },
        { label: 'Pen Test Talebi', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Eğitim mezunu', value: '650+', helper: 'Siber güvenlik' },
        { label: 'Tespit edilen açık', value: '1.300+', helper: 'Pen test raporları' },
        { label: 'Sertifika başarısı', value: '%88', helper: 'CEH/S+ geçme oranı' },
      ],
    },
    sections: [
      {
        id: 'programs',
        eyebrow: 'Eğitim programları',
        title: 'Siber güvenlik öğrenme izleri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Siber güvenlik temelleri', description: 'Network, kriptografi, threat modeling.' },
          { title: 'Etik hacking', description: 'Pen test, vulnerability assessment, bug bounty.' },
          { title: 'Güvenli yazılım geliştirme', description: 'OWASP Top 10, secure coding, DevSecOps.' },
          { title: 'Lab ortamı', description: 'CTF, sanal lab ve simülasyon platformu.' },
        ],
      },
      {
        id: 'cert',
        eyebrow: 'Sertifikasyon',
        title: 'Uluslararası sınav hazırlığı',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'CEH & OSCP', description: 'Yoğun kamp, senaryo tabanlı pratik.' },
          { title: 'CompTIA Security+', description: 'Temel güvenlik rolleri için içerik.' },
          { title: 'CISSP', description: 'Liderlik ve yönetişim odaklı eğitimler.' },
        ],
      },
      {
        id: 'services',
        eyebrow: 'Hizmetler',
        title: 'Kurumsal güvenlik çözümleri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Penetration testing', description: 'Ağ, uygulama ve mobil testler.' },
          { title: 'Security audit', description: 'Politika, süreç ve konfigürasyon incelemeleri.' },
          { title: 'Incident response', description: 'İhlal durumunda hızlı müdahale planları.' },
          { title: 'DevSecOps entegrasyonu', description: 'CI/CD sürecine güvenlik eklemek.' },
        ],
      },
    ],
    cta: {
      title: 'Siber güvenlik eğitim veya hizmeti talep edin',
      description:
        'Ekiplerinizi eğitelim, sistemlerinizi test edelim ve güvenlik stratejinizi güçlendirelim.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Broşürü İndir', href: 'yazilim' },
    },
    seo: {
      title: 'Siber Güvenlik Eğitimleri ve Hizmetleri | TARF Yazılım',
      description:
        'Siber güvenlik eğitimleri, sertifikasyon hazırlığı ve kurumsal güvenlik hizmetleri.',
    },
  },
]

const kuluplerPages: ContentPageDefinition[] = [
  {
    slug: 'kulupler',
    category: 'kulupler',
    hero: {
      eyebrow: 'Kulüpler & Takımlar',
      title: 'TARF Kulüpler ve Takımları',
      subtitle: 'Takım bilinci, proje yönetimi ve üretim disiplini',
      description:
        'Öğrencilerin gerçek projelerde görev aldığı, yarışmalara katıldığı ve topluluk oluşturduğu kulüpler ve teknoloji takımlarından oluşan canlı bir ekosistem.',
      actions: [
        { label: 'Kulüpleri Keşfet', href: 'kulupler' },
        { label: 'Kulüp Kur', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aktif kulüp', value: '22', helper: 'Teknoloji + kültür' },
        { label: 'Toplam üye', value: '2.100+', helper: 'Öğrenci' },
        { label: 'Proje', value: '160', helper: 'Geliştirilen ürün' },
      ],
    },
    sections: [
      {
        id: 'categories',
        eyebrow: 'Ana kategoriler',
        title: 'Öğrenci kulüpleri ve teknoloji takımları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Öğrenci Kulüpleri', description: 'Teknoloji, bilim, kültür ve girişimcilik kulüpleri.' },
          { title: 'Teknoloji Takımları', description: 'Robotik, AI, oyun geliştirme, AR/VR ve araştırma takımları.' },
        ],
      },
      {
        id: 'work',
        eyebrow: 'Çalışma alanları',
        title: 'Takımların uzmanlık alanları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Robotik', description: 'Mekanik tasarım, elektronik, yarışmalar.' },
          { title: 'Yapay zekâ', description: 'Makine öğrenmesi ve veri bilimi projeleri.' },
          { title: 'Yazılım geliştirme', description: 'Web ve mobil uygulama ekipleri.' },
          { title: 'Oyun geliştirme', description: 'Game jam, indie projeler.' },
          { title: 'AR/VR', description: 'XR deneyimleri ve eğitim simülasyonları.' },
          { title: 'Bilimsel araştırmalar', description: 'Akademik proje ve yayın destekleri.' },
        ],
      },
      {
        id: 'activities',
        eyebrow: 'Etkinlikler',
        title: 'Topluluk deneyimi',
        layout: 'list',
        items: [
          { title: 'Kulüp buluşmaları', description: 'Haftalık toplantılar ve proje sprintleri.' },
          { title: 'Hackathon & yarışmalar', description: 'Takımlar yarışmalara hazırlanır, ödüller kazanır.' },
          { title: 'Proje sunumları', description: 'Demo day ve vitrin etkinlikleri.' },
        ],
      },
    ],
    cta: {
      title: 'Bir kulübe katıl veya yeni kulüp kur',
      description:
        'Topluluk koordinatörlerimiz sizi uygun kulüp veya takımla eşleştirsin.',
      primaryAction: { label: 'Kulübe Katıl', href: 'contact' },
      secondaryAction: { label: 'Takımları Gör', href: 'kulupler/teknoloji-takimlari' },
    },
    seo: {
      title: 'TARF Kulüpler ve Takımları | Topluluk Ekosistemi',
      description:
        'Öğrenci kulüpleri, teknoloji takımları, etkinlikler ve başarılar hakkında bilgi alın.',
    },
  },
  {
    slug: 'kulupler/ogrenci-kulupleri',
    category: 'kulupler',
    hero: {
      eyebrow: 'Kulüpler & Takımlar',
      title: 'TARF Öğrenci Kulüpleri',
      subtitle: 'İlgi alanlarında topluluklar oluştur, arkadaşlıklar kur',
      description:
        'Teknoloji, bilim, kültür ve girişimcilik ekseninde örgütlenen kulüpler öğrencilere üretim ve paylaşım alanı sunar.',
      actions: [
        { label: 'Kulüp Listesi', href: 'kulupler/ogrenci-kulupleri' },
        { label: 'Yeni Kulüp Başvurusu', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Kulüp', value: '22', helper: 'Aktif yapı' },
        { label: 'Üye', value: '1.400', helper: 'Öğrenci' },
        { label: 'Yıllık etkinlik', value: '180', helper: 'Kulüp organizasyonu' },
      ],
    },
    sections: [
      {
        id: 'tech',
        eyebrow: 'Teknoloji kulüpleri',
        title: 'Kod, robotik, AI ve oyun',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Yazılım Kulübü', description: 'Web & mobil projeleri, hack günleri.' },
          { title: 'Robotik Kulübü', description: 'Mekanik tasarım, yarışma hazırlıkları.' },
          { title: 'AI & ML Kulübü', description: 'Veri analizi ve makine öğrenmesi projeleri.' },
          { title: 'Siber Güvenlik Kulübü', description: 'CTF, güvenlik araştırmaları.' },
          { title: 'Game Dev Kulübü', description: 'Game jam, oyun tasarımı.' },
        ],
      },
      {
        id: 'science',
        eyebrow: 'Bilim ve kültür',
        title: 'Bilimsel ve sanatsal kulüpler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Fizik Kulübü', description: 'Deneyler, konferanslar, bilim kampları.' },
          { title: 'Matematik Kulübü', description: 'Problem çözme oturumları.' },
          { title: 'Astronomi Kulübü', description: 'Gözlem geceleri, uzay içerikleri.' },
          { title: 'Fotoğrafçılık & Sinema', description: 'Üretim ekipleri, sergiler.' },
          { title: 'Edebiyat & Müzik', description: 'Okuma grupları, konserler.' },
        ],
      },
      {
        id: 'entrepreneurship',
        eyebrow: 'Girişimcilik',
        title: 'Startup ve sosyal girişim kulüpleri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Startup Kulübü', description: 'İş modeli kampı, yatırımcı görüşmeleri.' },
          { title: 'Sosyal Girişim Kulübü', description: 'Toplumsal etki projeleri.' },
        ],
      },
      {
        id: 'process',
        eyebrow: 'Kulüp kurma',
        title: 'Nasıl kulüp kurulur?',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Başvuru', description: 'Vizyon ve ekip bilgilerini içeren form.' },
          { title: 'Sunum & onay', description: 'Koordinasyon ekibine sunum ve değerlendirme.' },
          { title: 'Mentor eşleşmesi', description: 'Kulübe destek olacak mentor atanır.' },
          { title: 'Oryantasyon', description: 'Kaynaklar, takvim ve araçlar teslim edilir.' },
        ],
      },
    ],
    cta: {
      title: 'Kulübe katıl veya yeni kulüp kur',
      description:
        'Topluluk koordinatörleri doğru kulüp ve mentor ile eşleşmenize yardımcı olur.',
      primaryAction: { label: 'Kulübe Katıl', href: 'contact' },
      secondaryAction: { label: 'Kulüp El Kitabı', href: 'kulupler' },
    },
    seo: {
      title: 'Öğrenci Kulüpleri | TARF Toplulukları',
      description:
        'Teknoloji, bilim, kültür ve girişimcilik kulüplerinin programları ve katılım süreçleri.',
    },
  },
  {
    slug: 'kulupler/teknoloji-takimlari',
    category: 'kulupler',
    hero: {
      eyebrow: 'Kulüpler & Takımlar',
      title: 'TARF Teknoloji Takımları',
      subtitle: 'Gerçek projeler, gerçek sonuçlar',
      description:
        'Robotik, yapay zekâ, web & mobile, oyun, AR/VR ve araştırma takımları Türkiye’nin teknoloji dönüşümüne katkı sağlıyor.',
      actions: [
        { label: 'Takımları Gör', href: 'kulupler/teknoloji-takimlari' },
        { label: 'Takıma Başvur', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Aktif takım', value: '11', helper: 'Farklı alanlarda' },
        { label: 'Üye', value: '700', helper: 'Takım katılımcısı' },
        { label: 'Ödül', value: '36', helper: 'Ulusal/uluslararası' },
      ],
    },
    sections: [
      {
        id: 'teams',
        eyebrow: 'Takımlar',
        title: 'Aktif teknoloji takımları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Robotik Takımı', description: 'Endüstriyel robot kolu, drone ve yarışma projeleri.' },
          { title: 'AI Takımı', description: 'Makine öğrenmesi, veri analizi ve hackathonlar.' },
          { title: 'Web & Mobile', description: 'Çapraz platform uygulamalar, açık kaynak katkıları.' },
          { title: 'Game Development', description: 'Game jam, indie oyun stüdyosu.' },
          { title: 'AR/VR', description: 'Sanal gerçeklik uygulamaları ve deneyim tasarımı.' },
          { title: 'Research Takımı', description: 'Bilimsel araştırmalar, paper yazımı ve konferans sunumları.' },
        ],
      },
      {
        id: 'showcase',
        eyebrow: 'Proje vitrin',
        title: 'Tamamlanan projeler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Otonom araç simülasyonu', description: 'AI takımının ödüllü projesi.' },
          { title: 'Sağlık için yapay zekâ', description: 'Görüntü işleme ile erken teşhis.' },
          { title: 'VR eğitim laboratuvarı', description: 'AR/VR takımının geliştirdiği simülasyon.' },
          { title: 'Robotik yarışma dereceleri', description: 'Ulusal teknofest başarıları.' },
        ],
      },
      {
        id: 'competitions',
        eyebrow: 'Yarışmalar',
        title: 'Katıldığımız platformlar',
        layout: 'list',
        items: [
          { title: 'Teknofest', description: 'Robotik ve AI kategorilerinde finalistlikler.' },
          { title: 'Hackathon serileri', description: 'Bankacılık, sağlık ve mobilite temaları.' },
          { title: 'Game jam etkinlikleri', description: '48 saatlik üretim maratonları.' },
        ],
      },
      {
        id: 'join',
        eyebrow: 'Katılım',
        title: 'Takıma katılma süreci',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Başvuru formu', description: 'Hedef takım ve yetkinlik bilgileri.' },
          { title: 'Teknik görev', description: 'Kısa süreli değerlendirme projesi.' },
          { title: 'Mülakat & eşleşme', description: 'Takım liderleri ile görüşme.' },
          { title: 'Onboarding kampı', description: 'Takım kültürü ve araçların tanıtımı.' },
        ],
      },
    ],
    cta: {
      title: 'Teknoloji takımına katıl',
      description:
        'Yeteneklerinizi gerçek projelerde kullanmak için başvuru formunu doldurun.',
      primaryAction: { label: 'Başvuruyu Başlat', href: 'contact' },
      secondaryAction: { label: 'Proje Portföyü', href: 'events' },
    },
    seo: {
      title: 'Teknoloji Takımları | TARF',
      description:
        'Robotik, AI, oyun ve AR/VR takımlarının projeleri, başarıları ve katılım süreci.',
    },
  },
]

const yayinlarPages: ContentPageDefinition[] = [
  {
    slug: 'dergi',
    category: 'yayinlar',
    hero: {
      eyebrow: 'Yayınlar',
      title: 'TARF Dergi',
      subtitle: 'Teknoloji, bilim, kültür ve akademik düşünceyi buluşturan dijital yayın',
      description:
        'Güncel teknoloji trendleri, bilimsel makaleler, araştırmalar, röportajlar ve öğrenci projelerini kapsayan kapsamlı dijital dergi deneyimi sunuyoruz.',
      actions: [
        { label: 'Son Sayıyı İncele', href: 'dergi' },
        { label: 'Abone Ol', href: 'contact', variant: 'secondary' },
      ],
      stats: [
        { label: 'Yayınlanan sayı', value: '48', helper: 'Tüm edisyonlar' },
        { label: 'Toplam makale', value: '720+', helper: 'Teknoloji & bilim' },
        { label: 'Yazar', value: '95', helper: 'Editör + misafir' },
      ],
    },
    sections: [
      {
        id: 'content',
        eyebrow: 'İçerik türleri',
        title: 'Dergide neler var?',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Teknoloji trendleri', description: 'Yeni frameworkler, yapay zekâ uygulamaları, analizler.' },
          { title: 'Bilimsel makaleler', description: 'Araştırma metodolojisi, keşifler ve akademik yazılar.' },
          { title: 'Yazılım analizleri', description: 'Kod incelemeleri, mimari çözümler, best practice.' },
          { title: 'Röportajlar', description: 'Teknoloji liderleri, girişimciler ve akademisyenlerle söyleşiler.' },
          { title: 'Öğrenci projeleri', description: 'Akademi ve takımlardan gelen case study’ler.' },
        ],
      },
      {
        id: 'issue',
        eyebrow: 'Son sayı',
        title: 'Öne çıkan içerikler',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kapak konusu', description: 'Yapay zekâ ve etik teknoloji üzerine kapsamlı dosya.' },
          { title: 'Editörden', description: 'Gençler için üretim kültürü mesajı.' },
          { title: 'Bu sayıda', description: 'Tema başlıkları, röportajlar ve incelemeler.' },
          { title: 'Okuma süresi', description: 'Her makale için tahmini süre bilgisi.' },
        ],
      },
      {
        id: 'archive',
        eyebrow: 'Arşiv',
        title: 'Tüm sayılar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Dergi kapakları', description: 'Yıl bazlı filtrelenebilir kapak galeris.' },
          { title: 'PDF indirme', description: 'Her sayı için offline erişim seçeneği.' },
          { title: 'Online okuma', description: 'Web tabanlı okuyucu, gece modu.' },
          { title: 'Kategori filtreleri', description: 'Teknoloji, bilim, kültür, girişimcilik, eğitim.' },
        ],
      },
      {
        id: 'authors',
        eyebrow: 'Yazarlar',
        title: 'Editör kadrosu ve katkıda bulunanlar',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Editör kadrosu', description: 'Dergiyi yöneten çekirdek ekip.' },
          { title: 'Düzenli yazarlar', description: 'Teknoloji ve bilim alanında uzman isimler.' },
          { title: 'Misafir yazarlar', description: 'Akademisyenler, girişimciler, öğrenciler.' },
          { title: 'Öğrenci yazarlar', description: 'Akademi öğrencilerinin içerikleri.' },
        ],
      },
      {
        id: 'contribute',
        eyebrow: 'Katkı',
        title: 'Dergiye nasıl katkıda bulunulur?',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Yazar başvurusu', description: 'Örnek yazı ve konu başlığı gönderin.' },
          { title: 'Editöryel süreç', description: 'Değerlendirme, geri bildirim ve revizyon.' },
          { title: 'Yayın & paylaşım', description: 'Makaleniz yayınlandığında sosyal medya desteği.' },
        ],
      },
    ],
    cta: {
      title: 'Dergiye abone olun veya makale gönderin',
      description:
        'Yeni sayılardan haberdar olun, yazılarınızı editör ekibiyle paylaşın.',
      primaryAction: { label: 'Abone Ol', href: 'contact' },
      secondaryAction: { label: 'Makale Gönder', href: 'contact' },
    },
    seo: {
      title: 'TARF Dergi | Teknoloji ve Bilim Yayını',
      description:
        'Teknoloji, bilim, kültür ve girişimcilik içeriklerinin yer aldığı dijital dergiyi keşfedin.',
    },
  },
]

const yasalPages: ContentPageDefinition[] = [
  {
    slug: 'gizlilik-politikasi',
    category: 'yasal',
    hero: {
      eyebrow: 'Yasal',
      title: 'Gizlilik Politikası',
      subtitle: 'Kişisel verilerinizin korunması bizim için önemlidir',
      description:
        'KVKK ve GDPR uyumlu veri işleme süreçleriyle kullanıcı bilgilerinin güvenliğini şeffaf şekilde yönetiyoruz.',
      actions: [
        { label: 'PDF İndir', href: 'gizlilik-politikasi' },
        { label: 'Sorularınızı İletin', href: 'contact', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'toc',
        eyebrow: 'İçindekiler',
        title: 'Politika başlıkları',
        layout: 'list',
        ordered: true,
        items: [
          { title: 'Genel bilgiler', description: 'Politika kapsamı ve yasal dayanak.' },
          { title: 'Toplanan veriler', description: 'Kişisel, teknik ve kullanım verisi kategorileri.' },
          { title: 'Veri kullanım amaçları', description: 'Hizmet sunumu, iletişim, kişiselleştirme.' },
          { title: 'Veri paylaşımı', description: 'Üçüncü taraf hizmet sağlayıcılar ve yasal gereklilikler.' },
          { title: 'Çerezler', description: 'Çerez türleri, yönetim yöntemleri.' },
          { title: 'Veri güvenliği', description: 'Şifreleme, erişim kontrolleri, ihlal prosedürü.' },
          { title: 'Kullanıcı hakları', description: 'Bilgilendirme, düzeltme, silme, itiraz ve veri taşıma.' },
          { title: 'İletişim', description: 'Veri sorumlusu bilgileri.' },
        ],
      },
      {
        id: 'data',
        eyebrow: 'Toplanan veriler',
        title: 'Hangi bilgileri topluyoruz?',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Kişisel bilgiler', description: 'Ad, soyad, e-posta, telefon, kurum.' },
          { title: 'Teknik veriler', description: 'IP adresi, tarayıcı bilgisi, cihaz türü.' },
          { title: 'Kullanım verileri', description: 'Sayfa ziyaretleri, tıklama verileri, form içerikleri.' },
          { title: 'Konum verisi', description: 'Hizmet kalitesini artırmak için tahmini lokasyon.' },
        ],
      },
      {
        id: 'usage',
        eyebrow: 'Veri kullanımı',
        title: 'Toplanan verileri hangi amaçlarla kullanıyoruz?',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Hizmet sunumu', description: 'Program kayıtları, içerik paylaşımı, destek talepleri.' },
          { title: 'İletişim', description: 'Bülten, etkinlik ve operasyonel bilgilendirme.' },
          { title: 'Analiz ve iyileştirme', description: 'Ürünleri geliştirmek için anonimleştirilmiş analiz.' },
          { title: 'Pazarlama', description: 'İzin verilen ölçüde kampanya ve deneyim önerileri.' },
          { title: 'Yasal yükümlülükler', description: 'Yasal mercilere raporlama ve kanuni talepler.' },
        ],
      },
      {
        id: 'rights',
        eyebrow: 'Haklarınız',
        title: 'KVKK hakları',
        layout: 'list',
        items: [
          { title: 'Bilgi talep etme', description: 'Hangi verileri işlediğimizi öğrenebilirsiniz.' },
          { title: 'Düzeltme & silme', description: 'Yanlış bilgileri düzeltme veya silme talebinde bulunabilirsiniz.' },
          { title: 'Veri taşınabilirliği', description: 'Verilerinizi yapılandırılmış formatta talep edebilirsiniz.' },
          { title: 'İtiraz & şikayet', description: 'İşleme faaliyetlerine itiraz veya kurumlara şikayet hakkı.' },
        ],
      },
      {
        id: 'contact',
        eyebrow: 'İletişim',
        title: 'Veri sorumlusu',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'E-posta', description: 'privacy@tarf.org adresi üzerinden bize ulaşabilirsiniz.' },
          { title: 'Posta adresi', description: 'TARF Akademi Genel Merkezi, İstanbul.' },
          { title: 'Yanıt süresi', description: 'Başvurularınızı 30 gün içinde sonuçlandırırız.' },
        ],
      },
    ],
    cta: {
      title: 'Gizlilik politikasıyla ilgili sorularınızı paylaşın',
      description:
        'Veri sorumlusu ekibimiz kısa sürede size dönüş sağlar.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Çerez Politikası', href: 'cerez-politikasi' },
    },
    seo: {
      title: 'Gizlilik Politikası | TARF',
      description:
        'KVKK ve GDPR uyumlu gizlilik politikamızı inceleyin, veri kullanım amaçlarımızı öğrenin.',
    },
  },
  {
    slug: 'kullanim-kosullari',
    category: 'yasal',
    hero: {
      eyebrow: 'Yasal',
      title: 'Kullanım Koşulları',
      subtitle: 'Hizmetlerimizi kullanarak bu koşulları kabul etmiş olursunuz',
      description:
        'Web sitemiz, eğitim içeriklerimiz ve topluluk araçlarımızı kullanırken geçerli olan hak ve sorumlulukları açıkça paylaşıyoruz.',
      actions: [
        { label: 'Koşulları İncele', href: 'kullanim-kosullari' },
        { label: 'Destek Al', href: 'contact', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'general',
        eyebrow: 'Genel hükümler',
        title: 'Sözleşme kapsamı',
        layout: 'list',
        items: [
          { title: 'Hizmet tanımı', description: 'Akademi içerikleri, topluluk platformları ve etkinlik yönetimi.' },
          { title: 'Kullanıcı profilleri', description: 'Öğrenciler, mentorlar, kurum temsilcileri.' },
          { title: 'Sözleşme değişiklikleri', description: 'Politika güncellemelerinde bilgilendirme süreci.' },
        ],
      },
      {
        id: 'obligations',
        eyebrow: 'Yükümlülükler',
        title: 'Kullanıcı ve kurum sorumlulukları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Hesap güvenliği', description: 'Şifrelerin korunması ve yetkisiz erişimlerin bildirilmesi.' },
          { title: 'İçerik paylaşımı', description: 'Paylaşılan materyallerin telif haklarına uygun olması.' },
          { title: 'Ödeme şartları', description: 'Hizmet ücretlerinin zamanında ödenmesi.' },
          { title: 'Uygunsuz kullanım', description: 'Platformun kötüye kullanımında hesapların sınırlandırılması.' },
        ],
      },
      {
        id: 'ip',
        eyebrow: 'Fikri mülkiyet',
        title: 'Telif hakları',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'İçerik sahipliği', description: 'TARF’a ait materyallerin izinsiz kullanımı yasaktır.' },
          { title: 'Paydaş içerikleri', description: 'Kulüpler ve öğrenciler tarafından üretilen içeriklerde lisanslama.' },
          { title: 'Marka kullanımı', description: 'Logo ve isim kullanımı için yazılı izin gereklidir.' },
        ],
      },
      {
        id: 'termination',
        eyebrow: 'Sözleşmenin feshi',
        title: 'Askıya alma ve sonlandırma',
        layout: 'list',
        items: [
          { title: 'İhlal durumları', description: 'Etik, güvenlik veya ödeme ihlallerinde müdahale.' },
          { title: 'Geri ödeme politikası', description: 'Program iptalleri ve ücret iadeleri.' },
          { title: 'Uygulanacak hukuk', description: 'Türkiye Cumhuriyeti yasaları geçerlidir.' },
        ],
      },
    ],
    cta: {
      title: 'Kullanım koşullarıyla ilgili destek alın',
      description:
        'Sözleşme maddeleri hakkında sorularınızı hukuk ekibimize iletebilirsiniz.',
      primaryAction: { label: 'İletişime Geç', href: 'contact' },
      secondaryAction: { label: 'Gizlilik Metni', href: 'gizlilik-politikasi' },
    },
    seo: {
      title: 'Kullanım Koşulları | TARF',
      description:
        'Web sitesi ve hizmetlerimizin kullanım şartlarını detaylı şekilde inceleyin.',
    },
  },
  {
    slug: 'cerez-politikasi',
    category: 'yasal',
    hero: {
      eyebrow: 'Yasal',
      title: 'Çerez Politikası',
      subtitle: 'Çerez tercihlerinizi yönetebilirsiniz',
      description:
        'Web sitemizde kullanılan çerezlerin türlerini, amaçlarını ve nasıl kontrol edebileceğinizi açıklıyoruz.',
      actions: [
        { label: 'Tercihleri Yönet', href: 'cerez-politikasi' },
        { label: 'Destek Al', href: 'contact', variant: 'secondary' },
      ],
    },
    sections: [
      {
        id: 'types',
        eyebrow: 'Çerez türleri',
        title: 'Kullandığımız çerez kategorileri',
        layout: 'grid',
        columns: 2,
        items: [
          { title: 'Zorunlu çerezler', description: 'Oturum açma, güvenlik ve form işlemleri için.' },
          { title: 'Performans çerezleri', description: 'Site kullanımını analiz ederek deneyimi iyileştirme.' },
          { title: 'İşlevsel çerezler', description: 'Dil tercihi, tema ve kullanıcı ayarlarını hatırlama.' },
          { title: 'Hedefleme çerezleri', description: 'İzin verilmesi halinde kampanya ve sosyal medya entegrasyonları.' },
        ],
      },
      {
        id: 'details',
        eyebrow: 'Çerez listesi',
        title: 'Örnek çerezler',
        layout: 'list',
        items: [
          { title: '_ga', description: 'Google Analytics performans çerezi, 2 yıl saklanır.' },
          { title: '_gid', description: 'Oturum bazlı analitik çerezi, 24 saat saklanır.' },
          { title: 'session_id', description: 'Zorunlu çerez, oturum boyunca tutulur.' },
        ],
      },
      {
        id: 'management',
        eyebrow: 'Yönetim',
        title: 'Çerez tercihlerinizi nasıl yönetebilirsiniz?',
        layout: 'list',
        items: [
          { title: 'Tarayıcı ayarları', description: 'Chrome, Firefox, Safari ve Edge üzerinden çerezleri silebilirsiniz.' },
          { title: 'Tercih merkezi', description: 'Sitemizdeki çerez banner’ından kategorileri açıp kapatabilirsiniz.' },
          { title: 'Çerezleri reddetme', description: 'Bazı özelliklerin devre dışı kalabileceğini bilerek reddedebilirsiniz.' },
        ],
      },
      {
        id: 'updates',
        eyebrow: 'Güncellemeler',
        title: 'Politika değişimleri',
        layout: 'list',
        items: [
          { title: 'Versiyon kontrolü', description: 'Değişiklik tarihini sayfanın üst kısmında paylaşırız.' },
          { title: 'Bildirim', description: 'Önemli güncellemelerde e-posta göndeririz.' },
        ],
      },
    ],
    cta: {
      title: 'Çerez tercihlerinizi gözden geçirin',
      description:
        'Sizden gelen geri bildirimlerle çerez yönetimimizi sürekli iyileştiriyoruz.',
      primaryAction: { label: 'Tercihlerimi Güncelle', href: 'cerez-politikasi' },
      secondaryAction: { label: 'Gizlilik Merkezi', href: 'gizlilik-politikasi' },
    },
    seo: {
      title: 'Çerez Politikası | TARF',
      description:
        'Çerez türleri, kullanım amaçları ve tercih yönetimi hakkında ayrıntılı bilgi alın.',
    },
  },
]

const allContentPages: ContentPageDefinition[] = [
  ...kurumsalPages,
  ...dusuncePages,
  ...akademiPages,
  ...yazilimPages,
  ...kuluplerPages,
  ...yayinlarPages,
  ...yasalPages,
]

const contentPageMap = allContentPages.reduce<Record<string, ContentPageDefinition>>((acc, page) => {
  acc[page.slug] = page
  return acc
}, {})

export const contentPageSlugs = allContentPages.map((page) => page.slug)

export function getContentPage(slug: string) {
  return contentPageMap[slug]
}

export const contentPageGroups = Object.entries(categoryLabels).reduce(
  (acc, [key, meta]) => {
    const pages = allContentPages.filter((page) => page.category === key)
    acc[key as ContentPageCategory] = { ...meta, pages }
    return acc
  },
  {} as Record<ContentPageCategory, { label: string; description: string; pages: ContentPageDefinition[] }>,
)

export const contentPageList = allContentPages
