"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import bkEndHandler from "../../bkEnd/bkEndHandler";
import { useRouter } from "next/navigation";
import { SeatClass, seats } from "@prisma/client";

async function getSeats() {
  const seatsList: seats[] = await bkEndHandler.getAllSeats();
  return seatsList;
}

export default function Seats({ params }: {
  params: { flightID: string }
}) {
  const [seatNumber, setSeatNumber] = useState("");
  const router = useRouter();
  const flightId = params.flightID; // Use the flightId to fetch or manipulate flight data

  const seats = getSeats();
  //for mapping
  const [seats2, setSeat2] = useState<seats[]>([]);

  useEffect(() => {
    seats
      .then((data) => {
        let filteredSeats = data.filter(
          (seat) => seat.flightsFlightid === flightId
        );
        setSeat2(filteredSeats);
      })
      .catch((error) => {
        console.error("Failed to load Seats:", error);
      });
  }, [seats]);
  //for mapping

  const proceedToPayment = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from actually submitting

    if (!seatNumber) {
      alert("Please select a seat.");
      return;
    }

    alert("Seat selected! Proceeding to payment...");
    router.push({
      pathname: "/payment",
      // query: { flightId: flightId, seatId: seat.seatid }
    });
  };

  let s: seats;

  return (
    <>
      <Head>
        <title>Select Your Seat</title>
      </Head>
      <div className="seats-container">
        <h1>Select Your Seat</h1>
        <form onSubmit={proceedToPayment}>
          <div className="form-group">
            <label htmlFor="seatNumber">Seat Number:</label>
            <select
              id="seatNumber"
              name="seatNumber"
              required
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
            >
              <option value="">Select a seat</option>
              <option value="1A">1A</option>
              <option value="1B">1B</option>
              <option value="2A">2A</option>
              <option value="2B">2B</option>
              {seats2.map((seat) => (
                <option value={seat.seatnumber || ""}>
                  {" "}
                  {seatNumber} - {seat.seatclass}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Confirm Seat</button>
        </form>
      </div>
    </>
  );
}
