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
exports.EProduct = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const categories_entity_1 = require("./categories.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
let EProduct = class EProduct {
    constructor() {
        this.id = (0, uuid_1.v4)();
        this.imgUrl = 'https://res.cloudinary.com/dnfslkgiv/image/upload/v1726516516/muft4cnobocgkvbgj215.png';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String, default: (0, uuid_1.v4)() }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, imgUrl: { required: false, type: () => String, default: "https://res.cloudinary.com/dnfslkgiv/image/upload/v1726516516/muft4cnobocgkvbgj215.png" }, category: { required: false, type: () => require("./categories.entity").ECategory }, orderDetails: { required: false, type: () => [require("./orderDetails.entity").EOrderDetails] } };
    }
};
exports.EProduct = EProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], EProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], EProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false, precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], EProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], EProduct.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EProduct.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.ECategory, (category) => category.products),
    __metadata("design:type", categories_entity_1.ECategory)
], EProduct.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.EOrderDetails, (orderdetails) => orderdetails.products),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], EProduct.prototype, "orderDetails", void 0);
exports.EProduct = EProduct = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], EProduct);
//# sourceMappingURL=products.entity.js.map