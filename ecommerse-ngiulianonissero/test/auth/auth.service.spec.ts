import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../src/modules/users/users.service';
import { EUser } from '../../src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('testeando auth service', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;

  const mockUser: EUser = {
    name: 'giuliano',
    email: 'peafloraf@yahoo.com',
    password: 'Admin123!',
    phone: 432135342,
    address: '123 calle queso',
  };

  beforeEach(async () => {
    mockUsersService = {
      getUserByEmail: (email: string) => Promise.resolve(null),
      signUp: (user: EUser): Promise<EUser> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '123e4567-e89b-12d3-a456-426614174000',
        }),
    };

    const mockJwtService = {
      sign: (payload: any) => jwt.sign(payload, 'testSecret'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('crear una instancia de auth service.', async () => {
    expect(authService).toBeDefined();
  });

  it('signUp() tira error si ya esta registrado el email.', async () => {
    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as EUser);

    try {
      await authService.signUp(mockUser as EUser);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          `Ya existe un usuario con el email ${mockUser.email}`,
        );
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('signUp() verifico que no esten las propiedades password e isAdmin en el usuario que devuelve la funcion', async () => {
    mockUsersService.getUserByEmail = (email: string) => Promise.resolve(null);

    const user = await authService.signUp(mockUser as EUser);

    expect(user).not.toHaveProperty('password');
    expect(user).not.toHaveProperty('isAdmin');
  });

  it('signIn() tira error si el email es invalido.', async () => {
    try {
      await authService.signIn('INVALID EMAIL', mockUser.password);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Email o contraseña incorrectos.');
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('signIn() tira error si la contraseña es invalida.', async () => {
    try {
      await authService.signIn(mockUser.email, 'INVALID PASSWORD');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Email o contraseña incorrectos.');
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('signIn() verifico que la funcion retorne un mensaje y el JWT token', async () => {
    const mockUserVariant = {
      ...mockUser,
      password: await bcrypt.hash(mockUser.password, 10),
    };

    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUserVariant as EUser);

    const response = await authService.signIn(
      mockUser.email,
      mockUser.password,
    );

    expect(response).toBeDefined();

    expect(response.message).toBeDefined();
    expect(response.message).toBe('Usuario logueado satisfactoriamente.');

    expect(response.token).toBeDefined();
    expect(typeof response.token).toBe('string');
  });
});
