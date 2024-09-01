import { Controller, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  ILoginResponse,
  IRegisterResponse,
} from '@app/common/types/auth.types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.checkEmail')
  async checkEmail(@Payload() email: string) {
    return await this.authService.validateEmail(email);
  }

  @MessagePattern('auth.register')
  async register(@Payload() dto: CreateUserDto) {
    let result: IRegisterResponse;
    if (dto) {
      const user = await this.authService.register(dto);
      if (user !== null) {
        result = {
          status: HttpStatus.OK,
          message: 'Successfully registered',
          errors: null,
          data: user,
        };
      } else {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad request',
          errors: null,
          data: null,
        };
      }
    }
    return result;
  }

  @MessagePattern('auth.login')
  async login(@Payload() dto: { email: string; password: string }) {
    let result: ILoginResponse;
    if (dto) {
      const user = await this.authService.login(dto);
      if (user !== null) {
        result = {
          status: HttpStatus.OK,
          message: 'Email exists',
          errors: null,
          data: user,
        };
      } else {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email doesn`t exists',
          errors: null,
          data: null,
        };
      }
    }
    return result;
  }
}
