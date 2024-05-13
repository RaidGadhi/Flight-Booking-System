import { NextRequest, NextResponse } from "next/server";
import PrismaServices from "../Prisma-Services";
import { GetItemInterface } from "@/bkEnd/bkEndHandler";
import { aircraft } from "@prisma/client";

const prisma = PrismaServices.instance;

// Unified handler for all medication-related requests

export async function POST(request: NextRequest) {
    try {
        const aircraft = await prisma.aircraft.create({
            data: {
                aircrafttype: "aircraftTypes[i]",
                flights: {
                    create: Array.from({ length: 5 }, (_, j) => ({
                        srccity: "flightCities[j][0]",
                        dstcity: "flightCities[j][1]",
                        flightdate: new Date(),
                        flighttime: new Date(),
                        flightno: `FL${100 + j}`,
                        seats: {
                            create: [
                                ...Array.from({ length: 3 }, () => ({
                                    seatnumber: "'E' + (i + 1)",
                                    isbooked: false,
                                    seatclass: 'econnomy',
                                })),
                                ...Array.from({ length: 3 }, () => ({
                                    seatnumber: "'B' + (i + 1)",
                                    isbooked: false,
                                    seatclass: 'business',
                                })),
                                ...Array.from({ length: 3 }, () => ({
                                    seatnumber: "'F' + (i + 1)",
                                    isbooked: false,
                                    seatclass: 'firstClass',
                                })),
                            ]
                        }
                    }))
                }
            },
            include: {
                flights: {
                    include: {
                        seats: true
                    }
                }
            }
        });
        // const { Id }: GetItemInterface = await request.json();

        // const aircraft = await prisma.aircraft.findUnique({
        //     where: {
        //         aircraftid: Id // Replace 'specificUserId' with the actual user ID you're looking for
        //     }
        // });
        return NextResponse.json(aircraft);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        //const aircraft = await prisma.aircraft.findMany({});

        const aircraftTypes = ["Type A", "Type B", "Type C", "Type D", "Type E"];
        const flightCities = [["City A1", "City B1"], ["City A2", "City B2"], ["City A3", "City B3"], ["City A4", "City B4"], ["City A5", "City B5"]];
        // Create 5 Aircrafts
        let aircraftList: aircraft[] = [];
        for (let i = 0; i < 5; i++) {
            const aircraft = await prisma.aircraft.create({
                data: {
                    aircrafttype: aircraftTypes[i],
                    flights: {
                        create: Array.from({ length: 5 }, (_, j) => ({
                            srccity: flightCities[j][0],
                            dstcity: flightCities[j][1],
                            flightdate: new Date(),
                            flighttime: new Date(),
                            flightno: `FL${100 + j}`,
                            seats: {
                                create: [
                                    ...Array.from({ length: 3 }, () => ({
                                        seatnumber: 'E' + (i + 1),
                                        isbooked: false,
                                        seatclass: 'econnomy',
                                    })),
                                    ...Array.from({ length: 3 }, () => ({
                                        seatnumber: 'B' + (i + 1),
                                        isbooked: false,
                                        seatclass: 'business',
                                    })),
                                    ...Array.from({ length: 3 }, () => ({
                                        seatnumber: 'F' + (i + 1),
                                        isbooked: false,
                                        seatclass: 'firstClass',
                                    })),
                                ]
                            }
                        }))
                    }
                },
                include: {
                    flights: {
                        include: {
                            seats: true
                        }
                    }
                }
            });
            aircraftList.push(aircraft);
            console.log(`Created aircraft with ID: ${aircraft.aircraftid}`);
        }
        return NextResponse.json(aircraftList);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}