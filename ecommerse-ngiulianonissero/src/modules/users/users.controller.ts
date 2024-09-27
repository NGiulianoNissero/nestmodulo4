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
import { AuthGuard } from '../auth/guards/Auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/guards/Roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener usuarios' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getUsers(): Promise<EUser[]> {
    return await this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Obtener usuario por id' })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':uuid')
  async getUserById(
    @Param('uuid', new ParseUUIDPipe()) id: string,
  ): Promise<EUser> {
    return await this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':uuid')
  async updateUser(
    @Param('uuid', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  async deleteUser(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
