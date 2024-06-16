import { INestApplication, Injectable } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';
import { TrpcTodoService } from './trpc-todo.service';

@Injectable()
export class TrpcTodoRouter {
  private todos = [{ id: 1, text: 'Sample Todo', completed: false }];
  constructor(private readonly trpcTodoSrvc: TrpcTodoService) {}

  appRouter = this.trpcTodoSrvc.router({
    list: this.trpcTodoSrvc.procedure
      .meta({ openapi: { method: 'GET', path: '/todos' } })
      .input(z.void())
      .output(
        z.array(
          z.object({
            id: z.number(),
            text: z.string(),
            completed: z.boolean(),
          }),
        ),
      )
      .query(() => this.todos),
    add: this.trpcTodoSrvc.procedure
      .meta({ openapi: { method: 'POST', path: '/todos' } })
      .input(z.object({ text: z.string() }))
      .output(
        z.object({
          id: z.number(),
          text: z.string(),
          completed: z.boolean(),
        }),
      )
      .mutation(({ input }) => {
        const newTodo = {
          id: this.todos.length + 1,
          text: input.text,
          completed: false,
        };
        this.todos.push(newTodo);
        return newTodo;
      }),
    complete: this.trpcTodoSrvc.procedure
      .meta({ openapi: { method: 'PUT', path: '/todos/{id}' } })
      .input(z.object({ id: z.number() }))
      .output(
        z.object({
          id: z.number(),
          text: z.string(),
          completed: z.boolean(),
        }),
      )
      .mutation(({ input }) => {
        const todo = this.todos.find((todo) => todo.id === input.id);
        if (todo) {
          todo.completed = true;
        }
        return todo;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}
