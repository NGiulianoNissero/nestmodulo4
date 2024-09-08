import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import IProduct from 'src/Interfaces/product.interface';
import ProductBodyDto from 'src/Dto/productBody.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  async getProducts(): Promise<IProduct[]> {
    return await this.productsService.getProducts();
  }

  @HttpCode(200)
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.getProductById(Number(id));
  }

  @HttpCode(201)
  @Post()
  async createProduct(@Body() product: Omit<IProduct, 'id'>) {
    return await this.productsService.createProduct(product);
  }

  @HttpCode(200)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: ProductBodyDto) {
    const { name } = body;
    return await this.productsService.updateProduct(name, Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
