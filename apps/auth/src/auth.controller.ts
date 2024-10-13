import {
  Controller,
  HttpStatus,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, LoginDto } from '@app/common/dto/users.dto';
import {
  ILoginResponse,
  IRegisterResponse,
} from '@app/common/types/auth.types';
import {
  AUTH_CHECK_EMAIL_METHOD,
  AUTH_LOGIN_METHOD,
  AUTH_REGISTER_METHOD,
} from '@app/common/constants/services.constants';
import { AppExceptionFilter } from '@app/common/app.exception-filter';

@UseFilters(AppExceptionFilter)
@UsePipes(ValidationPipe)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_CHECK_EMAIL_METHOD)
  async checkEmail(@Payload() email: string) {
    return await this.authService.validateEmail(email);
  }

  @MessagePattern(AUTH_REGISTER_METHOD)
  async register(@Payload() dto: CreateUserDto) {
    let result: IRegisterResponse;

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

    return result;
  }

  @MessagePattern(AUTH_LOGIN_METHOD)
  async login(@Payload() dto: LoginDto) {
    let result: ILoginResponse;

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

    return result;
  }
}
