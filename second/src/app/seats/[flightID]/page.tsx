"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import bkEndHandler from "../bkEnd/bkEndHandler";
import { useRouter } from "next/router";
import { SeatClass, seats } from "@prisma/client";

async function getSeats() {
  const seatsList: seats[] = await bkEndHandler.getAllSeats();
  return seatsList;
}

export default function Seats() {
  const [seatNumber, setSeatNumber] = useState("");
  //   const router = useRouter();
  const flightId = "0b8c92f0-737b-4767-965b-3973c25ceffd"; //router.query.flightId as string; // Use the flightId to fetch or manipulate flight data

  // const seatslist = await getSeats();
  //for mapping
  const [seats2, setSeat2] = useState<seats[]>([]);

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchSeats() {
      try {
        const seatsList: seats[] = await getSeats();
        setSeat2(seatsList.filter((seat) => seat.flightsFlightid === flightId));
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Failed to load Seats:", error);
      }
    }

    fetchSeats(); // Call the function to fetch seats when the component mounts
  }, []);
  //for mapping

  if (loading) {
    return <div>Loading...</div>;
  }

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

  //   let s: seats;

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
              {seats2.map((seat) => (
                <option value={seat.seatnumber || ""}>
                  {" "}
                  {seat.seatnumber} - {seat.seatclass}
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
