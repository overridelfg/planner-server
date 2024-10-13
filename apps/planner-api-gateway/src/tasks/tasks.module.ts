import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASKS_SERVICE } from '@app/common/constants/services.constants';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: TASKS_SERVICE,
        imports: [ConfigModule.forFeature(appConfig)],
        inject: [appConfig.KEY],
        useFactory: async (config: ConfigType<typeof appConfig>) => ({
          name: TASKS_SERVICE,
          transport: Transport.TCP,
          options: {
            host: config.microservices.tasks.clintHost,
            port: config.microservices.tasks.port,
          },
        }),
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
