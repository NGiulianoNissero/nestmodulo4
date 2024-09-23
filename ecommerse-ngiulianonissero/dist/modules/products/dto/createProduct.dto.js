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
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "El nombre debe ser una cadena de caracteres.", example: "Queso" }, description: { required: true, type: () => String, description: "La descripcion debe ser una cadena de caracteres.", example: "El queso es muy rico." }, price: { required: true, type: () => Number, description: "El precio debe ser un numero.", example: 500 }, stock: { required: true, type: () => Number, description: "El stock debe ser un numero.", example: 20 }, category: { required: true, type: () => String, description: "La categoria debe ser una cadena de caracteres.", example: "Comida" } };
    }
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del producto debe estar' }),
    (0, class_validator_1.IsString)({
        message: 'El nombre del producto debe ser una cadena de caracteres (texto).',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripcion del producto debe estar' }),
    (0, class_validator_1.IsString)({
        message: 'La descripcion del producto debe ser una cadena de caracteres (texto).',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio del producto debe estar' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock del producto debe estar' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoria del producto debe estar' }),
    (0, class_validator_1.IsString)({
        message: 'La categoria del producto debe ser una cadena de caracteres (texto).',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
//# sourceMappingURL=createProduct.dto.js.map