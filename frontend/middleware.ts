console.log('Middleware loaded');

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/add-event', '/profile'];
  const currentPath = request.nextUrl.pathname;
  const userCookie = request.cookies.get('user')?.value;

  console.log('🧪 middleware:', { currentPath, userCookie });

  const isProtected = protectedPaths.some(path =>
    currentPath.startsWith(path)
  );

  if (isProtected && !userCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-event', '/profile'],
};
