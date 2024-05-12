"use client";
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
export default function Admin_dashboard() {
    return (
        <>

            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="dashboard-container">
                <header>
                    <h1>Welcome, Admin</h1>
                    <nav>
                        <Link href="/index"><div>Home</div></Link>
                        <Link href="/search_flights"><div>Book Flight</div></Link>
                    </nav>
                </header>
                <main>
                    <div className="dashboard-sections">
                        <section className="dashboard-card">
                            <h2>Generate Reports</h2>
                            <p>Create detailed reports on bookings, cancellations, and more.</p>
                            <Link href="/report"><button>Generate Reports</button></Link>
                        </section>
                        <section className="dashboard-card">
                            <h2>My Bookings</h2>
                            <p>Manage your bookings.</p>
                            <Link href="/bookings"><button>Bookings</button></Link>
                        </section>
                        <section className="dashboard-card">
                            <h2>Promote Waitlisted Passenger</h2>
                            <p>Elevate passengers from the waitlist to confirmed seats.</p>
                            <Link href="/promote_waitlist"><button>Promote</button></Link>
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

