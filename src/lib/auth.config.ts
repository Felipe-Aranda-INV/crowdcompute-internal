import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnManager = nextUrl.pathname.startsWith('/manager');
      const isOnAgent = nextUrl.pathname.startsWith('/agent');
      const isPrivate = isOnDashboard || isOnManager || isOnAgent;

      if (isPrivate) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/login')) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
    async session({ session, token }) {
      // Determine user role based on email
      const managerEmails = (process.env.MANAGER_EMAILS || '').split(',').filter(Boolean);
      const isManager = managerEmails.includes(session.user?.email || '');
      
      // Add role and other properties to session
      session.user = {
        ...session.user,
        role: isManager ? 'manager' : 'agent',
        id: token.sub || '', // Google user ID from token
      };
      
      console.log('User session created:', {
        email: session.user.email,
        role: session.user.role,
        id: session.user.id
      });
      
      return session;
    },
    async jwt({ token, account, profile }) {
      // Store the Google user ID in the token
      if (account && profile) {
        token.sub = profile.sub || account.providerAccountId;
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('User signed in:', { 
        email: user.email, 
        name: user.name,
        provider: account?.provider 
      });
    },
  },
} satisfies NextAuthConfig;