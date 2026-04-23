import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const privateRoutes = ['/dashboard', '/profile'];
const adminOnlyRoutes = ['/dashboard'];

export async function proxy(request) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isPrivate) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // ✅ payload থেকে সরাসরি user data পাবেন
    const user = {
      id: payload._id,
      email: payload.email,
      role: payload.role,
    };

    // admin only route check
    const isAdminRoute = adminOnlyRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // ✅ response header এ user data সেট করুন
    const response = NextResponse.next();
    response.headers.set('x-user-id', user.id?.toString());
    response.headers.set('x-user-email', user.email);
    response.headers.set('x-user-role', user.role);
    return response;

  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};