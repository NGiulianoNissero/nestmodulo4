"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.DB_PASS = exports.DB_USER = exports.DB_HOST = exports.DB_PORT = exports.DB_DATABASE = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.development.env' });
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.DB_PORT = Number(process.env.DB_PORT);
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.JWT_SECRET = process.env.JWT_SECRET;
//# sourceMappingURL=envs.js.map