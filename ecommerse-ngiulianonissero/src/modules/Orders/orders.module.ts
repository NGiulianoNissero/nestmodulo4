import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EOrder } from '../../entities/orders.entity';
import { UsersModule } from '../users/users.module';
import { OrderDetailsModule } from '../orderDetails/orderDetails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EOrder]),
    UsersModule,
    OrderDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
