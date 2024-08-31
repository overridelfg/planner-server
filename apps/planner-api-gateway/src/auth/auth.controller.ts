import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('checkEmail')
  getOne(@Body() user: { email: string }) {
    return this.authService.validateEmail(user.email);
  }
}
