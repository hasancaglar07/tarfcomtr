
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// Bu dosyayı proje kökünde 'scripts/pull_prod_content.ts' olarak kaydedin.

/**
 * PRODUCTION DATASINDAN YEREL KODA AKTARIM SCRIPT'İ
 * 
 * Bu scriptin amacı:
 * 1. Canlı veritabanına (Production) bağlanmak.
 * 2. 'ContentPage' tablosundaki güncel verileri çekmek.
 * 3. Bu verileri yerel 'content/content-pages.ts' dosyasının formatına uygun şekilde dönüştürüp yazmak.
 * 4. Böylece yerel development ortamında, canlıdaki en güncel içerikle çalışılmasını sağlamak.
 * 
 * Kullanım:
 * 1. .env dosyanıza DATABASE_URL_PROD değişkenini ekleyin.
 *    Örnek: DATABASE_URL_PROD="postgresql://user:pass@prod-host:5432/db_name"
 * 2. 'npm run db:pull' komutunu çalıştırın (package.json'a ekledikten sonra).
 */

const TARGET_PATH = path.join(process.cwd(), 'content/content-pages.ts')

// --- Şablon Parçaları (rebuild scriptinden alındı) ---

const categoryLabelsCode = `
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
`

const interfacesCode = `import { LucideIcon } from 'lucide-react'

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
`

const exportsCode = `
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
`

async function pullContentFromProd() {
    console.log('🌍 Connecting to Production DB...')

    const prodUrl = process.env.DATABASE_URL_PROD

    if (!prodUrl) {
        console.warn('⚠️  UYARI: DATABASE_URL_PROD environment değişkeni bulunamadı.')
        console.warn('⚠️  Varsayılan olarak mevcut DATABASE_URL kullanılıyor (bu lokal DB olabilir).')
        console.warn('⚠️  Canlı veriyi çekmek için .env dosyasına DATABASE_URL_PROD ekleyin.')
    }

    // Prisma Client'ı manuel URL ile başlat
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: prodUrl || process.env.DATABASE_URL
            }
        }
    })

    try {
        console.log('📥 Fetching content pages...')
        const records = await prisma.contentPage.findMany({
            orderBy: { slug: 'asc' }
        })
        console.log(`✅ Found ${records.length} pages.`)

        if (records.length === 0) {
            console.error('❌ No content pages found! Aborting to prevent empty file.')
            return
        }

        // Veriyi temizle ve formatla
        const pages = records.map((record: any) => {
            const data = record.data
            // DB'deki ana özellikler data objesine öncelik ezici olarak eklenir
            data.slug = record.slug
            data.category = record.category

            // Fazlalık property'leri temizle (Typescript hatası vermesin diye)
            if ('status' in data) delete data.status
            if ('publishedAt' in data) delete data.publishedAt
            if ('createdAt' in data) delete data.createdAt
            if ('updatedAt' in data) delete data.updatedAt

            return data
        })

        const pagesJson = JSON.stringify(pages, null, 2)

        const fileContent = interfacesCode + '\n' +
            categoryLabelsCode + '\n' +
            'const allContentPages: ContentPageDefinition[] = ' + pagesJson + '\n' +
            exportsCode;

        fs.writeFileSync(TARGET_PATH, fileContent)
        console.log(`💾 Successfully updated ${TARGET_PATH}`)
        console.log('✅ Local content is now in sync with the database.')

    } catch (error) {
        console.error('❌ Error fetching content:', error)
    } finally {
        await prisma.$disconnect()
    }
}

pullContentFromProd()
