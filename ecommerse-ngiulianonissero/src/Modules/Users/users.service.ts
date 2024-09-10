import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import IUser from 'src/Interfaces/user.interface';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async getUsers(): Promise<IUser[]> {
    return await this.usersRepository.getUsers();
  }

  async getUserById(id: number): Promise<IUser> {
    return await this.usersRepository.getUserById(id);
  }

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    const { email, password } = user;
    await this.authService.createCredential(email, password);
    return await this.usersRepository.createUser(user);
  }

  async updateUser(name: string, id: number): Promise<IUser> {
    return await this.usersRepository.updateUser(name, id);
  }

  async deleteUser(id: number): Promise<IUser> {
    return await this.usersRepository.deleteUser(id);
  }
}
