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
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AuthGuard } from '../../guards/AuthGuard';
import { CreateProductDto } from './dto/createProduct.dto';
import { EProduct } from '../../entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<EProduct[]> {
    return await this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get(':uuid')
  @HttpCode(200)
  async getProductById(@Param('uuid') id: string): Promise<EProduct> {
    return await this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productsService.createProduct(body);
  }

  @Put(':uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateProduct(
    @Param('uuid') id: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(body, id);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('uuid') id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  async preloadProducts() {
    return await this.productsService.preloadProducts();
  }
}
