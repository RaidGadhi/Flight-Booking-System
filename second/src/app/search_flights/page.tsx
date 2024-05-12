"use client";
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
export default function search_flights() {
    const bookFlight = (flightNumber: string, flightClass: string) => {
        // Ideally, replace this with your navigation logic
        alert(`Booking flight: ${flightNumber} in ${flightClass}`);
        // For actual redirection, use Next.js router or window.location if outside of Next.js scope
        // window.location.href = `/seats?flightNumber=${flightNumber}&class=${flightClass}`;
    };

    return (
        <>
            <Head>
                <title>Available Flights</title>
                <style>{`
                    .flights-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                    }
            
                    h1 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
            
                    .flights-table {
                        width: 100%;
                        border-collapse: collapse; 
                        margin-bottom: 20px;
                    }
                    
                    .flights-table th, .flights-table td {
                        border: 1px solid #ddd; 
                        padding: 12px; 
                        text-align: center; 
                    }
                    
                    .flights-table th {
                        background-color: #f4f4f4; 
                        font-weight: bold; 
                    }
                    
                    .flights-table tbody tr:nth-child(even) {
                        background-color: #f9f9f9; 
                    }
                    
                    .flights-table tbody tr:hover {
                        background-color: #f1f1f1; 
                    }
                    
                    .flights-table button {
                        padding: 8px 16px;
                        background-color: #007BFF; 
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    
                    .flights-table button:hover {
                        background-color: #0056b3; 
                    }
                    
                `}</style>
            </Head>
            <div className="flights-container">
                <h1>Available Flights</h1>
                <table className="flights-table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Flight Number</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Class</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>New York</td>
                            <td>London</td>
                            <td>2024-05-15</td>
                            <td>NY1001</td>
                            <td>08:00 AM</td>
                            <td>08:00 PM</td>
                            <td>Economy</td>
                            <td>$500</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                        <tr>
                            <td>New York</td>
                            <td>London</td>
                            <td>2024-05-15</td>
                            <td>NY1002</td>
                            <td>09:00 AM</td>
                            <td>09:00 PM</td>
                            <td>Business</td>
                            <td>$1000</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                        <tr>
                            <td>New York</td>
                            <td>London</td>
                            <td>2024-05-15</td>
                            <td>NY1003</td>
                            <td>10:00 AM</td>
                            <td>10:00 PM</td>
                            <td>First Class</td>
                            <td>$1500</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                        <tr>
                            <td>Paris</td>
                            <td>Tokyo</td>
                            <td>2024-06-20</td>
                            <td>PR2001</td>
                            <td>07:00 AM</td>
                            <td>07:00 PM</td>
                            <td>Economy</td>
                            <td>$700</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                        <tr>
                            <td>Paris</td>
                            <td>Tokyo</td>
                            <td>2024-06-20</td>
                            <td>PR2002</td>
                            <td>08:00 AM</td>
                            <td>08:00 PM</td>
                            <td>Business</td>
                            <td>$1200</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                        <tr>
                            <td>Paris</td>
                            <td>Tokyo</td>
                            <td>2024-06-20</td>
                            <td>PR2003</td>
                            <td>09:00 AM</td>
                            <td>09:00 PM</td>
                            <td>First Class</td>
                            <td>$1800</td>
                            <td><button onClick={() => bookFlight('NY1001', 'Economy')}>Book Now</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
