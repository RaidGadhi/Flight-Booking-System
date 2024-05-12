import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { GetItemInterface } from "@/bkEnd/bkEndHandler";

const prisma = PrismaServices.instance;

// Unified handler for all medication-related requests

export async function POST(request: NextRequest) {
    try {
        const { Id }: GetItemInterface = await request.json();

        const aircraft = await prisma.aircraft.findUnique({
            where: {
                aircraftid: Id // Replace 'specificUserId' with the actual user ID you're looking for
            }
        });
        return NextResponse.json(aircraft);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const aircraft = await prisma.aircraft.findMany({});
        return NextResponse.json(aircraft);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}