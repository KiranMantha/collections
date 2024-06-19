import { INestApplication, Injectable } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';
import { TrpcTodoService } from './trpc-todo.service';

@Injectable()
export class TrpcTodoRouter {
  private todos = [{ id: 1, text: 'Sample Todo', completed: false }];
  constructor(private readonly trpcTodoSrvc: TrpcTodoService) {}

  /**
   * NOTE::
   * endpoint or path in meta should match procedure name.
   * if the procedures are nested then the path should follow the nested structure. EG: {todo: {add: procedure}} => path is todo.add
   * custom endpoints will return query/mutation not found error.
   * Only HttpVerb.GET and HttpVerb.POST are allowed
   */
  todoRoutes = {
    list: this.trpcTodoSrvc.procedure
      .meta({
        openapi: { method: 'GET', path: '/todo.list', tags: ['Todo'] },
      })
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
      .meta({
        openapi: { method: 'POST', path: '/todo.add', tags: ['Todo'] },
      })
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
      .meta({
        openapi: {
          method: 'POST',
          path: '/todo.complete',
          tags: ['Todo'],
        },
      })
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
        if (!todo) {
          return {};
        }
        todo.completed = true;
        return todo;
      }),
  };

  appRouter = this.trpcTodoSrvc.router({
    todo: this.todoRoutes,
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
