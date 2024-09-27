import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la preticion.',
          errors: cleanErrors,
        });
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('REST API Proyecto Integrador Modulo 4')
    .setDescription(
      `
      Esta es una API REST construida con NestJs para el proyecto integrador del módulo 4 de soyHenry. 
      Usa esta documentación para interactuar con los diferentes endpoints de la API.

      Esta API permite la autentificación por token y por roles.

      Para autenticarse:
      - Utiliza el endpoint /auth/login para obtener un token.
      - Usa el token en los headers para acceder a endpoints protegidos.

      Para autenticarse con rol admin:
      - Al crear el usuario en /auth/signup coloca la propiedad isAdmin en true

      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Proyecto Integrador',
  });

  await app.listen(3000);
}

bootstrap();
