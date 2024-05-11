/* eslint-disable @next/next/no-css-tags */
"use client";
import Head from "next/head";
export default function Plans() {
    return (
        <>

            <body>
                <div className="main-container">
                    <header>
                        <h1>Airline Booking System</h1>
                        <nav>
                            <a href="admin_dashboard.html" className="button">Admin</a>
                            <a href="passenger_dashboard.html" className="button">Passenger</a>
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
            </body>
        </>
    );
};

