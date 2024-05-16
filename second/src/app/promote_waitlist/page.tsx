"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import bkEndHandler from "../bkEnd/bkEndHandler";
import { passenger, TicketStatus, tickets } from '@prisma/client';

async function getWaitlistedPassengers() {
    const passengers: passenger[] = await bkEndHandler.getWaitlistedPassengers();
    return passengers;
}

async function promoteWaitlistedPassenger(ticketId: string): Promise<void> {
    try {
        const ticket: tickets | null = await bkEndHandler.getTicket(ticketId);
        if (ticket && ticket.status === TicketStatus.WAITLISTED) {
            ticket.status = TicketStatus.CONFIRMED;
            const updatedTicket: tickets = await bkEndHandler.updateTicket(ticket);
            console.log("Ticket promoted successfully:", updatedTicket);
        } else {
            console.log("Ticket not found or not in waitlisted status.");
        }
    } catch (error) {
        console.error("Error promoting waitlisted passenger:", error);
    }
}

export default function PromoteWaitlist() {
    const [passengers, setPassengers] = useState<passenger[]>([]);

    useEffect(() => {
        let isMounted = true; // flag to check if component is mounted

        getWaitlistedPassengers()
            .then((data) => {
                if (isMounted) setPassengers(data);
            })
            .catch((error) => {
                console.error("Failed to load passengers:", error);
            });

        return () => {
            isMounted = false; // set flag to false when component unmounts
        };
    }, []);

    // Example usage, should be triggered based on a specific condition or event
    // promoteWaitlistedPassenger("your-ticket-id-here");

    return (
        <>
            <Head>
                <title>Promote Waitlisted Passenger</title>
                <style>{/* CSS styles omitted for brevity */}</style>
            </Head>
            <div className="passengers-container">
                <h1>Waitlisted Passengers</h1>
                <table className="passengers-table">
                    <thead>
                        <tr><th>Name</th></tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger) => (
                            <tr key={passenger.passengerid}>
                                <td>{passenger.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
