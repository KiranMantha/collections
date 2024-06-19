// src/utils/trpc.ts
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

const trpc: any = createTRPCReact();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3100/trpc",
    }),
  ],
});

const TrpcProvider = trpc.Provider;

export { TrpcProvider, trpc, trpcClient };
