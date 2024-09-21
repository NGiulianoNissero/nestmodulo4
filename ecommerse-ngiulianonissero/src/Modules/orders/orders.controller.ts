import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderBodyDto } from './dto/addOrderBody.dto';
import { AddOrderDto } from './dto/addOrder.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':uuid')
  @UseGuards(AuthGuard)
  async getOrder(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return await this.ordersService.getOrder(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() body: AddOrderBodyDto) {
    const { userId, products } = body;
    const productsId: AddOrderDto[] = products.map((product) => {
      const productId: AddOrderDto = { id: product.id };
      return productId;
    });
    return await this.ordersService.addOrder(userId, productsId);
  }
}
