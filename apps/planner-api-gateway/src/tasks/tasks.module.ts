import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  TASKS_SERVICE,
  USER_SERVICE,
} from '@app/common/constants/services.constants';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TASKS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'tasks',
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
