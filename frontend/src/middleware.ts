import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Call backend to validate the auth token
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`,
    {
      method: 'GET',
      credentials: 'include',
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
