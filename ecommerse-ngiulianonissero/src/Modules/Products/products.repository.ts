import { Injectable } from '@nestjs/common';
import IProduct from 'src/Interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Laptop Pro',
      description:
        'A high-performance laptop with a sleek design and powerful features.',
      price: 1299.99,
      stock: true,
      imgUrl: 'https://example.com/images/laptop-pro.jpg',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description:
        'Noise-cancelling headphones with excellent sound quality and long battery life.',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/images/wireless-headphones.jpg',
    },
    {
      id: 3,
      name: 'Smartphone XL',
      description:
        'A smartphone with a large display, advanced camera, and fast performance.',
      price: 899.99,
      stock: false,
      imgUrl: 'https://example.com/images/smartphone-xl.jpg',
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description:
        'An ergonomic gaming mouse with customizable buttons and RGB lighting.',
      price: 59.99,
      stock: true,
      imgUrl: 'https://example.com/images/gaming-mouse.jpg',
    },
  ];

  async getProducts(): Promise<IProduct[]> {
    return await this.products;
  }

  async getProductById(id: number): Promise<IProduct> {
    return await this.products.find((product) => product.id === id);
  }

  async createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    const id = this.products.length + 1;
    await this.products.push({ id, ...product });
    return { id, ...product };
  }

  async updateProduct(name: string, id: number): Promise<IProduct> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error('No se encontro un producto con ese id');
    product.name = name;
    return product;
  }

  async deleteProduct(id: number): Promise<IProduct> {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new Error('Producto no encontrado');

    const newProducts = this.products.filter((product) => product.id !== id);
    this.products = newProducts;
    return product;
  }
}
