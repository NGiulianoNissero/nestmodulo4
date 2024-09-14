import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async getUsers(): Promise<EUser[]> {
    return await this.usersRepository.getUsers();
  }

  async getUserById(id: string): Promise<EUser> {
    return await this.usersRepository.getUserById(id);
  }

  async createUser(user: EUser): Promise<EUser> {
    const { email, password } = user;
    await this.authService.createCredential(email, password);
    return await this.usersRepository.createUser(user);
  }

  async updateUser(body: UpdateUserDto, id: string): Promise<EUser> {
    return await this.usersRepository.updateUser(body, id);
  }

  async deleteUser(id: string): Promise<EUser> {
    return await this.usersRepository.deleteUser(id);
  }
}
