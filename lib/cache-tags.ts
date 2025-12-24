import { PostType } from '@prisma/client'

export const cacheTags = {
  settings: (locale: string) => `settings:${locale}`,
  faqs: (locale: string) => `faqs:${locale}`,
  heroes: (locale: string) => `heroes:${locale}`,
  categories: (locale: string, type?: PostType | 'all') =>
    `categories:${locale}:${type ?? 'all'}`,
  posts: (type: PostType, locale: string) => `posts:${type}:${locale}`,
  post: (type: PostType, locale: string, slug: string) => `post:${type}:${locale}:${slug}`,
  contentPages: () => 'content-pages',
  contentPage: (slug: string) => `content-page:${slug}`,
}
