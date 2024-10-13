import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HABITS_SERVICE } from '@app/common/constants/services.constants';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: HABITS_SERVICE,
        imports: [ConfigModule.forFeature(appConfig)],
        inject: [appConfig.KEY],
        useFactory: async (config: ConfigType<typeof appConfig>) => ({
          name: HABITS_SERVICE,
          transport: Transport.TCP,
          options: {
            host: config.microservices.habits.clintHost,
            port: config.microservices.habits.port,
          },
        }),
      },
    ]),
  ],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
