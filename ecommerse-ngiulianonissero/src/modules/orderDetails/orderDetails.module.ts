import { Module } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetailsRepository } from './orderDetails.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EOrderDetails } from '../../entities/orderDetails.entity';
import { ProductsModule } from '../products/products.module';
import { EProduct } from '../../entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EOrderDetails]),
    TypeOrmModule.forFeature([EProduct]),
    ProductsModule,
  ],
  providers: [OrderDetailsService, OrderDetailsRepository],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
