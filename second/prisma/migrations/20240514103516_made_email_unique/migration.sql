/*
  Warnings:

  - You are about to drop the column `class` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `passenger` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `passenger` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "passenger" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "class";

-- CreateIndex
CREATE UNIQUE INDEX "passenger_email_key" ON "passenger"("email");
