import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@app/common/dto/users.dto';
import { USER_SERVICE } from '@app/common/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ILoginResponse } from '@app/common/types/auth.types';
import {
  ICheckEmailResponse,
  IFindUserResponse,
} from '@app/common/types/users.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await lastValueFrom(
      this.usersClient.send('users.findUser', email),
    );
    const passwordIsMatch = await argon2.verify(user.password, password);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('User or password are incorrect');
  }

  async validateEmail(email: string) {
    const result = await lastValueFrom(
      this.usersClient.send('users.findEmail', email),
    );
    return result;
  }

  async login(dto: { email: string; password: string }) {
    const result: IFindUserResponse = await lastValueFrom(
      this.usersClient.send('users.findUser', dto.email),
    );

    const passwordIsMatch = await argon2.verify(
      result.data.password,
      dto.password,
    );

    if (result.status === 400) {
      return null;
    }

    if (result.data && passwordIsMatch) {
      return {
        user: {
          email: result.data.email,
          _id: result.data._id,
          name: result.data.name,
        },
        tokens: {
          accessToken: this.jwtService.sign({
            email: result.data.email,
            id: result.data._id,
            name: result.data.name,
          }),
        },
      };
    } else {
      return null;
    }
  }

  async register(dto: CreateUserDto) {
    const result: IFindUserResponse = await lastValueFrom(
      this.usersClient.send('users.create', dto),
    );
    if (result.status === 400) {
      return null;
    } else {
      return {
        user: {
          email: result.data.email,
          _id: result.data._id,
          name: result.data.name,
        },
        tokens: {
          accessToken: this.jwtService.sign({
            email: result.data.email,
            id: result.data._id,
            name: result.data.name,
          }),
        },
      };
    }
  }
}
