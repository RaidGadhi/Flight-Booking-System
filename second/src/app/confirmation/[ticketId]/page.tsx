"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import bkEndHandler from '@/app/bkEnd/bkEndHandler';
import { flights, seats, tickets } from '@prisma/client';

async function GetTicket(id: string) {
    const _ticket: tickets = await bkEndHandler.getTicket(id);
    return _ticket;
}
async function Getflight(id: string) {
    const _flight: flights = await bkEndHandler.getFlight(id);;
    return _flight;
}
async function GetSeat(id: string) {
    const _seat: seats = await bkEndHandler.getseat(id);;
    return _seat;
}

export default function Confirmation({ params }: {
    params: { ticketId: string }
}) {
    const ticketId = params.ticketId;

    const ticket = GetTicket(ticketId);
    const [ticket2, set1] = useState<tickets>();
    useEffect(() => {
        ticket
            .then((data) => {
                set1(data);
            })
            .catch((error) => {
                console.error("Failed to load diseases:", error);
            });
    }, [ticket]);

    const flight = Getflight(ticket2?.ticketno || "");
    const [flight2, set2] = useState<flights>();
    useEffect(() => {
        flight
            .then((data) => {
                set2(data);
            })
            .catch((error) => {
                console.error("Failed to load diseases:", error);
            });
    }, [flight]);

    const seat = GetSeat(ticket2?.ticketno || "");
    const [seat2, set3] = useState<seats>();
    useEffect(() => {
        seat
            .then((data) => {
                set3(data);
            })
            .catch((error) => {
                console.error("Failed to load diseases:", error);
            });
    }, [seat]);

    return (
        <>
            <Head>
                <title>Booking Confirmation</title>
            </Head>
            <div className="confirmation-container">
                <h1>Booking Confirmed!</h1>
                <p>Thank you for booking with us. Your flight details are confirmed as follows:</p>
                <div className="booking-details">
                    <p><strong>Flight:</strong> {flight2?.flightno}</p>
                    <p><strong>Departure:</strong> {flight2?.srccity} - {flight2?.flightdate?.toDateString()}</p>
                    <p><strong>Arrival:</strong> {flight2?.dstcity}</p>
                    <p><strong>Class:</strong> {seat2?.seatclass}</p>
                    <p><strong>Price:</strong> {ticket2?.price}</p>
                    <p><strong>ticketID:</strong> {ticket2?.ticketno}</p>
                </div>
                <div className="action-buttons">
                    <button onClick={() => window.print()}>Print Ticket</button>
                    <Link href="/passenger_dashboard"><div className="button">Go to Dashboard</div></Link>
                </div>
            </div>
        </>
    );
}
