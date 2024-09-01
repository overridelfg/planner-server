import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HABITS_SERVICE,
  TASKS_SERVICE,
  USER_SERVICE,
} from '@app/common/constants/services.constants';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: HABITS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
