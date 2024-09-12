import { HttpException, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { CategoriesModule } from './modules/categories/categories.module';

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
    AuthModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],
})
export class AppModule {}
