import { Module } from '@nestjs/common';
import { FilesManagerController } from './filesManager.controller';
import { FilesManagerService } from './filesManager.service';
import { FilesManagerRepository } from './filesManager.repository';
import { CloudinaryConfig } from '../../config/cloudinary.config';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesManagerController],
  providers: [FilesManagerService, FilesManagerRepository, CloudinaryConfig],
})
export class FilesManagerModule {}
