import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<import("../../entities/categories.entity").ECategory[]>;
    preloadCategories(): Promise<import("../../entities/categories.entity").ECategory[]>;
}
