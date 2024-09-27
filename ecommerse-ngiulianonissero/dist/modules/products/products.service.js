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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
const typeorm_1 = require("typeorm");
const categories_service_1 = require("../categories/categories.service");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesService, dataSource) {
        this.productsRepository = productsRepository;
        this.categoriesService = categoriesService;
        this.dataSource = dataSource;
    }
    async getProducts(page, limit) {
        return await this.productsRepository.getProducts(page, limit);
    }
    async getProductById(id) {
        return await this.productsRepository.getProductById(id);
    }
    async createProduct(body) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newCategory = await this.categoriesService.addCategory(body, queryRunner);
            const newProduct = await this.productsRepository.createProduct({
                ...body,
                category: newCategory,
            }, queryRunner);
            await queryRunner.commitTransaction();
            return newProduct;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw new common_1.BadRequestException('No se pudo crear el producto');
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateProduct(body, id) {
        return await this.productsRepository.updateProduct(body, id);
    }
    async deleteProduct(id) {
        return await this.productsRepository.deleteProduct(id);
    }
    async preloadProducts() {
        return await this.productsRepository.preloadProducts();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        categories_service_1.CategoriesService,
        typeorm_1.DataSource])
], ProductsService);
//# sourceMappingURL=products.service.js.map