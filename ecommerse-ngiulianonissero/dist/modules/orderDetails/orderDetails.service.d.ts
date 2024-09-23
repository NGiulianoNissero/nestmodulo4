import { OrderDetailsRepository } from './orderDetails.repository';
import { CreateOrderDetailsDto } from './dto/createOrderDetails.dto';
import { EOrder } from '../../entities/orders.entity';
export declare class OrderDetailsService {
    private orderDetailsRepository;
    constructor(orderDetailsRepository: OrderDetailsRepository);
    createOrderDetails(products: CreateOrderDetailsDto[], order: EOrder): Promise<import("../../entities/orderDetails.entity").EOrderDetails>;
}
