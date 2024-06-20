import {
  CreateTodoRequest,
  Todo,
  UpdateTodoRequest,
} from '@app/generated-models';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class TodoService implements OnModuleInit {
  private readonly todos: Todo[] = [];
  onModuleInit() {
    // for (let i = 0; i <= 100; i++) {
    //   this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    // }
  }
  create(createTodoDto: CreateTodoRequest) {
    const todo: Todo = {
      ...createTodoDto,
      id: this.todos.length + 1,
      completed: false,
    };
    this.todos.push(todo);
    return of(todo);
  }

  findAll() {
    return of({ todos: this.todos });
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    return of({ todo });
  }

  update(id: number, updateTodoDto: UpdateTodoRequest) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return of({ success: false });
    }
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...updateTodoDto,
    };
    return of({ success: true });
  }

  remove(id: number) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return of({ success: false });
    }
    this.todos.splice(todoIndex);
    return of({ success: true });
  }
}
