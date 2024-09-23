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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
let UsersRepository = class UsersRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        return await this.userRepository.find();
    }
    async getUserById(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.BadRequestException(`El uuid ${id} no es un uuid valido.`);
        const userFounded = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.orders', 'order')
            .select(['user.id', 'user.name', 'order.id', 'order.date'])
            .where('user.id = :id', { id })
            .getOne();
        if (!userFounded)
            throw new common_1.BadRequestException(`No se encontro un usuario con el uuid ${id}`);
        const { isAdmin, ...userWithoutRole } = userFounded;
        return userWithoutRole;
    }
    async createUser(user) {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
    async updateUser(body, id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.BadRequestException(`No se encontro un usuario con el uuid ${id}`);
        }
        const updatedUser = {
            ...user,
            ...body,
        };
        await this.userRepository.save(updatedUser);
        const { isAdmin, ...userWithoutRole } = updatedUser;
        return userWithoutRole;
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.BadRequestException(`No existe un usuario con el uuid ${id}`);
        await this.userRepository.delete({ id });
        const { isAdmin, ...userWithoutRole } = user;
        return userWithoutRole;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.EUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map