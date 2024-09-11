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
import IProduct from 'src/modules/products/interface/product.interface';
import { UpdateProductDto } from 'src/modules/products/dto/updateProduct.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateProductDto } from './dto/createProduct.dto';

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
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const { name, description, price, stock, imgUrl } = body;

    if (name)
      await this.productsService.updateProduct('name', name, Number(id));

    if (description)
      await this.productsService.updateProduct(
        'description',
        description,
        Number(id),
      );

    if (price)
      await this.productsService.updateProduct('price', price, Number(id));

    if (stock)
      await this.productsService.updateProduct('stock', stock, Number(id));

    if (imgUrl)
      await this.productsService.updateProduct('imgUrl', imgUrl, Number(id));

    return await this.productsService.getProductById(Number(id));
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
