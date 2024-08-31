import { AUTH_SERVICE } from '@app/common/constants/services.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  validateEmail(email: string) {
    console.log(this.authClient);
    return this.authClient.send('auth.checkEmail', email);
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
