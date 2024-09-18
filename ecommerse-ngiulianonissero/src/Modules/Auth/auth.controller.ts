import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { EUser } from '../../entities/users.entity';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { AuthGuard } from './guards/Auth.guard';
import { RolesGuard } from './guards/Roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    if (user.passwordConfirmation !== user.password)
      throw new BadRequestException('Las contraseñas no son iguales.');
    const userData: EUser = { ...user };
    return await this.authService.signUp(userData);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() body: LoginUserDto) {
    const { email, password } = body;
    return await this.authService.signIn(email, password);
  }

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  testRoles() {
    return 'ruta protegida';
  }
}
