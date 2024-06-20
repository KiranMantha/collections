import {
  CreateTodoRequest,
  FindOneTodoRequest,
  RemoveTodoRequest,
  TODO_SERVICE_NAME,
  TodoServiceClient,
  UpdateTodoRequest,
} from '@app/generated-models';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TodosService implements OnModuleInit {
  private todoService: TodoServiceClient;

  constructor(@Inject(TODO_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.todoService =
      this.client.getService<TodoServiceClient>(TODO_SERVICE_NAME);
  }

  create(request: CreateTodoRequest) {
    return this.todoService.createTodo(request);
  }

  findAll() {
    return this.todoService.findAllTodo({});
  }

  findOne(request: FindOneTodoRequest) {
    return this.todoService.findOneTodo(request);
  }

  update(request: UpdateTodoRequest) {
    return this.todoService.updateTodo(request);
  }

  remove(request: RemoveTodoRequest) {
    return this.todoService.removeTodo(request);
  }
}
