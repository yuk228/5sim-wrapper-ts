import axios, { AxiosResponse } from "axios";
import dotenv from 'dotenv'; 
import { ErrorResponse, Profile, Purchase, Code } from "./type";

class FiveSimLib {
    private headers: { [key: string]: string };

    constructor (apiKey: string) {
        this.headers = {
            "Authorization": `Bearer ${apiKey}`,
            "Access": "application/json"
        };
    }

    private async handleRequest<T>(url: string): Promise<{ data?: T; error?: ErrorResponse; status: number }>{
        try {
            const response = await axios.get(url, { headers: this.headers });
            return { data: response.data, status: response.status };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return {
                    error: {
                        message: error.response.data.message || "An Error Occurred",
                    },
                    status: error.response.status
                };
            } else {
                return {
                    error: {
                        message: "Network Error Occured"
                    },
                    status: 500
                };
            }
        }
    }

    async getProfile(): Promise<{ profile?: Profile; error?: ErrorResponse; status: number }> {
        return this.handleRequest<Profile>("https://5sim.net/v1/user/profile");
    }

    async purchase(country: string, operator: string, product: string): Promise<{ purcahse?: Purchase; error?: ErrorResponse; status: number}> {
        return this.handleRequest<Purchase>(`https://5sim.net/v1/user/buy/activation/${country}/${operator}/${product}`);
    }

    async getCode(orderId: number): Promise<{ code?: Code; error?: ErrorResponse; status: number }> {
        const id = orderId.toString();
        return this.handleRequest<Code>(`https://5sim.net/v1/user/check/${id}`);
    }

    async cancel(orderId: number): Promise<{ cancel?: Code; error?: ErrorResponse; status: number }> {
        const id = orderId.toString();
        return this.handleRequest<Code>(`https://5sim.net/v1/user/cancel/${id}`);
    }

    async ban(orderId: number): Promise<{ ban?: Code; error?: ErrorResponse; status: number }> {
        const id = orderId.toString();
        return this.handleRequest<Code>(`https://5sim.net/v1/user/ban/${id}`);
    }
}

async function main() {
    dotenv.config();
    const apiKey = process.env.API_KEY as string;
    const fivesim = new FiveSimLib(apiKey);
    // const data = await fivesim.purchase("poland", "any", "discord")
    const data = await fivesim.ban(2222);
    console.log(data)
}

main(); 