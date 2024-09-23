import { EOrder } from './orders.entity';
export declare class EUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    isAdmin?: boolean;
    country?: string;
    city?: string;
    orders?: EOrder[];
}
