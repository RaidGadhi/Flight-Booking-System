"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { passenger } from '@prisma/client';
import bkEndHandler from '@/app/bkEnd/bkEndHandler';

async function getWaitlistedPassengers() {
    const passengers: passenger[] = await bkEndHandler.getPassenger({ status: 'waitlisted' });
    return passengers;
}

async function approvePassenger(passenger: passenger) {
    passenger.status = 'approved';
    await bkEndHandler.updatePassenger(passenger); // Assuming you have an update function in bkEndHandler
}

async function processWaitlistedPassengers() {
    const passengers: passenger[] = await getWaitlistedPassengers();
    for (const passenger of passengers) {
        await approvePassenger(passenger);
    }
}

export default function PromoteWaitlist() {
    const [passengers, setPassengers] = useState<passenger[]>([]);

    useEffect(() => {
        getWaitlistedPassengers()
            .then((data) => {
                setPassengers(data);
            })
            .catch((error) => {
                console.error("Failed to load passengers:", error);
            });
    }, []);

    useEffect(() => {
        processWaitlistedPassengers()
            .then(() => {
                console.log("All waitlisted passengers processed.");
            })
            .catch((error) => {
                console.error("Failed to process waitlisted passengers:", error);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Promote Waitlisted Passenger</title>
                <style>{`
                    .passengers-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                    }
            
                    h1 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
            
                    .passengers-table {
                        width: 100%;
                        border-collapse: collapse; 
                        margin-bottom: 20px;
                    }
                    
                    .passengers-table th, .passengers-table td {
                        border: 1px solid #ddd; 
                        padding: 12px; 
                        text-align: center; 
                    }
                    
                    .passengers-table th {
                        background-color: #f4f4f4; 
                        font-weight: bold; 
                    }
                    
                    .passengers-table tbody tr:nth-child(even) {
                        background-color: #f9f9f9; 
                    }
                    
                    .passengers-table tbody tr:hover {
                        background-color: #f1f1f1; 
                    }
                    
                `}</style>
            </Head>
            <div className="passengers-container">
                <h1>Waitlisted Passengers</h1>
                <table className="passengers-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
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
