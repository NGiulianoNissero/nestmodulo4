import { OrdersService } from './orders.service';
import { AddOrderBodyDto } from './dto/addOrderBody.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getOrder(id: string): Promise<import("../../entities/orders.entity").EOrder>;
    addOrder(body: AddOrderBodyDto): Promise<import("../../entities/orders.entity").EOrder>;
}
