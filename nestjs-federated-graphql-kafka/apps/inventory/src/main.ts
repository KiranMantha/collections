import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule, new ExpressAdapter());
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
