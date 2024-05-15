"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Payment({ params }: {
    params: { seatId: string }
}) {

    const seatId = params.seatId;
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    //const router = useRouter();

    const processPayment = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from actually submitting
        alert('Payment successful! Redirecting to confirmation...');

        // Example: redirect after processing payment
        // Assuming flight details are passed via query params or state management
        // const flightNumber = router.query.flightNumber as string;
        // const flightClass = router.query.class as string;
        // router.push(`/confirmation?flightNumber=${flightNumber}&class=${flightClass}`);
    };
    return (
        <>
            <Head>
                <title>Complete Your Payment</title>
            </Head>
            <div className="payment-container">
                <h1>Payment Details</h1>
                <form onSubmit={processPayment}>
                    <div className="form-group">
                        <label htmlFor="cardName">Name on Card:</label>
                        <input type="text" id="cardName" name="cardName" placeholder="John Doe"
                            value={cardName} onChange={e => setCardName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9101 1121"
                            value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expDate">Expiry Date:</label>
                        <input type="month" id="expDate" name="expDate"
                            value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" placeholder="123"
                            value={cvv} onChange={e => setCvv(e.target.value)} required />
                    </div>
                    <button type="submit">Pay Now</button>
                </form>
            </div>
        </>
    );
}

