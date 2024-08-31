import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // @UseGuards(AuthGuard('auth'))
  // async signIn(@Body() user: { email: string; password: string }) {
  //   return await this.authService.login(user.email);
  // }

  @MessagePattern('auth.checkEmail')
  async checkEmail(@Payload() email: string) {
    console.log(email);
    return await this.authService.validateEmail(email);
  }

  // @Post('register')
  // async register(@Body() dto: CreateUserDto) {
  //   return await this.authService.register(dto);
  // }
}
