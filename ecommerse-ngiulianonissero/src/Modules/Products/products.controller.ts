import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import IProduct from 'src/Interfaces/product.interface';
import ProductBodyDto from 'src/Dto/productBody.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<IProduct[]> {
    return await this.productsService.getProducts(Number(page), Number(limit));
  }

  @HttpCode(200)
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.getProductById(Number(id));
  }

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() product: Omit<IProduct, 'id'>) {
    return await this.productsService.createProduct(product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: ProductBodyDto) {
    const { name } = body;
    return await this.productsService.updateProduct(name, Number(id));
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
