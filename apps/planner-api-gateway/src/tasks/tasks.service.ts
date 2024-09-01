import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  TASKS_SERVICE,
  USER_SERVICE,
} from '@app/common/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(@Inject(TASKS_SERVICE) private tasksClient: ClientProxy) {}

  async getTasks(userId: string) {
    return await lastValueFrom(this.tasksClient.send('tasks.all', userId));
  }

  async createTask(task: CreateTaskDto, userId: string) {
    return await lastValueFrom(
      this.tasksClient.send('tasks.create', {
        task: task,
        userId: userId,
      }),
    );
  }

  async updateTask(
    newData: Partial<CreateTaskDto>,
    taskId: string,
    userId: string,
  ) {
    return await lastValueFrom(
      this.tasksClient.send('tasks.update', { newData, taskId, userId }),
    );
  }

  async deleteTask(userId: string, taskId: string) {
    return await lastValueFrom(
      this.tasksClient.send('tasks.delete', { userId, taskId }),
    );
  }
}
