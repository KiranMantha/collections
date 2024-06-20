import {
  CreateTodoRequest,
  FindAllTodoResponse,
  FindOneTodoRequest,
  FindOneTodoResponse,
  RemoveTodoRequest,
  RemoveTodoResponse,
  Todo,
  TodoServiceController,
  TodoServiceControllerMethods,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from '@app/generated-models';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';

@TodoServiceControllerMethods()
@Controller()
export class TodoController implements TodoServiceController {
  constructor(private readonly todoService: TodoService) {}
  findAllTodo(): Observable<FindAllTodoResponse> {
    return this.todoService.findAll();
  }
  findOneTodo(request: FindOneTodoRequest): Observable<FindOneTodoResponse> {
    return this.todoService.findOne(request.id);
  }
  createTodo(request: CreateTodoRequest): Observable<Todo> {
    return this.todoService.create(request);
  }
  updateTodo(request: UpdateTodoRequest): Observable<UpdateTodoResponse> {
    return this.todoService.update(request.id, request);
  }
  removeTodo(request: RemoveTodoRequest): Observable<RemoveTodoResponse> {
    return this.todoService.remove(request.id);
  }
}
