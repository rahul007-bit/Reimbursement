import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth_token");
  const url = req.nextUrl.pathname;
  if (token) {
    const userType = req.cookies.get("loginType");
    if (
      (userType === "admin" || userType === "sub_admin") &&
      url.startsWith("/user")
    ) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (
      (userType === "user" || userType === "receptionist") &&
      url.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
    if (url.startsWith("/login") || url.startsWith("/signup")) {
      return NextResponse.redirect(new URL(`/${userType}`, req.url));
    }
  } else if (url.startsWith("/user") || url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
