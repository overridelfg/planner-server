import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async createUser(@Payload() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @MessagePattern('users.getAll')
  async getAll() {
    return await this.usersService.getAll();
  }
  @MessagePattern('users.getUser')
  async getUser(@Payload() userId: string) {
    return await this.usersService.getUser(userId);
  }

  @MessagePattern('users.findEmail')
  async findEmail(@Payload() email: string) {
    return await this.usersService.findEmail(email);
  }
}
