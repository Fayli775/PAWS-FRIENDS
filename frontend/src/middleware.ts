import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("token", token);
        return !!token} // Only allow access if there is a valid token
    },
  }
);

// Configure which routes require authentication
export const config = {
  matcher: [
    '/profile/:path*',
    '/sitter/:path*', 
    '/bookings/:path*',
    '/services/:path*',
    '/notifications/:path*',
  ],
}; 