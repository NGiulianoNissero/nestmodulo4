import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ECategory } from '../../entities/categories.entity';
import { Repository } from 'typeorm';
import products from '../../helpers/preloadProducts';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(ECategory)
    private categoriesRepository: Repository<ECategory>,
  ) {}

  private products = products;

  async getCategories(): Promise<ECategory[]> {
    return this.categoriesRepository.find();
  }

  async addCategories(): Promise<ECategory[]> {
    const categoriesHC = this.products.map((product) => product.category);
    const uniqueCategories = [...new Set(categoriesHC)];
    const categories: ECategory[] = uniqueCategories.map((element) => {
      const category = { name: element };
      return category;
    });
    for await (const category of categories) {
      const newCategory = this.categoriesRepository.create(category);
      await this.categoriesRepository.save(newCategory);
    }

    const categoriesDB: ECategory[] = await this.categoriesRepository.find();

    if (categoriesDB.length <= 0)
      throw new HttpException('Error al precargar las categorias', 500);

    return categoriesDB;
  }
}
