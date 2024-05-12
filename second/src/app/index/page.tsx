"use client";
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
export default function index() {
    return (
        <>

            <Head>
                <title>Airline Booking System</title>
            </Head>
            <div className="main-container">
                <header>
                    <h1>Airline Booking System</h1>
                    <nav>
                        <Link href="/admin_dashboard"><a className="button">Admin</a></Link>
                        <Link href="/passenger_dashboard"><a className="button">Passenger</a></Link>
                    </nav>
                </header>
                <main>
                    <section className="intro">
                        <h2>Effortless Travel Planning</h2>
                        <p>Book your flights with ease and manage your trips with our comprehensive system. From business journeys to vacation getaways, organize your travel effortlessly.</p>
                    </section>
                    <section className="features">
                        <article>
                            <h3>Fast Booking</h3>
                            <p>Quickly find and secure your ideal flight using our streamlined booking process.</p>
                        </article>
                        <article>
                            <h3>Real-Time Updates</h3>
                            <p>Stay informed with real-time notifications about flight status, gate changes, and more.</p>
                        </article>
                        <article>
                            <h3>Customer Support</h3>
                            <p>Access 24/7 customer support to help with any of your travel needs.</p>
                        </article>
                    </section>
                </main>
                <footer>
                    <p>© 2024 Airline Booking System. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

