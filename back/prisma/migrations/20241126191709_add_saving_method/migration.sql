/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SavingMethod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyTracking" (
    "id" TEXT NOT NULL,
    "savingMethodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "growthRate" DOUBLE PRECISION,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlyTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "totalSavings" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "growthRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavingMethod" ADD CONSTRAINT "SavingMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyTracking" ADD CONSTRAINT "MonthlyTracking_savingMethodId_fkey" FOREIGN KEY ("savingMethodId") REFERENCES "SavingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyTracking" ADD CONSTRAINT "MonthlyTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSummary" ADD CONSTRAINT "UserSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
