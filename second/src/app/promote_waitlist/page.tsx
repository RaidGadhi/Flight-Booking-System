"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import bkEndHandler from "../bkEnd/bkEndHandler";
import { TicketStatus, tickets, seats } from '@prisma/client';

async function allFilteredTickets() {
    const _tickets: tickets[] = await bkEndHandler.getAllTickets();
    const _filteredTickets = _tickets.filter(ticket => ticket.status === TicketStatus.Waitlisted);
    return _filteredTickets;
}

async function promoteWaitlistedTicket(ticketNo: string): Promise<void> {
    try {
        const ticket: tickets | null = await bkEndHandler.getTicket(ticketNo);
        if (ticket && ticket.status === TicketStatus.Waitlisted) {
            ticket.status = TicketStatus.Active;
            const updatedTicket: tickets = await bkEndHandler.updateTicket(ticket);
            console.log("Ticket promoted successfully:", updatedTicket);

            // Ensure seatid is not null before using it
            if (ticket.seatid) {
                const seat: seats = await bkEndHandler.getseat(ticket.seatid); 
                seat.isbooked = true;
                await bkEndHandler.updateSeat(seat);
            }
        } else {
            console.log("Ticket not found or not in waitlisted status.");
        }
    } catch (error) {
        console.error("Error promoting waitlisted passenger:", error);
    }
}

export default function PromoteWaitlist() {
    const [tickets, setTickets] = useState<tickets[]>([]);

    useEffect(() => {
        let isMounted = true; // flag to check if component is mounted

        allFilteredTickets()
            .then((data) => {
                if (isMounted) setTickets(data);
            })
            .catch((error) => {
                console.error("Failed to load tickets:", error);
            });

        return () => {
            isMounted = false; // set flag to false when component unmounts
        };
    }, []);

    return (
        <>
            <Head>
                <title>Promote Waitlisted Tickets</title>
                <style>{/* CSS styles omitted for brevity */}</style>
            </Head>
            <div className="tickets-container">
                <h1>Waitlisted Tickets</h1>
                <table className="tickets-table">
                    <thead>
                        <tr><th>Ticket No</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.ticketno}>
                                <td>{ticket.ticketno}</td>
                                <td><button onClick={() => promoteWaitlistedTicket(ticket.ticketno)}>Promote</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
