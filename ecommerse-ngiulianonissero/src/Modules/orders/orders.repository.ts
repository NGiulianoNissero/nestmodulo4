import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EOrder } from '../../entities/orders.entity';
import { Repository } from 'typeorm';
import { AddOrderDto } from './dto/addOrder.dto';
import { UsersService } from '../users/users.service';
import { EUser } from '../../entities/users.entity';
import { EOrderDetails } from '../../entities/orderDetails.entity';
import { OrderDetailsService } from '../orderDetails/orderDetails.service';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(EOrder) private ordersRepository: Repository<EOrder>,
    private usersService: UsersService,
    private orderDetailsService: OrderDetailsService,
  ) {}

  async getOrder(id: string): Promise<EOrder> {
    const order: EOrder | null = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!order)
      throw new BadRequestException(
        'No existe una order con el uuid proporcionado.',
      );

    return order;
  }

  async addOrder(userId: string, products: AddOrderDto[]): Promise<EOrder> {
    const userFounded: EUser = await this.usersService.getUserById(userId);

    const date = new Date();

    const newOrderData: EOrder = {
      date,
      user: userFounded,
    };

    const newOrderDetails: EOrderDetails =
      await this.orderDetailsService.createOrderDetails(products, newOrderData);

    newOrderData.orderDetails = newOrderDetails;

    const newOrder: EOrder = await this.ordersRepository.create(newOrderData);
    await this.ordersRepository.save(newOrder);

    return newOrder;
  }
}
