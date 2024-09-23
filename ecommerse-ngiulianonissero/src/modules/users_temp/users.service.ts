import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<EUser[]> {
    return await this.usersRepository.getUsers();
  }

  async getUserById(id: string): Promise<EUser> {
    return await this.usersRepository.getUserById(id);
  }

  async signUp(user: EUser): Promise<EUser> {
    return await this.usersRepository.createUser(user);
  }

  async updateUser(body: UpdateUserDto, id: string): Promise<EUser> {
    return await this.usersRepository.updateUser(body, id);
  }

  async deleteUser(id: string): Promise<EUser> {
    return await this.usersRepository.deleteUser(id);
  }

  async getUserByEmail(email: string): Promise<EUser | null> {
    return await this.usersRepository.getUserByEmail(email);
  }
}
