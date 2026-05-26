-- CreateTable
CREATE TABLE "AtsCheckHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "matchedKeywords" JSONB NOT NULL,
    "missingKeywords" JSONB NOT NULL,
    "sectionScores" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AtsCheckHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AtsCheckHistory_userId_idx" ON "AtsCheckHistory"("userId");

-- CreateIndex
CREATE INDEX "AtsCheckHistory_createdAt_idx" ON "AtsCheckHistory"("createdAt");

-- AddForeignKey
ALTER TABLE "AtsCheckHistory" ADD CONSTRAINT "AtsCheckHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
