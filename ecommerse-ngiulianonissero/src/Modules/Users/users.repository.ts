import { BadRequestException, Injectable } from '@nestjs/common';
import IUser from 'src/Interfaces/user.interface';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St',
      phone: '+123456789',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass456',
      address: '456 Oak Ave',
      phone: '+987654321',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'robert.brown@example.com',
      name: 'Robert Brown',
      password: 'brownie789',
      address: '789 Pine Rd',
      phone: '+112233445',
      country: 'UK',
      city: 'London',
    },
    {
      id: 4,
      email: 'lisa.johnson@example.com',
      name: 'Lisa Johnson',
      password: 'pass1234',
      address: '321 Maple Blvd',
      phone: '+554433221',
      country: 'Australia',
      city: 'Sydney',
    },
  ];

  async getUsers(): Promise<IUser[]> {
    return await this.users;
  }

  async getUserById(id: number): Promise<IUser> {
    return await this.users.find((user) => user.id === id);
  }

  async createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
    const id = this.users.length + 1;
    await this.users.push({ id, ...user });
    return { id, ...user };
  }

  async updateUser(name: string, id: number): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new BadRequestException('No se encontro un usuario con ese id');
    user.name = name;
    return user;
  }

  async deleteUser(id: number): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new BadRequestException('Usuario no encontrado');

    const newUsers = this.users.filter((user) => user.id !== id);
    this.users = newUsers;
    return user;
  }
}
