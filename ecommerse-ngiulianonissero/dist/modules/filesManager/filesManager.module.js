"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesManagerModule = void 0;
const common_1 = require("@nestjs/common");
const filesManager_controller_1 = require("./filesManager.controller");
const filesManager_service_1 = require("./filesManager.service");
const filesManager_repository_1 = require("./filesManager.repository");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const products_module_1 = require("../products/products.module");
let FilesManagerModule = class FilesManagerModule {
};
exports.FilesManagerModule = FilesManagerModule;
exports.FilesManagerModule = FilesManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [products_module_1.ProductsModule],
        controllers: [filesManager_controller_1.FilesManagerController],
        providers: [filesManager_service_1.FilesManagerService, filesManager_repository_1.FilesManagerRepository, cloudinary_config_1.CloudinaryConfig],
    })
], FilesManagerModule);
//# sourceMappingURL=filesManager.module.js.map