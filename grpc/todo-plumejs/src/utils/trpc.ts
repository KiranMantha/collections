import { createTRPCClient, httpBatchLink } from '@trpc/client';
const trpc: any = createTRPCClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3100/trpc'
    })
  ]
});

export { trpc };
