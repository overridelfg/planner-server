import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  HABITS_SERVICE,
  TASKS_SERVICE,
  USER_SERVICE,
} from '@app/common/constants/services.constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateHabitDto } from '@app/common/dto/habit.dto';

@Injectable()
export class HabitsService {
  constructor(@Inject(HABITS_SERVICE) private habitsClient: ClientProxy) {}

  async getHabits(userId: string) {
    return await lastValueFrom(this.habitsClient.send('habits.all', userId));
  }

  async createHabit(habit: CreateHabitDto, userId: string) {
    return await lastValueFrom(
      this.habitsClient.send('habits.create', {
        habit: habit,
        userId: userId,
      }),
    );
  }

  async updateHabit(
    newData: Partial<CreateHabitDto>,
    taskId: string,
    userId: string,
  ) {
    return await lastValueFrom(
      this.habitsClient.send('habits.update', { newData, taskId, userId }),
    );
  }

  async deleteHabit(userId: string, habitId: string) {
    return await lastValueFrom(
      this.habitsClient.send('habits.delete', { userId, habitId }),
    );
  }

  async updateOrderHabit(
    habitData: { ids: number[]; tasksIds: string[] },
    userId: string,
  ) {
    return await lastValueFrom(
      this.habitsClient.send('habits.updateOrder', { habitData, userId }),
    );
  }
}
