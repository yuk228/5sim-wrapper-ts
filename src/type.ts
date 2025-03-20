export interface ErrorResponse {
    message: string;
}

export interface Profile {
    id: number;
    email: string;
    balance: number;
    rating: number;
    default_country: { name: string; iso: string; prefix: string };
    default_operator: { name: string };
    frozen_balance: number;
    last_top_orders: string;
    last_top_idx: number;
    last_order: string;
    total_active_orders: number;
    did_order: boolean
}

export interface Purchase {
    id: number;
    phone: string;
    operator: string;
    product: string;
    price: number;
    expires: string;
    sms: null;
    created_at: string;
    forwarding: boolean;
    forwarding_number: string;
    country: string;
}

export interface Sms {
    created_at: string;
    date: string;
    sender: string;
    text: string;
    code: string;
}
export interface Code {
    id: number;
    created_at: string;
    phone: string;
    product: string;
    price: number;
    status: string;
    expires: string;
    sms: Sms[];
    forwarding: boolean;
    forwarding_number: string;
    country: string;
}
