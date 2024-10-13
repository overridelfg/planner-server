import {
  Controller,
  Get,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from '@app/common/dto/habit.dto';
import {
  HABITS_ALL_METHOD,
  HABITS_CREATE_METHOD,
  HABITS_DELETE_METHOD,
  HABITS_UPDATE_METHOD,
  HABITS_UPDATE_ORDER_METHOD,
} from '@app/common/constants/services.constants';
import { AppExceptionFilter } from '@app/common/app.exception-filter';

@UseFilters(AppExceptionFilter)
@UsePipes(ValidationPipe)
@Controller()
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @MessagePattern(HABITS_ALL_METHOD)
  async getHabits(@Payload() userId: string) {
    return await this.habitsService.getHabits(userId);
  }

  @MessagePattern(HABITS_CREATE_METHOD)
  async createHabit(
    @Payload() payload: { habit: CreateHabitDto; userId: string },
  ) {
    return await this.habitsService.createHabit(payload.habit, payload.userId);
  }

  @MessagePattern(HABITS_UPDATE_METHOD)
  async updateHabit(
    @Payload()
    payload: {
      newData: Partial<CreateHabitDto>;
      userId: string;
      taskId: string;
    },
  ) {
    return await this.habitsService.updateHabit(
      payload.newData,
      payload.taskId,
      payload.userId,
    );
  }

  @MessagePattern(HABITS_DELETE_METHOD)
  async deleteHabit(payload: { userId: string; habitId: string }) {
    console.log(payload);
    return await this.habitsService.deleteHabit(
      payload.habitId,
      payload.userId,
    );
  }

  @MessagePattern(HABITS_UPDATE_ORDER_METHOD)
  async updateHabitsOrder(payload: {
    habitData: { ids: number[]; tasksIds: string[] };
    userId: string;
  }) {
    return await this.habitsService.updateHabitsByOrder(
      payload.habitData,
      payload.userId,
    );
  }
}
