import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.all')
  async getTasks(@Payload() userId: string) {
    return await this.tasksService.getTasks(userId);
  }

  @MessagePattern('tasks.create')
  async createTask(
    @Payload() payload: { task: CreateTaskDto; userId: string },
  ) {
    return await this.tasksService.createTask(payload.task, payload.userId);
  }

  @MessagePattern('tasks.update')
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

  @MessagePattern('tasks.delete')
  async deleteTask(payload: { userId: string; taskId: string }) {
    return await this.tasksService.deleteTask(payload.taskId, payload.userId);
  }
}
