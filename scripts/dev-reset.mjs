import { rmSync } from 'node:fs'
import { join } from 'node:path'

const nextDir = join(process.cwd(), '.next')

try {
  rmSync(nextDir, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100,
  })
  console.log('[dev-reset] .next klasoru temizlendi')
} catch (error) {
  console.warn('[dev-reset] .next klasoru kullanimda olabilir, temizleme atlaniyor:', error.message)
}

// Hata olsa bile devam et, sunucuyu başlat
console.log('[dev-reset] Sunucu başlatılıyor...')
