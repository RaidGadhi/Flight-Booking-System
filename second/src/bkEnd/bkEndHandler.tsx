import { aircraft, flights } from "@prisma/client";

export interface GetItemInterface {
    Id: string
}
export default class ProfileHandler {
    private constructor() { }


    static async getflight(Id: GetItemInterface): Promise<flights> { //change promise type
        return await fetch("/api/flights", { //change api directory
            method: "POST",
            body: JSON.stringify(Id),
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

    static async getfaircraft(Id: GetItemInterface): Promise<aircraft> { //change promise type and function name
        return await fetch("/api/aircraft", { //change api directory
            method: "POST",
            body: JSON.stringify(Id),
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

    static async createDB(): Promise<aircraft[]> { //change promise type and function name
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
}