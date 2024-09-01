import {
  BadRequestException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Habit } from './shema/habit.schema';
import { CreateHabitDto } from '@app/common/dto/habit.dto';
import { HabitRepository } from './habit.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: HabitRepository) {}

  async getHabits(userId: string) {
    const habits = await this.habitsRepository.find({ userId });
    const sortedHabits = habits.sort((a, b) => a.order - b.order);
    return sortedHabits;
  }

  async createHabit(dto: CreateHabitDto, userId: string) {
    const newHabit = await this.habitsRepository.create({
      ...dto,
      userId,
    });
    return newHabit;
  }

  async updateHabit(
    dto: Partial<CreateHabitDto>,
    habitId: string,
    userId: string,
  ) {
    const newHabit = await this.habitsRepository.findOneAndUpdate(
      {
        _id: habitId,
        userId: userId,
      },
      {
        ...dto,
      },
    );

    return newHabit;
  }

  async deleteHabit(habitId: string, userId: string) {
    const newHabit = await this.habitsRepository.findOneAndDelete({
      _id: habitId,
      userId: userId,
    });

    return newHabit;
  }

  async updateHabitsByOrder(
    { ids, tasksIds }: { ids: number[]; tasksIds: string[] },
    userId: string,
  ) {
    for (let i = 0; i < ids.length; i++) {
      await this.habitsRepository.findOneAndUpdate(
        {
          userId: userId,
          order: ids[i],
          _id: tasksIds[i],
        },
        {
          order: i + 1,
        },
      );
    }
  }
}
