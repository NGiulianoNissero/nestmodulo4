import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import IUser from 'src/modules/users/interface/user.interface';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    return await this.usersService.getUserById(Number(id));
  }

  @HttpCode(201)
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.usersService.createUser(user);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const { name, email, password, address, phone, country, city } = body;
    if (name) await this.usersService.updateUser('name', name, Number(id));

    if (email) await this.usersService.updateUser('email', email, Number(id));

    if (password)
      await this.usersService.updateUser('password', password, Number(id));

    if (address) await this.usersService.updateUser('phone', phone, Number(id));

    if (country)
      await this.usersService.updateUser('country', country, Number(id));

    if (city) await this.usersService.updateUser('city', city, Number(id));

    return await this.usersService.getUserById(Number(id));
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(Number(id));
  }
}
