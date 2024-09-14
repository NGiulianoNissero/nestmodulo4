import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from './orderDetails.repository';
import { CreateOrderDetailsDto } from './dto/createOrderDetails.dto';
import { EOrder } from '../../entities/orders.entity';

@Injectable()
export class OrderDetailsService {
  constructor(private orderDetailsRepository: OrderDetailsRepository) {}

  async createOrderDetails(productId: CreateOrderDetailsDto, order: EOrder) {
    return await this.orderDetailsRepository.createOrderDetails(
      productId,
      order,
    );
  }
}
