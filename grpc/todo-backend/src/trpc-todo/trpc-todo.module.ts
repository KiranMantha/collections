import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrpcTodoRouter } from './trpc-todo.router';
import { TrpcTodoService } from './trpc-todo.service';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [],
  providers: [TrpcTodoService, TrpcTodoRouter, ConfigService],
})
export class TrpcTodoModule {}
