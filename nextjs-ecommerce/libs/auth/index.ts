import { userService } from '@services/user';
import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

let refreshTokenValue = '';
async function refreshToken(existingToken: JWT): Promise<JWT> {
  const response = await userService.refreshToken(refreshTokenValue);
  console.log('*********** refreshToken response', response);
  refreshTokenValue = response.refreshToken;
  const user = jwtDecode(response.token);
  return {
    ...existingToken,
    user
  };
}

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
        refreshTokenValue = user.refreshToken;
        const decodedUser = jwtDecode(user.token);
        console.log('**** signinapi', { user, decodedUser });
        return decodedUser;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  debug: true,
  callbacks: {
    redirect(params) {
      const { baseUrl } = params;
      // Allows relative callback URLs
      // if (url.startsWith('/')) return `${baseUrl}${url}`;
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, trigger }) {
      console.log('******** inside jwt', trigger, token, user);
      if (user) {
        return { ...token, user };
      } else if (token.user) {
        const time = Math.floor(new Date().getTime() / 1000);
        if (time > (token as any).user.exp) {
          return await refreshToken(token);
        }
      }
      return token;
    },
    async session({ token, session }) {
      console.log('************* inside session', token, session);
      const { sub, name, email } = token.user as {
        sub: string;
        name: string;
        email: string;
      };
      session.user = { sub, name, email };
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
