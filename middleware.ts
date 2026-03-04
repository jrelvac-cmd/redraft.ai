import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes autorisées en production (coming soon)
  const allowedRoutes = [
    "/coming-soon",
    "/api/subscribe-email",
    "/_next",
    "/static",
    "/redraft-logo.svg",
  ];

  // Check if route is allowed or if we're in dev mode
  const isDev = process.env.NODE_ENV === "development";
  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

  // En production, rediriger tout vers coming-soon sauf les routes autorisées
  if (!isDev && !isAllowed && pathname !== "/") {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  // Rediriger la home vers coming-soon en production
  if (!isDev && pathname === "/") {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
