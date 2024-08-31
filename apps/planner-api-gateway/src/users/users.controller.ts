import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':userId')
  getOne(@Param('userId') userId: string) {
    return this.usersService.getUser(userId);
  }
}
