import { Test } from '@nestjs/testing';
import { CategoriesRepository } from '../../src/modules/categories/categories.repository';
import { CategoriesService } from '../../src/modules/categories/categories.service';
import { ECategory } from '../../src/entities/categories.entity';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { CreateCategoryDto } from '../../src/modules/categories/dto/createCategory.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let mockCategoriesRepository: Partial<CategoriesRepository>;
  let mockCategoriesRepositoryTypeOrm: Partial<Repository<ECategory>>;
  let mockQueryRunner: Partial<QueryRunner>;
  let mockManager: Partial<EntityManager>;

  const mockCategory: ECategory = {
    name: 'comida',
  };

  const mockCreateCategory: CreateCategoryDto = {
    category: 'comida',
  };

  beforeEach(async () => {
    mockCategoriesRepository = {
      getCategories: () => Promise.resolve([mockCategory as ECategory]),
      addCategory: jest.fn().mockResolvedValue(mockCategory as ECategory),
      findCategory: (category: string) =>
        Promise.resolve(mockCategory as ECategory),
    };

    mockCategoriesRepositoryTypeOrm = {
      findOneBy: jest.fn().mockResolvedValue(mockCategory as ECategory),
    };

    mockManager = {
      create: jest.fn().mockResolvedValue(mockCategory as ECategory),
      save: jest.fn().mockResolvedValue(mockCategory as ECategory),
    };

    mockQueryRunner = {
      manager: mockManager as EntityManager,
    };

    const module = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: mockCategoriesRepository },
        {
          provide: getRepositoryToken(ECategory),
          useValue: mockCategoriesRepositoryTypeOrm,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('Servicio de categorias debe estar definido.', async () => {
    expect(categoriesService).toBeDefined();
  });

  it('getCategories() retorna un arreglo de categorias', async () => {
    const categories = await categoriesService.getCategories();

    expect(categories).toEqual([mockCategory]);
  });

  it('addCategory() retorna la categoria creada si no existe dicha categoria', async () => {
    mockCategoriesRepositoryTypeOrm = {
      findOneBy: jest.fn().mockResolvedValue(null),
    };

    const newCategory = await categoriesService.addCategory(
      mockCreateCategory as CreateCategoryDto,
      mockQueryRunner as QueryRunner,
    );

    expect(newCategory).toEqual(mockCategory);
  });

  it('addCategory() devuelve la categoria si ya existe', async () => {
    const newCategory = await categoriesService.addCategory(
      mockCreateCategory as CreateCategoryDto,
      mockQueryRunner as QueryRunner,
    );

    expect(newCategory).toEqual(mockCategory);
  });

  it('addCategory() lanze un error captado si hubo un error al crear la categoria en la base de datos', async () => {
    mockManager = {
      create: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockResolvedValue(null),
    };

    try {
      const newCategory = await categoriesService.addCategory(
        mockCreateCategory as CreateCategoryDto,
        mockQueryRunner as QueryRunner,
      );

      expect(newCategory).toEqual(mockCategory);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error al crear la categoria.');
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('findCategory() retorna una categoria si es encontrada por el nombre', async () => {
    const category = await categoriesService.findCategory('comida');

    expect(category).toEqual(mockCategory);
  });

  it('findCategory() lanza un error captado cuando no se encuentra una categoria por le nombre', async () => {
    mockCategoriesRepositoryTypeOrm = {
      findOneBy: jest.fn().mockResolvedValue(null),
    };

    try {
      const category = await categoriesService.findCategory('comida');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(`No existe la categoria ${mockCategory}`);
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });
});
