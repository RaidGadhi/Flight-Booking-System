import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { paymentsInterface } from "@/bkEnd/bkEndHandler";

const prisma = PrismaServices.instance;


export async function POST(request: NextRequest) {
    try {
        const p: paymentsInterface = await request.json();

        const payment = await prisma.payments.create({
            data: {
                amount: p.amount,
                paymentdate: p.paymentdate,
                paymentmethod: p.paymentmethod,
                passengerid: p.passengerid
            }
        });
        return NextResponse.json(payment);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const payments = await prisma.payments.findMany({});
        return NextResponse.json(payments);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}