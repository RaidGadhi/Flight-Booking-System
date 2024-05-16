"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { SeatClass, seats } from "@prisma/client";
import bkEndHandler from "@/app/bkEnd/bkEndHandler";

async function getSeats() {
  const seatsList: seats[] = await bkEndHandler.getAllSeats();
  return seatsList;
}

export default function Seats({ params }: {
  params: { flightID: string }
}) {
  const [seatNumber, setSeatNumber] = useState<seats | null>(null); // Store the entire seat object
  const router = useRouter();
  const flightId = params.flightID;

  // const seatslist = await getSeats();
  //for mapping
  const [seats2, setSeat2] = useState<seats[]>([]);


  useEffect(() => {
    async function fetchSeats() {
      try {
        const seatsList: seats[] = await getSeats();
        setSeat2(seatsList.filter((seat) => seat.flightsFlightid === flightId));
      } catch (error) {
        console.error("Failed to load Seats:", error);
      }
    }

    fetchSeats();
  }, []);
  //for mapping


  const proceedToPayment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!seatNumber) {
      alert("Please select a seat.");
      return;
    }
    alert("Seat selected! Proceeding to payment...");
    router.push(`/payment/${seatNumber.seatid}`); // Use the seatID for routing
  };


  return (
    <>
      <Head>
        <title>Select Your Seat</title>
      </Head>
      <div className="seats-container">
        <h1>Select Your Seat</h1>
        <form onSubmit={proceedToPayment}>
          <select
            id="seatNumber"
            name="seatNumber"
            required
            value={seatNumber ? seatNumber.seatid : ''}
            onChange={(e) => {
              const selectedSeat = seats2.find(seat => seat.seatid === e.target.value);
              setSeatNumber(selectedSeat || null);
            }}
          >
            {seats2.map((seat, index) => (
              <option key={index} value={seat.seatid}>
                {seat.seatnumber} - {seat.seatclass}
              </option>
            ))}
          </select>
          <button type="submit">Confirm Seat</button>
        </form>
      </div>
    </>
  );
}