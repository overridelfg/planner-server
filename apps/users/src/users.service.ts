import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '@app/common/dto/users.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(dto: CreateUserDto) {
    const isUserExists = await this.usersRepository.findOne({
      email: dto.email,
    });
    if (isUserExists) {
      return null;
    }

    const hashedPassword = await argon2.hash(dto.password);

    const newUserDto: CreateUserDto = { ...dto, password: hashedPassword };

    return await this.usersRepository.create(newUserDto);
  }

  async getAll() {
    const users = await this.usersRepository.find({});
    if (users === null) {
      return null;
    } else {
      return users;
    }
  }

  async getUser(userId: string) {
    const user = await this.usersRepository.findOne({ _id: userId });
    if (user === null) {
      return null;
    } else {
      return user;
    }
  }

  async findEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user === null) {
      return null;
    } else {
      return user;
    }
  }
}
