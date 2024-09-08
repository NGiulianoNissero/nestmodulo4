import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { LoggerMiddleware } from 'src/Middlewares/logger.middleware';
import { ProductsRepository } from './products.repository';
import { CreateProductValidation } from 'src/Middlewares/createProductValidation.middleware';
import { UpdateValidation } from 'src/Middlewares/updateValidation.middleware';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProductsController)
      .apply(CreateProductValidation)
      .forRoutes({ path: 'products', method: RequestMethod.POST })
      .apply(UpdateValidation)
      .forRoutes({ path: 'products', method: RequestMethod.PUT });
  }
}
