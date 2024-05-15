import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
//import { GetAircraftInterface } from "@/bkEnd/bkEndHandler";
import { aircraft } from "@prisma/client";

const prisma = PrismaServices.instance;

export async function GET(request: NextRequest) {
    try {
        //delete everything
        const c = await prisma.passenger.deleteMany({});
        const d = await prisma.payments.deleteMany({});
        const f = await prisma.tickets.deleteMany({});
        const e = await prisma.seats.deleteMany({});
        const b = await prisma.flights.deleteMany({});
        const a = await prisma.aircraft.deleteMany({});

        return NextResponse.json("empty");
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}