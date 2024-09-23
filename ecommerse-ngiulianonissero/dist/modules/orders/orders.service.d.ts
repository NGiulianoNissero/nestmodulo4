import { OrdersRepository } from './orders.repository';
import { EOrder } from '../../entities/orders.entity';
import { AddOrderDto } from './dto/addOrder.dto';
export declare class OrdersService {
    private ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    getOrder(id: string): Promise<EOrder>;
    addOrder(userId: string, products: AddOrderDto[]): Promise<EOrder>;
}
