import { Server, handleUnaryCall } from "@grpc/grpc-js";
import {
  CreateTodoRequest,
  Empty,
  FindAllTodoResponse,
  FindOneTodoRequest,
  FindOneTodoResponse,
  RemoveTodoRequest,
  RemoveTodoResponse,
  Todo,
  TodoServiceServer,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from "../generated-models/todo/todo";
import { loadPackageDefinition } from "../utils";

const todos: Todo[] = [];

class TodoService implements TodoServiceServer {
  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
  findAllTodo: handleUnaryCall<Empty, FindAllTodoResponse> = (
    call,
    callback
  ) => {
    callback(null, { todos });
  };
  findOneTodo: handleUnaryCall<FindOneTodoRequest, FindOneTodoResponse> = (
    call,
    callback
  ) => {
    const todo = todos.find((todo) => todo.id === call.request.id);
    callback(null, { todo });
  };
  createTodo: handleUnaryCall<CreateTodoRequest, Todo> = (call, callback) => {
    const todo: Todo = {
      id: todos.length + 1,
      text: call.request.text,
      completed: false,
    };
    todos.push(todo);
    callback(null, todo);
  };
  updateTodo: handleUnaryCall<UpdateTodoRequest, UpdateTodoResponse> = (
    call,
    callback
  ) => {
    const todoIndex = todos.findIndex((todo) => todo.id === call.request.id);
    if (todoIndex === -1) {
      callback(null, { success: false });
    }
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...call.request,
    };
    callback(null, { success: true });
  };
  removeTodo: handleUnaryCall<RemoveTodoRequest, RemoveTodoResponse> = (
    call,
    callback
  ) => {
    const todoIndex = todos.findIndex((todo) => todo.id === call.request.id);
    if (todoIndex === -1) {
      callback(null, { success: false });
    }
    todos.splice(todoIndex);
    callback(null, { success: true });
  };
}

export function loadTodoService(server: Server) {
  const todoProto: any = loadPackageDefinition("todo", server).todo;
  server.addService(todoProto.TodoService.service, new TodoService());
}
