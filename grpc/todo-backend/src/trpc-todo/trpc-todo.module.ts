import { Module } from '@nestjs/common';
import { TrpcTodoRouter } from './trpc-todo.router';
import { TrpcTodoService } from './trpc-todo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TrpcTodoService, TrpcTodoRouter],
})
export class TrpcTodoModule {}
