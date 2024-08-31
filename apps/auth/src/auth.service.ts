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

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    // const user = await this.userService.findUser(email);
    // const passwordIsMatch = await argon2.verify(user.password, password);

    // if (user && passwordIsMatch) {
    //   return user;
    // }
    return 'hi';
  }

  async validateEmail(email: string) {
    try {
      try {
        const result = this.usersClient.send('users.findEmail', email);
        console.log(result);
        return result;
      } catch (err) {
        console.log('hi');
      }
    } catch (error) {
      throw error;
    }
  }

  // async login(email: string) {
  //   const user = await this.userService.findUser(email);
  //   console.log(user);
  //   return {
  //     user: {
  //       email: user.email,
  //       _id: user._id,
  //       name: user.name,
  //     },
  //     tokens: {
  //       accessToken: this.jwtService.sign({
  //         email,
  //         id: user._id,
  //         name: user.name,
  //       }),
  //     },
  //   };
  // }

  // async register(dto: CreateUserDto) {
  //   const user = await this.userService.createUser(dto);
  //   if (user) {
  //     return {
  //       user: {
  //         email: user.email,
  //         name: user.name,
  //         _id: user._id,
  //       },
  //       tokens: {
  //         accessToken: this.jwtService.sign({
  //           email: dto.email,
  //           id: user._id,
  //           name: user.name,
  //         }),
  //       },
  //     };
  //   }
  // }
}
