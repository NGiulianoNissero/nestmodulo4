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
    products: CreateOrderDetailsDto[],
    order: EOrder,
  ): Promise<EOrderDetails> {
    let totalPrice: number = 0;
    const productList: EProduct[] = [];

    for (const product of products) {
      const { id } = product;
      const productFounded: EProduct | null =
        await this.productsService.getProductById(id);

      if (!productFounded)
        throw new BadRequestException(
          `No se encontro un producto con el uuid ${id}.`,
        );

      if (productFounded.stock <= 0)
        throw new BadRequestException(
          `El producto con el uuid ${id} no tiene mas stock.`,
        );

      productFounded.stock--;
      await this.productsService.updateProduct(
        { stock: productFounded.stock-- },
        id,
      );

      productList.push(productFounded);

      const productPrice: number = Number(productFounded.price);

      if (isNaN(productPrice))
        throw new BadRequestException(
          `El precio del producto ${id} no es valido.`,
        );

      totalPrice += productPrice;
    }

    if (isNaN(totalPrice))
      throw new BadRequestException('El precio total no es valido.');

    const newOrderDetailsData: EOrderDetails = {
      price: totalPrice,
      order,
      products: productList,
    };

    const newOrderDetails: EOrderDetails =
      await this.orderDetailsRepository.create(newOrderDetailsData);

    await this.orderDetailsRepository.save(newOrderDetails);

    if (!newOrderDetails)
      throw new BadRequestException(
        'Hubo un error al crear el detalle de orden.',
      );

    return newOrderDetails;
  }
}
