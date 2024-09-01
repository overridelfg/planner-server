import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [AuthModule, UsersModule, TasksModule, HabitsModule],
})
export class PlannerApiGatewayModule {}
