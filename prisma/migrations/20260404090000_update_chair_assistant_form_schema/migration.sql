-- CreateEnum
CREATE TYPE "ChairAssistantGraduateLevel" AS ENUM ('yuksek_lisans', 'doktora');

-- AlterTable
ALTER TABLE "ChairAssistantApplication"
ADD COLUMN "graduateLevel" "ChairAssistantGraduateLevel",
ADD COLUMN "mastersProgram" TEXT,
ADD COLUMN "doctorateProgram" TEXT,
ADD COLUMN "referenceOneFirstName" TEXT,
ADD COLUMN "referenceOneLastName" TEXT,
ADD COLUMN "referenceOnePhone" TEXT,
ADD COLUMN "referenceTwoFirstName" TEXT,
ADD COLUMN "referenceTwoLastName" TEXT,
ADD COLUMN "referenceTwoPhone" TEXT,
ALTER COLUMN "graduateProgramInfo" DROP NOT NULL,
ALTER COLUMN "languageScore" DROP NOT NULL,
ALTER COLUMN "contribution" DROP NOT NULL,
ALTER COLUMN "attendanceCommitment" DROP NOT NULL;
