"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const config_1 = require("@nestjs/config");
const typeOrmConfig = {
    type: 'postgres',
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASS,
    database: envs_1.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
};
exports.default = (0, config_1.registerAs)('typeorm', () => typeOrmConfig);
exports.connectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=typeorm.config.js.map