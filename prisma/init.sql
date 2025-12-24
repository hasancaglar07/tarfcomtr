-- CreateEnum
CREATE TYPE "ContentCategory" AS ENUM ('kurumsal', 'dusunce', 'akademi', 'yazilim', 'kulupler', 'yayinlar', 'yasal');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('blog', 'event', 'video', 'podcast', 'service');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('new', 'in_review', 'closed');

-- CreateTable
CREATE TABLE "ContentPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ContentCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "data" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "locale" TEXT DEFAULT 'tr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "featuredImage" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogImage" TEXT,
    "youtubeUrl" TEXT,
    "audioUrl" TEXT,
    "eventDate" TIMESTAMP(3),
    "eventTime" TEXT,
    "location" TEXT,
    "meta" JSONB,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT,
    "headlineSlides" JSONB,
    "buttonText" TEXT,
    "buttonUrl" TEXT,
    "backgroundImage" TEXT,
    "videoUrl" TEXT,
    "videoCover" TEXT,
    "videoUrl2" TEXT,
    "videoCover2" TEXT,
    "videoUrl3" TEXT,
    "videoUrl4" TEXT,
    "videoUrl5" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactAddress" TEXT,
    "social" JSONB,
    "contactContent" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "altText" TEXT,
    "uploadedBy" TEXT,
    "locale" TEXT DEFAULT 'tr',
    "kind" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'new',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentPage_slug_key" ON "ContentPage"("slug");

-- CreateIndex
CREATE INDEX "ContentPage_category_idx" ON "ContentPage"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_type_locale_idx" ON "Category"("type", "locale");

-- CreateIndex
CREATE INDEX "Post_type_status_locale_idx" ON "Post"("type", "status", "locale");

-- CreateIndex
CREATE INDEX "Post_publishedAt_idx" ON "Post"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_type_locale_key" ON "Post"("slug", "type", "locale");

-- CreateIndex
CREATE INDEX "Hero_locale_idx" ON "Hero"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_locale_key" ON "Setting"("locale");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
