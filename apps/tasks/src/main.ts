import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.TASKS_HOST || '0.0.0.0',
        port: parseInt(process.env.TASKS_PORT, 10) || 3002,
      },
    },
  );
  await app.listen();
}
bootstrap();
