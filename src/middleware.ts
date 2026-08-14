import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, user, configured } = await updateSession(request);
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");

  if (isAdmin) {
    const allowDevPreview =
      process.env.NODE_ENV !== "production" && !configured;

    if (!allowDevPreview && !configured) {
      const login = new URL("/login", request.url);
      login.searchParams.set("mode", "setup");
      login.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(login);
    }
    if (!allowDevPreview && !user) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(login);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
