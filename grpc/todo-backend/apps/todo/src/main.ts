import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  const PORT = 3000;
  await app.listen(PORT);
  console.log(`todo app started listening on: http://localhost:${PORT}`);
}
bootstrap();
