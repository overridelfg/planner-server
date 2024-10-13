import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { HabitRepository } from './habit.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from './shema/habit.schema';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService, HabitRepository],
})
export class HabitsModule {}
