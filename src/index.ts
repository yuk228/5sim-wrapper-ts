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
    async getProfile(): Promise<{ profile?: Profile; error?: ErrorResponse; status: number }> {
        try {
            const response = await axios.get("https://5sim.net/v1/user/profile", { headers: this.headers });
            return { profile: response.data, status: response.status };
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
    async purchase(country: string, operator: string, product: string): Promise<{ purcahse?: Purchase; error?: ErrorResponse; status: number}> {
        try {
            const response: AxiosResponse<Purchase> = await axios.get<Purchase>(`https://5sim.net/v1/user/buy/activation/${country}/${operator}/${product}`, { headers: this.headers});
            return { purcahse: response.data, status: response.status };
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
    async getCode(orderId: number): Promise<{ code?: Code; error?: ErrorResponse; status: number }> {
        try {
            const id = orderId.toString();
            const response = await axios.get(`https://5sim.net/v1/user/check/${id}`, { headers: this.headers });
            return { code: response.data, status: response.status };
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
    async cancel(orderId: number): Promise<{ cancel?: Code; error?: ErrorResponse; status: number }> {
        try {
            const id = orderId.toString();
            const response = await axios.get(`https://5sim.net/v1/user/cancel/${id}`, { headers: this.headers });
            return { cancel: response.data, status: response.status}   
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
    async ban(orderId: number): Promise<{ ban?: Code; error?: ErrorResponse; status: number }> {
        try {
            const id = orderId.toString();
            const response = await axios.get(`https://5sim.net/v1/user/ban/${id}`, { headers: this.headers });
            return { ban: response.data, status: response.data };
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