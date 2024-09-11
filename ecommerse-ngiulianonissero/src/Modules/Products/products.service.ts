import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import IProduct from 'src/modules/products/interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number): Promise<IProduct[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: number): Promise<IProduct> {
    return await this.productsRepository.getProductById(id);
  }

  async createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    return await this.productsRepository.createProduct(product);
  }

  async updateProduct(
    property: string,
    value: string | number | boolean,
    id: number,
  ): Promise<void> {
    await this.productsRepository.updateProduct(property, value, id);
  }

  async deleteProduct(id: number): Promise<IProduct> {
    return await this.productsRepository.deleteProduct(id);
  }
}
