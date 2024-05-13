-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('econnomy', 'business', 'firstClass');

-- CreateTable
CREATE TABLE "aircraft" (
    "aircraftid" TEXT NOT NULL,
    "aircrafttype" TEXT,
    "firstclassprice" INTEGER,
    "economyprice" INTEGER,
    "businessclassprice" INTEGER,

    CONSTRAINT "aircraft_pkey" PRIMARY KEY ("aircraftid")
);

-- CreateTable
CREATE TABLE "flights" (
    "flightid" TEXT NOT NULL,
    "srccity" TEXT,
    "dstcity" TEXT,
    "flightdate" TIMESTAMP(3),
    "flighttime" TIME(6),
    "flightno" TEXT,
    "aircraftid" TEXT,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("flightid")
);

-- CreateTable
CREATE TABLE "maIntenancedates" (
    "mdates" TIMESTAMP(3) NOT NULL,
    "aircraftid" TEXT NOT NULL,

    CONSTRAINT "maIntenancedates_pkey" PRIMARY KEY ("mdates","aircraftid")
);

-- CreateTable
CREATE TABLE "passenger" (
    "passengerid" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "name" TEXT,

    CONSTRAINT "passenger_pkey" PRIMARY KEY ("passengerid")
);

-- CreateTable
CREATE TABLE "payments" (
    "paymentid" TEXT NOT NULL,
    "amount" INTEGER,
    "paymentdate" TIMESTAMP(3),
    "paymentmethod" TEXT,
    "passengerid" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("paymentid")
);

-- CreateTable
CREATE TABLE "seats" (
    "seatid" TEXT NOT NULL,
    "seatnumber" TEXT,
    "isbooked" BOOLEAN,
    "seatclass" "SeatClass" NOT NULL,
    "aircraftid" TEXT,
    "flightsFlightid" TEXT,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("seatid")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticketno" TEXT NOT NULL,
    "passengerid" TEXT,
    "flightid" TEXT,
    "status" TEXT,
    "bookingdate" TIMESTAMP(3),
    "price" INTEGER,
    "class" TEXT,
    "seatid" TEXT,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketno")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_seatid_key" ON "tickets"("seatid");

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_aircraftid_fkey" FOREIGN KEY ("aircraftid") REFERENCES "aircraft"("aircraftid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maIntenancedates" ADD CONSTRAINT "maIntenancedates_aircraftid_fkey" FOREIGN KEY ("aircraftid") REFERENCES "aircraft"("aircraftid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_passengerid_fkey" FOREIGN KEY ("passengerid") REFERENCES "passenger"("passengerid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_aircraftid_fkey" FOREIGN KEY ("aircraftid") REFERENCES "aircraft"("aircraftid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_flightsFlightid_fkey" FOREIGN KEY ("flightsFlightid") REFERENCES "flights"("flightid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_flightid_fkey" FOREIGN KEY ("flightid") REFERENCES "flights"("flightid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_passengerid_fkey" FOREIGN KEY ("passengerid") REFERENCES "passenger"("passengerid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_seatid_fkey" FOREIGN KEY ("seatid") REFERENCES "seats"("seatid") ON DELETE NO ACTION ON UPDATE NO ACTION;
