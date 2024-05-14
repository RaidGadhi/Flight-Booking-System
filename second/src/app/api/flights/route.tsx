import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
// import { GetItemInterface } from "@/bkEnd/bkEndHandler";

const prisma = PrismaServices.instance;

// Unified handler for all medication-related requests

// export async function POST(request: NextRequest) {
//     try {
//         const { Id }: GetItemInterface = await request.json();

//         const flights = await prisma.flights.findUnique({
//             where: {
//                 flightid: Id // Replace 'specificUserId' with the actual user ID you're looking for
//             }
//         });
//         return NextResponse.json(flights);
//     } catch (error) {
//         console.error('Error fetching diseases:', error);
//         return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
// }

export async function GET(request: NextRequest) {
    try {
        const flights = await prisma.flights.findMany({});
        return NextResponse.json(flights);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}