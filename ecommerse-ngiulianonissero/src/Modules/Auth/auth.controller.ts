import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async loginUser(@Body() body: LoginUserDto) {
    const { email, password } = body;
    await this.authService.loginUser(email, password);
    return true;
  }
}
