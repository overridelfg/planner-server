import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HabitsModule } from './habits.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    HabitsModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HABITS_HOST || '0.0.0.0',
        port: parseInt(process.env.HABITS_PORT, 10) || 3003,
      },
    },
  );
  await app.listen();
}
bootstrap();
