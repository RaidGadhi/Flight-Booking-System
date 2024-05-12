"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Report() {
    const [reportType, setReportType] = useState('');
    const [dateRequired, setDateRequired] = useState(false);
    const [flightNumberRequired, setFlightNumberRequired] = useState(false);
    const [showDateField, setShowDateField] = useState(false);
    const [showFlightNumberField, setShowFlightNumberField] = useState(false);

    useEffect(() => {
        handleReportTypeChange(); // Adjust fields on report type change
    }, [reportType]);

    const handleReportTypeChange = () => {
        switch (reportType) {
            case "booking":
            case "payments":
                setShowDateField(true);
                setShowFlightNumberField(false);
                setDateRequired(true);
                setFlightNumberRequired(false);
                break;
            case "cancellations":
                setShowFlightNumberField(true);
                setShowDateField(false);
                setFlightNumberRequired(true);
                setDateRequired(false);
                break;
            default:
                setShowDateField(false);
                setShowFlightNumberField(false);
                setDateRequired(false);
                setFlightNumberRequired(false);
                break;
        }
    };

    return (
        <>
            <Head>
                <title>System Reports</title>
                <link rel="stylesheet" href="/style.css" />
            </Head>
            <div className="report-container">
                <h1>System Reports</h1>
                <form id="reportForm">
                    <div className="form-group">
                        <label htmlFor="reportType">Report Type:</label>
                        <select id="reportType" name="reportType" required value={reportType} onChange={e => setReportType(e.target.value)}>
                            <option value="">Select a report type</option>
                            <option value="currentFlight">Current active flight</option>
                            <option value="booking">Percentage of booking in every flight</option>
                            <option value="occupancy">Confirmed payments</option>
                            <option value="cancellations">Waitlisted passengers in each class</option>
                            <option value="payments">Average load factor for all planes</option>
                            <option value="ticketCancelled">Ticket cancelled</option>
                        </select>
                    </div>
                    {showDateField && (
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" name="date" required={dateRequired} />
                        </div>
                    )}
                    {showFlightNumberField && (
                        <div className="form-group">
                            <label htmlFor="flightNumber">Flight Number:</label>
                            <input type="text" id="flightNumber" name="flightNumber" required={flightNumberRequired} />
                        </div>
                    )}
                    <button type="submit">Generate Report</button>
                </form>
                <div id="reportResults">
                    {/* Report results will be dynamically inserted here */}
                </div>
            </div>
        </>
    );
}

