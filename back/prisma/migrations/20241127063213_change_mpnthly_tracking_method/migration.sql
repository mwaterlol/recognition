/*
  Warnings:

  - You are about to drop the column `month` on the `UserSummary` table. All the data in the column will be lost.
  - Added the required column `yearAndMonth` to the `UserSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSummary" DROP COLUMN "month",
ADD COLUMN     "yearAndMonth" TIMESTAMP(3) NOT NULL;
