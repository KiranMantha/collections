// src/main.ts
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { generateOpenApiDocument } from 'trpc-openapi';
import { TrpcTodoModule, TrpcTodoRouter } from './trpc-todo';

async function bootstrap() {
  const app = await NestFactory.create(TrpcTodoModule);
  app.enableCors();
  const trpc = app.get(TrpcTodoRouter);
  trpc.applyMiddleware(app);

  // Generate OpenAPI document
  // trpc-openapi-issue: https://github.com/jlalmes/trpc-openapi/issues/431
  const openApiDocument = generateOpenApiDocument(trpc.appRouter, {
    title: 'Todo App API',
    description: 'API documentation for the Todo App',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/trpc',
  });

  // Save OpenAPI document to a file
  fs.writeFileSync('./openapi.json', JSON.stringify(openApiDocument, null, 2));

  await app.listen(3000);
  console.log('backend started on: http://localhost:3000');
}
bootstrap();
