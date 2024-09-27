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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { EProduct } from '../../entities/products.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/guards/Roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Obtener productos' })
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Pagina de los productos',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de los productos',
  })
  @HttpCode(200)
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<EProduct[]> {
    return await this.productsService.getProducts(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Obtener un producto por id' })
  @ApiBearerAuth()
  @Get(':uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getProductById(
    @Param('uuid', new ParseUUIDPipe()) id: string,
  ): Promise<EProduct> {
    return await this.productsService.getProductById(id);
  }

  @ApiOperation({ summary: 'Crear un producto' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productsService.createProduct(body);
  }

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiBearerAuth()
  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @ApiOperation({ summary: 'Cargar productos' })
  @Post('seeder')
  async preloadProducts() {
    return await this.productsService.preloadProducts();
  }
}
