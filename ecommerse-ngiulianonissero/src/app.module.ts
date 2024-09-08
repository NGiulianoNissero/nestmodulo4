import { Module } from '@nestjs/common';
import { AuthModule } from './Modules/Auth/auth.module';
import { ProductsModule } from './Modules/Products/products.module';
import { UsersModule } from './Modules/Users/users.module';

@Module({
  imports: [AuthModule, ProductsModule, UsersModule],
})
export class AppModule {}
