
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    // 1. En son alınan yedeği bul
    const backupBaseDir = path.join(process.cwd(), '_backup', 'db');

    if (!fs.existsSync(backupBaseDir)) {
        console.error('❌ Backup klasörü bulunamadı: _backup/db');
        process.exit(1);
    }

    const backups = fs.readdirSync(backupBaseDir).sort().reverse();
    if (backups.length === 0) {
        console.error('❌ Hiçbir yedek bulunamadı.');
        process.exit(1);
    }

    const latestBackup = backups[0]; // En yeni klasör (tarih isimlendirmesi sayesinde)
    const backupDir = path.join(backupBaseDir, latestBackup);

    console.log(`📂 Geri yükleme kaynağı: ${latestBackup}`);
    console.log(`⚠️  DİKKAT: Bu işlem yerel veritabanındaki MEVCUT VERİLERİ SİLECEKTİR.`);

    // Kullanıcı onayı simülasyonu - scripti çalıştıran kişi bunu bilerek yapıyor kabul ediyoruz
    // Gerçek bir CLI'da prompt konulabilir.

    // 2. Yükleme Sırası (Bağımlılıklara göre önemli!)
    // Önce bağımsız tablolar, sonra child tablolar
    // Foreign Key hatalarını önlemek için silme sırası TERSTEN olmalı, ekleme sırası DÜZ olmalı.

    const modelsToRestore = [
        'category',
        'contentPage', // Enum kullanıyor, Category modeline bağımlı değil
        'hero',
        'setting',
        'fAQ',      // Model ismi: FAQ (büyük/küçük harf dikkat) -> Prisma Client'ta fAQ olarak geçebilir veya FAQ. 
        // backup scriptinde 'fAQ' kullanmıştık.
        'media',
        'application',
        'post'      // Category'ye bağımlı (categoryId)
    ];

    // Silme Sırası (Post önce silinmeli çünkü Category'ye bağlı)
    console.log('🧹 Eski veriler temizleniyor...');

    // Transaction ile yapmıyoruz çünkü TRUNCATE/DELETE cascade ayarlanmamış olabilir, manuel sıra ile siliyoruz.
    try {
        await prisma.post.deleteMany();
        await prisma.application.deleteMany();
        await prisma.media.deleteMany();
        await prisma.fAQ.deleteMany();
        await prisma.setting.deleteMany();
        await prisma.hero.deleteMany();
        await prisma.contentPage.deleteMany();
        await prisma.category.deleteMany();

        console.log('✅ Tablolar temizlendi.');
    } catch (e) {
        console.error('❌ Temizleme sırasında hata:', e);
        console.warn('Devam ediliyor, ancak unique constraint hataları alabilirsiniz...');
    }

    // 3. Verileri Yükle
    console.log('📥 Veriler yükleniyor...');

    for (const modelName of modelsToRestore) {
        const filePath = path.join(backupDir, `${modelName}.json`);

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(fileContent);

            if (Array.isArray(data) && data.length > 0) {
                console.log(`➡️  ${modelName}: ${data.length} kayıt yükleniyor...`);

                try {
                    // @ts-ignore
                    // FAQ model ismi konusunda hassaslık olabilir, prisma[modelName] undefined ise kontrol et.
                    let targetModel = prisma[modelName];

                    // Prisma Client'ta model isimleri genellikle camelCase olur (user, post, category).
                    // Ancak şemadaki isme göre değişebilir. Schema: FAQ -> fAQ (generated output)
                    // Eğer doğrudan bulamazsak alternatifleri dene
                    if (!targetModel) {
                        // @ts-ignore
                        if (prisma[modelName.toLowerCase()]) targetModel = prisma[modelName.toLowerCase()];
                        // @ts-ignore
                        else if (prisma['FAQ']) targetModel = prisma['FAQ']; // Özel durum
                    }

                    if (targetModel) {
                        // createMany, PostgreSQL'de desteklenir ve hızlıdır.
                        // SkipDuplicates kullanılabilir ama temizlediğimiz için gerek yok.
                        await targetModel.createMany({
                            data: data,
                            skipDuplicates: true // Ne olur ne olmaz
                        });
                        console.log(`✅ ${modelName} tamamlandı.`);
                    } else {
                        console.error(`❌ Model client üzerinde bulunamadı: ${modelName}`);
                    }
                } catch (error) {
                    console.error(`❌ ${modelName} yüklenirken hata:`, error);
                }
            } else {
                console.log(`ℹ️  ${modelName}: Veri yok veya boş.`);
            }
        } else {
            console.warn(`⚠️  Dosya bulunamadı: ${modelName}.json`);
        }
    }

    console.log('🎉 Geri yükleme tamamlandı!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
