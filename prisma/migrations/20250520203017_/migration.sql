/*
  Warnings:

  - You are about to drop the column `slug` on the `Dog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Dog_slug_key";

-- AlterTable
ALTER TABLE "Dog" DROP COLUMN "slug",
ALTER COLUMN "favoriteActivity" DROP NOT NULL,
ALTER COLUMN "others" DROP NOT NULL;
