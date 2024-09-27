import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Obtener categorias' })
  @Get()
  @HttpCode(200)
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Cargar categorias' })
  @Post('seeder')
  @HttpCode(200)
  async preloadCategories() {
    return await this.categoriesService.preloadCategories();
  }
}
