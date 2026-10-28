import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule, new ExpressAdapter());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
