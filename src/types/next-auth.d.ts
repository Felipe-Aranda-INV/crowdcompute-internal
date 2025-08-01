import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extends the built-in session.user object to include custom properties.
   */
  interface Session {
    user: {
      id: string;
      role: 'agent' | 'manager';
    } & DefaultSession["user"]
  }

  /**
   * Extends the built-in user object.
   */
  interface User extends DefaultUser {
    role: 'agent' | 'manager';
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT token to include custom properties.
   */
  interface JWT {
    role?: 'agent' | 'manager';
  }
}
