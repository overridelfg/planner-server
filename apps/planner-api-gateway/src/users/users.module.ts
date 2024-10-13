import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '@app/common/constants/services.constants';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,
        imports: [ConfigModule.forFeature(appConfig)],
        inject: [appConfig.KEY],
        useFactory: async (config: ConfigType<typeof appConfig>) => ({
          name: USER_SERVICE,
          transport: Transport.TCP,
          options: {
            host: config.microservices.users.clintHost,
            port: config.microservices.users.port,
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
