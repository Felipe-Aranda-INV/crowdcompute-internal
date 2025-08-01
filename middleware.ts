import { NextRequest, NextResponse } from 'next/server';

// import NextAuth from 'next-auth';
// import { authConfig } from './lib/auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],
// };

// =======================================================================
// TEMPORARY MIDDLEWARE FOR MVP DEMO (Auth Disabled)
// =======================================================================
// The original NextAuth middleware is commented out above for easy re-activation.
// This temporary middleware allows public access to all routes for the demo.

export function middleware(request: NextRequest) {
  // Continue to the requested path without any authentication checks.
  return NextResponse.next();
}

export const config = {
  // This matcher ensures the middleware runs on all paths except for specific
  // static assets and API routes, which is the same behavior as the original.
  matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],
};