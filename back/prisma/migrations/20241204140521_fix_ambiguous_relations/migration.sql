/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyTracking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavingMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accessFailedCount` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User', 'SuperAdmin');

-- DropForeignKey
ALTER TABLE "MonthlyTracking" DROP CONSTRAINT "MonthlyTracking_savingMethodId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyTracking" DROP CONSTRAINT "MonthlyTracking_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavingMethod" DROP CONSTRAINT "SavingMethod_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSummary" DROP CONSTRAINT "UserSummary_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessFailedCount" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "MonthlyTracking";

-- DropTable
DROP TABLE "SavingMethod";

-- DropTable
DROP TABLE "UserSummary";

-- CreateTable
CREATE TABLE "RecognitionEvent" (
    "recognitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "recognitionResult" TEXT NOT NULL,
    "userEditResult" TEXT NOT NULL,
    "hasImageInDb" BOOLEAN NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "RecognitionEvent_pkey" PRIMARY KEY ("recognitionId")
);

-- CreateTable
CREATE TABLE "FeedbackEvent" (
    "feedbackEventId" TEXT NOT NULL,
    "recognitionId" TEXT NOT NULL,
    "feedbackText" TEXT NOT NULL,
    "isAnswered" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT,
    "adminResponse" TEXT,

    CONSTRAINT "FeedbackEvent_pkey" PRIMARY KEY ("feedbackEventId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recognitionEventId" TEXT NOT NULL,
    "feedbackEventId" TEXT,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- AddForeignKey
ALTER TABLE "RecognitionEvent" ADD CONSTRAINT "RecognitionEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackEvent" ADD CONSTRAINT "FeedbackEvent_recognitionId_fkey" FOREIGN KEY ("recognitionId") REFERENCES "RecognitionEvent"("recognitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackEvent" ADD CONSTRAINT "FeedbackEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackEvent" ADD CONSTRAINT "FeedbackEvent_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recognitionEventId_fkey" FOREIGN KEY ("recognitionEventId") REFERENCES "RecognitionEvent"("recognitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_feedbackEventId_fkey" FOREIGN KEY ("feedbackEventId") REFERENCES "FeedbackEvent"("feedbackEventId") ON DELETE SET NULL ON UPDATE CASCADE;
