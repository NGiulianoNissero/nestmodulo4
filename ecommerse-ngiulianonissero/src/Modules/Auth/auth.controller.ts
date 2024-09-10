import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async loginUser(@Body() email: string, @Body() password: string) {
    await this.authService.loginUser(email, password);
    return true;
  }
}
