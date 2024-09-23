import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { ECategory } from '../../entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<ECategory[]> {
    return await this.categoriesRepository.getCategories();
  }

  async preloadCategories(): Promise<ECategory[]> {
    return await this.categoriesRepository.preloadCategories();
  }

  async addCategory(
    body: CreateCategoryDto,
    queryRunner: QueryRunner,
  ): Promise<ECategory> {
    const { category } = body;
    const newCategory: ECategory = {
      name: category,
    };
    return await this.categoriesRepository.addCategory(
      newCategory,
      queryRunner,
    );
  }

  async findCategory(category: string): Promise<ECategory> {
    return await this.categoriesRepository.findCategory(category);
  }
}
