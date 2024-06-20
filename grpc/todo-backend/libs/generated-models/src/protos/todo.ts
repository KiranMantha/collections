// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.180.0
//   protoc               v5.26.1
// source: protos/todo.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

/** Empty contract */
export interface Empty {
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface FindAllTodoResponse {
  todos: Todo[];
}

export interface FindOneTodoRequest {
  id: number;
}

export interface FindOneTodoResponse {
  todo: Todo | undefined;
}

export interface UpdateTodoRequest {
  todo: Todo | undefined;
}

export interface UpdateTodoResponse {
  success: boolean;
}

export interface RemoveTodoRequest {
  id: number;
}

export interface RemoveTodoResponse {
  success: boolean;
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodoServiceClient {
  findAllTodo(request: Empty, metadata: Metadata, ...rest: any): Observable<FindAllTodoResponse>;

  findOneTodo(request: FindOneTodoRequest, metadata: Metadata, ...rest: any): Observable<FindOneTodoResponse>;

  updateTodo(request: UpdateTodoRequest, metadata: Metadata, ...rest: any): Observable<UpdateTodoResponse>;

  removeTodo(request: RemoveTodoRequest, metadata: Metadata, ...rest: any): Observable<RemoveTodoResponse>;
}

export interface TodoServiceController {
  findAllTodo(request: Empty, metadata: Metadata, ...rest: any): Observable<FindAllTodoResponse>;

  findOneTodo(request: FindOneTodoRequest, metadata: Metadata, ...rest: any): Observable<FindOneTodoResponse>;

  updateTodo(request: UpdateTodoRequest, metadata: Metadata, ...rest: any): Observable<UpdateTodoResponse>;

  removeTodo(request: RemoveTodoRequest, metadata: Metadata, ...rest: any): Observable<RemoveTodoResponse>;
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllTodo", "findOneTodo", "updateTodo", "removeTodo"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_SERVICE_NAME = "TodoService";
