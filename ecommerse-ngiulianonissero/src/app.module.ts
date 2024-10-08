import { HttpException, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/orderDetails/orderDetails.module';
import { FilesManagerModule } from './modules/filesManager/filesManager.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const ormConfig = configService.get<TypeOrmModuleOptions>('typeorm');

        if (!ormConfig) throw new HttpException('Typeorm config problem', 500);

        return ormConfig;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: JWT_SECRET,
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    FilesManagerModule,
  ],
})
export class AppModule {}
