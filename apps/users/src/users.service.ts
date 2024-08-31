import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '@app/common/dto/users.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(dto: CreateUserDto) {
    const hashedPassword = await argon2.hash(dto.password);

    const newUserDto: CreateUserDto = { ...dto, password: hashedPassword };

    return await this.usersRepository.create(newUserDto);
  }

  async getAll() {
    return await this.usersRepository.find({});
  }

  async getUser(userId: string) {
    return await this.usersRepository.findOne({ _id: userId });
  }

  async findEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (user !== null) {
        throw new BadRequestException('User alredy exists!');
      }
    } catch (error) {
      return { message: 'success' };
    }
  }
}
