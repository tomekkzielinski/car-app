/*
  Warnings:

  - Made the column `description` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "photo" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
