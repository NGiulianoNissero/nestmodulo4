import { Injectable } from '@nestjs/common';

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

  async getProducts() {
    return this.products;
  }
}
