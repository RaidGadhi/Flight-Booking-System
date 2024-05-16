import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
// import { GetItemInterface } from "@/bkEnd/bkEndHandler";

const prisma = PrismaServices.instance;

export async function POST(request: NextRequest) {
    try {
        const id: string = await request.json();

        const flight = await prisma.flights.findUnique({

            where: {
                flightid: id
            }
        });
        return NextResponse.json(flight);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const flights = await prisma.flights.findMany({});
        return NextResponse.json(flights);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}