import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { HabitRepository } from './habit.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from './shema/habit.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/tasks/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService, HabitRepository],
})
export class HabitsModule {}
