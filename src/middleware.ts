// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/auth/login";

  // ✅ Si l'utilisateur est déjà connecté et essaie d'accéder à /auth/login
  if (token && isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // redirection vers la page d'accueil
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Active le middleware sur toutes les routes ou seulement certaines
export const config = {
  matcher: ["/auth/login"],
};