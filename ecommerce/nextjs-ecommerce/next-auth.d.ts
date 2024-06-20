import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string;
      name: string;
      email: string;
    };
    token: string;
  }
}
