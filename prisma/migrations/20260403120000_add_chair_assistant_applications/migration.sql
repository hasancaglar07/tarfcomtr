-- CreateEnum
CREATE TYPE "ChairAssistantChair" AS ENUM (
    'egitim',
    'aile',
    'genclik',
    'tarih_kultur_ve_medeniyet',
    'bilim_ve_teknoloji',
    'uluslararasi_iliskiler_ve_dis_politika',
    'cevre_iklim_ve_sehir'
);

-- CreateEnum
CREATE TYPE "ChairAssistantDocumentType" AS ENUM (
    'undergraduate_diploma',
    'graduate_student_certificate',
    'language_exam_result',
    'academic_cv',
    'criminal_record'
);

-- CreateTable
CREATE TABLE "ChairAssistantApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "chair" "ChairAssistantChair" NOT NULL,
    "undergraduateInfo" TEXT NOT NULL,
    "graduateProgramInfo" TEXT NOT NULL,
    "academicFields" TEXT NOT NULL,
    "thesisTopic" TEXT,
    "languageScore" TEXT NOT NULL,
    "previousWork" TEXT,
    "motivation" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "weeklyAvailability" TEXT NOT NULL,
    "attendanceCommitment" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "accuracyDeclarationAccepted" BOOLEAN NOT NULL DEFAULT false,
    "kvkkAccepted" BOOLEAN NOT NULL DEFAULT false,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'new',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChairAssistantApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChairAssistantApplicationDocument" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "ChairAssistantDocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChairAssistantApplicationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChairAssistantApplication_chair_createdAt_idx" ON "ChairAssistantApplication"("chair", "createdAt");

-- CreateIndex
CREATE INDEX "ChairAssistantApplication_status_createdAt_idx" ON "ChairAssistantApplication"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChairAssistantApplicationDocument_applicationId_type_key" ON "ChairAssistantApplicationDocument"("applicationId", "type");

-- CreateIndex
CREATE INDEX "ChairAssistantApplicationDocument_type_createdAt_idx" ON "ChairAssistantApplicationDocument"("type", "createdAt");

-- AddForeignKey
ALTER TABLE "ChairAssistantApplicationDocument"
ADD CONSTRAINT "ChairAssistantApplicationDocument_applicationId_fkey"
FOREIGN KEY ("applicationId") REFERENCES "ChairAssistantApplication"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
