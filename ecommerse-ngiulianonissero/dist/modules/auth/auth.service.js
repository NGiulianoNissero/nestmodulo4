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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("./roles.enum");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(user) {
        const dbUser = await this.usersService.getUserByEmail(user.email);
        if (dbUser)
            throw new common_1.BadRequestException(`Ya existe un usuario con el email ${user.email}`);
        const hasdedPassword = await bcrypt.hash(user.password, 10);
        if (!hasdedPassword)
            throw new common_1.BadRequestException('Error al encriptar la contraseña.');
        const newUser = await this.usersService.signUp({
            ...user,
            password: hasdedPassword,
        });
        const { password, isAdmin, ...userWithoutPasswordAndWithoutRole } = newUser;
        return userWithoutPasswordAndWithoutRole;
    }
    async signIn(email, password) {
        const dbUser = await this.usersService.getUserByEmail(email);
        if (!dbUser)
            throw new common_1.BadRequestException('Email o contraseña incorrectos.');
        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Email o contraseña incorrectos.');
        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.isAdmin ? roles_enum_1.Role.Admin : roles_enum_1.Role.User],
        };
        const token = this.jwtService.sign(userPayload);
        return { message: 'Usuario logueado satisfactoriamente.', token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map