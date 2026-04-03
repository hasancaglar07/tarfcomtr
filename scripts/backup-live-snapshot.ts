import { PrismaClient } from '@prisma/client'
import { list } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

const ROOT = process.cwd()

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, eqIndex).trim()
    if (!key || process.env[key] !== undefined) {
      continue
    }

    let value = trimmed.slice(eqIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    process.env[key] = value
  }
}

loadEnvFile(path.join(ROOT, '.env.local'))
loadEnvFile(path.join(ROOT, '.env'))

const SITE_URL =
  process.env.BACKUP_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://tarfakademi.com'
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupRoot = path.join(ROOT, '_backup', 'live', timestamp)
const dbDir = path.join(backupRoot, 'db-json')
const blobDir = path.join(backupRoot, 'blob-store')
const siteDir = path.join(backupRoot, 'site-mirror')
const metaDir = path.join(backupRoot, 'meta')

const databaseUrl = process.env.DATABASE_URL_PROD || process.env.DATABASE_URL
const blobToken = process.env.yeni_blob_READ_WRITE_TOKEN

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function sanitizePathPart(input: string) {
  return input.replace(/[<>:"\\|?*\x00-\x1f]/g, '-')
}

function normalizeBlobPathname(pathnameValue: string) {
  const withoutLeadingSlash = pathnameValue.replace(/^\/+/, '')
  const normalized = path.normalize(withoutLeadingSlash)
  if (!normalized || normalized.startsWith('..')) {
    return 'unknown'
  }
  return normalized
    .split(path.sep)
    .map((part) => sanitizePathPart(part))
    .join(path.sep)
}

function extractUrls(value: JsonValue, urls = new Set<string>()) {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (/^https?:\/\//i.test(trimmed)) {
      urls.add(trimmed)
    }
    return urls
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      extractUrls(item, urls)
    }
    return urls
  }

  if (value && typeof value === 'object') {
    for (const nestedValue of Object.values(value)) {
      extractUrls(nestedValue, urls)
    }
  }

  return urls
}

async function downloadFile(url: string, destination: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`download failed (${response.status})`)
  }

  const arrayBuffer = await response.arrayBuffer()
  ensureDir(path.dirname(destination))
  fs.writeFileSync(destination, Buffer.from(arrayBuffer))
}

async function exportDatabase() {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL_PROD veya DATABASE_URL bulunamadi')
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })

  const modelReaders = {
    application: () => prisma.application.findMany({ orderBy: { createdAt: 'asc' } }),
    category: () => prisma.category.findMany({ orderBy: { createdAt: 'asc' } }),
    contentPage: () => prisma.contentPage.findMany({ orderBy: { slug: 'asc' } }),
    fAQ: () => prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
    hero: () => prisma.hero.findMany({ orderBy: { createdAt: 'asc' } }),
    media: () => prisma.media.findMany({ orderBy: { createdAt: 'asc' } }),
    post: () =>
      prisma.post.findMany({
        orderBy: [{ type: 'asc' }, { locale: 'asc' }, { slug: 'asc' }],
      }),
    setting: () => prisma.setting.findMany({ orderBy: { locale: 'asc' } }),
  } as const

  const counts: Record<string, number> = {}
  const urls = new Set<string>()

  ensureDir(dbDir)
  ensureDir(metaDir)

  try {
    for (const [modelName, readModel] of Object.entries(modelReaders)) {
      const rows = await readModel()
      counts[modelName] = rows.length
      fs.writeFileSync(path.join(dbDir, `${modelName}.json`), JSON.stringify(rows, null, 2))

      for (const row of rows as unknown as JsonValue[]) {
        extractUrls(row, urls)
      }
    }
  } finally {
    await prisma.$disconnect()
  }

  fs.copyFileSync(path.join(ROOT, 'prisma', 'schema.prisma'), path.join(metaDir, 'schema.prisma'))

  const migrationsTarget = path.join(metaDir, 'migrations')
  copyDir(path.join(ROOT, 'prisma', 'migrations'), migrationsTarget)

  fs.writeFileSync(
    path.join(metaDir, 'db-summary.json'),
    JSON.stringify(
      {
        timestamp,
        databaseSource: process.env.DATABASE_URL_PROD ? 'DATABASE_URL_PROD' : 'DATABASE_URL',
        counts,
      },
      null,
      2,
    ),
  )

  return {
    counts,
    discoveredUrls: Array.from(urls).sort(),
  }
}

function copyDir(sourceDir: string, targetDir: string) {
  if (!fs.existsSync(sourceDir)) {
    return
  }

  ensureDir(targetDir)
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const from = path.join(sourceDir, entry.name)
    const to = path.join(targetDir, entry.name)
    if (entry.isDirectory()) {
      copyDir(from, to)
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to)
    }
  }
}

async function backupBlobStore() {
  if (!blobToken) {
    return {
      blobs: [],
      skipped: 'yeni_blob_READ_WRITE_TOKEN missing',
    }
  }

  ensureDir(blobDir)

  const blobs: Array<{ url: string; pathname: string; size: number; uploadedAt: string }> = []
  let cursor: string | undefined

  do {
    const result = await list({
      token: blobToken,
      limit: 1000,
      cursor,
    })

    for (const blob of result.blobs) {
      blobs.push({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      })
    }

    cursor = result.hasMore ? result.cursor : undefined
  } while (cursor)

  for (const blob of blobs) {
    const target = path.join(blobDir, normalizeBlobPathname(blob.pathname))
    await downloadFile(blob.url, target)
  }

  fs.writeFileSync(path.join(metaDir, 'blob-manifest.json'), JSON.stringify(blobs, null, 2))

  return {
    blobs,
  }
}

async function backupReferencedUrls(urls: string[]) {
  const targetDir = path.join(backupRoot, 'referenced-assets')
  ensureDir(targetDir)

  const downloaded: Array<{ url: string; file: string }> = []
  const failed: Array<{ url: string; error: string }> = []

  for (const url of urls) {
    try {
      const parsed = new URL(url)
      const host = sanitizePathPart(parsed.hostname)
      const filePath =
        parsed.pathname && parsed.pathname !== '/'
          ? parsed.pathname.replace(/^\/+/, '')
          : 'index'
      const suffix = parsed.search ? `__${Buffer.from(parsed.search).toString('hex')}` : ''
      const destination = path.join(targetDir, host, `${normalizeBlobPathname(filePath)}${suffix}`)
      await downloadFile(url, destination)
      downloaded.push({
        url,
        file: path.relative(backupRoot, destination),
      })
    } catch (error) {
      failed.push({
        url,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  fs.writeFileSync(
    path.join(metaDir, 'referenced-assets.json'),
    JSON.stringify({ downloaded, failed }, null, 2),
  )

  return { downloaded, failed }
}

function mirrorSite() {
  ensureDir(siteDir)

  const result = spawnSync(
    'wget',
    [
      '--mirror',
      '--page-requisites',
      '--convert-links',
      '--adjust-extension',
      '--no-verbose',
      '--no-host-directories',
      '--directory-prefix',
      siteDir,
      '--domains',
      'tarfakademi.com,www.tarfakademi.com,panel.tarfakademi.com',
      '--exclude-directories',
      '/admin',
      `${SITE_URL.replace(/\/+$/, '')}/`,
    ],
    {
      cwd: ROOT,
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 20,
    },
  )

  fs.writeFileSync(
    path.join(metaDir, 'site-mirror.log'),
    [result.stdout || '', result.stderr || ''].filter(Boolean).join('\n'),
  )

  return {
    ok: result.status === 0 || result.status === 8,
    status: result.status,
    log: [result.stdout || '', result.stderr || ''].filter(Boolean).join('\n'),
  }
}

async function main() {
  ensureDir(backupRoot)
  ensureDir(metaDir)

  console.log(`Backup root: ${backupRoot}`)

  const dbExport = await exportDatabase()
  console.log(`DB export completed: ${Object.keys(dbExport.counts).length} tables`)

  const blobBackup = await backupBlobStore()
  if ('blobs' in blobBackup) {
    console.log(`Blob backup completed: ${blobBackup.blobs.length} files`)
  }

  const referencedBackup = await backupReferencedUrls(dbExport.discoveredUrls)
  console.log(`Referenced assets downloaded: ${referencedBackup.downloaded.length}`)

  const siteMirror = mirrorSite()
  if (siteMirror.ok) {
    console.log('Site mirror completed')
  } else {
    console.warn(`Site mirror skipped: wget exit code ${siteMirror.status}`)
  }

  fs.writeFileSync(
    path.join(backupRoot, 'README.txt'),
    [
      `Backup timestamp: ${timestamp}`,
      `Site URL: ${SITE_URL}`,
      '',
      'Folders:',
      '- db-json: production database rows exported as JSON',
      '- blob-store: full Vercel Blob snapshot',
      '- referenced-assets: URLs discovered inside DB records',
      '- site-mirror: wget mirror of the live website',
      '- meta: schema, migrations, manifests and logs',
      '',
      `Site mirror status: ${siteMirror.ok ? 'completed' : `failed (wget ${siteMirror.status})`}`,
      '',
      'Restore notes:',
      '- JSON restore script: npm run db:restore',
      '- Prisma schema and migrations are stored under meta/',
    ].join('\n'),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
