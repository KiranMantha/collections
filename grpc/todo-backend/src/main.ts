// src/main.ts
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { generateOpenApiDocument } from 'trpc-openapi';
import { TrpcTodoModule, TrpcTodoRouter } from './trpc-todo';

async function bootstrap() {
  const app = await NestFactory.create(TrpcTodoModule);
  app.enableCors();
  const trpc = app.get(TrpcTodoRouter);
  const configService = app.get(ConfigService);
  trpc.applyMiddleware(app);

  const PORT = configService.get('PORT');

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

  await app.listen(PORT);
  console.log(`backend started on: http://localhost:${PORT}`);
}
bootstrap();
