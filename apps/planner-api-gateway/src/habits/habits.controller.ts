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
import { HabitsService } from './habits.service';
import { CreateHabitDto } from '@app/common/dto/habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get('all/:userId')
  async getTasks(@Param('userId') userId: string) {
    return await this.habitsService.getHabits(userId);
  }

  @Post('create/:userId')
  async createTask(
    @Body() dto: CreateHabitDto,
    @Param('userId') userId: string,
  ) {
    return await this.habitsService.createHabit(dto, userId);
  }

  @Put('update/:userId/:habitId')
  async updateTask(
    @Body() dto: Partial<CreateHabitDto>,
    @Param('userId') userId: string,
    @Param('habitId') habitId: string,
  ) {
    return await this.habitsService.updateHabit(dto, habitId, userId);
  }

  @Delete('delete/:userId/:habitId')
  async deleteTask(
    @Param('userId') userId: string,
    @Param('habitId') habitId: string,
  ) {
    return await this.habitsService.deleteHabit(userId, habitId);
  }

  @Put('updateOrder/:userId')
  async updateOrder(
    @Body() { ids, tasksIds }: { ids: number[]; tasksIds: string[] },
    @Param('userId') userId: string,
  ) {
    return await this.habitsService.updateOrderHabit({ ids, tasksIds }, userId);
  }
}
