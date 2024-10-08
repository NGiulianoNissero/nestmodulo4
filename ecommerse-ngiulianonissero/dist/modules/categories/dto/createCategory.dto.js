"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: true, type: () => String } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=createCategory.dto.js.map