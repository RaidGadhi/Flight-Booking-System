import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { passengerInterface } from "@/app/bkEnd/bkEndHandler";
import { passenger } from "@prisma/client";

const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {
    try {
        const p: passengerInterface = await request.json();
        let passenger: passenger | null = await prisma.passenger.findUnique({
            where: {
                email: p.email
            }
        })
        if (passenger == null) {
            passenger = await prisma.passenger.create({
                data: {
                    phone: p.phone,
                    email: p.email,
                    name: p.name
                }
            })
        }

        return NextResponse.json(passenger);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
