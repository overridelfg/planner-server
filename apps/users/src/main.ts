import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  console.log(process.env.USERS_HOST);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_HOST || '0.0.0.0',
        port: parseInt(process.env.USERS_PORT, 10) || 3004,
      },
    },
  );
  await app.listen();
}
bootstrap();
