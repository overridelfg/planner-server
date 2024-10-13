import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/users.dto';
import {
  HABITS_ALL_METHOD,
  HABITS_CREATE_METHOD,
  HABITS_DELETE_METHOD,
  HABITS_SERVICE,
  HABITS_UPDATE_METHOD,
  HABITS_UPDATE_ORDER_METHOD,
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
    return await lastValueFrom(
      this.habitsClient.send(HABITS_ALL_METHOD, userId),
    );
  }

  async createHabit(habit: CreateHabitDto, userId: string) {
    return await lastValueFrom(
      this.habitsClient.send(HABITS_CREATE_METHOD, {
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
      this.habitsClient.send(HABITS_UPDATE_METHOD, { newData, taskId, userId }),
    );
  }

  async deleteHabit(userId: string, habitId: string) {
    return await lastValueFrom(
      this.habitsClient.send(HABITS_DELETE_METHOD, { userId, habitId }),
    );
  }

  async updateOrderHabit(
    habitData: { ids: number[]; tasksIds: string[] },
    userId: string,
  ) {
    return await lastValueFrom(
      this.habitsClient.send(HABITS_UPDATE_ORDER_METHOD, { habitData, userId }),
    );
  }
}
