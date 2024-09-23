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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "El nombre debe tener entre 3 y 80 caracteres.", example: "Giuliano", minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, description: "El correo debe ser un correo valido.", example: "example@gmail.com" }, password: { required: true, type: () => String, description: "La contrase\u00F1a debe tener entre 8 y 15 caracteres, incluyendo al menos una letra min\u00FAscula, una letra may\u00FAscula, un n\u00FAmero y un car\u00E1cter especial (!@#$%^&*).", example: "Admin123!", pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, passwordConfirmation: { required: true, type: () => String, description: "La contrase\u00F1a de confirmacion debe ser igual que la contrase\u00F1a.", example: "Admin123!" }, address: { required: true, type: () => String, description: "La direccion debe tener entre 3 y 80 caracteres.", example: "123 Calle Queso", minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number, description: "El telefono debe ser un numero.", example: 2647847865 }, country: { required: false, type: () => String, description: "El pais es opcional, debe tener entre 5 y 20 caracteres.", example: "Argentina", minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, description: "La ciudad es opcional, debe tener entre 5 y 20 caracteres.", example: "San Juan", minLength: 5, maxLength: 20 }, isAdmin: { required: false, type: () => Boolean, description: "El role admin es opcional, por defecto es falso, se puede colocar la propiedad si se desea crear un usuario administrador.\n@default false" } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es requerido.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser un email valido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida.' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "passwordConfirmation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La direccion es requerida.' }),
    (0, class_validator_1.IsString)({ message: 'La direccion debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(3, 80, {
        message: 'La dirección debe tener entre 3 y 80 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El numero de telefono es requerido.' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El número de teléfono debe ser un número.' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El pais debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ciudad debe ser una cadena de texto.' }),
    (0, class_validator_1.Length)(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'El rol admin debe ser un booleano.' }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=createUser.dto.js.map