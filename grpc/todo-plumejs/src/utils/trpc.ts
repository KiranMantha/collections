import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { env } from '../env';
const trpc: any = createTRPCClient({
  links: [
    httpBatchLink({
      url: env.VITE_API_ENDPOINT
    })
  ]
});

export { trpc };
