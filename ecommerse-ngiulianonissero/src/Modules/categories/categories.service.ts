import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { ECategory } from '../../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<ECategory[]> {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories(): Promise<ECategory[]> {
    return await this.categoriesRepository.addCategories();
  }
}
