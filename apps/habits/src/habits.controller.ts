import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from '@app/common/dto/tasks.dto';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from '@app/common/dto/habit.dto';

@Controller()
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @MessagePattern('habits.all')
  async getHabits(@Payload() userId: string) {
    return await this.habitsService.getHabits(userId);
  }

  @MessagePattern('habits.create')
  async createHabit(
    @Payload() payload: { habit: CreateHabitDto; userId: string },
  ) {
    return await this.habitsService.createHabit(payload.habit, payload.userId);
  }

  @MessagePattern('habits.update')
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

  @MessagePattern('habits.delete')
  async deleteHabit(payload: { userId: string; habitId: string }) {
    console.log(payload);
    return await this.habitsService.deleteHabit(
      payload.habitId,
      payload.userId,
    );
  }

  @MessagePattern('habits.updateOrder')
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
