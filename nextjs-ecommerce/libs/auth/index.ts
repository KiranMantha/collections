import { userService } from '@services/user';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req): Promise<any> {
        console.log(req);
        if (!credentials) return null;
        const user = await userService.login(credentials);
        return user;
      }
    })
  ],
  debug: true,
  callbacks: {
    redirect(params) {
      console.log('************************params', params);
      return params.baseUrl;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      //   if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return {};
      //   return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user as {
        id: string;
        name: string;
        email: string;
      };
      session.token = token.token as string;
      return session;
    }
  },
  pages: {
    signIn: '/signin',
    newUser: '/register'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
