import { NestFactory } from '@nestjs/core';
import { PlannerApiGatewayModule } from './planner-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(PlannerApiGatewayModule);
  await app.listen(3000);
}
bootstrap();
