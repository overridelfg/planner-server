import { Controller, Get, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  ICheckEmailResponse,
  ICreateUsersResponse,
  IFindUserResponse,
  IGetAllUsersResponse,
  IGetUserResponse,
} from '@app/common/types/users.types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async createUser(@Payload() dto: CreateUserDto) {
    let result: ICreateUsersResponse;
    const user = await this.usersService.create(dto);
    if (user !== null) {
      result = {
        status: HttpStatus.OK,
        message: 'User created successfully',
        errors: null,
        data: user,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
        errors: null,
        data: user,
      };
    }

    return result;
  }

  @MessagePattern('users.getAll')
  async getAll() {
    return await this.usersService.getAll();
  }
  @MessagePattern('users.getUser')
  async getUser(@Payload() userId: string) {
    let result: IGetUserResponse;
    const user = await this.usersService.getUser(userId);
    if (user === null) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'User does`t exists',
        errors: null,
        data: null,
      };
    } else {
      result = {
        status: HttpStatus.OK,
        message: 'User exists',
        errors: null,
        data: user,
      };
    }
  }

  @MessagePattern('users.findEmail')
  async findEmail(@Payload() email: string) {
    let result: ICheckEmailResponse;
    if (email) {
      const isEmailExists = await this.usersService.findEmail(email);
      if (isEmailExists !== null) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email already exists',
          errors: null,
          data: null,
        };
      } else {
        result = {
          status: HttpStatus.OK,
          message: 'Email doesn`t exists',
          errors: null,
          data: {
            message: 'success',
          },
        };
      }
    }
    return result;
  }

  @MessagePattern('users.findUser')
  async findUser(@Payload() email: string) {
    let result: IFindUserResponse;
    if (email) {
      const user = await this.usersService.findEmail(email);
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
