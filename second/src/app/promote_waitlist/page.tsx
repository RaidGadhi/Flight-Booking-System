"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Promote_waitlist() {
    const [passengerId, setPassengerId] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [newSeat, setNewSeat] = useState('');

    const promotePassenger = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the form from actually submitting

        if (!passengerId || !flightNumber || !newSeat) {
            alert('Please fill in all fields.');
            return;
        }

        alert(`Passenger ${passengerId} has been promoted to seat ${newSeat} on flight ${flightNumber}.`);
        // Implement the logic to send this data to the server or process it as required
    };

    return (
        <>
            <Head>
                <title>Promote Waitlisted Passenger</title>
            </Head>
            <div className="promote-container">
                <h1>Promote Waitlisted Passenger</h1>
                <form onSubmit={promotePassenger}>
                    <div className="form-group">
                        <label htmlFor="passengerId">Passenger ID:</label>
                        <input type="text" id="passengerId" name="passengerId"
                            placeholder="Enter Passenger ID" required
                            value={passengerId} onChange={e => setPassengerId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number:</label>
                        <input type="text" id="flightNumber" name="flightNumber"
                            placeholder="Enter Flight Number" required
                            value={flightNumber} onChange={e => setFlightNumber(e.target.value)} />
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
                            {/* Additional seats can be added here */}
                        </select>
                    </div>
                    <button type="submit">Promote</button>
                </form>
            </div>
        </>
    );
}


