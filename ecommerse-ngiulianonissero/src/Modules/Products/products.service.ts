import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { EProduct } from '../../entities/products.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { QueryRunner } from 'typeorm';
import { connectionSource } from '../../config/typeorm.config';
import { CategoriesService } from '../categories/categories.service';
import { ECategory } from '../../entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
  ) {}

  async getProducts(page: number, limit: number): Promise<EProduct[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: string): Promise<EProduct> {
    return await this.productsRepository.getProductById(id);
  }

  async createProduct(body: CreateProductDto): Promise<EProduct> {
    await connectionSource.initialize();
    const queryRunner: QueryRunner = connectionSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const newCategory: ECategory = await this.categoriesService.addCategory(
        body,
        queryRunner,
      );
      const newProduct: EProduct = await this.productsRepository.createProduct(
        {
          ...body,
          category: [newCategory],
        },
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return newProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('No se pudo crear el producto');
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct(body: UpdateProductDto, id: string): Promise<void> {
    await this.productsRepository.updateProduct(body, id);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.deleteProduct(id);
  }
}
