import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from 'src/Middlewares/logger.middleware';
import { CredentialRepository } from './auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CredentialRepository],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
