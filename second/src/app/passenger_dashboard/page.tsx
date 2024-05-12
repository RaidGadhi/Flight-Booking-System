"use client";
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './passengerDashboard.module.css'; // Assuming CSS module


export default function passenger_dashboard() {

    return (
        <>
            <Head>
                <title>Passenger Dashboard</title>
                <style>{`
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        color: #333;
                    }
                    .dashboard-container {
                        width: 80%;
                        margin: auto;
                        background-color: #fff;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 10px;
                    }
                    header {
                        text-align: center;
                        background-color: #007bff;
                        color: white;
                        padding: 10px 0;
                        border-radius: 10px 10px 0 0;
                    }
                    nav a {
                        color: white;
                        text-decoration: none;
                        margin: 0 15px;
                    }
                    main {
                        margin: 20px 0;
                    }
                    .dashboard-sections {
                        display: flex;
                        justify-content: space-around;
                        gap: 20px;
                    }
                    .dashboard-card {
                        background-color: #f1f1f1;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                        flex: 1;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                    .dashboard-card h2 {
                        margin-bottom: 10px;
                        color: #007bff;
                    }
                    .dashboard-card p {
                        margin-bottom: 15px;
                    }
                    .dashboard-card button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    .dashboard-card button:hover {
                        background-color: #0056b3;
                    }
                    footer {
                        text-align: center;
                        padding: 10px 0;
                        border-top: 1px solid #ddd;
                        margin-top: 20px;
                    }
                `}</style>
            </Head>
            <div className="dashboard-container">
                <header>
                    <h1>Welcome to Your Dashboard</h1>
                    <nav>
                        <Link href="/index"><a>Home</a></Link>
                    </nav>
                </header>
                <main>
                    <div className="dashboard-sections">
                        <section className="dashboard-card">
                            <h2>Search Flights</h2>
                            <p>Find your next journey.</p>
                            <Link href="/search_flights"><a className="button">Search</a></Link>
                        </section>
                        <section className="dashboard-card">
                            <h2>My Bookings</h2>
                            <p>Manage your bookings.</p>
                            <Link href="/bookings"><a className="button">Bookings</a></Link>
                        </section>
                    </div>
                </main>
                <footer>
                    <p>Contact Support | Privacy Policy</p>
                </footer>
            </div>
        </>
    );
};

