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
exports.OrderDetailsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderDetails_entity_1 = require("../../entities/orderDetails.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const products_entity_1 = require("../../entities/products.entity");
let OrderDetailsRepository = class OrderDetailsRepository {
    constructor(orderDetailsRepository, productsService, productRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.productsService = productsService;
        this.productRepository = productRepository;
    }
    async createOrderDetails(products, order) {
        let totalPrice = 0;
        const productList = [];
        for (const product of products) {
            const { id } = product;
            const productFounded = await this.productsService.getProductById(id);
            if (!productFounded)
                throw new common_1.BadRequestException(`No se encontro un producto con el uuid ${id}.`);
            if (productFounded.stock <= 0)
                throw new common_1.BadRequestException(`El producto con el uuid ${id} no tiene mas stock.`);
            productFounded.stock--;
            await this.productRepository.save(productFounded);
            productList.push(productFounded);
            const productPrice = Number(productFounded.price);
            if (isNaN(productPrice))
                throw new common_1.BadRequestException(`El precio del producto ${id} no es valido.`);
            totalPrice += productPrice;
        }
        if (isNaN(totalPrice))
            throw new common_1.BadRequestException('El precio total no es valido.');
        const newOrderDetailsData = {
            price: totalPrice,
            order,
            products: productList,
        };
        const newOrderDetails = await this.orderDetailsRepository.create(newOrderDetailsData);
        await this.orderDetailsRepository.save(newOrderDetails);
        if (!newOrderDetails)
            throw new common_1.BadRequestException('Hubo un error al crear el detalle de orden.');
        return newOrderDetails;
    }
};
exports.OrderDetailsRepository = OrderDetailsRepository;
exports.OrderDetailsRepository = OrderDetailsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.EOrderDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(products_entity_1.EProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        typeorm_2.Repository])
], OrderDetailsRepository);
//# sourceMappingURL=orderDetails.repository.js.map