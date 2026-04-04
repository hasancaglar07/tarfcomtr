import { rmSync } from 'node:fs'
import { join } from 'node:path'

const nextDir = join(process.cwd(), '.next')

try {
  rmSync(nextDir, { recursive: true, force: true })
  console.log('[dev-reset] .next klasoru temizlendi')
} catch (error) {
  console.error('[dev-reset] .next temizlenemedi', error)
  process.exit(1)
}
