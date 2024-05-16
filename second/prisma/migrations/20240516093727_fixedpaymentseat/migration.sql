/*
  Warnings:

  - A unique constraint covering the columns `[ticketno]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketno` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketsTicketno` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "ticketno" TEXT NOT NULL,
ADD COLUMN     "ticketsTicketno" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "paymentid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_ticketno_key" ON "payments"("ticketno");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_ticketno_fkey" FOREIGN KEY ("ticketno") REFERENCES "tickets"("ticketno") ON DELETE RESTRICT ON UPDATE CASCADE;
