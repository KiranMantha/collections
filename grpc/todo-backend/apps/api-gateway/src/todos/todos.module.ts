import { TODO_PACKAGE_NAME, TODO_SERVICE_NAME } from '@app/generated-models';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TODO_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: TODO_PACKAGE_NAME,
          protoPath: join(__dirname, '../todo.proto'),
        },
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
