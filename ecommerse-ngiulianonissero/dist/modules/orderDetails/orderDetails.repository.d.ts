import { EOrderDetails } from '../../entities/orderDetails.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailsDto } from './dto/createOrderDetails.dto';
import { ProductsService } from '../products/products.service';
import { EOrder } from '../../entities/orders.entity';
export declare class OrderDetailsRepository {
    private orderDetailsRepository;
    private productsService;
    constructor(orderDetailsRepository: Repository<EOrderDetails>, productsService: ProductsService);
    createOrderDetails(products: CreateOrderDetailsDto[], order: EOrder): Promise<EOrderDetails>;
}
