
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const locale = 'tr'

    console.log('--- Starting Test Update ---')

    // 1. Fetch current
    const currentSetting = await prisma.setting.findUnique({ where: { locale } })
    console.log('Current DB Content:', JSON.stringify(currentSetting?.contactContent, null, 2))

    const current: Record<string, unknown> =
        ((currentSetting as unknown as { contactContent?: Record<string, unknown> | null })?.contactContent ?? {})

    // 2. Simulate Form Data
    const localeContent = {
        heroTitle: 'Test Hero Title ' + new Date().toISOString(),
        cta: {
            title: 'Test CTA Title',
            primaryAction: { label: 'Test Button', href: '/test' }
        }
    }

    // 3. Merge
    const contactContent = {
        ...current,
        [locale]: { ...(current?.[locale] as Record<string, unknown> | undefined), ...localeContent },
    }

    console.log('New Content to Save:', JSON.stringify(contactContent, null, 2))

    // 4. Upsert
    const updateData = {
        siteName: currentSetting?.siteName || 'TARF Akademi',
        contactContent: contactContent,
    }

    await prisma.setting.upsert({
        where: { locale },
        update: updateData,
        create: {
            locale,
            siteName: 'TARF Akademi',
            contactContent
        }
    })

    console.log('--- Upsert Completed ---')

    // 5. Verify
    const verifiedValues = await prisma.setting.findUnique({ where: { locale } })
    console.log('Verified DB Content:', JSON.stringify(verifiedValues?.contactContent, null, 2))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
