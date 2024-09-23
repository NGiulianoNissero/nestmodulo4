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
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String, description: "El nombre es opcional, debe tener entre 3 y 80 caracteres.", example: "Pedro", minLength: 3, maxLength: 80 }, email: { required: false, type: () => String, description: "El correo es opcional y debe ser un correo valido.", example: "example@yahoo.com" }, password: { required: false, type: () => String, description: "La contrase\u00F1a es opcional, debe tener entre 8 y 15 caracteres, incluyendo al menos una letra min\u00FAscula, una letra may\u00FAscula, un n\u00FAmero y un car\u00E1cter especial (!@#$%^&*).", example: "Password675*", pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, address: { required: false, type: () => String, description: "La direccion es opciona, debe tener entre 3 y 80 caracteres.", example: "5678 Calle Pan", minLength: 3, maxLength: 80 }, phone: { required: false, type: () => Number, description: "El telefono es opcional y debe ser un numero.", example: 2643547865 }, country: { required: false, type: () => String, description: "El pais es opcional, debe tener entre 5 y 20 caracteres.", example: "Chile", minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, description: "La ciudad es opcional, debe tener entre 5 y 20 caracteres.", example: "Buenos Aires", minLength: 5, maxLength: 20 } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser un email valido.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La direccion debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(3, 80, {
        message: 'La dirección debe tener entre 3 y 80 caracteres.',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El número de teléfono debe ser un número.' }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El pais debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ciudad debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
//# sourceMappingURL=updateUser.dto.js.map