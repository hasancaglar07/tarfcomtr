
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), '_backup', 'db', timestamp);

    // Klasörü oluştur
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log(`B
ackup starting... saving to: ${backupDir}`);

    // Modelleri tanımla (schema.prisma'dan)
    const models = [
        'contentPage',
        'category',
        'post',
        'fAQ', // Prisma client'ta bazen büyük/küçük harf değişebilir, aşağıda kontrol edeceğiz
        'hero',
        'setting',
        'media',
        'application'
    ];

    for (const modelName of models) {
        try {
            // @ts-ignore - Dinamik erişim
            if (prisma[modelName]) {
                // @ts-ignore
                const data = await prisma[modelName].findMany();
                const filePath = path.join(backupDir, `${modelName}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(`✅ ${modelName}: ${data.length} kayıt yedeklendi.`);
            } else {
                // Modellerin Prisma Client'taki tam adlarını bulmak için (örn FAQ -> fAQ veya faq olabilir)
                // Genellikle model ismi küçük harfle başlar. FAQ -> fAQ
                console.warn(`⚠️ Model bulunamadı: ${modelName}. İsimlendirmeyi kontrol edin.`);
            }
        } catch (error) {
            console.error(`❌ Hata (${modelName}):`, error);
        }
    }

    console.log('Backup completed successfully! 🎉');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
