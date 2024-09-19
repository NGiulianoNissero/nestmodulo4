import { BadRequestException, Injectable } from '@nestjs/common';
import IUser from './interface/user.interface';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EUser } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(EUser) private userRepository: Repository<EUser>,
  ) {}

  async getUsers(): Promise<EUser[]> {
    return await this.userRepository.find();
  }

  // private users: IUser[] = [
  //   {
  //     id: 1,
  //     email: 'john.doe@example.com',
  //     name: 'John Doe',
  //     password: 'password123',
  //     address: '123 Main St',
  //     phone: '+123456789',
  //     country: 'USA',
  //     city: 'New York',
  //   },
  //   {
  //     id: 2,
  //     email: 'jane.smith@example.com',
  //     name: 'Jane Smith',
  //     password: 'securePass456',
  //     address: '456 Oak Ave',
  //     phone: '+987654321',
  //     country: 'Canada',
  //     city: 'Toronto',
  //   },
  //   {
  //     id: 3,
  //     email: 'robert.brown@example.com',
  //     name: 'Robert Brown',
  //     password: 'brownie789',
  //     address: '789 Pine Rd',
  //     phone: '+112233445',
  //     country: 'UK',
  //     city: 'London',
  //   },
  //   {
  //     id: 4,
  //     email: 'lisa.johnson@example.com',
  //     name: 'Lisa Johnson',
  //     password: 'pass1234',
  //     address: '321 Maple Blvd',
  //     phone: '+554433221',
  //     country: 'Australia',
  //     city: 'Sydney',
  //   },
  // ];
  async getUserById(id: string): Promise<EUser> {
    if (!isUUID(id))
      throw new BadRequestException(`El uuid ${id} no es un uuid valido.`);

    // const userFounded: EUser | null = await this.userRepository.findOne({where:{
    //   id,
    // }, relations:['orders']});

    const userFounded = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'order')
      .select(['user.id', 'user.name', 'order.id', 'order.date'])
      .where('user.id = :id', { id })
      .getOne();

    if (!userFounded)
      throw new BadRequestException(
        `No se encontro un usuario con el uuid ${id}`,
      );
    const { isAdmin, ...userWithoutRole } = userFounded;

    return userWithoutRole;
  }

  async createUser(user: EUser): Promise<EUser> {
    const newUser: EUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(body: UpdateUserDto, id: string): Promise<EUser> {
    const user: EUser | null = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('No se encontró un usuario con ese id');
    }

    const updatedUser = {
      ...user,
      ...body,
    };

    await this.userRepository.save(updatedUser);

    const { isAdmin, ...userWithoutRole } = updatedUser;

    return userWithoutRole;
  }

  async deleteUser(id: string): Promise<EUser> {
    const user: EUser | null = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new BadRequestException(`No existe un usuario con el uuid ${id}`);

    await this.userRepository.delete({ id });

    const { isAdmin, ...userWithoutRole } = user;

    return userWithoutRole;
  }

  async getUserByEmail(email: string): Promise<EUser | null> {
    const user: EUser | null = await this.userRepository.findOneBy({ email });

    return user;
  }
}
