"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => {
            const cleanErrors = errors.map((error) => {
                return { property: error.property, constraints: error.constraints };
            });
            return new common_1.BadRequestException({
                alert: 'Se han detectado los siguientes errores en la preticion.',
                errors: cleanErrors,
            });
        },
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('REST API Proyecto Integrador Modulo 4')
        .setDescription(`
      Esta es una API REST construida con NestJs para el proyecto integrador del módulo 4 de soyHenry. 
      Usa esta documentación para interactuar con los diferentes endpoints de la API.

      Esta API permite la autentificación por token y por roles.

      Para autenticarse:
      - Utiliza el endpoint /auth/login para obtener un token.
      - Usa el token en los headers para acceder a endpoints protegidos.

      Para autenticarse con rol admin:
      - Al crear el usuario en /auth/signup coloca la propiedad isAdmin en true

      `)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'API Proyecto Integrador',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map