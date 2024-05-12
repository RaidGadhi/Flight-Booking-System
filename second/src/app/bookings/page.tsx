// Use client directive is already defined, assuming the rest of the imports are correct.
"use client";
import React, { useState } from 'react';
import Head from 'next/head';

export default function Bookings() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [newSeat, setNewSeat] = useState('');

    const handleEditForm = () => {
        setShowEditForm(true);
        setShowRemoveForm(false);
    };

    const handleRemoveForm = () => {
        setShowEditForm(false);
        setShowRemoveForm(true);
    };

    const editTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (ticketId && newSeat) {
            alert(`Ticket ${ticketId} has been updated to seat ${newSeat}.`);
        } else {
            alert('Please fill in all fields.');
        }
    };

    const removeTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (ticketId) {
            alert(`Ticket ${ticketId} has been removed.`);
        } else {
            alert('Please enter a Ticket ID.');
        }
    };

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
                                <select id="newSeat" name="newSeat" required
                                    value={newSeat} onChange={e => setNewSeat(e.target.value)}>
                                    <option value="">Select a seat</option>
                                    <option value="1A">1A</option>
                                    <option value="1B">1B</option>
                                    <option value="2A">2A</option>
                                    <option value="2B">2B</option>
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