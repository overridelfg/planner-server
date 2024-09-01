import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3004,
      },
    },
  );
  await app.listen();
}
bootstrap();
