import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { EProduct } from '../../entities/products.entity';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/guards/Roles.guard';

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
  @UseGuards(AuthGuard)
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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  async updateProduct(
    @Param('uuid', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(body, id);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @Post('seeder')
  async preloadProducts() {
    return await this.productsService.preloadProducts();
  }
}
