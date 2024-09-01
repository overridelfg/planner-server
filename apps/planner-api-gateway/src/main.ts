import { NestFactory } from '@nestjs/core';
import { PlannerApiGatewayModule } from './planner-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PlannerApiGatewayModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
