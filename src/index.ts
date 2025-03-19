import axios, { AxiosResponse } from "axios";
import { Profile, Purchase, Code } from "./type";

class FiveSimLib {
    private headers: { [key: string]: string };
    constructor (apiKey: string) {
        this.headers = {
            "Authorization": `Bearer ${apiKey}`,
            "Access": "application/json"
        };
    }
    async getProfile(): Promise<Profile> {
        const result = await axios.get("https://5sim.net/v1/user/profile", { headers: this.headers });
        return result.data;
    }
    async purchase(country: string, operator: string, product: string): Promise<Purchase> {
            const result: AxiosResponse<Purchase> = await axios.get<Purchase>(`https://5sim.net/v1/user/buy/activation/${country}/${operator}/${product}`, { headers: this.headers});
            return result.data;
    }
    async getCode(orderId: number): Promise<Code> {
        const id = orderId.toString();
        const result = await axios.get(`https://5sim.net/v1/user/check/${id}`, { headers: this.headers });
        return result.data;
    }
}

async function main() {
    const fivesim = new FiveSimLib("apikey here");
    // const data = await fivesim.purchase("poland", "any", "discord")
    const data = await fivesim.getProfile();
    console.log(data)
}

main();