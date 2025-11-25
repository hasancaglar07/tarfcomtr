-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "kind" TEXT,
ADD COLUMN     "locale" TEXT DEFAULT 'tr';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT;
