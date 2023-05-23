/*
  Warnings:

  - You are about to drop the column `rented` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Car` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_userId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "rented",
DROP COLUMN "userId",
ADD COLUMN     "renterId" TEXT;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
