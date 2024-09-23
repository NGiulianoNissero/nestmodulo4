import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { EOrder } from '../../entities/orders.entity';
import { AddOrderDto } from './dto/addOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async getOrder(id: string): Promise<EOrder> {
    return await this.ordersRepository.getOrder(id);
  }

  async addOrder(userId: string, products: AddOrderDto[]): Promise<EOrder> {
    return await this.ordersRepository.addOrder(userId, products);
  }
}
