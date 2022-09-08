import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("==== Middleware ====", request.url);

  const response = NextResponse.redirect(new URL("/home", request.url));

  if (request.nextUrl.pathname.startsWith("/experience-a")) {
    response.cookies.set("experience", "var_A");
  } else if (request.nextUrl.pathname.startsWith("/experience-b")) {
    response.cookies.set("experience", "var_B");
  }

  return response;
}

export const config = {
  matcher: ["/experience-a/home", "/experience-b/home"],
};
