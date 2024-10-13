import {
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';
import {
  TASKS_ALL_METHOD,
  TASKS_CREATE_METHOD,
  TASKS_DELETE_METHOD,
  TASK_UPDATE_METHOD,
} from '@app/common/constants/services.constants';
import { AppExceptionFilter } from '@app/common/app.exception-filter';

@UseFilters(AppExceptionFilter)
@UsePipes(ValidationPipe)
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_ALL_METHOD)
  async getTasks(@Payload() userId: string) {
    return await this.tasksService.getTasks(userId);
  }

  @MessagePattern(TASKS_CREATE_METHOD)
  async createTask(
    @Payload() payload: { task: CreateTaskDto; userId: string },
  ) {
    return await this.tasksService.createTask(payload.task, payload.userId);
  }

  @MessagePattern(TASK_UPDATE_METHOD)
  async updateTask(
    @Payload()
    payload: {
      newData: Partial<CreateTaskDto>;
      userId: string;
      taskId: string;
    },
  ) {
    return await this.tasksService.updateTask(
      payload.newData,
      payload.taskId,
      payload.userId,
    );
  }

  @MessagePattern(TASKS_DELETE_METHOD)
  async deleteTask(payload: { userId: string; taskId: string }) {
    return await this.tasksService.deleteTask(payload.taskId, payload.userId);
  }
}
