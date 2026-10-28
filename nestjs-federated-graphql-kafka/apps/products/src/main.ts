import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule, new ExpressAdapter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
