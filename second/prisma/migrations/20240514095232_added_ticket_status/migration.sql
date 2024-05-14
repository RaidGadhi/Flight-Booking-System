/*
  Warnings:

  - The `status` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('Active', 'Waitlisted', 'Cancelled');

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "status",
ADD COLUMN     "status" "TicketStatus";
