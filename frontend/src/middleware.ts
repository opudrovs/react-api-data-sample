/**
 * Authentication Middleware
 *
 * This middleware checks if a user is authenticated before accessing protected routes.
 * - It retrieves the `authToken` from cookies.
 * - If no token is found, the user is redirected to the login page.
 * - If a token exists, it is validated by making a request to the backend.
 * - If validation fails, the user is redirected to login.
 * - If validation succeeds, the request proceeds as normal.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Call backend to validate the auth token
  const response = await fetch(
    `${process.env.INTERNAL_API_URL}/api/auth/validate`,
    {
      method: 'GET',
      headers: {
        Cookie: `authToken=${authToken}`, // Attach cookie for backend validation
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Proceed if authenticated
}

export const config = {
  matcher: ['/', '/tasks/:path*'], // Protected routes
};
