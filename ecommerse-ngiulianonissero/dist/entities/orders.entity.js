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
exports.EOrder = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const users_entity_1 = require("./users.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
let EOrder = class EOrder {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String, default: (0, uuid_1.v4)() }, date: { required: true, type: () => Date }, user: { required: true, type: () => require("./users.entity").EUser }, orderDetails: { required: false, type: () => require("./orderDetails.entity").EOrderDetails } };
    }
};
exports.EOrder = EOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EOrder.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.EUser, (user) => user.orders),
    __metadata("design:type", users_entity_1.EUser)
], EOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderDetails_entity_1.EOrderDetails, (orderDetails) => orderDetails.order),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orderDetails_entity_1.EOrderDetails)
], EOrder.prototype, "orderDetails", void 0);
exports.EOrder = EOrder = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], EOrder);
//# sourceMappingURL=orders.entity.js.map