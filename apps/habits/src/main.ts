import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HabitsModule } from './habits.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    HabitsModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3005,
      },
    },
  );
  await app.listen();
}
bootstrap();
