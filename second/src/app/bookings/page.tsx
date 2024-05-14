// Use client directive is already defined, assuming the rest of the imports are correct.
"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { TicketStatus, flights, seats } from '@prisma/client';
import { useRouter } from 'next/router';
import bkEndHandler from '../bkEnd/bkEndHandler';

export default function Bookings() {
    // const router = useRouter();
    // const flightId = router.query.flightId as string; // Use the flightId to fetch or manipulate flight data
    const [showEditForm, setShowEditForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [availableSeats, setAvailableSeats] = useState<seats[]>([]);
    const [newSeat, setNewSeat] = useState('');
    const [selectedSeat, setSelectedSeat] = useState<string>('');


    const handleEditForm = () => {
        setShowEditForm(true);
        setShowRemoveForm(false);
    };

    const handleRemoveForm = () => {
        setShowEditForm(false);
        setShowRemoveForm(true);
    };

    const removeTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketId) {
            alert('Please enter a Ticket ID.');
            return;
        }

        try {
            const allTickets = await bkEndHandler.getAllTickets();
            const ticketToRemove = allTickets.find(ticket => ticket.ticketno === ticketId);

            if (ticketToRemove) {
                // Update ticket status to 'cancelled'
                const updatedTicket = { ...ticketToRemove, status: TicketStatus.Cancelled };
                await bkEndHandler.updateTicket(updatedTicket);

                // Fetch all seats and find the linked seat
                const allSeats = await bkEndHandler.getAllSeats();
                const linkedSeat = allSeats.find(seat => seat.seatid === ticketToRemove.seatid);

                if (linkedSeat) {
                    // Update the seat to set isbooked to false
                    const updatedSeat = { ...linkedSeat, isbooked: false };
                    await bkEndHandler.updateSeat(updatedSeat);
                }

                alert(`Ticket ${ticketId} has been cancelled and the seat has been freed.`);
            } else {
                alert('Ticket not found.');
            }
        } catch (error) {
            console.error('Failed to remove ticket:', error);
            alert('Failed to remove ticket.');
        }
    };

    // Handler to trigger edit form submission
    const editTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketId) {
            alert('Please enter a Ticket ID.');
            return;
        }

        const allTickets = await bkEndHandler.getAllTickets();
        const ticketToEdit = allTickets.find(ticket => ticket.ticketno === ticketId);

        if (!ticketToEdit) {
            alert('Ticket not found.');
            return;
        }

        const allSeats = await bkEndHandler.getAllSeats();
        const currentSeat = allSeats.find(seat => seat.seatid === ticketToEdit.seatid);
        const newSeat = allSeats.find(seat => seat.seatid === selectedSeat);

        // Proceed only if the new seat is different from the current and is not booked
        if (newSeat && !newSeat.isbooked && currentSeat && newSeat.seatid !== currentSeat.seatid) {
            // Update the new seat to booked
            await bkEndHandler.updateSeat({ ...newSeat, isbooked: true });

            // Update the old seat to not booked
            await bkEndHandler.updateSeat({ ...currentSeat, isbooked: false });

            // Update the ticket with new seat id
            await bkEndHandler.updateTicket({ ...ticketToEdit, seatid: newSeat.seatid });

            alert(`Ticket updated to new seat ${newSeat.seatnumber}.`);
        } else {
            alert('New seat is either already booked or the same as the current seat.');
        }
    };

    // Fetch available seats for a specific flight
    const fetchSeats = async (flightId: string) => {
        const seats = await bkEndHandler.getAllSeats();
        const emptySeats = seats.filter(seat => seat.flightsFlightid === flightId && !seat.isbooked);
        setAvailableSeats(emptySeats);
    };

    // Update available seats when a ticket ID is entered and validated
    useEffect(() => {
        const loadTicketDetails = async () => {
            const allTickets = await bkEndHandler.getAllTickets();
            const foundTicket = allTickets.find(ticket => ticket.ticketno === ticketId);
            if (foundTicket?.flightid) {
                await fetchSeats(foundTicket.flightid);
            }
        };

        if (ticketId) {
            loadTicketDetails();
        }
    }, [ticketId]);




    return (
        <>
            <Head>
                <title>Manage Bookings</title>
            </Head>
            <div className="bookings-container">
                <h1>Manage Your Bookings</h1>
                <div className="action-buttons">
                    <button onClick={handleEditForm}>Edit Ticket</button>
                    <button onClick={handleRemoveForm}>Remove Ticket</button>
                </div>

                {showEditForm && (
                    <div className="booking-options show">
                        <h2>Edit Ticket</h2>
                        <form onSubmit={editTicket}>
                            <div className="form-group">
                                <label htmlFor="editTicketId">Ticket ID:</label>
                                <input type="text" id="editTicketId" name="editTicketId" placeholder="Enter Ticket ID" required
                                    value={ticketId} onChange={e => setTicketId(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newSeat">New Seat Number:</label>
                                <select value={selectedSeat} onChange={e => setSelectedSeat(e.target.value)} required>
                                    <option value="">Select a new seat</option>
                                    {availableSeats.map(seat => (
                                        <option key={seat.seatid} value={seat.seatid}>{seat.seatnumber}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Update Ticket</button>
                        </form>
                    </div>
                )}

                {showRemoveForm && (
                    <div className="booking-options show">
                        <h2>Remove Ticket</h2>
                        <form onSubmit={removeTicket}>
                            <div className="form-group">
                                <label htmlFor="removeTicketId">Ticket ID:</label>
                                <input type="text" id="removeTicketId" name="removeTicketId" placeholder="Enter Ticket ID" required
                                    value={ticketId} onChange={e => setTicketId(e.target.value)} />
                            </div>
                            <button type="submit">Remove Ticket</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}