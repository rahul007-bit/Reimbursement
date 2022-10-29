import { NextResponse } from "next/server";

export async function middleware(req, res) {
  const token = req.cookies.get("auth_token");
  const url = req.nextUrl.pathname;
  if (token) {
    const userType = req.cookies.get("loginType");
    if (userType === "admin" && url.startsWith("/user")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (userType === "user" && url.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  } else if (url.startsWith("/user") || url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
