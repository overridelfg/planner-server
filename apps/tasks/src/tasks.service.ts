import {
  BadRequestException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(userId: string) {
    const tasks = await this.tasksRepository.find({ userId: userId });
    return tasks;
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    const newTask = await this.tasksRepository.create({
      ...dto,
      userId: userId,
    });
    return newTask;
  }

  async updateTask(
    dto: Partial<CreateTaskDto>,
    taskId: string,
    userId: string,
  ) {
    const newTask = await this.tasksRepository.findOneAndUpdate(
      {
        _id: taskId,
        userId: userId,
      },
      {
        ...dto,
      },
    );

    return newTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const newTask = await this.tasksRepository.findOneAndDelete({
      _id: taskId,
      userId: userId,
    });

    return newTask;
  }
}
