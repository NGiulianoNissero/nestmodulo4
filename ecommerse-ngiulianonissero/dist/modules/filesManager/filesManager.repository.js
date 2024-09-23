"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesManagerRepository = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require('buffer-to-stream');
let FilesManagerRepository = class FilesManagerRepository {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
                else {
                    reject(new common_1.BadRequestException('Resultado de subida es indefinido.'));
                }
            });
            toStream(file.buffer).pipe(upload);
        });
    }
};
exports.FilesManagerRepository = FilesManagerRepository;
exports.FilesManagerRepository = FilesManagerRepository = __decorate([
    (0, common_1.Injectable)()
], FilesManagerRepository);
//# sourceMappingURL=filesManager.repository.js.map