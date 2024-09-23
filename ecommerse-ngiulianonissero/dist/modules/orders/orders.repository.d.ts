import { EOrder } from '../../entities/orders.entity';
import { Repository } from 'typeorm';
import { AddOrderDto } from './dto/addOrder.dto';
import { UsersService } from '../users/users.service';
import { OrderDetailsService } from '../orderDetails/orderDetails.service';
export declare class OrdersRepository {
    private ordersRepository;
    private usersService;
    private orderDetailsService;
    constructor(ordersRepository: Repository<EOrder>, usersService: UsersService, orderDetailsService: OrderDetailsService);
    getOrder(id: string): Promise<EOrder>;
    addOrder(userId: string, products: AddOrderDto[]): Promise<EOrder>;
}
