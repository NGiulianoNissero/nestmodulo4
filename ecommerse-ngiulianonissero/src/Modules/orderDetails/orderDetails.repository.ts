import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EOrderDetails } from '../../entities/orderDetails.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailsDto } from './dto/createOrderDetails.dto';
import { ProductsService } from '../products/products.service';
import { EProduct } from '../../entities/products.entity';
import { EOrder } from '../../entities/orders.entity';

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(EOrderDetails)
    private orderDetailsRepository: Repository<EOrderDetails>,
    private productsService: ProductsService,
  ) {}

  async createOrderDetails(
    productId: CreateOrderDetailsDto,
    order: EOrder,
  ): Promise<EOrderDetails> {
    const { id } = productId;
    const productFounded: EProduct | null =
      await this.productsService.getProductById(id);

    if (!productFounded)
      throw new BadRequestException(
        `No se encontro un producto con el uuid ${id}`,
      );

    const { price } = productFounded;

    const newOrderDetailsData: EOrderDetails = {
      price,
      order,
      product: [productFounded],
    };

    const newOrderDetails: EOrderDetails =
      await this.orderDetailsRepository.create(newOrderDetailsData);

    if (!newOrderDetails)
      throw new BadRequestException(
        'Hubo un error al crear el detalle de orden.',
      );

    return newOrderDetails;
  }
}
