import { EOrder } from './orders.entity';
import { EProduct } from './products.entity';
export declare class EOrderDetails {
    id?: string;
    price: number;
    order: EOrder;
    products: EProduct[];
}
