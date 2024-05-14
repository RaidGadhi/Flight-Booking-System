import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { paymentsInterface } from "@/app/bkEnd/bkEndHandler";
import { seats } from "@prisma/client";

const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {
    try {
        const s: seats = await request.json();

        const seats = await prisma.seats.update({
            where: {
                seatid: s.seatid
            },
            data: {
                isbooked: s.isbooked
            }
        });
        return NextResponse.json(seats);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const seats = await prisma.seats.findMany({});
        return NextResponse.json(seats);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}