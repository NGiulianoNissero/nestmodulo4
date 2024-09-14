import { Module } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetailsRepository } from './orderDetails.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EOrderDetails } from '../../entities/orderDetails.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([EOrderDetails]), ProductsModule],
  providers: [OrderDetailsService, OrderDetailsRepository],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
