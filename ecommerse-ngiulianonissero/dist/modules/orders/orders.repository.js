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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("../../entities/orders.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const orderDetails_service_1 = require("../orderDetails/orderDetails.service");
const class_validator_1 = require("class-validator");
let OrdersRepository = class OrdersRepository {
    constructor(ordersRepository, usersService, orderDetailsService) {
        this.ordersRepository = ordersRepository;
        this.usersService = usersService;
        this.orderDetailsService = orderDetailsService;
    }
    async getOrder(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.BadRequestException(`El uuid ${id} no es un uuid valido.`);
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderDetails'],
        });
        if (!order)
            throw new common_1.BadRequestException('No existe una order con el uuid proporcionado.');
        return order;
    }
    async addOrder(userId, products) {
        const userFounded = await this.usersService.getUserById(userId);
        const date = new Date();
        const newOrderData = {
            date,
            user: userFounded,
        };
        const newOrderDetails = await this.orderDetailsService.createOrderDetails(products, newOrderData);
        newOrderData.orderDetails = newOrderDetails;
        const newOrder = await this.ordersRepository.create(newOrderData);
        await this.ordersRepository.save(newOrder);
        return newOrder;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.EOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        orderDetails_service_1.OrderDetailsService])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map