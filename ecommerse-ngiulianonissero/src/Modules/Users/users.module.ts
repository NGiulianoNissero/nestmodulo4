import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from 'src/Middlewares/logger.middleware';
import { UsersRepository } from './users.repository';
import { CreateUserValidation } from 'src/Middlewares/createUserValidation.middleware';
import { UpdateValidation } from 'src/Middlewares/updateValidation.middleware';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController)
      .apply(CreateUserValidation)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
      .apply(UpdateValidation)
      .forRoutes({ path: 'users', method: RequestMethod.PUT });
  }
}
