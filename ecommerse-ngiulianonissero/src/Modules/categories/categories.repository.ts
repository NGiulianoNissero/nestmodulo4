import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ECategory } from '../../entities/categories.entity';
import { QueryRunner, Repository } from 'typeorm';
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

  async preloadCategories(): Promise<ECategory[]> {
    const categoriesHC = this.products.map((product) => product.category);
    const uniqueCategories = [...new Set(categoriesHC)];

    let count: number = 0;
    for await (const categoryName of uniqueCategories) {
      const categoryFounded: ECategory | null =
        await this.categoriesRepository.findOneBy({ name: categoryName });

      if (!categoryFounded) {
        const newCategory = this.categoriesRepository.create({
          name: categoryName,
        });
        await this.categoriesRepository.save(newCategory);

        count++;
      }
    }
    if (count === 0)
      throw new BadRequestException('Ya estan precargadas las categorias');

    const categoriesDB: ECategory[] = await this.categoriesRepository.find();

    if (categoriesDB.length <= 0)
      throw new HttpException('Error al precargar las categorias', 500);

    return categoriesDB;
  }

  async addCategory(
    category: ECategory,
    queryRunner: QueryRunner,
  ): Promise<ECategory> {
    const newCategory: ECategory = await queryRunner.manager.create(
      ECategory,
      category,
    );
    await queryRunner.manager.save(ECategory, newCategory);

    if (!newCategory)
      throw new BadRequestException('Error al crear la categoria.');

    console.log(newCategory);

    return newCategory;
  }
}
