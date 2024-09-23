import { EUser } from './users.entity';
import { EOrderDetails } from './orderDetails.entity';
export declare class EOrder {
    id?: string;
    date: Date;
    user: EUser;
    orderDetails?: EOrderDetails;
}
