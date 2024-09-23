import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { EUser } from '../../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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
}
