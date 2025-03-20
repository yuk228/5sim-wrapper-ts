import axios, { AxiosResponse } from "axios";
import dotenv from 'dotenv'; 
import { Profile, Purchase, Code } from "./type";

class FiveSimLib {
    private headers: { [key: string]: string };
    constructor (apiKey: string) {
        this.headers = {
            "Authorization": `Bearer ${apiKey}`,
            "Access": "application/json"
        };
    }
    async getProfile(): Promise<{ profile: Profile, status: number}> {
        const response = await axios.get("https://5sim.net/v1/user/profile", { headers: this.headers });
        return { profile: response.data, status: response.status };
    }
    async purchase(country: string, operator: string, product: string): Promise<{ purcahse: Purchase, status: number}> {
            const response: AxiosResponse<Purchase> = await axios.get<Purchase>(`https://5sim.net/v1/user/buy/activation/${country}/${operator}/${product}`, { headers: this.headers});
            return { purcahse: response.data, status: response.status };
    }
    async getCode(orderId: number): Promise<{ code: Code, status: number }> {
        const id = orderId.toString();
        const response = await axios.get(`https://5sim.net/v1/user/check/${id}`, { headers: this.headers });
        return { code: response.data, status: response.status };
    }
    async cancel(orderId: number): Promise<{ cancel: Code, status: number }> {
        const id = orderId.toString();
        const response = await axios.get(`https://5sim.net/v1/user/cancel/${id}`, { headers: this.headers });
        return { cancel: response.data, status: response.status}
    }

    async ban(orderId: number): Promise<{ ban: Code, status: number }> {
        const id = orderId.toString();
        const response = await axios.get(`https://5sim.net/v1/user/ban/${id}`, { headers: this.headers });
        return { ban: response.data, status: response.data };
    }
}

async function main() {
    dotenv.config();
    const apiKey = process.env.API_KEY as string;
    const fivesim = new FiveSimLib(apiKey);
    // const data = await fivesim.purchase("poland", "any", "discord")
    const data = await fivesim.getProfile();
    console.log(data)
}

main(); 