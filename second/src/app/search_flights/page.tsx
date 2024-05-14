"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import bkEndHandler from "../bkEnd/bkEndHandler"
import { flights } from '@prisma/client';


async function getflights() {
    const flights: flights[] = await bkEndHandler.getAllFlights();
    return flights;
}

export default function Search_flights() {
    const bookFlight = (flightNumber: flights, flightClass: string) => {
        // Ideally, replace this with your navigation logic
        alert(`Booking flight: ${flightNumber} in ${flightClass}`);
        const exportedflight: flights = flightNumber;
    };

    const flights = getflights();
    //for mapping
    const [flights2, setDiseases] = useState<flights[]>([]);

    useEffect(() => {
        flights
            .then((data) => {
                setDiseases(data);
            })
            .catch((error) => {
                console.error("Failed to load diseases:", error);
            });
    }, [flights]);
    //for mapping


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
                        {flights2.map((flight) => (
                            <tr key={flight.flightid}>
                                <td>{flight.srccity}</td>
                                <td>{flight.dstcity}</td>
                                <td>{flight.flightdate?.toLocaleDateString()}</td>
                                <td>{flight.flightno}</td>
                                <td>{flight.flighttime?.toLocaleTimeString()}</td>
                                <td>{/* Assuming arrival time calculation or another data source */}</td>
                                <td>{/* Assume class data to be provided or derived */}</td>
                                <td>{/* Assume price data to be provided or derived */}</td>
                                <td><button onClick={() => bookFlight(flight, 'Economy')}>Book Now</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
