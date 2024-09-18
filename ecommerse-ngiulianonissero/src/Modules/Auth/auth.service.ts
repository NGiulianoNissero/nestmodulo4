import { BadRequestException, Injectable } from '@nestjs/common';
import { EUser } from '../../entities/users.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: EUser) {
    const dbUser: EUser | null = await this.usersService.getUserByEmail(
      user.email,
    );

    if (dbUser)
      throw new BadRequestException(
        `Ya existe un usuario con el email ${user.email}`,
      );

    const hasdedPassword = await bcrypt.hash(user.password, 10);

    if (!hasdedPassword)
      throw new BadRequestException('Error al encriptar la contraseña.');

    const newUser: EUser = await this.usersService.signUp({
      ...user,
      password: hasdedPassword,
    });

    const { password, isAdmin, ...userWithoutPasswordAndWithoutRole } = newUser;

    return userWithoutPasswordAndWithoutRole;
  }

  async signIn(email: string, password: string) {
    const dbUser: EUser | null = await this.usersService.getUserByEmail(email);

    if (!dbUser)
      throw new BadRequestException('Email o contraseña incorrectos.');

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      dbUser.password,
    );

    if (!isPasswordValid)
      throw new BadRequestException('Email o contraseña incorrectos.');

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return { message: 'Usuario logueado satisfactoriamente.', token };
  }
}
