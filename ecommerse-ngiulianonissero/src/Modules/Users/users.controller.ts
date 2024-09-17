import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards/AuthGuard';
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
  @Get(':uuid')
  async getUserById(
    @Param('uuid', new ParseUUIDPipe()) id: string,
  ): Promise<EUser> {
    return await this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':uuid')
  async updateUser(
    @Param('uuid', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  async deleteUser(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
