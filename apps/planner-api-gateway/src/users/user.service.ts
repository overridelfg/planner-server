import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import { USER_SERVICE } from '@app/common/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_SERVICE) private usersClient: ClientProxy) {}

  create(dto: CreateUserDto) {
    return this.usersClient.send('users.create', dto);
  }

  getAll() {
    return this.usersClient.send('users.getAll', {});
  }

  getUser(userId: string) {
    return this.usersClient.send('users.getUser', userId);
  }
}
