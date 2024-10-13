import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '@app/common/constants/services.constants';
import appConfig from '@app/common/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule.forFeature(appConfig),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: async (config: ConfigType<typeof appConfig>) => {
        return {
          secret: config.auth.jwtSecret,
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
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
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthAppModule {}
