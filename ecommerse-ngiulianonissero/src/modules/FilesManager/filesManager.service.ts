import { BadRequestException, Injectable } from '@nestjs/common';
import { FilesManagerRepository } from './filesManager.repository';
import { ProductsService } from '../products/products.service';

@Injectable()
export class FilesManagerService {
  constructor(
    private filesManagerRepository: FilesManagerRepository,
    private productsService: ProductsService,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    const imageResult = await this.filesManagerRepository.uploadImage(file);

    const product = await this.productsService.getProductById(id);

    if (!product)
      throw new BadRequestException(`No existe un producto con el uuid ${id}`);

    const newImage = {
      imgUrl: imageResult.secure_url,
    };

    await this.productsService.updateProduct(newImage, id);

    return {
      message: 'Imagen actualizada correctamente',
      imgUrl: imageResult.secure_url,
    };
  }
}
