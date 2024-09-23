import { ECategory } from '../../entities/categories.entity';
import { QueryRunner, Repository } from 'typeorm';
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<ECategory>);
    private products;
    getCategories(): Promise<ECategory[]>;
    preloadCategories(): Promise<ECategory[]>;
    addCategory(category: ECategory, queryRunner: QueryRunner): Promise<ECategory>;
    findCategory(category: string): Promise<ECategory>;
}
