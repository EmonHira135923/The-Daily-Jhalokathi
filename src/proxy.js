import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const privateRoutes = ["/dashboard", "/profile"];
const adminOnlyRoutes = ["/dashboard"];

export async function proxy(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname, search } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  if (!isPrivate) return NextResponse.next();

  const callbackUrl = pathname + search;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = {
      id: payload._id,
      email: payload.email,
      role: payload.role,
    };

    const isAdminRoute = adminOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const response = NextResponse.next();

    response.headers.set("x-user-id", user.id?.toString());
    response.headers.set("x-user-email", user.email);
    response.headers.set("x-user-role", user.role);

    return response;
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};