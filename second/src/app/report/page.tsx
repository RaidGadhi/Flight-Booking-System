"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import bkEndHandler from '../bkEnd/bkEndHandler';
import { aircraft, flights, payments, seats, tickets } from '@prisma/client';

export default function Report() {
    const [reportType, setReportType] = useState('');
    const [flights, setFlights] = useState<flights[]>([]);
    const [payments, setPayments] = useState<payments[]>([]);
    const [tickets, setTickets] = useState<tickets[]>([]);
    const [aircrafts, setAircrafts] = useState<aircraft[]>([]);
    const [seats, setSeats] = useState<seats[]>([]);


    useEffect(() => {
        async function fetchData() {
            if (['currentFlight', 'booking'].includes(reportType)) {
                const fetchedFlights = await bkEndHandler.getAllFlights();
                setFlights(fetchedFlights.filter(flight => flight.flightdate ? flight.flightdate : new Date() > new Date()));
            }
            if (reportType == 'booking') {
                const fetchedSeats = await bkEndHandler.getAllSeats();
                setSeats(fetchedSeats);
            }
            if (reportType == 'payments') {
                const fetchedPayments = await bkEndHandler.getAllpayments();
                setPayments(fetchedPayments);
            }
            if (reportType == 'Waitlisted') {
                const fetchedTickets = await bkEndHandler.getAllTickets();
                setTickets(fetchedTickets.filter(ticket => ticket.status === 'Waitlisted'));
            }
            if (reportType == 'occupancy') {
                const fetchedAircrafts = await bkEndHandler.getAllairCrafts();
                setAircrafts(fetchedAircrafts);
            }
            if (reportType == 'ticketCancelled') {
                const fetchedTickets = await bkEndHandler.getAllTickets();
                setTickets(fetchedTickets.filter(ticket => ticket.status === 'Cancelled'));
            }
        }
        fetchData();
    }, [reportType]);

    const calculateBookingPercentage = () => {
        return flights.map(flight => {
            const flightSeats = seats.filter(seat => seat.flightsFlightid === flight.flightid);
            const bookedSeats = flightSeats.filter(seat => seat.isbooked);
            const bookingPercentage = flightSeats.length > 0
                ? (bookedSeats.length / flightSeats.length) * 100
                : 0;
            return {
                flightid: flight.flightid,
                bookingPercentage: bookingPercentage.toFixed(2)  // Keep two decimals for percentage
            };
        });
    };

    const calculateLoadFactor = () => {
        return aircrafts.map(aircraft => {
            const aircraftFlights = flights.filter(flight => flight.aircraftid === aircraft.aircraftid);
            const loadFactor = aircraftFlights.length;
            return {
                aircraftid: aircraft.aircraftid,
                loadFactor: loadFactor
            };
        });
    };

    const renderReportResults = () => {
        switch (reportType) {
            case 'currentFlight':
                return flights.map(flight => (
                    <tr key={flight.flightid}>
                        <td>{flight.flightno}</td>
                        <td>{flight.srccity}</td>
                        <td>{flight.dstcity}</td>
                        <td>{flight.flightdate ? new Date(flight.flightdate).toISOString() : new Date().toISOString()}</td>
                    </tr>
                ));
            case 'booking':
                const bookingData = calculateBookingPercentage();
                return bookingData.map(data => (
                    <tr key={data.flightid}>
                        <td>{data.flightid}</td>
                        <td>{data.bookingPercentage}%</td>
                    </tr>
                )); return null;
            case 'payments':
                return payments.map(payment => (
                    <tr key={payment.paymentid}>
                        <td>{payment.amount}</td>
                        <td>{payment.paymentdate ? new Date(payment.paymentdate).toISOString() : new Date().toISOString()}</td>
                        <td>{payment.paymentmethod}</td>
                    </tr>
                ));
            case 'Waitlisted':
                return tickets.map(ticket => (
                    <tr key={ticket.ticketno}>
                        <td>{ticket.flightid}</td>
                        <td>{ticket.passengerid}</td>
                        <td>{ticket.status}</td>
                    </tr>
                ));
            case 'occupancy':
                const loadFactorData = calculateLoadFactor();
                return loadFactorData.map(data => (
                    <tr key={data.aircraftid}>
                        <td>{data.aircraftid}</td>
                        <td>{data.loadFactor}</td>
                    </tr>
                )); return null;
            case 'ticketCancelled':
                return tickets.map(ticket => (
                    <tr key={ticket.ticketno}>
                        <td>{ticket.ticketno}</td>
                        <td>{ticket.status}</td>
                    </tr>
                ));
            default:
                return null;
        }
    };

    return (
        <>
            <Head>
                <title>Report Dashboard</title>
            </Head>
            <div className="report-container">
                <h1>System Reports</h1>
                <select value={reportType} onChange={e => setReportType(e.target.value)}>
                    <option value="">Select a report type</option>
                    <option value="currentFlight">Current Active Flights</option>
                    <option value="booking">Booking Percentage</option>
                    <option value="occupancy">Confirmed Payments</option>
                    <option value="Waitlisted">Waitlisted Passengers</option>
                    <option value="payments">Load Factor</option>
                    <option value="ticketCancelled">Cancelled Tickets</option>
                </select>
                <table>
                    <tbody>
                        {renderReportResults()}
                    </tbody>
                </table>
            </div>
        </>
    );
}
