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
  backgroundImage?: string
  videoUrl?: string
  actions?: Array<{
    label: string
    href: string
    variant?: 'primary' | 'secondary'
    external?: boolean
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
    label: 'Kulüpler ve Takımlar',
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

const allContentPages: ContentPageDefinition[] = [
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Eğitim Araştırmaları | TARF Düşünce Enstitüsü",
      "description": "Modern eğitim metodolojileri, dijital dönüşüm ve öğretmen gelişimi üzerine araştırmalar ve programlar."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Okul işbirliği",
          "value": "65",
          "helper": "Pilot uygulama"
        },
        {
          "label": "Öğretmen",
          "value": "1.200+",
          "helper": "Gelişim programı"
        },
        {
          "label": "Öğrenci verisi",
          "value": "45.000",
          "helper": "Analiz edilen kayıt"
        }
      ],
      "title": "Eğitim ",
      "actions": [],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Eğitim Araştırmaları Kürsüsü",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>TARF Düşünce Enstitüsü bünyesinde faaliyet gösterecek Eğitim Araştırmaları Kürsüsü, Türkiye’nin eğitim sistemine nitelikli, sürdürülebilir ve yerli çözümler sunmayı amaçlayan bir düşünce ve araştırma platformudur. Kürsü; eğitimi yalnızca teknik bir alan olarak değil, aynı zamanda toplumsal değerler, ahlaki ilkeler ve insan yetiştirme ideali çerçevesinde ele alan bütüncül bir bakış açısını esas alır.</p><p>Bu kapsamda kürsü; mevcut eğitim politikalarını analiz eden, sahadaki uygulamaları izleyen, öğretmen, öğrenci ve aile perspektiflerini dikkate alan araştırmalar yürütür. Akademik çalışmalar, politika raporları, çalıştaylar ve istişare toplantıları aracılığıyla, karar alıcılara ve uygulayıcılara yol gösterici içerikler üretir. Amaç; teorik bilgi ile sahadaki gerçekliği buluşturarak eğitimin niteliğini artırmaya katkı sağlamaktır.</p><p>Eğitim Araştırmaları Kürsüsü, bilimsel veriyi irfanla; akademik disiplini toplumsal sorumlulukla bir araya getiren yaklaşımıyla, ülkemizin eğitim alanındaki yapısal sorunlarına çözüm önerileri geliştirmeyi ve uzun vadeli bir eğitim vizyonunun inşasına katkı sunmayı hedefler.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/egitim",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Modern metodolojiler",
            "description": "Aktif öğrenme, proje tabanlı yaklaşım ve karma modeller."
          },
          {
            "title": "Dijital dönüşüm",
            "description": "E-öğrenme platformları, öğrenme analitiği ve içerik standartları."
          },
          {
            "title": "Öğretmen gelişimi",
            "description": "Mentörlük programları ve mesleki gelişim kampüsleri."
          },
          {
            "title": "Müfredat geliştirme",
            "description": "21. yüzyıl becerilerini kapsayan esnek müfredat modelleri."
          },
          {
            "title": "Kalite standartları",
            "description": "Akredite sistemler ve değerlendirme araçları."
          },
          {
            "title": "Politika önerileri",
            "description": "Karar vericilere yönelik analitik raporlar."
          }
        ],
        "title": "Eğitimi yeniden tasarlayan başlıklar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Eğitim laboratuvarı",
            "description": "Öğretmen ve yöneticiler için prototip müfredatlar."
          },
          {
            "title": "Dijital okul modeli",
            "description": "Uzaktan eğitimde kaliteyi artıran hibrit yapılar."
          },
          {
            "title": "Mentor akademi",
            "description": "Öğretmenler için rehberlik ve liderlik modülleri."
          },
          {
            "title": "STEM & değerler",
            "description": "Teknoloji ve etik değerleri birleştiren programlar."
          }
        ],
        "title": "Uygulama alanları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "Türkiye Eğitim Panorama Raporu",
            "description": "Öğrenci memnuniyeti, öğretmen ihtiyaçları ve altyapı verileri."
          },
          {
            "title": "Dünya trendleri dosyası",
            "description": "OECD ve UNESCO verileri üzerinden karşılaştırmalar."
          },
          {
            "title": "Başarı hikayeleri",
            "description": "STEM programı mezunlarının kariyer yolculukları."
          },
          {
            "title": "Politika diyalogları",
            "description": "Bakanlıklar ve yerel yönetimlerle düzenlenen çözüm atölyeleri."
          }
        ],
        "title": "Proje ve raporlar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkanlar"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Araştırma ortağı olun",
            "description": "Veri paylaşın, saha çalışmasına destek verin."
          },
          {
            "title": "Programları uyarlayın",
            "description": "Eğitim içeriklerini kurumunuza adapte edin."
          },
          {
            "title": "Mentor ağına katılın",
            "description": "Öğretmen gelişiminde rol alın."
          }
        ],
        "title": "Programları kurumunuza taşıyın",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Basın materyallerine hemen erişin",
      "description": "Basın kiti bağlantısını talep edin veya medya ilişkileri ekibimizle canlı görüşme planlayın.",
      "primaryAction": {
        "href": "contact",
        "label": "Basın Kiti Talep Et"
      },
      "secondaryAction": {
        "href": "blog",
        "label": "Son Haberler"
      }
    },
    "seo": {
      "title": "TARF Basın Kiti | Medya Kaynakları ve Görseller",
      "description": "Logo dosyaları, basın bültenleri, istatistikler ve medya iletişim bilgilerini içeren TARF Akademi basın kiti."
    },
    "hero": {
      "title": "TARF Akademi basın ve medya merkezi",
      "actions": [
        {
          "href": "basin-kiti",
          "label": "Kit İndir"
        },
        {
          "href": "contact",
          "label": "Medya İletişimi",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Basın Kiti",
      "subtitle": "Marka dosyaları, görseller, basın bültenleri ve medya ilişkileri",
      "description": "Medya profesyonellerinin hızlıca erişebileceği tüm kaynakları tek bir yerde topladık. Hikayemizi doğru anlatmanız için ihtiyaç duyduğunuz görseller, veriler ve açıklamalar burada."
    },
    "slug": "basin-kiti",
    "category": "kurumsal",
    "sections": [
      {
        "id": "content",
        "items": [
          {
            "title": "Kurumsal özet",
            "description": "TARF Akademi’nin kısa hikayesi, misyonu ve etkisini anlatan doküman"
          },
          {
            "title": "Logo & görseller",
            "description": "Farklı formatlarda logo dosyaları, tipografi setleri ve renk kodları"
          },
          {
            "title": "Etkinlik görselleri",
            "description": "Konferans, teknoloji kafe ve takım çalışmalarından yüksek çözünürlüklü fotoğraflar"
          },
          {
            "title": "Basın bültenleri",
            "description": "Son konferans, sertifika programı ve yayın lansmanlarına ait bültenler"
          },
          {
            "title": "İstatistik kartları",
            "description": "Öğrenci sayıları, program verileri ve etki metrikleri infografikleri"
          },
          {
            "title": "Sık sorulanlar",
            "description": "Medya röportajlarında en çok gelen sorulara hazır yanıtlar"
          }
        ],
        "title": "Basın kitinde neler var?",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Paket içeriği"
      },
      {
        "id": "brand",
        "items": [
          {
            "title": "Boşluk kuralları",
            "description": "Logo etrafında minimum boşluk oranları belirtilmiştir."
          },
          {
            "title": "Renk varyasyonları",
            "description": "Açık ve koyu zeminlerde kullanılacak alternatifler sunulmuştur."
          },
          {
            "title": "Tipografi",
            "description": "Kurumsal font ailesi ve uygulama örnekleri."
          },
          {
            "title": "Yanlış kullanım",
            "description": "Örnekler üzerinden hangi kombinasyonlardan kaçınmanız gerektiğini gösteriyoruz."
          }
        ],
        "title": "Logoyu kullanırken dikkat edilmesi gerekenler",
        "layout": "list",
        "eyebrow": "Marka kullanım rehberi",
        "description": "Tüm görsel varlıklarımız için kullanım kurallarını paylaşıyoruz. Böylece marka bütünlüğünü koruyoruz."
      },
      {
        "id": "stories",
        "items": [
          {
            "title": "Gençlerin teknoloji üretimi",
            "description": "Teknoloji takımları ve yarışma başarıları"
          },
          {
            "title": "Yapay zekâ ve etik",
            "description": "Etik teknolojiyi odağa alan konferans serisi"
          },
          {
            "title": "Akademi dönüşümü",
            "description": "Proje tabanlı öğrenme ve sertifika programlarının etkisi"
          },
          {
            "title": "Topluluk deneyimi",
            "description": "Teknoloji kafe ve mentor buluşmaları"
          }
        ],
        "title": "Basında öne çıkan temalar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Hikaye fikirleri"
      },
      {
        "id": "media",
        "items": [
          {
            "title": "Basın sözcüsü",
            "description": "Kurucu temsilcilerimizin iletişim bilgileri ve uygunluk takvimi"
          },
          {
            "title": "Medya ilişkileri",
            "description": "Basın toplantıları, medya ziyaretleri ve saha çekim organizasyonları"
          },
          {
            "title": "Röportaj talebi",
            "description": "Form doldurarak hedeflediğiniz yayın tarihini iletebilirsiniz"
          },
          {
            "title": "Basında TARF",
            "description": "Son haberler, video yayınları ve makalelerin bağlantıları"
          }
        ],
        "title": "Doğru kişilere ulaşın",
        "layout": "list",
        "eyebrow": "Basın iletişimi"
      }
    ]
  },
  {
    "cta": {
      "title": "Mekan turu planlayın",
      "description": "Rezervasyon ekibimizden destek alarak mekanda etkinlik veya buluşma organize edebilirsiniz.",
      "primaryAction": {
        "href": "contact",
        "label": "Rezervasyon Talebi"
      },
      "secondaryAction": {
        "href": "events",
        "label": "Etkinlik Takvimi"
      }
    },
    "seo": {
      "title": "TARF Mekan | Teknoloji ve İşbirliği Alanı",
      "description": "Coworking alanları, maker lab ve etkinlik salonlarıyla TARF Mekan’ı yakından tanıyın. Rezervasyon süreçlerini öğrenin."
    },
    "hero": {
      "stats": [
        {
          "label": "Toplam alan",
          "value": "3.400 m²",
          "helper": "Açık ve kapalı alanlar"
        },
        {
          "label": "Eş zamanlı kapasite",
          "value": "420 kişi",
          "helper": "Eğitim + etkinlik"
        },
        {
          "label": "Toplantı odası",
          "value": "12",
          "helper": "Farklı büyüklüklerde"
        }
      ],
      "title": "Üretim ve işbirliği merkezi",
      "actions": [
        {
          "href": "contact",
          "label": "Rezervasyon Yap"
        },
        {
          "href": "events",
          "label": "Mekanı Ziyaret Et",
          "variant": "secondary"
        }
      ],
      "eyebrow": "TARF Mekan",
      "subtitle": "Teknoloji, bilim ve sosyal etkileşim için tasarlanmış modern mekan",
      "description": "Karma çalışma alanı, laboratuvarlar, teknoloji kafe ve etkinlik salonlarından oluşan TARF Mekan, gençlerin üretim üssü."
    },
    "slug": "tarf-mekan",
    "category": "kurumsal",
    "sections": [
      {
        "id": "about",
        "items": [
          {
            "title": "Konum",
            "description": "Metro ve toplu taşımaya yürüme mesafesinde, merkezî lokasyon"
          },
          {
            "title": "Çalışma saatleri",
            "description": "Hafta içi 09:00-22:00, hafta sonu etkinliklere göre 10:00-20:00"
          },
          {
            "title": "Üyelik",
            "description": "Akademi öğrencileri ücretsiz, topluluk üyelerine avantajlı paketler"
          },
          {
            "title": "Erişilebilirlik",
            "description": "Engelli erişimine uygun rampalar ve asansörler"
          }
        ],
        "title": "Şehrin merkezinde üretim ekosistemi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Mekan tanıtımı",
        "description": "Ulaşımı kolay, dijital altyapısı güçlü ve gençlerin vakit geçirmek istediği sıcak bir mekan tasarladık."
      },
      {
        "id": "spaces",
        "items": [
          {
            "title": "Coworking alanı",
            "description": "Açık masa sistemi, hızlı internet, toplantı pod’ları"
          },
          {
            "title": "Toplantı odaları",
            "description": "Ses izolasyonlu, 6-20 kişilik teknolojik odalar"
          },
          {
            "title": "Eğitim sınıfları",
            "description": "Akıllı tahtalar, kayıt sistemleri ve modüler oturma"
          },
          {
            "title": "Maker space",
            "description": "3D printer, elektronik atölye, robotik kitler"
          },
          {
            "title": "Teknoloji kafe",
            "description": "Mentor görüşmeleri ve topluluk buluşmaları için cafe alanı"
          },
          {
            "title": "Etkinlik salonu",
            "description": "Konferans ve demo günü için 350 kişilik salon"
          }
        ],
        "title": "Çok amaçlı üretim alanları",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Alanlar ve olanaklar"
      },
      {
        "id": "tech",
        "items": [
          {
            "title": "Gigabit internet",
            "description": "Tüm alanlarda yüksek hızlı kablosuz ve kablolu ağ"
          },
          {
            "title": "Yayın stüdyosu",
            "description": "Podcast, video ve canlı yayın için ses yalıtımlı stüdyo"
          },
          {
            "title": "Sunucu odası",
            "description": "Özel projeler ve hackathon’lar için ayrılmış cloud altyapısı"
          },
          {
            "title": "AV sistemleri",
            "description": "Konferans salonu için LED ekran, profesyonel ses ve ışık"
          }
        ],
        "title": "İleri seviye teknik donanım",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Teknolojik altyapı"
      },
      {
        "id": "reservation",
        "items": [
          {
            "title": "Akademi öğrencileri",
            "description": "Program boyunca ücretsiz erişim ve masa rezervasyonu"
          },
          {
            "title": "Topluluk üyeleri",
            "description": "Kulüpler ve teknoloji takımları için öncelikli slotlar"
          },
          {
            "title": "İş ortakları",
            "description": "Özel etkinlik ve lansmanlar için günlük kiralama"
          },
          {
            "title": "Kurumsal ziyaretler",
            "description": "Teknoloji kafe deneyimleri ve demo turları"
          }
        ],
        "title": "Kimler kullanabilir?",
        "layout": "list",
        "eyebrow": "Rezervasyon süreçleri"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "TARF Yazılım ekosistemiyle üretime geçebilir, eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Yazılım Geliştirme Programı | TARF Yazılım",
      "description": "TARF Yazılım ile web, mobil ve yapay zekâ projelerinde sprint bazlı geliştirme programlarına katılın, portfolyonuzu güçlendirin."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Sprint döngüsü",
          "value": "4-6 hafta",
          "helper": "Planlama + teslim"
        },
        {
          "label": "Ekip modeli",
          "value": "Küçük takım",
          "helper": "Mentor eşliğinde"
        },
        {
          "label": "Portfolyo çıktısı",
          "value": "3+ ürün",
          "helper": "Canlı demo"
        }
      ],
      "title": "Yazılım Geliştirme",
      "actions": [
        {
          "href": "https://www.tarfyazilim.com",
          "label": "TARF Yazılım’a Git"
        }
      ],
      "eyebrow": "Yazılım Teknolojileri",
      "subtitle": "Kurumsal İhtiyaçlara Özel Yazılım Çözümleri",
      "videoUrl": "",
      "highlight": "",
      "description": "<p><strong>TARF Yazılım Teknolojileri, </strong>kurumların ihtiyaçlarına özel, güvenli, ölçeklenebilir ve sürdürülebilir yazılım çözümleri geliştirir. Yazılım geliştirme sürecimizi; iş hedeflerini merkeze alan, kullanıcı deneyimini önemseyen ve uzun vadeli değer üretmeyi amaçlayan bir yaklaşımla yürütürüz.</p><p>Geliştirdiğimiz yazılımlar; yalnızca bugünün ihtiyaçlarını karşılamakla kalmaz, gelecekteki büyüme ve değişimlere de uyum sağlayacak şekilde tasarlanır.</p><h3><strong><u>Geliştirme Alanlarımız:</u></strong></h3><p><strong> Kurumsal Yazılımlar</strong></p><ul><li>İş süreçlerini dijitalleştiren, verimliliği artıran ve kurum içi entegrasyonu güçlendiren özel yazılım çözümleri.</li></ul><p><strong> Web Uygulamaları</strong></p><ul><li>Güvenli, performanslı ve kullanıcı dostu web tabanlı uygulamalar.</li></ul><p><strong> Mobil Uygulamalar</strong></p><ul><li>iOS ve Android platformlarına yönelik modern, hızlı ve ölçeklenebilir mobil uygulamalar.</li></ul><p><strong> Entegrasyon ve Otomasyon Çözümleri</strong></p><ul><li>Farklı sistemlerin birbiriyle uyumlu çalışmasını sağlayan entegrasyonlar ve iş süreçlerini hızlandıran otomasyonlar.</li></ul><p><strong> Veri ve Raporlama Sistemleri</strong></p><ul><li>Karar alma süreçlerini destekleyen veri yönetimi, analiz ve raporlama çözümleri.</li></ul><h3><strong>Teknolojik Yaklaşımımız</strong></h3><ul><li>Modern yazılım mimarileri</li><li>Güvenli kodlama standartları</li><li>Ölçeklenebilir ve modüler yapılar</li><li>Test edilebilir ve sürdürülebilir kod altyapısı</li></ul><p>Geliştirme süreçlerimizde; ihtiyaç analizi, tasarım, geliştirme, test ve canlıya alma aşamalarını şeffaf ve kontrollü bir şekilde yönetiriz.</p><h3><strong>Farkımız</strong></h3><p>TARF Yazılım Teknolojileri olarak; akademik birikimi, sektörel tecrübeyi ve teknoloji disiplinini bir araya getiririz. Yazılımı yalnızca teknik bir çıktı olarak değil, kuruma değer katan stratejik bir unsur olarak ele alırız.</p><h3><strong>Hedefimiz</strong></h3><p>Kurumların dijital altyapılarını güçlendiren, kullanıcı odaklı ve uzun ömürlü yazılım çözümleri geliştirerek sürdürülebilir başarılarına katkı sağlamak.</p>",
      "backgroundImage": ""
    },
    "slug": "yazilim/gelistirme",
    "category": "yazilim",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Web uygulamaları",
            "description": "Next.js, React, erişilebilir tasarım ve performans optimizasyonu."
          },
          {
            "title": "Backend & API",
            "description": "Node.js, NestJS, veri modelleme, güvenli API tasarımı."
          },
          {
            "title": "Mobil uygulamalar",
            "description": "React Native/Flutter ile çapraz platform deneyimi."
          },
          {
            "title": "Yapay zekâ uygulamaları",
            "description": "Model entegrasyonu, RAG akışları, otomasyon senaryoları."
          },
          {
            "title": "UI/UX & tasarım sistemleri",
            "description": "Bileşen kütüphaneleri, design token, prototip."
          },
          {
            "title": "DevOps & yayın",
            "description": "CI/CD, gözlemlenebilirlik, bulut dağıtımı."
          }
        ],
        "title": "Üretim odaklı geliştirme hatları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Odak alanları"
      },
      {
        "id": "process",
        "items": [
          {
            "title": "Keşif ve hedef belirleme",
            "description": "İş ihtiyacı ve kullanıcı senaryolarını netleştiriyoruz."
          },
          {
            "title": "Sprint planlama",
            "description": "Backlog ve görev dağılımı ile yol haritası çıkarıyoruz."
          },
          {
            "title": "Uygulama & code review",
            "description": "Mentorlar kalite ve güvenlik kontrolleri yapar."
          },
          {
            "title": "Demo & geri bildirim",
            "description": "Her sprint sonunda ürün demosu ve ölçüm yapılır."
          },
          {
            "title": "Yayın ve izleme",
            "description": "Sürümleme, izleme ve iyileştirme döngüsü kurulur."
          }
        ],
        "title": "Sprint bazlı ilerleme",
        "layout": "list",
        "eyebrow": "Üretim süreci"
      },
      {
        "id": "mentorship",
        "items": [
          {
            "title": "Teknik mentorluk",
            "description": "Haftalık ofis saatleri ve kod inceleme seansları."
          },
          {
            "title": "Pair programming",
            "description": "Takım içi bilgi paylaşımı ve hızlandırılmış öğrenme."
          },
          {
            "title": "Ürün bakışı",
            "description": "Kullanıcı deneyimi, iş değeri ve ölçüm odaklı geliştirme."
          },
          {
            "title": "Test kültürü",
            "description": "Unit/e2e testleri, linting ve kalite standartları."
          }
        ],
        "title": "Kıdemli ekiplerle birlikte çalışma",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Mentorluk"
      },
      {
        "id": "projects",
        "items": [
          {
            "title": "Eğitim yönetim paneli",
            "description": "İçerik, kullanıcı ve raporlama modülleri."
          },
          {
            "title": "Topluluk mobil uygulaması",
            "description": "Etkinlik, duyuru ve mesajlaşma akışı."
          },
          {
            "title": "Kurumsal web portalı",
            "description": "Çok dilli, performans odaklı vitrin."
          },
          {
            "title": "Veri görselleştirme panosu",
            "description": "KPI takibi, filtreleme ve raporlama."
          },
          {
            "title": "Otomasyon botları",
            "description": "İş akışı otomasyonları ve entegrasyonlar."
          },
          {
            "title": "Yapay zekâ destekli içerik",
            "description": "Özetleme, arama ve öneri modülleri."
          }
        ],
        "title": "Üretilen örnek ürünler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Portfolyo"
      },
      {
        "id": "career",
        "items": [
          {
            "title": "Portfolyo & GitHub",
            "description": "Projeler düzenlenir, case study hazırlanır."
          },
          {
            "title": "Teknik mülakat hazırlığı",
            "description": "Sistem tasarımı ve kod mülakat pratikleri."
          },
          {
            "title": "Staj & iş eşleştirme",
            "description": "Partner ekiplerle fırsat paylaşımı."
          },
          {
            "title": "Sunum & iletişim",
            "description": "Demo sunumları ve ürün anlatımı."
          }
        ],
        "title": "Yetkinlik ve istihdam çıktıları",
        "layout": "list",
        "eyebrow": "Kariyer desteği"
      }
    ]
  },
  {
    "cta": {
      "title": "Rapor talep edin veya işbirliği başlatın",
      "description": "Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "contact",
        "label": "İletişime Geç"
      },
      "secondaryAction": {
        "href": "blog",
        "label": "Yayın Arşivi"
      }
    },
    "seo": {
      "title": "TARF Düşünce Enstitüsü | Araştırma ve Politika Merkezi",
      "description": "Eğitim, gençlik, aile ve kültür alanlarında yürütülen araştırmaları, raporları ve etkinlikleri keşfedin."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Araştırma alanı",
          "value": "4",
          "helper": "Eğitim, gençlik, aile, kültür"
        },
        {
          "label": "Yıllık yayın",
          "value": "45+",
          "helper": "Rapor, makale ve analizler"
        },
        {
          "label": "Uzman ağı",
          "value": "30+",
          "helper": "Akademisyen ve saha uzmanı"
        }
      ],
      "title": "Fikir üretimi, araştırma ve toplumsal dönüşüm merkezi",
      "actions": [
        {
          "href": "dusunce-enstitusu",
          "label": "Araştırmalarımız"
        },
        {
          "href": "contact",
          "label": "Rapor Talep Et",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Bilimsel metotla düşünen, veriyle konuşan ve çözüm üreten bir ekip",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Eğitim, gençlik, aile ve kültür alanlarında derinlemesine araştırmalar yapıyor; sonuçları yayın, program ve politika önerilerine dönüştürüyoruz.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Eğitim Araştırmaları",
            "description": "Modern öğrenme modelleri, müfredat dönüşümü ve öğretmen gelişimi."
          },
          {
            "title": "Aile Araştırmaları",
            "description": "Modern aile dinamikleri, ebeveynlik ve aile destek programları."
          },
          {
            "title": "Kültür & Sanat",
            "description": "Kültürel miras, çağdaş sanat ve kültürel diplomasi projeleri."
          },
          {
            "title": "Gençlik Çalışmaları",
            "description": "Gençlik ve teknoloji, girişimcilik ve kariyer yolları üzerine araştırmalar."
          },
          {
            "title": "Uluslararası İlişkiler",
            "description": "Küresel trendler, diplomasi ve bölgesel işbirliklerine odaklanan araştırmalar."
          },
          {
            "title": "Ekoloji-İklim-Şehir",
            "description": "İklim krizi, sürdürülebilirlik ve doğa temelli çözümler üzerine çalışmalar."
          },
          {
            "title": "Bilim ve Teknoloji",
            "description": "Bilimsel gelişmelerin toplum ve ekonomi üzerindeki etkilerine dair analizler."
          }
        ],
        "title": "Toplumsal dönüşüme yön veren çalışmalar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ana odak alanları"
      },
      {
        "id": "approach",
        "items": [
          {
            "title": "Saha araştırmaları",
            "description": "Yerel ihtiyaçları anlamak için saha görüşmeleri ve odak grup çalışmaları."
          },
          {
            "title": "Veri analitiği",
            "description": "Nitel ve nicel verileri birleştiren, etki ölçümüne dayalı analizler."
          },
          {
            "title": "Çözüm tasarımı",
            "description": "Araştırma çıktılarından politika önerileri ve program tasarımları üretmek."
          }
        ],
        "title": "Bilimsel metot + veri odaklı içgörü",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Yaklaşımımız"
      },
      {
        "id": "publications",
        "items": [
          {
            "title": "TARF Rapor Serisi",
            "description": "Yıllık olarak yayımlanan kapsamlı sektör analizleri."
          },
          {
            "title": "Politika Notları",
            "description": "Karar vericilere yönelik kısa ve uygulamaya dönük içerikler."
          },
          {
            "title": "Veri setleri",
            "description": "Açık veri formatında paylaşılan araştırma çıktıları."
          },
          {
            "title": "Etki öyküleri",
            "description": "Programlardan çıkan gerçek dönüşüm hikayeleri."
          }
        ],
        "title": "Yayın ve rapor serileri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Yayınlar"
      },
      {
        "id": "events",
        "items": [
          {
            "title": "Yıllık Düşünce Forumu",
            "description": "Türkiye’nin fikir liderlerini bir araya getiren ana etkinlik"
          },
          {
            "title": "Politika atölyeleri",
            "description": "Karar vericiler ve gençler için ortak çalışma oturumları"
          },
          {
            "title": "Yayın lansmanları",
            "description": "Yeni raporların tartışıldığı interaktif buluşmalar"
          },
          {
            "title": "Kültür-sanat söyleşileri",
            "description": "Sanatçı ve akademisyenlerin katıldığı seri"
          }
        ],
        "title": "Konferans, panel ve çalıştaylar",
        "layout": "list",
        "eyebrow": "Etkinlikler",
        "description": "Araştırmalarımızı paylaşırken aynı zamanda yeni fikirlerin filizlenmesi için alan açıyoruz."
      },
      {
        "id": "team",
        "items": [
          {
            "title": "Araştırmacılar",
            "description": "Sosyoloji, psikoloji, eğitim bilimleri ve veri bilimi uzmanları"
          },
          {
            "title": "Program tasarımcıları",
            "description": "Araştırma bulgularını uygulanabilir programlara dönüştüren ekip"
          },
          {
            "title": "Mentorlar",
            "description": "Saha deneyimi yüksek, topluluklarla yakın çalışan gönüllüler"
          },
          {
            "title": "Akademik kurul",
            "description": "Üniversite iş birlikleriyle kurulan danışma kurulu"
          }
        ],
        "title": "Uzmanlar ve araştırmacılar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ekip"
      }
    ]
  },
  {
    "cta": {
      "title": " Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Konferans sponsorluğu veya konuşmacı başvurusu yapabilir, eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": "Kavramlar"
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Konferansları | Teknoloji ve Bilim Etkinlikleri",
      "description": "Konferans programı, konuşmacılar, sponsorlar ve öğrenci projeleri hakkında bilgi alın."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Yıllık konferans",
          "value": "4",
          "helper": "Ana etkinlik"
        },
        {
          "label": "Katılımcı",
          "value": "6.000+",
          "helper": "Yerinde + online"
        },
        {
          "label": "Projeler",
          "value": "120",
          "helper": "Öğrenci sunumu"
        }
      ],
      "title": "TARF Konferansları",
      "actions": [],
      "eyebrow": "Akademi",
      "subtitle": "Teknoloji, bilim ve kültür buluşmaları..",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Konferanslar; lise ve üniversitelerde düzenlenen, geniş kitlelere hitap eden ilham verici buluşmalar olarak organize edilir. Bu programlarda akademi, bürokrasi, sivil toplum ve düşünce dünyasından isimler, tecrübelerini ve birikimlerini gençlerle paylaşır.</p><p>TARF Teknoloji Konferansları, gençlerin ufkunu genişletmeyi; kariyer, ahlâk, liderlik ve toplumsal sorumluluk gibi başlıklarda bilinç oluşturarak onları uzun vadeli düşünmeye sevk etmeyi amaçlar.</p>",
      "backgroundImage": ""
    },
    "slug": "akademi/konferanslar",
    "category": "akademi",
    "sections": [
      {
        "id": "features",
        "items": [
          {
            "title": "Türkiye’nin önde gelen isimleri",
            "description": "Bilim insanları, girişimciler, sanatçılar."
          },
          {
            "title": "Öğrenci sunumları",
            "description": "Gençlerin projelerini sahnede anlattığı oturumlar."
          },
          {
            "title": "İlham veren oturumlar",
            "description": "Panel, keynote ve fireside gibi farklı formatlar."
          },
          {
            "title": "Akademi-sanayi işbirliği",
            "description": "Kurumsal ortaklarla eşleştirme oturumları."
          }
        ],
        "title": "Konferans deneyimi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan özellikler"
      },
      {
        "id": "program",
        "items": [
          {
            "title": "Açılış & vizyon konuşması",
            "description": "Kurucu ekip ve özel konuklar yılın temasını anlatır."
          },
          {
            "title": "Panel serileri",
            "description": "Teknoloji, bilim, kültür ve girişimcilik panelleri."
          },
          {
            "title": "Workshop alanı",
            "description": "Katılımcılar kısa uygulamalı oturumlara katılır."
          },
          {
            "title": "Ödül ve kapanış",
            "description": "Projeler ödüllendirilir, işbirliği çağrıları yapılır."
          }
        ],
        "title": "Oturum akışı",
        "layout": "timeline",
        "eyebrow": "Program"
      },
      {
        "id": "partners",
        "items": [
          {
            "title": "Teknoloji firmaları",
            "description": "Yeni ürün lansmanları ve demo alanları."
          },
          {
            "title": "Üniversiteler",
            "description": "Akademik tanıtım alanları ve öğrenci kabul desteği."
          },
          {
            "title": "STK ve kamu",
            "description": "Toplumsal fayda projeleri için işbirlikleri."
          },
          {
            "title": "Medya partnerleri",
            "description": "Canlı yayın ve basın görünürlüğü."
          }
        ],
        "title": "Sponsor ve destekçiler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "İş ortakları"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Yönetim İlkeleri | Şeffaf ve Katılımcı Yapı",
      "description": "Karar alma süreçleri, hesap verebilirlik mekanizmaları ve risk yönetimi yaklaşımlarımız hakkında bilgi edinin."
    },
    "hero": {
      "badge": "",
      "stats": [],
      "title": "Yönetim İlkelerimiz",
      "actions": [],
      "eyebrow": "Kurumsal",
      "subtitle": "Bilimi hikmetle, teknolojiyi irfani bakış ile birlikte düşünürüz.",
      "videoUrl": "",
      "highlight": "",
      "description": "<p><strong>Yönetim İlkeleri</strong></p><ul><li>Faaliyetlerimizde milli ve yerli duruşu temel ilke kabul ederiz.</li><li>Bilimi hikmetle, teknolojiyi irfani bakış ile birlikte düşünürüz.</li><li>Gençleri merkeze alan katılımcı ve şeffaf bir yönetim anlayışını benimseriz.</li><li>Toplumsal fayda üreten sürdürülebilir çalışmaları destekleriz.</li><li>Üniversiteler, yerel paydaşlar ve sivil toplum kuruluşlarıyla ortak aklı esas alırız.</li></ul>",
      "backgroundImage": ""
    },
    "slug": "yonetim-ilkeleri",
    "category": "kurumsal",
    "sections": [
      {
        "id": "principles",
        "items": [
          {
            "title": "Şeffaflık",
            "description": "Plan, bütçe ve performans raporlarını toplulukla paylaşır, açık veri kültürü oluştururuz."
          },
          {
            "title": "Hesap verebilirlik",
            "description": "Her programın hedefi, sorumlusu ve ölçüm metrikleri kamuya açıktır."
          },
          {
            "title": "Katılımcılık",
            "description": "Öğrencilerin, mentorların ve paydaşların kararlara dahil olduğu mekanizmalar kurarız."
          },
          {
            "title": "Etik yönetişim",
            "description": "Tüm kararlar TARF Etik Beyanı ve değerler setine göre değerlendirilir."
          },
          {
            "title": "Veri odaklılık",
            "description": "Kararlar ölçülebilir verilere dayanır, öğrenme analitiği ile doğrulanır."
          },
          {
            "title": "Sürdürülebilirlik",
            "description": "Finansal, çevresel ve sosyal etkileri gözeterek yatırım planları hazırlarız."
          }
        ],
        "title": "Yönetim ilkelerimiz",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Çerçeve",
        "description": "Kurumsal hafızayı koruyan ve büyümeyi sürdürülebilir kılan temel ilkeleri şeffaf şekilde paylaşıyoruz."
      },
      {
        "id": "decision",
        "items": [
          {
            "title": "Stratejik Kurul",
            "description": "Akademi, yazılım, düşünce enstitüsü ve topluluk yöneticilerinden oluşur. Yıllık hedefleri belirler."
          },
          {
            "title": "Program Konseyleri",
            "description": "Her ana faaliyet alanı için ayrı konseyler; içerik, bütçe ve performans kararlarını alır."
          },
          {
            "title": "Öğrenci Danışma Meclisi",
            "description": "Programların katılımcıları geri bildirim toplar, karar döngülerine öneri gönderir."
          },
          {
            "title": "Bağımsız Denetim",
            "description": "Finansal ve operasyonel süreçler yılda iki kez bağımsız denetime tabi tutulur."
          }
        ],
        "title": "Yetki ve sorumluluk dağılımı",
        "layout": "list",
        "eyebrow": "Karar alma"
      },
      {
        "id": "transparency",
        "items": [
          {
            "title": "Performans panosu",
            "description": "Program katılımı, memnuniyet ve çıktı metriklerini gösteren dijital gösterge paneli."
          },
          {
            "title": "Politika kitaplığı",
            "description": "Tüm yönergeler, süreç dokümanları ve prosedürler tek bir dijital kitaplıkta yayımlanır."
          },
          {
            "title": "Geri bildirim kanalları",
            "description": "Anonim bildirim formları, mentor görüşmeleri ve topluluk loncaları ile sürekli iletişim."
          },
          {
            "title": "Yıllık etki raporu",
            "description": "Eğitim, yazılım, topluluk ve finansal performans rakamları herkesle paylaşılır."
          }
        ],
        "title": "Şeffaf raporlama araçlarımız",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Uygulama"
      },
      {
        "id": "compliance",
        "items": [
          {
            "title": "Risk matrisi",
            "description": "Eğitim, teknoloji ve finansal riskleri düzenli olarak güncelliyoruz."
          },
          {
            "title": "İç kontrol listeleri",
            "description": "Program döngülerinin her aşamasında kontrol noktaları tanımlandı."
          },
          {
            "title": "KVKK & GDPR uyumu",
            "description": "Veri işleme süreçleri yasal standartlara göre denetleniyor."
          },
          {
            "title": "İş sürekliliği planları",
            "description": "Dijital altyapılar ve fiziksel mekan için olağanüstü durum senaryoları hazır."
          }
        ],
        "title": "Risk yönetimi ve iç kontrol",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Uyum",
        "description": "Hızlı büyürken riskleri doğru yönetebilmek için kurumsal uyum mekanizmaları kurduk."
      }
    ]
  },
  {
    "cta": {
      "title": "Bugünü İnşa Eden Tarihi Hafıza, Gücünü Medeniyetinden Alan Teknoloji, Nesiller Arasında Sağlam Bir Kültür Köprüsü... ",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Kültür ve Sanat Programları | TARF Düşünce Enstitüsü",
      "description": "Kültürel kimlik, sanat eğitimi ve dijital kültür üzerine araştırmalar ve sanatçı programları."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Sergi & etkinlik",
          "value": "35",
          "helper": "Yıllık ortalama"
        },
        {
          "label": "Sanatçı",
          "value": "80+",
          "helper": "İş birliği yapılan"
        },
        {
          "label": "Kitle erişimi",
          "value": "150K",
          "helper": "Dijital & fiziksel"
        }
      ],
      "title": "Tarih-Kültür-Medeniyet",
      "actions": [],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Kimlik Bilincini Güçlendiren, Küresel Etkiler Karşısında Özgün Duruşu Koruyan, Değer Temelli Yaklaşımlar...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Tarih Kültür Medeniyet alanındaki çalışmalarımızda, milli ve yerli hafızanın merkeze alınması, irfani bakış ile akademik disiplinin birleştirilmesi, geçmiş birikimin bugünün sorunlarına ışık tutacak şekilde yorumlanması, medeniyet değerlerimizin bilimsel yöntemlerle incelenmesi amaçlanır.</p><p>Üniversiteler ve yerel yönetimlerle; bilgi ile hikmeti dengeleyen, nesiller arası aktarımı güçlendiren, kalıcı etki hedefleyen, stratejik öneriler geliştiren çalıştay, sempozyum ve seminerler düzenlenmesi; arşiv çalışmaları ve saha araştırmalarıyla kültürel sürekliliği destekleyen, kimlik bilincini güçlendiren, küresel etkiler karşısında özgün duruşu koruyan, değer temelli yaklaşımlar üreten, yerel mirası ulusal vizyonla bütünleştiren, kültürel politikaların gelişimine katkı sunan ve geniş katılımlı lansmanlarla toplumla buluşan kapsamlı raporlar hazırlanması hedeflenir.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/kultur-sanat",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Kültürel kimlik",
            "description": "Yerel değerlerin korunması ve aktarımı."
          },
          {
            "title": "Çağdaş sanat",
            "description": "Sanat üretiminde yeni anlatılar ve medya."
          },
          {
            "title": "Dijital kültür",
            "description": "Metaverse, oyun ve yeni medya trendleri."
          },
          {
            "title": "Sanat eğitimi",
            "description": "Okullar ve topluluklar için programlar."
          },
          {
            "title": "Kültürel diplomasi",
            "description": "Uluslararası iş birlikleri ve sanatçı değişimleri."
          }
        ],
        "title": "Kültürel üretime bakış",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Sanatçı rezidansları",
            "description": "Genç sanatçılara mekân, mentorluk ve görünürlük."
          },
          {
            "title": "Kültür turları",
            "description": "Şehir içi/şehir dışı deneyim odaklı geziler."
          },
          {
            "title": "Sanat atölyeleri",
            "description": "Çocuklar ve gençler için disiplinler arası atölyeler."
          },
          {
            "title": "Dijital sergiler",
            "description": "NFT ve dijital sanat platformları."
          }
        ],
        "title": "Sanatla üretim",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "Kültür atlası",
            "description": "Türkiye’de kültürel üretim haritası."
          },
          {
            "title": "Sergiler",
            "description": "Tematik sergiler ve sanatçı söyleşileri."
          },
          {
            "title": "Kültür-sanat yazıları",
            "description": "Eleştiri, analiz ve rehber içerikleri."
          },
          {
            "title": "Sanatçı ağı",
            "description": "Mentorlar ve iş birliği yapılan sanatçılar."
          }
        ],
        "title": "Program ve yayınlar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan içerikler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Sergi sponsoru olun",
            "description": "Genç sanatçıların işlerini görünür kılın."
          },
          {
            "title": "Program ortaklığı",
            "description": "Kurumlara özel sanat içerikleri tasarlayın."
          },
          {
            "title": "Yayın katkısı",
            "description": "Kültür-sanat yazılarıyla bilgi paylaşın."
          }
        ],
        "title": "Sanat projelerine destek olun",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Güçlü Yarınlar Hikmetli Gençler İle Kurulur.",
      "description": "Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Gençlik Programları | TARF Düşünce Enstitüsü",
      "description": "Gençlik ve teknoloji, girişimcilik, liderlik ve sosyal sorumluluk üzerine araştırma ve uygulama programları."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Aktif program",
          "value": "18",
          "helper": "Gençlik eksenli"
        },
        {
          "label": "Katılımcı",
          "value": "3.200",
          "helper": "Yıllık"
        },
        {
          "label": "Mentor",
          "value": "75",
          "helper": "Profesyonel destek"
        }
      ],
      "title": "Gençlik",
      "actions": [],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Gençlerin potansiyelini ortaya çıkaran, gelişimini destekleyen programlar...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Milli ve yerli perspektifle ele aldığımız Gençlik alanındaki çalışmalarımızda, bilimsel analiz ile hikmetli yaklaşımın dengelenmesi, yerli üretimin ve girişimciliğin teşvik edilmesi, sosyal sorumluluğun güçlendirilmesi, küresel rekabette milli duruşun korunması, irfani mirasın çağdaş bilimle buluşturulması, gençlerin kimlik, aidiyet ve yetkinliklerinin güçlendirilmesi amaçlanır.</p><p>Geçmişten gelen değerlerin geleceğin teknolojileriyle uyumlu biçimde yorumlanması, üniversiteler ve yerel yönetimlerle çalıştaylar, sempozyumlar ve gençlik forumları düzenlenmesi, katılımcı yöntemlerle eğitim, istihdam ve kültür politikalarına yol gösteren raporlar hazırlanması, sahaya dayalı verilerle sürdürülebilir önerilerin geliştirilmesi ve geniş katılımlı lansmanlarla gençlerin sesinin kamuoyuna taşınması hedeflenir.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/genclik",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Gençlik & teknoloji",
            "description": "Dijital yerlilerin alışkanlıkları ve riskleri."
          },
          {
            "title": "Girişimcilik & kariyer",
            "description": "Yeni iş modelleri ve yetkinlik haritaları."
          },
          {
            "title": "Sosyal sorumluluk",
            "description": "Gönüllülük hareketleri ve sosyal girişimler."
          },
          {
            "title": "Liderlik gelişimi",
            "description": "Genç liderler için uygulamalı içerikler."
          },
          {
            "title": "Gençlik kültürü",
            "description": "Müzik, sanat, oyun dünyası ve trend analizleri."
          }
        ],
        "title": "Gençlerin dünyasını anlamak",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Gençlik laboratuvarı",
            "description": "Proje geliştirme ve mentor eşleşmesi."
          },
          {
            "title": "Start-up kampı",
            "description": "İş modeli geliştirme ve yatırımcı buluşmaları."
          },
          {
            "title": "Sosyal inovasyon atölyesi",
            "description": "Toplumsal sorunlara çözüm arayan ekipler."
          },
          {
            "title": "Kariyer atölyeleri",
            "description": "CV, portfolyo ve mülakat hazırlıkları."
          }
        ],
        "title": "Uygulama alanları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "Z Kuşağı Raporları",
            "description": "Gençlerin yaşam tarzı ve beklentilerine dair trend analizi."
          },
          {
            "title": "Başarı hikayeleri",
            "description": "Mentor destekli girişimlerin yatırım alması."
          },
          {
            "title": "Gençlik zirvesi",
            "description": "Yıllık liderlik buluşmaları ve ödül törenleri."
          },
          {
            "title": "Dijital sağlık programı",
            "description": "Dijital detoks ve bilinçli kullanım modülleri."
          }
        ],
        "title": "Proje ve araştırmalar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan hikayeler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Mentor olun",
            "description": "Genç girişimlere deneyiminizi aktarın."
          },
          {
            "title": "Programı kurumunuza taşıyın",
            "description": "Gençlik ofisleri ve belediyelerle iş birliği."
          },
          {
            "title": "Araştırmaya destek verin",
            "description": "Veri paylaşımı ve saha çalışmaları."
          }
        ],
        "title": "Gençler için alan açın",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Vizyonu ve Değerleri | Geleceği İnşa Eden İlkeler",
      "description": "Yenilikçilik, üretkenlik ve etik değerler etrafında şekillenen TARF Akademi vizyonunu keşfedin. 2030 ve 2040 hedeflerimizi inceleyin."
    },
    "hero": {
      "badge": "",
      "stats": [],
      "title": "Vizyonumuz ve Değerlerimiz",
      "actions": [],
      "eyebrow": "Vizyonumuz",
      "subtitle": "Bilgi, teknoloji ve ahlak temelli gelecek vizyonu",
      "videoUrl": "",
      "highlight": "2030 ve 2040 hedef haritası",
      "description": "<p><strong>VİZYONUMUZ;</strong></p><p>Değerlerine bağlı, bilimsel ve teknolojik faaliyetlerde söz sahibi, Türkiye’nin entelektüel ve teknolojik geleceğine katkı veren bir neslin yetişmesine öncülük etmek.</p><p><strong>DEĞERLERİMİZ;</strong></p><p>Milli ve Yerli Olmak</p><p>Hikmetle Düşünmek</p><p>Sosyal Sorumluluk</p><p>Üretkenlik</p><p>İrfani Bakış</p><p>Özgünlük</p><p>Diğergamlık</p>",
      "backgroundImage": ""
    },
    "slug": "vizyon-degerler",
    "category": "kurumsal",
    "sections": [
      {
        "id": "vision",
        "items": [
          {
            "title": "2030 hedefleri",
            "bullets": [
              "Türkiye genelinde 20 teknoloji takımı",
              "TARF Dergi’nin uluslararası edisyonu",
              "Karma öğrenme platformunda 50.000 kullanıcı"
            ],
            "description": "Her şehirde üretim yapan gençlik toplulukları, dijitalleşmiş akademi içerikleri ve global sertifika ağları oluşturmak."
          },
          {
            "title": "2040 vizyonu",
            "bullets": [
              "Küresel konferans serisi",
              "İleri araştırma merkezleri ve laboratuvarlar",
              "Sosyal etki fonlarıyla desteklenen girişimler"
            ],
            "description": "Bölgesel ölçekte teknoloji–akademi ekosistemi kurarak etik teknoloji üretimi konusunda referans kurum olmak."
          }
        ],
        "title": "2030 ve 2040 vizyonu",
        "layout": "split",
        "eyebrow": "Uzun vadeli perspektif"
      },
      {
        "id": "mission",
        "items": [
          {
            "title": "Güçlü eğitim altyapısı",
            "description": "Teknoloji ve bilim alanlarında örnek gösterilen müfredat ve içerik üretimi"
          },
          {
            "title": "Yazılım üretimi",
            "description": "Teknik becerileri geliştiren, gerçek uygulamalarla güçlenen yazılım programları"
          },
          {
            "title": "Araştırma kültürü",
            "description": "Gençleri akademik disiplin ve bilimsel meraka teşvik eden görevler"
          },
          {
            "title": "Ekosistem oluşturmak",
            "description": "Konferanslar, teknoloji kafeleri ve takımlar arasında akışkan iş birlikleri"
          },
          {
            "title": "Teknoloji dönüşümü",
            "description": "Türkiye’nin dijital dönüşümüne katkı sağlayacak nitelikli insan gücü yetiştirmek"
          },
          {
            "title": "Etik ve değerler",
            "description": "Dijitalleşen dünyada kültürel ve etik değerlere bağlı bir nesil yetiştirmek"
          }
        ],
        "title": "Günlük kararlarımızı yönlendiren görev tanımı",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Misyon maddeleri",
        "description": "tarf.md’deki altı ana misyon maddesini genişletilmiş açıklamalarla kurum kültürüne taşıyoruz."
      },
      {
        "id": "values",
        "items": [
          {
            "title": "Yenilikçilik",
            "bullets": [
              "Ar-Ge sprintleri",
              "Hızlı prototipleme"
            ],
            "description": "Trendleri takip eden değil, yeni modeller üreten eğitim ve teknoloji yaklaşımı."
          },
          {
            "title": "Üretkenlik",
            "bullets": [
              "Proje kuluçkası",
              "Atölye zinciri"
            ],
            "description": "Bilgiyi pratiğe dönüştüren workshop ve proje tabanlı öğrenmeler."
          },
          {
            "title": "Etik ve Değerler",
            "bullets": [
              "Etik kurul",
              "İlkeler kodu"
            ],
            "description": "Teknolojinin insana hizmet ettiği perspektifi korumak."
          },
          {
            "title": "Toplumsal Fayda",
            "bullets": [
              "Sosyal etki ölçümü",
              "Açık kaynak projeler"
            ],
            "description": "Üretilen her projenin toplumsal iyileşme sağlamasına dikkat etmek."
          },
          {
            "title": "İşbirliği",
            "bullets": [
              "Çapraz mentor havuzu",
              "Eş zamanlı kamplar"
            ],
            "description": "Takımlar arasında bilgi paylaşımı ve ortak hedef oluşturmak."
          },
          {
            "title": "Sürekli Öğrenme",
            "bullets": [
              "Geri bildirim panelleri",
              "Öğrenme analitiği"
            ],
            "description": "Eğitmenler ve öğrenciler için düzenli değerlendirme döngüleri."
          },
          {
            "title": "Güven",
            "bullets": [
              "Politika şeffaflığı",
              "Yetkinlik bazlı atamalar"
            ],
            "description": "Şeffaf iletişim ve sağlam yönetişim prosedürleri ile güven tesis etmek."
          }
        ],
        "title": "Kurumsal davranış kodumuz",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Değerlerimiz",
        "description": "Yedi temel değer, tüm programlarımızda ölçtüğümüz ve görünür kıldığımız davranış göstergelerine dönüştürüldü."
      },
      {
        "id": "themes",
        "items": [
          {
            "title": "Innovation Labs",
            "description": "Yazılım teknolojileri ile düşünce enstitüsünü aynı masada buluşturuyoruz."
          },
          {
            "title": "Küresel ağ",
            "description": "Uluslararası iş birlikleri ile konferans ve içerik ağımızı genişletiyoruz."
          },
          {
            "title": "Veri odaklı karar",
            "description": "Akademi performansını veri ile ölçüyor, öğrenme deneyimini optimize ediyoruz."
          },
          {
            "title": "İnsan odaklı liderlik",
            "description": "Mentorluk sistemleri ile genç liderler yetiştiriyor, yönetişimimizi güçlendiriyoruz."
          },
          {
            "title": "Sürdürülebilir altyapı",
            "description": "Mekan, dijital platform ve finans yapımızı uzun vadeli planlıyoruz."
          },
          {
            "title": "Erişilebilirlik",
            "description": "Programlarımızı farklı sosyo-ekonomik gruplar için erişilebilir kılıyoruz."
          }
        ],
        "title": "Vizyonu hayata geçiren öncelikler",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Stratejik temalar"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Akademi | Bilimsel Düşünme ve Üretim Programları",
      "description": "Bilimsel içerikler, seminerler, konferanslar ve sertifika programlarıyla TARF Akademi hakkında detaylı bilgi alın."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Aktif modül",
          "value": "32",
          "helper": "Bilim & teknoloji"
        },
        {
          "label": "Mentor",
          "value": "110",
          "helper": "Akademisyen ve mühendis"
        },
        {
          "label": "Mezun",
          "value": "5.400",
          "helper": "Program mezunu"
        }
      ],
      "title": "Akademi ",
      "actions": [],
      "eyebrow": "Akademi",
      "subtitle": "TARF; merak eden, araştıran ve çözüm üreten gençlik...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>TARF; merak eden, araştıran ve çözüm üreten gençlik...</p><p>Lisans öğrencilerine yönelik olarak; kendi akademik alanlarında derinlik kazanmalarını, ahlaki prensiplere dayalı bir duruş ve liderlik vasfı taşıyan fertler olarak yetişmelerini hedefleyen nitelikli bir eğitim platformudur.</p><p>TARF Akademi, üniversite gençliğini yalnızca mesleki bilgiyle değil; ahlâk, sorumluluk, düşünce disiplini ve toplumsal bilinçle donatmayı amaçlar. Bilginin hikmetle, bilimin irfanla buluştuğu bir anlayışla; çağın sorunlarını okuyabilen, çözüm üretebilen ve bulunduğu alana değer katan bireyler yetiştirmeyi hedefler.</p><p>Akademi, öğrencilerin entelektüel birikimlerini derinleştirirken; kişisel gelişim, liderlik, ahlaki farkındalık ve toplumsal sorumluluk bilinci kazanmalarını esas alır ve Türkiye’nin yarınlarını inşa edecek nitelikli insan kaynağını yetiştirmeyi stratejik bir sorumluluk olarak görür.</p>",
      "backgroundImage": ""
    },
    "slug": "akademi",
    "category": "akademi",
    "sections": [
      {
        "id": "purpose",
        "items": [
          {
            "title": "Misyon",
            "description": "TARF Akademi, üniversite gençliğini yalnızca mesleki bilgiyle değil; ahlâk, sorumluluk, düşünce disiplini ve toplumsal bilinçle donatmayı amaçlar. Bilginin hikmetle, bilimin irfanla buluştuğu bir anlayışla; çağın sorunlarını okuyabilen, çözüm üretebilen ve bulunduğu alana değer katan bireyler yetiştirmeyi hedefler."
          },
          {
            "title": "Vizyon",
            "description": "Akademi, öğrencilerin entelektüel birikimlerini derinleştirirken; kişisel gelişim, liderlik, etik farkındalık ve kamusal sorumluluk bilinci kazanmalarını esas alır. TARF Akademi, Türkiye’nin yarınlarını inşa edecek nitelikli insan kaynağını yetiştirmeyi stratejik bir sorumluluk olarak görür."
          },
          {
            "title": "Amaçlar",
            "bullets": [
              "Öğrencilerin alanlarının etik ve ahlaki ilkelerini güçlü bir şekilde öğrenmelerini sağlamak.",
              "Gençlere geleceğe yönelik sağlam bir kariyer yapılanması kazandırmak.",
              "Öğrencilerin profesyonel dünyada ihtiyaç duyacağı güçlü bir network ağı oluşturmak.",
              "Akademik becerileri destekleyen kişisel gelişim eğitimleri sunmak.",
              "Disiplinler arası bakış açısı kazandırarak farkındalığı yüksek bir akademik kimlik geliştirmek.",
              "Gençlerin toplumsal sorumluluk bilinciyle hareket eden değer odaklı bireyler olarak yetişmesine katkı sağlamak."
            ]
          }
        ],
        "title": "Misyon, vizyon ve amaçlarımız",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Varlık sebebi"
      },
      {
        "id": "modules",
        "items": [
          {
            "title": "Bilimsel içerikler",
            "description": "Özel hazırlanmış ders notları, okuma listeleri ve vaka analizleri."
          },
          {
            "title": "Araştırma görevleri",
            "description": "Saha gözlemleri, veri toplama ve rapor yazma ödevleri."
          },
          {
            "title": "Ders videoları",
            "description": "Stüdyo kalitesinde kayıtlarla desteklenen on-demand içerikler."
          },
          {
            "title": "Proje tabanlı eğitim",
            "description": "Her modül sonunda ekiplerce geliştirilen gerçek projeler."
          }
        ],
        "title": "Öğrenme yolculuğunu oluşturan içerikler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Akademi modülleri"
      },
      {
        "id": "tracks",
        "items": [
          {
            "title": "Eğitimler (Lisans)",
            "description": "Üniversite eğitimini destekleyen teknik ve sosyal modüller."
          },
          {
            "title": "Seminerler",
            "description": "TARF Akademi seminerleri, üniversitelerde düzenlenen ve öğrencilerin hem kendi alanlarına hem de güncel meselelere dair perspektif kazanmalarını amaçlayan içeriklerden oluşur. Alanında yetkin akademisyenler ve düşünce insanlarıyla gerçekleştirilen bu seminerler, öğrencilerin eleştirel düşünme ve analiz becerilerini geliştirmeyi hedefler. Seminer programları; mesleki etik, akademik sorumluluk, toplumsal meseleler ve değerler ekseninde şekillendirilerek öğrencilerin yalnızca \"bilgi sahibi\" değil, aynı zamanda \"bilgiyle sorumluluk taşıyan\" bireyler olmalarını amaçlar."
          },
          {
            "title": "Konferanslar",
            "description": "Konferanslar; üniversitelerde ve farklı entelektüel mekânlarda düzenlenen, daha geniş kitlelere hitap eden ilham verici buluşmalar olarak tasarlanır. Bu programlarda akademi, bürokrasi, sivil toplum ve düşünce dünyasından isimler, tecrübelerini ve birikimlerini gençlerle paylaşır. TARF Akademi konferansları, gençlerin ufkunu genişletmeyi; kariyer, ahlâk, liderlik ve toplumsal sorumluluk gibi başlıklarda bilinç oluşturarak onları uzun vadeli düşünmeye sevk etmeyi amaçlar."
          },
          {
            "title": "Çalıştaylar",
            "description": "Çalıştaylar, öğrencilerin aktif katılım gösterdiği, fikir ürettiği ve çözüm önerileri geliştirdiği uygulamalı programlardır. Üniversitelerde ve uygun görülen diğer alanlarda düzenlenen bu çalışmalar, teori ile pratiği buluşturan bir anlayışla yürütülür. Bu süreçte öğrenciler; analiz yapma, rapor hazırlama, birlikte düşünme ve ortak akıl üretme becerileri kazanır. TARF Akademi çalıştayları, gençleri pasif dinleyici olmaktan çıkarıp düşünce üreticisi hâline getirmeyi hedefler."
          },
          {
            "title": "Sertifika Programları",
            "description": "TARF Akademi Sertifika Programları, alanında duayen ve uzman isimler tarafından yürütülen; online ve yüz yüze formatlarda gerçekleştirilen nitelikli eğitimlerden oluşur. Bu programlar, öğrencilerin akademik ve mesleki gelişimlerini desteklemenin yanı sıra etik duruş ve liderlik becerilerini güçlendirmeyi amaçlar. Sertifika programları; kariyer bilinci kazandıran, değer temelli ve uzun vadeli bir kişisel gelişim sürecini esas alan bir yapı üzerine inşa edilmiştir. TARF Akademi, bu programlarla öğrencilerin hem bugününe hem de yarınına yatırım yapmayı hedefler."
          }
        ],
        "title": "Beş ana program hattı",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Program türleri",
        "description": "Her hat için detaylı sayfalar oluşturarak öğrencilerin doğru yolculuğu seçmesini kolaylaştırdık."
      },
      {
        "id": "approach",
        "items": [
          {
            "title": "Proje tabanlı öğrenme",
            "description": "Her öğrenci gelişim sürecini gerçek ürünlerle kanıtlar."
          },
          {
            "title": "Mentorluk sistemi",
            "description": "Sektör profesyonelleri ile birebir eşleşmeler."
          },
          {
            "title": "Online + offline",
            "description": "Karma öğrenme modeli ile erişilebilirlik."
          },
          {
            "title": "Kariyer desteği",
            "description": "CV, portfolyo, demo day ve işe yerleşme koçluğu."
          }
        ],
        "title": "Sınıfın ötesine geçen öğrenme",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Eğitim yaklaşımı"
      },
      {
        "id": "stories",
        "items": [
          {
            "title": "Teknoloji girişimleri",
            "description": "Akademi projelerinden doğan start-up hikayeleri."
          },
          {
            "title": "Uluslararası yarışmalar",
            "description": "Konferans ve takımlarda kazanılan ödüller."
          },
          {
            "title": "Toplumsal etki",
            "description": "Sosyal fayda projelerinin sahadaki sonuçları."
          }
        ],
        "title": "Öğrencilerimizin dönüşümü",
        "layout": "list",
        "eyebrow": "Başarı hikayeleri"
      }
    ]
  },
  {
    "cta": {
      "title": "Yazılım üretim yolculuğuna başla",
      "description": "Teknik kariyer hedeflerinizi bizimle paylaşın, size özel program veya danışmanlık paketini planlayalım.",
      "primaryAction": {
        "href": "contact",
        "label": "İletişim Kur"
      },
      "secondaryAction": {
        "href": "events",
        "label": "Projeleri Gör"
      }
    },
    "seo": {
      "title": "TARF Yazılım Teknolojileri | Eğitim ve Projeler",
      "description": "Mobil, web, yapay zekâ ve siber güvenlik alanlarındaki yazılım programları ve projeleri inceleyin."
    },
    "hero": {
      "stats": [
        {
          "label": "Aktif proje",
          "value": "55",
          "helper": "Öğrenci + kurumsal"
        },
        {
          "label": "Stack",
          "value": "25+",
          "helper": "Teknoloji"
        },
        {
          "label": "Mentor",
          "value": "70",
          "helper": "Kıdemli geliştirici"
        }
      ],
      "title": "TARF Yazılım Teknolojileri",
      "actions": [
        {
          "href": "yazilim",
          "label": "Programlara Göz At"
        },
        {
          "href": "contact",
          "label": "Danışmanlık Talep Et",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Yazılım Teknolojileri",
      "subtitle": "Dünya standartlarında teknik beceriler ve üretim yapan yazılım kültürü",
      "description": "Mobil uygulamalardan yapay zekâya uzanan yazılım eğitimleri, danışmanlık projeleri ve teknoloji stack’leri ile gençleri üretime hazırlıyoruz."
    },
    "slug": "yazilim",
    "category": "yazilim",
    "sections": [
      {
        "id": "domains",
        "items": [
          {
            "title": "Mobil geliştirme",
            "description": "React Native, Flutter, SwiftUI projeleri."
          },
          {
            "title": "Web teknolojileri",
            "description": "Next.js, Vue, Remix ve performans optimizasyonu."
          },
          {
            "title": "Yapay zekâ",
            "description": "ML pipeline, veri hazırlama ve etik yapay zekâ."
          },
          {
            "title": "Oyun geliştirme",
            "description": "Unity, Unreal ve indie oyun stüdyoları."
          },
          {
            "title": "Veri bilimi",
            "description": "ETL süreçleri, veri ambarı ve BI araçları."
          },
          {
            "title": "Siber güvenlik",
            "description": "UYUMLU kodlama, saldırı simülasyonları ve audit."
          }
        ],
        "title": "Uzmanlık başlıklarımız",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Teknoloji alanları"
      },
      {
        "id": "services",
        "items": [
          {
            "title": "Yazılım Geliştirme",
            "description": "Öğrenci ve profesyonel ekiplerle proje geliştirme."
          },
          {
            "title": "Teknoloji Danışmanlığı",
            "description": "Strateji, mimari ve süreç tasarımı."
          },
          {
            "title": "Siber Güvenlik",
            "description": "Sızma testi, güvenlik eğitimleri ve DevSecOps programları."
          }
        ],
        "title": "Eğitim + danışmanlık + üretim",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ana hizmetler"
      },
      {
        "id": "stack",
        "items": [
          {
            "title": "Frontend",
            "description": "React, Next.js, Vue, Tailwind, Radix."
          },
          {
            "title": "Backend",
            "description": "Node.js, NestJS, Laravel, Python FastAPI."
          },
          {
            "title": "Mobil",
            "description": "React Native, Flutter, Swift, Kotlin."
          },
          {
            "title": "AI/ML",
            "description": "TensorFlow, PyTorch, HuggingFace."
          },
          {
            "title": "Cloud",
            "description": "AWS, Azure, GCP, Terraform."
          },
          {
            "title": "DevOps",
            "description": "Docker, Kubernetes, GitHub Actions."
          }
        ],
        "title": "Kullandığımız araçlar",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Teknoloji stack"
      },
      {
        "id": "education",
        "items": [
          {
            "title": "Bootcamp serileri",
            "description": "8-12 haftalık yoğun eğitimler."
          },
          {
            "title": "Online kurslar",
            "description": "Kendi hızınızda tamamlanabilir modüller."
          },
          {
            "title": "Mentor eşleşmesi",
            "description": "Gerçek projelerde eşlik eden senior developerlar."
          }
        ],
        "title": "Bootcamp ve mentorluk",
        "layout": "list",
        "eyebrow": "Eğitim programları"
      }
    ]
  },
  {
    "cta": {
      "title": "Program danışmanından randevu al",
      "description": "Seviyenizi belirlemek ve doğru modülü seçmek için akademi danışmanlarımızla görüşün.",
      "primaryAction": {
        "href": "contact",
        "label": "Randevu Planla"
      },
      "secondaryAction": {
        "href": "akademi",
        "label": "Müfredatı Gör"
      }
    },
    "seo": {
      "title": "Lisans Düzeyi Eğitimler | TARF Akademi",
      "description": "Yazılım, bilim ve sosyal bilimlerde lisans seviyesinde derinlikli eğitim programları."
    },
    "hero": {
      "stats": [
        {
          "label": "Program süresi",
          "value": "8-20 hafta",
          "helper": "Modüler yapılar"
        },
        {
          "label": "Katılımcı",
          "value": "1.800+",
          "helper": "Lisans öğrencisi"
        },
        {
          "label": "İşe yerleşme",
          "value": "%78",
          "helper": "Program sonrası"
        }
      ],
      "title": "Lisans Düzeyi Eğitim Programları",
      "actions": [
        {
          "href": "akademi/egitimler",
          "label": "Program Listesi"
        },
        {
          "href": "contact",
          "label": "Danışmanla Görüş",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Akademi",
      "subtitle": "Üniversite eğitiminizi destekleyen derinlikli programlar",
      "description": "Teknoloji, bilim ve sosyal bilimler alanlarında yapılandırılmış dersler, yoğun mentor desteği ve proje teslimleri sunuyoruz."
    },
    "slug": "akademi/egitimler",
    "category": "akademi",
    "sections": [
      {
        "id": "tracks",
        "items": [
          {
            "title": "Yazılım Geliştirme Fundamentals",
            "description": "HTML, CSS, JS temelleri + modern frameworkler."
          },
          {
            "title": "Web Teknolojileri",
            "description": "Front-end mimarileri, performans optimizasyonu."
          },
          {
            "title": "Mobil Uygulama",
            "description": "React Native ve Flutter ile proje geliştirme."
          },
          {
            "title": "Veri Bilimi & Analitik",
            "description": "Python, veri temizleme, görselleştirme, ML temelleri."
          },
          {
            "title": "Yapay Zeka Temelleri",
            "description": "Model mantığı, etik yaklaşımlar ve uygulamalar."
          },
          {
            "title": "Araştırma Metodolojisi",
            "description": "Bilimsel yazım, istatistik ve veri doğrulama."
          },
          {
            "title": "Sosyoloji & Psikoloji",
            "description": "Toplumsal analiz ve insan davranışı."
          },
          {
            "title": "Felsefe & Düşünce Tarihi",
            "description": "İrfan perspektifi ile düşünsel derinlik."
          }
        ],
        "title": "Teknoloji, bilim ve sosyal bilimler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Program listesi"
      },
      {
        "id": "format",
        "items": [
          {
            "title": "Canlı dersler",
            "description": "Uzman eğitmenlerle interaktif oturumlar."
          },
          {
            "title": "Video içerikler",
            "description": "Dilediğiniz zaman erişebileceğiniz kayıtlar."
          },
          {
            "title": "Ödev & projeler",
            "description": "Gerçek ürünler ve kod incelemeleri."
          },
          {
            "title": "Mentor saatleri",
            "description": "Kişisel geri bildirimler ve kariyer yönlendirmesi."
          }
        ],
        "title": "Hibrit deneyim",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öğrenme formatı"
      },
      {
        "id": "pricing",
        "items": [
          {
            "title": "Burs olanakları",
            "description": "Başarı ve ihtiyaç temelli burs kontenjanları."
          },
          {
            "title": "Taksit seçenekleri",
            "description": "Ödeme kolaylığı sunan finans planları."
          },
          {
            "title": "Kurumsal paket",
            "description": "Şirketler için toplu kayıt ve özel raporlama."
          },
          {
            "title": "Kayıt süreci",
            "description": "Başvuru formu, seviye analizi ve oryantasyon."
          }
        ],
        "title": "Erişilebilir paketler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ücretlendirme & kayıt"
      }
    ]
  },
  {
    "cta": {
      "title": "Etik süreçlerle ilgili sorularınız mı var?",
      "description": "Etik kurulumuza ulaşarak süreçler hakkında ayrıntılı bilgi alabilir, ihtiyaç duyarsanız danışmanlık talep edebilirsiniz.",
      "primaryAction": {
        "href": "contact",
        "label": "Etik Kurula Yaz"
      },
      "secondaryAction": {
        "href": "yonetim-ilkeleri",
        "label": "Politika Kitaplığı"
      }
    },
    "seo": {
      "title": "TARF Etik Beyanı | Sorumlu Teknoloji ve Eğitim",
      "description": "İnsan onuru, bilimsel dürüstlük ve veri güvenliği üzerine inşa edilen etik ilkelerimizi inceleyin."
    },
    "hero": {
      "title": "Bilginin sorumluluğunu taşıyoruz",
      "actions": [
        {
          "href": "etik-beyan",
          "label": "Etik İlkeler"
        },
        {
          "href": "contact",
          "label": "İhlal Bildir",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Etik Beyan",
      "subtitle": "Akademik dürüstlük, veri güvenliği ve toplumsal fayda için etik manifestomuz",
      "description": "Her öğrencimizin ve ekip arkadaşımızın bağlı olduğu etik ilkeler, TARF Akademi’nin güvenilirliğinin temeli."
    },
    "slug": "etik-beyan",
    "category": "kurumsal",
    "sections": [
      {
        "id": "foundation",
        "items": [
          {
            "title": "İnsan onuru",
            "description": "Tüm faaliyetlerde insan haklarına saygı ve kapsayıcılık."
          },
          {
            "title": "Bilimsel dürüstlük",
            "description": "Araştırmalarda kaynak, veri ve yöntem şeffaflığı."
          },
          {
            "title": "Çıkar çatışması",
            "description": "Karar süreçlerinde çıkar çatışmalarını beyan etme zorunluluğu."
          },
          {
            "title": "Sorumlu teknoloji",
            "description": "Topluma zarar vermeyen, faydayı önceleyen üretim"
          }
        ],
        "title": "Etik yaklaşımımızın dayanakları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Temel ilkeler"
      },
      {
        "id": "code",
        "items": [
          {
            "title": "Eşitlik ve kapsayıcılık",
            "description": "Hiçbir kişi cinsiyet, dil, din veya görüş nedeniyle ayrımcılığa uğramaz."
          },
          {
            "title": "Akademik dürüstlük",
            "description": "Plagiarism, veri manipülasyonu ve yanlış beyanda sıfır tolerans."
          },
          {
            "title": "Profesyonel iletişim",
            "description": "Her durumda saygılı dil kullanımı ve tarafsız moderasyon."
          },
          {
            "title": "Kaynak paylaşımı",
            "description": "Yazılım lisansları ve kaynak kodlarının sorumlu kullanımı."
          }
        ],
        "title": "Programlarda beklenen davranış modeli",
        "layout": "list",
        "eyebrow": "Davranış kodu",
        "description": "Öğrenciler, mentorlar, çalışanlar ve iş ortaklarının uyması gereken kurallar açıkça tanımlanmıştır."
      },
      {
        "id": "data",
        "items": [
          {
            "title": "Şeffaf izin süreci",
            "description": "KVKK uyumlu açık rıza formları ve seçenek sunan süreçler."
          },
          {
            "title": "Minimum veri",
            "description": "İhtiyaç olmayan kişisel veri toplanmaz, anonimleştirme tercih edilir."
          },
          {
            "title": "Erişim kontrolleri",
            "description": "Veri tabanlarına rol bazlı erişim, düzenli penetrasyon testleri."
          },
          {
            "title": "Veri ihlali protokolü",
            "description": "24 saat içinde bildirim, iyileştirme planı ve paydaş bilgilendirmesi."
          }
        ],
        "title": "Veri toplama ve kullanma prensipleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Veri etiği"
      },
      {
        "id": "academic",
        "items": [
          {
            "title": "Etik kurul",
            "description": "Araştırma projeleri etik kurula sunulur, onaylanmadan yayınlanmaz."
          },
          {
            "title": "Veri paylaşımı",
            "description": "Paylaşılan her veri seti anonimleştirilir ve lisans bilgisi içerecek şekilde arşivlenir."
          },
          {
            "title": "Mentor gözetimi",
            "description": "Öğrenci projelerinde deneyimli mentorlar süreçleri raporlar."
          },
          {
            "title": "Açık erişim",
            "description": "Üretilen bilgi mümkün olduğunca açık aksesuar ile paylaşılır."
          }
        ],
        "title": "Araştırma süreçlerinde etik uygulamalar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Bilimsel sorumluluk"
      },
      {
        "id": "reporting",
        "items": [
          {
            "title": "Anonim form",
            "description": "web ve fiziksel kutular aracılığıyla 7/24 açık."
          },
          {
            "title": "Ön değerlendirme",
            "description": "Etik komitesi ilk 48 saat içinde yanıt verir."
          },
          {
            "title": "Soruşturma",
            "description": "Tarafsız ekip, ilgili tarafları dinler ve kanıt toplar."
          },
          {
            "title": "Sonuç & iyileştirme",
            "description": "Kararlar yazılı olarak bildirilir, gerekirse programlar güncellenir."
          }
        ],
        "title": "Etik ihlal bildirim süreçleri",
        "layout": "list",
        "eyebrow": "Bildir ve takip et",
        "ordered": true,
        "description": "İhlal şüphesi varsa anonim olarak bildirim yapılabilir. Soruşturmalar bağımsız kurul tarafından yürütülür."
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Çalıştay Programları | TARF Akademi",
      "description": "Kod, inovasyon ve kişisel gelişim çalıştayları hakkında detaylar ve kayıt süreci."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Yıllık çalıştay",
          "value": "90",
          "helper": "Teknik + yaratıcı"
        },
        {
          "label": "Katılımcı",
          "value": "2.700",
          "helper": "Mikro öğrenme"
        },
        {
          "label": "Mentor",
          "value": "65",
          "helper": "Usta eğitmen"
        }
      ],
      "title": "Uygulamalı Çalıştaylar",
      "actions": [],
      "eyebrow": "Akademi",
      "subtitle": "Ortak akıl üretme...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Genel katılıma açık olan Çalıştaylar, toplumu ilgilendiren başlıklarda fikir üretilen ve çözüm önerileri geliştirilen uygulamalı programlardır. Üniversitelerde ve uygun görülen diğer alanlarda düzenlenen bu çalışmalar, teori ile pratiği buluşturan bir anlayışla yürütülür.</p><p>Bu süreçte öğrenciler; analiz yapma, rapor hazırlama, birlikte düşünme ve ortak akıl üretme becerileri kazanır. TARF Çalıştayları, gençleri pasif dinleyici olmaktan çıkarıp düşünce üreticisi hâline getirmeyi hedefler.</p>",
      "backgroundImage": ""
    },
    "slug": "akademi/calistaylar",
    "category": "akademi",
    "sections": [
      {
        "id": "types",
        "items": [
          {
            "title": "Kod atölyeleri",
            "description": "Hackathon hazırlığı, API geliştirme, test otomasyonu."
          },
          {
            "title": "Maker workshop",
            "description": "Arduino, robotik, 3D baskı uygulamaları."
          },
          {
            "title": "Design thinking",
            "description": "Problem çözme ve prototip sprintleri."
          },
          {
            "title": "İnovasyon atölyeleri",
            "description": "Ürün fikirlerini tasarlama ve test etme."
          },
          {
            "title": "Sunum & iletişim",
            "description": "Pitch hazırlığı, hikaye anlatıcılığı."
          },
          {
            "title": "Takım çalışması",
            "description": "Agile ritüeller, iş bölümü ve liderlik."
          }
        ],
        "title": "Teknik, yaratıcı ve kişisel gelişim",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Çalıştay türleri"
      },
      {
        "id": "workflow",
        "items": [
          {
            "title": "Başvuru formu",
            "description": "İlgi alanı ve hedef belirten kısa form."
          },
          {
            "title": "Seviye değerlendirmesi",
            "description": "Temel bilgi ve motivasyon testi."
          },
          {
            "title": "Oturum planı",
            "description": "Katılımcılara özel program gönderilir."
          },
          {
            "title": "Demo day",
            "description": "Üretimler ortak sunumla paylaşılır."
          }
        ],
        "title": "Kayıt ve seçim",
        "layout": "list",
        "eyebrow": "Katılım süreci",
        "ordered": true
      },
      {
        "id": "gallery",
        "items": [
          {
            "title": "Foto & video",
            "description": "Geçmiş etkinliklerden ilham verici görüntüler."
          },
          {
            "title": "Katılımcı hikayeleri",
            "description": "Yorumlar, reels videoları ve sosyal medya paylaşımları."
          },
          {
            "title": "Araç setleri",
            "description": "Çalıştay sonrası verilen template ve araç listeleri."
          },
          {
            "title": "Takip programları",
            "description": "Çalıştay sonrası mentorluk seçenekleri."
          }
        ],
        "title": "Çalıştaydan kareler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Deneyim"
      }
    ]
  },
  {
    "cta": {
      "title": "Kökleri Sağlam Nesiller İçin...",
      "description": "Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Aile Araştırmaları | TARF Düşünce Enstitüsü",
      "description": "Ebeveynlik, aile iletişimi ve danışmanlık programları hakkında detaylı bilgi alın."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Aile atölyesi",
          "value": "120",
          "helper": "Yıllık"
        },
        {
          "label": "Danışman uzman",
          "value": "28",
          "helper": "Psikolog & sosyolog"
        },
        {
          "label": "Memnuniyet",
          "value": "%94",
          "helper": "Program değerlendirme"
        }
      ],
      "title": "Aile ",
      "actions": [],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Milli ve yerli değerlerimizi merkeze alan, kökleri sağlam nesiller için...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Milli ve yerli değerlerimizi merkeze alan, irfani bakış açısıyla bilimsel veriyi hikmetle buluşturan çalışmalarımızda toplumun temelini oluşturan “Aile” kapsamında, geçmişten gelen tecrübelerle geleceğin ihtiyaçlarını birlikte düşünerek ele alınması hedeflenir.</p><p>Bu hedef doğrultusunda üniversitelerle ve yerel yönetimlerle çalıştaylar ve sempozyumlar düzenlenir. Akademisyenler, uygulayıcılar ve sivil aktörlerin katkısıyla, aile politikalarına yön verecek milli çözümler sunan kapsamlı raporlar hazırlanır. Bunlar geniş katılımlı lansmanlarla kamuoyuyla paylaşılır.</p><p>“Aile”nin korunması anlamında, ailenin sürekliliğini destekleyen, toplumsal huzuru önceleyen yaklaşımların üretilmesi amaçlayan, küresel etkiler karşısında yerli duruşu koruyan, ortak akıl önemseyen, nesiller arası bağları güçlendiren, sahaya dayalı araştırmalarla politika yapıcıları besleyen, yerel deneyimleri ulusal vizyonla birleştiren, kalıcı etki hedefleyen, değer odaklı sosyal dayanışmayı güçlendiren öneriler geliştirilir.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/aile",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Aile dinamikleri",
            "description": "Sosyo-kültürel değişimlerin aile yapısına etkisi."
          },
          {
            "title": "Ebeveyn-çocuk iletişimi",
            "description": "Etkili iletişim teknikleri ve eğitimler."
          },
          {
            "title": "Aile danışmanlığı",
            "description": "Evlilik, ilişki ve kriz yönetimi protokolleri."
          },
          {
            "title": "Nesiller arası etkileşim",
            "description": "Kültürel aktarım ve birlikte öğrenme."
          },
          {
            "title": "Dijital ebeveynlik",
            "description": "Teknoloji kullanımında rehberlik."
          }
        ],
        "title": "Aile kurumuna dair içgörüler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Ebeveyn okulu",
            "description": "Atölyeler, seminerler ve mentorluk oturumları."
          },
          {
            "title": "Aile danışma hattı",
            "description": "Uzman psikolog ve danışman desteği."
          },
          {
            "title": "Aile atölyeleri",
            "description": "Ortak etkinlikler ve deneyim paylaşımı."
          },
          {
            "title": "Evlilik öncesi program",
            "description": "İlişki becerileri ve çatışma yönetimi modülleri."
          }
        ],
        "title": "Aileler için uygulamalar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Destek programları"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "Aile İklimi Raporu",
            "description": "Türkiye’de aile yapısının güncel durumu."
          },
          {
            "title": "Uzman yazıları",
            "description": "Psikolog ve akademisyenlerden düzenli makaleler."
          },
          {
            "title": "Destek platformu",
            "description": "Online içerikler ve kaynak bankası."
          },
          {
            "title": "Topluluk buluşmaları",
            "description": "Aileler arası deneyim paylaşımı."
          }
        ],
        "title": "Raporlar ve hikayeler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan içerikler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Program sponsoru olun",
            "description": "Atölye ve seminerleri destekleyin."
          },
          {
            "title": "Veri paylaşımı yapın",
            "description": "Saha gözlemlerinizi araştırma ekibiyle paylaşın."
          },
          {
            "title": "Uzman ağımıza katılın",
            "description": "Psikolog ve danışman olarak gönüllü olun."
          }
        ],
        "title": "Ailelere destek verin",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Sertifika Programları | TARF Akademi",
      "description": "Yazılım ve teknoloji odaklı uluslararası sertifika programları hakkında bilgi alın."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Program sayısı",
          "value": "14",
          "helper": "Yetkinlik odaklı"
        },
        {
          "label": "Uluslararası onay",
          "value": "6",
          "helper": "Akreditasyon"
        },
        {
          "label": "Dijital rozet",
          "value": "100%",
          "helper": "Paylaşılabilir sertifika"
        }
      ],
      "title": "Sertifika Programları",
      "actions": [
        {
          "href": "events",
          "label": "Programları Gör"
        }
      ],
      "eyebrow": "Akademi",
      "subtitle": "Akademik ve mesleki gelişim...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Alanında yetkin ve uzman isimler tarafından yürütülen; online ve yüz yüze formatlarda gerçekleştirilen nitelikli eğitimlerden oluşur. Bu programlar, öğrencilerin akademik ve mesleki gelişimlerini desteklemenin yanı sıra ahlaki duruş ve liderlik becerilerini güçlendirmeyi amaçlar.</p><p>Sertifika programları; kariyer bilinci kazandıran, değer temelli ve uzun vadeli bir kişisel gelişim sürecini esas alan bir yapı üzerine inşa edilmiştir. TARF Akademi, bu programlarla öğrencilerin hem bugününe hem de yarınına yatırım yapmayı hedefler.</p>",
      "backgroundImage": ""
    },
    "slug": "akademi/sertifika-programlari",
    "category": "akademi",
    "sections": [
      {
        "id": "programs",
        "items": [
          {
            "title": "Yazılım sertifikaları",
            "description": "Full-stack, front-end ve backend odaklı izler."
          },
          {
            "title": "Yapay zekâ",
            "description": "ML ops, veri hazırlama ve etik yapay zekâ."
          },
          {
            "title": "Veri bilimi",
            "description": "Python, SQL ve görselleştirme modülleri."
          },
          {
            "title": "Kişisel gelişim",
            "description": "Teknoloji temelli liderlik ve iletişim."
          },
          {
            "title": "Proje tamamlama",
            "description": "Capstone projeleri ve jüri sunumları."
          }
        ],
        "title": "Sertifika başlıkları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Program listesi"
      },
      {
        "id": "features",
        "items": [
          {
            "title": "Uluslararası geçerlilik",
            "description": "Akredite kurumlarla yapılan anlaşmalar."
          },
          {
            "title": "Dijital doğrulama",
            "description": "Blockchain tabanlı sertifika doğrulama linkleri."
          },
          {
            "title": "LinkedIn entegrasyonu",
            "description": "Tek tıkla profilinize eklenir."
          },
          {
            "title": "Portfolio değeri",
            "description": "Sertifika ile ilişkili proje ve case study gerekliliği."
          }
        ],
        "title": "Sertifika deneyimi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Program özellikleri"
      },
      {
        "id": "apply",
        "items": [
          {
            "title": "Ön başvuru",
            "description": "Kısa motivasyon formu ve CV yükleme."
          },
          {
            "title": "Teknik değerlendirme",
            "description": "Gerekli ise seviye testi."
          },
          {
            "title": "Mentor görüşmesi",
            "description": "Program uyumunu birlikte değerlendiririz."
          },
          {
            "title": "Ödeme & başlangıç",
            "description": "Taksit veya sponsorluk seçenekleri."
          }
        ],
        "title": "Kayıt adımları",
        "layout": "list",
        "eyebrow": "Başvuru süreci",
        "ordered": true
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Akademi Hakkında | Bilim, Teknoloji ve İrfan Platformu",
      "description": "TARF Akademi’nin kuruluş hikayesini, misyonunu, değerlerini ve üretim alanlarını keşfedin. Gençleri geleceğe hazırlayan çok katmanlı eğitim ekosistemi."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Öğrenci & Mezun",
          "value": "12.500+",
          "helper": "Akademi ve topluluk programları"
        },
        {
          "label": "Araştırma & Proje",
          "value": "380+",
          "helper": "Bilim, teknoloji ve kültür"
        },
        {
          "label": "Konferans & Etkinlik",
          "value": "210+",
          "helper": "Ulusal ve uluslararası buluşmalar"
        }
      ],
      "title": "Hakkımızda",
      "actions": [],
      "eyebrow": "Kurumsal",
      "subtitle": "Enstitümüz, sosyal sorumluluk ve gönüllülük ilkelerini merkeze alır. ",
      "videoUrl": "",
      "highlight": "2008’den bu yana binlerce gençle üretim yolculuğu",
      "description": "<p><strong>Enstitümüz;</strong> bilgi ile hikmeti, teknoloji ile irfanı buluşturma hedefiyle kurulmuş, düşünce üretimini toplumsal faydaya dönüştürmeyi amaçlayan bağımsız bir düşünce ve uygulama merkezidir. Çağın hızla değişen teknolojik dinamiklerini, kadim medeniyet birikimimizin derinlikli bakışıyla birlikte ele alır. Bilginin yalnızca üretilen değil, anlamlandırılan ve hayata taşınan bir değer olduğuna inanır.</p><p><strong>Bu anlayışla Enstitü olarak;</strong></p><ul><li>Araştırmalar,</li><li>Projeler,</li><li>Seminerler,</li><li>Sempozyumlar,</li><li>Çalıştaylar,</li><li>Eğitim programları yürütüyor; akademi, sivil toplum, gençlik ve teknoloji ekosistemleri arasında köprüler kuruyoruz.</li></ul><p><strong>Çalışmalarımız;</strong></p><ul><li>Aile,</li><li>Gençlik,</li><li>Eğitim,</li><li>Akademisi,</li><li>Yazılım ve teknolojileri,</li><li>Uzay çalışmaları,</li><li>Tarih, kültür ve medeniyet tasavvuru,</li><li>Uluslararası ilişkiler,</li></ul><p>gibi geniş bir yelpazeye yayılmaktadır. Özellikle öğrenci kulüpleri ve öğrenci teknoloji takımları aracılığıyla gençlerin üretkenliğini destekleyerek, düşünmeyi, tasarlamayı ve sorumluluk almayı teşvik eden ortamlar oluşturuyoruz.</p><p>Sosyal sorumluluk ve gönüllülük ilkelerini merkeze alan Enstitümüz, toplumsal meseleleri yalnızca teorik düzeyde tartışmakla yetinmez; sahaya dokunan, sürdürülebilir ve insan onurunu önceleyen çözümler üretmeyi hedefler. Gençlerin, akademisyenlerin, uzmanların ve gönüllülerin ortak akılla katkı sunduğu katılımcı bir yapı inşa eder. Teknolojiyi bir araç; irfanın ise yön tayin eden bir pusula olduğuna inanır. Geleceği inşa ederken köklerini unutmadan, yeniliği üretirken hikmeti rehber edinen bir düşünce iklimi oluşturma amacındadır.</p>",
      "backgroundImage": ""
    },
    "slug": "hakkimizda",
    "category": "kurumsal",
    "sections": [
      {
        "id": "timeline",
        "items": [
          {
            "title": "Kuruluş metni",
            "description": "TARF Düşünce Enstitüsü, bilimle irfanı aynı potada eriten, düşünceyi gençliğin dinamizmiyle buluşturan bir merkez fikrinden doğdu. Bu toprakların birikimini, köklü medeniyet mirasını ve çağın ihtiyaçlarını bir araya getirerek yeni bir düşünce ekolü oluşturma idealine sahip bir grup akademisyen, araştırmacı ve gençlik öncüsünün uzun yıllara yayılan gayretlerinin neticesi olarak kuruldu."
          },
          {
            "title": "Varlık sebebi",
            "description": "Enstitünün temel hedefi; gençlerin fikir üretme kabiliyetlerini güçlendirmek, akademik çalışmaları sahadaki karşılığıyla buluşturmak ve Türkiye’nin düşünce dünyasına nitelikli katkılar sunmaktı. TARF, yalnızca bilgi aktaran bir kurum değil; hakikati araştıran, analiz eden, çözüm üreten ve gençliğe yol açan bir fikir atölyesi olma iddiasıyla yola çıktı."
          }
        ],
        "title": "Bilimle irfanı buluşturan kuruluş hikayemiz",
        "layout": "list",
        "eyebrow": "Kuruluş hikayemiz"
      },
      {
        "id": "mission",
        "items": [
          {
            "title": "Misyon",
            "bullets": [
              "Bilimsel araştırma kültürü kazandırmak",
              "Yazılım üretim kabiliyetini güçlendirmek",
              "Toplumsal faydayı önceleyen projeler üretmek"
            ],
            "description": "Bilgi, teknoloji ve değer temelli eğitimi birleştirerek gençleri zihinsel, kültürel ve teknolojik açıdan geleceğe hazırlamak."
          },
          {
            "title": "Vizyon",
            "bullets": [
              "Ar-Ge ve inovasyon yatırımları",
              "Ulusal ve uluslararası ağlarla iş birlikleri",
              "Gençleri dünya standartlarına taşıyan programlar"
            ],
            "description": "Türkiye’nin ve bölgenin en yenilikçi, en üretken ve en güvenilir teknoloji–akademi ekosistemi olmak."
          }
        ],
        "title": "Misyon ve vizyon",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Varlık sebebimiz"
      },
      {
        "id": "values",
        "items": [
          {
            "title": "Yenilikçilik",
            "description": "Geleceğin teknolojilerine uyum sağlayan eğitim modelleri geliştiririz."
          },
          {
            "title": "Üretkenlik",
            "description": "Bilgiyi pratiğe dönüştüren proje tabanlı öğrenmeyi merkezde tutarız."
          },
          {
            "title": "Etik ve Değerler",
            "description": "Bilginin sorumluluğunu taşıyan ahlaklı teknoloji kültürü yayarız."
          },
          {
            "title": "Toplumsal Fayda",
            "description": "Üreten bireylerin toplumun dönüşümünde aktif rol almasını destekleriz."
          },
          {
            "title": "İşbirliği",
            "description": "Takım çalışması, paylaşım ve ortak proje kültürüyle ilerleriz."
          },
          {
            "title": "Sürekli Öğrenme",
            "description": "Bilim, teknoloji ve yazılımda kesintisiz gelişim ortamı sunarız."
          },
          {
            "title": "Güven",
            "description": "Gençlerin gelişimini önceleyen şeffaf bir yapı kurarız."
          }
        ],
        "title": "Güven veren ilkeler",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "Değerlerimiz"
      },
      {
        "id": "services",
        "items": [
          {
            "title": "Akademi",
            "description": "Bilimsel içerikler, okuma listeleri, araştırma görevleri ve proje tabanlı eğitim modeli."
          },
          {
            "title": "TARF Dergi",
            "description": "Teknoloji ve akademik düşünceyi bir araya getiren dijital yayın platformu."
          },
          {
            "title": "Yazılım Teknolojileri",
            "description": "Mobil uygulamadan yapay zekâya uzanan yazılım eğitimleri ve üretim projeleri."
          },
          {
            "title": "Teknoloji Takımları",
            "description": "Robotik, oyun geliştirme, AR/VR ve araştırma takımlarıyla gerçek üretim deneyimi."
          },
          {
            "title": "Konferanslar",
            "description": "Teknoloji, bilim, kültür ve yapay zekâ odağında düzenlenen geniş kapsamlı buluşmalar."
          },
          {
            "title": "Teknoloji Kafe",
            "description": "Öğrencilerin buluştuğu, projelerini tartıştığı ve mentorlarla görüştüğü sosyal alan."
          },
          {
            "title": "Sertifika Programları",
            "description": "Uluslararası geçerliliği olan ve kariyer yolculuğunu güçlendiren sertifika serileri."
          }
        ],
        "title": "Ne yapıyoruz?",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ekosistemimiz",
        "description": "TARF Akademi çatısında yer alan her yapı, gençlerin farklı ihtiyaçlarına cevap veren üretim alanları oluşturur."
      },
      {
        "id": "team",
        "items": [
          {
            "title": "Yönetim Kadrosu",
            "description": "Strateji, finans, insan kaynağı ve operasyon ekipleri TARF Akademi’nin sürdürülebilirliğini garanti eder."
          },
          {
            "title": "Akademik Kadro",
            "description": "Bilim insanları, araştırmacılar ve eğitim tasarımcıları program içeriklerini yönetir."
          },
          {
            "title": "Danışmanlar",
            "description": "Sektör uzmanları ve teknoloji liderleri, öğrencilerin kariyer yolculuklarına mentorluk sağlar."
          }
        ],
        "title": "Ekibimiz ve danışmanlarımız",
        "layout": "grid",
        "columns": 3,
        "eyebrow": "İnsan odaklı yapı",
        "description": "Farklı disiplinlerden uzmanlar aynı amaç doğrultusunda çalışır: gençlere üretim gücü kazandırmak."
      },
      {
        "id": "impact",
        "stats": [
          {
            "label": "Aktif program",
            "value": "48",
            "helper": "Akademi, düşünce, yazılım ve topluluk"
          },
          {
            "label": "Topluluk üyesi",
            "value": "6.800",
            "helper": "Kulüpler ve teknoloji takımları"
          },
          {
            "label": "Yayınlanan içerik",
            "value": "1.200+",
            "helper": "Makale, rapor ve multimedya"
          },
          {
            "label": "Mentor havuzu",
            "value": "95",
            "helper": "Akademisyen, mühendis, girişimci"
          }
        ],
        "title": "Güvene dayalı etki",
        "layout": "stats",
        "eyebrow": "Sayılarla TARF"
      }
    ]
  },
  {
    "cta": {
      "title": "Gizlilik politikasıyla ilgili sorularınızı paylaşın",
      "description": "KVKK kapsamındaki taleplerinizi iletebilirsiniz; ekibimiz 30 gün içinde dönüş sağlar.",
      "primaryAction": {
        "href": "contact",
        "label": "İletişime Geç"
      },
      "secondaryAction": {
        "href": "cerez-politikasi",
        "label": "Çerez Politikası"
      }
    },
    "seo": {
      "title": "Gizlilik Politikası | TARF",
      "description": "KVKK ve ilgili mevzuat kapsamında gizlilik politikamızı ve veri işleme amaçlarını inceleyin."
    },
    "hero": {
      "title": "Gizlilik Politikası",
      "actions": [
        {
          "href": "gizlilik-politikasi",
          "label": "PDF İndir"
        },
        {
          "href": "contact",
          "label": "Sorularınızı İletin",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Yasal",
      "subtitle": "Kişisel verilerinizin işlenmesine ilişkin aydınlatma",
      "description": "6698 sayılı KVKK ve ilgili mevzuat kapsamında; kişisel verilerinizi hangi amaçlarla işlediğimizi, kimlerle paylaşabileceğimizi ve haklarınızı açıklarız."
    },
    "slug": "gizlilik-politikasi",
    "category": "yasal",
    "sections": [
      {
        "id": "toc",
        "items": [
          {
            "title": "Kapsam ve veri sorumlusu",
            "description": "Aydınlatma kapsamı ve sorumlu taraf."
          },
          {
            "title": "İşlenen veri kategorileri",
            "description": "Kimlik, iletişim, işlem güvenliği ve kullanım verileri."
          },
          {
            "title": "İşleme amaçları ve hukuki sebepler",
            "description": "KVKK kapsamında işleme temelleri."
          },
          {
            "title": "Aktarım ve üçüncü taraflar",
            "description": "Hizmet sağlayıcılar ve yasal yükümlülükler."
          },
          {
            "title": "Saklama ve imha",
            "description": "Süreler ve imha yöntemleri."
          },
          {
            "title": "KVKK kapsamındaki haklar",
            "description": "Başvuru ve itiraz hakları."
          },
          {
            "title": "Başvuru ve iletişim",
            "description": "İletişim kanalları ve yanıt süresi."
          },
          {
            "title": "Çerezler",
            "description": "Çerez ve benzeri teknolojilere ilişkin bilgilendirme."
          }
        ],
        "title": "Politika başlıkları",
        "layout": "list",
        "eyebrow": "İçindekiler",
        "ordered": true
      },
      {
        "id": "scope",
        "items": [
          {
            "title": "Veri sorumlusu",
            "description": "TARF Akademi, kişisel verilerin işlenmesinden sorumludur."
          },
          {
            "title": "Uygulama alanı",
            "description": "Web sitesi, başvuru formları, etkinlik ve iletişim süreçleri."
          },
          {
            "title": "Tanımlar",
            "description": "Kişisel veri, özel nitelikli veri ve ilgili kişi kavramları."
          },
          {
            "title": "Güncellemeler",
            "description": "Politika değişiklikleri bu sayfada yayımlanır."
          }
        ],
        "title": "Bu politika neyi kapsar?",
        "layout": "list",
        "eyebrow": "Kapsam"
      },
      {
        "id": "data",
        "items": [
          {
            "title": "Kimlik ve iletişim",
            "description": "Ad, soyad, e-posta, telefon ve kurum/okul bilgisi."
          },
          {
            "title": "İşlem güvenliği",
            "description": "IP adresi, cihaz/tarayıcı bilgileri, log kayıtları."
          },
          {
            "title": "Kullanım verileri",
            "description": "Sayfa ziyaretleri, tıklamalar ve form içerikleri."
          },
          {
            "title": "Etkinlik katılımı",
            "description": "Başvuru, kayıt, yoklama ve geri bildirim kayıtları."
          }
        ],
        "title": "Hangi verileri işleyebiliriz?",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Toplanan veriler"
      },
      {
        "id": "usage",
        "items": [
          {
            "title": "Hizmet sunumu",
            "description": "Başvuru ve program süreçlerinin yürütülmesi; sözleşmenin kurulması/ifası."
          },
          {
            "title": "İletişim",
            "description": "Talep ve şikayet yönetimi; meşru menfaat veya açık rıza."
          },
          {
            "title": "Güvenlik",
            "description": "Siber güvenlik, sahtecilik önleme; meşru menfaat."
          },
          {
            "title": "Yasal yükümlülükler",
            "description": "Mevzuattan doğan yükümlülüklerin yerine getirilmesi."
          }
        ],
        "title": "İşleme amaçları ve hukuki sebepler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "İşleme amaçları"
      },
      {
        "id": "transfer",
        "items": [
          {
            "title": "Hizmet sağlayıcılar",
            "description": "Barındırma, e-posta, analiz, ödeme ve teknik destek sağlayıcıları."
          },
          {
            "title": "Yasal zorunluluklar",
            "description": "Yetkili kurum ve kuruluşlara mevzuat gereği paylaşım."
          },
          {
            "title": "Yurt dışı aktarım",
            "description": "KVKK ve ilgili mevzuata uygun güvence mekanizmalarıyla."
          }
        ],
        "title": "Veri aktarımı ve üçüncü taraflar",
        "layout": "list",
        "eyebrow": "Aktarım"
      },
      {
        "id": "retention",
        "items": [
          {
            "title": "Saklama süresi",
            "description": "İşleme amacı için gerekli süre ve mevzuatta öngörülen süre kadar."
          },
          {
            "title": "İmha",
            "description": "Süre sonunda silme, yok etme veya anonimleştirme."
          },
          {
            "title": "Özel nitelikli veriler",
            "description": "Gerektiğinde KVKK m.6 şartlarına uygun şekilde işlenir."
          }
        ],
        "title": "Saklama ve imha",
        "layout": "list",
        "eyebrow": "Saklama"
      },
      {
        "id": "rights",
        "items": [
          {
            "title": "Bilgi talep etme",
            "description": "Kişisel verilerinizin işlenip işlenmediğini öğrenme ve bilgi isteme."
          },
          {
            "title": "Düzeltme & silme",
            "description": "Eksik/yanlış verilerin düzeltilmesini, silinmesini veya yok edilmesini talep etme."
          },
          {
            "title": "Aktarım bilgisi",
            "description": "Aktarıldığı üçüncü kişileri öğrenme ve işlemlerin bildirilmesini isteme."
          },
          {
            "title": "İtiraz ve tazmin",
            "description": "Otomatik işlemler aleyhine sonuçlara itiraz ve zarar halinde tazmin."
          }
        ],
        "title": "KVKK kapsamındaki haklar",
        "layout": "list",
        "eyebrow": "Haklarınız"
      },
      {
        "id": "contact",
        "items": [
          {
            "title": "E-posta",
            "description": "İletişim sayfasında yer alan e-posta üzerinden KVKK başvurusu yapabilirsiniz."
          },
          {
            "title": "Posta",
            "description": "İletişim sayfasında yer alan posta adresi üzerinden başvurabilirsiniz."
          },
          {
            "title": "Yanıt süresi",
            "description": "Başvurular 30 gün içinde sonuçlandırılır."
          },
          {
            "title": "Ücretlendirme",
            "description": "Başvurular ücretsizdir; Kurul tarifesi kapsamında ücret alınabilir."
          }
        ],
        "title": "Başvuru ve iletişim",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Başvuru"
      },
      {
        "id": "cookies",
        "items": [
          {
            "title": "Ayrı politika",
            "description": "Çerez kullanımı ve tercih yönetimi için Çerez Politikası geçerlidir."
          },
          {
            "title": "Tercih yönetimi",
            "description": "Çerez tercihlerinizi dilediğiniz zaman güncelleyebilirsiniz."
          }
        ],
        "title": "Çerez ve benzeri teknolojiler",
        "layout": "list",
        "eyebrow": "Çerezler"
      }
    ]
  },
  {
    "cta": {
      "title": "Kullanım koşullarıyla ilgili destek alın",
      "description": "Koşullarla ilgili sorularınızı bize iletebilirsiniz.",
      "primaryAction": {
        "href": "contact",
        "label": "İletişime Geç"
      },
      "secondaryAction": {
        "href": "gizlilik-politikasi",
        "label": "Gizlilik Metni"
      }
    },
    "seo": {
      "title": "Kullanım Koşulları | TARF",
      "description": "Web sitesi ve dijital hizmetlerimizin kullanım şartlarını inceleyin."
    },
    "hero": {
      "title": "Kullanım Koşulları",
      "actions": [
        {
          "href": "kullanim-kosullari",
          "label": "Koşulları İncele"
        },
        {
          "href": "contact",
          "label": "Destek Al",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Yasal",
      "subtitle": "Web sitesi ve dijital hizmetlerimizin kullanım şartları",
      "description": "Bu metin, TARF Akademi web sitesi ve dijital hizmetlerine erişim ve kullanım kurallarını açıklar."
    },
    "slug": "kullanim-kosullari",
    "category": "yasal",
    "sections": [
      {
        "id": "general",
        "items": [
          {
            "title": "Kabul",
            "description": "Siteye erişim ve hizmet kullanımı bu koşulların kabulü anlamına gelir."
          },
          {
            "title": "Değişiklikler",
            "description": "Koşullar güncellenebilir; güncellemeler yayımlandığı tarihte yürürlüğe girer."
          },
          {
            "title": "Bildirimler",
            "description": "Bildirimler e-posta veya site duyuruları ile yapılabilir."
          }
        ],
        "title": "Kapsam ve kabul",
        "layout": "list",
        "eyebrow": "Genel hükümler"
      },
      {
        "id": "access",
        "items": [
          {
            "title": "Üyelik",
            "description": "Gerekli hallerde üyelik oluşturur ve doğru bilgi sağlarsınız."
          },
          {
            "title": "Hesap güvenliği",
            "description": "Şifre ve hesap güvenliği kullanıcı sorumluluğundadır."
          },
          {
            "title": "Reşit olmayanlar",
            "description": "18 yaş altı kullanıcılar veli/vasinin onayıyla hizmetlerden yararlanır."
          },
          {
            "title": "Erişim kısıtlaması",
            "description": "Güvenlik ve mevzuat gerekçeleriyle erişim sınırlandırılabilir."
          }
        ],
        "title": "Hesap ve erişim yönetimi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Erişim"
      },
      {
        "id": "obligations",
        "items": [
          {
            "title": "Hukuka uygun kullanım",
            "description": "Hizmetleri hukuka, etik ilkelere ve bu koşullara uygun kullanırsınız."
          },
          {
            "title": "İçerik paylaşımı",
            "description": "Paylaşımlar telif, marka ve kişilik haklarına uygun olmalıdır."
          },
          {
            "title": "Zararlı faaliyetler",
            "description": "İzinsiz erişim, spam, kötü amaçlı yazılım ve tersine mühendislik yasaktır."
          },
          {
            "title": "Ücretli hizmetler",
            "description": "Ücretli hizmetlere ilişkin koşullar ayrıca duyurulur."
          }
        ],
        "title": "Kullanım kuralları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Yükümlülükler"
      },
      {
        "id": "ip",
        "items": [
          {
            "title": "TARF içerikleri",
            "description": "Tüm içerik ve markalar TARF Akademi’ye aittir veya lisanslıdır."
          },
          {
            "title": "Kullanıcı içerikleri",
            "description": "Kullanıcılar içeriklerinden sorumludur; paylaşım için sınırlı kullanım izni verir."
          },
          {
            "title": "Üçüncü taraf içerikleri",
            "description": "Üçüncü taraf hakları saklıdır ve ilgili lisans koşulları geçerlidir."
          }
        ],
        "title": "Telif ve lisans hakları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Fikri mülkiyet"
      },
      {
        "id": "fees",
        "items": [
          {
            "title": "Ücretlendirme",
            "description": "Ücretli program ve hizmetler ayrıca duyurulur."
          },
          {
            "title": "İptal & iade",
            "description": "İptal/iade koşulları ilgili program duyurusunda belirtilir."
          }
        ],
        "title": "Ücretli hizmetler ve iade",
        "layout": "list",
        "eyebrow": "Ücretler"
      },
      {
        "id": "liability",
        "items": [
          {
            "title": "Hizmet sürekliliği",
            "description": "Kesintisiz veya hatasız hizmet taahhüdü verilmez."
          },
          {
            "title": "Üçüncü taraf bağlantıları",
            "description": "Üçüncü taraf siteler ve içeriklerden sorumlu değiliz."
          },
          {
            "title": "Yasal sınırlar",
            "description": "Sorumluluk, yürürlükteki mevzuatın izin verdiği ölçüde sınırlandırılır."
          }
        ],
        "title": "Sorumluluğun sınırı",
        "layout": "list",
        "eyebrow": "Sorumluluk"
      },
      {
        "id": "termination",
        "items": [
          {
            "title": "Askıya alma",
            "description": "Koşul ihlallerinde erişim askıya alınabilir veya sonlandırılabilir."
          },
          {
            "title": "Hesap kapanışı",
            "description": "Sonlandırma halinde yasal saklama yükümlülükleri saklıdır."
          },
          {
            "title": "Uygulanacak hukuk",
            "description": "Uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır."
          }
        ],
        "title": "Askıya alma ve uyuşmazlıklar",
        "layout": "list",
        "eyebrow": "Sözleşmenin feshi"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Kulüplere katıl veya yeni kulüp kurabilir, eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Öğrenci Kulüpleri | TARF Toplulukları",
      "description": "Teknoloji, bilim, kültür ve girişimcilik kulüplerinin programları ve katılım süreçleri."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Kulüp",
          "value": "22",
          "helper": "Aktif yapı"
        },
        {
          "label": "Üye",
          "value": "1.400",
          "helper": "Öğrenci"
        },
        {
          "label": "Yıllık etkinlik",
          "value": "180",
          "helper": "Kulüp organizasyonu"
        }
      ],
      "title": "TARF Öğrenci Kulüpleri",
      "actions": [
        {
          "href": "contact",
          "label": "Kulüp Başvurusu"
        }
      ],
      "eyebrow": "Kulüpler ve Takımlar",
      "subtitle": "Değerleriyle Üreten Gençlik...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Lise ve ağırlıklı olarak üniversite gençliğini kapsayan öğrenci kulüpleri çalışmasında amaç; üretken ve değer odaklı, milli ve yerli bir şuur sahibi, ülkesine faydalı, sorumluluk sahibi bireyler yetiştirmektir. Öğrencilerin bilim ile hikmeti harmanlayan, irfani bakış açısına sahip bir anlayış geliştirmeleri; geçmişine ve değerlerine bağlı, aynı zamanda geleceğe yön verme iddiası taşıyan çalışmaların, sosyal sorumluluk, kültürel ve akademik projelerin desteklenmesi hedeflenir. Ulusal ve uluslararası yarışmalara katılan öğrenci gruplarına; projenin özgünlüğü, topluma katkısı ve benzeri belirlenen kriterleri karşılaması durumunda değerlendirme yapılarak sponsorluk sağlanabilir.</p>",
      "backgroundImage": ""
    },
    "slug": "kulupler/ogrenci-kulupleri",
    "category": "kulupler",
    "sections": [
      {
        "id": "tech",
        "items": [
          {
            "title": "Yazılım Kulübü",
            "description": "Web & mobil projeleri, hack günleri."
          },
          {
            "title": "Robotik Kulübü",
            "description": "Mekanik tasarım, yarışma hazırlıkları."
          },
          {
            "title": "AI & ML Kulübü",
            "description": "Veri analizi ve makine öğrenmesi projeleri."
          },
          {
            "title": "Siber Güvenlik Kulübü",
            "description": "CTF, güvenlik araştırmaları."
          },
          {
            "title": "Game Dev Kulübü",
            "description": "Game jam, oyun tasarımı."
          }
        ],
        "title": "Kod, robotik, AI ve oyun",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Teknoloji kulüpleri"
      },
      {
        "id": "science",
        "items": [
          {
            "title": "Fizik Kulübü",
            "description": "Deneyler, konferanslar, bilim kampları."
          },
          {
            "title": "Matematik Kulübü",
            "description": "Problem çözme oturumları."
          },
          {
            "title": "Astronomi Kulübü",
            "description": "Gözlem geceleri, uzay içerikleri."
          },
          {
            "title": "Fotoğrafçılık & Sinema",
            "description": "Üretim ekipleri, sergiler."
          },
          {
            "title": "Edebiyat & Müzik",
            "description": "Okuma grupları, konserler."
          }
        ],
        "title": "Bilimsel ve sanatsal kulüpler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Bilim ve kültür"
      },
      {
        "id": "entrepreneurship",
        "items": [
          {
            "title": "Startup Kulübü",
            "description": "İş modeli kampı, yatırımcı görüşmeleri."
          },
          {
            "title": "Sosyal Girişim Kulübü",
            "description": "Toplumsal etki projeleri."
          }
        ],
        "title": "Startup ve sosyal girişim kulüpleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Girişimcilik"
      },
      {
        "id": "process",
        "items": [
          {
            "title": "Başvuru",
            "description": "Vizyon ve ekip bilgilerini içeren form."
          },
          {
            "title": "Sunum & onay",
            "description": "Koordinasyon ekibine sunum ve değerlendirme."
          },
          {
            "title": "Mentor eşleşmesi",
            "description": "Kulübe destek olacak mentor atanır."
          },
          {
            "title": "Oryantasyon",
            "description": "Kaynaklar, takvim ve araçlar teslim edilir."
          }
        ],
        "title": "Nasıl kulüp kurulur?",
        "layout": "list",
        "eyebrow": "Kulüp kurma",
        "ordered": true
      }
    ]
  },
  {
    "cta": {
      "title": "TARF Dergi’nin Yeni Sayısını Keşfedin",
      "description": "Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Dergi | Dijital Yayın Platformu",
      "description": "Bilim, teknoloji, kültür ve girişimcilik içerikleriyle TARF Dergi’yi keşfedin."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Yayın sıklığı",
          "value": "Dönemsel",
          "helper": "Editoryal takvim"
        },
        {
          "label": "İçerik hattı",
          "value": "4 başlık",
          "helper": "Bilim, teknoloji, kültür, girişim"
        },
        {
          "label": "Katkı modeli",
          "value": "Açık",
          "helper": "Yazar + öğrenci"
        }
      ],
      "title": "TARF Bilim ve Teknoloji Dergisi",
      "actions": [
        {
          "href": "https://tarfdergisi.com.tr",
          "label": "TARF Dergi’ye Git"
        }
      ],
      "eyebrow": "Yayınlar",
      "subtitle": "Bilimi İrfanla, Teknolojiyi Sorumlulukla Buluşturan Bir Dergi",
      "videoUrl": "",
      "highlight": "",
      "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(58, 58, 58);\">Üç ayda bir yayımlanacak olan TARF Bilim ve Teknoloji Dergisi, periyodik bir yayın olmasının yanında, “mensubiyetimiz mesuliyetimizdir” prensibiyle, “Gençlik ve İrfan”ın buluşturulmasını, milli ve manevi duyguları harekete geçirecek çalışmalar ortaya çıkarılmasını, gençlerimizin gözlerini ve yüreklerini yeni perspektiflere açmasını, yürüdükleri yolda, heybelerinde milli ve manevi değerleri yüklenmelerini hedeflemektedir.</span></p>",
      "backgroundImage": ""
    },
    "slug": "dergi",
    "category": "yayinlar",
    "sections": [
      {
        "id": "editorial",
        "items": [
          {
            "title": "Hakikat ve ölçü",
            "description": "Bilgiyi yalnızca aktarmak değil, anlamlandırmak."
          },
          {
            "title": "İnsan merkezli teknoloji",
            "description": "Teknolojiyi insanlık ve etikle birlikte ele almak."
          },
          {
            "title": "Genç üretimi",
            "description": "Öğrenci ve genç araştırmacıların sesine alan açmak."
          }
        ],
        "title": "Derginin odaklandığı ilkeler",
        "layout": "list",
        "eyebrow": "Editoryal duruş"
      },
      {
        "id": "themes",
        "items": [
          {
            "title": "Bilim ve araştırma",
            "description": "Makaleler, raporlar, metodoloji yazıları."
          },
          {
            "title": "Yazılım ve ürün",
            "description": "Geliştirme trendleri, mimari yaklaşımlar."
          },
          {
            "title": "Kültür ve düşünce",
            "description": "Toplumsal dönüşüm, değer ve irfan perspektifi."
          },
          {
            "title": "Girişimcilik",
            "description": "Sosyal etki, inovasyon, ekip hikayeleri."
          },
          {
            "title": "Röportajlar",
            "description": "Akademisyen ve teknoloji liderleriyle söyleşiler."
          },
          {
            "title": "Proje dosyaları",
            "description": "TARF Akademi projeleri ve vaka analizleri."
          }
        ],
        "title": "Okuyacağınız başlıklar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "İçerik temaları"
      },
      {
        "id": "workflow",
        "items": [
          {
            "title": "Tema belirleme",
            "description": "Editoryal kurul dönem temalarını belirler."
          },
          {
            "title": "Yazı kabul & değerlendirme",
            "description": "Başvuru, içerik uyumu ve kalite kontrol."
          },
          {
            "title": "Redaksiyon & tasarım",
            "description": "Dil, görsel ve sayfa düzeni çalışmaları."
          },
          {
            "title": "Yayın & paylaşım",
            "description": "Web yayını ve sosyal dağıtım."
          }
        ],
        "title": "Bir sayı nasıl hazırlanıyor?",
        "layout": "list",
        "eyebrow": "Yayın süreci"
      },
      {
        "id": "contribute",
        "items": [
          {
            "title": "Yazar başvurusu",
            "description": "Konu önerisi ve örnek yazı paylaşın."
          },
          {
            "title": "Öğrenci dosyaları",
            "description": "Proje ve araştırma çıktıları için ayrı hat."
          },
          {
            "title": "Kurumsal işbirliği",
            "description": "Ortak dosya ve özel sayı önerileri."
          },
          {
            "title": "Geri bildirim",
            "description": "Okur yorumlarıyla içerik iyileştirme."
          }
        ],
        "title": "Dergiye nasıl katkı sağlanır?",
        "layout": "list",
        "eyebrow": "Katılım",
        "ordered": true
      },
      {
        "id": "access",
        "items": [
          {
            "title": "Web okuma",
            "description": "Tüm sayılara tarfdergisi.com.tr üzerinden erişim."
          },
          {
            "title": "PDF arşiv",
            "description": "Seçilmiş sayılar için offline okuma."
          },
          {
            "title": "E-bülten",
            "description": "Yeni sayı duyuruları ve öne çıkan yazılar."
          },
          {
            "title": "Sosyal paylaşım",
            "description": "Kısa özetler ve yazar notları."
          }
        ],
        "title": "Okuma deneyimi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Erişim"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Sürdürülebilirlik projeleri için iletişime geçin. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Ekoloji, İklim ve Doğa | TARF Düşünce Enstitüsü",
      "description": "İklim politikaları, enerji dönüşümü, biyoçeşitlilik ve doğa temelli çözümler üzerine araştırmalar ve programlar."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "İklim projesi",
          "value": "25",
          "helper": "Pilot & saha"
        },
        {
          "label": "Veri seti",
          "value": "60+",
          "helper": "Açık ve şeffaf"
        },
        {
          "label": "Paydaş",
          "value": "40+",
          "helper": "Belediye, STK, özel sektör"
        }
      ],
      "title": "Ekoloji İklim Şehir",
      "actions": [
        {
          "href": "contact",
          "label": "Ortak Proje Başlat"
        }
      ],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Milli ve yerli çözümleri önceleyen “Ekoloji-İklim-Şehir\" Çalışmalarımız...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Milli ve yerli çözümleri önceleyen “Ekoloji-İklim-Şehir” alanındaki çalışmalarımızın, gıda güvenliği, su yönetimi ve iklim uyumu politikalarına rehber olması; irfanî anlayışla bilimsel veriyi buluşturması, doğayla uyumlu kalkınmayı esas alması, geçmişten gelen üretim kültürünün güncel teknolojiyle birlikte değerlendirilmesi amaçlanır.</p><p>Üniversiteler ve yerel yönetimlerle; konferans, çalıştay ve sempozyumlar düzenlenmesi, çiftçiler, uzmanlar ve akademisyenlerin katkısıyla raporlar hazırlanması; yerli üretimi ve sürdürülebilirliği destekleyen, bilimsel analiz ve hikmetli dengeyi gözeten, yerel deneyimleri ulusal strateji ile birleştiren, doğal kaynaklar ve küresel riskler karşısında milli duruşu destekleyen, sahaya dayalı verilerle uygulanabilir önerileri geliştiren, ortak aklı güçlendiren ve toplumsal farkındalık oluşturan bu raporların geniş katılımlı lansmanlarla kamuoyuna sunulması hedeflenir.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/cevre-iklim-doga",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "İklim politikaları",
            "description": "Emisyon azaltımı, uyum ve finansman modelleri."
          },
          {
            "title": "Enerji dönüşümü",
            "description": "Yenilenebilir enerji ve verimlilik çözümleri."
          },
          {
            "title": "Biyoçeşitlilik",
            "description": "Ekosistem hizmetleri ve koruma stratejileri."
          },
          {
            "title": "Şehircilik & mobilite",
            "description": "Yeşil altyapı, ulaşım ve döngüsel ekonomi."
          },
          {
            "title": "Doğa temelli çözümler",
            "description": "İklim uyumu için ekolojik tasarımlar."
          }
        ],
        "title": "Sürdürülebilirlik eksenli başlıklar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "İklim aksiyon planı",
            "description": "Yerel yönetimler için yol haritaları ve eğitimler."
          },
          {
            "title": "Yeşil kampüs programı",
            "description": "Üniversitelerde sürdürülebilirlik uygulamaları."
          },
          {
            "title": "Enerji verimliliği atölyeleri",
            "description": "KOBİ ve kurumlar için uygulamalı içerikler."
          },
          {
            "title": "Vatandaş bilimi",
            "description": "Topluluklarla veri toplama ve izleme projeleri."
          }
        ],
        "title": "Uygulama ve eğitimler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "İklim risk haritası",
            "description": "Bölgesel risk analizi ve önceliklendirme."
          },
          {
            "title": "Enerji dönüşüm raporu",
            "description": "Sektörel dönüşüm ve yatırım trendleri."
          },
          {
            "title": "Doğa temelli çözümler kataloğu",
            "description": "Belediyeler için örnek uygulamalar."
          },
          {
            "title": "Karbon ayak izi kılavuzu",
            "description": "Kurumlar için ölçüm ve azaltım rehberi."
          }
        ],
        "title": "Rapor ve veri setleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan içerikler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Saha araştırması talep edin",
            "description": "Veri toplama ve analiz süreçlerini bize devredin."
          },
          {
            "title": "Eğitim ve atölye düzenleyin",
            "description": "Çalışanlar veya öğrenciler için uyarlanmış içerikler."
          },
          {
            "title": "Ortak yayın üretin",
            "description": "Rapor ve politika notlarını birlikte hazırlayalım."
          }
        ],
        "title": "Projelerinize destek alın",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Küresel Dünyayı Anlamak İnsanı Anlamaktan Geçer.",
      "description": "Teorik bilgilerle pratiği harmanlayıp gençlerimizi kariyer fırsatlarına hazırlıyoruz. Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın. Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Uluslararası İlişkiler | TARF Düşünce Enstitüsü",
      "description": "Diplomasi, güvenlik, ekonomi ve insani diplomasi alanlarında araştırmalar, politika notları ve eğitim programları."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Politika notu",
          "value": "40+",
          "helper": "Yıllık"
        },
        {
          "label": "Bölge dosyası",
          "value": "12",
          "helper": "Orta Doğu, Afrika, Asya"
        },
        {
          "label": "Paydaş",
          "value": "50+",
          "helper": "Kamu, STK, akademi"
        }
      ],
      "title": "Uluslararası İlişkiler ve Politika Araştırmaları",
      "actions": [
        {
          "href": "https://drive.google.com/file/d/15ogE39BZD9-U2KmrYaOUghb7D4ISM5uO/view?usp=sharing/catalog",
          "label": "Literatür Kavramları",
          "variant": "primary"
        }
      ],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Diplomasi, güvenlik ve küresel trendler odağında çalışmalar",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Uluslararası ilişkiler ve dış politika çalışmaları, yalnızca güç dengelerini ve çıkar hesaplarını değil, aynı zamanda hikmetli bakışı, irfanı ve ahlaki sorumluluğu merkeze alan bir derinlik gerektirir. Küresel dünya; diplomasi, teknoloji ve stratejik aklın iç içe geçtiği çok boyutlu bir alan hâline gelmiştir. Düşünce enstitümüz, çağın sunduğu teknolojik imkânları insanlığın ortak değerleriyle buluşturarak, dünyayı doğru okuyan, krizleri öngören ve adalet temelli çözüm önerileri geliştiren bir yaklaşımı benimser. Diplomasi, bu çerçevede yalnızca müzakere sanatı değil; medeniyet bilincinin sahaya yansımasıdır.</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/uluslararasi-iliskiler",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Diplomasi & diyalog",
            "description": "Barış inşası ve arabuluculuk süreçleri."
          },
          {
            "title": "Güvenlik çalışmaları",
            "description": "Savunma, hibrit tehditler ve siber güvenlik."
          },
          {
            "title": "Ekonomik ilişkiler",
            "description": "Ticaret, yatırım ve tedarik zinciri analizleri."
          },
          {
            "title": "Bölgesel entegrasyon",
            "description": "Bölgesel örgütler ve ortaklık modelleri."
          },
          {
            "title": "İnsani diplomasi",
            "description": "Göç, mülteci hareketleri ve insani yardım politikaları."
          }
        ],
        "title": "Dış politika ve strateji",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Diplomasi atölyeleri",
            "description": "Müzakere, protokol ve senaryo çalışmaları."
          },
          {
            "title": "Simülasyonlar",
            "description": "Model NATO, BM ve bölgesel örgüt simülasyonları."
          },
          {
            "title": "Politika brifingleri",
            "description": "Karar vericilere yönelik kısa ve uygulanabilir içerikler."
          },
          {
            "title": "Saha raporları",
            "description": "Bölge uzmanlarıyla yerinde gözlem ve veri toplama."
          }
        ],
        "title": "Uygulama ve eğitim hatları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "Bölge analizleri",
            "description": "Orta Doğu, Afrika ve Asya odaklı stratejik raporlar."
          },
          {
            "title": "Güvenlik bülteni",
            "description": "Aylık tehdit analizi ve risk değerlendirmeleri."
          },
          {
            "title": "Ekonomi & ticaret dosyası",
            "description": "Tedarik zinciri, yatırım ve ticaret trendleri."
          },
          {
            "title": "Politika notları",
            "description": "Hızlı okunur, uygulanabilir öneriler."
          }
        ],
        "title": "Rapor ve yayınlar",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan içerikler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Araştırma ortağı olun",
            "description": "Veri paylaşımı ve ortak saha çalışması."
          },
          {
            "title": "Eğitim talep edin",
            "description": "Diplomasi ve kriz yönetimi eğitimlerini kurumunuza taşıyın."
          },
          {
            "title": "Politika brifingi alın",
            "description": "Karar süreçleriniz için hızlı analiz talep edin."
          }
        ],
        "title": "Ortak çalışmalar başlatın",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle hikmeti, teknolojiyle irfanı buluşturan çalışmalarımızda siz de yerinizi alın.",
      "description": "Ürünlerimizden talep edebilir, eğitim programlarımıza katılabilirsiniz.  Projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Yazılım Teknolojileri - Ürünlerimiz | TARF Yazılım",
      "description": "KYP, Okul Bilgi Sistemi, Eğitim"
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Eğitim mezunu",
          "value": "650+",
          "helper": "Siber güvenlik"
        },
        {
          "label": "Tespit edilen açık",
          "value": "1.300+",
          "helper": "Pen test raporları"
        },
        {
          "label": "Sertifika başarısı",
          "value": "%88",
          "helper": "CEH/S+ geçme oranı"
        }
      ],
      "title": "Ürünlerimiz",
      "actions": [
        {
          "href": "contact",
          "label": "Demo Talep Et"
        }
      ],
      "eyebrow": "Yazılım Teknolojileri",
      "subtitle": "Kurumların Dijital İhtiyaçlarına Özel Yazılım Ürünleri",
      "videoUrl": "",
      "highlight": "",
      "description": "<p><strong>TARF Yazılım</strong>, kurumların dijital ihtiyaçlarına cevap veren, yerli ve sürdürülebilir yazılım ürünleri geliştirmektedir. Ürünlerimiz; kurumsal yönetim, eğitim, organizasyon ve süreç takibini tek merkezden yönetmeyi amaçlayan modüler ve ölçeklenebilir yapılar üzerine inşa edilmiştir.</p><p>Geliştirdiğimiz tüm ürünlerde;</p><ul><li>Kullanıcı dostu arayüz</li><li>Güvenli ve esnek altyapı</li><li>Kuruma özel uyarlanabilir yapı</li><li>Uzun vadeli sürdürülebilirlik esas alınmaktadır.</li></ul><p><br></p><h2><strong>KYP – Kurumsal Yönetim Paneli (Okul Bilgi Sistemi)</strong></h2><p>KYP (Kurumsal Yönetim Paneli), eğitim kurumlarının tüm idari, akademik ve operasyonel süreçlerini tek bir platform üzerinden yönetmelerini sağlayan kapsamlı bir <strong>Okul Bilgi Sistemi</strong>dir.</p><p>KYP, okul yönetimi, öğretmenler, öğrenciler ve veliler arasında güçlü bir dijital köprü kurarak; süreçleri sadeleştirir, verimliliği artırır ve kurumsal hafızayı dijital ortama taşır.</p><h3><strong><u>KYP ile Neler Yapılabilir?</u></strong></h3><p><strong> Öğrenci Yönetimi</strong></p><ul><li>Öğrenci kayıtları, sınıf ve şube bilgileri, eğitim dönemi ve öğrenci geçmişi takibi.</li></ul><p><strong> Akademik Süreçler</strong></p><ul><li>Dersler, notlar, devamsızlık, sınav ve başarı raporları.</li></ul><p><strong> Öğretmen ve Personel Yönetimi</strong></p><ul><li>Öğretmen ve personel bilgileri, görev tanımları ve yetkilendirme.</li></ul><p><strong> Veli Bilgilendirme ve İletişim</strong></p><ul><li>Öğrenci durumu, duyurular ve bilgilendirmelerin velilere dijital olarak iletilmesi.</li></ul><p><strong> Finans ve Kayıt Takibi</strong></p><ul><li>Kayıt türleri, ücretlendirme, ödeme ve sözleşme süreçlerinin takibi.</li></ul><p><strong> Raporlama ve Analiz</strong></p><ul><li>Kurumsal karar alma süreçlerini destekleyen detaylı ve özet raporlar.</li></ul><h3><strong>Teknik ve Yapısal Özellikler</strong></h3><ul><li>Web tabanlı ve mobil uyumlu yapı</li><li>Rol ve yetki bazlı kullanıcı yönetimi</li><li>Güvenli veri altyapısı</li><li>Modüler mimari (kuruma özel geliştirilebilir)</li><li>Yüksek performans ve ölçeklenebilirlik</li></ul><h3><strong>KYP’nin Farkı</strong></h3><p>KYP, yalnızca bir okul yazılımı değil; eğitim kurumlarının yönetim kültürünü dijitalleştiren <strong>akıllı bir yönetim platformudur</strong>. TARF Yazılım’ın akademik yaklaşımı ve yazılım tecrübesiyle geliştirilmiş, sahadaki gerçek ihtiyaçlara göre şekillendirilmiştir.</p><h3><strong>Kimler İçin?</strong></h3><ul><li>Özel okullar</li><li>Eğitim kurumları ve akademiler</li><li>Kurs merkezleri</li></ul><h3><strong>Hedefimiz</strong></h3><p>TARF Yazılım olarak geliştirdiğimiz ürünlerle; kurumların dijital dönüşümünü hızlandırmak, yönetim süreçlerini kolaylaştırmak ve güvenilir yazılım çözümleri sunmak.</p>",
      "backgroundImage": ""
    },
    "slug": "yazilim/siber-guvenlik",
    "category": "yazilim",
    "sections": [
      {
        "id": "programs",
        "items": [
          {
            "title": "Siber güvenlik temelleri",
            "description": "Network, kriptografi, threat modeling."
          },
          {
            "title": "Etik hacking",
            "description": "Pen test, vulnerability assessment, bug bounty."
          },
          {
            "title": "Güvenli yazılım geliştirme",
            "description": "OWASP Top 10, secure coding, DevSecOps."
          },
          {
            "title": "Lab ortamı",
            "description": "CTF, sanal lab ve simülasyon platformu."
          }
        ],
        "title": "Siber güvenlik öğrenme izleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Eğitim programları"
      },
      {
        "id": "cert",
        "items": [
          {
            "title": "CEH & OSCP",
            "description": "Yoğun kamp, senaryo tabanlı pratik."
          },
          {
            "title": "CompTIA Security+",
            "description": "Temel güvenlik rolleri için içerik."
          },
          {
            "title": "CISSP",
            "description": "Liderlik ve yönetişim odaklı eğitimler."
          }
        ],
        "title": "Uluslararası sınav hazırlığı",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Sertifikasyon"
      },
      {
        "id": "services",
        "items": [
          {
            "title": "Penetration testing",
            "description": "Ağ, uygulama ve mobil testler."
          },
          {
            "title": "Security audit",
            "description": "Politika, süreç ve konfigürasyon incelemeleri."
          },
          {
            "title": "Incident response",
            "description": "İhlal durumunda hızlı müdahale planları."
          },
          {
            "title": "DevSecOps entegrasyonu",
            "description": "CI/CD sürecine güvenlik eklemek."
          }
        ],
        "title": "Kurumsal güvenlik çözümleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Hizmetler"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Teknoloji takımlarına katılabilir, eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Teknoloji Takımları | TARF",
      "description": "Robotik, AI, oyun ve AR/VR takımlarının projeleri, başarıları ve katılım süreci."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Aktif takım",
          "value": "11",
          "helper": "Farklı alanlarda"
        },
        {
          "label": "Üye",
          "value": "700",
          "helper": "Takım katılımcısı"
        },
        {
          "label": "Ödül",
          "value": "36",
          "helper": "Ulusal/uluslararası"
        }
      ],
      "title": "TARF Teknoloji Takımları",
      "actions": [],
      "eyebrow": "Kulüpler ve Takımlar",
      "subtitle": "Değer Temelli, Milli ve Yerli Teknoloji Kulüpleri",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Lise ve daha çok üniversite gençliğini kapsayan Teknoloji Kulüpleri çalışmasında amaç; değer temelli, sürdürülebilir ve yerli teknoloji üretimini, milli ve yerli teknoloji anlayışını geliştirmek, Ülkesine fayda üreten mühendisler, araştırmacılar ve girişimciler yetiştirmektir.</p><p>Kulüp faaliyetlerinde teknoloji yalnızca teknik bir alan olarak değil, irfani bir bakışla ele alınır.</p><p>Öğrencilerin bilimsel bilgiyle birlikte ahlak, değer ve sorumluluk bilinci kazanmaları önemsenir.</p><p>Geçmişten gelen birikimle geleceğin teknolojilerine yön verme vizyonu desteklenir. Ulusal ve Uluslararası yarışmalara katılan öğrenci gruplarına; projenin özgünlüğü, topluma katkısı ve benzeri belirlenen kriterleri karşılaması durumunda değerlendirme yapılarak sponsorluk sağlanabilir.</p>",
      "backgroundImage": ""
    },
    "slug": "kulupler/teknoloji-takimlari",
    "category": "kulupler",
    "sections": [
      {
        "id": "teams",
        "items": [
          {
            "title": "Robotik Takımı",
            "description": "Endüstriyel robot kolu, drone ve yarışma projeleri."
          },
          {
            "title": "AI Takımı",
            "description": "Makine öğrenmesi, veri analizi ve hackathonlar."
          },
          {
            "title": "Web & Mobile",
            "description": "Çapraz platform uygulamalar, açık kaynak katkıları."
          },
          {
            "title": "Game Development",
            "description": "Game jam, indie oyun stüdyosu."
          },
          {
            "title": "AR/VR",
            "description": "Sanal gerçeklik uygulamaları ve deneyim tasarımı."
          },
          {
            "title": "Research Takımı",
            "description": "Bilimsel araştırmalar, paper yazımı ve konferans sunumları."
          }
        ],
        "title": "Aktif teknoloji takımları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Takımlar"
      },
      {
        "id": "showcase",
        "items": [
          {
            "title": "Otonom araç simülasyonu",
            "description": "AI takımının ödüllü projesi."
          },
          {
            "title": "Sağlık için yapay zekâ",
            "description": "Görüntü işleme ile erken teşhis."
          },
          {
            "title": "VR eğitim laboratuvarı",
            "description": "AR/VR takımının geliştirdiği simülasyon."
          },
          {
            "title": "Robotik yarışma dereceleri",
            "description": "Ulusal teknofest başarıları."
          }
        ],
        "title": "Tamamlanan projeler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Proje vitrin"
      },
      {
        "id": "competitions",
        "items": [
          {
            "title": "Teknofest",
            "description": "Robotik ve AI kategorilerinde finalistlikler."
          },
          {
            "title": "Hackathon serileri",
            "description": "Bankacılık, sağlık ve mobilite temaları."
          },
          {
            "title": "Game jam etkinlikleri",
            "description": "48 saatlik üretim maratonları."
          }
        ],
        "title": "Katıldığımız platformlar",
        "layout": "list",
        "eyebrow": "Yarışmalar"
      },
      {
        "id": "join",
        "items": [
          {
            "title": "Başvuru formu",
            "description": "Hedef takım ve yetkinlik bilgileri."
          },
          {
            "title": "Teknik görev",
            "description": "Kısa süreli değerlendirme projesi."
          },
          {
            "title": "Mülakat & eşleşme",
            "description": "Takım liderleri ile görüşme."
          },
          {
            "title": "Onboarding kampı",
            "description": "Takım kültürü ve araçların tanıtımı."
          }
        ],
        "title": "Takıma katılma süreci",
        "layout": "list",
        "eyebrow": "Katılım",
        "ordered": true
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "videos",
        "label": "Geçmiş Kayıtlar"
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "TARF Seminerleri | Teknoloji ve Bilim Konuşmaları",
      "description": "Teknoloji, bilim, kariyer ve girişimcilik seminerleri takvimi ve arşiv kayıtları."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Yıllık seminer",
          "value": "60+",
          "helper": "Çevrimiçi + fiziksel"
        },
        {
          "label": "Konuşmacı",
          "value": "120",
          "helper": "Akademi & sektör"
        },
        {
          "label": "Katılımcı",
          "value": "8.500",
          "helper": "Toplam"
        }
      ],
      "title": "Seminerler",
      "actions": [
        {
          "href": "contact",
          "label": "Faaliyetlerimizden Haberdar Ol"
        }
      ],
      "eyebrow": "Akademi",
      "subtitle": "Bilimsel analiz ve hikmetli yaklaşım...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Üniversitelerde düzenlenen ve öğrencilerin hem kendi alanlarına hem de güncel meselelere dair perspektif kazanmalarını amaçlayan içeriklerden oluşur. Alanında yetkin akademisyenler ve düşünce insanlarıyla gerçekleştirilen bu seminerler, öğrencilerin eleştirel düşünme ve analiz becerilerini geliştirmeyi hedefler.</p><p>&nbsp;Seminer programları; mesleki ahlak, akademik sorumluluk, toplumsal meseleler ve değerler ekseninde şekillendirilerek öğrencilerin yalnızca \"bilgi sahibi\" değil, aynı zamanda \"bilgiyle sorumluluk taşıyan\" fertler olmalarını amaçlar.</p>",
      "backgroundImage": ""
    },
    "slug": "akademi/seminerler",
    "category": "akademi",
    "sections": [
      {
        "id": "upcoming",
        "items": [
          {
            "title": "Teknoloji ve Yazılım",
            "description": "Yeni nesil frameworkler, mimariler ve trendler."
          },
          {
            "title": "Bilim ve Araştırma",
            "description": "Veri bilimi, yapay zekâ ve bilimsel yöntem seminerleri."
          },
          {
            "title": "Kariyer ve Girişimcilik",
            "description": "İşe alım süreçleri, girişim hikayeleri ve yatırım tüyoları."
          },
          {
            "title": "Kişisel Gelişim",
            "description": "İletişim, liderlik ve üretkenlik içerikleri."
          }
        ],
        "title": "Yaklaşan seminerler",
        "layout": "list",
        "eyebrow": "Takvim"
      },
      {
        "id": "archive",
        "items": [
          {
            "title": "Video arşivi",
            "description": "Kayıttan izleme imkanı ile tüm seminerler."
          },
          {
            "title": "Okuma paketleri",
            "description": "Seminerlerde paylaşılan makale ve sunumlar."
          },
          {
            "title": "Podcast özetleri",
            "description": "Konuşmacılarla yapılan kısa podcast serileri."
          },
          {
            "title": "Topluluk forumu",
            "description": "Seminer sonrası tartışma ve soru-cevap."
          }
        ],
        "title": "Geçmiş seminer kayıtları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Arşiv"
      },
      {
        "id": "speakers",
        "items": [
          {
            "title": "Akademisyenler",
            "description": "Üniversitelerden güçlü araştırmacılar."
          },
          {
            "title": "Sektör liderleri",
            "description": "Teknoloji şirketlerinden C-level yöneticiler."
          },
          {
            "title": "Girişimciler",
            "description": "Başarılı start-up kurucuları."
          },
          {
            "title": "Mentorlar",
            "description": "Topluluk içinden yetişmiş uzmanlar."
          }
        ],
        "title": "Uzman profilleri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Konuşmacılar"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın.",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz.. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Bilim ve Teknoloji | TARF Düşünce Enstitüsü",
      "description": "Yapay zekâ, siber güvenlik, biyoteknoloji ve teknoloji politikası alanlarında araştırmalar, eğitimler ve danışmanlık."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Araştırma dosyası",
          "value": "30+",
          "helper": "Yıllık"
        },
        {
          "label": "Teknoloji takımı",
          "value": "10",
          "helper": "Pilot ve prototip"
        },
        {
          "label": "Çalıştay",
          "value": "70+",
          "helper": "Teknik & etik"
        }
      ],
      "title": "Teknoloji",
      "actions": [
        {
          "href": "contact",
          "label": "Danışmanlık Talep Et"
        }
      ],
      "eyebrow": "Düşünce Enstitüsü",
      "subtitle": "Geçmişten Gelen Değerler İle Geleceğin Teknolojileri...",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Savunma ve savunma teknolojileri, uydu ve uzay çalışmaları, bilişim-donanım-yazılım, mühendislik bilimleri, yapay zeka, çevre, iklim, dijitalleşme, sürdürülebilir yaşam ve benzeri bir çok alandaki çalışmalarımızda, milli ve yerli üretim stratejik bir öncelik olarak ele alınır. İrfanî bakış ile bilimsel yenilik dengelenir.</p><p>Geçmişten gelen değerlerin geleceğin teknolojileriyle uyumlu hale getirilmesi, üniversiteler ve yerel yönetimlerle çalıştaylar, sempozyumlar ve inovasyon buluşmalarının düzenlenmesi, akademik camia ve sektörün katkısıyla raporlar hazırlanması; dijital dönüşüm ve sanayi politikalarına yön vermeyi, yerli yazılım ve donanımı teşvik etmeyi, küresel rekabette milli duruşu korumayı, ahlak ve hikmetli yaklaşımı, sahaya dayalı analizlerle uygulanabilir çözümler üretmeyi, insan odaklı teknolojiyi, sürdürülebilir büyümeyi&nbsp;dikkate alan bu raporlar geniş katılımlı lansmanlarla paylaşılır.</p><p>&nbsp;</p>",
      "backgroundImage": ""
    },
    "slug": "dusunce-enstitusu/bilim-teknoloji",
    "category": "dusunce",
    "sections": [
      {
        "id": "focus",
        "items": [
          {
            "title": "Yapay zekâ & veri",
            "description": "Model güvenliği, etik AI ve veri yönetişimi."
          },
          {
            "title": "Siber güvenlik",
            "description": "Tehdit analizi, koruma ve farkındalık programları."
          },
          {
            "title": "Biyoteknoloji",
            "description": "Sağlık teknolojileri ve etik değerlendirmeler."
          },
          {
            "title": "Endüstri 4.0",
            "description": "IoT, otomasyon ve akıllı üretim."
          },
          {
            "title": "Teknoloji politikası",
            "description": "Regülasyon, standartlar ve toplumsal etki analizleri."
          }
        ],
        "title": "Teknoloji ve etik kesişimi",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Araştırma alanları"
      },
      {
        "id": "programs",
        "items": [
          {
            "title": "Teknoloji politikası atölyesi",
            "description": "Regülasyon ve etik çerçeveler üzerine senaryolar."
          },
          {
            "title": "AI güvenliği modülleri",
            "description": "Model güvenliği ve risk yönetimi eğitimleri."
          },
          {
            "title": "Siber güvenlik kampı",
            "description": "Uygulamalı kırmızı/mavi takım çalışmaları."
          },
          {
            "title": "Derin teknoloji demo day",
            "description": "Prototip sunumları ve yatırımcı buluşmaları."
          }
        ],
        "title": "Eğitim ve uygulama",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Programlar"
      },
      {
        "id": "highlights",
        "items": [
          {
            "title": "AI etik kılavuzu",
            "description": "Kurumlar için uygulanabilir prensipler."
          },
          {
            "title": "Siber tehdit görünümü",
            "description": "Güncel tehdit haritası ve korunma önerileri."
          },
          {
            "title": "Biyoteknoloji dosyası",
            "description": "Sağlık teknolojilerinde etik ve güvenlik."
          },
          {
            "title": "Teknoloji radar",
            "description": "Yükselen teknolojiler için kısa özetler."
          }
        ],
        "title": "Rapor ve ürünler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Öne çıkan içerikler"
      },
      {
        "id": "engagement",
        "items": [
          {
            "title": "Danışmanlık alın",
            "description": "Teknoloji stratejisi ve etik çerçeve desteği."
          },
          {
            "title": "Eğitim talep edin",
            "description": "AI güvenliği, siber güvenlik ve veri yönetişimi eğitimleri."
          },
          {
            "title": "Araştırma ortaklığı kurun",
            "description": "Pilot projeler ve test ortamları oluşturun."
          }
        ],
        "title": "Teknoloji projelerinizi güçlendirin",
        "layout": "list",
        "eyebrow": "Katılım yolları"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      },
      "secondaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Yayın Anlayışımız | TARF",
      "description": "Bilimi irfanla, teknolojiyi insanlıkla buluşturan yayın anlayışımızı ve editöryel duruşumuzu keşfedin."
    },
    "hero": {
      "badge": "",
      "stats": [],
      "title": "Yayın Anlayışımız",
      "actions": [
        {
          "href": "https://tarfdergisi.com.tr",
          "label": "TARF Dergi"
        }
      ],
      "eyebrow": "Yayınlar",
      "subtitle": "Bilginin Hakikatle Buluştuğu Bir Yayın Duruşu",
      "videoUrl": "",
      "highlight": "",
      "description": "<p>Yayınlarımızda okurları hakikate yakınlaştıran bir nazar, ölçüyü gözeten bir idrak, bilginin ötesini fark ettiren bir irfani duruş ve düşünce kazandırmak en büyük amacımızdır.</p><p>Varlığı anlamlandırmak, eşyayı yerli yerine koymak ve bilginin hakikatle buluştuğu o ince çizgiyi gözetmek…</p><p>Yayınlarımız bu nazif ve nafiz bakışı merkeze alarak bir yolculuğa çıkmak üzere hazırlanır; bilimi irfanla, teknolojiyi insanlıkla, veriyi hikmetle, dijitalleşmeyi sorumlulukla buluşturma gayreti…&nbsp;</p><p>Her bir yayın çağımızın en kritik alanlarına temas eder. İnsanlığın karşı karşıya olduğu dönüşümlerin başka bir yüzünü ele alır. Bazen teknolojik bağımsızlığın stratejik, ahlakî ve medeniyet tasavvurumuzu ilgilendiren yönlerini bazen tabiatın ilahi düzen içindeki yerini ve insanın bu düzeni koruma sorumluluğunu ve sürdürülebilirliğin modern bir kavramdan çok daha önce, kadim irfanımızın bir gereği olduğunu bazen de dijital dünyanın sunduğu imkanların yanında, insanın öz iradesini, mahremiyetini ve zihinsel bağımsızlığını tehdit eden boyutlarını…</p><p>Fakat hepsi aynı hakikate işaret eder; insan, elindeki gücü hangi maksatla ve hangi ölçü içinde kullanırsa geleceğini de o yönde şekillendirecektir.&nbsp;</p><p>Bilginin hakikate, teknolojinin iyiliğe, dönüşümün hikmete yöneldiği bir gelecek…</p><p>Yayınlarımızda gayretimiz, çabamız, niyetimiz hep bu yöndedir. Yayınlarımız verdiğimiz mesajın, tuttuğumuz aynanın, sürdürdüğümüz irfani duruşun bütünüdür.</p>",
      "backgroundImage": ""
    },
    "slug": "yayin-anlayisimiz",
    "category": "yayinlar",
    "sections": [
      {
        "id": "yayin-cizgisi",
        "items": [
          {
            "title": "Bilim ve irfan dengesi",
            "description": "Yayınlarımız, bu nazif ve nafiz bakışı merkeze alarak bir yolculuğa çıkmak üzere hazırlanır; bilimi irfanla, teknolojiyi insanlıkla, veriyi hikmetle, dijitalleşmeyi sorumlulukla buluşturma gayreti…"
          },
          {
            "title": "Çağın dönüşümleri",
            "description": "Ortaya koyduğumuz her bir çalışma, çağımızın en kritik alanlarına temas eder. İnsanlığın karşı karşıya olduğu dönüşümlerin başka bir yüzünü ele alır."
          },
          {
            "title": "Sorumluluk alanları",
            "description": "Bazen teknolojik bağımsızlığın stratejik, ahlakî ve medeniyet tasavvurumuzu ilgilendiren yönlerini, bazen tabiatın ilahi düzen içindeki yerini ve insanın bu düzeni koruma sorumluluğunu ve sürdürülebilirliğin modern bir kavramdan çok daha önce, kadim irfanımızın bir gereği olduğunu; bazen de dijital dünyanın sunduğu imkânların yanında, insanın öz iradesini, mahremiyetini ve zihinsel bağımsızlığını tehdit eden boyutlarını…"
          }
        ],
        "title": "İrfanla merkezlenen yolculuk",
        "layout": "list",
        "eyebrow": "Yayın çizgisi"
      },
      {
        "id": "istikamet",
        "items": [
          {
            "title": "İnsan ve ölçü",
            "description": "Fakat hepsi aynı hakikate işaret eder; insan, elindeki gücü hangi maksatla ve hangi ölçü içinde kullanırsa geleceğini de o yönde şekillendirecektir."
          },
          {
            "title": "Gelecek tasavvuru",
            "description": "Bilginin hakikate, teknolojinin iyiliğe, dönüşümün hikmete yöneldiği bir gelecek…"
          },
          {
            "title": "Niyet ve gayret",
            "description": "Bu mecrada gayretimiz, çabamız, niyetimiz hep bu yöndedir. Ortaya koyduğumuz külliyat, verdiğimiz mesajın, tuttuğumuz aynanın, sürdürdüğümüz irfani duruşun bütünüdür."
          }
        ],
        "title": "Ölçü ve sorumluluk",
        "layout": "list",
        "eyebrow": "İstikamet"
      }
    ]
  },
  {
    "cta": {
      "title": "Çerez tercihlerinizi yönetin",
      "description": "Tercihlerinizi dilediğiniz zaman güncelleyebilirsiniz.",
      "primaryAction": {
        "href": "cerez-politikasi",
        "label": "Tercihlerimi Güncelle"
      },
      "secondaryAction": {
        "href": "gizlilik-politikasi",
        "label": "Gizlilik Merkezi"
      }
    },
    "seo": {
      "title": "Çerez Politikası | TARF",
      "description": "Çerez türleri, kullanım amaçları ve tercih yönetimi hakkında bilgi alın."
    },
    "hero": {
      "title": "Çerez Politikası",
      "actions": [
        {
          "href": "cerez-politikasi",
          "label": "Tercihleri Yönet"
        },
        {
          "href": "contact",
          "label": "Destek Al",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Yasal",
      "subtitle": "Çerezler ve benzeri teknolojiler hakkında bilgilendirme",
      "description": "KVKK ve Kişisel Verileri Koruma Kurumu Çerez Rehberi doğrultusunda çerez kullanımımızı ve tercih yönetimini açıklarız."
    },
    "slug": "cerez-politikasi",
    "category": "yasal",
    "sections": [
      {
        "id": "about",
        "items": [
          {
            "title": "Tanım",
            "description": "Çerezler, cihazınıza kaydedilen küçük metin dosyalarıdır."
          },
          {
            "title": "Benzeri teknolojiler",
            "description": "Piksel, SDK ve yerel depolama gibi teknolojiler de benzer amaçlarla kullanılabilir."
          },
          {
            "title": "Kullanım amacı",
            "description": "Site işleyişi, güvenlik, performans ve deneyim iyileştirme."
          }
        ],
        "title": "Çerez nedir?",
        "layout": "list",
        "eyebrow": "Genel bilgiler"
      },
      {
        "id": "legal",
        "items": [
          {
            "title": "Zorunlu çerezler",
            "description": "Sitenin çalışması için gereklidir ve açık rıza gerektirmez."
          },
          {
            "title": "Diğer çerezler",
            "description": "Analitik, performans ve pazarlama çerezleri için açık rıza alınır."
          },
          {
            "title": "Rızayı geri alma",
            "description": "Tercihlerinizi dilediğiniz zaman değiştirebilirsiniz."
          }
        ],
        "title": "Açık rıza ve zorunlu çerezler",
        "layout": "list",
        "eyebrow": "Hukuki dayanak"
      },
      {
        "id": "types",
        "items": [
          {
            "title": "Zorunlu çerezler",
            "description": "Oturum yönetimi, güvenlik ve form işlemleri için."
          },
          {
            "title": "Performans çerezleri",
            "description": "Site kullanımını ölçerek deneyimi iyileştirme."
          },
          {
            "title": "İşlevsel çerezler",
            "description": "Dil tercihi ve kullanıcı ayarlarını hatırlama."
          },
          {
            "title": "Pazarlama çerezleri",
            "description": "İzin verilmesi halinde kişiselleştirilmiş içerik ve kampanyalar."
          }
        ],
        "title": "Kullandığımız çerez kategorileri",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Çerez türleri"
      },
      {
        "id": "duration",
        "items": [
          {
            "title": "Oturum çerezleri",
            "description": "Tarayıcı kapatıldığında silinir."
          },
          {
            "title": "Kalıcı çerezler",
            "description": "Belirli bir süre cihazınızda saklanır."
          },
          {
            "title": "Süreler",
            "description": "Süreler çerez türüne göre değişir."
          }
        ],
        "title": "Çerez saklama süreleri",
        "layout": "list",
        "eyebrow": "Süreler"
      },
      {
        "id": "third-party",
        "items": [
          {
            "title": "Hizmet sağlayıcılar",
            "description": "Analitik ve altyapı sağlayıcıları tarafından çerezler yerleştirilebilir."
          },
          {
            "title": "Yurt dışı aktarım",
            "description": "Veri aktarımları KVKK ve ilgili mevzuata uygun şekilde yapılır."
          },
          {
            "title": "Sözleşmesel güvence",
            "description": "Üçüncü taraflarla gizlilik ve güvenlik yükümlülükleri bulunur."
          }
        ],
        "title": "Üçüncü taraf çerezleri",
        "layout": "list",
        "eyebrow": "Üçüncü taraflar"
      },
      {
        "id": "management",
        "items": [
          {
            "title": "Tercih merkezi (varsa)",
            "description": "Çerez banner’ı veya tercih merkezi üzerinden seçim yapabilirsiniz."
          },
          {
            "title": "Tarayıcı ayarları",
            "description": "Chrome, Firefox, Safari ve Edge üzerinden çerezleri silebilirsiniz."
          },
          {
            "title": "Kısıtlamaların etkisi",
            "description": "Bazı çerezleri reddetmek hizmetlerin çalışmasını etkileyebilir."
          }
        ],
        "title": "Çerez tercihlerinizi nasıl yönetebilirsiniz?",
        "layout": "list",
        "eyebrow": "Yönetim"
      },
      {
        "id": "updates",
        "items": [
          {
            "title": "Yürürlük tarihi",
            "description": "Güncelleme tarihi sayfanın üst kısmında belirtilir."
          },
          {
            "title": "Bildirim",
            "description": "Önemli değişikliklerde duyuru yapılır."
          }
        ],
        "title": "Politika değişimleri",
        "layout": "list",
        "eyebrow": "Güncellemeler"
      }
    ]
  },
  {
    "cta": {
      "title": "Bir kulübe katıl veya yeni kulüp kur",
      "description": "Topluluk koordinatörlerimiz sizi uygun kulüp veya takımla eşleştirsin.",
      "primaryAction": {
        "href": "contact",
        "label": "Kulübe Katıl"
      },
      "secondaryAction": {
        "href": "kulupler/teknoloji-takimlari",
        "label": "Takımları Gör"
      }
    },
    "seo": {
      "title": "TARF Kulüpler ve Takımları | Topluluk Ekosistemi",
      "description": "Öğrenci kulüpleri, teknoloji takımları, etkinlikler ve başarılar hakkında bilgi alın."
    },
    "hero": {
      "stats": [
        {
          "label": "Aktif kulüp",
          "value": "22",
          "helper": "Teknoloji + kültür"
        },
        {
          "label": "Toplam üye",
          "value": "2.100+",
          "helper": "Öğrenci"
        },
        {
          "label": "Proje",
          "value": "160",
          "helper": "Geliştirilen ürün"
        }
      ],
      "title": "TARF Kulüpler ve Takımları",
      "actions": [
        {
          "href": "kulupler",
          "label": "Kulüpleri Keşfet"
        },
        {
          "href": "contact",
          "label": "Kulüp Kur",
          "variant": "secondary"
        }
      ],
      "eyebrow": "Kulüpler ve Takımlar",
      "subtitle": "Takım bilinci, proje yönetimi ve üretim disiplini",
      "description": "Öğrencilerin gerçek projelerde görev aldığı, yarışmalara katıldığı ve topluluk oluşturduğu kulüpler ve teknoloji takımlarından oluşan canlı bir ekosistem."
    },
    "slug": "kulupler",
    "category": "kulupler",
    "sections": [
      {
        "id": "categories",
        "items": [
          {
            "title": "Öğrenci Kulüpleri",
            "description": "Teknoloji, bilim, kültür ve girişimcilik kulüpleri."
          },
          {
            "title": "Teknoloji Takımları",
            "description": "Robotik, AI, oyun geliştirme, AR/VR ve araştırma takımları."
          }
        ],
        "title": "Öğrenci kulüpleri ve teknoloji takımları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Ana kategoriler"
      },
      {
        "id": "work",
        "items": [
          {
            "title": "Robotik",
            "description": "Mekanik tasarım, elektronik, yarışmalar."
          },
          {
            "title": "Yapay zekâ",
            "description": "Makine öğrenmesi ve veri bilimi projeleri."
          },
          {
            "title": "Yazılım geliştirme",
            "description": "Web ve mobil uygulama ekipleri."
          },
          {
            "title": "Oyun geliştirme",
            "description": "Game jam, indie projeler."
          },
          {
            "title": "AR/VR",
            "description": "XR deneyimleri ve eğitim simülasyonları."
          },
          {
            "title": "Bilimsel araştırmalar",
            "description": "Akademik proje ve yayın destekleri."
          }
        ],
        "title": "Takımların uzmanlık alanları",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Çalışma alanları"
      },
      {
        "id": "activities",
        "items": [
          {
            "title": "Kulüp buluşmaları",
            "description": "Haftalık toplantılar ve proje sprintleri."
          },
          {
            "title": "Hackathon & yarışmalar",
            "description": "Takımlar yarışmalara hazırlanır, ödüller kazanır."
          },
          {
            "title": "Proje sunumları",
            "description": "Demo day ve vitrin etkinlikleri."
          }
        ],
        "title": "Topluluk deneyimi",
        "layout": "list",
        "eyebrow": "Etkinlikler"
      }
    ]
  },
  {
    "cta": {
      "title": "Bilgiyle Hikmeti, Teknolojiyle İrfanı Buluşturan Çalışmalarımızda Siz de Yerinizi Alın. ",
      "description": "Ücretsiz danışmanlık görüşmesi planlayabilir, eğitim programlarımıza katılabilir, projelerimize katkı sunabilir, ilgi alanlarınıza uygun çalışma gruplarında gönüllü olarak yer alabilirsiniz. Birlikte düşünmek, üretmek ve topluma değer katmak için bize katılın. Üreten, düşünen ve sorumluluk alan bir topluluğun parçası olun. Eğitimlerimizde, projelerimizde ve çalışma alanlarımızda yeteneklerinizi geliştirin, geleceğe katkı sunun. Fikirlerinizle, emeğinizle ve heyecanınızla aramıza katılın.",
      "primaryAction": {
        "href": "",
        "label": ""
      }
    },
    "seo": {
      "title": "Teknoloji Danışmanlığı | TARF Yazılım",
      "description": "Strateji, mimari ve DevOps alanlarında danışmanlık hizmetleri."
    },
    "hero": {
      "badge": "",
      "stats": [
        {
          "label": "Kurumsal müşteri",
          "value": "24",
          "helper": "Sürdürülen proje"
        },
        {
          "label": "Danışman",
          "value": "18",
          "helper": "Kıdemli uzman"
        },
        {
          "label": "ROI artışı",
          "value": "%32",
          "helper": "Ortalama iyileşme"
        }
      ],
      "title": "Teknoloji Danışmanlığı",
      "actions": [],
      "eyebrow": "Yazılım Teknolojileri",
      "subtitle": "Geleceğe Yön Veren Teknoloji Danışmanlığı",
      "videoUrl": "",
      "highlight": "",
      "description": "<p><strong>TARF Yazılım Teknolojileri</strong>, kurumların dijital dönüşüm süreçlerinde doğru teknolojiyi, doğru zamanda ve doğru mimariyle kullanmalarını sağlamak amacıyla teknoloji danışmanlığı hizmetleri sunar.</p><p>Teknoloji danışmanlığımız; yalnızca mevcut sistemlerin değerlendirilmesiyle sınırlı kalmaz, kurumun hedefleri, iş süreçleri ve büyüme vizyonu doğrultusunda sürdürülebilir ve ölçeklenebilir çözümler üretmeyi esas alır.</p><h3><strong><u>Danışmanlık Kapsamımız:</u></strong></h3><p><strong>        Dijital Dönüşüm Stratejileri</strong></p><ul><li>Kurumsal süreçlerin analiz edilmesi, dijitalleşme yol haritasının oluşturulması ve uygulanması.</li></ul><p><strong>        Yazılım Mimari Danışmanlığı</strong></p><ul><li>Mevcut veya planlanan yazılım projeleri için doğru mimari yapıların belirlenmesi (monolitik, mikroservis, bulut tabanlı yapılar).</li></ul><p><strong>        Teknoloji Seçimi ve Yol Haritası</strong></p><ul><li>Kuruma en uygun yazılım dilleri, framework’ler, altyapı ve teknolojilerin belirlenmesi.</li></ul><p><strong>        Sistem Analizi ve İyileştirme</strong></p><ul><li>Performans, güvenlik ve sürdürülebilirlik açısından mevcut sistemlerin analiz edilmesi ve geliştirme önerilerinin sunulması.</li></ul><p><strong>        Bulut ve Altyapı Danışmanlığı</strong></p><ul><li>Bulut mimarileri, sunucu yapıları, yedekleme ve ölçeklenebilir altyapı çözümleri.</li></ul><p><strong>         Güvenlik ve Veri Yönetimi</strong></p><ul><li>Bilgi güvenliği, veri bütünlüğü ve erişim politikalarının oluşturulması.</li></ul><h3><strong>Yaklaşımımız</strong></h3><p>TARF olarak teknolojiye yalnızca teknik bir araç değil, stratejik bir değer olarak bakıyoruz. Akademik birikim ile saha tecrübesini birleştirerek; kısa vadeli çözümler yerine uzun vadeli, güvenilir ve geliştirilebilir yapılar inşa edilmesine rehberlik ediyoruz.</p><h3><strong>Hedefimiz</strong></h3><p>Kurumların teknoloji yatırımlarını verimli, ölçülebilir ve sürdürülebilir hale getirerek; rekabet gücünü artıran, geleceğe hazır sistemler oluşturmalarına destek olmak.</p>",
      "backgroundImage": ""
    },
    "slug": "yazilim/danismanlik",
    "category": "yazilim",
    "sections": [
      {
        "id": "services",
        "items": [
          {
            "title": "Dijital dönüşüm stratejisi",
            "description": "BT yol haritası, süreç dijitalizasyonu."
          },
          {
            "title": "Mimari tasarım",
            "description": "Mikro servis, event-driven ve güvenlik mimarileri."
          },
          {
            "title": "DevOps & cloud",
            "description": "CI/CD kurulumları, cloud migration, IaC."
          },
          {
            "title": "Teknoloji eğitimleri",
            "description": "Kurumsal eğitim programları, teknoloji sohbetleri."
          }
        ],
        "title": "Analizden uygulamaya",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Hizmet başlıkları"
      },
      {
        "id": "process",
        "items": [
          {
            "title": "Keşif ve analiz",
            "description": "İhtiyaç analizi, mevcut durum fotoğrafı."
          },
          {
            "title": "Strateji geliştirme",
            "description": "Hedef mimari ve yol haritası."
          },
          {
            "title": "Uygulama planı",
            "description": "Sprint tabanlı uygulama ve ölçüm KPI’ları."
          },
          {
            "title": "Sürekli optimizasyon",
            "description": "Periyodik değerlendirme ve destek."
          }
        ],
        "title": "Şeffaf danışmanlık modeli",
        "layout": "timeline",
        "eyebrow": "Çalışma süreci"
      },
      {
        "id": "sectors",
        "items": [
          {
            "title": "Eğitim & EdTech",
            "description": "Öğrenme platformları ve içerik yönetimi."
          },
          {
            "title": "E-ticaret",
            "description": "Çok kanallı satış, envanter ve lojistik."
          },
          {
            "title": "Fintech",
            "description": "Ödeme sistemleri, regülasyon uyumu."
          },
          {
            "title": "Sağlık",
            "description": "Tele sağlık, veri güvenliği."
          },
          {
            "title": "Start-up ekosistemi",
            "description": "MVP geliştirme, ölçekleme."
          }
        ],
        "title": "Çalıştığımız sektörler",
        "layout": "grid",
        "columns": 2,
        "eyebrow": "Deneyim alanları"
      }
    ]
  }
]

export const contentPageList = allContentPages

export const contentPageSlugs = allContentPages.map((page) => page.slug)

export const headerPageSlugs = [
  'hakkimizda',
  'vizyon-degerler',
  'yonetim-ilkeleri',
  'dusunce-enstitusu',
  'dusunce-enstitusu/egitim',
  'dusunce-enstitusu/genclik',
  'dusunce-enstitusu/aile',
  'dusunce-enstitusu/kultur-sanat',
  'dusunce-enstitusu/uluslararasi-iliskiler',
  'dusunce-enstitusu/cevre-iklim-doga',
  'dusunce-enstitusu/bilim-teknoloji',
  'akademi',
  'akademi/seminerler',
  'akademi/konferanslar',
  'akademi/calistaylar',
  'akademi/sertifika-programlari',
  'yazilim/gelistirme',
  'yazilim/danismanlik',
  'yazilim/siber-guvenlik',
  'kulupler/ogrenci-kulupleri',
  'kulupler/teknoloji-takimlari',
  'yayin-anlayisimiz',
  'dergi',
]

const contentPageMap = allContentPages.reduce<Record<string, ContentPageDefinition>>((acc, page) => {
  acc[page.slug] = page
  return acc
}, {})

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
