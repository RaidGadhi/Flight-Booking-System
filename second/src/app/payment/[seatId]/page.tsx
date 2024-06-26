"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import bkEndHandler, { paymentsInterface, ticketsInterface } from '@/app/bkEnd/bkEndHandler'; // Assuming the path to your backend handler
import { TicketStatus } from '@prisma/client';

export default function Payment({ params }: {
    params: { seatId: string }
}) {
    const router = useRouter();
    const seatId = params.seatId;
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const processPayment = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from actually submitting


        try {
            const seat = await bkEndHandler.getseat(seatId);
            const ticketData: ticketsInterface = {
                flightid: seat.flightsFlightid ?? "",
                status: TicketStatus.Active,
                bookingdate: new Date(),
                price: 100,
                seatid: seat.seatid
            }
            const ticket = await bkEndHandler.createTicket(ticketData);
            //create a ticket
            const paymentData: paymentsInterface = { //fill it out
                amount: ticket.price || 100,
                paymentdate: new Date(),
                paymentmethod: 'Mada',
                ticketno: ticket.ticketno //add tickedno here
            }
            const payment = await bkEndHandler.createPayment(paymentData);
            const ss = await bkEndHandler.getseat(seatId);
            ss.isbooked = true;
            const s2 = await bkEndHandler.updateSeat(ss);

            router.push('/confirmation/' + payment.ticketno); // Adjust according to your actual confirmation page path
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment failed, please try again.');
        }
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
