"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const envs_1 = require("./envs");
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: envs_1.CLOUDINARY_CLOUD_NAME,
            api_key: envs_1.CLOUDINARY_API_KEY,
            api_secret: envs_1.CLOUDINARY_API_SECRET,
        });
    },
};
//# sourceMappingURL=cloudinary.config.js.map