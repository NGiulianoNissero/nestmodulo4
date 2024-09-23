"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../../entities/categories.entity");
const typeorm_2 = require("typeorm");
const preloadProducts_1 = require("../../helpers/preloadProducts");
let CategoriesRepository = class CategoriesRepository {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
        this.products = preloadProducts_1.default;
    }
    async getCategories() {
        return this.categoriesRepository.find();
    }
    async preloadCategories() {
        const categoriesHC = this.products.map((product) => product.category);
        const uniqueCategories = [...new Set(categoriesHC)];
        let count = 0;
        for await (const categoryName of uniqueCategories) {
            const categoryFounded = await this.categoriesRepository.findOneBy({ name: categoryName });
            if (!categoryFounded) {
                const newCategory = this.categoriesRepository.create({
                    name: categoryName,
                });
                await this.categoriesRepository.save(newCategory);
                count++;
            }
        }
        if (count === 0)
            throw new common_1.BadRequestException('Ya estan precargadas las categorias');
        const categoriesDB = await this.categoriesRepository.find();
        if (categoriesDB.length <= 0)
            throw new common_1.HttpException('Error al precargar las categorias', 500);
        return categoriesDB;
    }
    async addCategory(category, queryRunner) {
        const categoryFounded = await this.categoriesRepository.findOneBy({ name: category.name });
        if (categoryFounded) {
            return categoryFounded;
        }
        const newCategory = await queryRunner.manager.create(categories_entity_1.ECategory, category);
        await queryRunner.manager.save(categories_entity_1.ECategory, newCategory);
        if (!newCategory)
            throw new common_1.BadRequestException('Error al crear la categoria.');
        return newCategory;
    }
    async findCategory(category) {
        const categoryFounded = await this.categoriesRepository.findOneBy({ name: category });
        if (!categoryFounded)
            throw new common_1.BadRequestException(`No existe la categoria ${category}`);
        return categoryFounded;
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.ECategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map