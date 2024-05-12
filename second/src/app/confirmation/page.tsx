"use client";
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface BookingDetails {
    flightNumber: string;
    departureCity: string;
    departureDateTime: string;
    arrivalCity: string;
    arrivalDateTime: string;
    travelClass: string;
    price: string;
}

export default function Confirmation({ details }: { details: BookingDetails }) {
    return (
        <>
            <Head>
                <title>Booking Confirmation</title>
            </Head>
            <div className="confirmation-container">
                <h1>Booking Confirmed!</h1>
                <p>Thank you for booking with us. Your flight details are confirmed as follows:</p>
                <div className="booking-details">
                    <p><strong>Flight:</strong> {details.flightNumber}</p>
                    <p><strong>Departure:</strong> {details.departureCity} - {details.departureDateTime}</p>
                    <p><strong>Arrival:</strong> {details.arrivalCity} - {details.arrivalDateTime}</p>
                    <p><strong>Class:</strong> {details.travelClass}</p>
                    <p><strong>Price:</strong> {details.price}</p>
                </div>
                <div className="action-buttons">
                    <button onClick={() => window.print()}>Print Ticket</button>
                    <Link href="/passenger_dashboard"><div className="button">Go to Dashboard</div></Link>
                </div>
            </div>
        </>
    );
}
