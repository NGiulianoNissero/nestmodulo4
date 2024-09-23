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
exports.UpdateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String, description: "El nombre es opcional, debe ser una cadena de caracteres.", example: "Pan" }, description: { required: false, type: () => String, description: "La descripcion es opcional, debe ser una cadena de caracteres.", example: "Que rico pansito" }, price: { required: false, type: () => Number, description: "El precio es opcional, debe ser un numero.", example: 200 }, stock: { required: false, type: () => Number, description: "El stock es opcional, debe ser un numero", example: "Comida" }, imgUrl: { required: false, type: () => String, description: "La url de la imagen es opcional, debe ser una cadena de caracteres ademas de una url.", example: "http://example.com/image.png" } };
    }
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'El nombre del producto debe ser una cadena de caracteres (texto).',
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'La descripcion del producto debe ser una cadena de caracteres (texto).',
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'La imagen del producto debe ser una cadena de caracteres (texto).',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "imgUrl", void 0);
//# sourceMappingURL=updateProduct.dto.js.map