import { PostStatus, PostType } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export interface Category {
  id: string
  name: string
  slug: string
  posts_count?: number
}

export interface Author {
  name: string
}

export interface PostTypeRef {
  id: number
  name: string
  slug: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content?: string
  content_raw?: string | null
  featured_image: string | null
  seo_title?: string | null
  seo_description?: string | null
  og_image?: string | null
  youtube_url?: string | null
  youtube_video_id?: string | null
  event_date?: string | null
  event_time?: string | null
  location?: string | null
  duration?: string | null
  gallery?: string[]
  category: Category | null
  post_type: PostTypeRef | null
  author: Author | null
  created_at: string
  updated_at: string
}

export interface Hero {
  id: string
  title: string
  subtitle: string
  eyebrow?: string | null
  description: string | null
  button_text: string | null
  button_url: string | null
  image: string | null
  background_image: string | null
  video_url?: string | null
  video_cover?: string | null
  video_url_2?: string | null
  video_cover_2?: string | null
}

export interface Faq {
  id: string
  question: string
  answer: string
  order: number
}

export interface Settings {
  site_name: string
  site_description: string | null
  contact_email: string | null
  contact_phone: string | null
  contact_address: string | null
  contact_map_url?: string | null
}

export interface HomeData {
  heroes: Hero[]
  blog_posts: Post[]
  services: Post[]
  events: Post[]
  videos: Post[]
  podcasts: Post[]
  faqs: Faq[]
  categories: Category[]
  settings: Settings
}

export interface BlogPostDetail {
  post: Post
  related_posts: Post[]
}

export interface EventDetail {
  event: Post
  related_events: Post[]
}

export interface VideoDetail {
  video: Post
  related_videos: Post[]
}

export interface PodcastDetail {
  podcast: Post
  related_podcasts: Post[]
}

export interface ServiceDetail {
  service: Post
  child_services: Post[]
}

const defaultSettings: Settings = {
  site_name: 'TARF Akademi',
  site_description:
    'Bilim, teknoloji ve irfanı bir araya getiren çok katmanlı eğitim ve üretim ekosistemi.',
  contact_email: 'iletisim@tarf.org',
  contact_phone: '+90 212 000 00 00',
  contact_address: 'İstanbul, Türkiye',
}

const mapPostType = (type: PostType): PostTypeRef => {
  return {
    id: 0,
    name: type,
    slug: type,
  }
}

const mapCategory = (category?: { id: string; name: string; slug: string } | null): Category | null =>
  category
    ? {
        id: category.id,
        name: category.name,
        slug: category.slug,
      }
    : null

type PostRecord = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featuredImage: string | null
  seoTitle: string | null
  seoDescription: string | null
  ogImage: string | null
  youtubeUrl: string | null
  eventDate: Date | null
  eventTime: string | null
  location: string | null
  meta: unknown
  type: PostType
  category: { id: string; name: string; slug: string } | null
  createdAt: Date
  updatedAt: Date
}

const mapPost = (post: PostRecord): Post => {
  const meta = post.meta && typeof post.meta === 'object' ? (post.meta as Record<string, unknown>) : null
  const gallery =
    meta && Array.isArray(meta.gallery)
      ? (meta.gallery as string[])
      : undefined

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    content: post.content ?? undefined,
    content_raw: post.content ?? null,
    featured_image: post.featuredImage ?? null,
    seo_title: post.seoTitle ?? null,
    seo_description: post.seoDescription ?? null,
    og_image: post.ogImage ?? null,
    youtube_url: post.youtubeUrl ?? null,
    youtube_video_id: null,
    event_date: post.eventDate ? post.eventDate.toISOString() : null,
    event_time: post.eventTime ?? null,
    location: post.location ?? null,
    duration: null,
    gallery,
    category: mapCategory(post.category),
    post_type: mapPostType(post.type),
    author: null,
    created_at: post.createdAt.toISOString(),
    updated_at: post.updatedAt.toISOString(),
  }
}

async function getPostsByType(type: PostType, locale: string, take?: number) {
  const posts = await prisma.post.findMany({
    where: { type, status: PostStatus.published, locale },
    orderBy: { publishedAt: 'desc' },
    include: { category: true },
    take,
  })
  return posts.map(mapPost)
}

async function getPostDetail(type: PostType, slug: string, locale: string) {
  const post = await prisma.post.findFirst({
    where: { type, slug, locale, status: PostStatus.published },
    include: { category: true },
  })
  if (!post) return null
  const related = await prisma.post.findMany({
    where: { type, status: PostStatus.published, locale, id: { not: post.id } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    include: { category: true },
  })
  return { post: mapPost(post), related: related.map(mapPost) }
}

async function getSettings(locale: string = 'tr'): Promise<Settings> {
  try {
    const setting = await prisma.setting.findUnique({ where: { locale } })
    if (!setting) return defaultSettings
    return {
      site_name: setting.siteName,
      site_description: setting.siteDescription,
      contact_email: setting.contactEmail,
      contact_phone: setting.contactPhone,
      contact_address: setting.contactAddress,
      contact_map_url: null,
    }
  } catch (error) {
    console.error('Settings fetch failed, using defaults:', error)
    return defaultSettings
  }
}

async function getFaqs(locale: string = 'tr') {
  const faqs = await prisma.fAQ.findMany({
    where: { locale },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    order: f.order,
  }))
}

async function getHeroes(locale: string = 'tr') {
  const heroes = await prisma.hero.findMany({
    where: { locale },
    orderBy: { createdAt: 'desc' },
  })
  return heroes.map<Hero>((h) => ({
    id: h.id,
    title: h.title,
    subtitle: h.subtitle,
    eyebrow: h.description ?? null,
    description: h.description,
    button_text: h.buttonText,
    button_url: h.buttonUrl,
    image: null,
    background_image: h.backgroundImage,
    video_url: h.videoUrl,
    video_cover: h.videoCover,
    video_url_2: h.videoUrl2,
    video_cover_2: h.videoCover2,
  }))
}

async function getCategories(type?: PostType, locale: string = 'tr') {
  const categories = await prisma.category.findMany({
    where: { locale, ...(type ? { type } : {}) },
    orderBy: { name: 'asc' },
  })
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    posts_count: 0,
  }))
}

export const api = {
  // Home page with all sections
  getHome: async (locale: string = 'tr') => {
    const [heroes, blog_posts, services, events, videos, podcasts, faqs, categories, settings] =
      await Promise.all([
        getHeroes(locale),
        getPostsByType(PostType.blog, locale, 3),
        getPostsByType(PostType.service, locale, 4),
        getPostsByType(PostType.event, locale, 6),
        getPostsByType(PostType.video, locale, 6),
        getPostsByType(PostType.podcast, locale, 6),
        getFaqs(locale),
        getCategories(undefined, locale),
        getSettings(locale),
      ])
    return {
      heroes,
      blog_posts,
      services,
      events,
      videos,
      podcasts,
      faqs,
      categories,
      settings,
    } satisfies HomeData
  },

  // Blog
  getBlogPosts: (locale: string = 'tr') => getPostsByType(PostType.blog, locale),

  getBlogPost: async (slug: string, locale: string = 'tr') => {
    const data = await getPostDetail(PostType.blog, slug, locale)
    if (!data) throw new Error('Post not found')
    return { post: data.post, related_posts: data.related }
  },

  // Events
  getEvents: (locale: string = 'tr') => getPostsByType(PostType.event, locale),

  getEvent: async (slug: string, locale: string = 'tr') => {
    const data = await getPostDetail(PostType.event, slug, locale)
    if (!data) throw new Error('Event not found')
    return { event: data.post, related_events: data.related }
  },

  // Videos
  getVideos: (locale: string = 'tr') => getPostsByType(PostType.video, locale),

  getVideo: async (slug: string, locale: string = 'tr') => {
    const data = await getPostDetail(PostType.video, slug, locale)
    if (!data) throw new Error('Video not found')
    return { video: data.post, related_videos: data.related }
  },

  // Podcasts
  getPodcasts: (locale: string = 'tr') => getPostsByType(PostType.podcast, locale),

  getPodcast: async (slug: string, locale: string = 'tr') => {
    const data = await getPostDetail(PostType.podcast, slug, locale)
    if (!data) throw new Error('Podcast not found')
    return { podcast: data.post, related_podcasts: data.related }
  },

  // Services
  getServices: (locale: string = 'tr') => getPostsByType(PostType.service, locale),

  getService: async (slug: string, locale: string = 'tr'): Promise<ServiceDetail> => {
    const data = await getPostDetail(PostType.service, slug, locale)
    if (!data) throw new Error('Service not found')
    return { service: data.post, child_services: data.related ?? [] }
  },

  // Categories
  getCategories: (locale: string = 'tr') => getCategories(undefined, locale),

  // FAQs
  getFaqs: (locale: string = 'tr') => getFaqs(locale),

  // Heroes
  getHeroes: (locale: string = 'tr') => getHeroes(locale),

  // Search (basit başlık + içerik arama)
  search: async (query: string, locale: string = 'tr') => {
    const posts = await prisma.post.findMany({
      where: {
        locale,
        status: PostStatus.published,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      include: { category: true },
      take: 20,
    })
    return posts.map(mapPost)
  },

  // Settings
  getSettings,
}
