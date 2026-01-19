
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Bu script "script/backup-db.ts" ile benzerdir ancak 
// veriyi "DATABASE_URL" yerine "DATABASE_URL_PROD" üzerinden çeker.

async function main() {
    let prodUrl = process.env.DATABASE_URL_PROD;

    if (!prodUrl) {
        console.warn('⚠️  UYARI: DATABASE_URL_PROD değişkeni bulunamadı.');
        console.warn('⚠️  .env dosyasındaki varsayılan DATABASE_URL kullanılıyor.');
        prodUrl = process.env.DATABASE_URL;

        if (!prodUrl) {
            console.error('❌ HATA: DATABASE_URL da bulunamadı. İşlem durduruluyor.');
            process.exit(1);
        }
    }

    console.log('🌍 Canlı veritabanına bağlanılıyor...');

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: prodUrl
            }
        }
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), '_backup', 'db', `prod_${timestamp}`);

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log(`📥 Canlı veriler indiriliyor... Klasör: ${backupDir}`);

    const models = [
        'contentPage',
        'category',
        'post',
        'fAQ',
        'hero',
        'setting',
        'media',
        'application'
    ];

    for (const modelName of models) {
        try {
            // @ts-ignore
            if (prisma[modelName]) {
                // @ts-ignore
                const data = await prisma[modelName].findMany();
                const filePath = path.join(backupDir, `${modelName}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(`✅ ${modelName}: ${data.length} kayıt indirildi.`);
            } else {
                // @ts-ignore
                // Case sensitivity check for FAQ/fAQ
                const altName = modelName.toLowerCase();
                // @ts-ignore
                if (prisma[altName]) {
                    // @ts-ignore
                    const data = await prisma[altName].findMany();
                    const filePath = path.join(backupDir, `${modelName}.json`); // Keep consistent filename for restore
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                    console.log(`✅ ${modelName} (${altName}): ${data.length} kayıt indirildi.`);
                } else {
                    console.warn(`⚠️ Model bulunamadı: ${modelName}.`);
                }
            }
        } catch (error) {
            console.error(`❌ Hata (${modelName}):`, error);
        }
    }

    console.log('🎉 İndirme tamamlandı!');
    console.log('💡 Bu verileri yerel veritabanına yüklemek için şu komutu çalıştırın:');
    console.log('   npm run db:restore');

    await prisma.$disconnect();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
