import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { ticketsInterface } from "@/app/bkEnd/bkEndHandler";
import { tickets } from "@prisma/client";

const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {
    try {
        const id: string = await request.json();

        const ticket = await prisma.tickets.findUnique({

            where: {
                ticketno: id
            }
        });
        return NextResponse.json(ticket);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

