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
import IUser from 'src/Interfaces/user.interface';
import UserBodyDto from 'src/Dto/userBody.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';

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
  async createUser(@Body() product: Omit<IUser, 'id'>) {
    return await this.usersService.createUser(product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UserBodyDto) {
    const { name } = body;
    return await this.usersService.updateUser(name, Number(id));
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(Number(id));
  }
}
