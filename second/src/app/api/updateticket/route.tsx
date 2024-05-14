import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { ticketsInterface } from "@/app/bkEnd/bkEndHandler";
import { tickets } from "@prisma/client";

const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {
    try {
        const t: tickets = await request.json();

        const ticket = await prisma.tickets.update({

            where: {
                ticketno: t.ticketno
            },
            data: {
                passengerid: t.passengerid, // Ensure this ID exists in your passenger table
                flightid: t.flightid,       // Ensure this ID exists in your flights table
                status: t.status,
                bookingdate: t.bookingdate,
                price: t.price,
                seatid: t.seatid            // Ensure this seat ID exists and is unique as required
            }
        });
        return NextResponse.json(ticket);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

