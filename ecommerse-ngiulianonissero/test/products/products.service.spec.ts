import { DataSource, QueryRunner } from 'typeorm';
import { CategoriesService } from '../../src/modules/categories/categories.service';
import { ProductsRepository } from '../../src/modules/products/products.repository';
import { ProductsService } from '../../src/modules/products/products.service';
import { EProduct } from '../../src/entities/products.entity';
import { ECategory } from '../../src/entities/categories.entity';
import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateProductDto } from '../../src/modules/products/dto/createProduct.dto';
import { UpdateProductDto } from '../../src/modules/products/dto/updateProduct.dto';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let mockProductsRepository: Partial<ProductsRepository>;
  let mockCategoriesService: Partial<CategoriesService>;
  let mockDataSource: Partial<DataSource>;
  let mockQueryRunner: Partial<QueryRunner>;

  const mockProduct: EProduct = {
    id: 'product-1',
    name: 'producto',
    description: 'producto de prueba',
    price: 100,
    stock: 20,
    imgUrl: 'http://example.com/image.jpg',
    category: {} as ECategory,
  };

  const mockCreateProduct: CreateProductDto = {
    name: 'queso',
    description: 'rico quesito',
    price: 200,
    stock: 20,
    category: 'comida',
  };

  const mockUpdateProduct: UpdateProductDto = {
    name: 'pan',
    description: 'rico pansito',
    price: 150,
  };

  const mockCategory: ECategory = {
    id: 'category-1',
    name: 'categoria',
  };

  beforeEach(async () => {
    mockProductsRepository = {
      getProducts: jest.fn().mockResolvedValue([mockProduct]),
      getProductById: jest.fn().mockResolvedValue(mockProduct),
      createProduct: jest.fn().mockResolvedValue(mockProduct),
      updateProduct: jest.fn().mockResolvedValue(mockProduct),
      deleteProduct: jest.fn().mockResolvedValue(true),
    };

    mockCategoriesService = {
      addCategory: jest.fn().mockResolvedValue(mockCategory),
    };

    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    };

    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockProductsRepository },
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('El servicio de productos debe estar definido', async () => {
    expect(productsService).toBeDefined();
  });

  it('getProducts() debe retornar un arreglo de productos.', async () => {
    const result = await productsService.getProducts(1, 5);

    expect(result).toEqual([mockProduct]);
  });

  it('getProductById() debe retornar un producto por el uuid.', async () => {
    const result = await productsService.getProductById('product-1');

    expect(result).toEqual(mockProduct);
  });

  it('getProductById() debe lanzar una excepcion si no encuentra el producto por el uuid.', async () => {
    mockProductsRepository.getProductById = jest
      .fn()
      .mockRejectedValue(
        new BadRequestException(`El uuid ${'product-2'} no es un uuid valido.`),
      );

    try {
      const result = await productsService.getProductById('product-1');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          `El uuid ${'product-2'} no es un uuid valido.`,
        );
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('createProduct() debe retornar el producto creado correctamente.', async () => {
    const result = await productsService.createProduct(mockCreateProduct);

    expect(result).toEqual(mockProduct);
  });

  it('createProduct() debe lanzar una excepcion si no se pudo crear el producto.', async () => {
    mockProductsRepository.createProduct = jest
      .fn()
      .mockRejectedValue(new BadRequestException('Error al crear el producto'));

    try {
      const result = await productsService.createProduct(mockCreateProduct);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error al crear el producto');
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });
});
