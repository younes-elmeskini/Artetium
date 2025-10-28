// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/auth/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // ✅ Si l'utilisateur est déjà connecté et essaie d'accéder à /auth/login
  if (token && isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // redirection vers la page d'accueil
    return NextResponse.redirect(url);
  }

  // ✅ Si l'utilisateur essaie d'accéder aux routes admin sans token
  if (isAdminRoute && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Active le middleware sur certaines routes
export const config = {
  matcher: ["/auth/login", "/admin/:path*"],
};