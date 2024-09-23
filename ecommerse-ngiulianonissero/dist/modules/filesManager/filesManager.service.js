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
exports.FilesManagerService = void 0;
const common_1 = require("@nestjs/common");
const filesManager_repository_1 = require("./filesManager.repository");
const products_service_1 = require("../products/products.service");
let FilesManagerService = class FilesManagerService {
    constructor(filesManagerRepository, productsService) {
        this.filesManagerRepository = filesManagerRepository;
        this.productsService = productsService;
    }
    async uploadImage(id, file) {
        const imageResult = await this.filesManagerRepository.uploadImage(file);
        const product = await this.productsService.getProductById(id);
        if (!product)
            throw new common_1.BadRequestException(`No existe un producto con el uuid ${id}`);
        const newImage = {
            imgUrl: imageResult.secure_url,
        };
        await this.productsService.updateProduct(newImage, id);
        return {
            message: 'Imagen actualizada correctamente',
            imgUrl: imageResult.secure_url,
        };
    }
};
exports.FilesManagerService = FilesManagerService;
exports.FilesManagerService = FilesManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [filesManager_repository_1.FilesManagerRepository,
        products_service_1.ProductsService])
], FilesManagerService);
//# sourceMappingURL=filesManager.service.js.map