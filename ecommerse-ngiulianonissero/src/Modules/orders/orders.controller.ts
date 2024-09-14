import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderBodyDto } from './dto/addOrderBody.dto';
import { AddOrderDto } from './dto/addOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get(':uuid')
  async getOrder(@Param('uuid') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Post()
  async addOrder(@Body() body: AddOrderBodyDto) {
    const { userId, products } = body;
    const productsId: AddOrderDto[] = products.map((product) => {
      const productId: AddOrderDto = { id: product.id };
      return productId;
    });
    return await this.ordersService.addOrder(userId, productsId);
  }
}
