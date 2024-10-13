import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from '../app.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: async (config: ConfigType<typeof appConfig>) => ({
        uri: config.database.uri,
      }),
    }),
  ],
})
export class DatabaseModule {}
