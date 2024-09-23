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
exports.EUser = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const orders_entity_1 = require("./orders.entity");
let EUser = class EUser {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String, default: (0, uuid_1.v4)() }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => Number }, address: { required: true, type: () => String }, isAdmin: { required: false, type: () => Boolean }, country: { required: false, type: () => String }, city: { required: false, type: () => String }, orders: { required: false, type: () => [require("./orders.entity").EOrder] } };
    }
};
exports.EUser = EUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], EUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], EUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], EUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], EUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EUser.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EUser.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], EUser.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], EUser.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.EOrder, (order) => order.user),
    __metadata("design:type", Array)
], EUser.prototype, "orders", void 0);
exports.EUser = EUser = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], EUser);
//# sourceMappingURL=users.entity.js.map