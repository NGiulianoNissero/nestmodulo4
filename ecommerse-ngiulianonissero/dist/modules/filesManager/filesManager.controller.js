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
exports.FilesManagerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const filesManager_service_1 = require("./filesManager.service");
const platform_express_1 = require("@nestjs/platform-express");
const Auth_guard_1 = require("../auth/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
let FilesManagerController = class FilesManagerController {
    constructor(filesManagerService) {
        this.filesManagerService = filesManagerService;
    }
    async uploadImage(file, id) {
        return this.filesManagerService.uploadImage(id, file);
    }
};
exports.FilesManagerController = FilesManagerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Subir una imagen' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'El archivo de imagen que se desea subir (jpg, jpeg, png, webp)',
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('uploadImage/:uuid'),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200000,
                message: 'El archivo debe pesar menos de 200kb',
            }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],
    }))),
    __param(1, (0, common_1.Param)('uuid', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FilesManagerController.prototype, "uploadImage", null);
exports.FilesManagerController = FilesManagerController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [filesManager_service_1.FilesManagerService])
], FilesManagerController);
//# sourceMappingURL=filesManager.controller.js.map