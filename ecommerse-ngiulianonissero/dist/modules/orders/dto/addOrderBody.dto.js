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
exports.AddOrderBodyDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const addOrder_dto_1 = require("./addOrder.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class AddOrderBodyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, description: "El id del usuario debe ser un UUID.", example: "123e4567-e89b-12d3-a456-426614174000" }, products: { required: true, type: () => [require("./addOrder.dto").AddOrderDto], description: "Los productos deben ser un array con objetos donde cada objeto debe tener el uuid del producto.", example: "[{id: \"product-1\"},{id: \"product-2\"}, {id: \"product-3\"}]" } };
    }
}
exports.AddOrderBodyDto = AddOrderBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El uuid del usuario es requerido.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'El uuid del usuario debe ser un UUID valido.' }),
    __metadata("design:type", String)
], AddOrderBodyDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El array de productos es requerido.' }),
    (0, class_validator_1.IsArray)({ message: 'Productos debe ser un array.' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Debe haber almenos un producto en el array.' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => addOrder_dto_1.AddOrderDto),
    __metadata("design:type", Array)
], AddOrderBodyDto.prototype, "products", void 0);
//# sourceMappingURL=addOrderBody.dto.js.map