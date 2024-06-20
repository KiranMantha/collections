import { TODO_PACKAGE_NAME } from '@app/generated-models';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoModule } from './todo.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../todo.proto'),
        package: TODO_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
  console.log('todo app is listening on GRPC');
}
bootstrap();
