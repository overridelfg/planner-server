import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  USERS_CREATE_METHOD,
  USERS_GET_ALL_METHOD,
  USERS_GET_USER_METHOD,
  USER_SERVICE,
} from '@app/common/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_SERVICE) private usersClient: ClientProxy) {}

  create(dto: CreateUserDto) {
    return this.usersClient.send(USERS_CREATE_METHOD, dto);
  }

  getAll() {
    return this.usersClient.send(USERS_GET_ALL_METHOD, {});
  }

  getUser(userId: string) {
    return this.usersClient.send(USERS_GET_USER_METHOD, userId);
  }
}
