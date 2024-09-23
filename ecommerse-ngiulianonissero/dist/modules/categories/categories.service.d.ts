import { CategoriesRepository } from './categories.repository';
import { ECategory } from '../../entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { QueryRunner } from 'typeorm';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<ECategory[]>;
    preloadCategories(): Promise<ECategory[]>;
    addCategory(body: CreateCategoryDto, queryRunner: QueryRunner): Promise<ECategory>;
    findCategory(category: string): Promise<ECategory>;
}
