import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import IUser from 'src/modules/users/interface/user.interface';
import { AuthService } from '../auth/auth.service';

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

  async updateUser(property: string, value: string, id: number): Promise<void> {
    await this.usersRepository.updateUser(property, value, id);
  }

  async deleteUser(id: number): Promise<IUser> {
    return await this.usersRepository.deleteUser(id);
  }
}
