import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { EProduct } from '../../entities/products.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ECategory } from '../../entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesService: CategoriesService,
    private dataSource: DataSource,
  ) {}

  async getProducts(page: number, limit: number): Promise<EProduct[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: string): Promise<EProduct> {
    return await this.productsRepository.getProductById(id);
  }

  async createProduct(body: CreateProductDto): Promise<EProduct> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newCategory: ECategory = await this.categoriesService.addCategory(
        body,
        queryRunner,
      );
      const newProduct: EProduct = await this.productsRepository.createProduct(
        {
          ...body,
          category: newCategory,
        },
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return newProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('No se pudo crear el producto');
      }
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct(body: UpdateProductDto, id: string): Promise<EProduct> {
    return await this.productsRepository.updateProduct(body, id);
  }

  async deleteProduct(id: string): Promise<EProduct> {
    return await this.productsRepository.deleteProduct(id);
  }

  async preloadProducts(): Promise<EProduct[]> {
    return await this.productsRepository.preloadProducts();
  }
}
