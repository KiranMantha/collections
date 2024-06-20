'use client';

// import { auth } from '@auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function SessionProvider({ children }: { children: ReactNode }) {
  // console.log(auth);
  // const session = await auth();
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
