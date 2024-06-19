import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

@Injectable()
export class TrpcTodoService {
  private trpc = initTRPC.context().meta<OpenApiMeta>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
}
