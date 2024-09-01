import { AUTH_SERVICE } from '@app/common/constants/services.constants';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  ILoginResponse,
  IRegisterResponse,
} from '@app/common/types/auth.types';
import { ICheckEmailResponse } from '@app/common/types/users.types';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  async validateEmail(email: string) {
    const result: ICheckEmailResponse = await lastValueFrom(
      this.authClient.send('auth.checkEmail', email),
    );
    if (result.status === 400) {
      throw new BadRequestException('Email already exists');
    } else {
      return result.data;
    }
  }

  async register(dto: CreateUserDto) {
    const result: IRegisterResponse = await lastValueFrom(
      this.authClient.send('auth.register', dto),
    );
    if (result.status === 400) {
      throw new BadRequestException('User already exists');
    } else {
      return result.data;
    }
  }

  async login(dto: { email: string; password: string }) {
    const result: ILoginResponse = await lastValueFrom(
      this.authClient.send('auth.login', dto),
    );
    console.log(result);
    if (result.status === 400) {
      throw new BadRequestException('User does`t exists');
    } else {
      return result.data;
    }
  }
}
