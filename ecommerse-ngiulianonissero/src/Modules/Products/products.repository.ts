import { BadRequestException, Injectable } from '@nestjs/common';
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
    {
      id: 5,
      name: '4K Monitor',
      description:
        'A 32-inch 4K monitor with ultra-slim bezels and vivid colors.',
      price: 499.99,
      stock: true,
      imgUrl: 'https://example.com/images/4k-monitor.jpg',
    },
    {
      id: 6,
      name: 'Mechanical Keyboard',
      description: 'A backlit mechanical keyboard with customizable switches.',
      price: 129.99,
      stock: true,
      imgUrl: 'https://example.com/images/mechanical-keyboard.jpg',
    },
    {
      id: 7,
      name: 'Smartwatch Series 5',
      description:
        'A stylish smartwatch with health tracking and customizable watch faces.',
      price: 349.99,
      stock: false,
      imgUrl: 'https://example.com/images/smartwatch-series5.jpg',
    },
    {
      id: 8,
      name: 'Bluetooth Speaker',
      description:
        'A portable Bluetooth speaker with rich sound and water resistance.',
      price: 89.99,
      stock: true,
      imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
    },
    {
      id: 9,
      name: 'VR Headset',
      description:
        'A next-gen VR headset with a wide field of view and smooth performance.',
      price: 399.99,
      stock: true,
      imgUrl: 'https://example.com/images/vr-headset.jpg',
    },
    {
      id: 10,
      name: 'Portable Charger',
      description:
        'A high-capacity portable charger with fast charging capabilities.',
      price: 49.99,
      stock: true,
      imgUrl: 'https://example.com/images/portable-charger.jpg',
    },
  ];

  async getProducts(page: number, limit: number): Promise<IProduct[]> {
    const skip = (page - 1) * limit;

    const productsPage = this.products.slice(skip, skip + limit);

    return productsPage;
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
    if (!product)
      throw new BadRequestException('No se encontro un producto con ese id');
    product.name = name;
    return product;
  }

  async deleteProduct(id: number): Promise<IProduct> {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new BadRequestException('Producto no encontrado');

    const newProducts = this.products.filter((product) => product.id !== id);
    this.products = newProducts;
    return product;
  }
}
