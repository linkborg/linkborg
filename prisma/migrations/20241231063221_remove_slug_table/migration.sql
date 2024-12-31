/*
  Warnings:

  - You are about to drop the `Slug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Slug" DROP CONSTRAINT "Slug_userId_fkey";

-- DropTable
DROP TABLE "Slug";
