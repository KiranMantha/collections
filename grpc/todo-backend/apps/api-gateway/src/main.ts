import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const PORT = 3000;
  await app.listen(PORT);
  console.log(`api-gateway app started listening on: http://localhost:${PORT}`);
}
bootstrap();
