import { NextResponse } from "next/server";

export function middleware(req) {
  const hostname = "http://localhost:32010/";
  let verify = req.cookies.get("auth_jwt_token");
  let url = req.url;

  console.log("middleware",url);

  if (url === hostname && !verify) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (url === hostname && verify) {
    return NextResponse.redirect(new URL("/executive-dashboard", req.url));
  }

  if (url === `${hostname}login` || url === `${hostname}signup`) {
    return NextResponse.next();
  }

  if (!verify) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  source: "/(.*)",
  matcher: [
    "/",
    "/individ",
    "/individuals/:path*",
    "/legal-entities/:path*",
    "/audience-builder",
    "/executive-dashboard",
    "/index",
    "/legal-entity",
    "/recepies",
  ],
};
