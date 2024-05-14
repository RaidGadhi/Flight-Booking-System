import { TicketStatus, aircraft, flights, passenger, payments, seats, tickets } from "@prisma/client";

// export interface GetAircraftInterface {
//     Id: string
// }
export interface ticketsInterface {
    passengerid: string,
    flightid: string,
    status: TicketStatus,
    bookingdate: Date,
    price: number,
    seatid: string
}

export interface paymentsInterface {
    amount: number,
    paymentdate: Date,
    paymentmethod: string,
    passengerid: string
}

export interface passengerInterface {
    phone: string,
    email: string,
    name: string
}

export default class ProfileHandler {
    private constructor() { }

    static async getAllairCrafts(): Promise<aircraft[]> { //change promise type and function name
        return await fetch("/api/aircraft", { //change api directory
            method: "GET",
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getAllSeats(): Promise<seats[]> { //change promise type and function name
        return await fetch("/api/seats", { //change api directory
            method: "GET",
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async updateSeat(s: seats): Promise<seats> { //change promise type and function name
        return await fetch("/api/seats", { //change api directory
            method: "POST",
            body: JSON.stringify(s),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getAllFlights(): Promise<flights> { //change promise type
        return await fetch("/api/flights", { //change api directory
            method: "GET",
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async createTicket(t: ticketsInterface): Promise<tickets> { //change promise type and function name
        return await fetch("/api/tickets", { //change api directory
            method: "POST",
            body: JSON.stringify(t),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getAllTickets(): Promise<tickets[]> { //change promise type
        return await fetch("/api/tickets", { //change api directory
            method: "GET",
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async updateTicket(t: tickets): Promise<tickets> { //change promise type and function name
        return await fetch("/api/updateticket", { //change api directory
            method: "POST",
            body: JSON.stringify(t),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async createPayment(p: paymentsInterface): Promise<payments> { //change promise type and function name
        return await fetch("/api/payments", { //change api directory
            method: "POST",
            body: JSON.stringify(p),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getAllpayments(): Promise<payments[]> { //change promise type
        return await fetch("/api/payments", { //change api directory
            method: "GET",
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

    static async getPassenger(p: passengerInterface): Promise<passenger> { //change promise type and function name
        return await fetch("/api/passenger", { //change api directory
            method: "POST",
            body: JSON.stringify(p),
        })
            .then(async (res) => {
                if (res.status == 200) {
                    return await res.json();
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
    }

}