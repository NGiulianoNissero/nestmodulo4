import { Test } from '@nestjs/testing';
import { FilesManagerRepository } from '../../src/modules/filesManager/filesManager.repository';
import { FilesManagerService } from '../../src/modules/filesManager/filesManager.service';
import { ProductsService } from '../../src/modules/products/products.service';
import { Readable } from 'typeorm/platform/PlatformTools.js';
import { EProduct } from '../../src/entities/products.entity';

describe('filesManagerService', () => {
  let filesManagerService: FilesManagerService;
  let mockFilesManagerRepository: Partial<FilesManagerRepository>;
  let mockProductsService: Partial<ProductsService>;

  const mockProduct: Partial<EProduct> = {
    id: '1',
    name: 'queso',
    description: 'rico quesito',
    price: 500,
    stock: 50,
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'example',
    originalname: 'example.txt',
    encoding: 'utf-8',
    mimetype: 'text/plain',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.from([]),
  };

  beforeEach(async () => {
    mockProductsService = {
      getProductById: jest
        .fn()
        .mockResolvedValue({ ...mockProduct } as EProduct),
      updateProduct: jest
        .fn()
        .mockResolvedValue({ ...mockProduct } as EProduct),
    };

    mockFilesManagerRepository = {
      uploadImage: jest.fn().mockResolvedValue({
        secure_url: 'https://example.com/image.png',
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        FilesManagerService,
        {
          provide: FilesManagerRepository,
          useValue: mockFilesManagerRepository,
        },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    filesManagerService = module.get<FilesManagerService>(FilesManagerService);
  });

  it('Servicio de archivo debe estar definido.', async () => {
    expect(filesManagerService).toBeDefined();
  });

  it('uploadImage() retorna un objeto con un mensaje y la url de la imagen.', async () => {
    const result = await filesManagerService.uploadImage('1', mockFile);

    expect(result).toEqual({
      message: 'Imagen actualizada correctamente',
      imgUrl: 'https://example.com/image.png',
    });
  });

  it('uploadImage() lanza un error captado si no se encuentra ningun producto con el uuid proporcionado', async () => {
    mockProductsService = {
      getProductById: jest.fn().mockResolvedValue(null),
    };

    try {
      const result = await filesManagerService.uploadImage('2', mockFile);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(`No existe un producto con el uuid ${'2'}`);
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });
});
