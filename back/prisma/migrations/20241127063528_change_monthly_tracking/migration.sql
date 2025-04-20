/*
  Warnings:

  - You are about to drop the column `month` on the `MonthlyTracking` table. All the data in the column will be lost.
  - Added the required column `yearAndMonth` to the `MonthlyTracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyTracking" DROP COLUMN "month",
ADD COLUMN     "yearAndMonth" TEXT NOT NULL;
