import { CreateTaskDto } from '@app/common/dto/tasks.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('all/:userId')
  async getTasks(@Param('userId') userId: string) {
    return await this.tasksService.getTasks(userId);
  }

  @Post('create/:userId')
  async createTask(
    @Body() dto: CreateTaskDto,
    @Param('userId') userId: string,
  ) {
    return await this.tasksService.createTask(dto, userId);
  }

  @Put('update/:userId/:taskId')
  async updateTask(
    @Body() dto: Partial<CreateTaskDto>,
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    console.log(dto);
    return await this.tasksService.updateTask(dto, taskId, userId);
  }

  @Delete('delete/:userId/:taskId')
  async deleteTask(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.tasksService.deleteTask(userId, taskId);
  }
}
