import { ECategory } from './categories.entity';
import { EOrderDetails } from './orderDetails.entity';
export declare class EProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl?: string;
    category?: ECategory;
    orderDetails?: EOrderDetails[];
}
