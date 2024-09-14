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
import { AuthGuard } from '../../guards/AuthGuard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(): Promise<EUser[]> {
    return await this.usersService.getUsers();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<EUser> {
    return await this.usersService.getUserById(id);
  }

  @HttpCode(201)
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const userData: EUser = { ...user };
    return await this.usersService.createUser(userData);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':uuid')
  async updateUser(@Param('uuid') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.updateUser(body, id);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  async deleteUser(@Param('uuid') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
