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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const products_entity_1 = require("../../entities/products.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const preloadProducts_1 = require("../../helpers/preloadProducts");
const categories_service_1 = require("../categories/categories.service");
let ProductsRepository = class ProductsRepository {
    constructor(productRepository, categoriesService, dataSource) {
        this.productRepository = productRepository;
        this.categoriesService = categoriesService;
        this.dataSource = dataSource;
        this.productsHD = [
            {
                id: 1,
                name: 'Laptop Pro',
                description: 'A high-performance laptop with a sleek design and powerful features.',
                price: 1299.99,
                stock: true,
                imgUrl: 'https://example.com/images/laptop-pro.jpg',
            },
            {
                id: 2,
                name: 'Wireless Headphones',
                description: 'Noise-cancelling headphones with excellent sound quality and long battery life.',
                price: 199.99,
                stock: true,
                imgUrl: 'https://example.com/images/wireless-headphones.jpg',
            },
            {
                id: 3,
                name: 'Smartphone XL',
                description: 'A smartphone with a large display, advanced camera, and fast performance.',
                price: 899.99,
                stock: false,
                imgUrl: 'https://example.com/images/smartphone-xl.jpg',
            },
            {
                id: 4,
                name: 'Gaming Mouse',
                description: 'An ergonomic gaming mouse with customizable buttons and RGB lighting.',
                price: 59.99,
                stock: true,
                imgUrl: 'https://example.com/images/gaming-mouse.jpg',
            },
            {
                id: 5,
                name: '4K Monitor',
                description: 'A 32-inch 4K monitor with ultra-slim bezels and vivid colors.',
                price: 499.99,
                stock: true,
                imgUrl: 'https://example.com/images/4k-monitor.jpg',
            },
            {
                id: 6,
                name: 'Mechanical Keyboard',
                description: 'A backlit mechanical keyboard with customizable switches.',
                price: 129.99,
                stock: true,
                imgUrl: 'https://example.com/images/mechanical-keyboard.jpg',
            },
            {
                id: 7,
                name: 'Smartwatch Series 5',
                description: 'A stylish smartwatch with health tracking and customizable watch faces.',
                price: 349.99,
                stock: false,
                imgUrl: 'https://example.com/images/smartwatch-series5.jpg',
            },
            {
                id: 8,
                name: 'Bluetooth Speaker',
                description: 'A portable Bluetooth speaker with rich sound and water resistance.',
                price: 89.99,
                stock: true,
                imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
            },
            {
                id: 9,
                name: 'VR Headset',
                description: 'A next-gen VR headset with a wide field of view and smooth performance.',
                price: 399.99,
                stock: true,
                imgUrl: 'https://example.com/images/vr-headset.jpg',
            },
            {
                id: 10,
                name: 'Portable Charger',
                description: 'A high-capacity portable charger with fast charging capabilities.',
                price: 49.99,
                stock: true,
                imgUrl: 'https://example.com/images/portable-charger.jpg',
            },
        ];
        this.products = preloadProducts_1.default;
    }
    async getProducts(page, limit) {
        const skip = (page - 1) * limit;
        const [productsPage, total] = await this.productRepository.findAndCount({
            skip,
            take: limit,
        });
        if (productsPage.length === 0)
            throw new common_1.BadRequestException('No existen productos o no existe la pagina proporcionada');
        return productsPage;
    }
    async getProductById(id) {
        const productById = await this.productRepository.findOneBy({ id });
        if (!productById)
            throw new common_1.BadRequestException(`No se encontro un producto con el uuid ${id}`);
        return productById;
    }
    async createProduct(product, queryRunner) {
        const productFounded = await this.productRepository.findOneBy({ name: product.name });
        if (productFounded)
            throw new common_1.BadRequestException('Ya existe un producto con ese nombre');
        const newProduct = await queryRunner.manager.create(products_entity_1.EProduct, product);
        await queryRunner.manager.save(products_entity_1.EProduct, newProduct);
        if (!newProduct)
            throw new common_1.BadRequestException('Error al crear el producto');
        return newProduct;
    }
    async updateProduct(body, id) {
        const productFounded = await this.productRepository.findOneBy({ id });
        if (!productFounded)
            throw new common_1.BadRequestException(`No se encontro un producto con el uuid ${id}`);
        const updatedProduct = {
            ...productFounded,
            ...body,
        };
        await this.productRepository.save(updatedProduct);
        return updatedProduct;
    }
    async deleteProduct(id) {
        const productFounded = await this.productRepository.findOneBy({ id });
        if (!productFounded)
            throw new common_1.BadRequestException(`No se encontro un producto con el uuid ${id}`);
        await this.productRepository.delete({ id });
        return productFounded;
    }
    async preloadProducts() {
        const productsFounded = await this.productRepository.find();
        if (productsFounded.length > 0)
            throw new common_1.BadRequestException('Ya hay productos en la base de datos');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const products = await Promise.all(this.products.map(async (product) => {
                const category = await this.categoriesService.findCategory(product.category);
                const { name, description, price, stock } = product;
                const productData = {
                    name,
                    description,
                    price,
                    stock,
                    category,
                };
                const newProduct = await queryRunner.manager.create(products_entity_1.EProduct, productData);
                await queryRunner.manager.save(products_entity_1.EProduct, newProduct);
                return newProduct;
            }));
            await queryRunner.commitTransaction();
            return products;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException('Error al precargar los productos');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.EProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        typeorm_2.DataSource])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map