import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constants/services.constants';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule.forFeature(appConfig)],
        inject: [appConfig.KEY],
        useFactory: async (config: ConfigType<typeof appConfig>) => ({
          name: AUTH_SERVICE,
          transport: Transport.TCP,
          options: {
            host: config.microservices.auth.clintHost,
            port: config.microservices.auth.port,
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
