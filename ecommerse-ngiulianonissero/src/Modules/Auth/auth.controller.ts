import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { EUser } from '../../entities/users.entity';
import { AuthGuard } from '../../guards/AuthGuard';
import { Request } from 'express';

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

  @Post('signin')
  async signIn(@Body() body: LoginUserDto) {
    const { email, password } = body;
    return await this.authService.signIn(email, password);
  }
}
