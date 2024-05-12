"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
export default function Seats() {
    const [seatNumber, setSeatNumber] = useState('');
    const router = useRouter();

    const proceedToPayment = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the form from actually submitting

        if (!seatNumber) {
            alert('Please select a seat.');
            return;
        }

        alert('Seat selected! Proceeding to payment...');

        // Extract query parameters
        const { flightNumber, flightClass } = router.query;

        // Navigate to the payment page with query parameters
        router.push({
            pathname: '/payment',
            query: { flightNumber, flightClass, seatNumber }
        });
    };

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
                        <select id="seatNumber" name="seatNumber" required value={seatNumber} onChange={e => setSeatNumber(e.target.value)}>
                            <option value="">Select a seat</option>
                            <option value="1A">1A</option>
                            <option value="1B">1B</option>
                            <option value="2A">2A</option>
                            <option value="2B">2B</option>
                            {/* Additional seats can be added here */}
                        </select>
                    </div>
                    <button type="submit">Confirm Seat</button>
                </form>
            </div>
        </>
    );
};

