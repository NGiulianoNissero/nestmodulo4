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
      'Esta es una API REST construida con NestJs para ser empleada como demo del proyecto integrador del modulo 4 de soyHenry',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
