import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthAppModule } from './auth-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_HOST || '0.0.0.0',
        port: parseInt(process.env.AUTH_PORT, 10) || 3001,
      },
    },
  );
  await app.listen();
}
bootstrap();
