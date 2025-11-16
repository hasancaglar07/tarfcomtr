const stripTrailingSlash = (value: string) => value.replace(/\/$/, '')

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://tarfakademi.com'

const API_URL = (() => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
  if (configuredUrl) {
    return stripTrailingSlash(configuredUrl)
  }

  const defaultUrl =
    process.env.NODE_ENV === 'production'
      ? `${stripTrailingSlash(SITE_URL)}/api/v1`
      : 'http://localhost:8000/api/v1'

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      `[api] NEXT_PUBLIC_API_URL tanımlanmadı, varsayılan olarak ${defaultUrl} kullanılacak.`
    )
  }

  return defaultUrl
})()

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

export interface Author {
  name: string;
}

export interface PostType {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  content_raw?: string | null;
  featured_image: string | null;
  youtube_url?: string | null;
  youtube_video_id?: string | null;
  event_date?: string | null;
  event_time?: string | null;
  location?: string | null;
  duration?: string | null;
  category: Category | null;
  post_type: PostType | null;
  author: Author | null;
  created_at: string;
  updated_at: string;
}

export interface Hero {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_url: string;
  image: string | null;
  background_image: string | null;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface Settings {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  contact_map_url?: string;
}

export interface HomeData {
  heroes: Hero[];
  blog_posts: Post[];
  services: Post[];
  events: Post[];
  videos: Post[];
  podcasts: Post[];
  faqs: Faq[];
  categories: Category[];
  settings: Settings;
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

async function fetchApi<T>(endpoint: string, locale: string = 'tr'): Promise<T> {
  const url = `${API_URL}${endpoint}?locale=${locale}`

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  const result: ApiResponse<T> = await response.json()

  if (!result.success) {
    throw new Error(result.message || 'API request failed')
  }

  return result.data
}

export const api = {
  // Home page with all sections
  getHome: (locale: string = 'tr') => 
    fetchApi<HomeData>('/home', locale),

  // Blog
  getBlogPosts: (locale: string = 'tr') => 
    fetchApi<Post[]>('/posts', locale),
  
  getBlogPost: (slug: string, locale: string = 'tr') => 
    fetchApi<BlogPostDetail>(`/posts/${locale}/${encodeURIComponent(slug)}`, locale),

  // Events
  getEvents: (locale: string = 'tr') => 
    fetchApi<Post[]>('/events', locale),
  
  getEvent: (slug: string, locale: string = 'tr') => 
    fetchApi<EventDetail>(`/events/${locale}/${encodeURIComponent(slug)}`, locale),

  // Videos
  getVideos: (locale: string = 'tr') => 
    fetchApi<Post[]>('/videos', locale),
  
  getVideo: (slug: string, locale: string = 'tr') => 
    fetchApi<VideoDetail>(`/videos/${locale}/${encodeURIComponent(slug)}`, locale),

  // Podcasts
  getPodcasts: (locale: string = 'tr') => 
    fetchApi<Post[]>('/podcasts', locale),
  
  getPodcast: (slug: string, locale: string = 'tr') => 
    fetchApi<PodcastDetail>(`/podcasts/${locale}/${encodeURIComponent(slug)}`, locale),

  // Services
  getServices: (locale: string = 'tr') => 
    fetchApi<Post[]>('/services', locale),
  
  getService: (slug: string, locale: string = 'tr') => 
    fetchApi<ServiceDetail>(`/services/${locale}/${encodeURIComponent(slug)}`, locale),

  // Categories
  getCategories: (locale: string = 'tr') => 
    fetchApi<Category[]>('/categories', locale),

  // FAQs
  getFaqs: (locale: string = 'tr') => 
    fetchApi<Faq[]>('/faqs', locale),

  // Heroes
  getHeroes: (locale: string = 'tr') => 
    fetchApi<Hero[]>('/heroes', locale),

  // Search
  search: (query: string, locale: string = 'tr') => 
    fetchApi<Post[]>(`/search?q=${encodeURIComponent(query)}`, locale),

  // Settings
  getSettings: async (locale: string = 'tr') => {
    try {
      return await fetchApi<Settings>('/settings', locale)
    } catch (error) {
      console.error('Settings API failed, using defaults:', error)
      return defaultSettings
    }
  },
};
