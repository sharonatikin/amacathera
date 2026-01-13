import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Proxy middleware activated for path:', path);
  const adminToken = request.cookies.get('adminToken')?.value;
  console.log('Admin token from cookies:', adminToken);
  // Verify token if it exists
  let isValidToken = false;
  let tokenData = null;

  if (adminToken) {
    try {
      tokenData = jwt.verify(adminToken, SECRET_KEY);
      isValidToken = true;
    } catch (error) {
      isValidToken = false;
    }
  }
  console.log('Is valid token:', isValidToken);
  // Public paths (no token required)
  const publicPaths = ['/admin/login'];
  const isPublicPath = publicPaths.some(p => path.startsWith(p));

  // Protected admin paths
  const isAdminPath = path.startsWith('/admin');

  // If user is logged in and tries to access login, redirect to admin
  if (isValidToken && path === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If user is not logged in and tries to access protected admin routes
  if (!isValidToken && isAdminPath && !isPublicPath) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};