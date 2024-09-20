import { Test } from '@nestjs/testing';
import { EUser } from '../../src/entities/users.entity';
import { UsersRepository } from '../../src/modules/users/users.repository';
import { UsersService } from '../../src/modules/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from '../../src/modules/users/dto/updateUser.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUsersRepository: Partial<UsersRepository>;

  const mockUser: EUser = {
    id: 'user-1',
    name: 'giuliano',
    email: 'exmaple@gmail.com',
    password: 'Admin123!',
    phone: 5324234342,
    address: '123 calle queso',
  };

  const mockUpdateUser: UpdateUserDto = {
    name: 'roberto',
  };

  beforeEach(async () => {
    mockUsersRepository = {
      getUsers: jest.fn().mockResolvedValue([mockUser]),
      getUserById: jest.fn().mockResolvedValue(mockUser),
      createUser: jest.fn().mockResolvedValue(mockUser),
      updateUser: jest.fn().mockResolvedValue(mockUser),
      deleteUser: jest.fn().mockResolvedValue(mockUser),
      getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('El servicio de usuarios debe estar definido.', async () => {
    expect(usersService).toBeDefined();
  });

  it('getUsers() debe retornar un arreglo de usuarios', async () => {
    const result = await usersService.getUsers();

    expect(result).toEqual([mockUser]);
  });

  it('getUserById() debe retornar un usuario por el uuid.', async () => {
    const result = await usersService.getUserById('user-1');

    expect(result).toEqual(mockUser);
  });

  it('getUserById() debe lanzar una excepcion si no encuentra el usuario por el uuid.', async () => {
    mockUsersRepository.getUserById = jest
      .fn()
      .mockRejectedValue(
        new BadRequestException(`El uuid ${'user-2'} no es un uuid valido.`),
      );

    try {
      const result = await usersService.getUserById('user-2');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(`El uuid ${'user-2'} no es un uuid valido.`);
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('signUp() debe retornar el usuario creado.', async () => {
    const result = await usersService.signUp(mockUser);

    expect(result).toEqual(mockUser);
  });

  it('updateUser() debe actualizar un usuario y devolverlo.', async () => {
    const result = await usersService.updateUser(mockUpdateUser, 'user-1');

    expect(result).toEqual(mockUser);
  });

  it('updateUser() debe lanzar una excepcion si no se encuentra el usuario por el uuid.', async () => {
    mockUsersRepository.updateUser = jest
      .fn()
      .mockRejectedValue(
        new BadRequestException(
          `No se encontro un usuario con el uuid ${'user-2'}`,
        ),
      );

    try {
      const result = await usersService.updateUser(mockUpdateUser, 'user-2');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          `No se encontro un usuario con el uuid ${'user-2'}`,
        );
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('deleteUser() debe eliminar y retornar el usuario eliminado', async () => {
    const result = await usersService.deleteUser('user-1');
    expect(result).toEqual(mockUser);
  });

  it('deleteUser() debe lanzar BadRequestException si no se encuentra el usuario', async () => {
    mockUsersRepository.deleteUser = jest
      .fn()
      .mockRejectedValue(
        new BadRequestException(`No existe un usuario con el uuid ${'user-2'}`),
      );

    try {
      const result = await usersService.deleteUser('user-2');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          `No existe un usuario con el uuid ${'user-2'}`,
        );
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('getUserByEmail() debe retornar un usuario si el email es válido', async () => {
    const result = await usersService.getUserByEmail('john@gmail.com');
    expect(result).toEqual(mockUser);
  });

  it('getUserByEmail() debe retornar null si no existe el usuario con ese email', async () => {
    mockUsersRepository.getUserByEmail = jest.fn().mockResolvedValue(null);

    const result = await usersService.getUserByEmail('noexiste@gmail.com');

    expect(result).toBeNull();
  });
});
