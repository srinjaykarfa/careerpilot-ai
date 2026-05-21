-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExp" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "User_resetToken_idx" ON "User"("resetToken");
