import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import IUser from 'src/Interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<IUser[]> {
    return await this.usersRepository.getUsers();
  }

  async getUserById(id: number): Promise<IUser> {
    return await this.usersRepository.getUserById(id);
  }

  async createUser(product: Omit<IUser, 'id'>): Promise<IUser> {
    return await this.usersRepository.createUser(product);
  }

  async updateUser(name: string, id: number): Promise<IUser> {
    return await this.usersRepository.updateUser(name, id);
  }

  async deleteUser(id: number): Promise<IUser> {
    return await this.usersRepository.deleteUser(id);
  }
}
